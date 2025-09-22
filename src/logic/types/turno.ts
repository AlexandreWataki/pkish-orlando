// src/logic/types/turno.ts
import { AtividadeDia } from './atividade';

/**
 * Turno padrÃ£o de um dia, usado no objeto final do Roteiro.
 * Ex.: manhÃ£, tarde, noite (com lista de atividades).
 */
export interface TurnoDia {
  titulo: string; // Nome exibido (ex.: "ManhÃ£", "Tarde", "Noite")
  periodo: 'manha' | 'tarde' | 'noite' | 'madrugada' | string;
  atividades: AtividadeDia[];
}

/**
 * Turno com horÃ¡rios fixos (estrutura mais detalhada).
 * Ex.: usado para divisÃ£o de tempo precisa.
 */
export interface TurnoComHorario {
  titulo: string;
  horarioInicio: string;
  horarioFim: string;
  atividades: AtividadeDia[];
}

/**
 * Turno para dia de descanso (sem referÃªncia geogrÃ¡fica).
 */
export interface TurnoDescanso {
  periodo: 'madrugada' | 'manha' | 'tarde' | 'noite';
  horarioInicio: string;
  horarioFim: string;
  atividades: AtividadeDia[];
}

/**
 * Atividade de descanso com referÃªncia de regiÃ£o/localizaÃ§Ã£o.
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
 * Turno de descanso com metadados de regiÃ£o.
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
 * Atividade de compras com regiÃ£o/localizaÃ§Ã£o.
 */
export interface AtividadeComprasRegiao extends AtividadeDia {
  descricao: string;
  regiao: string;
  latitude: number;
  longitude: number;
}

/**
 * Turno de compras com referÃªncia de Ã¡rea/regiÃ£o.
 */
export interface TurnoComprasRegiao {
  periodo: 'manha' | 'tarde' | 'noite';
  referencia?: string;
  descricaoRegiao?: string;
  atividades: AtividadeComprasRegiao[];
}

/**
 * Turno de parque com foco em Ã¡reas especÃ­ficas (divisÃ£o por zonas).
 */
export interface TurnoParquePorArea {
  periodo: 'manha' | 'tarde' | 'noite';
  horarioInicio: string;
  horarioFim: string;
  areas: string[];
}

/**
 * Bloco principal de um perfil de parque,
 * com turnos divididos por Ã¡reas.
 */
export interface BlocoPerfilParque {
  parque: 'Magic Kingdom' | 'EPCOT' | 'Hollywood Studios' | 'Animal Kingdom';
  turnos: TurnoParquePorArea[];
}
