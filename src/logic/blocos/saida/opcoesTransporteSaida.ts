ï»¿import { Regiao } from '@/logic/types/regioesHospedagem';

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
  const nomeOrigem = regiao?.nome || 'Hospedagem nÃƒÂ£o definida';
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
    `Ã°Å¸â€¢â€™ Tempo estimado: ${tempoAteMCO} min`,
    `Ã°Å¸â€™Â° Valor estimado: US$ ${precoUberMin} a US$ ${precoUberMax}`,
    `Ã°Å¸â€œÂ± ServiÃƒÂ§o: Uber ou Lyft`,
  ].join('\n');

  const descricaoCarro = [
    `Ã°Å¸Å¡â€” Se vocÃƒÂª alugou um carro no aeroporto (MCO), verifique se precisa devolver com tanque cheio.`,
    `Ã¢â€ºÂ½ Localize o posto de combustÃƒÂ­vel mais prÃƒÂ³ximo antes de sair do hotel.`,
    `Ã°Å¸â€¢â€˜ Reserve tempo extra para devoluÃƒÂ§ÃƒÂ£o e deslocamento atÃƒÂ© o terminal.`,
  ].join('\n');

  return {
    titulo: 'Ã°Å¸â€ºÂ« Transporte atÃƒÂ© o Aeroporto',
    tipo: 'transporte',
    local: `${nomeOrigem} Ã¢â€ â€™ ${destino}`,
    opcoes: [
      {
        subtitulo: 'Ã°Å¸Å¡â€” Uber / Lyft',
        descricao: descricaoUber,
      },
      {
        subtitulo: 'Ã°Å¸Å¡Ëœ Carro alugado',
        descricao: descricaoCarro,
      },
    ],
  };
}
