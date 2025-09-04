// src/logic/blocos/ref/refeicoesProximas.ts
import { cafesProximos } from './cafesProximos';
import { almocosProximos } from './almocosProximos';
import { jantaresProximos } from './jantaresProximos';

export type RefeicaoItem = {
  nome: string;
  regiao: string;
  tipo: string;
  acesso: string;
  precoMedio?: number;
  destaque?: string;
  latitude?: number;
  longitude?: number;
  menuUrl?: string;
  tipoRefeicao?: 'Café da Manhã' | 'Almoço' | 'Jantar' | string;
};

const mapTag = (arr: any[], tag: RefeicaoItem['tipoRefeicao']) =>
  (arr || []).map((r) => ({ ...r, tipoRefeicao: r.tipoRefeicao ?? tag }));

// Junta os 3 em 1 só
export const refeicoesProximas: RefeicaoItem[] = [
  ...mapTag(cafesProximos, 'Café da Manhã'),
  ...mapTag(almocosProximos, 'Almoço'),
  ...mapTag(jantaresProximos, 'Jantar'),
];
