// src/types/ia.ts

/** Estrutura das preferÃªncias enviadas para a IA */
export type Preferencias = {
  dataInicial: string;
  dataFinal: string;
  adultos: number;
  criancas: number;
  parques: string;
  ritmo: "lento" | "medio" | "rapido";
  orcamentoPorDia: number;
  perfilRefeicoes: string;
  observacoes?: string;
};

/** Um dia do roteiro gerado */
export type DiaGerado = {
  data: string;                // Ex: "2025-08-15"
  parque?: string;             // Nome do parque (opcional)
  atividades: string[];        // Lista de atividades do dia
  refeicoes?: string[];        // Lista de refeiÃ§Ãµes planejadas
  observacoes?: string;        // ObservaÃ§Ãµes adicionais
  turnos?: {
    manha: string[];           // Atividades de manhÃ£
    tarde: string[];           // Atividades Ã  tarde
    noite: string[];           // Atividades Ã  noite
  };
};

/** Estrutura do retorno completo da IA */
export type RoteiroIA = {
  resumo?: string;             // Resumo geral do roteiro
  roteiro: DiaGerado[];        // Lista de dias
};
