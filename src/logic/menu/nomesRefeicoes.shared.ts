// Tipos e utilitários compartilhados — NÃO importa listas para evitar ciclo

export type NomeMenu = { 
  nome: string; 
  menuUrl: string; 
};

// Normaliza nomes para casar corretamente (remove acentos, aspas, múltiplos espaços, etc.)
export function normalizeNome(s: string) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // tira acentos
    .replace(/['’"“”`]/g, "")        // aspas variadas
    .replace(/[–—\-]/g, "-")         // normaliza hífens
    .replace(/\s+/g, " ")            // espaços múltiplos
    .trim()
    .toLowerCase();
}
