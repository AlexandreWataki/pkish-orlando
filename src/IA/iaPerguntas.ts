// src/IA/iaPerguntas.ts
export const CHIP_OPCOES = {
  disney: ['Magic Kingdom','EPCOT','Hollywood Studios','Animal Kingdom'],
  universal: ['Universal Studios Florida','Islands of Adventure','Epic Universe'],
  locais: [
    'Disney Springs','ICON Park','Vineland Outlets','International Outlets','Florida Mall',
    'Walmart','Target','Ross Dress for Less'],
  ritmos: ['leve','moderado','intenso'],
  passes: ['LL Individual (Disney)','LL MultiPass (Disney)','Express Pass (Universal)','sem passe'],
  prefRef: [
    'quick service (rápido)','table service (à la carte)','temático (com personagens)','buffet',
    'cafés da manhã especiais','jantares exclusivos/signature dining','food & wine / festivais gastronômicos'
  ],
  transp: ['Carro alugado','Uber/LYFT','Transporte do hotel'],
  shows: ['fogos MK','Fantasmic! (HS)','Luminous (EPCOT)'],
  paradas: ['Festival of Fantasy (MK)','Parada Pixar (HS)','Parada Universal Superstar'],
  evitar: ['evitar intensas','fila<=30min','respeitar altura','pausas p/ fotos'],
} as const;

export type ItemTipo =
  | 'text' | 'textarea' | 'chips-single' | 'chips-multi'
  | 'voice' | 'toggle' | 'select' | 'multiselect' | 'number';

export type ItemConfig = {
  id: string;
  type: ItemTipo;
  placeholder?: string;
  helperText?: string;
  label?: string;
  options?: string[];
  chipOptionsKey?: keyof typeof CHIP_OPCOES;
};

export type SecaoConfig = {
  id: string;
  enabled: boolean;
  titulo: string;
  items: ItemConfig[];
};

// ⬇️ sem “Perfil do grupo”
export const SECOES_IA: SecaoConfig[] = [
  {
    id:'periodo', enabled:true, titulo:'Período (datas) — chegada/saída',
    items:[
      { id:'dataInicio', type:'text', placeholder:'Chegada — ex.: 13/10' },
      { id:'dataFim', type:'text', placeholder:'Saída — ex.: 20/10' },
    ]
  },
  {
    id:'totais', enabled:true, titulo:'Dias totais',
    items:[
      {
        id:'qtdDiasTotaisInput',
        type:'number',
        placeholder:'Digite o total de dias (também calculo Saída − Chegada + 1)',
        label:'Total de dias'
      },
    ]
  },
  {
    id:'disney', enabled:true, titulo:'Parques Disney (selecione)',
    items:[ { id:'selDisney', type:'chips-multi', chipOptionsKey:'disney' } ]
  },
  {
    id:'universal', enabled:true, titulo:'Parques Universal (selecione)',
    items:[ { id:'selUniversal', type:'chips-multi', chipOptionsKey:'universal' } ]
  },
  {
    id:'locais', enabled:true, titulo:'Outros locais / compras / descanso',
    items:[ { id:'selExtrasLocais', type:'chips-multi', chipOptionsKey:'locais' } ]
  },
  {
    id:'ritmo', enabled:true, titulo:'Ritmo da viagem',
    items:[ { id:'ritmoEscolha', type:'chips-single', chipOptionsKey:'ritmos' } ]
  },
  // ⚠️ seção "perfil" removida
  {
    id:'passes', enabled:true, titulo:'Passes de fila',
    items:[ { id:'passesFila', type:'chips-multi', chipOptionsKey:'passes' } ]
  },
  {
    id:'refeicoes', enabled:true, titulo:'Refeições preferidas',
    items:[ { id:'preferRefeicoes', type:'chips-multi', chipOptionsKey:'prefRef' } ]
  },
  {
    id:'transporte', enabled:true, titulo:'Transporte (ida/volta)',
    items:[ { id:'transporteEscolhido', type:'chips-multi', chipOptionsKey:'transp' } ]
  },
  {
    id:'shows', enabled:true, titulo:'Shows e eventos',
    items:[
      { id:'showsPrincipais',  type:'chips-multi', chipOptionsKey:'shows',   label:'Shows noturnos principais' },
      { id:'paradasDesfiles',  type:'chips-multi', chipOptionsKey:'paradas', label:'Paradas / Desfiles' },
      { id:'eventosEspeciais', type:'chips-multi' },
    ]
  },
  {
    id:'restricoes', enabled:true, titulo:'Restrições / evitar',
    items:[ { id:'restricoesEscolhas', type:'chips-multi', chipOptionsKey:'evitar', helperText:'Condições gerais para o roteiro evitar' } ]
  },
  {
    id:'voz', enabled:true, titulo:'Monte seu roteiro',
    items:[{
      id:'pedidoFrase', type:'voice',
      helperText:'Escreva em UMA frase o que você quer (ex.: "10 dias: 4 Disney, 3 Universal, 1 descanso, 1 compras").',
      placeholder:'Digite sua frase aqui…'
    }]
  },
  {
    id:'legado', enabled:false, titulo:'Campos legados (opcional)',
    items:[
      { id:'dias', type:'textarea', placeholder:'Ex.: 7 dias, 2 de compras, 2 de descanso' },
      { id:'parques', type:'textarea', placeholder:'Ex.: MK, HS, EPCOT, AK, US, IOA' },
      { id:'ritmo', type:'textarea', placeholder:'Ex.: ritmo moderado com pausas a cada 90min' },
      { id:'perfil', type:'textarea', placeholder:'Ex.: 2 adultos + 1 criança (1,22m)' },
      { id:'refeicoes', type:'textarea', placeholder:'Ex.: almoço quick • jantar table temático' },
      { id:'extras', type:'textarea', placeholder:'Ex.: fotos com personagens • compras no Disney Springs' },
    ]
  },
];

