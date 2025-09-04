// src/logic/blocos/saida/blocosQuandoSaidaDeTarde.ts

import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoSaidaDeTarde: TurnoDescansoRegiao[] = [
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Celebration – Despedida leve',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Manhã Relaxante em Celebration',
        regiao: 'Celebration',
        latitude: 28.3244,
        longitude: -81.5418,
        local: '701 Front St, Celebration, FL',
        descricao: 'Comece o último dia com uma caminhada pelo centrinho de Celebration, aproveite o clima tranquilo, tire fotos e tome um café da manhã em uma padaria local enquanto aprecia o ambiente arborizado e o charme da cidade.',
      },
    ],
  },
];

export default blocosQuandoSaidaDeTarde;
