// Tipos e utilitÃ¡rios compartilhados â€” NÃƒO importa listas para evitar ciclo

export type NomeMenu = { 
  nome: string; 
  menuUrl: string; 
};

// Normaliza nomes para casar corretamente (remove acentos, aspas, mÃºltiplos espaÃ§os, etc.)
export function normalizeNome(s: string) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // tira acentos
    .replace(/['â€™"â€œâ€`]/g, "")        // aspas variadas
    .replace(/[â€“â€”\-]/g, "-")         // normaliza hÃ­fens
    .replace(/\s+/g, " ")            // espaÃ§os mÃºltiplos
    .trim()
    .toLowerCase();
}
