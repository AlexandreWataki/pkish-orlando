// src/logic/geradores/gerarDiaParqueUniversal.ts

import { Dia } from '@/logic/types/dia';
import { TurnoDia } from '@/logic/types/turno';
import { Parkisheiro } from '@/logic/types/parkisheiro';

import { format } from 'date-fns';

import { gerarUniversalCafe } from '../blocos/ParquesUniversal/gerarUniversalyCafe';
import { gerarUniversalAlmoco } from '../blocos/ParquesUniversal/gerarUniversalAlmoco';
import { gerarUniversalJantar } from '../blocos/ParquesUniversal/gerarUniversalJantar';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';

import { gerarAtracoesUniversalPorPerfilFluxo } from './gerarAtracoesUniversalPorPerfilFluxo';
import { dicasParquesUniversal } from '../blocos/ParquesUniversal/dicasParquesUniversal';

// Importando áreas Universal

// — Universal Studios Florida
import { ProductionCentral } from './AreasUniversal/ProductionCentral';
import { MinionsLand } from './AreasUniversal/MinionsLand';
import { NewYork } from './AreasUniversal/NewYork';
import { SanFrancisco } from './AreasUniversal/SanFrancisco';
// ⚠️ Se o arquivo exporta WorldExpoSpringfield, trazemos com alias:
import { WorldExpo } from './AreasUniversal/WorldExpo';
import { Hollywood } from './AreasUniversal/Hollywood';
import { TheWizardingWorld } from './AreasUniversal/TheWizardingWorld';
import { TheWizardingWorldDiagonAlley } from './AreasUniversal/TheWizardingWorldDiagonAlley';

// — Islands of Adventure
import { MarvelSuperHeroIsland } from './AreasUniversal/MarvelSuperHeroIsland';
import { ToonLagoon } from './AreasUniversal/ToonLagoon';
import { SeussLanding } from './AreasUniversal/SeussLanding';
import { JurassicPark } from './AreasUniversal/JurassicPark';
import { TheWizardingWorldHogsmeade } from './AreasUniversal/TheWizardingWorldHogsmeade';
import { LostContinent } from './AreasUniversal/LostContinent';
import { SkullIsland } from './AreasUniversal/SkullIsland'; // <-- NOVO

// — Epic Universe
import { CelestialPark } from './AreasUniversal/CelestialPark';
import { SuperNintendoWorld } from './AreasUniversal/SuperNintendoWorld';
import { HowToTrainYourDragon } from './AreasUniversal/HowToTrainYourDragon';
import { UniversalMonsters } from './AreasUniversal/UniversalMonsters';
import { MinistryOfMagic } from './AreasUniversal/MinistryOfMagic';

// Importando experiências noturnas
import { experienciaUniversalStudiosNoite } from './AreasUniversal/FogosUniversalStudios';
import { experienciaIslandsOfAdventureNoite } from './AreasUniversal/FogosIslandsOfAdventure';
import { experienciaEpicoUniverseNoite } from './AreasUniversal/FogosEpicoUniverse';

const mapaAreas: Record<string, any> = {
  // — Universal Studios Florida
  'Production Central': ProductionCentral,
  'Minions Land': MinionsLand,
  'New York': NewYork,
  'San Francisco': SanFrancisco,
  'World Expo': WorldExpo,
  'Hollywood': Hollywood,
  'The Wizarding World': TheWizardingWorld,
  'The Wizarding World – Diagon Alley': TheWizardingWorldDiagonAlley,

  // — Islands of Adventure
  'Marvel Super Hero Island': MarvelSuperHeroIsland,
  'Toon Lagoon': ToonLagoon,
  'Seuss Landing': SeussLanding,
  'Jurassic Park': JurassicPark,
  'Skull Island': SkullIsland, // <-- NOVO
  'The Wizarding World – Hogsmeade': TheWizardingWorldHogsmeade,
  'Lost Continent': LostContinent,

  // — Epic Universe
  'Celestial Park': CelestialPark,
  'Super Nintendo World': SuperNintendoWorld,
  'How to Train Your Dragon': HowToTrainYourDragon,
  'Universal Monsters': UniversalMonsters,
  'Ministry of Magic': MinistryOfMagic,
};

const coordenadasParques: Record<string, { latitude: number; longitude: number }> = {
  'Universal Studios Florida': { latitude: 28.4721, longitude: -81.4689 },
  'Islands of Adventure': { latitude: 28.4727, longitude: -81.4688 },
  "Universal's Epic Universe": { latitude: 28.4729, longitude: -81.4690 },
};

