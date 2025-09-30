export interface EstiloRefeicao {
  perfil: string; // identificador
  descricao: string; // explicação usada nos cards
  preco: '$' | '$$' | '$$$'; // nível de gasto
}

export const perfisRefeicao: EstiloRefeicao[] = [
  {
    perfil: 'Economico',
    descricao: 'Opções acessíveis com bom custo-benefício',
    preco: '$',
  },
  {
    perfil: 'Tematico',
    descricao: 'Experiência imersiva com ambientação temática',
    preco: '$$$',
  },
  {
    perfil: 'Conforto',
    descricao: 'Ambiente calmo e boa comida',
    preco: '$$',
  },
  {
    perfil: 'Saudavel',
    descricao: 'Alimentação leve e equilibrada',
    preco: '$$',
  },
  {
    perfil: 'ClassicoAmericano',
    descricao: 'Hambúrgueres, fritas, refrigerante e similares',
    preco: '$',
  },
];
