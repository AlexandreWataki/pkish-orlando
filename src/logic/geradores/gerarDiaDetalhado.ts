ï»¿// src/logic/geradores/gerarDiaDetalhado.ts

import { Dia } from '@/logic/types/dia';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import { gerarDiaChegada } from './gerarDiaChegada';
import { gerarDiaParqueDisney } from './gerarDiaParqueDisney';
import { gerarDiaParqueUniversal } from './gerarDiaParqueUniversal';
import { gerarDiaCompras } from './gerarDiaCompras';
import { gerarDiaDescanso } from './gerarDiaDescanso';
import { gerarDiaSaida } from './gerarDiaSaida';

export async function gerarDiaDetalhado(
  tipo: string,
  numero: number,
  parkisheiro: Parkisheiro,
  nomeParque?: string
): Promise<Dia> {
  const data = new Date();
  data.setDate(data.getDate() + (numero - 1));
  const dataFormatada = data.toISOString().split('T')[0];

  switch (tipo) {
    case 'chegada':
      return await gerarDiaChegada(numero, parkisheiro);

    case 'disney':
      return {
        ...(await gerarDiaParqueDisney(numero, parkisheiro)),
        nomeParque: nomeParque || 'Magic Kingdom',
      };

    case 'universal':
      return {
        ...(await gerarDiaParqueUniversal(numero, parkisheiro)),
        nomeParque: nomeParque || 'Universal Studios',
      };

    case 'compras':
      return {
        ...(await gerarDiaCompras(numero, parkisheiro)),
        nomeParque: '',
      };

    case 'descanso':
      return {
        ...(await gerarDiaDescanso(numero, parkisheiro)),
        nomeParque: '',
      };

    case 'saida':
      return await gerarDiaSaida(numero, parkisheiro);

    default:
      return {
        numero,
        data: dataFormatada,
        tipo,
        cabecalho: {
          titulo: 'Ã¢Ââ€œ Dia indefinido',
          imagem: 'fundoCardGrande.jpg',
          clima: {
            temperatura: 30,
            condicao: 'Sol',
            icone: '',
          },
        },
        objetivo: 'NÃƒÂ£o foi possÃƒÂ­vel gerar este dia automaticamente.',
        turnos: [],
        nomeParque: '',
      };
  }
}
