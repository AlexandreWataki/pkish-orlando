ï»¿import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeMadrugada: TurnoDescansoRegiao[] = [
  {
    periodo: 'madrugada',
    horarioInicio: '00:00',
    horarioFim: '05:59',
    referencia: 'Hotel Ã¢â‚¬â€œ Descanso de Madrugada',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Descansar ApÃƒÂ³s a Chegada',
        regiao: 'Hotel',
        local: 'Quarto do hotel',
        descricao: 'Chegando de madrugada, vÃƒÂ¡ direto descansar. Separe apenas o essencial como pijama, ÃƒÂ¡gua e carregador e durma bem para aproveitar o dia seguinte.',
      },
    ],
  },
  {
    periodo: 'manha',
    horarioInicio: '08:00',
    horarioFim: '12:00',
    referencia: 'Hotel Ã¢â‚¬â€œ Descanso pela manhÃƒÂ£',
    atividades: [
      {
        tipo: 'descanso',
        titulo: 'Descansar Pela ManhÃƒÂ£',
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
    referencia: 'Lake Buena Vista Ã¢â‚¬â€œ Disney Springs + Walmart',
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
        titulo: 'Compras Essenciais Ã¢â‚¬â€œ Walmart',
        regiao: 'Lake Buena Vista',
        latitude: 28.335539,
        longitude: -81.497001,
        local: '3250 Vineland Rd, Kissimmee, FL (Walmart Supercenter)',
        descricao: 'Compre snacks, ÃƒÂ¡gua, itens de higiene, cafÃƒÂ© da manhÃƒÂ£ e aproveite para ver promoÃƒÂ§ÃƒÂµes e lembranÃƒÂ§as, incluindo souvenirs Disney.',
      },
    ],
  },
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'International Drive North Ã¢â‚¬â€œ Compras leves',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Compras Leves Ã¢â‚¬â€œ Artegon e Feirinhas',
        regiao: 'International Drive North',
        latitude: 28.4745,
        longitude: -81.4513,
        local: '5250 International Dr, Orlando, FL',
        descricao: 'Passeie por feirinhas e lojinhas com artesanato e lembranÃƒÂ§as, ideal para encerrar o dia de forma leve e tranquila.',
      },
    ],
  },
];

export default blocosQuandoChegaDeMadrugada;
