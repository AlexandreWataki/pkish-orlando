// src/logic/types/turno.ts
import { AtividadeDia } from './atividade';

/**
 * Turno padrão de um dia, usado no objeto final do Roteiro.
 * Ex.: manhã, tarde, noite (com lista de atividades).
 */
export interface TurnoDia {
  titulo: string; // Nome exibido (ex.: "Manhã", "Tarde", "Noite")
  periodo: 'manha' | 'tarde' | 'noite' | 'madrugada' | string;
  atividades: AtividadeDia[];
}

/**
 * Turno com horários fixos (estrutura mais detalhada).
 * Ex.: usado para divisão de tempo precisa.
 */
export interface TurnoComHorario {
  titulo: string;
  horarioInicio: string;
  horarioFim: string;
  atividades: AtividadeDia[];
}

/**
 * Turno para dia de descanso (sem referência geográfica).
 */
export interface TurnoDescanso {
  periodo: 'madrugada' | 'manha' | 'tarde' | 'noite';
  horarioInicio: string;
  horarioFim: string;
  atividades: AtividadeDia[];
}

/**
 * Atividade de descanso com referência de região/localização.
 */
export interface AtividadeDescansoRegiao extends AtividadeDia {
  descricao: string;
  local: string;
  regiao: string;
  area?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Turno de descanso com metadados de região.
 */
export interface TurnoDescansoRegiao {
  periodo: 'madrugada' | 'manha' | 'tarde' | 'noite';
  horarioInicio: string;
  horarioFim: string;
  referencia?: string;
  descricaoRegiao?: string;
  atividades: AtividadeDescansoRegiao[];
}

/**
 * Atividade de compras com região/localização.
 */
export interface AtividadeComprasRegiao extends AtividadeDia {
  descricao: string;
  regiao: string;
  latitude: number;
  longitude: number;
}

/**
 * Turno de compras com referência de área/região.
 */
export interface TurnoComprasRegiao {
  periodo: 'manha' | 'tarde' | 'noite';
  referencia?: string;
  descricaoRegiao?: string;
  atividades: AtividadeComprasRegiao[];
}

/**
 * Turno de parque com foco em áreas específicas (divisão por zonas).
 */
export interface TurnoParquePorArea {
  periodo: 'manha' | 'tarde' | 'noite';
  horarioInicio: string;
  horarioFim: string;
  areas: string[];
}

/**
 * Bloco principal de um perfil de parque,
 * com turnos divididos por áreas.
 */
export interface BlocoPerfilParque {
  parque: 'Magic Kingdom' | 'EPCOT' | 'Hollywood Studios' | 'Animal Kingdom';
  turnos: TurnoParquePorArea[];
}
