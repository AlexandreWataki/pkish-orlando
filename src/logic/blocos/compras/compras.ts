ï»¿export type ItemChecklist = {
  id: string; // Identificador ÃƒÂºnico do item
  nome: string; // Nome do item, ex: "Passaporte", "Carregador"
  categoria: 'documento' | 'vestuÃƒÂ¡rio' | 'eletrÃƒÂ´nico' | 'saÃƒÂºde' | 'outro';
  obrigatorio: boolean; // Se ÃƒÂ© essencial levar
  observacoes?: string; // Notas adicionais, ex: "ver validade", "usar na volta"
};
