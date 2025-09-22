// src/logic/blocos/descanso/blocosConhecendoEUA.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosConhecendoEUA: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration',
    descricaoRegiao:
      'Durante a manhÃ£: Comunidade charmosa inspirada em cidades americanas do inÃ­cio do sÃ©culo XX.\n' +
      'Lojas: General Store com produtos vintage e lembranÃ§as tÃ­picas.\n' +
      'AlimentaÃ§Ã£o e descanso: PraÃ§a central e bancos Ã  beira do lago para cafÃ© e fotos.\n' +
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
          'Doces clÃ¡ssicos, lembranÃ§as e artigos nostÃ¡lgicos com temÃ¡tica americana.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a tarde: Clima vibrante e moderno no coraÃ§Ã£o turÃ­stico de Orlando.\n' +
      'Lojas: Inclui a retrÃ´ â€œ5 & Dime Americanaâ€ com doces e souvenires vintage.\n' +
      'AlimentaÃ§Ã£o e descanso: Bancos e cafÃ©s no ICON Park para pausas confortÃ¡veis.\n' +
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
          'Ãrea com roda-gigante â€œThe Wheelâ€, lojas e ambiente descontraÃ­do.',
      },
      {
        tipo: 'compras',
        titulo: 'Loja retrÃ´ â€œ5 & Dime Americanaâ€',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4378,
        longitude: -81.4693,
        local: 'ICON Park, International Dr, Orlando, FL',
        descricao:
          'Doces antigos, brinquedos clÃ¡ssicos e souvenires patriÃ³ticos.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Downtown Orlando',
    descricaoRegiao:
      'Durante a noite: Mistura de histÃ³ria e urbanidade com iluminaÃ§Ã£o especial.\n' +
      'Lojas: â€œU.S. Flags & Emblemsâ€ com bandeiras e lembranÃ§as nacionais.\n' +
      'AlimentaÃ§Ã£o e descanso: Lake Eola Park com trilhas iluminadas e vista do skyline.\n' +
      'Dica: Foto no anfiteatro com o reflexo das luzes da cidade.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Lake Eola Park Ã  noite',
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
        titulo: 'Loja patriÃ³tica â€œU.S. Flags & Emblemsâ€',
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
  icone: 'ðŸª–',
  nome: 'Conhecendo os EUA',
  descricao:
    'Locais histÃ³ricos, memoriais e bairros tÃ­picos que representam a identidade dos Estados Unidos.',
};
