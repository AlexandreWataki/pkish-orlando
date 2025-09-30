import { AtividadeDia } from '@/logic/types/atividade';
import { AtracaoParque } from '@/logic/types/atracao';
import { atracoesDisney } from './todasAtracoesDisney';

export function gerarAtracoesDisneyPorPerfilFluxo(
  turno: 'manha' | 'tarde' | 'noite',
  parque: string,
  perfis: string[] // Agora espera [perfil1, perfil2]
): { area: string; atracoes: AtividadeDia[] }[] {
  const fluxoAreasPorParque: Record<
    string,
    {
      manha: string[];
      tarde: string[];
      noite: string[];
    }
  > = {
    'Magic Kingdom': {
      manha: ['Adventureland', 'Fantasyland', 'Frontierland'],
      tarde: ['Liberty Square', 'Tomorrowland', 'Main Street, U.S.A.'],
      noite: [],
    },
    'EPCOT': {
      manha: ['World Celebration', 'World Discovery', 'World Nature'],
      tarde: ['World Showcase'],
      noite: [],
    },
    'Hollywood Studios': {
      manha: ['Animation Courtyard', 'Echo Lake', 'Grand Avenue'],
      tarde: ['Sunset Boulevard', 'Toy Story Land', "Star Wars: Galaxy’s Edge", 'Hollywood Boulevard'],
      noite: [],
    },
    'Animal Kingdom': {
      // Pandora agora está em manhã, tarde e noite
      manha: ['Pandora – The World of Avatar', 'Oasis', 'Discovery Island', 'Asia'],
      tarde: ['DinoLand U.S.A.', 'Africa', 'Pandora – The World of Avatar'],
      noite: ['Pandora – The World of Avatar', 'Discovery Island'], // para Tree of Life + Pandora
    },
  };

  // Mapa para normalização dos perfis
  const mapaPerfis: Record<string, string> = {
    'radical': 'radicais',
    'radicais': 'radicais',
    'familia': 'familiares',
    'familiares': 'familiares',
    'tematica': 'tematicas',
    'tematicas': 'tematicas',
    'imersivo': 'imersivas',
    'imersivas': 'imersivas',
    'interativa': 'interativas',
    'interativas': 'interativas',
    'todas': 'todas',
  };

  const areasDoTurno = fluxoAreasPorParque[parque]?.[turno] ?? [];
  const [perfil1, perfil2] = perfis.map(p => mapaPerfis[p?.toLowerCase().trim()] ?? p?.toLowerCase().trim());

  // 🔍 Filtro por parque, área válida e perfis do usuário
  // 1º: atrações que têm os dois perfis
  const ambos = atracoesDisney.filter(atracao => {
    const regiaoValida = areasDoTurno.includes(atracao.regiao ?? '');
    const p = Array.isArray(atracao.tipoPerfil)
      ? atracao.tipoPerfil
      : typeof atracao.tipoPerfil === 'string'
        ? [atracao.tipoPerfil]
        : [];
    return (
      atracao.parque === parque &&
      regiaoValida &&
      p.includes(perfil1) &&
      p.includes(perfil2)
    );
  });

  // 2º: atrações só do perfil1 (mas não ambos)
  const soPerfil1 = atracoesDisney.filter(atracao => {
    const regiaoValida = areasDoTurno.includes(atracao.regiao ?? '');
    const p = Array.isArray(atracao.tipoPerfil)
      ? atracao.tipoPerfil
      : typeof atracao.tipoPerfil === 'string'
        ? [atracao.tipoPerfil]
        : [];
    return (
      atracao.parque === parque &&
      regiaoValida &&
      p.includes(perfil1) &&
      !p.includes(perfil2)
    );
  });

  // 3º: atrações só do perfil2 (mas não ambos)
  const soPerfil2 = atracoesDisney.filter(atracao => {
    const regiaoValida = areasDoTurno.includes(atracao.regiao ?? '');
    const p = Array.isArray(atracao.tipoPerfil)
      ? atracao.tipoPerfil
      : typeof atracao.tipoPerfil === 'string'
        ? [atracao.tipoPerfil]
        : [];
    return (
      atracao.parque === parque &&
      regiaoValida &&
      !p.includes(perfil1) &&
      p.includes(perfil2)
    );
  });

  // Junta tudo mantendo prioridade (ambos, depois perfil1, depois perfil2)
  let atracoesFiltradas = [...ambos, ...soPerfil1, ...soPerfil2];

  // 📦 Agrupa por área
  const agrupadasPorArea: Record<string, AtividadeDia[]> = {};

  atracoesFiltradas.forEach((atracao: Partial<AtracaoParque>) => {
    const area = atracao.regiao ?? 'Sem Área';
    if (!agrupadasPorArea[area]) agrupadasPorArea[area] = [];

    agrupadasPorArea[area].push({
      id: atracao.id ?? `${atracao.titulo ?? 'sem-titulo'}-${turno}`,
      tipo: 'atracao',
      titulo: atracao.icone
        ? `${atracao.icone} ${atracao.titulo ?? 'Sem título'}`
        : atracao.titulo ?? 'Sem título',
      descricao: atracao.descricao ?? '',
      subtitulo: atracao.subtitulo ?? atracao.area ?? atracao.regiao ?? '',
      regiao: atracao.regiao ?? '',
      latitude: atracao.latitude ?? 0,
      longitude: atracao.longitude ?? 0,
      alturaMinima: atracao.alturaMinima,
      tempoMedioFila: atracao.tempoMedioFila,
      filaAceitavel: atracao.filaAceitavel,
      idadeRecomendada: atracao.idadeRecomendada,
      perfil: Array.isArray(atracao.tipoPerfil)
        ? atracao.tipoPerfil.join(', ')
        : atracao.tipoPerfil ?? '',
    });
  });

  // 💡 Adiciona o Kilimanjaro Safaris sempre como a primeira atração da manhã no Animal Kingdom
  if (
    parque === 'Animal Kingdom' &&
    turno === 'manha'
  ) {
    // Procura o safári nas atrações de manhã
    const safari = atracoesDisney.find(
      (a) =>
        a.parque === 'Animal Kingdom' &&
        a.titulo?.toLowerCase().includes('kilimanjaro safaris')
    );
    if (safari) {
      const atividade: AtividadeDia = {
        id: safari.id ?? `kilimanjaro-safaris-manhã`,
        tipo: 'atracao',
        titulo: safari.icone
          ? `${safari.icone} ${safari.titulo ?? 'Kilimanjaro Safaris'}`
          : safari.titulo ?? 'Kilimanjaro Safaris',
        descricao: safari.descricao ?? '',
        subtitulo: safari.subtitulo ?? safari.area ?? safari.regiao ?? '',
        regiao: safari.regiao ?? '',
        latitude: safari.latitude ?? 0,
        longitude: safari.longitude ?? 0,
        alturaMinima: safari.alturaMinima,
        tempoMedioFila: safari.tempoMedioFila,
        filaAceitavel: safari.filaAceitavel,
        idadeRecomendada: safari.idadeRecomendada,
        perfil: Array.isArray(safari.tipoPerfil)
          ? safari.tipoPerfil.join(', ')
          : safari.tipoPerfil ?? '',
      };
      // Sempre adiciona como primeira atração da área "Africa" na manhã
      agrupadasPorArea['Africa'] = agrupadasPorArea['Africa'] || [];
      // Evita duplicata
      const existe = agrupadasPorArea['Africa'].some((a) =>
        (a.titulo ?? '').toLowerCase().includes('kilimanjaro safaris')
      );
      if (!existe) {
        agrupadasPorArea['Africa'].unshift(atividade);
      }
    }
    // Garante que a área "Africa" esteja entre as áreas do turno da manhã (para não sumir do retorno)
    if (!areasDoTurno.includes('Africa')) {
      areasDoTurno.unshift('Africa');
    }
  }

  // 🧩 Garante que todas as áreas previstas apareçam mesmo que estejam vazias
  return areasDoTurno.map((area) => ({
    area,
    atracoes: agrupadasPorArea[area] ?? [],
  }));
}
