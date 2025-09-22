export type ItemChecklist = {
  id: string; // Identificador Ãºnico do item
  nome: string; // Nome do item, ex: "Passaporte", "Carregador"
  categoria: 'documento' | 'vestuÃ¡rio' | 'eletrÃ´nico' | 'saÃºde' | 'outro';
  obrigatorio: boolean; // Se Ã© essencial levar
  observacoes?: string; // Notas adicionais, ex: "ver validade", "usar na volta"
};
