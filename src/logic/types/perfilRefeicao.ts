export interface EstiloRefeicao {
  perfil: string; // identificador
  descricao: string; // explicaÃ§Ã£o usada nos cards
  preco: '$' | '$$' | '$$$'; // nÃ­vel de gasto
}

export const perfisRefeicao: EstiloRefeicao[] = [
  {
    perfil: 'Economico',
    descricao: 'OpÃ§Ãµes acessÃ­veis com bom custo-benefÃ­cio',
    preco: '$',
  },
  {
    perfil: 'Tematico',
    descricao: 'ExperiÃªncia imersiva com ambientaÃ§Ã£o temÃ¡tica',
    preco: '$$$',
  },
  {
    perfil: 'Conforto',
    descricao: 'Ambiente calmo e boa comida',
    preco: '$$',
  },
  {
    perfil: 'Saudavel',
    descricao: 'AlimentaÃ§Ã£o leve e equilibrada',
    preco: '$$',
  },
  {
    perfil: 'ClassicoAmericano',
    descricao: 'HambÃºrgueres, fritas, refrigerante e similares',
    preco: '$',
  },
];
