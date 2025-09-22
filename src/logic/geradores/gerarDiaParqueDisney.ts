ï»¿// src/logic/geradores/gerarDiaParqueDisney.ts

import { Dia } from '@/logic/types/dia';
import { TurnoDia } from '@/logic/types/turno';
import { Parkisheiro } from '@/logic/types/parkisheiro';

import { format } from 'date-fns';

import { gerarDisneyCafe } from '../blocos/Disney/gerarDisneyCafe';
import { gerarDisneyAlmoco } from '../blocos/Disney/gerarDisneyAlmoco';
import { gerarDisneyJantar } from '../blocos/Disney/gerarDisneyJantar';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';

import { gerarAtracoesDisneyPorPerfilFluxo } from './gerarAtracoesDisneyPorPerfilFluxo';
import { gerarAtracoesNoiteComFogos } from './gerarAtracoesNoiteComFogos';

import { dicasParquesDisney } from '../blocos/Disney/dicasParquesDisney';

// Importando ÃƒÂ¡reas da Disney
import { Adventureland } from './Areas/Adventureland';
import { Fantasyland } from './Areas/Fantasyland';
import { LibertySquare } from './Areas/LibertySquare';
import { Tomorrowland } from './Areas/Tomorrowland';
import { Frontierland } from './Areas/Frontierland';
import { MainStreet } from './Areas/MainStreet';
import { DiscoveryIsland } from './Areas/DiscoveryIsland';
import { DinoLand } from './Areas/DinoLand';
import { Oasis } from './Areas/Oasis';
import { Africa } from './Areas/Africa';
import { Asia } from './Areas/Asia';
import { Pandora } from './Areas/Pandora';
import { EchoLake } from './Areas/EchoLake';
import { GrandAvenue } from './Areas/GrandAvenue';
import { HollywoodBoulevard } from './Areas/HollywoodBoulevard';
import { StarWars } from './Areas/StarWars';
import { ToyStoryLand } from './Areas/ToyStoryLand';
import { WorldCelebration } from './Areas/WorldCelebration';
import { WorldDiscovery } from './Areas/WorldDiscovery';
import { WorldNature } from './Areas/WorldNature';
import { WorldShowcase } from './Areas/WorldShowcase';
import { AnimationCourtyard } from './Areas/AnimationCourtyard';
import { SunsetBoulevard } from './Areas/SunsetBoulevard';

// Mapa de ÃƒÂ¡reas Disney
const mapaAreasDisney: Record<string, any> = {
  Adventureland,
  Fantasyland,
  LibertySquare,
  Tomorrowland,
  Frontierland,
  MainStreet,
  DiscoveryIsland,
  DinoLand,
  Oasis,
  Africa,
  Asia,
  Pandora,
  EchoLake,
  GrandAvenue,
  HollywoodBoulevard,
  StarWars,
  ToyStoryLand,
  WorldCelebration,
  WorldDiscovery,
  WorldNature,
  WorldShowcase,
  AnimationCourtyard,
  SunsetBoulevard,
};

// Mapa de nomes alternativos para ÃƒÂ¡reas
const mapaAreasDisneyNomes: Record<string, string> = {
   'main street': 'MainStreet',
  'main street usa': 'MainStreet',
  'main street u.s.a.': 'MainStreet',  // <--- JÃƒÂ¡ existe, mas podemos reforÃƒÂ§ar
  'main street, u.s.a.': 'MainStreet', // <--- ADICIONAR ESTA LINHA
 'adventureland': 'Adventureland',
  'fantasyland': 'Fantasyland',
  'liberty square': 'LibertySquare',
  'tomorrowland': 'Tomorrowland',
  'frontierland': 'Frontierland',
  'discovery island': 'DiscoveryIsland',
  'dinoland': 'DinoLand',
  'dino land': 'DinoLand',
  'oasis': 'Oasis',
  'africa': 'Africa',
  'asia': 'Asia',
  'pandora': 'Pandora',
  'echo lake': 'EchoLake',
  'grand avenue': 'GrandAvenue',
  'hollywood boulevard': 'HollywoodBoulevard',
  'star wars': 'StarWars',
  'toy story land': 'ToyStoryLand',
  'world celebration': 'WorldCelebration',
  'world discovery': 'WorldDiscovery',
  'world nature': 'WorldNature',
  'world showcase': 'WorldShowcase',
  'animation courtyard': 'AnimationCourtyard',
  'sunset boulevard': 'SunsetBoulevard',
};

