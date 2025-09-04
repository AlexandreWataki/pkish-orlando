// src/logic/blocos/compras/blocosDisneySpringsCityWalk.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosDisneySpringsCityWalk: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Universal CityWalk',
    descricaoRegiao:
      'Durante a manhã: CityWalk tem clima vibrante e pouco movimento, ideal para explorar com calma.\n' +
      'Lojas: Universal Store com produtos de Harry Potter, Jurassic Park, Minions e outros temas.\n' +
      'Alimentação e descanso: Cafés e áreas ao ar livre. Próximo ao Hard Rock Café há bancos e sombra.\n' +
      'Dica: Vá cedo à Universal Store para pegar mochilas e itens especiais com mais variedade.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Loja da Universal Studios',
        descricao:
          'Itens licenciados de Harry Potter, Minions e Jurassic Park. Confira mochilas e pelúcias logo cedo.',
        local: '6000 Universal Blvd, Orlando, FL',
        regiao: 'Universal CityWalk',
        area: 'Universal CityWalk',
        latitude: 28.473,
        longitude: -81.4663,
      },
      {
        tipo: 'descanso',
        titulo: 'Vista para o Hard Rock Café',
        descricao:
          'Bancos e jardins tranquilos com vista para o lago e palco. Ótimo para fotos e pausa rápida.',
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
      'Durante a tarde: Disney Springs é ideal para compras e gastronomia ao ar livre.\n' +
      'Lojas: World of Disney, LEGO Store e outras temáticas e de luxo.\n' +
      'Alimentação e descanso: Restaurantes à beira do lago, food trucks e bancos no Waterview Park.\n' +
      'Dica: Vá à área de edição limitada da World of Disney no meio da tarde para garantir produtos exclusivos.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'World of Disney',
        descricao:
          'Maior loja Disney do mundo com roupas, decoração, brinquedos e colecionáveis exclusivos.',
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
          'Bancos à beira do lago com vista para fontes e barcos. Ambiente calmo e ventilado.',
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
    referencia: 'Disney Springs – The Landing',
    descricaoRegiao:
      'Durante a noite: The Landing fica iluminada, com música ao vivo e clima agradável.\n' +
      'Lojas: LEGO Store, Coca-Cola, Zara e suvenires sofisticados.\n' +
      'Alimentação e descanso: Rooftops, docerias e decks à beira do lago.\n' +
      'Dica: Suba no rooftop da Coca-Cola para uma vista panorâmica e fotos noturnas.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'LEGO Store e vitrines',
        descricao:
          'Esculturas iluminadas e vitrines charmosas. Suba ao rooftop da Coca-Cola para vista panorâmica.',
        local: 'Disney Springs – The Landing',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.37,
        longitude: -81.516,
      },
      {
        tipo: 'descanso',
        titulo: 'Deck à beira do lago',
        descricao:
          'Vista iluminada do lago com som ambiente. Local ideal para fechar o dia relaxando.',
        local: 'Lago Disney Springs – Deck principal',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3704,
        longitude: -81.515,
      },
    ],
  },
];
