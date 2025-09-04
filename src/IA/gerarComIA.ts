// src/IA/gerarComIA.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiKey } from '@/logic/keys/openaiKey';
import {
  PRE_PROMPT_BASE,
  CHEGADA, SAIDA, DESCANSO, COMPRAS,
  MK, AK, HS, EPCOT,
  UNIVERSAL, ISLANDS, EPIC
} from '@/IA/prompts';

export type DiaGerado = {
  data: string;
  parque?: string;
  turnos: { turno: string; atividades: string[] }[];
  observacoes?: string;
};

export type SaidaIA = { roteiro: DiaGerado[] };

// =============== System: agora usa seu pré-prompt robusto ==================
const SYS = PRE_PROMPT_BASE;

// ------ utils (idem aos seus, com pequenos ajustes de robustez) ------
function tryParseJSON(text: string): any | null {
  if (!text) return null;
  try { return JSON.parse(text); } catch {}
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) { try { return JSON.parse(fenced[1]); } catch {} }
  const firstObj = text.match(/\{[\s\S]*\}$/);
  if (firstObj?.[0]) { try { return JSON.parse(firstObj[0]); } catch {} }
  return null;
}
function limparStr(s: any): string {
  return String(s ?? '').replace(/\s+/g, ' ').trim();
}
function norm(s: string) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const CANN = {
  manha: ['manha', 'manhã', 'morning', 'am'],
  tarde: ['tarde', 'afternoon', 'pm'],
  noite: ['noite', 'night', 'evening'],
} as const;
type TurnoKey = 'manha' | 'tarde' | 'noite';

function canonicalFromText(t: string): TurnoKey | null {
  const n = norm(t);
  if (CANN.manha.some(k => n.includes(k))) return 'manha';
  if (CANN.tarde.some(k => n.includes(k))) return 'tarde';
  if (CANN.noite.some(k => n.includes(k))) return 'noite';
  return null;
}

function toLines(v: any): string[] {
  const strip = (x: any) => String(x ?? '').trim();
  const onlyHHMM = (s: string | null | undefined) => {
    const m = String(s ?? '').match(/\b([01]?\d|2[0-3])[:h.]?([0-5]\d)\b/);
    if (!m) return null;
    return `${m[1].padStart(2,'0')}:${m[2].padStart(2,'0')}`;
  };
  const ensureHHMM = (line: string) => {
    const start = line.match(/^\s*([01]?\d|2[0-3])[:h.]?([0-5]\d)\b/);
    if (start) {
      const rest = line.replace(start[0], '').replace(/^\s*[•-]\s*/, '').trimStart();
      return `${start[1].padStart(2,'0')}:${start[2].padStart(2,'0')} • ${rest}`.trim();
    }
    const any = onlyHHMM(line);
    if (any) return `${any} • ${line.replace(any, '').replace(/^\s*[•-]\s*/, '').trimStart()}`;
    return '';
  };
  const objToLine = (o: any) => {
    if (!o || typeof o !== 'object') return '';
    const hora = onlyHHMM(o.hora) || onlyHHMM(o.time) || onlyHHMM(o.inicio) || onlyHHMM(o['início']) || onlyHHMM(o.start) || null;
    const fim  = onlyHHMM(o.fim)  || onlyHHMM(o.end)  || null;
    const desc =
      strip(o.descricao) || strip(o['descrição']) || strip(o.texto) || strip(o.text) ||
      strip(o.titulo) || strip(o.title) || strip(o.atividade) || strip(o.atracao) ||
      strip(o['atração']) || strip(o.nome) || '';
    let line = desc;
    if (hora) line = `${hora} • ${line || ''}`.trim();
    if (!line && fim) line = `até ${fim}`;
    return line;
  };

  if (!v && v !== 0) return [];
  if (typeof v === 'string' || typeof v === 'number') {
    const s = strip(String(v));
    if (!s) return [];
    const normalized = ensureHHMM(s);
    return normalized ? [normalized] : [];
  }
  if (Array.isArray(v)) return v.flatMap(toLines);
  if (typeof v === 'object') {
    if (Array.isArray(v.atividades)) return v.atividades.flatMap(toLines);
    const line = objToLine(v);
    if (!line) return [];
    const normalized = line.match(/^\s*\d{2}:\d{2}\s*•\s*/) ? line : toLines(line)[0] ?? '';
    return normalized ? [normalized] : [];
  }
  return [];
}

