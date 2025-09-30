export type ItemChecklist = {
  id: string; // Identificador único do item
  nome: string; // Nome do item, ex: "Passaporte", "Carregador"
  categoria: 'documento' | 'vestuário' | 'eletrônico' | 'saúde' | 'outro';
  obrigatorio: boolean; // Se é essencial levar
  observacoes?: string; // Notas adicionais, ex: "ver validade", "usar na volta"
};
