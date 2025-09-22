// src/logic/blocos/saida/blocosQuandoSaidaDeNoite.ts

import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoSaidaDeNoite: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration + CafÃ© local',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Despedida Tranquila em Celebration',
        regiao: 'Celebration',
        latitude: 28.3244,
        longitude: -81.5418,
        local: 'Lago de Celebration, 701 Front St, Celebration, FL',
        descricao: 'Comece o dia com uma caminhada pelo lago de Celebration, aprecie o visual, tome um cafÃ© em uma padaria local e registre fotos de despedida.',
      },
    ],
  },
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'International Drive â€“ Pointe Orlando + Orlando International Premium Outlets',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras Finais de Lembrancinhas',
        regiao: 'Pointe Orlando',
        latitude: 28.4355,
        longitude: -81.4695,
        local: '9101 International Dr, Orlando, FL',
        descricao: 'Garanta lembranÃ§as e presentes no Pointe Orlando, que oferece lojas temÃ¡ticas e boutiques ideais para itens especiais sem pesar na mala.',
      },
      {
        tipo: 'compras',
        titulo: 'Outlet â€“ Ãšltima Chance',
        regiao: 'Orlando International Premium Outlets',
        latitude: 28.4743,
        longitude: -81.4505,
        local: '4951 International Dr, Orlando, FL',
        descricao: 'Antes do aeroporto, visite o Premium Outlets para roupas, lembranÃ§as ou eletrÃ´nicos em promoÃ§Ã£o, cuidando para deixar espaÃ§o na mala.',
      },
    ],
  },
];

export default blocosQuandoSaidaDeNoite;