/** Prompt sem “Perfil” — agora inclui tokens de densidade por padrão */
export function buildPromptFromForm(values: Record<string, any>): string {
  const parts: string[] = [];

  if (values?.dataInicio || values?.dataFim) {
    parts.push(`Período ${values?.dataInicio || 'DD/MM'} → ${values?.dataFim || 'DD/MM'}`);
  }
  if (values?.qtdDiasTotaisInput) parts.push(`${values.qtdDiasTotaisInput} dias (inclusivo)`);
  if (Array.isArray(values?.selDisney) && values.selDisney.length)   parts.push(`Disney: ${values.selDisney.join(', ')}`);
  if (Array.isArray(values?.selUniversal) && values.selUniversal.length) parts.push(`Universal: ${values.selUniversal.join(', ')}`);
  if (Array.isArray(values?.selExtrasLocais) && values.selExtrasLocais.length) parts.push(`Locais: ${values.selExtrasLocais.join(', ')}`);
  if (values?.ritmoEscolha) parts.push(`Ritmo: ${values.ritmoEscolha}`);

  if (Array.isArray(values?.passesFila) && values.passesFila.length) parts.push(`Passes: ${values.passesFila.join(', ')}`);
  if (Array.isArray(values?.preferRefeicoes) && values.preferRefeicoes.length) parts.push(`Refeições: ${values.preferRefeicoes.join(', ')}`);
  if (Array.isArray(values?.transporteEscolhido) && values.transporteEscolhido.length) parts.push(`Transporte: ${values.transporteEscolhido.join(', ')}`);

  const shows = [
    ...(values?.showsPrincipais || []),
    ...(values?.paradasDesfiles || []),
    ...(values?.eventosEspeciais || []),
  ];
  if (shows.length) parts.push(`Shows/Eventos: ${shows.join(', ')}`);

  if (Array.isArray(values?.restricoesEscolhas) && values.restricoesEscolhas.length) parts.push(`Evitar: ${values.restricoesEscolhas.join(', ')}`);

  // 🔥 tokens de densidade default — IAventureSeScreen alterna ALTO/BAIXO via replace
  parts.push('NIVEL_DETALHE: ALTO');
  parts.push('ITENS_POR_TURNO: 8-12');

  return parts.join(' • ');
}
