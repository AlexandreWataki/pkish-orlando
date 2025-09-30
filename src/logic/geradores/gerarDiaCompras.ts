import { Dia } from '@/logic/types/dia';
import { TurnoDia, TurnoDescansoRegiao } from '@/logic/types/turno';
import { AtividadeDia } from '../types/atividade';
import { Parkisheiro } from '@/logic/types/parkisheiro';

import { blocosOrlandoPremiumOutlets } from '../blocos/compras/blocosOrlandoPremiumOutlets';
import { blocosMallAtMillenia } from '../blocos/compras/blocosMallAtMillenia';
import { blocosFloridaMall } from '../blocos/compras/blocosFloridaMall';
import { blocosWalmartTargetFiveBelow } from '../blocos/compras/blocosWalmartTargetFiveBelow';
import { blocosDisneySpringsCityWalk } from '../blocos/compras/blocosDisneySpringsCityWalk';
import { blocosTheLoopAndLakeBuenaVistaFactory } from '../blocos/compras/blocosTheLoopAndLakeBuenaVistaFactory';
import { blocosComprasAlternativasLocais } from '../blocos/compras/blocosComprasAlternativasLocais';

import { gerarRefeicaoCafe } from '@/logic/blocos/ref/refeicaoCafe';
import { gerarRefeicaoAlmoco } from '@/logic/blocos/ref/refeicaoAlmoco';
import { gerarRefeicaoJantar } from '@/logic/blocos/ref/refeicaoJantar';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';
import { format } from 'date-fns';

