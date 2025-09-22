// src/logic/blocos/chegada/blocosQuandoChegaDeManha.ts

import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeManha: TurnoDescansoRegiao[] = [
  {
    periodo: 'tarde',
    horarioInicio: '13:00',
    horarioFim: '19:00',
    referencia: 'Lake Buena Vista â€“ Disney Springs + Walmart',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Retirada de Tickets Disney + Pulseiras',
        regiao: 'Disney Springs',
        latitude: 28.370876,
        longitude: -81.520133,
        local: 'Disney Springs Guest Relations, 1486 Buena Vista Dr, Orlando, FL',
        descricao: 'VÃ¡ ao Disney Springs retirar ingressos e MagicBands na Guest Relations, aproveite para conhecer a World of Disney, tirar fotos e explorar lojas exclusivas enquanto caminha pelo complexo.',
      },
      {
        tipo: 'compras',
        titulo: 'Compras Essenciais â€“ Walmart Supercenter',
        regiao: 'Lake Buena Vista',
        latitude: 28.335539,
        longitude: -81.497001,
        local: '3250 Vineland Rd, Kissimmee, FL (Walmart Supercenter)',
        descricao: 'ApÃ³s o Disney Springs, passe no Walmart mais prÃ³ximo para comprar snacks, Ã¡gua, higiene, adaptadores, capa de chuva, remÃ©dios e cafÃ© da manhÃ£, aproveitando para ver promoÃ§Ãµes e souvenirs.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'International Drive North â€“ Compras leves',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras Leves â€“ Feiras e Lojinhas',
        regiao: 'International Drive North',
        latitude: 28.4745,
        longitude: -81.4513,
        local: '5250 International Dr, Orlando, FL',
        descricao: 'Encerre o dia explorando feiras e lojinhas com artesanato, camisetas criativas e lembranÃ§as, aproveitando para caminhar e conhecer produtos Ãºnicos em um passeio leve.',
      },
    ],
  },
];
