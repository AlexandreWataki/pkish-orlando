// src/logic/blocos/saida/blocosQuandoSaidaDeNoite.ts

import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoSaidaDeNoite: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration + Café local',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Despedida Tranquila em Celebration',
        regiao: 'Celebration',
        latitude: 28.3244,
        longitude: -81.5418,
        local: 'Lago de Celebration, 701 Front St, Celebration, FL',
        descricao: 'Comece o dia com uma caminhada pelo lago de Celebration, aprecie o visual, tome um café em uma padaria local e registre fotos de despedida.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive – Pointe Orlando + Orlando International Premium Outlets',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras Finais de Lembrancinhas',
        regiao: 'Pointe Orlando',
        latitude: 28.4355,
        longitude: -81.4695,
        local: '9101 International Dr, Orlando, FL',
        descricao: 'Garanta lembranças e presentes no Pointe Orlando, que oferece lojas temáticas e boutiques ideais para itens especiais sem pesar na mala.',
      },
      {
        tipo: 'compras',
        titulo: 'Outlet – Última Chance',
        regiao: 'Orlando International Premium Outlets',
        latitude: 28.4743,
        longitude: -81.4505,
        local: '4951 International Dr, Orlando, FL',
        descricao: 'Antes do aeroporto, visite o Premium Outlets para roupas, lembranças ou eletrônicos em promoção, cuidando para deixar espaço na mala.',
      },
    ],
  },
];

export default blocosQuandoSaidaDeNoite;
