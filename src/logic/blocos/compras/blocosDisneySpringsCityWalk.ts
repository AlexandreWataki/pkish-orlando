ï»¿// src/logic/blocos/compras/blocosDisneySpringsCityWalk.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosDisneySpringsCityWalk: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Universal CityWalk',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: CityWalk tem clima vibrante e pouco movimento, ideal para explorar com calma.\n' +
      'Lojas: Universal Store com produtos de Harry Potter, Jurassic Park, Minions e outros temas.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: CafÃƒÂ©s e ÃƒÂ¡reas ao ar livre. PrÃƒÂ³ximo ao Hard Rock CafÃƒÂ© hÃƒÂ¡ bancos e sombra.\n' +
      'Dica: VÃƒÂ¡ cedo ÃƒÂ  Universal Store para pegar mochilas e itens especiais com mais variedade.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Loja da Universal Studios',
        descricao:
          'Itens licenciados de Harry Potter, Minions e Jurassic Park. Confira mochilas e pelÃƒÂºcias logo cedo.',
        local: '6000 Universal Blvd, Orlando, FL',
        regiao: 'Universal CityWalk',
        area: 'Universal CityWalk',
        latitude: 28.473,
        longitude: -81.4663,
      },
      {
        tipo: 'descanso',
        titulo: 'Vista para o Hard Rock CafÃƒÂ©',
        descricao:
          'Bancos e jardins tranquilos com vista para o lago e palco. Ãƒâ€œtimo para fotos e pausa rÃƒÂ¡pida.',
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
      'Durante a tarde: Disney Springs ÃƒÂ© ideal para compras e gastronomia ao ar livre.\n' +
      'Lojas: World of Disney, LEGO Store e outras temÃƒÂ¡ticas e de luxo.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Restaurantes ÃƒÂ  beira do lago, food trucks e bancos no Waterview Park.\n' +
      'Dica: VÃƒÂ¡ ÃƒÂ  ÃƒÂ¡rea de ediÃƒÂ§ÃƒÂ£o limitada da World of Disney no meio da tarde para garantir produtos exclusivos.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'World of Disney',
        descricao:
          'Maior loja Disney do mundo com roupas, decoraÃƒÂ§ÃƒÂ£o, brinquedos e colecionÃƒÂ¡veis exclusivos.',
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
          'Bancos ÃƒÂ  beira do lago com vista para fontes e barcos. Ambiente calmo e ventilado.',
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
    referencia: 'Disney Springs Ã¢â‚¬â€œ The Landing',
    descricaoRegiao:
      'Durante a noite: The Landing fica iluminada, com mÃƒÂºsica ao vivo e clima agradÃƒÂ¡vel.\n' +
      'Lojas: LEGO Store, Coca-Cola, Zara e suvenires sofisticados.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Rooftops, docerias e decks ÃƒÂ  beira do lago.\n' +
      'Dica: Suba no rooftop da Coca-Cola para uma vista panorÃƒÂ¢mica e fotos noturnas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'LEGO Store e vitrines',
        descricao:
          'Esculturas iluminadas e vitrines charmosas. Suba ao rooftop da Coca-Cola para vista panorÃƒÂ¢mica.',
        local: 'Disney Springs Ã¢â‚¬â€œ The Landing',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.37,
        longitude: -81.516,
      },
      {
        tipo: 'descanso',
        titulo: 'Deck ÃƒÂ  beira do lago',
        descricao:
          'Vista iluminada do lago com som ambiente. Local ideal para fechar o dia relaxando.',
        local: 'Lago Disney Springs Ã¢â‚¬â€œ Deck principal',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3704,
        longitude: -81.515,
      },
    ],
  },
];
