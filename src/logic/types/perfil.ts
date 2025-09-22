export type Perfil = {
  id: string;
  nome: string;
  descricao: string;
  filtrosPrioritarios: string[]; // Ex: ['radical', 'infantil', 'rÃ¡pido']
  restricoes?: {
    alturaMaxima?: number; // Em centÃ­metros
    alturaMinima?: number; // Em centÃ­metros
    evitarTipos?: string[]; // Ex: ['radical', 'molhada']
  };
};
