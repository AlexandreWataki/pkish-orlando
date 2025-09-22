ï»¿// src/logic/blocos/ref/transporte.ts

import { AtividadeDia } from '@/logic/types/atividade';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';
import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';

type InputTransporte = {
  origem?: string;
  destino?: string;
  latitudeOrigem?: number;
  longitudeOrigem?: number;
  latitudeDestino?: number;
  longitudeDestino?: number;
  descricao?: string; // <-- adicionado aqui

};

export async function gerarTransporte(
  parkisheiro: Parkisheiro,
  input: InputTransporte
): Promise<AtividadeDia> {
  const origem = input.origem ?? 'Hospedagem';
  const destino = input.destino ?? 'Destino';

  const lat1 = input.latitudeOrigem ?? parkisheiro.regiaoHospedagem?.latitude ?? 0;
  const lon1 = input.longitudeOrigem ?? parkisheiro.regiaoHospedagem?.longitude ?? 0;
  const lat2 = input.latitudeDestino ?? 0;
  const lon2 = input.longitudeDestino ?? 0;

  const distanciaKm = calcDistanciaKm(lat1, lon1, lat2, lon2);
  const { tempoMin, precoUber } = calcularTransporteEstimado(distanciaKm);

  return {
    id: `transporte-${origem}-${destino}`,
    titulo: `Ã°Å¸Å¡â€” Transporte atÃƒÂ© ${destino}`,
    descricao: `Deslocamento entre ${origem} e ${destino} estimado em ${tempoMin} min de Uber por aproximadamente $${precoUber.toFixed(2)}.`,
    local: destino,
    tipo: 'descanso',
    imagem: 'transporte.jpg',
    latitude: lat2,
    longitude: lon2,
  };
}
