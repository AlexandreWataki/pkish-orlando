ï»¿// src/logic/blocos/descanso/blocosPasseiosUrbanosTranquilos.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosPasseiosUrbanosTranquilos: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Sand Lake',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: RegiÃƒÂ£o charmosa e serena, com calÃƒÂ§adas largas, jardins e pouco movimento.\n' +
      'AtraÃƒÂ§ÃƒÂµes: Dellagio Town Center com arquitetura europeia e torre central.\n' +
      'Descanso e alimentaÃƒÂ§ÃƒÂ£o: Bancos ÃƒÂ  sombra e vista para o lago prÃƒÂ³ximo ao Whole Foods.\n' +
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
          'CalÃƒÂ§adas largas e clima calmo, ideal para passeio leve e observaÃƒÂ§ÃƒÂ£o urbana.',
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
          'Arquitetura europeia, jardins e bancos em ambiente silencioso e fotogÃƒÂªnico.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a tarde: CombinaÃƒÂ§ÃƒÂ£o de lazer e tranquilidade, com sombra e ÃƒÂ¡reas para caminhada.\n' +
      'AtraÃƒÂ§ÃƒÂµes: ICON Park e Pointe Orlando com fontes, espelhos dÃ¢â‚¬â„¢ÃƒÂ¡gua e paisagismo.\n' +
      'Descanso e alimentaÃƒÂ§ÃƒÂ£o: Bancos sob palmeiras e cafÃƒÂ©s ao ar livre.\n' +
      'Dica: Sente-se em frente ao museu de cera ou no espelho dÃ¢â‚¬â„¢ÃƒÂ¡gua do Pointe para boas fotos.',
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
          'Bancos confortÃƒÂ¡veis, sombra e vista para a roda-gigante. Clima descontraÃƒÂ­do.',
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
          'Espelhos dÃ¢â‚¬â„¢ÃƒÂ¡gua, jardins e fontes para pausas tranquilas durante a tarde.',
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
      'AtraÃƒÂ§ÃƒÂµes: CalÃƒÂ§adÃƒÂ£o com letreiros coloridos, vista para os parques e espelhos dÃ¢â‚¬â„¢ÃƒÂ¡gua.\n' +
      'Descanso e alimentaÃƒÂ§ÃƒÂ£o: Bancos perto do Hard Rock CafÃƒÂ© com vista para o lago.\n' +
      'Dica: Observe o letreiro giratÃƒÂ³rio e o reflexo das luzes na ÃƒÂ¡gua.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'CityWalk ÃƒÂ  noite',
        regiao: 'Universal Area',
        area: 'Universal Area',
        latitude: 28.4743,
        longitude: -81.4678,
        local: '6000 Universal Blvd, Orlando, FL',
        descricao:
          'Passeio iluminado e descontraÃƒÂ­do, ideal apÃƒÂ³s o jantar. Vista para o lago e mÃƒÂºsica ambiente.',
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ao lado do Hard Rock CafÃƒÂ©',
        regiao: 'Universal Area',
        area: 'Universal Area',
        latitude: 28.4745,
        longitude: -81.4676,
        local: '6050 Universal Blvd, Orlando, FL',
        descricao:
          'ÃƒÂrea arborizada e tranquila para sentar, observar a ÃƒÂ¡gua e relaxar.',
      },
    ],
  },
];

export const perfilPasseiosUrbanosTranquilos = {
  icone: 'Ã°Å¸Ââ„¢Ã¯Â¸Â',
  nome: 'Passeios urbanos tranquilos',
  descricao:
    'ExploraÃƒÂ§ÃƒÂ£o urbana em ritmo calmo por ÃƒÂ¡reas arborizadas, calÃƒÂ§adÃƒÂµes e centros de lazer.',
};
