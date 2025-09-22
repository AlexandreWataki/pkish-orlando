ï»¿// src/logic/types/tiposRefeicao.ts

/**
 * Tipos possÃƒÂ­veis de refeiÃƒÂ§ÃƒÂ£o por nome (usado nas funÃƒÂ§ÃƒÂµes)
 */
export type NomeTipoRefeicao = 'cafe' | 'almoco' | 'jantar' | 'refeicao_rapida';

/**
 * Interface completa com dados de cada tipo de refeiÃƒÂ§ÃƒÂ£o
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
 * Estrutura dos locais sugeridos para refeiÃƒÂ§ÃƒÂµes
 */
export type SugestaoRefeicao = {
  nome: string;
  distancia: string;
  tipo: string;
  precoMedio: '$' | '$$' | '$$$';
};

/**
 * Lista padrÃƒÂ£o com os tipos de refeiÃƒÂ§ÃƒÂ£o e seus dados
 */
export const tiposRefeicao: TipoRefeicao[] = [
  {
    tipo: 'cafe',
    nome: 'CafÃƒÂ© da ManhÃƒÂ£',
    horarioSugerido: '06:30 Ã¢â‚¬â€œ 07:30',
    duracaoMinutos: 60,
    turnosPermitidos: ['manha'],
    horariosPossiveis: ['06:30'],
  },
  {
    tipo: 'almoco',
    nome: 'AlmoÃƒÂ§o',
    horarioSugerido: '12:00 Ã¢â‚¬â€œ 13:00',
    duracaoMinutos: 60,
    turnosPermitidos: ['tarde'],
    horariosPossiveis: ['12:00'],
  },
  {
    tipo: 'jantar',
    nome: 'Jantar',
    horarioSugerido: '19:00 Ã¢â‚¬â€œ 20:00',
    duracaoMinutos: 60,
    turnosPermitidos: ['noite'],
    horariosPossiveis: ['19:00'],
  },
  {
    tipo: 'refeicao_rapida',
    nome: 'RefeiÃƒÂ§ÃƒÂ£o RÃƒÂ¡pida',
    horarioSugerido: '10:00 Ã¢â‚¬â€œ 11:00 ou 16:00 Ã¢â‚¬â€œ 17:00',
    duracaoMinutos: 30,
    turnosPermitidos: ['manha', 'tarde'],
    horariosPossiveis: ['10:00', '16:00'],
  },
];
