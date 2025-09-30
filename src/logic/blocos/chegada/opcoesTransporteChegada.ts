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

export function opcoesTransporteChegada(
  origem: string,
   regiao?: Regiao
) {
  const nomeDestino =  regiao?.nome || 'Hospedagem não definida';
  const tempoDestino = regiao?.tempoAteAeroportoMCO ?? 30;

  const latDestino = regiao?.latitude ?? null;
  const lonDestino = regiao?.longitude ?? null;

  const latMCO = 28.4312;
  const lonMCO = -81.3081;

  let distanciaKm = 25;
  if (latDestino !== null && lonDestino !== null) {
    distanciaKm = calcularDistanciaKm(latMCO, lonMCO, latDestino, lonDestino);
  }

  const precoUberMin = Math.round(distanciaKm * 1.5 + 5);
  const precoUberMax = precoUberMin + 10;

  const descricaoUber = [
    `Tempo estimado: ${tempoDestino} min`,
    `Valor estimado: US$ ${precoUberMin} a US$ ${precoUberMax}`,
    `Serviço: Uber ou Lyft`,
  ].join('\n');

  const descricaoCarro = [
    `Distância: ${distanciaKm.toFixed(1)} km`,
    `Diárias médias por categoria:`,
    `Econômico / Compacto: US$ 40 a US$ 60`,
    `SUV / Intermediário: US$ 60 a US$ 90`,
    `Van / 7 lugares: US$ 80 a US$ 120`,
    `Luxo / Premium: US$ 100 a US$ 200`,
  ].join('\n');

  return {
    titulo: '🚙 Transporte até o hotel',
    tipo: 'transporte',
    local: `${origem} → ${nomeDestino}`,
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