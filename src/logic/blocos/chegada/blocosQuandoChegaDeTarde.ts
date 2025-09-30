import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeTarde: TurnoDescansoRegiao[] = [
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Lake Buena Vista – Disney Springs + Walmart',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Retirada de Tickets Disney',
        regiao: 'Disney Springs',
        latitude: 28.370876,
        longitude: -81.520133,
        local: 'Disney Springs Guest Relations, 1486 Buena Vista Dr, Orlando, FL',
        descricao: 'Retire ingressos e MagicBands na Guest Relations e, se houver tempo, faça uma rápida visita à World of Disney para conhecer o espaço e evitar filas no dia seguinte.',
      },
      {
        tipo: 'compras',
        titulo: 'Compras Essenciais – Walmart',
        regiao: 'Lake Buena Vista',
        latitude: 28.335539,
        longitude: -81.497001,
        local: '3250 Vineland Rd, Kissimmee, FL (Walmart Supercenter)',
        descricao: 'Compre snacks, água e itens básicos aproveitando a seção Disney e possíveis promoções logo na entrada.',
      },
    ],
  },
];

export default blocosQuandoChegaDeTarde;
