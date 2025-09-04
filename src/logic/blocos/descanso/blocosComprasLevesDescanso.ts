// src/logic/blocos/descanso/blocosComprasLevesDescanso.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosComprasLevesDescanso: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration Lake',
    descricaoRegiao:
      'Durante a manhã: Ruas arborizadas e clima fresco para iniciar o dia com tranquilidade.\n' +
      'Lojas: Market Street reúne papelarias, galerias e presentes locais, perfeitos para compras leves.\n' +
      'Alimentação e descanso: Bancos à sombra ao redor do lago e cafés na praça central oferecem pausas agradáveis.\n' +
      'Dica: Comece pela trilha do lago, observando os reflexos na água, e termine na papelaria artesanal para garantir souvenirs exclusivos.',
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
          'Caminhada plana com bancos à sombra e vista do lago. Excelente para respirar ar puro e relaxar antes das compras.',
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
          'Boutiques charmosas e papelaria artesanal com itens únicos. Ideal para quem busca presentes diferenciados.',
      },
      {
        tipo: 'descanso',
        titulo: 'Praça central de Celebration',
        regiao: 'Celebration',
        area: 'Celebration',
        latitude: 28.3183,
        longitude: -81.5436,
        local: 'Front St, Celebration, FL',
        descricao:
          'Espaço arborizado com bancos e cafés ao redor. Bom ponto para observar o movimento antes de seguir passeio.',
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
          'Obras de artistas locais, incluindo peças inspiradas nos parques da Disney e na cultura regional.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Waterview Park – Disney Springs',
    descricaoRegiao:
      'Durante a tarde: Atmosfera vibrante com música ambiente e clima descontraído.\n' +
      'Lojas: Destaque para a World of Disney e o criativo Marketplace Co-Op.\n' +
      'Alimentação e descanso: Bancos com vista para o lago e áreas sombreadas garantem pausas agradáveis.\n' +
      'Dica: Sente-se no Waterview Park para observar barcos e tirar fotos antes de explorar a World of Disney.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Marketplace Co-Op',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3703,
        longitude: -81.5158,
        local: 'Disney Springs – Lake Buena Vista',
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
          'Bancos voltados para a água, sombra natural e brisa suave. Ótimo para sorvete e fotos.',
      },
      {
        tipo: 'compras',
        titulo: 'World of Disney',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3706,
        longitude: -81.5159,
        local: 'Disney Springs – Lake Buena Vista',
        descricao:
          'Maior loja temática da Disney, com itens exclusivos e edições limitadas.',
      },
      {
        tipo: 'descanso',
        titulo: 'Área verde próxima à ponte',
        regiao: 'Disney Springs Area',
        area: 'Disney Springs Area',
        latitude: 28.3701,
        longitude: -81.5162,
        local: 'Disney Springs – Lake Buena Vista',
        descricao:
          'Sombra agradável e vista privilegiada para o pôr do sol sobre a ponte.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Pointe Orlando',
    descricaoRegiao:
      'Durante a noite: A I-Drive iluminada cria um ambiente agradável para passeios descontraídos.\n' +
      'Lojas: Pointe Orlando e Premium Outlets com corredores mais vazios e confortáveis.\n' +
      'Alimentação e descanso: Praças com bancos e fontes próximas ao ICON Park.\n' +
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
          'Grandes marcas com descontos atraentes; à noite, o ambiente é mais calmo.',
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
          'Áreas arborizadas com fontes para descansar entre as compras.',
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
        titulo: 'Praça ao ar livre do ICON Park',
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
