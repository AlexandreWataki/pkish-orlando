ï»¿// src/logic/blocos/descanso/blocosConhecendoEUA.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosConhecendoEUA: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Comunidade charmosa inspirada em cidades americanas do inÃƒÂ­cio do sÃƒÂ©culo XX.\n' +
      'Lojas: General Store com produtos vintage e lembranÃƒÂ§as tÃƒÂ­picas.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: PraÃƒÂ§a central e bancos ÃƒÂ  beira do lago para cafÃƒÂ© e fotos.\n' +
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
          'Doces clÃƒÂ¡ssicos, lembranÃƒÂ§as e artigos nostÃƒÂ¡lgicos com temÃƒÂ¡tica americana.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a tarde: Clima vibrante e moderno no coraÃƒÂ§ÃƒÂ£o turÃƒÂ­stico de Orlando.\n' +
      'Lojas: Inclui a retrÃƒÂ´ Ã¢â‚¬Å“5 & Dime AmericanaÃ¢â‚¬Â com doces e souvenires vintage.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos e cafÃƒÂ©s no ICON Park para pausas confortÃƒÂ¡veis.\n' +
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
          'ÃƒÂrea com roda-gigante Ã¢â‚¬Å“The WheelÃ¢â‚¬Â, lojas e ambiente descontraÃƒÂ­do.',
      },
      {
        tipo: 'compras',
        titulo: 'Loja retrÃƒÂ´ Ã¢â‚¬Å“5 & Dime AmericanaÃ¢â‚¬Â',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4378,
        longitude: -81.4693,
        local: 'ICON Park, International Dr, Orlando, FL',
        descricao:
          'Doces antigos, brinquedos clÃƒÂ¡ssicos e souvenires patriÃƒÂ³ticos.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Downtown Orlando',
    descricaoRegiao:
      'Durante a noite: Mistura de histÃƒÂ³ria e urbanidade com iluminaÃƒÂ§ÃƒÂ£o especial.\n' +
      'Lojas: Ã¢â‚¬Å“U.S. Flags & EmblemsÃ¢â‚¬Â com bandeiras e lembranÃƒÂ§as nacionais.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Lake Eola Park com trilhas iluminadas e vista do skyline.\n' +
      'Dica: Foto no anfiteatro com o reflexo das luzes da cidade.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Lake Eola Park ÃƒÂ  noite',
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
        titulo: 'Loja patriÃƒÂ³tica Ã¢â‚¬Å“U.S. Flags & EmblemsÃ¢â‚¬Â',
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
  icone: 'Ã°Å¸Âªâ€“',
  nome: 'Conhecendo os EUA',
  descricao:
    'Locais histÃƒÂ³ricos, memoriais e bairros tÃƒÂ­picos que representam a identidade dos Estados Unidos.',
};
