ï»¿import { Dia } from '@/logic/types/dia';
import { TurnoDia } from '@/logic/types/turno';
import { Parkisheiro } from '@/logic/types/parkisheiro';
import { aeroportoInfo } from '@/logic/blocos/aeroporto/aeroporto';
import dicasTurnoSaida from '@/logic/blocos/saida/dicasTurnoSaida';
import transporteSaida from '@/logic/blocos/saida/transporteSaida';
import blocoItensVooSaida from '@/logic/blocos/saida/blocoItensVooSaida';
import checklistSaida from '@/logic/blocos/saida/checklistSaida';
import { buscarClima } from '@/logic/clima/buscarclima';

import { blocosQuandoSaidaDeTarde } from '@/logic/blocos/saida/blocosQuandoSaidaDeTarde';
import { blocosQuandoSaidaDeNoite } from '@/logic/blocos/saida/blocosQuandoSaidaDeNoite';

import { gerarRefeicaoCafe } from '@/logic/blocos/ref/refeicaoCafe';
import { gerarRefeicaoAlmoco } from '@/logic/blocos/ref/refeicaoAlmoco';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';
import { Regiao } from '@/logic/types/regioesHospedagem';

// FunÃƒÂ§ÃƒÂ£o para remover todos os emojis de um texto
function removerEmojis(texto: string) {
  if (!texto) return '';
  return texto
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{1F700}-\u{1F77F}\u{1FA70}-\u{1FAFF}]/gu,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------- HELPERS para padronizar REF EIÃƒâ€¡ÃƒÆ’O ----------
const limparRotulo = (txt?: string) =>
  (txt ?? '')
    .replace(/^ *Acesso *: */i, '')
    .replace(/^ *Destaque *: */i, '')
    .trim();

// Remove "PreÃƒÂ§o mÃƒÂ©dio: $12" que porventura venha dentro do destaque/descriÃƒÂ§ÃƒÂ£o
const removerPrecoDentro = (txt: string) =>
  txt.replace(
    /(?:^|\s)pre(ÃƒÂ§|c)o\s*m[eÃƒÂ©]dio\s*:\s*\$?\s*\d+[.,]?\d*\s*\.?/gi,
    ''
  ).trim();

function extrairTipoPerfil(r: any): string | undefined {
  const bruto =
    r?.perfil ??
    r?.tipoPerfil ??
    r?.categoria ??
    r?.tipoCusto ??
    r?.estilo ??
    r?.tipoRefeicao ??
    r?.tipo ??
    undefined;

  if (typeof bruto !== 'string') return undefined;
  const s = bruto.trim();
  return s.toLowerCase() === 'refeicao' ? undefined : s;
}

function extrairPrecoFormatado(r: any): string | undefined {
  const bruto = r?.precoMedio ?? r?.preco ?? r?.precoEstimado;
  if (bruto === undefined || bruto === null || bruto === '') return undefined;
  if (typeof bruto === 'number') return `$ ${bruto}`;
  const s = String(bruto).trim();
  // normaliza "$12" -> "$ 12"
  return s.replace(/^\$(\S)/, '$ $1');
}

function montarLinhaMeta(preco?: string, tipo?: string): string {
  if (preco && tipo) return `PreÃƒÂ§o MÃƒÂ©dio: ${preco} - ${tipo}`;
  if (preco) return `PreÃƒÂ§o MÃƒÂ©dio: ${preco}`;
  return tipo ?? '';
}

/**
 * Padroniza um objeto de refeiÃƒÂ§ÃƒÂ£o para exibir:
 *  - 1Ã‚Âª linha: "PreÃƒÂ§o MÃƒÂ©dio: $ 12 - EconÃƒÂ´mico"
 *  - local: apenas descritivo de acesso
 *  - descricao: 1Ã‚Âª linha (meta) + quebra + destaque limpo (sem rÃƒÂ³tulos)
 *  - mantÃƒÂ©m demais campos do objeto original
 */
