ï»¿import { AtividadeDia } from '@/logic/types/atividade';
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
      tarde: ['Sunset Boulevard', 'Toy Story Land', "Star Wars: GalaxyÃ¢â‚¬â„¢s Edge", 'Hollywood Boulevard'],
      noite: [],
    },
    'Animal Kingdom': {
      // Pandora agora estÃƒÂ¡ em manhÃƒÂ£, tarde e noite
      manha: ['Pandora Ã¢â‚¬â€œ The World of Avatar', 'Oasis', 'Discovery Island', 'Asia'],
      tarde: ['DinoLand U.S.A.', 'Africa', 'Pandora Ã¢â‚¬â€œ The World of Avatar'],
      noite: ['Pandora Ã¢â‚¬â€œ The World of Avatar', 'Discovery Island'], // para Tree of Life + Pandora
    },
  };

  // Mapa para normalizaÃƒÂ§ÃƒÂ£o dos perfis
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

  // Ã°Å¸â€Â Filtro por parque, ÃƒÂ¡rea vÃƒÂ¡lida e perfis do usuÃƒÂ¡rio
  // 1Ã‚Âº: atraÃƒÂ§ÃƒÂµes que tÃƒÂªm os dois perfis
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

  // 2Ã‚Âº: atraÃƒÂ§ÃƒÂµes sÃƒÂ³ do perfil1 (mas nÃƒÂ£o ambos)
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

  // 3Ã‚Âº: atraÃƒÂ§ÃƒÂµes sÃƒÂ³ do perfil2 (mas nÃƒÂ£o ambos)
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

  // Ã°Å¸â€œÂ¦ Agrupa por ÃƒÂ¡rea
  const agrupadasPorArea: Record<string, AtividadeDia[]> = {};

  atracoesFiltradas.forEach((atracao: Partial<AtracaoParque>) => {
    const area = atracao.regiao ?? 'Sem ÃƒÂrea';
    if (!agrupadasPorArea[area]) agrupadasPorArea[area] = [];

    agrupadasPorArea[area].push({
      id: atracao.id ?? `${atracao.titulo ?? 'sem-titulo'}-${turno}`,
      tipo: 'atracao',
      titulo: atracao.icone
        ? `${atracao.icone} ${atracao.titulo ?? 'Sem tÃƒÂ­tulo'}`
        : atracao.titulo ?? 'Sem tÃƒÂ­tulo',
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

  // Ã°Å¸â€™Â¡ Adiciona o Kilimanjaro Safaris sempre como a primeira atraÃƒÂ§ÃƒÂ£o da manhÃƒÂ£ no Animal Kingdom
  if (
    parque === 'Animal Kingdom' &&
    turno === 'manha'
  ) {
    // Procura o safÃƒÂ¡ri nas atraÃƒÂ§ÃƒÂµes de manhÃƒÂ£
    const safari = atracoesDisney.find(
      (a) =>
        a.parque === 'Animal Kingdom' &&
        a.titulo?.toLowerCase().includes('kilimanjaro safaris')
    );
    if (safari) {
      const atividade: AtividadeDia = {
        id: safari.id ?? `kilimanjaro-safaris-manhÃƒÂ£`,
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
      // Sempre adiciona como primeira atraÃƒÂ§ÃƒÂ£o da ÃƒÂ¡rea "Africa" na manhÃƒÂ£
      agrupadasPorArea['Africa'] = agrupadasPorArea['Africa'] || [];
      // Evita duplicata
      const existe = agrupadasPorArea['Africa'].some((a) =>
        (a.titulo ?? '').toLowerCase().includes('kilimanjaro safaris')
      );
      if (!existe) {
        agrupadasPorArea['Africa'].unshift(atividade);
      }
    }
    // Garante que a ÃƒÂ¡rea "Africa" esteja entre as ÃƒÂ¡reas do turno da manhÃƒÂ£ (para nÃƒÂ£o sumir do retorno)
    if (!areasDoTurno.includes('Africa')) {
      areasDoTurno.unshift('Africa');
    }
  }

  // Ã°Å¸Â§Â© Garante que todas as ÃƒÂ¡reas previstas apareÃƒÂ§am mesmo que estejam vazias
  return areasDoTurno.map((area) => ({
    area,
    atracoes: agrupadasPorArea[area] ?? [],
  }));
}
