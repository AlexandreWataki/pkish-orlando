// src/IA/IAResultadoScreen.tsx
import React, { useMemo, useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Platform, StatusBar, Image, BackHandler
} from 'react-native';
import { useRoute, RouteProp, useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import type { DiaGerado } from '@/IA/gerarComIA';

type Rt = RouteProp<
  { IAResultado: { roteiroGerado?: DiaGerado[]; usarIAParaTurnos?: boolean } | undefined },
  'IAResultado'
>;

type TurnoCanonical = 'manha' | 'tarde' | 'noite';

const AZUL_NEON = '#00FFFF';
const LOGO = require('@/assets/imagens/logo4.png');

const strip = (s: any) => (typeof s === 'string' ? s.trim() : '');
const norm = (s: string) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const CANN = {
  manha: ['manha', 'manhã', 'morning', 'am', 'matutino'],
  tarde: ['tarde', 'afternoon', 'pm', 'vespertino'],
  noite: ['noite', 'night', 'evening', 'noturno'],
} as const;

function canonicalFromText(t: string): TurnoCanonical | null {
  const n = norm(t);
  if (CANN.manha.some(k => n.includes(k))) return 'manha';
  if (CANN.tarde.some(k => n.includes(k))) return 'tarde';
  if (CANN.noite.some(k => n.includes(k))) return 'noite';
  return null;
}
function labelPt(key: TurnoCanonical) {
  return key === 'manha' ? 'Manhã' : key === 'tarde' ? 'Tarde' : 'Noite';
}
function iconeDoTurno(nome: string): any {
  const c = canonicalFromText(nome);
  if (c === 'manha') return 'sunny-outline';
  if (c === 'tarde') return 'partly-sunny-outline';
  if (c === 'noite') return 'moon-outline';
  return 'list-outline';
}

/* ========= Sanitização das ATIVIDADES ========= */
function onlyHHMM(s: string | null | undefined) {
  const m = String(s ?? '').match(/\b([01]?\d|2[0-3])[:h.]?([0-5]\d)\b/);
  if (!m) return null;
  const hh = m[1].padStart(2, '0');
  const mm = m[2].padStart(2, '0');
  return `${hh}:${mm}`;
}
function objToLine(o: any): string {
  if (!o || typeof o !== 'object') return '';
  const hora =
    onlyHHMM(o.hora) ||
    onlyHHMM(o.time) ||
    onlyHHMM(o.inicio) ||
    onlyHHMM(o['início']) ||
    onlyHHMM(o.start) ||
    null;

  const fim =
    onlyHHMM(o.fim) ||
    onlyHHMM(o.end) ||
    null;

  const desc =
    strip(o.descricao) ||
    strip(o['descrição']) ||
    strip(o.texto) ||
    strip(o.text) ||
    strip(o.titulo) ||
    strip(o.title) ||
    strip(o.atividade) ||
    strip(o.atracao) ||
    strip(o['atração']) ||
    strip(o.nome) ||
    '';

  let line = desc;
  if (hora) line = `${hora} • ${line || ''}`.trim();
  if (!line && fim) line = `até ${fim}`;
  return line;
}
function toLines(v: any): string[] {
  if (!v && v !== 0) return [];
  if (typeof v === 'string' || typeof v === 'number') {
    const s = strip(String(v));
    return s ? [s] : [];
  }
  if (Array.isArray(v)) return v.flatMap(toLines);
  if (typeof v === 'object') {
    if (Array.isArray(v.atividades)) return v.atividades.flatMap(toLines);
    return [objToLine(v)].filter(Boolean);
  }
  return [];
}
function uniq<T>(arr: T[]) {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of arr) {
    const key = typeof it === 'string' ? it : JSON.stringify(it);
    if (!seen.has(key)) { seen.add(key); out.push(it); }
  }
  return out;
}
function formatLine(s: string) {
  const txt = strip(s).replace(/\s+/g, ' ');
  if (!txt) return '';
  const startsWithTime = /^\d{1,2}[:h.]\d{2}\b/.test(txt);
  const alreadyHasBullet = txt.startsWith('•');
  return startsWithTime || alreadyHasBullet ? txt : `• ${txt}`;
}

