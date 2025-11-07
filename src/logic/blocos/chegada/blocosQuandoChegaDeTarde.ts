import { TurnoDescansoRegiao } from '@/logic/types/turno';

export const blocosQuandoChegaDeTarde: TurnoDescansoRegiao[] = [
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
export default blocosQuandoChegaDeTarde;
