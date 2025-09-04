/**
 * calculaTransporteEstimado.ts
 *
 * Calcula tempo em minutos e preço médio do UberX para a distância informada.
 * Valores médios de Orlando em 2025.
 */

export function calcularTransporteEstimado(distanciaKm: number | null | undefined) {
  if (distanciaKm == null || isNaN(distanciaKm) || distanciaKm <= 0) {
    return { tempoMin: 0, precoUber: 0 };
  }

  // Parâmetros médios de Orlando
  const tempoMin = Math.round(distanciaKm * 2.2); // arredonda para inteiro

  // UberX valores aproximados para 2025
  const tarifaBase = 2.8;
  const precoPorKm = 1.2;
  const precoPorMin = 0.2;

  const precoUber =
    tarifaBase +
    distanciaKm * precoPorKm +
    tempoMin * precoPorMin;

  return {
    tempoMin,
    precoUber: Math.round(precoUber * 100) / 100, // 2 casas decimais
  };
}