export async function gerarDiaCompras(numero: number, parkisheiro: Parkisheiro): Promise<Dia> {
  try {
    const data =
      parkisheiro.dataInicio instanceof Date
        ? new Date(parkisheiro.dataInicio.getTime() + (numero - 1) * 86400000)
        : new Date();

    const dataIso = format(data, 'yyyy-MM-dd');
    const diaCorrespondente = parkisheiro.roteiroFinal?.find(
      d => format(new Date(d.data), 'yyyy-MM-dd') === dataIso
    );
    const perfilTexto = diaCorrespondente?.perfilCompras ?? 'orlandoPremiumOutlets';

    const mapaPerfisCompras: Record<string, TurnoDescansoRegiao[]> = {
      orlandoPremiumOutlets: blocosOrlandoPremiumOutlets,
      mallMillenia: blocosMallAtMillenia,
      floridaMall: blocosFloridaMall,
      walmartTargetFive: blocosWalmartTargetFiveBelow,
      disneySpringsCityWalk: blocosDisneySpringsCityWalk,
      lakeBuenaVista: blocosTheLoopAndLakeBuenaVistaFactory,
      arteLocalFeiras: blocosComprasAlternativasLocais,
    };

    const infoPerfisCompras: Record<string, { nome: string; icone: string }> = {
      orlandoPremiumOutlets: { nome: 'Orlando Premium Outlets', icone: '🛒' },
      mallMillenia: { nome: 'The Mall at Millenia', icone: '💎' },
      floridaMall: { nome: 'Florida Mall', icone: '🏬' },
      walmartTargetFive: { nome: 'Walmart, Target & Five Below', icone: '🧸' },
      disneySpringsCityWalk: { nome: 'Disney Springs & CityWalk', icone: '🎠' },
      lakeBuenaVista: { nome: 'Lake Buena Vista Factory Stores', icone: '🖼️' },
      arteLocalFeiras: { nome: 'Arte local e feirinhas', icone: '🎨' },
    };

    const blocos = mapaPerfisCompras[perfilTexto] || blocosOrlandoPremiumOutlets;
    const perfilInfo = infoPerfisCompras[perfilTexto] || infoPerfisCompras['orlandoPremiumOutlets'];

    function obter(periodo: 'manha' | 'tarde' | 'noite'): AtividadeDia[] {
      const bloco = blocos.find(b => b.periodo === periodo);
      if (!bloco) return [];

      const atividades: AtividadeDia[] = [];

      atividades.push(
        ...bloco.atividades.map(
          (a): AtividadeDia => ({
            ...a,
            area: a.regiao,
            subtitulo: bloco.referencia ? `– ${bloco.referencia}` : '',
          })
        )
      );

      return atividades;
    }

    const atividadesManha = obter('manha');
    const atividadesTarde = obter('tarde');
    const atividadesNoite = obter('noite');

    const primeiraManha = atividadesManha.find(a => a.tipo !== 'area' && a.latitude && a.longitude);
    const primeiraTarde = atividadesTarde.find(a => a.tipo !== 'area' && a.latitude && a.longitude);
    const primeiraNoite = atividadesNoite.find(a => a.tipo !== 'area' && a.latitude && a.longitude);

    const cafe = await gerarRefeicaoCafe(
      parkisheiro,
      primeiraManha?.area,
      primeiraManha?.latitude,
      primeiraManha?.longitude
    );
    const almoco = await gerarRefeicaoAlmoco(
      parkisheiro,
      primeiraTarde?.area,
      primeiraTarde?.latitude,
      primeiraTarde?.longitude
    );
    const jantar = await gerarRefeicaoJantar(
      parkisheiro,
      primeiraNoite?.area,
      primeiraNoite?.latitude,
      primeiraNoite?.longitude
    );

    const refManha = cafe[0];
    const refTarde = almoco[0];
    const refNoite = jantar[0];

    const turnos: TurnoDia[] = [
      {
        periodo: 'manha',
        titulo: 'Manhã',
        atividades: [
          ...cafe,
          {
            tipo: 'area',
            titulo: blocos.find(b => b.periodo === 'manha')?.atividades[0]?.regiao || 'Área',
            descricao: blocos.find(b => b.periodo === 'manha')?.descricaoRegiao ?? '',
            latitude: refManha?.latitude,
            longitude: refManha?.longitude,
            area: blocos.find(b => b.periodo === 'manha')?.atividades[0]?.regiao || '',
          },
          ...atividadesManha,
        ],
      },
      {
        periodo: 'tarde',
        titulo: 'Tarde',
        atividades: [
          ...almoco,
          {
            tipo: 'area',
            titulo: blocos.find(b => b.periodo === 'tarde')?.atividades[0]?.regiao || 'Área',
            descricao: blocos.find(b => b.periodo === 'tarde')?.descricaoRegiao ?? '',
            latitude: refTarde?.latitude,
            longitude: refTarde?.longitude,
            area: blocos.find(b => b.periodo === 'tarde')?.atividades[0]?.regiao || '',
          },
          ...atividadesTarde,
        ],
      },
      {
        periodo: 'noite',
        titulo: 'Noite',
        atividades: [
          ...jantar,
          {
            tipo: 'area',
            titulo: blocos.find(b => b.periodo === 'noite')?.atividades[0]?.regiao || 'Área',
            descricao: blocos.find(b => b.periodo === 'noite')?.descricaoRegiao ?? '',
            latitude: refNoite?.latitude,
            longitude: refNoite?.longitude,
            area: blocos.find(b => b.periodo === 'noite')?.atividades[0]?.regiao || '',
          },
          ...atividadesNoite,
        ],
      },
    ];

    const regiao = parkisheiro.regiaoHospedagem;
    const baseLat = regiao?.latitude ?? null;
    const baseLon = regiao?.longitude ?? null;

    function montarDescricaoRegiao(
      nome: string,
      resumo: string,
      regiaoLat: number | null,
      regiaoLon: number | null,
      baseLat: number | null,
      baseLon: number | null
    ): string {
      if (!regiaoLat || !regiaoLon || !baseLat || !baseLon) {
        return resumo || 'Região definida no início da viagem';
      }

      const distanciaKm = calcDistanciaKm(baseLat, baseLon, regiaoLat, regiaoLon);
      const { tempoMin: tempoUber, precoUber } = calcularTransporteEstimado(distanciaKm);
      const tempoPe = Math.round((distanciaKm / 5) * 60);

      return `${resumo}, ${distanciaKm.toFixed(2)} km, ${tempoPe} min a pé, ${tempoUber} min de Uber, $${precoUber.toFixed(
        2
      )}`;
    }

    const descricaoRegiaoDetalhada = montarDescricaoRegiao(
      regiao?.nome || 'Região escolhida',
      regiao?.descricao || 'Região definida no início da viagem',
      regiao?.latitude ?? null,
      regiao?.longitude ?? null,
      baseLat,
      baseLon
    );

    return {
      id: `compras-${numero}`,
      tipo: 'compras',
      numero,
      data: dataIso,
      cabecalho: {
        titulo: 'Dia de Compras',
        imagem: 'compras.jpg',
        clima: {
          temperatura: 28,
          condicao: 'Ensolarado',
          icone: 'sunny',
        },
      },
      objetivo:
        'Dia de compras com roteiros completos e personalizados conforme seu estilo preferido de consumo em Orlando.',
      turnos,
      dicas: parkisheiro.perfis?.compras?.dicas || [],
      regiao: {
        nome: regiao?.nome || 'Região escolhida',
        descricao: descricaoRegiaoDetalhada,
      },
      perfilCompras: {
        valor: perfilTexto,
        nome: perfilInfo.nome,
        icone: perfilInfo.icone,
      },
    };
  } catch (erro) {
    console.error('Erro gerarDiaCompras:', erro);
    return {
      id: `compras-${numero}`,
      tipo: 'compras',
      numero,
      data: new Date().toISOString().split('T')[0],
      cabecalho: {
        titulo: 'Erro ao gerar dia de compras',
        imagem: 'compras.jpg',
        clima: {
          temperatura: 0,
          condicao: 'Indefinido',
          icone: 'error',
        },
      },
      objetivo: 'Não foi possível gerar o conteúdo deste dia.',
      turnos: [],
      dicas: [],
      regiao: {
        nome: 'Desconhecido',
        descricao: 'Desconhecido',
      },
    };
  }
}
