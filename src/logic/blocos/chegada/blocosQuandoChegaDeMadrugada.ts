import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeMadrugada: TurnoDescansoRegiao[] = [
  {
    periodo: 'madrugada',
    horarioInicio: '00:00',
    horarioFim: '05:59',
    referencia: 'Hotel â€“ Descanso de Madrugada',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Descansar ApÃ³s a Chegada',
        regiao: 'Hotel',
        local: 'Quarto do hotel',
        descricao: 'Chegando de madrugada, vÃ¡ direto descansar. Separe apenas o essencial como pijama, Ã¡gua e carregador e durma bem para aproveitar o dia seguinte.',
      },
    ],
  },
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Hotel â€“ Descanso pela manhÃ£',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Descansar Pela ManhÃ£',
        regiao: 'Hotel',
        local: 'Quarto do hotel',
        descricao: 'Continue descansando para recuperar as energias e levante apenas quando se sentir disposto.',
      },
    ],
  },
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
        descricao: 'Retire ingressos e MagicBands na Guest Relations, visite a World of Disney, tire fotos e aproveite para explorar algumas lojas.',
      },
      {
        tipo: 'compras',
        titulo: 'Compras Essenciais â€“ Walmart',
        regiao: 'Lake Buena Vista',
        latitude: 28.335539,
        longitude: -81.497001,
        local: '3250 Vineland Rd, Kissimmee, FL (Walmart Supercenter)',
        descricao: 'Compre snacks, Ã¡gua, itens de higiene, cafÃ© da manhÃ£ e aproveite para ver promoÃ§Ãµes e lembranÃ§as, incluindo souvenirs Disney.',
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
        titulo: 'Compras Leves â€“ Artegon e Feirinhas',
        regiao: 'International Drive North',
        latitude: 28.4745,
        longitude: -81.4513,
        local: '5250 International Dr, Orlando, FL',
        descricao: 'Passeie por feirinhas e lojinhas com artesanato e lembranÃ§as, ideal para encerrar o dia de forma leve e tranquila.',
      },
    ],
  },
];

export default blocosQuandoChegaDeMadrugada;