function prepararRefeicao(r: any): any {
  const tipo = extrairTipoPerfil(r);
  const preco = extrairPrecoFormatado(r);
  const linhaMeta = montarLinhaMeta(preco, tipo);

  const acesso = limparRotulo(r?.acesso ?? r?.ondeFica ?? r?.local ?? '');
  const destaqueRaw = r?.destaque ?? r?.descricaoDestaque ?? r?.descricao ?? '';
  const destaque = removerPrecoDentro(limparRotulo(destaqueRaw));

  const descricaoComMeta =
    (linhaMeta ? `${linhaMeta}${destaque ? '\n' : ''}` : '') + (destaque || '');

  return {
    ...r,
    tipo: 'refeicao',
    // Passamos a meta tambÃƒÂ©m no 'regiao' (se algum lugar usa como subtÃƒÂ­tulo)
    regiao: linhaMeta || undefined,
    local: acesso || '',
    descricao: descricaoComMeta,
    justificado: true,
  };
}

// --- LÃƒÂ³gica direta do card azul de transporte saÃƒÂ­da ---
function opcoesTransporteSaida(
  destinoNome: string,
  regiao?: Regiao
) {
  const nomeOrigem = regiao?.nome || 'Hospedagem nÃƒÂ£o definida';
  const tempoDestino =
    regiao?.tempoAteAeroportoMCO ?? 30;

  const latOrigem = regiao?.latitude ?? null;
  const lonOrigem = regiao?.longitude ?? null;

  const latMCO = 28.4312;
  const lonMCO = -81.3081;

  let distanciaKm = 25;
  if (latOrigem !== null && lonOrigem !== null) {
    distanciaKm = calcDistanciaKm(latOrigem, lonOrigem, latMCO, lonMCO);
  }

  const precoUberMin = Math.round(distanciaKm * 1.5 + 5);
  const precoUberMax = precoUberMin + 10;

  const descricaoUber = [
    `Tempo estimado: ${tempoDestino} min`,
    `Valor estimado: US$ ${precoUberMin} a US$ ${precoUberMax}`,
    `ServiÃƒÂ§o: Uber ou Lyft`,
  ].join('\n');

  const descricaoCarro = [
    `DistÃƒÂ¢ncia: ${distanciaKm.toFixed(1)} km`,
    `DiÃƒÂ¡rias mÃƒÂ©dias por categoria:`,
    ` EconÃƒÂ´mico / Compacto: US$ 40 a US$ 60`,
    ` SUV / IntermediÃƒÂ¡rio: US$ 60 a US$ 90`,
    ` Van / 7 lugares: US$ 80 a US$ 120`,
    ` Luxo / Premium: US$ 100 a US$ 200`,
  ].join('\n');

  return {
    titulo: 'Transporte atÃƒÂ© o aeroporto',
    tipo: 'transporte',
    local: `${removerEmojis(nomeOrigem)} Ã¢â€ â€™ ${removerEmojis(destinoNome)}`,
    opcoes: [
      {
        subtitulo: 'Uber / Lyft',
        descricao: descricaoUber,
      },
      {
        subtitulo: 'Carro alugado',
        descricao: descricaoCarro,
      },
    ],
  };
}

