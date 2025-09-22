ï»¿// src/logic/blocos/descanso/blocosComprasLevesDescanso.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosComprasLevesDescanso: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration Lake',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Ruas arborizadas e clima fresco para iniciar o dia com tranquilidade.\n' +
      'Lojas: Market Street reÃƒÂºne papelarias, galerias e presentes locais, perfeitos para compras leves.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos ÃƒÂ  sombra ao redor do lago e cafÃƒÂ©s na praÃƒÂ§a central oferecem pausas agradÃƒÂ¡veis.\n' +
      'Dica: Comece pela trilha do lago, observando os reflexos na ÃƒÂ¡gua, e termine na papelaria artesanal para garantir souvenirs exclusivos.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Trilhas e bancos ao redor do Celebration Lake',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3255,
        longitude: -81.5392,
        local: '631 Sycamore St, Celebration, FL',
        descricao:
          'Caminhada plana com bancos ÃƒÂ  sombra e vista do lago. Excelente para respirar ar puro e relaxar antes das compras.',
      },
      {
        tipo: 'compras',
        titulo: 'Lojas e vitrines na Market Street',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3188,
        longitude: -81.5447,
        local: 'Market St, Celebration, FL',
        descricao:
          'Boutiques charmosas e papelaria artesanal com itens ÃƒÂºnicos. Ideal para quem busca presentes diferenciados.',
      },
      {
        tipo: 'descanso',
        titulo: 'PraÃƒÂ§a central de Celebration',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3183,
        longitude: -81.5436,
        local: 'Front St, Celebration, FL',
        descricao:
          'EspaÃƒÂ§o arborizado com bancos e cafÃƒÂ©s ao redor. Bom ponto para observar o movimento antes de seguir passeio.',
      },
      {
        tipo: 'compras',
        titulo: 'Galerias e arte local',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.318,
        longitude: -81.5439,
        local: 'Front St, Celebration, FL',
        descricao:
          'Obras de artistas locais, incluindo peÃƒÂ§as inspiradas nos parques da Disney e na cultura regional.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Waterview Park Ã¢â‚¬â€œ Disney Springs',
    descricaoRegiao:
      'Durante a tarde: Atmosfera vibrante com mÃƒÂºsica ambiente e clima descontraÃƒÂ­do.\n' +
      'Lojas: Destaque para a World of Disney e o criativo Marketplace Co-Op.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos com vista para o lago e ÃƒÂ¡reas sombreadas garantem pausas agradÃƒÂ¡veis.\n' +
      'Dica: Sente-se no Waterview Park para observar barcos e tirar fotos antes de explorar a World of Disney.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Marketplace Co-Op',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3703,
        longitude: -81.5158,
        local: 'Disney Springs Ã¢â‚¬â€œ Lake Buena Vista',
        descricao:
          'Microlojas de designers independentes e produtos exclusivos. Visite a WonderGround Gallery para arte Disney alternativa.',
      },
      {
        tipo: 'descanso',
        titulo: 'Waterview Park (beira do lago)',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3707,
        longitude: -81.5144,
        local: '1486 Buena Vista Dr, Lake Buena Vista, FL',
        descricao:
          'Bancos voltados para a ÃƒÂ¡gua, sombra natural e brisa suave. Ãƒâ€œtimo para sorvete e fotos.',
      },
      {
        tipo: 'compras',
        titulo: 'World of Disney',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3706,
        longitude: -81.5159,
        local: 'Disney Springs Ã¢â‚¬â€œ Lake Buena Vista',
        descricao:
          'Maior loja temÃƒÂ¡tica da Disney, com itens exclusivos e ediÃƒÂ§ÃƒÂµes limitadas.',
      },
      {
        tipo: 'descanso',
        titulo: 'ÃƒÂrea verde prÃƒÂ³xima ÃƒÂ  ponte',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3701,
        longitude: -81.5162,
        local: 'Disney Springs Ã¢â‚¬â€œ Lake Buena Vista',
        descricao:
          'Sombra agradÃƒÂ¡vel e vista privilegiada para o pÃƒÂ´r do sol sobre a ponte.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Pointe Orlando',
    descricaoRegiao:
      'Durante a noite: A I-Drive iluminada cria um ambiente agradÃƒÂ¡vel para passeios descontraÃƒÂ­dos.\n' +
      'Lojas: Pointe Orlando e Premium Outlets com corredores mais vazios e confortÃƒÂ¡veis.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: PraÃƒÂ§as com bancos e fontes prÃƒÂ³ximas ao ICON Park.\n' +
      'Dica: Finalize o passeio no letreiro iluminado do ICON Park com a roda-gigante ao fundo.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Orlando International Premium Outlets',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4735,
        longitude: -81.4513,
        local: '4951 International Dr, Orlando, FL',
        descricao:
          'Grandes marcas com descontos atraentes; ÃƒÂ  noite, o ambiente ÃƒÂ© mais calmo.',
      },
      {
        tipo: 'descanso',
        titulo: 'Jardins e bancos do Premium Outlets',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4735,
        longitude: -81.4513,
        local: '4951 International Dr, Orlando, FL',
        descricao:
          'ÃƒÂreas arborizadas com fontes para descansar entre as compras.',
      },
      {
        tipo: 'compras',
        titulo: 'Lojas no Pointe Orlando',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4365,
        longitude: -81.4703,
        local: '9101 International Dr, Orlando, FL',
        descricao:
          'Centro comercial climatizado com souvenirs, moda e produtos locais.',
      },
      {
        tipo: 'descanso',
        titulo: 'PraÃƒÂ§a ao ar livre do ICON Park',
        regiao: 'International Drive',
        area: 'International Drive',
        latitude: 28.4442,
        longitude: -81.469,
        local: '8375 International Dr, Orlando, FL',
        descricao:
          'Bancos sob palmeiras e vista da roda-gigante iluminada para encerrar o dia.',
      },
    ],
  },
];