function normalizarTurnos(rawTurnos: any): { turno: string; atividades: string[] }[] {
  const buckets: Record<TurnoKey, string[]> = { manha: [], tarde: [], noite: [] };
  const pushActs = (key: TurnoKey, acts: any) => {
    const lines = toLines(acts).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean);
    if (lines.length) buckets[key].push(...lines);
  };
  if (Array.isArray(rawTurnos)) {
    for (const it of rawTurnos) {
      const destino = canonicalFromText(it?.turno ?? it?.nome ?? it?.title ?? '') ?? 'tarde';
      const acts = it?.atividades ?? it?.itens ?? it?.lista ?? it?.activities ?? it?.a ?? it;
      pushActs(destino, acts);
    }
  } else if (rawTurnos && typeof rawTurnos === 'object') {
    const keys = Object.keys(rawTurnos);
    const findKey = (cands: readonly string[]) => keys.find(k => cands.includes(norm(k))) ?? null;
    const kManha = findKey(CANN.manha);
    const kTarde = findKey(CANN.tarde);
    const kNoite = findKey(CANN.noite);
    if (kManha) pushActs('manha', rawTurnos[kManha]);
    if (kTarde) pushActs('tarde', rawTurnos[kTarde]);
    if (kNoite) pushActs('noite', rawTurnos[kNoite]);
  }
  const uniq = (arr: string[]) => Array.from(new Set(arr));
  const sortByHHMM = (a: string, b: string) => {
    const ha = a.match(/^(\d{2}):(\d{2})/); const hb = b.match(/^(\d{2}):(\d{2})/);
    if (!ha || !hb) return 0;
    const na = (+ha[1])*60 + (+ha[2]); const nb = (+hb[1])*60 + (+hb[2]);
    return na - nb;
  };
  (buckets.manha = uniq(buckets.manha)).sort(sortByHHMM);
  (buckets.tarde = uniq(buckets.tarde)).sort(sortByHHMM);
  (buckets.noite = uniq(buckets.noite)).sort(sortByHHMM);
  return [
    { turno: 'Manhã', atividades: buckets.manha },
    { turno: 'Tarde', atividades: buckets.tarde },
    { turno: 'Noite', atividades: buckets.noite },
  ];
}

function sanitize(roteiro: any[]): DiaGerado[] {
  const arr = Array.isArray(roteiro) ? roteiro : [];
  const limpos: DiaGerado[] = arr.map((d: any) => {
    const data = limparStr(d?.data);
    const parque = d?.parque ? limparStr(d.parque) : undefined;
    const turnos = normalizarTurnos(d?.turnos);
    return {
      data,
      parque,
      turnos,
      observacoes: d?.observacoes ? limparStr(d.observacoes) : undefined,
    };
  }).filter((x) => x && (x.data || x.parque || x.turnos.some(t => t.atividades.length)));
  if (!limpos.length) return [fallbackDia()];
  return limpos.map(fixarTresTurnos);
}

function fixarTresTurnos(d: DiaGerado): DiaGerado {
  const base = { Manhã: [] as string[], Tarde: [] as string[], Noite: [] as string[] };
  for (const t of d.turnos || []) {
    if (t.turno === 'Manhã') base.Manhã.push(...t.atividades);
    else if (t.turno === 'Tarde') base.Tarde.push(...t.atividades);
    else if (t.turno === 'Noite') base.Noite.push(...t.atividades);
  }
  return {
    data: d.data || 'Dia 1 - DD/MM/AAAA',
    parque: d.parque || 'Dia de Descanso',
    turnos: [
      { turno: 'Manhã', atividades: base.Manhã },
      { turno: 'Tarde', atividades: base.Tarde },
      { turno: 'Noite', atividades: base.Noite },
    ],
    observacoes: d.observacoes,
  };
}

function fallbackDia(): DiaGerado {
  return {
    data: 'Dia 1 - DD/MM/AAAA',
    parque: 'Dia de Descanso',
    turnos: normalizarTurnos([
      { turno: 'Manhã', atividades: [
        '07:30 • Café da manhã no hotel',
        '09:00 • Organização de documentos/ingressos',
        '10:30 • Compras rápidas (água/snacks)',
        '11:15 • Pausa para descanso',
        '11:45 • Deslocamento'
      ]},
      { turno: 'Tarde', atividades: [
        '12:15 • Almoço (quick service)',
        '13:30 • Piscina/hotel ou caminhada leve',
        '15:00 • Loja de souvenirs',
        '16:15 • Pausa/lanche',
        '17:15 • Preparar-se para a noite'
      ]},
      { turno: 'Noite', atividades: [
        '18:30 • Jantar',
        '19:30 • Passeio em Disney Springs/CityWalk',
        '20:30 • Fotos e compras finais',
        '21:30 • Retorno ao hotel',
        '22:00 • Separar itens para o dia seguinte'
      ]},
    ]),
    observacoes: 'Roteiro gerado como fallback. Configure a chave de API para detalhamento completo.',
  };
}