/* ========= Normalização de TURNOS ========= */
function ensureTurnos(d: DiaGerado): DiaGerado {
  const buckets: Record<TurnoCanonical, string[]> = { manha: [], tarde: [], noite: [] };
  const pushActs = (key: TurnoCanonical, acts: any) => {
    const lines = toLines(acts);
    if (lines.length) buckets[key].push(...lines);
  };

  const t: any = (d as any)?.turnos;

  if (Array.isArray(t)) {
    for (const it of t) {
      const destino =
        canonicalFromText(it?.turno ?? it?.nome ?? it?.title ?? '') ?? 'tarde';
      const acts = it?.atividades ?? it?.itens ?? it?.lista ?? it?.activities ?? it?.a ?? it;
      pushActs(destino, acts);
    }
  } else if (t && typeof t === 'object') {
    const keys = Object.keys(t);
    const findKey = (cands: readonly string[]) =>
      keys.find(k => cands.includes(norm(k))) ?? null;

    const kManha = findKey(CANN.manha);
    const kTarde = findKey(CANN.tarde);
    const kNoite = findKey(CANN.noite);

    if (kManha) pushActs('manha', (t as any)[kManha]);
    if (kTarde) pushActs('tarde', (t as any)[kTarde]);
    if (kNoite) pushActs('noite', (t as any)[kNoite]);
  } else {
    pushActs('tarde', (d as any).atividades ?? []);
  }

  buckets.manha = uniq(buckets.manha.map(strip)).filter(Boolean);
  buckets.tarde = uniq(buckets.tarde.map(strip)).filter(Boolean);
  buckets.noite = uniq(buckets.noite.map(strip)).filter(Boolean);

  return {
    ...d,
    turnos: [
      { turno: labelPt('manha'), atividades: buckets.manha },
      { turno: labelPt('tarde'), atividades: buckets.tarde },
      { turno: labelPt('noite'), atividades: buckets.noite },
    ],
  };
}

/* ========= Extração de params ========= */
function tentarJSON(val: any): any {
  if (typeof val !== 'string') return null;
  try { return JSON.parse(val); } catch {}
  const fenced = val.match(/```json\s*([\s\S]*?)```/i)?.[1];
  if (fenced) { try { return JSON.parse(fenced); } catch {} }
  return null;
}
function extrairRoteiroDeParams(params: any): DiaGerado[] {
  if (!params) return [];
  const chaves = ['roteiroGerado', 'roteiro', 'roteiroFinal', 'dias', 'resultadoIA', 'saida', 'output'];
  for (const key of chaves) {
    const v = params?.[key];
    if (Array.isArray(v)) return v as DiaGerado[];
    const j = tentarJSON(v);
    if (Array.isArray(j)) return j as DiaGerado[];
    if (j && Array.isArray(j.roteiro)) return j.roteiro as DiaGerado[];
    if (v && Array.isArray((v as any).roteiro)) return (v as any).roteiro as DiaGerado[];
  }
  for (const k of Object.keys(params || {})) {
    const v = (params as any)[k];
    const js = Array.isArray(v) ? v : tentarJSON(v);
    if (Array.isArray(js) && js.some((it: any) => it && (it.data || it.parque || it.turnos))) {
      return js as DiaGerado[];
    }
  }
  return [];
}

/* ========= Fallback demo ========= */
const DEMO: DiaGerado[] = [
  {
    data: 'Dia 1 - 13/10/2025',
    parque: 'Parque Disney - Magic Kingdom',
    turnos: {
      manha: ['08:30 • Rope Drop no castelo', '09:15 • Seven Dwarfs Mine Train'],
      tarde: ['13:00 • Almoço no Pecos Bill', '14:20 • Pirates of the Caribbean'],
      noite: ['19:30 • Fireworks no Hub', '21:00 • Tron Lightcycle Run (fila)'],
    } as any,
    observacoes: 'Utilizar o Lightning Lane para atrações com fila longa.',
  },
];

