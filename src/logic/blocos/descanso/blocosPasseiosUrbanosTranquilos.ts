// src/logic/blocos/descanso/blocosPasseiosUrbanosTranquilos.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosPasseiosUrbanosTranquilos: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Sand Lake',
    descricaoRegiao:
      'Durante a manhã: Região charmosa e serena, com calçadas largas, jardins e pouco movimento.\n' +
      'Atrações: Dellagio Town Center com arquitetura europeia e torre central.\n' +
      'Descanso e alimentação: Bancos à sombra e vista para o lago próximo ao Whole Foods.\n' +
      'Dica: Caminhe pelo Dellagio observando a arquitetura e sente-se nos bancos voltados para o lago.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Sand Lake Road tranquila',
        regiao: 'Sand Lake',
        area: 'Sand Lake',
        latitude: 28.4461,
        longitude: -81.4305,
        local: 'Sand Lake Rd, Orlando, FL',
        descricao:
          'Calçadas largas e clima calmo, ideal para passeio leve e observação urbana.',
      },
      {
        tipo: 'descanso',
        titulo: 'Dellagio Town Center',
        regiao: 'Sand Lake',
        area: 'Sand Lake',
        latitude: 28.445,
        longitude: -81.4362,
        local: '7924 Via Dellagio Way, Orlando, FL',
        descricao:
          'Arquitetura europeia, jardins e bancos em ambiente silencioso e fotogênico.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a tarde: Combinação de lazer e tranquilidade, com sombra e áreas para caminhada.\n' +
      'Atrações: ICON Park e Pointe Orlando com fontes, espelhos d’água e paisagismo.\n' +
      'Descanso e alimentação: Bancos sob palmeiras e cafés ao ar livre.\n' +
      'Dica: Sente-se em frente ao museu de cera ou no espelho d’água do Pointe para boas fotos.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Passeio no ICON Park',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4442,
        longitude: -81.469,
        local: '8375 International Dr, Orlando, FL',
        descricao:
          'Bancos confortáveis, sombra e vista para a roda-gigante. Clima descontraído.',
      },
      {
        tipo: 'descanso',
        titulo: 'Pointe Orlando',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4365,
        longitude: -81.4703,
        local: '9101 International Dr, Orlando, FL',
        descricao:
          'Espelhos d’água, jardins e fontes para pausas tranquilas durante a tarde.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Universal Area',
    descricaoRegiao:
      'Durante a noite: CityWalk iluminada e vibrante, perfeita para encerrar o dia.\n' +
      'Atrações: Calçadão com letreiros coloridos, vista para os parques e espelhos d’água.\n' +
      'Descanso e alimentação: Bancos perto do Hard Rock Café com vista para o lago.\n' +
      'Dica: Observe o letreiro giratório e o reflexo das luzes na água.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'CityWalk à noite',
        regiao: 'Universal Area',
        area: 'Universal Area',
        latitude: 28.4743,
        longitude: -81.4678,
        local: '6000 Universal Blvd, Orlando, FL',
        descricao:
          'Passeio iluminado e descontraído, ideal após o jantar. Vista para o lago e música ambiente.',
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ao lado do Hard Rock Café',
        regiao: 'Universal Area',
        area: 'Universal Area',
        latitude: 28.4745,
        longitude: -81.4676,
        local: '6050 Universal Blvd, Orlando, FL',
        descricao:
          'Área arborizada e tranquila para sentar, observar a água e relaxar.',
      },
    ],
  },
];

export const perfilPasseiosUrbanosTranquilos = {
  icone: '🏙️',
  nome: 'Passeios urbanos tranquilos',
  descricao:
    'Exploração urbana em ritmo calmo por áreas arborizadas, calçadões e centros de lazer.',
};