/* ===================== NOVO: detecção de tipo p/ offline ===================== */
function detectarTipoDia(prompt: string): 'descanso' | 'compras' | 'parque' {
  const p = (prompt || '').toLowerCase();
  const temParque = /\bparque(s)?\b|\bmk\b|\bepcot\b|\bhollywood\b|\banimal\b|\buniversal\b|\bislands\b|\bepic\b/.test(p);

  const hitsDescanso = [
    'descanso','day off','relax','pool','piscina','spa',
    'disney springs','icon park','iconpark','the wheel',
  ].some(k => p.includes(k));

  const hitsCompras = [
    'compras','shopping','outlet','outlets','vineland','international premium','florida mall','ross','walmart','target'
  ].some(k => p.includes(k));

  if (hitsDescanso && !temParque) return 'descanso';
  if (hitsCompras && !temParque) return 'compras';
  return 'parque';
}

/* ========== NOVO: templates offline específicos p/ descanso/compras ========== */
function offlineDiaDescanso(dataRotulo?: string): DiaGerado {
  return {
    data: dataRotulo ?? 'Dia de Descanso',
    parque: 'Descanso',
    turnos: normalizarTurnos([
      {
        turno: 'Manhã',
        atividades: [
          '08:30 • Café da manhã no hotel (ou IHOP/Dunkin)',
          '10:00 • Piscina/área de lazer do hotel',
          '11:30 • Passeio leve no ICON Park ou Disney Springs'
        ]
      },
      {
        turno: 'Tarde',
        atividades: [
          '13:00 • Almoço leve (opções no Disney Springs)',
          '14:30 • Outlets (Vineland/International) ou descanso no hotel',
          '17:00 • Pausa para sobremesa (gelato/sorvete)'
        ]
      },
      {
        turno: 'Noite',
        atividades: [
          '18:30 • Jantar tranquilo (Polite Pig / Chicken Guy / Blaze Pizza)',
          '20:00 • Passeio e fotos no Disney Springs/CityWalk',
          '21:30 • Volta ao hotel e planejamento do próximo dia'
        ]
      }
    ])
  };
}

function offlineDiaCompras(dataRotulo?: string): DiaGerado {
  return {
    data: dataRotulo ?? 'Dia de Compras',
    parque: 'Compras',
    turnos: normalizarTurnos([
      {
        turno: 'Manhã',
        atividades: [
          '09:00 • Café da manhã rápido',
          '10:00 • Orlando Vineland Premium Outlets (Disney Outlet, Nike, GAP)',
          '12:30 • Pausa para lanche (praça de alimentação)'
        ]
      },
      {
        turno: 'Tarde',
        atividades: [
          '14:00 • International Premium Outlets / Florida Mall',
          '16:30 • Walmart/Target para itens de última hora',
          '17:30 • Retorno ao hotel para descarregar compras'
        ]
      },
      {
        turno: 'Noite',
        atividades: [
          '19:00 • Jantar (Outback / Cheesecake Factory / Shake Shack)',
          '20:30 • Organização das compras e notas',
          '21:30 • Planejamento do dia seguinte'
        ]
      }
    ])
  };
}

// ===================== Geração Offline (AGORA RESPEITA O TIPO) =====================
function gerarOffline(prompt: string, minDias = 3): SaidaIA {
  const tipo = detectarTipoDia(prompt);

  const mDias = prompt.match(/(\d+)\s*dias?/i);
  const desejadosBase = Number(mDias?.[1] || minDias);
  // Para descanso/compras, se o usuário não falar número, gera 1 dia
  const desejados = Math.max(
    Number.isFinite(desejadosBase) ? desejadosBase : (tipo === 'parque' ? minDias : 1),
    1
  );
  const qtd = Math.min(desejados, 14);

  const hoje = new Date();
  const addData = (d: number) => {
    const dt = new Date(hoje); dt.setDate(dt.getDate()+d);
    const dd = String(dt.getDate()).padStart(2,'0');
    const mm = String(dt.getMonth()+1).padStart(2,'0');
    const yy = dt.getFullYear();
    return `${dd}/${mm}/${yy}`;
  };

  if (tipo === 'descanso') {
    const roteiro = Array.from({ length: qtd }, (_, i) =>
      fixarTresTurnos(offlineDiaDescanso(`Dia ${i+1} - ${addData(i)}`))
    );
    return { roteiro };
  }

  if (tipo === 'compras') {
    const roteiro = Array.from({ length: qtd }, (_, i) =>
      fixarTresTurnos(offlineDiaCompras(`Dia ${i+1} - ${addData(i)}`))
    );
    return { roteiro };
  }

  // tipo === 'parque' (comportamento antigo)
  const parques = [
    'Parque Disney - Magic Kingdom','Parque Disney - EPCOT','Parque Disney - Hollywood Studios','Parque Disney - Animal Kingdom',
    'Parque Universal - Universal Studios','Parque Universal - Islands of Adventure','Parque Universal - Epic Universe',
  ];
  const pickParque = (i: number): string => parques[i % parques.length];

  const roteiro: DiaGerado[] = Array.from({length: qtd}, (_, i) => fixarTresTurnos({
    data: `Dia ${i+1} - ${addData(i)}`,
    parque: pickParque(i),
    turnos: normalizarTurnos([
      { turno: 'Manhã', atividades: [
        '07:30 • Café da manhã no hotel',
        '08:30 • Deslocamento/Logística do dia',
        '09:00 • Atração prioritária / Atividade principal',
        '10:15 • Segunda atração / Passeio',
        '11:15 • Pausa/água e snack'
      ]},
      { turno: 'Tarde', atividades: [
        '12:00 • Almoço (quick service)',
        '13:00 • Atração/área temática ou compras',
        '14:15 • Show/parada (se houver)',
        '15:30 • Atração com fila menor / Descanso',
        '16:30 • Lojas / Fotos'
      ]},
      { turno: 'Noite', atividades: [
        '18:30 • Jantar',
        '19:30 • Atração com menor fila / Passeio',
        '20:30 • Show noturno / Compras finais',
        '21:30 • Retorno ao hotel',
        '22:00 • Preparar mochila do próximo dia'
      ]},
    ]),
    observacoes: 'Roteiro offline (mock). Configure a chave de API para detalhamento completo.',
  }));
  return { roteiro };
}

