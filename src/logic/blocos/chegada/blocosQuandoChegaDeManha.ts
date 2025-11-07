// src/logic/blocos/chegada/blocosQuandoChegaDeManha.ts

import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeManha: TurnoDescansoRegiao[] = [
   {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Lake Buena Vista – Disney Springs + Walmart',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Retirada de Tickets Disney + Pulseiras',
        regiao: 'Disney Springs',
        latitude: 28.370876,
        longitude: -81.520133,
        local: 'Disney Springs Guest Relations, 1486 Buena Vista Dr, Orlando, FL',
        descricao: 'Retire ingressos e MagicBands na Guest Relations, visite a World of Disney, tire fotos e aproveite para explorar algumas lojas.',
      },
      {
        tipo: 'compras',
        titulo: 'Compras Essenciais – Walmart',
        regiao: 'Lake Buena Vista',
        latitude: 28.335539,
        longitude: -81.497001,
        local: '3250 Vineland Rd, Kissimmee, FL (Walmart Supercenter)',
        descricao: 'Compre snacks, água, itens de higiene e café da manhã. As refeições prontas e saladas custam em média US$ 3 e são ótimas opções rápidas. Aproveite também promoções de chocolates, vitaminas, protetor solar, produtos para cabelo e brinquedos que custam até US$ 10 — muitos iguais aos vendidos no Brasil por mais de R$ 200. Também vale olhar souvenirs Disney a preços bem mais baixos que nos parques.',
      },
    ],
  },
{
  periodo: 'noite',
  horarioInicio: '20:00',
  horarioFim: '23:59',
  referencia: 'Vineland Avenue – Compras leves e econômicas',
  atividades: [
    {
      tipo: 'compras',
      titulo: 'Compras Leves – Ross e Lojas da Vineland',
      regiao: 'Vineland / International Drive South',
      latitude: 28.3852,
      longitude: -81.4893,
      local: '8200 Vineland Ave, Orlando, FL',
      descricao: 'Visite a Ross Dress for Less e lojas próximas como Burlington, Five Below e TJ Maxx. Todas têm ótimos preços em roupas, brinquedos e lembranças — ideais para compras rápidas e econômicas no fim do dia.',
    },
  ],
},

];
export default blocosQuandoChegaDeManha;
