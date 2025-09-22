// src/logic/geradores/gerarDiaDescanso.ts
import { Dia } from '@/logic/types/dia';
import { TurnoDia, TurnoDescansoRegiao } from '@/logic/types/turno';
import { AtividadeDia } from '../types/atividade';

import { blocosComprasLevesDescanso } from '../blocos/descanso/blocosComprasLevesDescanso';
import { blocosNaturezaParquesAbertos } from '../blocos/descanso/blocosNaturezaParquesAbertos';
import { blocosPasseiosUrbanosTranquilos } from '../blocos/descanso/blocosPasseiosUrbanosTranquilos';
import { blocosSaboresDoMundo } from '../blocos/descanso/blocosSaboresDoMundo';
import { blocosConhecendoEUA } from '../blocos/descanso/blocosConhecendoEUA';

import { Parkisheiro } from '@/logic/types/parkisheiro';
import { gerarRefeicaoCafe } from '@/logic/blocos/ref/refeicaoCafe';
import { gerarRefeicaoAlmoco } from '@/logic/blocos/ref/refeicaoAlmoco';
import { gerarRefeicaoJantar } from '@/logic/blocos/ref/refeicaoJantar';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';
import { format } from 'date-fns';

export async function gerarDiaDescanso(numero: number, parkisheiro: Parkisheiro): Promise<Dia> {
  try {
    const diaCorrespondente = parkisheiro.roteiroFinal?.find(
      (d) => d.id === `dia${numero}`
    );

    const perfilTexto = diaCorrespondente?.perfilDescanso ?? 'comprasLevesDescanso';

    const perfisDescanso = {
      comprasLevesDescanso: { nome: 'Compras leves + Descanso', icone: 'ðŸ›ï¸' },
      naturezaParquesAbertos: { nome: 'Natureza & Parques abertos', icone: 'ðŸŒ³' },
      passeiosUrbanos: { nome: 'Passeios urbanos tranquilos', icone: 'ðŸ™ï¸' },
      conhecendoEUA: { nome: 'Conhecendo os EUA', icone: 'ðŸ¦…' },
      saboresDoMundo: { nome: 'Sabores do Mundo', icone: 'ðŸ½ï¸' },
    } as const;

    let blocos: TurnoDescansoRegiao[];
    switch (perfilTexto) {
      case 'naturezaParquesAbertos':
        blocos = blocosNaturezaParquesAbertos;
        break;
      case 'passeiosUrbanos':
        blocos = blocosPasseiosUrbanosTranquilos;
        break;
      case 'conhecendoEUA':
        blocos = blocosConhecendoEUA;
        break;
      case 'saboresDoMundo':
        blocos = blocosSaboresDoMundo;
        break;
      case 'comprasLevesDescanso':
      default:
        blocos = blocosComprasLevesDescanso;
        break;
    }

    const data =
      parkisheiro.dataInicio instanceof Date
        ? new Date(parkisheiro.dataInicio.getTime() + (numero - 1) * 86400000)
        : new Date();

    const dataIso = format(data, 'yyyy-MM-dd');

    function obter(periodo: 'manha' | 'tarde' | 'noite'): AtividadeDia[] {
      const bloco = blocos.find(b => b.periodo === periodo);
      if (!bloco) return [];
      return bloco.atividades.map((a): AtividadeDia => ({
        ...a,
        subtitulo: bloco.referencia ? `â€“ ${bloco.referencia}` : '',
      }));
    }

    const atividadesManha = obter('manha');
    const atividadesTarde = obter('tarde');
    const atividadesNoite = obter('noite');

    const cafe = perfilTexto === 'saboresDoMundo' ? [] : await gerarRefeicaoCafe(
      parkisheiro,
      atividadesManha[0]?.regiao,
      atividadesManha[0]?.latitude,
      atividadesManha[0]?.longitude
    );

    const almoco = perfilTexto === 'saboresDoMundo' ? [] : await gerarRefeicaoAlmoco(
      parkisheiro,
      atividadesTarde[0]?.regiao,
      atividadesTarde[0]?.latitude,
      atividadesTarde[0]?.longitude
    );

    const jantar = perfilTexto === 'saboresDoMundo' ? [] : await gerarRefeicaoJantar(
      parkisheiro,
      atividadesNoite[0]?.regiao,
      atividadesNoite[0]?.latitude,
      atividadesNoite[0]?.longitude
    );

    const refManha = cafe[0];
    const refTarde = almoco[0];
    const refNoite = jantar[0];

    // evita repetiÃ§Ã£o de .find(...)
    const blocoManha = blocos.find(b => b.periodo === 'manha');
    const blocoTarde = blocos.find(b => b.periodo === 'tarde');
    const blocoNoite = blocos.find(b => b.periodo === 'noite');

    const turnos: TurnoDia[] = [
      {
        titulo: 'ManhÃ£',
        periodo: 'manha',
        atividades: [
          ...cafe,
          {
            tipo: 'area',
            titulo: blocoManha?.atividades[0]?.regiao || 'Ãrea',
            descricao: blocoManha?.descricaoRegiao ?? '',
            latitude: refManha?.latitude,
            longitude: refManha?.longitude,
            area: blocoManha?.atividades[0]?.regiao || '',
          },
          ...atividadesManha,
        ],
      },
      {
        titulo: 'Tarde',
        periodo: 'tarde',
        atividades: [
          ...almoco,
          {
            tipo: 'area',
            titulo: blocoTarde?.atividades[0]?.regiao || 'Ãrea',
            descricao: blocoTarde?.descricaoRegiao ?? '',
            latitude: refTarde?.latitude,
            longitude: refTarde?.longitude,
            area: blocoTarde?.atividades[0]?.regiao || '',
          },
          ...atividadesTarde,
        ],
      },
      {
        titulo: 'Noite',
        periodo: 'noite',
        atividades: [
          ...jantar,
          {
            tipo: 'area',
            titulo: blocoNoite?.atividades[0]?.regiao || 'Ãrea',
            descricao: blocoNoite?.descricaoRegiao ?? '',
            latitude: refNoite?.latitude,
            longitude: refNoite?.longitude,
            area: blocoNoite?.atividades[0]?.regiao || '',
          },
          ...atividadesNoite,
        ],
      },
    ];

    function montarDescricaoRegiao(
      nome: string,
      resumo: string,
      regiaoLat: number | null,
      regiaoLon: number | null,
      baseLat: number | null,
      baseLon: number | null
    ): string {
      if (
        regiaoLat == null ||
        regiaoLon == null ||
        baseLat == null ||
        baseLon == null
      ) {
        return resumo || 'RegiÃ£o definida no inÃ­cio da viagem';
      }

      const distanciaKm = calcDistanciaKm(baseLat, baseLon, regiaoLat, regiaoLon);
      const { tempoMin: tempoUber, precoUber } = calcularTransporteEstimado(distanciaKm);
      const tempoPe = Math.round((distanciaKm / 5) * 60);

      return `${resumo}, ${distanciaKm.toFixed(2)} km, ${tempoPe} min a pÃ©, ${tempoUber} min de Uber, $${precoUber.toFixed(2)}`;
    }

    const regiao = parkisheiro.regiaoHospedagem;
    const baseLat = regiao?.latitude ?? null;
    const baseLon = regiao?.longitude ?? null;

    const descricaoRegiaoDetalhada = montarDescricaoRegiao(
      regiao?.nome || 'RegiÃ£o escolhida',
      regiao?.descricao || 'RegiÃ£o definida no inÃ­cio da viagem',
      regiao?.latitude ?? null,
      regiao?.longitude ?? null,
      baseLat,
      baseLon
    );

    return {
      id: `descanso-${numero}`,
      tipo: 'descanso',
      numero,
      data: dataIso,
      cabecalho: {
        titulo: 'Dia de Descanso',
        imagem: 'descanso.jpg',
        clima: {
          temperatura: 26,
          condicao: 'Parcialmente Nublado',
          icone: 'partly-sunny',
        },
      },
      objetivo: 'Dia de descanso planejado com base em seu estilo preferido para relaxar em Orlando.',
      turnos,
      dicas: [],
      regiao: {
        nome: regiao?.nome || 'Desconhecido',
        descricao: descricaoRegiaoDetalhada,
      },
      perfilDescanso: {
        valor: perfilTexto,
        nome: perfisDescanso[perfilTexto].nome,
        icone: perfisDescanso[perfilTexto].icone,
      },
    };
  } catch (erro) {
    console.error('Erro gerarDiaDescanso:', erro);
    return {
      id: `descanso-${numero}`,
      tipo: 'descanso',
      numero,
      data: new Date().toISOString().split('T')[0],
      cabecalho: {
        titulo: 'Erro ao gerar dia de descanso',
        imagem: 'descanso.jpg',
        clima: {
          temperatura: 0,
          condicao: 'Indefinido',
          icone: 'error',
        },
      },
      objetivo: 'NÃ£o foi possÃ­vel gerar o conteÃºdo deste dia.',
      turnos: [],
      dicas: [],
      regiao: {
        nome: 'Desconhecido',
        descricao: 'Desconhecido',
      },
    };
  }
}