/* ========= Componente ========= */
export default function IAResultadoScreen() {
  const { params } = useRoute<Rt>();
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const [clima, setClima] = useState<any>(null);
  useEffect(() => { buscarClima('Orlando').then(setClima).catch(() => {}); }, []);
  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const roteiro: DiaGerado[] = useMemo(() => {
    let base: DiaGerado[] = [];
    if (Array.isArray((params as any)?.roteiroGerado)) base = (params as any).roteiroGerado;
    if (!base.length) base = extrairRoteiroDeParams(params);
    if (!base.length) base = DEMO;
    return base.map(ensureTurnos);
  }, [params]);

  /* ====== Ações ====== */
  const goToForm = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'IAventureSe' as never }] })
    );
  };
  const goToMenuPrincipal = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Inicio' as never }] })
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        goToForm();
        return true;
      });
      return () => sub.remove();
    }, [])
  );

  return (
    <View style={s.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={s.headerWrap}>
        <CabecalhoDia titulo="" data={dataFormatada} diaSemana={diaSemana} clima={clima} />
        <View style={s.titleRow}>
          <Text style={[s.headerTitle, s.headerTitleNeon]}>Cards do Roteiro (IA)</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
      >
        {!roteiro.length ? (
          <Text style={s.empty}>Nenhum dia gerado.</Text>
        ) : (
          roteiro.map((d, idx) => (
            <View style={s.card} key={`${d.data}-${idx}`}>
              <Text style={s.cardTop}>{strip(d.data)}</Text>
              <Text style={s.cardPark}>{strip(d.parque) || 'Dia'}</Text>

              {Array.isArray(d.turnos) && d.turnos.length
                ? d.turnos.map((t, ti) => (
                    <View key={`${t.turno}-${ti}`} style={s.turno}>
                      <View style={s.turnoHead}>
                        <Ionicons name={iconeDoTurno(t.turno) as any} size={16} color={AZUL_NEON} />
                        <Text style={s.turnoTitle}>{t.turno}</Text>
                      </View>

                      {t.atividades?.length
                        ? t.atividades.map((a, ai) => {
                            const line = formatLine(String(a));
                            return <Text key={ai} style={s.item}>{line}</Text>;
                          })
                        : <Text style={s.itemVazio}>(sem atividades)</Text>}
                    </View>
                  ))
                : null}

              {d.observacoes ? <Text style={s.obs}>{strip(d.observacoes)}</Text> : null}
            </View>
          ))
        )}

        {/* 🔷 Botão NEON após o último card */}
        <TouchableOpacity
          style={s.neonInlineBtn}
          onPress={goToMenuPrincipal}
          activeOpacity={0.92}
          accessibilityLabel="Voltar ao Menu Principal"
        >
          <Text style={s.neonInlineText}>Volte ao Menu Principal</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ⬅️ Seta fixa: volta para IAventureSe */}
      <TouchableOpacity
        style={s.bottomBackLeft}
        onPress={goToForm}
        activeOpacity={0.9}
        accessibilityLabel="Voltar para o formulário"
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <View style={s.glowCircle}>
          <Ionicons name="arrow-back-circle" size={44} color={AZUL_NEON} />
        </View>
      </TouchableOpacity>

      {/* Rodapé com logo (sem clique) */}
      <View style={s.footerBlack} pointerEvents="none">
        <Image source={LOGO} style={s.footerLogo} resizeMode="contain" />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  // Cabeçalho
  headerWrap: { paddingTop: Platform.OS === 'android' ? 40 : 20, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: '#000' },
  titleRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#E6F7FF' },
  headerTitleNeon: { textShadowColor: AZUL_NEON, textShadowRadius: 10, textShadowOffset: { width: 0, height: 0 } },

  // Conteúdo
  content: { padding: 16, paddingBottom: 100 },
  empty: { color: '#9fb3c8', fontSize: 12 },

  // Card de resultado
  card: {
    borderWidth: 1.5,
    borderColor: AZUL_NEON,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#0b0e1a',
    marginBottom: 12,
    shadowColor: AZUL_NEON,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTop: { color: '#9fb3c8', fontSize: 12, marginBottom: 4 },
  cardPark: { color: '#E6F7FF', fontWeight: '800', marginBottom: 8 },
  turno: { marginTop: 6 },
  turnoHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  turnoTitle: { color: '#cfe3ff', fontWeight: '700' },
  item: { color: '#cfe3ff', fontSize: 12, marginLeft: 10, marginBottom: 2 },
  itemVazio: { color: '#7b89a6', fontSize: 12, marginLeft: 10, fontStyle: 'italic' },
  obs: { color: '#9fb3c8', fontSize: 12, marginTop: 8 },

  // Botão NEON dentro do scroll (após o último card)
  neonInlineBtn: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: AZUL_NEON,
    backgroundColor: '#04121a',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.9,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  neonInlineText: {
    color: '#E6F7FF',
    fontWeight: '800',
    letterSpacing: 0.5,
    textShadowColor: AZUL_NEON,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },

  // Seta fixa
  bottomBackLeft: {
    position: 'absolute',
    left: 12,
    bottom: 86,
    zIndex: 9999,
    elevation: 20,
  },
  glowCircle: {
    borderRadius: 999,
    padding: 6,
    backgroundColor: 'rgba(0,255,255,0.12)',
  },

  // Rodapé (somente exibição)
  footerBlack: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: 70,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
    zIndex: 5,
  },
  footerLogo: { width: 120, height: 36, opacity: 0.95 },
});
