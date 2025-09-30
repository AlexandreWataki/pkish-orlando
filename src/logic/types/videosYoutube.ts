// src/data/videosYoutube.ts
// 🔧 Helpers para normalizar e mapear vídeos por atração/parque

// Normaliza pra "slug": minúsculo, sem acentos, só letras/números com hifens
export function normaliza(s: string) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

type VideoRef = string | { id?: string; url?: string };

// ▶️ Preencha aqui os vídeos! Use o NOME DO PARQUE e o TÍTULO da atração.
// Aceita ID de 11 chars ("dQw4w9WgXcQ") OU URL completa (watch, youtu.be, embed, shorts).
export const videosPorParque: Record<string, Record<string, VideoRef>> = {
  // Disney
  'magic-kingdom': {
    'pirates-of-the-caribbean': 'V7Z2iU3f3bY',
    'jungle-cruise': '8-2mJk_J8lM',
    'the-magic-carpets-of-aladdin': 'uUGxNw3h7gM',
    'walt-disneys-enchanted-tiki-room': 'UqT8k-5jz3M',
    'swiss-family-treehouse': 'H8q7sT1i7mY',
  },
  epcot: {
    'spaceship-earth': 'U64w7qk7M4U',
  },
  'animal-kingdom': {
    'avatar-flight-of-passage': '8r0R90sB_rY',
    'kilimanjaro-safaris': '5y4t8q05a9E',
  },
  'hollywood-studios': {
    'the-twilight-zone-tower-of-terror': 'Qq2xQd8kX0I',
  },

  // Universal
  'islands-of-adventure': {
    'velocicoaster': '7tVY4m2jL4U',
  },
  'universal-studios': {
    'harry-potter-and-the-escape-from-gringotts': '3Xv2b3Cj7D4',
  },
  'volcano-bay': {
    'krakatau-aqua-coaster': '2kK4xDRQyW4',
  },
};

// Tenta achar vídeo pelo título dentro de um parque específico.
// Se não achar no parque, procura em todos (pra reduzir colisão, prefira preencher por parque).
export function obterVideoPorTitulo(parque?: string, titulo?: string): string | null {
  if (!titulo) return null;
  const tKey = normaliza(titulo);
  if (parque) {
    const pKey = normaliza(parque);
    const parkMap = videosPorParque[pKey];
    if (parkMap && parkMap[tKey]) {
      const v = parkMap[tKey];
      return typeof v === 'string' ? v : v.url || v.id || null;
    }
  }
  // busca ampla (último recurso)
  for (const parkMap of Object.values(videosPorParque)) {
    const v = parkMap[tKey];
    if (v) return typeof v === 'string' ? v : v.url || v.id || null;
  }
  return null;
}

// Fallback completo: usa campos diretos (videoUrl/youtube/etc); se não tiver, usa o mapa
export function obterVideoDaAtracao(atracao: any): string | null {
  const direto =
    atracao?.videoUrl ||
    atracao?.youtube ||
    atracao?.video ||
    atracao?.midia ||
    atracao?.urlVideo;
  if (typeof direto === 'string' && direto.length > 6) return direto;

  // Alguns datasets têm "parque" no objeto da atração; se não tiver, pode vir no pai.
  const parque = atracao?.parque || atracao?.nomeParque || atracao?.park || '';
  return obterVideoPorTitulo(parque, atracao?.titulo);
}
