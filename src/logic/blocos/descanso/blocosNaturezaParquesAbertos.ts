// src/logic/blocos/descanso/blocosNaturezaParquesAbertos.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosNaturezaParquesAbertos: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Altamonte Springs',
    descricaoRegiao:
      'Durante a manhÃ£: Clima fresco no Cranes Roost Park, com lago, jardins bem cuidados e ambiente sereno.\n' +
      'AtraÃ§Ãµes: Trilha pavimentada ao redor do lago, decks de madeira e Ã¡reas para observar garÃ§as.\n' +
      'Descanso e alimentaÃ§Ã£o: CafÃ©s tranquilos no Uptown Altamonte com mesinhas externas Ã  beira do lago.\n' +
      'Dica: Caminhe atÃ© o anfiteatro para ter uma vista panorÃ¢mica do lago e das aves locais.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Trilha no Cranes Roost Park',
        regiao: 'Altamonte Springs',
        area: 'Altamonte Springs',
        latitude: 28.6663,
        longitude: -81.3792,
        local: '274 Cranes Roost Blvd, Altamonte Springs, FL',
        descricao:
          'Caminhada leve por trilha pavimentada com Ã¡rvores altas, decks e vista para o lago.',
      },
      {
        tipo: 'descanso',
        titulo: 'CafÃ© no Uptown Altamonte',
        regiao: 'Altamonte Springs',
        area: 'Altamonte Springs',
        latitude: 28.6651,
        longitude: -81.3775,
        local: 'Uptown Altamonte, Altamonte Springs, FL',
        descricao:
          'CafÃ©s tranquilos com vista para o lago, perfeitos para comeÃ§ar o dia relaxando.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Winter Park',
    descricaoRegiao:
      'Durante a tarde: Ruas arborizadas, lagos e parques com clima ameno.\n' +
      'AtraÃ§Ãµes: Lake Virginia e Central Park com Ã¡reas gramadas, passarelas e sombra natural.\n' +
      'Descanso e alimentaÃ§Ã£o: CafÃ©s e bancos prÃ³ximos Ã  Park Avenue.\n' +
      'Dica: Caminhe pela trilha lateral atrÃ¡s das lojinhas e sente-se perto da Ã¡gua.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Passeio no Lake Virginia',
        regiao: 'Winter Park',
        area: 'Winter Park',
        latitude: 28.5935,
        longitude: -81.3484,
        local: 'Rollins College area, Winter Park, FL',
        descricao:
          'Ãreas gramadas e passarelas com vista para casas histÃ³ricas e presenÃ§a de patos.',
      },
      {
        tipo: 'descanso',
        titulo: 'Central Park no centro histÃ³rico',
        regiao: 'Winter Park',
        area: 'Winter Park',
        latitude: 28.5954,
        longitude: -81.3517,
        local: '251 S Park Ave, Winter Park, FL',
        descricao:
          'Parque arborizado com bancos, esculturas e trilha leve para passeio curto.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Celebration',
    descricaoRegiao:
      'Durante a noite: Ruas iluminadas e clima acolhedor.\n' +
      'AtraÃ§Ãµes: CalÃ§adÃ£o ao redor do lago e Ã¡rea central com lojinhas.\n' +
      'Descanso e alimentaÃ§Ã£o: Sorveterias e cafÃ©s com mesinhas externas.\n' +
      'Dica: Sente-se na Front Street e aprecie o reflexo das luzes na Ã¡gua.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Caminhada noturna no lago',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3255,
        longitude: -81.5392,
        local: '631 Sycamore St, Celebration, FL',
        descricao:
          'CalÃ§adÃ£o iluminado com bancos voltados para a Ã¡gua e clima tranquilo.',
      },
      {
        tipo: 'descanso',
        titulo: 'Centrinho e sorveteria Ã  noite',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3183,
        longitude: -81.5436,
        local: 'Front St, Celebration, FL',
        descricao:
          'Mesas externas e lojinhas iluminadas, Ã³timo para encerrar o dia.',
      },
    ],
  },
];
