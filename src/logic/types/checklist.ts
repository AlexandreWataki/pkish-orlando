export type ItemChecklist = {
  id: string; // Identificador único do item
  nome: string; // Nome do item, ex: "Passaporte", "Chapéu", "Remédio"
  categoria: 'documento' | 'vestuário' | 'eletrônico' | 'saúde' | 'outro';
  obrigatorio: boolean; // Indica se é obrigatório levar
  observacoes?: string; // Informações extras, ex: "ver validade", "carregar antes"
};
