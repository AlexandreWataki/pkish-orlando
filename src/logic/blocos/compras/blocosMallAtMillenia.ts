ï»¿// src/logic/blocos/descanso/blocosMallAtMillenia.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosMallAtMillenia: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Millenia',
    descricaoRegiao:
      'Durante a manhÃƒÂ£: Mall calmo e elegante, ideal para explorar com tranquilidade.\n' +
      'Lojas: Chanel, Gucci, Tesla, Louis Vuitton e Apple sem filas.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: SofÃƒÂ¡s e poltronas prÃƒÂ³ximos ÃƒÂ  fonte central.\n' +
      'Dica: Sente-se perto da fonte com um cafÃƒÂ© para comeÃƒÂ§ar o dia.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lojas de luxo e design',
        descricao:
          'Explore Chanel, Gucci, Tesla e Apple com atendimento rÃƒÂ¡pido e ambiente climatizado.',
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
          'ÃƒÂrea com sofÃƒÂ¡s e poltronas em torno da fonte central. Ambiente climatizado e silencioso.',
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
      'Lojas: MacyÃ¢â‚¬â„¢s, BloomingdaleÃ¢â‚¬â„¢s, decoraÃƒÂ§ÃƒÂ£o e moda.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Jardim com bancos e espelho dÃ¢â‚¬â„¢ÃƒÂ¡gua.\n' +
      'Dica: ApÃƒÂ³s a MacyÃ¢â‚¬â„¢s, relaxe no jardim com vista para o espelho dÃ¢â‚¬â„¢ÃƒÂ¡gua.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'MacyÃ¢â‚¬â„¢s Ã¢â‚¬â€œ moda, casa e beleza',
        descricao:
          'Andares amplos com grande variedade de produtos e promoÃƒÂ§ÃƒÂµes.',
        local: '4298 Millenia Blvd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4849,
        longitude: -81.4308,
      },
      {
        tipo: 'descanso',
        titulo: 'Jardim e espelho dÃ¢â‚¬â„¢ÃƒÂ¡gua',
        descricao:
          'ÃƒÂrea externa com bancos e vista para o espelho dÃ¢â‚¬â„¢ÃƒÂ¡gua, ideal no fim da tarde.',
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
      'Lojas: Apple aberta atÃƒÂ© mais tarde.\n' +
      'AlimentaÃƒÂ§ÃƒÂ£o e descanso: Restaurantes sofisticados com vista interna.\n' +
      'Dica: Jante em um restaurante com vista para o pÃƒÂ¡tio iluminado.',
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
          'Teste lanÃƒÂ§amentos e aproveite o atendimento premium atÃƒÂ© mais tarde.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4861,
        longitude: -81.4303,
      },
    ],
  },
];