// Áreas permitidas para cada parque (ordem define o fluxo básico)
const mapaAreasPorParque: Record<string, string[]> = {
  'Universal Studios Florida': [
    'Production Central',
    'Minions Land',
    'New York',
    'San Francisco',
    'World Expo',
    'Hollywood',
    'The Wizarding World',
    'The Wizarding World – Diagon Alley',
  ],
  'Islands of Adventure': [
    'Marvel Super Hero Island',
    'Toon Lagoon',
    'Seuss Landing',
    'Jurassic Park',
    'Skull Island', // <-- NOVO
    'The Wizarding World – Hogsmeade',
    'Lost Continent',
  ],
  "Universal's Epic Universe": [
    'Celestial Park',
    'Super Nintendo World',
    'How to Train Your Dragon',
    'Ministry of Magic',
    'Universal Monsters',
  ],
};

function removerAtracoesDuplicadasPorId(lista: any[]): any[] {
  const seen = new Set();
  return lista.filter((item) => {
    if (item && item.id) {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }
    return true;
  });
}

async function gerarRefeicaoMaisProxima(
  parkisheiro: Parkisheiro,
  tipo: 'cafe' | 'almoco' | 'jantar',
  atracaoReferencia: any
) {
  if (!atracaoReferencia) return [];

  const { regiao, latitude, longitude } = atracaoReferencia;

  switch (tipo) {
    case 'cafe':
      return await gerarUniversalCafe(parkisheiro, regiao, latitude, longitude);
    case 'almoco':
      return await gerarUniversalAlmoco(parkisheiro, regiao, latitude, longitude);
    case 'jantar':
      return await gerarUniversalJantar(parkisheiro, regiao, latitude, longitude);
    default:
      return [];
  }
}

