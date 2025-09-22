// src/logic/blocos/descanso/blocosMallAtMillenia.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosMallAtMillenia: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Millenia',
    descricaoRegiao:
      'Durante a manhÃ£: Mall calmo e elegante, ideal para explorar com tranquilidade.\n' +
      'Lojas: Chanel, Gucci, Tesla, Louis Vuitton e Apple sem filas.\n' +
      'AlimentaÃ§Ã£o e descanso: SofÃ¡s e poltronas prÃ³ximos Ã  fonte central.\n' +
      'Dica: Sente-se perto da fonte com um cafÃ© para comeÃ§ar o dia.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lojas de luxo e design',
        descricao:
          'Explore Chanel, Gucci, Tesla e Apple com atendimento rÃ¡pido e ambiente climatizado.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4861,
        longitude: -81.4303,
      },
      {
        tipo: 'descanso',
        titulo: 'Fonte central interna',
        descricao:
          'Ãrea com sofÃ¡s e poltronas em torno da fonte central. Ambiente climatizado e silencioso.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4861,
        longitude: -81.4303,
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Millenia',
    descricaoRegiao:
      'Durante a tarde: Mais movimento, mas ambiente sofisticado.\n' +
      'Lojas: Macyâ€™s, Bloomingdaleâ€™s, decoraÃ§Ã£o e moda.\n' +
      'AlimentaÃ§Ã£o e descanso: Jardim com bancos e espelho dâ€™Ã¡gua.\n' +
      'Dica: ApÃ³s a Macyâ€™s, relaxe no jardim com vista para o espelho dâ€™Ã¡gua.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Macyâ€™s â€“ moda, casa e beleza',
        descricao:
          'Andares amplos com grande variedade de produtos e promoÃ§Ãµes.',
        local: '4298 Millenia Blvd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4849,
        longitude: -81.4308,
      },
      {
        tipo: 'descanso',
        titulo: 'Jardim e espelho dâ€™Ã¡gua',
        descricao:
          'Ãrea externa com bancos e vista para o espelho dâ€™Ã¡gua, ideal no fim da tarde.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4863,
        longitude: -81.4305,
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Millenia',
    descricaoRegiao:
      'Durante a noite: Clima refinado e tranquilo.\n' +
      'Lojas: Apple aberta atÃ© mais tarde.\n' +
      'AlimentaÃ§Ã£o e descanso: Restaurantes sofisticados com vista interna.\n' +
      'Dica: Jante em um restaurante com vista para o pÃ¡tio iluminado.',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Restaurantes sofisticados',
        descricao:
          'Ambiente elegante para jantar ou tomar um vinho com vista interna.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4861,
        longitude: -81.4303,
      },
      {
        tipo: 'compras',
        titulo: 'Apple Store',
        descricao:
          'Teste lanÃ§amentos e aproveite o atendimento premium atÃ© mais tarde.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4861,
        longitude: -81.4303,
      },
    ],
  },
];
