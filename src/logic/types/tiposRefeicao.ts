// src/logic/types/tiposRefeicao.ts

/**
 * Tipos possÃ­veis de refeiÃ§Ã£o por nome (usado nas funÃ§Ãµes)
 */
export type NomeTipoRefeicao = 'cafe' | 'almoco' | 'jantar' | 'refeicao_rapida';

/**
 * Interface completa com dados de cada tipo de refeiÃ§Ã£o
 */
export interface TipoRefeicao {
  tipo: NomeTipoRefeicao;
  nome: string;
  horarioSugerido: string;
  duracaoMinutos: number;
  turnosPermitidos: string[];      // Ex: ['manha', 'tarde']
  horariosPossiveis: string[];     // Ex: ['06:30', '10:00']
}

/**
 * Estrutura dos locais sugeridos para refeiÃ§Ãµes
 */
export type SugestaoRefeicao = {
  nome: string;
  distancia: string;
  tipo: string;
  precoMedio: '$' | '$$' | '$$$';
};

/**
 * Lista padrÃ£o com os tipos de refeiÃ§Ã£o e seus dados
 */
export const tiposRefeicao: TipoRefeicao[] = [
  {
    tipo: 'cafe',
    nome: 'CafÃ© da ManhÃ£',
    horarioSugerido: '06:30 â€“ 07:30',
    duracaoMinutos: 60,
    turnosPermitidos: ['manha'],
    horariosPossiveis: ['06:30'],
  },
  {
    tipo: 'almoco',
    nome: 'AlmoÃ§o',
    horarioSugerido: '12:00 â€“ 13:00',
    duracaoMinutos: 60,
    turnosPermitidos: ['tarde'],
    horariosPossiveis: ['12:00'],
  },
  {
    tipo: 'jantar',
    nome: 'Jantar',
    horarioSugerido: '19:00 â€“ 20:00',
    duracaoMinutos: 60,
    turnosPermitidos: ['noite'],
    horariosPossiveis: ['19:00'],
  },
  {
    tipo: 'refeicao_rapida',
    nome: 'RefeiÃ§Ã£o RÃ¡pida',
    horarioSugerido: '10:00 â€“ 11:00 ou 16:00 â€“ 17:00',
    duracaoMinutos: 30,
    turnosPermitidos: ['manha', 'tarde'],
    horariosPossiveis: ['10:00', '16:00'],
  },
];
