import type { DiaGerado } from '@/IA/gerarComIA';

type Meta = {
  titulo: string;
  data?: string; // opcional, se você usa datas no app
  tipo: 'parque' | 'chegada' | 'saida' | 'descanso' | 'compras' | 'outro';
  parque?: 'MK' | 'AK' | 'HS' | 'EPCOT' | 'UNIVERSAL' | 'ISLANDS' | 'EPIC';
};

export function toDiaGerado(prompt: string, meta: Meta): DiaGerado {
  // Ajuste aqui conforme o seu shape real de DiaGerado
  return {
    titulo: meta.titulo,
    tipo: meta.tipo,
    parque: meta.parque,
    data: meta.data,
    prompt,               // campo livre só para armazenar o texto
    // ...quaisquer defaults que seu app espera
  } as unknown as DiaGerado;
}
