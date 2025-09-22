ï»¿// src/logic/blocos/descanso/blocosTheLoopAndLakeBuenaVistaFactory.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosTheLoopAndLakeBuenaVistaFactory: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'The Loop Kissimmee',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Clima fresco, lojas organizadas e pouco movimento.\n' +
      'Lojas: Ross, Old Navy, TJ Maxx, Five Below e Best Buy.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos cobertos e cafÃƒÂ©s prÃƒÂ³ximos ao cinema.\n' +
      'Dica: Comece pela Ross e depois TJ Maxx para achar os melhores itens.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'The Loop Ã¢â‚¬â€œ compras a cÃƒÂ©u aberto',
        descricao:
          'Ambiente espaÃƒÂ§oso com Ross, Old Navy, TJ Maxx, Best Buy e Five Below. Ãƒâ€œtimo para explorar com calma.',
        local: '3208 N John Young Pkwy, Kissimmee, FL',
        regiao: 'The Loop',
        area: 'The Loop',
        latitude: 28.3307,
        longitude: -81.4673,
      },
      {
        tipo: 'descanso',
        titulo: 'ÃƒÂrea de descanso central',
        descricao:
          'Bancos e mesas prÃƒÂ³ximas ao cinema, ideais para pausa ÃƒÂ  sombra.',
        local: '3208 N John Young Pkwy, Kissimmee, FL',
        regiao: 'The Loop',
        area: 'The Loop',
        latitude: 28.3307,
        longitude: -81.4673,
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Lake Buena Vista Factory Stores',
    descricaoRegiao:
      'Durante a tarde: Outlet tranquilo e arborizado.\n' +
      'Lojas: Converse, LeviÃ¢â‚¬â„¢s, Reebok, Timberland e Rawlings.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos sombreados no centro.\n' +
      'Dica: Visite a Timberland para promoÃƒÂ§ÃƒÂµes de mochila e tÃƒÂªnis.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lake Buena Vista Factory Stores',
        descricao:
          'Lojas de marca com preÃƒÂ§os competitivos e pouco movimento. Timberland com combos promocionais.',
        local: '15657 S Apopka Vineland Rd, Orlando, FL',
        regiao: 'Lake Buena Vista',
        area: 'Lake Buena Vista',
        latitude: 28.3654,
        longitude: -81.5071,
      },
      {
        tipo: 'descanso',
        titulo: 'ÃƒÂrea sombreada central',
        descricao:
          'Bancos e mesas no centro do outlet, perfeitos para um cafÃƒÂ© tranquilo.',
        local: '15657 S Apopka Vineland Rd, Orlando, FL',
        regiao: 'Lake Buena Vista',
        area: 'Lake Buena Vista',
        latitude: 28.3654,
        longitude: -81.5071,
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'The Loop Kissimmee',
    descricaoRegiao:
      'Durante a noite: Clima calmo e iluminado, ideal para passeio leve.\n' +
      'Lojas: TJ Maxx e Best Buy abertas atÃƒÂ© mais tarde.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos iluminados e mÃƒÂºsica ambiente.\n' +
      'Dica: Revise a TJ Maxx ÃƒÂ  noite para achar promoÃƒÂ§ÃƒÂµes.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Passeio noturno no The Loop',
        descricao:
          'Caminhada leve com iluminaÃƒÂ§ÃƒÂ£o suave e menos movimento.',
        local: '3208 N John Young Pkwy, Kissimmee, FL',
        regiao: 'The Loop',
        area: 'The Loop',
        latitude: 28.3307,
        longitude: -81.4673,
      },
      {
        tipo: 'compras',
        titulo: 'TJ Maxx Ã¢â‚¬â€œ compras noturnas',
        descricao:
          'Ãƒâ€œtimo para garimpar roupas e itens de casa com mais tranquilidade.',
        local: '3208 N John Young Pkwy, Kissimmee, FL',
        regiao: 'The Loop',
        area: 'The Loop',
        latitude: 28.3307,
        longitude: -81.4673,
      },
    ],
  },
];
