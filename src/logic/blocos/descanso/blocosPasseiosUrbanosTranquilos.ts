// src/logic/blocos/descanso/blocosPasseiosUrbanosTranquilos.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosPasseiosUrbanosTranquilos: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Sand Lake',
    descricaoRegiao:
      'Durante a manhÃ£: RegiÃ£o charmosa e serena, com calÃ§adas largas, jardins e pouco movimento.\n' +
      'AtraÃ§Ãµes: Dellagio Town Center com arquitetura europeia e torre central.\n' +
      'Descanso e alimentaÃ§Ã£o: Bancos Ã  sombra e vista para o lago prÃ³ximo ao Whole Foods.\n' +
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
          'CalÃ§adas largas e clima calmo, ideal para passeio leve e observaÃ§Ã£o urbana.',
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
          'Arquitetura europeia, jardins e bancos em ambiente silencioso e fotogÃªnico.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a tarde: CombinaÃ§Ã£o de lazer e tranquilidade, com sombra e Ã¡reas para caminhada.\n' +
      'AtraÃ§Ãµes: ICON Park e Pointe Orlando com fontes, espelhos dâ€™Ã¡gua e paisagismo.\n' +
      'Descanso e alimentaÃ§Ã£o: Bancos sob palmeiras e cafÃ©s ao ar livre.\n' +
      'Dica: Sente-se em frente ao museu de cera ou no espelho dâ€™Ã¡gua do Pointe para boas fotos.',
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
          'Bancos confortÃ¡veis, sombra e vista para a roda-gigante. Clima descontraÃ­do.',
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
          'Espelhos dâ€™Ã¡gua, jardins e fontes para pausas tranquilas durante a tarde.',
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
      'AtraÃ§Ãµes: CalÃ§adÃ£o com letreiros coloridos, vista para os parques e espelhos dâ€™Ã¡gua.\n' +
      'Descanso e alimentaÃ§Ã£o: Bancos perto do Hard Rock CafÃ© com vista para o lago.\n' +
      'Dica: Observe o letreiro giratÃ³rio e o reflexo das luzes na Ã¡gua.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'CityWalk Ã  noite',
        regiao: 'Universal Area',
        area: 'Universal Area',
        latitude: 28.4743,
        longitude: -81.4678,
        local: '6000 Universal Blvd, Orlando, FL',
        descricao:
          'Passeio iluminado e descontraÃ­do, ideal apÃ³s o jantar. Vista para o lago e mÃºsica ambiente.',
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ao lado do Hard Rock CafÃ©',
        regiao: 'Universal Area',
        area: 'Universal Area',
        latitude: 28.4745,
        longitude: -81.4676,
        local: '6050 Universal Blvd, Orlando, FL',
        descricao:
          'Ãrea arborizada e tranquila para sentar, observar a Ã¡gua e relaxar.',
      },
    ],
  },
];

export const perfilPasseiosUrbanosTranquilos = {
  icone: 'ðŸ™ï¸',
  nome: 'Passeios urbanos tranquilos',
  descricao:
    'ExploraÃ§Ã£o urbana em ritmo calmo por Ã¡reas arborizadas, calÃ§adÃµes e centros de lazer.',
};
