// src/logic/blocos/descanso/blocosNaturezaParquesAbertos.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosNaturezaParquesAbertos: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Altamonte Springs',
    descricaoRegiao:
      'Durante a manhã: Clima fresco no Cranes Roost Park, com lago, jardins bem cuidados e ambiente sereno.\n' +
      'Atrações: Trilha pavimentada ao redor do lago, decks de madeira e áreas para observar garças.\n' +
      'Descanso e alimentação: Cafés tranquilos no Uptown Altamonte com mesinhas externas à beira do lago.\n' +
      'Dica: Caminhe até o anfiteatro para ter uma vista panorâmica do lago e das aves locais.',
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
          'Caminhada leve por trilha pavimentada com árvores altas, decks e vista para o lago.',
      },
      {
        tipo: 'descanso',
        titulo: 'Café no Uptown Altamonte',
        regiao: 'Altamonte Springs',
        area: 'Altamonte Springs',
        latitude: 28.6651,
        longitude: -81.3775,
        local: 'Uptown Altamonte, Altamonte Springs, FL',
        descricao:
          'Cafés tranquilos com vista para o lago, perfeitos para começar o dia relaxando.',
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
      'Atrações: Lake Virginia e Central Park com áreas gramadas, passarelas e sombra natural.\n' +
      'Descanso e alimentação: Cafés e bancos próximos à Park Avenue.\n' +
      'Dica: Caminhe pela trilha lateral atrás das lojinhas e sente-se perto da água.',
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
          'Áreas gramadas e passarelas com vista para casas históricas e presença de patos.',
      },
      {
        tipo: 'descanso',
        titulo: 'Central Park no centro histórico',
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
      'Atrações: Calçadão ao redor do lago e área central com lojinhas.\n' +
      'Descanso e alimentação: Sorveterias e cafés com mesinhas externas.\n' +
      'Dica: Sente-se na Front Street e aprecie o reflexo das luzes na água.',
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
          'Calçadão iluminado com bancos voltados para a água e clima tranquilo.',
      },
      {
        tipo: 'descanso',
        titulo: 'Centrinho e sorveteria à noite',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3183,
        longitude: -81.5436,
        local: 'Front St, Celebration, FL',
        descricao:
          'Mesas externas e lojinhas iluminadas, ótimo para encerrar o dia.',
      },
    ],
  },
];