// ===================== Chaves =====================
async function getOpenRouterKey(): Promise<string|null> {
  try {
    const k = await AsyncStorage.getItem('OPENROUTER_API_KEY');
    return k?.trim() || null;
  } catch { return null; }
}

// ============== Helper: junta TODOS os seeds de estilo ======================
function allSeedsBlock(): string {
  const seeds: string[] = [
    '=== SEEDS_DE_ESTILO (referência, NÃO copiar literalmente) ===',
    '--- CHEGADA ---', CHEGADA,
    '--- SAIDA ---', SAIDA,
    '--- DESCANSO ---', DESCANSO,
    '--- COMPRAS ---', COMPRAS,
    '--- MAGIC KINGDOM ---', MK,
    '--- ANIMAL KINGDOM ---', AK,
    '--- HOLLYWOOD STUDIOS ---', HS,
    '--- EPCOT ---', EPCOT,
    '--- UNIVERSAL STUDIOS ---', UNIVERSAL,
    '--- ISLANDS OF ADVENTURE ---', ISLANDS,
    '--- EPIC UNIVERSE ---', EPIC,
  ].filter(Boolean).map(String);
  return seeds.join('\n\n');
}

// ===================== API principal =====================
export async function gerarRoteiroIAFromPrompt(
  promptUsuario: string,
  opts?: { idioma?: string; forcarOffline?: boolean },
  userId?: string
): Promise<SaidaIA> {
  if (opts?.forcarOffline) return gerarOffline(promptUsuario);

  // anexamos os seeds ao prompt do usuário para aumentar densidade/consistência
  const promptComSeeds = `${promptUsuario}\n\n${allSeedsBlock()}`;

  const openaiKey = await getApiKey(userId);
  if (openaiKey) {
    const a = await tryOpenAI(openaiKey, promptComSeeds);
    if (a) return a;
  }

  const orKey = await getOpenRouterKey();
  if (orKey) {
    const b = await tryOpenRouter(orKey, promptComSeeds);
    if (b) return b;
  }

  return gerarOffline(promptUsuario);
}

// ===================== Provedores =====================
async function tryOpenAI(apiKey: string, prompt: string): Promise<SaidaIA | null> {
  try {
    const body: any = {
      model: 'gpt-4o-mini',
      temperature: 0.3,
      top_p: 0.9,
      max_tokens: 4000, // ↑ mais fôlego p/ muitos dias + 8–12 itens por turno
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYS },
        { role: 'user', content: prompt }
      ],
    };
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{ Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) return null;
    const j = await r.json();
    const content: string = j?.choices?.[0]?.message?.content ?? '';
    const parsed = tryParseJSON(content) || {};
    const roteiro = sanitize(parsed.roteiro);
    return roteiro.length ? { roteiro } : null;
  } catch { return null; }
}

async function tryOpenRouter(apiKey: string, prompt: string): Promise<SaidaIA | null> {
  try {
    const body: any = {
      model: 'openai/gpt-4o-mini',
      temperature: 0.3,
      top_p: 0.9,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYS },
        { role: 'user', content: prompt }
      ]
    };
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method:'POST',
      headers:{ Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) return null;
    const j = await r.json();
    const content: string = j?.choices?.[0]?.message?.content ?? '';
    const parsed = tryParseJSON(content) || {};
    const roteiro = sanitize(parsed.roteiro);
    return roteiro.length ? { roteiro } : null;
  } catch { return null; }
}
