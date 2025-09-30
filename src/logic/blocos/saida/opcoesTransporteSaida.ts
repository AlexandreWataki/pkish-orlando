import { Regiao } from '@/logic/types/regioesHospedagem';

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
  const nomeOrigem = regiao?.nome || 'Hospedagem não definida';
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
    `🕒 Tempo estimado: ${tempoAteMCO} min`,
    `💰 Valor estimado: US$ ${precoUberMin} a US$ ${precoUberMax}`,
    `📱 Serviço: Uber ou Lyft`,
  ].join('\n');

  const descricaoCarro = [
    `🚗 Se você alugou um carro no aeroporto (MCO), verifique se precisa devolver com tanque cheio.`,
    `⛽ Localize o posto de combustível mais próximo antes de sair do hotel.`,
    `🕑 Reserve tempo extra para devolução e deslocamento até o terminal.`,
  ].join('\n');

  return {
    titulo: '🛫 Transporte até o Aeroporto',
    tipo: 'transporte',
    local: `${nomeOrigem} → ${destino}`,
    opcoes: [
      {
        subtitulo: '🚗 Uber / Lyft',
        descricao: descricaoUber,
      },
      {
        subtitulo: '🚘 Carro alugado',
        descricao: descricaoCarro,
      },
    ],
  };
}
