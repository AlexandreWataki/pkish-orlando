ï»¿export type ItemChecklist = {
  id: string; // Identificador ÃƒÂºnico do item
  nome: string; // Nome do item, ex: "Passaporte", "ChapÃƒÂ©u", "RemÃƒÂ©dio"
  categoria: 'documento' | 'vestuÃƒÂ¡rio' | 'eletrÃƒÂ´nico' | 'saÃƒÂºde' | 'outro';
  obrigatorio: boolean; // Indica se ÃƒÂ© obrigatÃƒÂ³rio levar
  observacoes?: string; // InformaÃƒÂ§ÃƒÂµes extras, ex: "ver validade", "carregar antes"
};
