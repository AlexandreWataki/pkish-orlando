// src/logic/types/tiposRefeicao.ts

/**
 * Tipos possíveis de refeição por nome (usado nas funções)
 */
export type NomeTipoRefeicao = 'cafe' | 'almoco' | 'jantar' | 'refeicao_rapida';

/**
 * Interface completa com dados de cada tipo de refeição
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
 * Estrutura dos locais sugeridos para refeições
 */
export type SugestaoRefeicao = {
  nome: string;
  distancia: string;
  tipo: string;
  precoMedio: '$' | '$$' | '$$$';
};

/**
 * Lista padrão com os tipos de refeição e seus dados
 */
export const tiposRefeicao: TipoRefeicao[] = [
  {
    tipo: 'cafe',
    nome: 'Café da Manhã',
    horarioSugerido: '06:30 – 07:30',
    duracaoMinutos: 60,
    turnosPermitidos: ['manha'],
    horariosPossiveis: ['06:30'],
  },
  {
    tipo: 'almoco',
    nome: 'Almoço',
    horarioSugerido: '12:00 – 13:00',
    duracaoMinutos: 60,
    turnosPermitidos: ['tarde'],
    horariosPossiveis: ['12:00'],
  },
  {
    tipo: 'jantar',
    nome: 'Jantar',
    horarioSugerido: '19:00 – 20:00',
    duracaoMinutos: 60,
    turnosPermitidos: ['noite'],
    horariosPossiveis: ['19:00'],
  },
  {
    tipo: 'refeicao_rapida',
    nome: 'Refeição Rápida',
    horarioSugerido: '10:00 – 11:00 ou 16:00 – 17:00',
    duracaoMinutos: 30,
    turnosPermitidos: ['manha', 'tarde'],
    horariosPossiveis: ['10:00', '16:00'],
  },
];
