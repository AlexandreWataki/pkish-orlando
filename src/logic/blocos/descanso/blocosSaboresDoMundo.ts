ï»¿// src/logic/blocos/descanso/blocosSaboresDoMundo.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosSaboresDoMundo: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'International Drive',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: A I-Drive reÃƒÂºne padarias, mercados e cafÃƒÂ©s de vÃƒÂ¡rias culturas.\n' +
      'AtraÃƒÂ§ÃƒÂµes: InfluÃƒÂªncias francesa, asiÃƒÂ¡tica e americana em um passeio gastronÃƒÂ´mico.\n' +
      'Descanso e alimentaÃƒÂ§ÃƒÂ£o: Mesas externas e degustaÃƒÂ§ÃƒÂµes em mercados e docerias.\n' +
      'Dica: Prove um doce asiÃƒÂ¡tico e fotografe a fachada do World Market.',
    atividades: [
      {
        tipo: 'refeicao',
        titulo: 'CafÃƒÂ© de Paris',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4685,
        longitude: -81.451,
        local: '5269 International Dr, Orlando, FL',
        descricao:
          'Croissants e cafÃƒÂ© espresso em ambiente francÃƒÂªs com mesas externas.',
      },
      {
        tipo: 'refeicao',
        titulo: 'World Market',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4689,
        longitude: -81.4502,
        local: '5295 International Dr, Orlando, FL',
        descricao:
          'Produtos e snacks de diversos paÃƒÂ­ses com ÃƒÂ¡rea para degustaÃƒÂ§ÃƒÂ£o.',
      },
      {
        tipo: 'refeicao',
        titulo: 'Ice & Bites',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4746,
        longitude: -81.4328,
        local: '3402 Technological Ave, Orlando, FL',
        descricao:
          'Waffles recheados e sorvetes tailandeses enrolados com sabores tropicais.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Sand Lake',
    descricaoRegiao:
      'Durante a tarde: Sand Lake Road, a Ã¢â‚¬Å“Restaurant RowÃ¢â‚¬Â, ÃƒÂ© um polo gourmet.\n' +
      'AtraÃƒÂ§ÃƒÂµes: Restaurantes japoneses, libaneses, brasileiros e italianos.\n' +
      'Descanso e alimentaÃƒÂ§ÃƒÂ£o: Jardins e cafÃƒÂ©s modernos para pausas.\n' +
      'Dica: Experimente uma culinÃƒÂ¡ria nova e diferente do seu hÃƒÂ¡bito.',
    atividades: [
      {
        tipo: 'refeicao',
        titulo: 'Restaurant Row',
        regiao: 'Sand Lake',
        area: 'Sand Lake',
        latitude: 28.4461,
        longitude: -81.4305,
        local: 'Sand Lake Rd, Orlando, FL',
        descricao:
          'Pratos tÃƒÂ­picos de vÃƒÂ¡rias culturas em uma das avenidas mais gastronÃƒÂ´micas de Orlando.',
      },
      {
        tipo: 'refeicao',
        titulo: 'Foxtail Coffee',
        regiao: 'Sand Lake',
        area: 'Sand Lake',
        latitude: 28.4455,
        longitude: -81.4363,
        local: '7600 Dr Phillips Blvd #14, Orlando, FL',
        descricao:
          'CafÃƒÂ© artesanal e doces locais para uma pausa pÃƒÂ³s-almoÃƒÂ§o.',
      },
      {
        tipo: 'refeicao',
        titulo: 'Jardins do Dellagio',
        regiao: 'Sand Lake',
        area: 'Sand Lake',
        latitude: 28.445,
        longitude: -81.4362,
        local: '7924 Via Dellagio Way, Orlando, FL',
        descricao:
          'Sorvete artesanal nos jardins elegantes do Dellagio.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Disney Springs',
    descricaoRegiao:
      'Durante a noite: Disney Springs ÃƒÂ© iluminado e gastronÃƒÂ´mico.\n' +
      'AtraÃƒÂ§ÃƒÂµes: Restaurantes refinados e confeitarias sofisticadas.\n' +
      'Descanso e alimentaÃƒÂ§ÃƒÂ£o: Mesas ao ar livre e clima romÃƒÂ¢ntico ÃƒÂ  beira do lago.\n' +
      'Dica: Jante no BOATHOUSE e finalize com sobremesa na AmoretteÃ¢â‚¬â„¢s.',
    atividades: [
      {
        tipo: 'refeicao',
        titulo: 'The BOATHOUSE',
        regiao: 'Disney Springs',
        area: 'Disney Springs',
        latitude: 28.3702,
        longitude: -81.5138,
        local: '1620 E Buena Vista Dr, Orlando, FL',
        descricao:
          'Frutos do mar e carnes nobres com vista para o lago.',
      },
      {
        tipo: 'refeicao',
        titulo: 'AmoretteÃ¢â‚¬â„¢s Patisserie',
        regiao: 'Disney Springs',
        area: 'Disney Springs',
        latitude: 28.3709,
        longitude: -81.5143,
        local: '1520 E Buena Vista Dr #A, Orlando, FL',
        descricao:
          'Doces refinados como entremets, macarons e mousses.',
      },
      {
        tipo: 'refeicao',
        titulo: 'Waterview Park',
        regiao: 'Disney Springs',
        area: 'Disney Springs',
        latitude: 28.3707,
        longitude: -81.5144,
        local: '1486 Buena Vista Dr, Lake Buena Vista, FL',
        descricao:
          'Croissant recheado ÃƒÂ  beira do lago com vista iluminada.',
      },
    ],
  },
];

export const perfilSaboresDoMundo = {
  icone: 'Ã°Å¸ÂÂ½Ã¯Â¸Â',
  nome: 'Sabores do Mundo',
  descricao:
    'Roteiro gastronÃƒÂ´mico com cafÃƒÂ©s, restaurantes e mercados temÃƒÂ¡ticos de vÃƒÂ¡rias culturas.',
};
