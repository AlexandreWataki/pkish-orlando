ï»¿import type { NomeMenu } from "./nomesRefeicoes.shared";
import { normalizeNome } from "./nomesRefeicoes.shared";

// Importa as listas (cada uma em seu arquivo prÃƒÂ³prio)
import { NOMES_REFEICOES_CAFE } from "./nomesRefeicoesCafe";
import { NOMES_REFEICOES_ALMOCO } from "./nomesRefeicoesAlmoco";
import { NOMES_REFEICOES_JANTAR } from "./nomesRefeicoesJantar";

// Junta todas em uma ÃƒÂºnica lista
export const NOMES_REFEICOES: NomeMenu[] = [
  ...NOMES_REFEICOES_CAFE,
  ...NOMES_REFEICOES_ALMOCO,
  ...NOMES_REFEICOES_JANTAR,
].sort((a, b) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
);

// Mapa normalizado -> url (lookup O(1))
const MAP: Map<string, string> = new Map(
  NOMES_REFEICOES.map((i) => [normalizeNome(i.nome), i.menuUrl])
);

// Busca URL pelo nome do restaurante (casando com normalizeNome)
export function getMenuUrlByNome(nome: string): string {
  return MAP.get(normalizeNome(nome)) || "";
}

// (Opcional) export do mapa se quiser reusar diretamente
export const MENU_LOOKUP = MAP;
