// src/logic/blocos/compras/blocosDisneySpringsCityWalk.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosDisneySpringsCityWalk: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Universal CityWalk',
    descricaoRegiao:
      'Durante a manhÃ£: CityWalk tem clima vibrante e pouco movimento, ideal para explorar com calma.\n' +
      'Lojas: Universal Store com produtos de Harry Potter, Jurassic Park, Minions e outros temas.\n' +
      'AlimentaÃ§Ã£o e descanso: CafÃ©s e Ã¡reas ao ar livre. PrÃ³ximo ao Hard Rock CafÃ© hÃ¡ bancos e sombra.\n' +
      'Dica: VÃ¡ cedo Ã  Universal Store para pegar mochilas e itens especiais com mais variedade.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Loja da Universal Studios',
        descricao:
          'Itens licenciados de Harry Potter, Minions e Jurassic Park. Confira mochilas e pelÃºcias logo cedo.',
        local: '6000 Universal Blvd, Orlando, FL',
        regiao: 'Universal CityWalk',
        area: 'Universal CityWalk',
        latitude: 28.473,
        longitude: -81.4663,
      },
      {
        tipo: 'descanso',
        titulo: 'Vista para o Hard Rock CafÃ©',
        descricao:
          'Bancos e jardins tranquilos com vista para o lago e palco. Ã“timo para fotos e pausa rÃ¡pida.',
        local: 'Universal CityWalk, Orlando, FL',
        regiao: 'Universal CityWalk',
        area: 'Universal CityWalk',
        latitude: 28.4718,
        longitude: -81.4668,
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Disney Springs',
    descricaoRegiao:
      'Durante a tarde: Disney Springs Ã© ideal para compras e gastronomia ao ar livre.\n' +
      'Lojas: World of Disney, LEGO Store e outras temÃ¡ticas e de luxo.\n' +
      'AlimentaÃ§Ã£o e descanso: Restaurantes Ã  beira do lago, food trucks e bancos no Waterview Park.\n' +
      'Dica: VÃ¡ Ã  Ã¡rea de ediÃ§Ã£o limitada da World of Disney no meio da tarde para garantir produtos exclusivos.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'World of Disney',
        descricao:
          'Maior loja Disney do mundo com roupas, decoraÃ§Ã£o, brinquedos e colecionÃ¡veis exclusivos.',
        local: '1486 Buena Vista Dr, Lake Buena Vista, FL',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3706,
        longitude: -81.5159,
      },
      {
        tipo: 'descanso',
        titulo: 'Banco no Waterview Park',
        descricao:
          'Bancos Ã  beira do lago com vista para fontes e barcos. Ambiente calmo e ventilado.',
        local: 'Waterview Park, Disney Springs',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3707,
        longitude: -81.5144,
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Disney Springs â€“ The Landing',
    descricaoRegiao:
      'Durante a noite: The Landing fica iluminada, com mÃºsica ao vivo e clima agradÃ¡vel.\n' +
      'Lojas: LEGO Store, Coca-Cola, Zara e suvenires sofisticados.\n' +
      'AlimentaÃ§Ã£o e descanso: Rooftops, docerias e decks Ã  beira do lago.\n' +
      'Dica: Suba no rooftop da Coca-Cola para uma vista panorÃ¢mica e fotos noturnas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'LEGO Store e vitrines',
        descricao:
          'Esculturas iluminadas e vitrines charmosas. Suba ao rooftop da Coca-Cola para vista panorÃ¢mica.',
        local: 'Disney Springs â€“ The Landing',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.37,
        longitude: -81.516,
      },
      {
        tipo: 'descanso',
        titulo: 'Deck Ã  beira do lago',
        descricao:
          'Vista iluminada do lago com som ambiente. Local ideal para fechar o dia relaxando.',
        local: 'Lago Disney Springs â€“ Deck principal',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3704,
        longitude: -81.515,
      },
    ],
  },
];
