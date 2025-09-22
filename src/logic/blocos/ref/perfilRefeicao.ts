ï»¿export interface EstiloRefeicao {
  perfil: string; // identificador
  descricao: string; // explicaÃƒÂ§ÃƒÂ£o usada nos cards
  preco: '$' | '$$' | '$$$'; // nÃƒÂ­vel de gasto
}

export const perfisRefeicao: EstiloRefeicao[] = [
  {
    perfil: 'Economico',
    descricao: 'OpÃƒÂ§ÃƒÂµes acessÃƒÂ­veis com bom custo-benefÃƒÂ­cio',
    preco: '$',
  },
  {
    perfil: 'Tematico',
    descricao: 'ExperiÃƒÂªncia imersiva com ambientaÃƒÂ§ÃƒÂ£o temÃƒÂ¡tica',
    preco: '$$$',
  },
  {
    perfil: 'Conforto',
    descricao: 'Ambiente calmo e boa comida',
    preco: '$$',
  },
  {
    perfil: 'Saudavel',
    descricao: 'AlimentaÃƒÂ§ÃƒÂ£o leve e equilibrada',
    preco: '$$',
  },
  {
    perfil: 'ClassicoAmericano',
    descricao: 'HambÃƒÂºrgueres, fritas, refrigerante e similares',
    preco: '$',
  },
];
