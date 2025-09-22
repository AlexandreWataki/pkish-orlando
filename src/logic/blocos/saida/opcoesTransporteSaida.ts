﻿import { Regiao } from '@/logic/types/regioesHospedagem';

function calcularDistanciaKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function opcoesTransporteSaida(
  destino: string,
  regiao?: Regiao
) {
  const nomeOrigem = regiao?.nome || 'Hospedagem nÃ£o definida';
  const tempoAteMCO =regiao?.tempoAteAeroportoMCO ?? 30;

  const latOrigem =regiao?.latitude ?? null;
  const lonOrigem = regiao?.longitude ?? null;

  const latMCO = 28.4312;
  const lonMCO = -81.3081;

  let distanciaKm = 25;
  if (latOrigem !== null && lonOrigem !== null) {
    distanciaKm = calcularDistanciaKm(latOrigem, lonOrigem, latMCO, lonMCO);
  }

  const precoUberMin = Math.round(distanciaKm * 1.5 + 5);
  const precoUberMax = precoUberMin + 10;

  const descricaoUber = [
    `ðŸ•’ Tempo estimado: ${tempoAteMCO} min`,
    `ðŸ’° Valor estimado: US$ ${precoUberMin} a US$ ${precoUberMax}`,
    `ðŸ“± ServiÃ§o: Uber ou Lyft`,
  ].join('\n');

  const descricaoCarro = [
    `ðŸš— Se vocÃª alugou um carro no aeroporto (MCO), verifique se precisa devolver com tanque cheio.`,
    `â›½ Localize o posto de combustÃ­vel mais prÃ³ximo antes de sair do hotel.`,
    `ðŸ•‘ Reserve tempo extra para devoluÃ§Ã£o e deslocamento atÃ© o terminal.`,
  ].join('\n');

  return {
    titulo: 'ðŸ›« Transporte atÃ© o Aeroporto',
    tipo: 'transporte',
    local: `${nomeOrigem} â†’ ${destino}`,
    opcoes: [
      {
        subtitulo: 'ðŸš— Uber / Lyft',
        descricao: descricaoUber,
      },
      {
        subtitulo: 'ðŸš˜ Carro alugado',
        descricao: descricaoCarro,
      },
    ],
  };
}
