ï»¿export type Perfil = {
  id: string;
  nome: string;
  descricao: string;
  filtrosPrioritarios: string[]; // Ex: ['radical', 'infantil', 'rÃƒÂ¡pido']
  restricoes?: {
    alturaMaxima?: number; // Em centÃƒÂ­metros
    alturaMinima?: number; // Em centÃƒÂ­metros
    evitarTipos?: string[]; // Ex: ['radical', 'molhada']
  };
};
