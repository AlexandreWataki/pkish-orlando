export type Perfil = {
  id: string;
  nome: string;
  descricao: string;
  filtrosPrioritarios: string[]; // Ex: ['radical', 'infantil', 'rápido']
  restricoes?: {
    alturaMaxima?: number; // Em centímetros
    alturaMinima?: number; // Em centímetros
    evitarTipos?: string[]; // Ex: ['radical', 'molhada']
  };
};