export async function gerarDiaSaida(
  numero: number,
  parkisheiro: Parkisheiro
): Promise<Dia> {
  const voo = parkisheiro.vooSaida;
  const regiao = parkisheiro.regiaoHospedagem;

  const dataFinal =
    parkisheiro.dataInicio instanceof Date && parkisheiro.totalDias
      ? new Date(
          parkisheiro.dataInicio.getTime() +
            (parkisheiro.totalDias - 1) * 86400000
        )
      : new Date();

  const turno: string = voo?.horario?.toLowerCase() || 'manha';
  const turnoChave = turno as 'manha' | 'tarde' | 'noite' | 'madrugada';

  // Clima
  const climaApi = await buscarClima();
  const clima = climaApi
    ? {
        temperatura: climaApi.temp,
        condicao: climaApi.condicao,
        icone: climaApi.icone,
      }
    : {
        temperatura: 28,
        condicao: 'Ensolarado',
        icone: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      };

  const cabecalho = {
    titulo: 'ÃƒÅ¡ltimo Dia Ã¢â‚¬â€œ Retorno ao Brasil',
    imagem: 'ingresso.jpg',
    clima,
  };

  const destinoNome = voo?.aeroporto || 'Orlando International Airport (MCO)';

  const cardAzulTransporte = {
    ...opcoesTransporteSaida(destinoNome, regiao),
    tipo: 'transporte',
    justificado: true,
  };

  const dica = dicasTurnoSaida[turnoChave];
  const blocoDicas = {
    tipo: 'informativa',
    titulo: dica?.titulo || 'Dicas de SaÃƒÂ­da',
    descricao:
      dica?.descricao ||
      'Organize sua saÃƒÂ­da com antecedÃƒÂªncia e atenÃƒÂ§ÃƒÂ£o aos horÃƒÂ¡rios.',
    justificado: true,
  };

  const blocoChecklist = {
    ...(typeof checklistSaida === 'function'
      ? checklistSaida(parkisheiro)
      : checklistSaida),
    justificado: true,
  };

  const blocoTransporteSaida = {
    ...(typeof transporteSaida === 'function'
      ? transporteSaida(parkisheiro)
      : transporteSaida),
    justificado: true,
  };

  const blocoItensVoo = {
    ...(typeof blocoItensVooSaida === 'function'
      ? blocoItensVooSaida(parkisheiro)
      : blocoItensVooSaida),
    justificado: true,
  };

  let turnos: TurnoDia[] = [];

  // TURNO MANHÃƒÆ’ (se tarde OU noite)
  if (turnoChave === 'tarde' || turnoChave === 'noite') {
    const blocoBase =
      turnoChave === 'tarde'
        ? blocosQuandoSaidaDeTarde
        : blocosQuandoSaidaDeNoite;
    if (Array.isArray(blocoBase)) {
      const blocoManha = blocoBase.find((b) => b.periodo === 'manha');
      if (blocoManha && blocoManha.atividades.length > 0) {
        const primeiraAtiv = blocoManha.atividades[0];

        const cafes = await gerarRefeicaoCafe(
          parkisheiro,
          primeiraAtiv?.regiao,
          primeiraAtiv?.latitude,
          primeiraAtiv?.longitude
        );
        const cafe = cafes && cafes[0];

        // Atividade "Preparativos & Despedida"
        const atividadePreparativos = {
          tipo: 'descanso',
          titulo: 'Preparativos & Despedida',
          descricao:
            'No ÃƒÂºltimo dia, organize sua bagagem, verifique documentos e reserve tempo para o check-out. Em seguida, curta uma manhÃƒÂ£ tranquila em Celebration, caminhando pelas ruas arborizadas, tirando fotos de despedida e tomando um cafÃƒÂ© leve em uma padaria local. NÃƒÂ£o deixe de visitar a loja de doces Kilwins para levar um chocolate como lembranÃƒÂ§a!',
          justificado: true,
        };

        let atividadesTurno: any[] = [atividadePreparativos];

        // 1. Transporte da regiÃƒÂ£o atÃƒÂ© o cafÃƒÂ© da manhÃƒÂ£
        if (
          regiao?.latitude != null &&
          regiao?.longitude != null &&
          cafe?.latitude != null &&
          cafe?.longitude != null
        ) {
          const distKm = calcDistanciaKm(
            regiao.latitude,
            regiao.longitude,
            cafe.latitude,
            cafe.longitude
          );
          const estimativa = calcularTransporteEstimado(distKm);
          atividadesTurno.push({
            tipo: 'transporte',
            titulo: 'Transporte atÃƒÂ© o CafÃƒÂ© da ManhÃƒÂ£',
            meio:
              distKm <= 0.5
                ? 'Caminhada'
                : distKm <= 1.0
                ? 'Caminhada ou Carro'
                : 'Carro',
            distancia: distKm,
            tempoMin: estimativa.tempoMin,
            precoUber: estimativa.precoUber,
            destino: removerEmojis(cafe.titulo || cafe.local),
            justificado: true,
          });
        }

        // 2. CafÃƒÂ© da manhÃƒÂ£ (padronizado)
        if (cafe) atividadesTurno.push(prepararRefeicao(cafe));

        // 3. Transporte do cafÃƒÂ© atÃƒÂ© a primeira atividade
        if (
          cafe?.latitude != null &&
          cafe?.longitude != null &&
          primeiraAtiv?.latitude != null &&
          primeiraAtiv?.longitude != null
        ) {
          const distKm = calcDistanciaKm(
            cafe.latitude,
            cafe.longitude,
            primeiraAtiv.latitude,
            primeiraAtiv.longitude
          );
          const estimativa = calcularTransporteEstimado(distKm);
          atividadesTurno.push({
            tipo: 'transporte',
            titulo: `Transporte atÃƒÂ© ${removerEmojis(primeiraAtiv.titulo)}`,
            meio:
              distKm <= 0.5
                ? 'Caminhada'
                : distKm <= 1.0
                ? 'Caminhada ou Carro'
                : 'Carro',
            distancia: distKm,
            tempoMin: estimativa.tempoMin,
            precoUber: estimativa.precoUber,
            destino: removerEmojis(primeiraAtiv.titulo),
            justificado: true,
          });
        }

        // 4. Primeira atividade
        if (primeiraAtiv)
          atividadesTurno.push({ ...primeiraAtiv, justificado: true });

        // Transporte entre as atividades
        let anterior = primeiraAtiv;
        for (let i = 1; i < blocoManha.atividades.length; i++) {
          const atual = blocoManha.atividades[i];
          if (
            anterior?.latitude != null &&
            anterior?.longitude != null &&
            atual?.latitude != null &&
            atual?.longitude != null
          ) {
            const distKm = calcDistanciaKm(
              anterior.latitude,
              anterior.longitude,
              atual.latitude,
              atual.longitude
            );
            const estimativa = calcularTransporteEstimado(distKm);
            atividadesTurno.push({
              tipo: 'transporte',
              titulo: `Transporte atÃƒÂ© ${removerEmojis(atual.titulo)}`,
              meio:
                distKm <= 0.5
                  ? 'Caminhada'
                  : distKm <= 1.0
                  ? 'Caminhada ou Carro'
                  : 'Carro',
              distancia: distKm,
              tempoMin: estimativa.tempoMin,
              precoUber: estimativa.precoUber,
              destino: removerEmojis(atual.titulo),
              justificado: true,
            });
          }
          atividadesTurno.push({ ...atual, justificado: true });
          anterior = atual;
        }

        // Transporte para o hotel/regiÃƒÂ£o apÃƒÂ³s ÃƒÂºltima atividade relevante da manhÃƒÂ£
        if (turnoChave === 'tarde' && blocoManha.atividades.length > 0) {
          const ultimaAtiv = [...blocoManha.atividades]
            .reverse()
            .find((a) =>
              ['compras', 'descanso', 'refeicao', 'atividade', 'atraÃƒÂ§ÃƒÂ£o'].includes(a.tipo)
            );
          if (
            ultimaAtiv?.latitude != null &&
            ultimaAtiv?.longitude != null &&
            regiao?.latitude != null &&
            regiao?.longitude != null
          ) {
            const distKm = calcDistanciaKm(
              ultimaAtiv.latitude,
              ultimaAtiv.longitude,
              regiao.latitude,
              regiao.longitude
            );
            const estimativa = calcularTransporteEstimado(distKm);
            atividadesTurno.push({
              tipo: 'transporte',
              titulo: `Transporte de volta ao hotel/regiÃƒÂ£o`,
              meio:
                distKm <= 0.5
                  ? 'Caminhada'
                  : distKm <= 1.0
                  ? 'Caminhada ou Carro'
                  : 'Carro',
              distancia: distKm,
              tempoMin: estimativa.tempoMin,
              precoUber: estimativa.precoUber,
              destino: removerEmojis(regiao.nome || 'Hotel/RegiÃƒÂ£o'),
              justificado: true,
            });
          }
        }

        turnos.push({
          titulo: 'ManhÃƒÂ£',
          periodo: 'manha',
          atividades: atividadesTurno,
        });
      }
    }
  }

  // TURNO TARDE (apenas se noite)
  if (turnoChave === 'noite') {
    if (Array.isArray(blocosQuandoSaidaDeNoite)) {
      const blocoTarde = blocosQuandoSaidaDeNoite.find(
        (b) => b.periodo === 'tarde'
      );
      if (blocoTarde && blocoTarde.atividades.length > 0) {
        const primeiraAtiv = blocoTarde.atividades[0];
        const almocoArr = await gerarRefeicaoAlmoco(
          parkisheiro,
          primeiraAtiv?.regiao,
          primeiraAtiv?.latitude,
          primeiraAtiv?.longitude
        );
        const almoco = almocoArr && almocoArr[0];
        let atividadesTarde: any[] = [];

        // Transporte da ÃƒÂºltima atividade da manhÃƒÂ£ atÃƒÂ© o almoÃƒÂ§o
        const manha = turnos.find((t) => t.periodo === 'manha');
        if (manha && manha.atividades.length > 0 && almoco && primeiraAtiv) {
          const ultimaAtivManha = manha.atividades
            .slice()
            .reverse()
            .find((a) => a.tipo !== 'transporte');
          if (
            (ultimaAtivManha as any)?.latitude != null &&
            (ultimaAtivManha as any)?.longitude != null &&
            almoco?.latitude != null &&
            almoco?.longitude != null
          ) {
            const distKm = calcDistanciaKm(
              (ultimaAtivManha as any).latitude,
              (ultimaAtivManha as any).longitude,
              almoco.latitude,
              almoco.longitude
            );
            const estimativa = calcularTransporteEstimado(distKm);
            atividadesTarde.push({
              tipo: 'transporte',
              titulo: `Transporte atÃƒÂ© o AlmoÃƒÂ§o`,
              meio:
                distKm <= 0.5
                  ? 'Caminhada'
                  : distKm <= 1.0
                  ? 'Caminhada ou Carro'
                  : 'Carro',
              distancia: distKm,
              tempoMin: estimativa.tempoMin,
              precoUber: estimativa.precoUber,
              destino: removerEmojis(almoco.titulo || almoco.local),
              justificado: true,
            });
          }
        }

        // AlmoÃƒÂ§o (padronizado)
        if (almoco) atividadesTarde.push(prepararRefeicao(almoco));

        // Transporte do almoÃƒÂ§o atÃƒÂ© a primeira atividade da tarde
        if (
          almoco?.latitude != null &&
          almoco?.longitude != null &&
          primeiraAtiv?.latitude != null &&
          primeiraAtiv?.longitude != null
        ) {
          const distKm = calcDistanciaKm(
            almoco.latitude,
            almoco.longitude,
            primeiraAtiv.latitude,
            primeiraAtiv.longitude
          );
          const estimativa = calcularTransporteEstimado(distKm);
          atividadesTarde.push({
            tipo: 'transporte',
            titulo: `Transporte atÃƒÂ© ${removerEmojis(primeiraAtiv.titulo)}`,
            meio:
              distKm <= 0.5
                ? 'Caminhada'
                : distKm <= 1.0
                ? 'Caminhada ou Carro'
                : 'Carro',
            distancia: distKm,
            tempoMin: estimativa.tempoMin,
            precoUber: estimativa.precoUber,
            destino: removerEmojis(primeiraAtiv.titulo),
            justificado: true,
          });
        }

        // Primeira atividade
        atividadesTarde.push({ ...primeiraAtiv, justificado: true });

        // Transporte entre as atividades da tarde
        let anterior = primeiraAtiv;
        for (let i = 1; i < blocoTarde.atividades.length; i++) {
          const atual = blocoTarde.atividades[i];
          if (
            anterior?.latitude != null &&
            anterior?.longitude != null &&
            atual?.latitude != null &&
            atual?.longitude != null
          ) {
            const distKm = calcDistanciaKm(
              anterior.latitude,
              anterior.longitude,
              atual.latitude,
              atual.longitude
            );
            const estimativa = calcularTransporteEstimado(distKm);
            atividadesTarde.push({
              tipo: 'transporte',
              titulo: `Transporte atÃƒÂ© ${removerEmojis(atual.titulo)}`,
              meio:
                distKm <= 0.5
                  ? 'Caminhada'
                  : distKm <= 1.0
                  ? 'Caminhada ou Carro'
                  : 'Carro',
              distancia: distKm,
              tempoMin: estimativa.tempoMin,
              precoUber: estimativa.precoUber,
              destino: removerEmojis(atual.titulo),
              justificado: true,
            });
          }
          atividadesTarde.push({ ...atual, justificado: true });
          anterior = atual;
        }

        // Transporte para a regiÃƒÂ£o/hotel apÃƒÂ³s a ÃƒÂºltima atividade relevante da tarde
        if (turnoChave === 'noite' && blocoTarde.atividades.length > 0) {
          const ultimaAtiv = [...blocoTarde.atividades]
            .reverse()
            .find((a) =>
              ['compras', 'descanso', 'refeicao', 'atividade', 'atraÃƒÂ§ÃƒÂ£o'].includes(a.tipo)
            );
          if (
            ultimaAtiv?.latitude != null &&
            ultimaAtiv?.longitude != null &&
            regiao?.latitude != null &&
            regiao?.longitude != null
          ) {
            const distKm = calcDistanciaKm(
              ultimaAtiv.latitude,
              ultimaAtiv.longitude,
              regiao.latitude,
              regiao.longitude
            );
            const estimativa = calcularTransporteEstimado(distKm);
            atividadesTarde.push({
              tipo: 'transporte',
              titulo: `Transporte de volta ÃƒÂ  regiÃƒÂ£o`,
              meio:
                distKm <= 0.5
                  ? 'Caminhada'
                  : distKm <= 1.0
                  ? 'Caminhada ou Carro'
                  : 'Carro',
              distancia: distKm,
              tempoMin: estimativa.tempoMin,
              precoUber: estimativa.precoUber,
              destino: removerEmojis(regiao.nome || 'RegiÃƒÂ£o'),
              justificado: true,
            });
          }
        }

        turnos.push({
          titulo: 'Tarde',
          periodo: 'tarde',
          atividades: atividadesTarde,
        });
      }
    }
  }

  // BLOCOS FINAIS
  const atividadesFinais = [
    blocoDicas,
    blocoChecklist,
    blocoTransporteSaida,
    cardAzulTransporte,
    blocoItensVoo,
  ]
    .map((card) => ({ ...card, justificado: true }))
    .filter(Boolean);

  turnos.push({
    titulo: '',
    atividades: atividadesFinais,
  });

  return {
    numero,
    data: dataFinal.toISOString().split('T')[0],
    tipo: 'saida',
    cabecalho,
    objetivo:
      aeroportoInfo[turnoChave] ||
      'Organize sua volta com calma, prepare documentos e logÃƒÂ­stica.',
    turnos,
  };
}
