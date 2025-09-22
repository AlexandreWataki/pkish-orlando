ï»¿// src/logic/blocos/descanso/blocosWalmartTargetFiveBelow.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosWalmartTargetFiveBelow: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Kissimmee Loop West',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Clima fresco, pouco movimento e espaÃƒÂ§o aberto.\n' +
      'Lojas: Ross, Five Below e utilidades diversas.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos ao ar livre prÃƒÂ³ximos ao cinema.\n' +
      'Dica: VÃƒÂ¡ primeiro ÃƒÂ  Five Below e depois ÃƒÂ  Ross para achar os melhores itens.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Five Below Ã¢â‚¬â€œ The Loop',
        descricao:
          'Produtos criativos, camisetas, doces, acessÃƒÂ³rios e papelaria por atÃƒÂ© $5.',
        local: '3244 N John Young Pkwy, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3439,
        longitude: -81.4213,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ao ar livre no The Loop',
        descricao:
          'ÃƒÂrea tranquila com paisagismo e calÃƒÂ§adas largas, ideal para cafÃƒÂ© e pausa leve.',
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
      'Durante a tarde: EspaÃƒÂ§o amplo e sombreado, movimento moderado.\n' +
      'Lojas: Target e Five Below.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos sob ÃƒÂ¡rvores entre as lojas.\n' +
      'Dica: Comece pela seÃƒÂ§ÃƒÂ£o Dollar Spot da Target, itens criativos esgotam rÃƒÂ¡pido.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Target Ã¢â‚¬â€œ Rolling Oaks Commons',
        descricao:
          'Ambiente moderno com roupas, brinquedos, snacks e decoraÃƒÂ§ÃƒÂ£o. SeÃƒÂ§ÃƒÂ£o Dollar Spot com achados sazonais.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3272,
        longitude: -81.5828,
      },
      {
        tipo: 'compras',
        titulo: 'Five Below Ã¢â‚¬â€œ Rolling Oaks Commons',
        descricao:
          'Itens divertidos e acessÃƒÂ­veis, incluindo eletrÃƒÂ´nicos, brinquedos e presentes criativos.',
        local: '3200 Rolling Oaks Blvd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3274,
        longitude: -81.5825,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos ÃƒÂ  sombra',
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
      'Lojas: Walmart aberto atÃƒÂ© tarde.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Bancos sob ÃƒÂ¡rvores prÃƒÂ³ximos ÃƒÂ  entrada.\n' +
      'Dica: Confira a seÃƒÂ§ÃƒÂ£o de doces e cereais americanos antes de sair.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Walmart Supercenter',
        descricao:
          'Grande variedade de roupas, eletrÃƒÂ´nicos, snacks e itens para viagem. SeÃƒÂ§ÃƒÂ£o de doces e cereais ÃƒÂ© imperdÃƒÂ­vel.',
        local: '2855 N Old Lake Wilson Rd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3352,
        longitude: -81.5867,
      },
      {
        tipo: 'descanso',
        titulo: 'Bancos prÃƒÂ³ximos ÃƒÂ  entrada',
        descricao:
          'Bom para reorganizar compras ou fazer um lanche rÃƒÂ¡pido antes de encerrar o dia.',
        local: '2855 N Old Lake Wilson Rd, Kissimmee, FL',
        regiao: 'Kissimmee',
        latitude: 28.3352,
        longitude: -81.5867,
      },
    ],
  },
];
