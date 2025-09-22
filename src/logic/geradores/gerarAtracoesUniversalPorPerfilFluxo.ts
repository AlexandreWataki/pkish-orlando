// src/logic/geradores/gerarAtracoesUniversalPorPerfilFluxo.ts

import { AtividadeDia } from '@/logic/types/atividade';
import { AtracaoParque } from '@/logic/types/atracao';
import { atracoesUniversal } from './todasAtracoesUniversal';

// Normaliza texto (remove acentos, troca traÃ§os por espaÃ§o, minÃºsculo e trim)
function normalizarTexto(txt: string): string {
  return txt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[â€“â€”-]/g, ' ') // en/em dash e hÃ­fen â†’ espaÃ§o
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// Mapa para corrigir nomes de Ã¡reas
const mapaAreas: Record<string, string> = {
  // Wizarding
  'the wizarding world hogsmeade': 'The Wizarding World â€“ Hogsmeade',
  'the wizarding world â€“ hogsmeade': 'The Wizarding World â€“ Hogsmeade',
  'the wizarding world diagon alley': 'The Wizarding World â€“ Diagon Alley',
  'the wizarding world - diagon alley': 'The Wizarding World â€“ Diagon Alley',
  'the wizarding world': 'The Wizarding World',

  // World Expo / Springfield
  'world expo': 'World Expo',
  'springfield': 'World Expo',
  'world expo springfield': 'World Expo',

  // Demais Ã¡reas USF
  'hollywood': 'Hollywood',
  'minions land': 'Minions Land',
  'production central': 'Production Central',
  'san francisco': 'San Francisco',
  'new york': 'New York',

  // Islands of Adventure
  'marvel super hero island': 'Marvel Super Hero Island',
  'toon lagoon': 'Toon Lagoon',
  'seuss landing': 'Seuss Landing',
  'jurassic park': 'Jurassic Park',
  'lost continent': 'Lost Continent',
  'The Wizarding World â€“ Hogsmeade': 'The Wizarding World â€“ Hogsmeade',
  'skull island': 'Skull Island',

  // Epic Universe
  'universal monsters': 'Universal Monsters',
  'super nintendo world': 'Super Nintendo World',
  'how to train your dragon': 'How to Train Your Dragon',
  'ministry of magic': 'Ministry of Magic',
  'celestial park': 'Celestial Park',
};

function normalizarArea(area: string): string {
  return mapaAreas[normalizarTexto(area)] ?? area;
}

// FunÃ§Ã£o principal
export function gerarAtracoesUniversalPorPerfilFluxo(
  turno: 'manha' | 'tarde' | 'noite',
  parque: string,
  perfis: string[]
): { area: string; atracoes: AtividadeDia[] }[] {
  const fluxoAreasPorParque: Record<
    string,
    { manha: string[]; tarde: string[]; noite: string[] }
  > = {
    'Universal Studios Florida': {
      manha: ['Production Central', 'Minions Land', 'New York'],
      tarde: [
        'San Francisco',
        'World Expo', // âœ… garantido no fluxo
        'Hollywood',
        'The Wizarding World',
        'The Wizarding World â€“ Diagon Alley',
      ],
      noite: [],
    },
    'Islands of Adventure': {
      manha: ['Marvel Super Hero Island', 'Toon Lagoon', 'Seuss Landing'],
      tarde: ['Jurassic Park', 'Skull Island', 'The Wizarding World â€“ Hogsmeade', 'Lost Continent'],
      noite: [],
    },
    "Universal's Epic Universe": {
      manha: ['Celestial Park', 'Super Nintendo World', 'How to Train Your Dragon'],
      tarde: ['Ministry of Magic', 'Universal Monsters', 'Celestial Park'],
      noite: [],
    },
  };

  const mapaPerfis: Record<string, string> = {
    radical: 'radicais',
    radicais: 'radicais',
    familia: 'familiares',
    familiares: 'familiares',
    tematica: 'tematicas',
    tematicas: 'tematicas',
    imersivo: 'imersivas',
    imersivas: 'imersivas',
    interativa: 'interativas',
    interativas: 'interativas',
    todas: 'todas',
  };

  // Ãreas do turno (sem duplicar)
  const areasDoTurno = Array.from(
    new Set((fluxoAreasPorParque[parque]?.[turno] ?? []).map(normalizarArea))
  );

  const [perfil1, perfil2] = perfis
    .map((p) => mapaPerfis[p?.toLowerCase().trim()] ?? p?.toLowerCase().trim())
    .filter(Boolean);

  const filtrarAtracoes = (atracao: Partial<AtracaoParque>) => {
    const regiaoValida = areasDoTurno.includes(normalizarArea(atracao.regiao ?? ''));

    const tiposPerfil = Array.isArray(atracao.tipoPerfil)
      ? atracao.tipoPerfil.map((x) => x?.toString().toLowerCase())
      : typeof atracao.tipoPerfil === 'string'
      ? [atracao.tipoPerfil.toLowerCase()]
      : [];

    // Se algum perfil for "todas" ou nÃ£o houver perfil, ignora filtro por perfil
    const ignorarPerfil = !perfil1 && !perfil2 || perfil1 === 'todas' || perfil2 === 'todas';

    const batePerfil =
      ignorarPerfil ||
      (perfil1 && tiposPerfil.includes(perfil1)) ||
      (perfil2 && tiposPerfil.includes(perfil2));

    return atracao.parque === parque && regiaoValida && batePerfil;
  };

  // Filtra e agrupa
  const atracoesFiltradas = atracoesUniversal.filter(filtrarAtracoes);

  const agrupadasPorArea: Record<string, AtividadeDia[]> = {};
  atracoesFiltradas.forEach((atracao: Partial<AtracaoParque>) => {
    const area = normalizarArea(atracao.regiao ?? 'Sem Ãrea');
    agrupadasPorArea[area] = agrupadasPorArea[area] || [];
    agrupadasPorArea[area].push({
      id: atracao.id ?? `${atracao.titulo ?? 'sem-titulo'}-${turno}`,
      tipo: 'atracao',
      titulo: atracao.icone ? `${atracao.icone} ${atracao.titulo ?? 'Sem tÃ­tulo'}` : atracao.titulo ?? 'Sem tÃ­tulo',
      descricao: atracao.descricao ?? '',
      subtitulo: atracao.subtitulo ?? (atracao as any).area ?? atracao.regiao ?? '',
      regiao: atracao.regiao ?? '',
      latitude: atracao.latitude ?? 0,
      longitude: atracao.longitude ?? 0,
      alturaMinima: atracao.alturaMinima,
      tempoMedioFila: atracao.tempoMedioFila,
      filaAceitavel: atracao.filaAceitavel,
      idadeRecomendada: atracao.idadeRecomendada,
      perfil: Array.isArray(atracao.tipoPerfil)
        ? atracao.tipoPerfil.join(', ')
        : (atracao.tipoPerfil as string) ?? '',
    });
  });

  return areasDoTurno.map((area) => ({
    area,
    atracoes: agrupadasPorArea[area] ?? [],
  }));
}
