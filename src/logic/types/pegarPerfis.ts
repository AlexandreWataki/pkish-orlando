ï»¿import { Parkisheiro } from './parkisheiro';

/**
 * Retorna o valor do perfil salvo para uma categoria (ex: 'refeicoes', 'descanso', etc),
 * com base no objeto parkisheiro passado como parÃƒÂ¢metro.
 * - Se for um objeto com chave 'perfil' ou 'local', retorna esse valor.
 * - Se for uma lista, retorna o primeiro item.
 * - Se for string, retorna diretamente.
 * - Se nÃƒÂ£o houver perfil salvo, retorna string '0' (perfil padrÃƒÂ£o).
 */
export function pegarPerfil(categoria: string, parkisheiro: Parkisheiro): string {
  const raw = parkisheiro?.perfis?.[categoria];

  if (!raw) {
    return '0';
  }

  if (Array.isArray(raw)) {
    if (raw.length === 0) return '0';
    return String(raw[0]);
  }

  if (typeof raw === 'object' && raw !== null) {
    if ('perfil' in raw && raw.perfil !== undefined && raw.perfil !== null) {
      return String(raw.perfil);
    }
    if ('local' in raw && raw.local !== undefined && raw.local !== null) {
      return String(raw.local);
    }
    // Caso objeto mas sem 'perfil' ou 'local'
    return '0';
  }

  // Se for string ou outro tipo primitivo, converte para string
  return String(raw);
}
