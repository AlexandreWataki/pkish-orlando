// src/logic/blocos/descanso/blocosWalmartTargetFiveBelow.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosWalmartTargetFiveBelow: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Kissimmee Loop West',
    descricaoRegiao:
      'Durante a manhã: Clima fresco, pouco movimento e espaço aberto.\n' +
      'Lojas: Ross, Five Below e utilidades diversas.\n' +
      'Alimentação e descanso: Bancos ao ar livre próximos ao cinema.\n' +
      'Dica: Vá primeiro à Five Below e depois à Ross para achar os melhores itens.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Five Below – The Loop',
        descricao:
          'Produtos criativos, camisetas, doces, acessórios e papelaria por até $5.',
        local: '3244 N John Young Pkwy, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3439,
        longitude: -81.4213,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ao ar livre no The Loop',
        descricao:
          'Área tranquila com paisagismo e calçadas largas, ideal para café e pausa leve.',
        local: '3208 N John Young Pkwy, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3438,
        longitude: -81.4216,
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Target - Rolling Oaks Commons',
    descricaoRegiao:
      'Durante a tarde: Espaço amplo e sombreado, movimento moderado.\n' +
      'Lojas: Target e Five Below.\n' +
      'Alimentação e descanso: Bancos sob árvores entre as lojas.\n' +
      'Dica: Comece pela seção Dollar Spot da Target, itens criativos esgotam rápido.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Target – Rolling Oaks Commons',
        descricao:
          'Ambiente moderno com roupas, brinquedos, snacks e decoração. Seção Dollar Spot com achados sazonais.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3272,
        longitude: -81.5828,
      },
      {
        tipo: 'compras',
        titulo: 'Five Below – Rolling Oaks Commons',
        descricao:
          'Itens divertidos e acessíveis, incluindo eletrônicos, brinquedos e presentes criativos.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3274,
        longitude: -81.5825,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos à sombra',
        descricao:
          'Local silencioso para pausa, organizar compras ou tomar algo gelado.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3271,
        longitude: -81.5827,
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Walmart Supercenter - Kissimmee',
    descricaoRegiao:
      'Durante a noite: Movimento tranquilo e estacionamento iluminado.\n' +
      'Lojas: Walmart aberto até tarde.\n' +
      'Alimentação e descanso: Bancos sob árvores próximos à entrada.\n' +
      'Dica: Confira a seção de doces e cereais americanos antes de sair.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Walmart Supercenter',
        descricao:
          'Grande variedade de roupas, eletrônicos, snacks e itens para viagem. Seção de doces e cereais é imperdível.',
        local: '2855 N Old Lake Wilson Rd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3352,
        longitude: -81.5867,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos próximos à entrada',
        descricao:
          'Bom para reorganizar compras ou fazer um lanche rápido antes de encerrar o dia.',
        local: '2855 N Old Lake Wilson Rd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3352,
        longitude: -81.5867,
      },
    ],
  },
];
