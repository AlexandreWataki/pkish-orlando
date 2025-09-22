// src/logic/blocos/descanso/blocosWalmartTargetFiveBelow.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosWalmartTargetFiveBelow: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Kissimmee Loop West',
    descricaoRegiao:
      'Durante a manhÃ£: Clima fresco, pouco movimento e espaÃ§o aberto.\n' +
      'Lojas: Ross, Five Below e utilidades diversas.\n' +
      'AlimentaÃ§Ã£o e descanso: Bancos ao ar livre prÃ³ximos ao cinema.\n' +
      'Dica: VÃ¡ primeiro Ã  Five Below e depois Ã  Ross para achar os melhores itens.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Five Below â€“ The Loop',
        descricao:
          'Produtos criativos, camisetas, doces, acessÃ³rios e papelaria por atÃ© $5.',
        local: '3244 N John Young Pkwy, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3439,
        longitude: -81.4213,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ao ar livre no The Loop',
        descricao:
          'Ãrea tranquila com paisagismo e calÃ§adas largas, ideal para cafÃ© e pausa leve.',
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
      'Durante a tarde: EspaÃ§o amplo e sombreado, movimento moderado.\n' +
      'Lojas: Target e Five Below.\n' +
      'AlimentaÃ§Ã£o e descanso: Bancos sob Ã¡rvores entre as lojas.\n' +
      'Dica: Comece pela seÃ§Ã£o Dollar Spot da Target, itens criativos esgotam rÃ¡pido.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Target â€“ Rolling Oaks Commons',
        descricao:
          'Ambiente moderno com roupas, brinquedos, snacks e decoraÃ§Ã£o. SeÃ§Ã£o Dollar Spot com achados sazonais.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3272,
        longitude: -81.5828,
      },
      {
        tipo: 'compras',
        titulo: 'Five Below â€“ Rolling Oaks Commons',
        descricao:
          'Itens divertidos e acessÃ­veis, incluindo eletrÃ´nicos, brinquedos e presentes criativos.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3274,
        longitude: -81.5825,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos Ã  sombra',
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
      'Lojas: Walmart aberto atÃ© tarde.\n' +
      'AlimentaÃ§Ã£o e descanso: Bancos sob Ã¡rvores prÃ³ximos Ã  entrada.\n' +
      'Dica: Confira a seÃ§Ã£o de doces e cereais americanos antes de sair.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Walmart Supercenter',
        descricao:
          'Grande variedade de roupas, eletrÃ´nicos, snacks e itens para viagem. SeÃ§Ã£o de doces e cereais Ã© imperdÃ­vel.',
        local: '2855 N Old Lake Wilson Rd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3352,
        longitude: -81.5867,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos prÃ³ximos Ã  entrada',
        descricao:
          'Bom para reorganizar compras ou fazer um lanche rÃ¡pido antes de encerrar o dia.',
        local: '2855 N Old Lake Wilson Rd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3352,
        longitude: -81.5867,
      },
    ],
  },
];
