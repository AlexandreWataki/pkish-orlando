// src/logic/blocos/descanso/blocosConhecendoEUA.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosConhecendoEUA: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration',
    descricaoRegiao:
      'Durante a manhã: Comunidade charmosa inspirada em cidades americanas do início do século XX.\n' +
      'Lojas: General Store com produtos vintage e lembranças típicas.\n' +
      'Alimentação e descanso: Praça central e bancos à beira do lago para café e fotos.\n' +
      'Dica: Caminhe pela trilha do lago e termine na General Store para provar as balas artesanais.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Passeio por ruas coloniais americanas',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3183,
        longitude: -81.5436,
        local: 'Front St, Celebration, FL',
        descricao:
          'Ruas arborizadas e casas tradicionais com bandeiras e jardins bem cuidados.',
      },
      {
        tipo: 'compras',
        titulo: 'General Store com itens vintage',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3188,
        longitude: -81.5447,
        local: 'Market St, Celebration, FL',
        descricao:
          'Doces clássicos, lembranças e artigos nostálgicos com temática americana.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a tarde: Clima vibrante e moderno no coração turístico de Orlando.\n' +
      'Lojas: Inclui a retrô “5 & Dime Americana” com doces e souvenires vintage.\n' +
      'Alimentação e descanso: Bancos e cafés no ICON Park para pausas confortáveis.\n' +
      'Dica: Foto com a bandeira americana na entrada do ICON Park.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Passeio pelo ICON Park',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4374,
        longitude: -81.4692,
        local: 'ICON Park, International Dr, Orlando, FL',
        descricao:
          'Área com roda-gigante “The Wheel”, lojas e ambiente descontraído.',
      },
      {
        tipo: 'compras',
        titulo: 'Loja retrô “5 & Dime Americana”',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4378,
        longitude: -81.4693,
        local: 'ICON Park, International Dr, Orlando, FL',
        descricao:
          'Doces antigos, brinquedos clássicos e souvenires patrióticos.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Downtown Orlando',
    descricaoRegiao:
      'Durante a noite: Mistura de história e urbanidade com iluminação especial.\n' +
      'Lojas: “U.S. Flags & Emblems” com bandeiras e lembranças nacionais.\n' +
      'Alimentação e descanso: Lake Eola Park com trilhas iluminadas e vista do skyline.\n' +
      'Dica: Foto no anfiteatro com o reflexo das luzes da cidade.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Lake Eola Park à noite',
        regiao: 'Downtown Orlando',
        area: 'Downtown Orlando',
        latitude: 28.5449,
        longitude: -81.3731,
        local: 'Lake Eola Park, Orlando, FL',
        descricao:
          'Caminhada tranquila com cisnes e skyline iluminado.',
      },
      {
        tipo: 'compras',
        titulo: 'Loja patriótica “U.S. Flags & Emblems”',
        regiao: 'Downtown Orlando',
        area: 'Downtown Orlando',
        latitude: 28.5555,
        longitude: -81.3609,
        local: '1515 E Colonial Dr, Orlando, FL',
        descricao:
          'Bandeiras, patches militares e mapas antigos dos EUA.',
      },
    ],
  },
];

export const perfilConhecendoEUA = {
  icone: '🪖',
  nome: 'Conhecendo os EUA',
  descricao:
    'Locais históricos, memoriais e bairros típicos que representam a identidade dos Estados Unidos.',
};