// FunÃƒÂ§ÃƒÂ£o para normalizar ÃƒÂ¡reas
function normalizarArea(nome: string): string {
  return mapaAreasDisneyNomes[nome.toLowerCase().trim()] ?? nome;
}

const coordenadasParques: Record<string, { latitude: number; longitude: number }> = {
  'Magic Kingdom': { latitude: 28.4177, longitude: -81.5812 },
  'EPCOT': { latitude: 28.3747, longitude: -81.5494 },
  'Hollywood Studios': { latitude: 28.3575, longitude: -81.5586 },
  'Animal Kingdom': { latitude: 28.359, longitude: -81.5913 },
};

function removerAtracoesDuplicadasPorId(lista: any[]): any[] {
  const seen = new Set();
  return lista.filter(item => {
    if (item && item.id) {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    }
    return true;
  });
}

export async function gerarDiaParqueDisney(numero: number, parkisheiro: Parkisheiro): Promise<Dia> {
  try {
    const dia = parkisheiro.roteiroFinal?.find(d => d.id === `dia${numero}`);
    const perfilAtracao = dia?.perfilAtracoes?.valor;
    if (!perfilAtracao) {
      throw new Error("VocÃƒÂª precisa escolher um perfil de atraÃƒÂ§ÃƒÂµes!");
    }

    const nomeOriginal = dia?.nomeParque ?? 'Magic Kingdom';

    const mapaParques = {
      // MAGIC KINGDOM
      'magic kingdom': 'Magic Kingdom',
      'magic kingdom park': 'Magic Kingdom',
      'mk': 'Magic Kingdom',
      'magickingdom': 'Magic Kingdom',
      'magic-kingdom': 'Magic Kingdom',
      'magik kingdom': 'Magic Kingdom',
      'mk park': 'Magic Kingdom',
      'magick': 'Magic Kingdom',
      'mÃƒÂ¡gic kingdom': 'Magic Kingdom',
      // EPCOT
      'epcot': 'EPCOT',
      'epcot center': 'EPCOT',
      'epcotcentre': 'EPCOT',
      'epcot parque': 'EPCOT',
      'epcot park': 'EPCOT',
      'epcot park center': 'EPCOT',
      'epcot center park': 'EPCOT',
      'epcotc': 'EPCOT',
      'ÃƒÂ©pcot': 'EPCOT',
      // HOLLYWOOD STUDIOS
      'hollywood studios': 'Hollywood Studios',
      'hollywood studio': 'Hollywood Studios',
      'hs': 'Hollywood Studios',
      'hollywood': 'Hollywood Studios',
      'disney hollywood studios': 'Hollywood Studios',
      'hollywood studios park': 'Hollywood Studios',
      'hws': 'Hollywood Studios',
      'holywood studios': 'Hollywood Studios',
      'holiwood studios': 'Hollywood Studios',
      'hollywoods': 'Hollywood Studios',
      // ANIMAL KINGDOM
      'animal kingdom': 'Animal Kingdom',
      'disney animal kingdom': 'Animal Kingdom',
      'animalkingdom': 'Animal Kingdom',
      'animal-kingdom': 'Animal Kingdom',
      'ak': 'Animal Kingdom',
      'animalkingdom park': 'Animal Kingdom',
      'animal kingdom park': 'Animal Kingdom',
      'animalkingdompark': 'Animal Kingdom',
      'anml kingdom': 'Animal Kingdom',
      'animal': 'Animal Kingdom',
    };

    const nomeNormalizado = nomeOriginal.toLowerCase().trim();
    const parque = mapaParques[nomeNormalizado] ?? 'Magic Kingdom';

    const coordenadas = coordenadasParques[parque];
    const latitudeParque = coordenadas.latitude;
    const longitudeParque = coordenadas.longitude;

    const regiaoHospedagem = parkisheiro.regiaoHospedagem;
    const baseLat = regiaoHospedagem?.latitude;
    const baseLon = regiaoHospedagem?.longitude;

    const transporteIda: any[] = [];
    const transporteVolta: any[] = [];

    // ATRAÃƒâ€¡Ãƒâ€¢ES
    const atracoesManhaPorArea = gerarAtracoesDisneyPorPerfilFluxo('manha', parque, perfilAtracao);
    const atracoesTardePorArea = gerarAtracoesDisneyPorPerfilFluxo('tarde', parque, perfilAtracao);

    for (const area of atracoesManhaPorArea) area.atracoes = removerAtracoesDuplicadasPorId(area.atracoes);
    for (const area of atracoesTardePorArea) area.atracoes = removerAtracoesDuplicadasPorId(area.atracoes);

    const idsManha = new Set(atracoesManhaPorArea.flatMap(a => a.atracoes.map(x => x.id)));
    for (const area of atracoesTardePorArea) {
      area.atracoes = area.atracoes.filter(a => !idsManha.has(a.id));
    }

    const areasNoite = atracoesTardePorArea.map(a => a.area);
    let atracoesNoite = gerarAtracoesNoiteComFogos(parque, areasNoite, perfilAtracao);

    const idsDia = new Set([
      ...atracoesManhaPorArea.flatMap(a => a.atracoes.map(x => x.id)),
      ...atracoesTardePorArea.flatMap(a => a.atracoes.map(x => x.id)),
    ]);
    atracoesNoite = atracoesNoite.filter(a => !idsDia.has(a.id));

    let ultimaAtracaoManha: any = null;
    for (let i = atracoesManhaPorArea.length - 1; i >= 0; i--) {
      if (atracoesManhaPorArea[i].atracoes.length > 0) {
        ultimaAtracaoManha = atracoesManhaPorArea[i].atracoes[atracoesManhaPorArea[i].atracoes.length - 1];
        break;
      }
    }

    const primeiraAtracaoManha = atracoesManhaPorArea[0]?.atracoes[0];
    const primeiraAtracaoTarde = atracoesTardePorArea[0]?.atracoes[0];
    const primeiraAtracaoNoite = atracoesNoite[0];

    const cafe = primeiraAtracaoManha
      ? await gerarDisneyCafe(parkisheiro, primeiraAtracaoManha.regiao, primeiraAtracaoManha.latitude, primeiraAtracaoManha.longitude)
      : [];

    const refeicaoAlmocoReferencia = ultimaAtracaoManha || primeiraAtracaoTarde;
    const almoco = refeicaoAlmocoReferencia
      ? await gerarDisneyAlmoco(
          parkisheiro,
          refeicaoAlmocoReferencia.regiao,
          refeicaoAlmocoReferencia.latitude,
          refeicaoAlmocoReferencia.longitude
        )
      : [];

    const jantar = primeiraAtracaoNoite
      ? await gerarDisneyJantar(parkisheiro, primeiraAtracaoNoite.regiao, primeiraAtracaoNoite.latitude, primeiraAtracaoNoite.longitude)
      : [];

    const data = new Date(parkisheiro.dataInicio ?? Date.now());
    data.setDate(data.getDate() + numero - 1);
    const dataIso = format(data, 'yyyy-MM-dd');

    // Montar ÃƒÂ¡reas e atraÃƒÂ§ÃƒÂµes
    const montarAtividadesPorTurno = (atracoesPorArea: { area: string; atracoes: any[] }[]) =>
      atracoesPorArea.flatMap(({ area, atracoes }) => {
        const areaNormalizada = normalizarArea(area);
        const areaModule = mapaAreasDisney[areaNormalizada];
        const descricaoArea = areaModule?.descricao ?? `Bem-vindo ÃƒÂ  ÃƒÂ¡rea ${area}`;
        return [
          { titulo: `ÃƒÂrea: ${area}`, descricao: descricaoArea, tipo: 'informativa' },
          ...atracoes,
        ];
      });

    const blocoDicas = dicasParquesDisney[parque] || dicasParquesDisney["Magic Kingdom"];

    const turnos: TurnoDia[] = [
      { titulo: 'Transporte atÃƒÂ© o Parque', atividades: transporteIda },
      {
        titulo: 'ManhÃƒÂ£',
        atividades: [
          {
            titulo: 'Dicas do dia',
            subtitulo: parque,
            descricao:
              (blocoDicas.resumo ? `${blocoDicas.resumo}\n` : '') +
              (blocoDicas.chegada ? `${blocoDicas.chegada}\n` : '') +
              `EstratÃƒÂ©gia: ${blocoDicas.estrategia}\n` +
              `ManhÃƒÂ£: ${blocoDicas.manha}\n` +
              `Genie+: ${blocoDicas.genie}\n` +
              `RefeiÃƒÂ§ÃƒÂ£o: ${blocoDicas.refeicao}\n` +
              `Tarde: ${blocoDicas.tarde}\n` +
              `Fogos: ${blocoDicas.fogos}\n` +
              `Perfil: ${blocoDicas.perfil}\n` +
              `App: ${blocoDicas.app}\n` +
              `Eventos: ${blocoDicas.eventos}\n` +
              `Local: ${blocoDicas.local}\n` +
              `RecomendaÃƒÂ§ÃƒÂ£o: ${blocoDicas.recomendacao}\n` +
              `Dica: ${blocoDicas.dica}`,
            tipo: 'informativa',
          },
          ...cafe,
          ...montarAtividadesPorTurno(atracoesManhaPorArea),
        ],
      },
      {
        titulo: 'Tarde',
        atividades: [
          ...almoco,
          ...montarAtividadesPorTurno(atracoesTardePorArea),
        ],
      },
      { titulo: 'Noite', atividades: [...jantar, ...atracoesNoite] },
      { titulo: `Volta para a RegiÃƒÂ£o Ã¢â‚¬â€œ ${regiaoHospedagem?.nome ?? 'Hospedagem'}`, atividades: transporteVolta },
    ];

    return {
      id: `disney-${numero}`,
      tipo: 'disney',
      numero,
      data: dataIso,
      cabecalho: {
        titulo: 'Dia de Parque Ã¢â‚¬â€œ Disney',
        imagem: 'disney.jpg',
        clima: { temperatura: 29, condicao: 'Ensolarado', icone: 'sunny' },
      },
      objetivo: 'Aproveite um dia completo em um parque da Disney com atraÃƒÂ§ÃƒÂµes personalizadas para seu perfil.',
      turnos,
      dicas: [],
      regiao: {
        nome: parque,
        descricao: `${parque}, ${baseLat && baseLon ? `${calcDistanciaKm(baseLat, baseLon, latitudeParque, longitudeParque).toFixed(2)} km` : ''}`,
      },
      perfilAtracoes: { valor: perfilAtracao, nome: 'Perfil de atraÃƒÂ§ÃƒÂµes personalizado', icone: 'Ã°Å¸Å½Â¢' },
      localizacaoFogos: primeiraAtracaoNoite || null,
    };
  } catch (erro) {
    console.error('Erro gerarDiaParqueDisney:', erro);
    return {
      id: `disney-${numero}`,
      tipo: 'disney',
      numero,
      data: new Date().toISOString().split('T')[0],
      cabecalho: {
        titulo: 'Erro ao gerar dia de parque',
        imagem: 'disney.jpg',
        clima: { temperatura: 0, condicao: 'Indefinido', icone: 'error' },
      },
      objetivo: 'NÃƒÂ£o foi possÃƒÂ­vel gerar o conteÃƒÂºdo deste dia.',
      turnos: [],
      dicas: [],
      regiao: { nome: 'Desconhecido', descricao: 'Desconhecido' },
      localizacaoFogos: null,
    };
  }
}
