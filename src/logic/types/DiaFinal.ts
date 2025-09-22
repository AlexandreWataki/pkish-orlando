export type DiaFinal = {
  id: string;              // Ex: "dia1", "dia2", etc.
  data: Date;              // Data real da viagem
  tipo: string;            // Ex: 'chegada', 'disney', 'universal', 'compras', etc.
  nomeParque?: string;     // Usado se o dia for de parque, ex: "Magic Kingdom"
  horarioVoo?: string;     // Ex: "23:00" â€“ usado apenas no dia de chegada
};
