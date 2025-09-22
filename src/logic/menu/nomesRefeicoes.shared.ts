ï»¿// Tipos e utilitÃƒÂ¡rios compartilhados Ã¢â‚¬â€ NÃƒÆ’O importa listas para evitar ciclo

export type NomeMenu = { 
  nome: string; 
  menuUrl: string; 
};

// Normaliza nomes para casar corretamente (remove acentos, aspas, mÃƒÂºltiplos espaÃƒÂ§os, etc.)
export function normalizeNome(s: string) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // tira acentos
    .replace(/['Ã¢â‚¬â„¢"Ã¢â‚¬Å“Ã¢â‚¬Â`]/g, "")        // aspas variadas
    .replace(/[Ã¢â‚¬â€œÃ¢â‚¬â€\-]/g, "-")         // normaliza hÃƒÂ­fens
    .replace(/\s+/g, " ")            // espaÃƒÂ§os mÃƒÂºltiplos
    .trim()
    .toLowerCase();
}
