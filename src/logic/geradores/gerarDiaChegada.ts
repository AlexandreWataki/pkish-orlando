import { Dia } from '@/logic/types/dia';
import { TurnoDia } from '@/logic/types/turno';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import documentosCh from '@/logic/blocos/chegada/documentosCh';
import tChegada from '@/logic/blocos/chegada/tChegada';
import { buscarClima } from '@/logic/clima/buscarclima';
import dicasTurnoChegada from '@/logic/blocos/chegada/dicasTurnoChegada';

import { blocosQuandoChegaDeManha } from '@/logic/blocos/chegada/blocosQuandoChegaDeManha';
import { blocosQuandoChegaDeTarde } from '@/logic/blocos/chegada/blocosQuandoChegaDeTarde';
import { blocosQuandoChegaDeMadrugada } from '@/logic/blocos/chegada/blocosQuandoChegaDeMadrugada';

import { gerarRefeicaoAlmoco } from '@/logic/blocos/ref/refeicaoAlmoco';
import { gerarRefeicaoJantar } from '@/logic/blocos/ref/refeicaoJantar';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';

export async function gerarDiaChegada(numero: number, parkisheiro: Parkisheiro): Promise<Dia> {
  const vooManual = parkisheiro.diasDistribuidosManuais?.[0];
  const voo = {
    aeroporto: parkisheiro.vooChegada?.aeroporto || 'Orlando International Airport (MCO)',
    horario: vooManual?.horarioVoo || parkisheiro.vooChegada?.horario || 'noite',
  };

  const regiao = parkisheiro.regiaoHospedagem;

  const data =
    parkisheiro.dataInicio instanceof Date
      ? parkisheiro.dataInicio.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

  const turnoChave = (voo.horario.toLowerCase() || 'noite') as 'manha' | 'tarde' | 'noite' | 'madrugada';

  const climaApi = await buscarClima();
  const clima = climaApi
    ? {
        temperatura: climaApi.temp,
        condicao: climaApi.condicao,
        icone: climaApi.icone,
      }
    : {
        temperatura: 30,
        condicao: 'Ensolarado',
        icone: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      };

  const cabecalho = {
    titulo: 'Chegada em Orlando',
    imagem: 'ingresso.jpg',
    clima,
  };

  const destinoNome = regiao?.nome || 'Destino não definido';
  const trajeto = `${voo.aeroporto} → ${destinoNome}`;

  // CARD DE TRANSPORTE AEROPORTO
  const baseLat = regiao?.latitude ?? null;
  const baseLon = regiao?.longitude ?? null;
  const aeroportoLat = 28.4312;
  const aeroportoLon = -81.3081;

  let opcoesTransporte = [];
  if (baseLat && baseLon) {
    const distanciaKm = calcDistanciaKm(aeroportoLat, aeroportoLon, baseLat, baseLon);
    const estimativa = calcularTransporteEstimado(distanciaKm);

    opcoesTransporte = [
      {
        subtitulo: 'Uber / Lyft',
        descricao: [
          `Tempo estimado: ${estimativa.tempoMin ?? '--'} min`,
          `Valor estimado: US$ ${estimativa.precoUber?.toFixed(2) ?? '--'}`,
          'Serviço: Uber ou Lyft',
        ].join('\n'),
      },
      {
        subtitulo: 'Carro alugado',
        descricao: [
          `Distância: ${distanciaKm.toFixed(2)} km`,
          'Diárias médias por categoria:',
          'Econômico / Compacto: US$ 40 a US$ 60',
          'SUV / Intermediário: US$ 60 a US$ 90',
          'Van / 7 lugares: US$ 80 a US$ 120',
          'Luxo / Premium: US$ 100 a US$ 200',
        ].join('\n'),
      },
    ];
  } else {
    opcoesTransporte = [
      {
        subtitulo: 'Uber / Lyft',
        descricao: 'Não foi possível calcular transporte (verifique dados da hospedagem).',
      },
    ];
  }

  // --- LISTA DE CARDS PRINCIPAIS ---
  const cardsPrincipais = [
    {
      titulo: documentosCh.titulo,
      tipo: 'informativa',
      descricao: [
        '🛬 Chegando aos EUA, separe antes de sair do avião:',
        ...documentosCh.itens.map(item => '' + item),
       
        '💡 Dicas importantes:',
        documentosCh.dicas.join('\n'),
        
        '🎯 Postura recomendada:',
        documentosCh.postura.join('\n'),
      ].join('\n'),
      justificado: true,
    },
    { ...tChegada, justificado: true },
    {
      tipo: 'transporte',
      titulo: 'Transporte até a região',
      local: trajeto,
      opcoes: opcoesTransporte,
      justificado: true,
    },
    {
      titulo: dicasTurnoChegada[turnoChave]?.titulo || 'Chegada e Organização',
      tipo: 'informativa',
      descricao:
        dicasTurnoChegada[turnoChave]?.descricao ||
        'Organize sua chegada e prepare-se bem para o começo da viagem!',
      justificado: true,
    },
  ];

  let turnos: TurnoDia[] = [
    { titulo: turnoChave.charAt(0).toUpperCase() + turnoChave.slice(1), periodo: turnoChave, atividades: cardsPrincipais },
  ];

  // Função utilitária para gerar turnos adicionais
  async function gerarTurnosAdicionais(blocos: any[], turnosDesejados: { periodo: string; gerarRefeicaoFn: any }[]) {
    for (const { periodo, gerarRefeicaoFn } of turnosDesejados) {
      const bloco = blocos.find(b => b.periodo === periodo);
      if (bloco) {
        const turno = await gerarTurnoComTransportes({
          bloco,
          gerarRefeicaoFn,
          periodo,
          parkisheiro,
          regiao,
        });
        if (turno) turnos.push(turno);
      }
    }
  }

  // Função que monta um turno com transporte + refeição
  async function gerarTurnoComTransportes({
    bloco,
    gerarRefeicaoFn,
    periodo,
    parkisheiro,
    regiao,
  }: {
    bloco: any;
    gerarRefeicaoFn: any;
    periodo: string;
    parkisheiro: Parkisheiro;
    regiao: any;
  }): Promise<TurnoDia | null> {
    if (!bloco || bloco.atividades.length === 0) return null;

    const primeiraAtividade = bloco.atividades[0];
    const refeicao = await gerarRefeicaoFn(
      parkisheiro,
      primeiraAtividade?.regiao,
      primeiraAtividade?.latitude,
      primeiraAtividade?.longitude
    );

    let atividades: any[] = [];
    if (
      regiao?.latitude != null &&
      regiao?.longitude != null &&
      refeicao?.[0]?.latitude != null &&
      refeicao?.[0]?.longitude != null
    ) {
      const distKm = calcDistanciaKm(regiao.latitude, regiao.longitude, refeicao[0].latitude, refeicao[0].longitude);
      const estimativa = calcularTransporteEstimado(distKm);
      atividades.push({
        tipo: 'transporte',
        titulo: `Transporte até ${refeicao[0].titulo || 'o restaurante'}`,
        meio: distKm <= 0.5 ? 'Caminhada' : distKm <= 1.0 ? 'Caminhada ou Carro' : 'Carro',
        distancia: distKm,
        tempoMin: estimativa.tempoMin,
        precoUber: estimativa.precoUber,
        destino: refeicao[0].regiao || refeicao[0].local,
        justificado: true,
      });
    }

    if (refeicao && refeicao.length > 0) atividades.push(...refeicao.map(r => ({ ...r, justificado: true })));

    let anteriores = refeicao && refeicao.length > 0 ? refeicao[0] : null;
    for (let i = 0; i < bloco.atividades.length; i++) {
      const atual = bloco.atividades[i];
      const atividadeComRegiao = {
        ...atual,
        regiao: atual.tipo === 'descanso' && regiao?.nome ? regiao.nome : atual.regiao,
        local: atual.tipo === 'descanso' && regiao?.nome ? `Quarto em ${regiao.nome}` : atual.local,
        justificado: true,
      };

      if (
        anteriores?.latitude != null &&
        anteriores?.longitude != null &&
        atual?.latitude != null &&
        atual?.longitude != null
      ) {
        const distKm = calcDistanciaKm(anteriores.latitude, anteriores.longitude, atual.latitude, atual.longitude);
        const estimativa = calcularTransporteEstimado(distKm);
        atividades.push({
          tipo: 'transporte',
          titulo: `Transporte até ${atual.titulo || 'próxima atividade'}`,
          meio: distKm <= 0.5 ? 'Caminhada' : distKm <= 1.0 ? 'Caminhada ou Carro' : 'Carro',
          distancia: distKm,
          tempoMin: estimativa.tempoMin,
          precoUber: estimativa.precoUber,
          destino: atual.regiao || atual.local,
          justificado: true,
        });
      }
      atividades.push(atividadeComRegiao);
      anteriores = atual;
    }

    const ultimaReal = [...bloco.atividades].reverse().find(a => a.latitude != null && a.longitude != null);
    if (
      ultimaReal?.latitude != null &&
      ultimaReal?.longitude != null &&
      regiao?.latitude != null &&
      regiao?.longitude != null
    ) {
      const distKm = calcDistanciaKm(ultimaReal.latitude, ultimaReal.longitude, regiao.latitude, regiao.longitude);
      const estimativa = calcularTransporteEstimado(distKm);
      atividades.push({
        tipo: 'transporte',
        titulo: `Retorno à região`,
        meio: distKm <= 0.5 ? 'Caminhada' : distKm <= 1.0 ? 'Caminhada ou Carro' : 'Carro',
        distancia: distKm,
        tempoMin: estimativa.tempoMin,
        precoUber: estimativa.precoUber,
        destino: regiao.nome,
        justificado: true,
      });
    }

    return { titulo: periodo.charAt(0).toUpperCase() + periodo.slice(1), periodo, atividades };
  }

  // Turnos conforme chegada
  if (turnoChave === 'manha' && blocosQuandoChegaDeManha) {
    await gerarTurnosAdicionais(blocosQuandoChegaDeManha, [
      { periodo: 'tarde', gerarRefeicaoFn: gerarRefeicaoAlmoco },
      { periodo: 'noite', gerarRefeicaoFn: gerarRefeicaoJantar },
    ]);
  }
  if (turnoChave === 'tarde' && blocosQuandoChegaDeTarde) {
    await gerarTurnosAdicionais(blocosQuandoChegaDeTarde, [
      { periodo: 'noite', gerarRefeicaoFn: gerarRefeicaoJantar },
    ]);
  }
    if (turnoChave === 'madrugada' && blocosQuandoChegaDeMadrugada) {
    await gerarTurnosAdicionais(blocosQuandoChegaDeMadrugada, [
      { periodo: 'manha', gerarRefeicaoFn: async () => [] },
      { periodo: 'tarde', gerarRefeicaoFn: gerarRefeicaoAlmoco },
      { periodo: 'noite', gerarRefeicaoFn: gerarRefeicaoJantar },
    ]);
  }

  return {
    numero,
    data,
    tipo: 'chegada',
    cabecalho,
    objetivo: 'Organize sua chegada e prepare-se bem para o começo da viagem!',
    turnos,
  };
}