export async function gerarDiaParqueUniversal(
  numero: number,
  parkisheiro: Parkisheiro
): Promise<Dia> {
  try {
    const dia = parkisheiro.roteiroFinal?.find((d) => d.id === `dia${numero}`);
    const perfilAtracao = dia?.perfilAtracoes?.valor;

    if (!perfilAtracao) {
      throw new Error('Você precisa escolher um perfil de atrações!');
    }

    const perfisArray = Array.isArray(perfilAtracao) ? perfilAtracao : [perfilAtracao];
    const nomeOriginal = dia?.nomeParque ?? 'Universal Studios Florida';

    const mapaParques: Record<string, string> = {
      'universal studios florida': 'Universal Studios Florida',
      usf: 'Universal Studios Florida',
      'universal studios': 'Universal Studios Florida',
      universal: 'Universal Studios Florida',
      'islands of adventure': 'Islands of Adventure',
      ioa: 'Islands of Adventure',
      'epic universe': "Universal's Epic Universe",
      epic: "Universal's Epic Universe",
    };

    const nomeNormalizado = nomeOriginal.toLowerCase().trim();
    const parque = mapaParques[nomeNormalizado] ?? 'Universal Studios Florida';

    const coordenadas = coordenadasParques[parque];
    const latitudeParque = coordenadas.latitude;
    const longitudeParque = coordenadas.longitude;

    const regiaoHospedagem = parkisheiro.regiaoHospedagem;
    const baseLat = regiaoHospedagem?.latitude;
    const baseLon = regiaoHospedagem?.longitude;

    const transporteIda: any[] = [];
    const transporteVolta: any[] = [];

    const areasPermitidas = mapaAreasPorParque[parque] || [];
    const filtrarAreas = (atracoesPorArea: { area: string; atracoes: any[] }[]) =>
      atracoesPorArea.filter((a) => areasPermitidas.includes(a.area));

    const atracoesManhaPorArea = filtrarAreas(
      gerarAtracoesUniversalPorPerfilFluxo('manha', parque, perfisArray)
    );
    const atracoesTardePorArea = filtrarAreas(
      gerarAtracoesUniversalPorPerfilFluxo('tarde', parque, perfisArray)
    );

    // Dedup dentro de cada área
    for (const area of atracoesManhaPorArea) {
      area.atracoes = removerAtracoesDuplicadasPorId(area.atracoes);
    }
    for (const area of atracoesTardePorArea) {
      area.atracoes = removerAtracoesDuplicadasPorId(area.atracoes);
    }

    // Não repetir atrações que já foram na manhã
    const idsManha = new Set(atracoesManhaPorArea.flatMap((a) => a.atracoes.map((x) => x.id)));
    for (const area of atracoesTardePorArea) {
      area.atracoes = area.atracoes.filter((a) => !idsManha.has(a.id));
    }

    let ultimaAtracaoManha: any = null;
    for (let i = atracoesManhaPorArea.length - 1; i >= 0; i--) {
      if (atracoesManhaPorArea[i].atracoes.length > 0) {
        ultimaAtracaoManha =
          atracoesManhaPorArea[i].atracoes[atracoesManhaPorArea[i].atracoes.length - 1];
        break;
      }
    }

    const primeiraAtracaoManha = atracoesManhaPorArea[0]?.atracoes[0];
    const primeiraAtracaoTarde = atracoesTardePorArea[0]?.atracoes[0];

    const cafe = await gerarRefeicaoMaisProxima(parkisheiro, 'cafe', primeiraAtracaoManha);
    const almoco = await gerarRefeicaoMaisProxima(
      parkisheiro,
      'almoco',
      ultimaAtracaoManha || primeiraAtracaoTarde
    );

    const experienciaNoite =
      parque === 'Universal Studios Florida'
        ? experienciaUniversalStudiosNoite
        : parque === 'Islands of Adventure'
        ? experienciaIslandsOfAdventureNoite
        : experienciaEpicoUniverseNoite;

    // ** Jantar próximo ao show noturno (usa a 1ª referência do bloco de noite) **
    const refNoite = experienciaNoite?.[0];
    const jantar = await gerarUniversalJantar(
      parkisheiro,
      refNoite?.regiao ?? parque,
      refNoite?.latitude,
      refNoite?.longitude
    );

    const data = new Date(parkisheiro.dataInicio ?? Date.now());
    data.setDate(data.getDate() + numero - 1);
    const dataIso = format(data, 'yyyy-MM-dd');

    const montarAtividadesPorTurno = (atracoesPorArea: { area: string; atracoes: any[] }[]) =>
      atracoesPorArea.flatMap(({ area, atracoes }) => {
        const areaModule = mapaAreas[area];
        const descricaoArea = areaModule?.descricao ?? `Bem-vindo à área ${area}`;
        return [{ titulo: `Área: ${area}`, descricao: descricaoArea, tipo: 'informativa' }, ...atracoes];
      });

    const blocoDicas =
      dicasParquesUniversal[parque] || dicasParquesUniversal['Universal Studios Florida'];

    const turnoManha: TurnoDia = {
      titulo: 'Manhã',
      atividades: [
        {
          titulo: 'Dicas do dia',
          subtitulo: parque,
          descricao:
            (blocoDicas.resumo ? `${blocoDicas.resumo}\n` : '') +
            (blocoDicas.chegada ? `${blocoDicas.chegada}\n` : '') +
            `Estratégia: ${blocoDicas.estrategia}\n` +
            `Manhã: ${blocoDicas.manha}\n` +
            `Refeição: ${blocoDicas.refeicao}\n` +
            `Tarde: ${blocoDicas.tarde}\n` +
            `Fogos: ${blocoDicas.fogos}\n` +
            `Perfil: ${blocoDicas.perfil}\n` +
            `App: ${blocoDicas.app}\n` +
            `Eventos: ${blocoDicas.eventos}\n` +
            `Recomendação: ${blocoDicas.recomendacao}\n` +
            `Dica: ${blocoDicas.dica}`,
          tipo: 'informativa',
        },
        ...cafe,
        ...montarAtividadesPorTurno(atracoesManhaPorArea),
      ],
    };

    const turnoTarde: TurnoDia = {
      titulo: 'Tarde',
      atividades: [...almoco, ...montarAtividadesPorTurno(atracoesTardePorArea)],
    };

    const turnoNoite: TurnoDia = {
      titulo: 'Noite',
      atividades: [...jantar, ...(experienciaNoite ?? [])],
    };

    const turnos: TurnoDia[] = [
      { titulo: 'Transporte até o Parque', atividades: transporteIda },
      turnoManha,
      turnoTarde,
      turnoNoite,
      {
        titulo: `Volta para a Região – ${regiaoHospedagem?.nome ?? 'Hospedagem'}`,
        atividades: transporteVolta,
      },
    ];

    return {
      id: `universal-${numero}`,
      tipo: 'universal',
      numero,
      data: dataIso,
      cabecalho: {
        titulo: 'Dia de Parque – Universal',
        imagem: 'universal.jpg',
        clima: { temperatura: 29, condicao: 'Ensolarado', icone: 'sunny' },
      },
      objetivo:
        'Aproveite um dia completo em um parque da Universal com atrações personalizadas para seu perfil.',
      turnos,
      dicas: [],
      regiao: {
        nome: parque,
        descricao: `${parque}, ${
          baseLat && baseLon
            ? `${calcDistanciaKm(baseLat, baseLon, latitudeParque, longitudeParque).toFixed(2)} km`
            : ''
        }`,
      },
      perfilAtracoes: {
        valor: perfilAtracao,
        nome: 'Perfil de atrações personalizado',
        icone: '🎢',
      },
      localizacaoFogos: refNoite || null,
    };
  } catch (erro) {
    console.error('Erro gerarDiaParqueUniversal:', erro);
    return {
      id: `universal-${numero}`,
      tipo: 'universal',
      numero,
      data: new Date().toISOString().split('T')[0],
      cabecalho: {
        titulo: 'Erro ao gerar dia de parque',
        imagem: 'universal.jpg',
        clima: { temperatura: 0, condicao: 'Indefinido', icone: 'error' },
      },
      objetivo: 'Não foi possível gerar o conteúdo deste dia.',
      turnos: [],
      dicas: [],
      regiao: { nome: 'Desconhecido', descricao: 'Desconhecido' },
      localizacaoFogos: null,
    };
  }
}
