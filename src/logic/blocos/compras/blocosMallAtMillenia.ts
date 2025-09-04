// src/logic/blocos/descanso/blocosMallAtMillenia.ts
import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosMallAtMillenia: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Millenia',
    descricaoRegiao:
      'Durante a manhã: Mall calmo e elegante, ideal para explorar com tranquilidade.\n' +
      'Lojas: Chanel, Gucci, Tesla, Louis Vuitton e Apple sem filas.\n' +
      'Alimentação e descanso: Sofás e poltronas próximos à fonte central.\n' +
      'Dica: Sente-se perto da fonte com um café para começar o dia.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Lojas de luxo e design',
        descricao:
          'Explore Chanel, Gucci, Tesla e Apple com atendimento rápido e ambiente climatizado.',
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
          'Área com sofás e poltronas em torno da fonte central. Ambiente climatizado e silencioso.',
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
      'Lojas: Macy’s, Bloomingdale’s, decoração e moda.\n' +
      'Alimentação e descanso: Jardim com bancos e espelho d’água.\n' +
      'Dica: Após a Macy’s, relaxe no jardim com vista para o espelho d’água.',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Macy’s – moda, casa e beleza',
        descricao:
          'Andares amplos com grande variedade de produtos e promoções.',
        local: '4298 Millenia Blvd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4849,
        longitude: -81.4308,
      },
      {
        tipo: 'descanso',
        titulo: 'Jardim e espelho d’água',
        descricao:
          'Área externa com bancos e vista para o espelho d’água, ideal no fim da tarde.',
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
      'Lojas: Apple aberta até mais tarde.\n' +
      'Alimentação e descanso: Restaurantes sofisticados com vista interna.\n' +
      'Dica: Jante em um restaurante com vista para o pátio iluminado.',
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
          'Teste lançamentos e aproveite o atendimento premium até mais tarde.',
        local: '4200 Conroy Rd, Orlando, FL',
        regiao: 'Millenia',
        area: 'Millenia',
        latitude: 28.4861,
        longitude: -81.4303,
      },
    ],
  },
];
