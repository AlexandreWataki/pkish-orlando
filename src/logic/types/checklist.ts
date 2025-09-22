export type ItemChecklist = {
  id: string; // Identificador Ãºnico do item
  nome: string; // Nome do item, ex: "Passaporte", "ChapÃ©u", "RemÃ©dio"
  categoria: 'documento' | 'vestuÃ¡rio' | 'eletrÃ´nico' | 'saÃºde' | 'outro';
  obrigatorio: boolean; // Indica se Ã© obrigatÃ³rio levar
  observacoes?: string; // InformaÃ§Ãµes extras, ex: "ver validade", "carregar antes"
};
