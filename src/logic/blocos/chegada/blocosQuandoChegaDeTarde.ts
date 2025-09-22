ï»¿import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeTarde: TurnoDescansoRegiao[] = [
  {
    periodo: 'noite',
    horarioInicio: '20:00',
    horarioFim: '23:59',
    referencia: 'Lake Buena Vista Ã¢â‚¬â€œ Disney Springs + Walmart',
    atividades: [
      {
        tipo: 'compras',
        titulo: 'Retirada de Tickets Disney',
        regiao: 'Disney Springs',
        latitude: 28.370876,
        longitude: -81.520133,
        local: 'Disney Springs Guest Relations, 1486 Buena Vista Dr, Orlando, FL',
        descricao: 'Retire ingressos e MagicBands na Guest Relations e, se houver tempo, faÃƒÂ§a uma rÃƒÂ¡pida visita ÃƒÂ  World of Disney para conhecer o espaÃƒÂ§o e evitar filas no dia seguinte.',
      },
      {
        tipo: 'compras',
        titulo: 'Compras Essenciais Ã¢â‚¬â€œ Walmart',
        regiao: 'Lake Buena Vista',
        latitude: 28.335539,
        longitude: -81.497001,
        local: '3250 Vineland Rd, Kissimmee, FL (Walmart Supercenter)',
        descricao: 'Compre snacks, ÃƒÂ¡gua e itens bÃƒÂ¡sicos aproveitando a seÃƒÂ§ÃƒÂ£o Disney e possÃƒÂ­veis promoÃƒÂ§ÃƒÂµes logo na entrada.',
      },
    ],
  },
];

export default blocosQuandoChegaDeTarde;
