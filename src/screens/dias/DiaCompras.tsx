// src/screens/dias/DiaCompras.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dia } from '@/logic/types/dia';
import { AtividadeDia } from '@/logic/types/atividade';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { gerarDiaCompras } from '@/logic/geradores/gerarDiaCompras';

import { CardSecao } from '@/components/card/CardSecao';
import { CardListaSimples } from '@/components/card/CardListaSimples';
import { CardTransporteAtracao } from '@/components/card/CardTransporteAtracao';
import { CardRefeicao } from '@/components/card/CardRefeicao';
import { CardCompras } from '@/components/card/CardCompras';
import { CardDescanso } from '@/components/card/CardDescanso';
import { HighlightLabelText } from '@/components/card/HighlightLabelText';

const { calcDistanciaKm } = require('@/logic/types/calcDistanciaKm');
const { calcularTransporteEstimado } = require('@/logic/types/calcResumoTransporte');

export const DiaCompras = ({ diaBruto }: { diaBruto: { id: string; tipo: string } }) => {
  const { parkisheiroAtual } = useParkisheiro();
  const [dia, setDia] = useState<Dia | null>(null);

  useEffect(() => {
    async function gerar() {
      if (!diaBruto) {
        setDia(null);
        return;
      }
      const numero = parseInt(diaBruto.id.replace('dia', ''), 10);
      const diaGerado = await gerarDiaCompras(numero, parkisheiroAtual as any);
      setDia(diaGerado);
    }
    gerar();
  }, [diaBruto, parkisheiroAtual]);

  if (!dia) return <Text style={styles.texto}>Carregando...</Text>;

  // ===== Helpers para padronizar REFEIÃ‡ÃƒO =====
  const semRotulo = (txt?: string) =>
    (txt ?? '')
      .replace(/^ *Acesso *: */i, '')
      .replace(/^ *Destaque *: */i, '')
      .trim();

  const removerPrecoDentro = (txt: string) =>
    txt.replace(/(?:^|\s)pre(Ã§|c)o\s*m[eÃ©]dio\s*:\s*\$?\s*\d+[.,]?\d*\s*\.?/gi, '').trim();

  const extrairTipoPerfil = (a: any): string | undefined => {
    const bruto =
      a?.perfil ??
      a?.tipoPerfil ??
      a?.categoria ??
      a?.tipoCusto ??
      a?.estilo ??
      a?.tipoRefeicao ??
      a?.tipo ??
      undefined;
    if (typeof bruto !== 'string') return undefined;
    const s = String(bruto).trim();
    return s.toLowerCase() === 'refeicao' ? undefined : s;
  };

  const extrairPreco = (a: any): string | undefined => {
    const bruto = a?.precoMedio ?? a?.preco ?? a?.precoEstimado;
    if (bruto === undefined || bruto === null || bruto === '') return undefined;
    if (typeof bruto === 'number') return `$ ${bruto}`; // forÃ§a espaÃ§o apÃ³s $
    return String(bruto).trim().replace(/^\$(\S)/, '$ $1'); // normaliza "$12" -> "$ 12"
  };

  const montarLinhaMeta = (preco?: string, tipo?: string): string =>
    preco && tipo ? `PreÃ§o MÃ©dio: ${preco} - ${tipo}` : preco ? `PreÃ§o MÃ©dio: ${preco}` : tipo ?? '';

  const renderAtividade = (
    atividade: AtividadeDia,
    key: string | number,
    turnoPeriodo?: string
  ) => {
    const sufixoRefeicao =
      turnoPeriodo === 'manha'
        ? 'CafÃ© da ManhÃ£'
        : turnoPeriodo === 'tarde'
        ? 'AlmoÃ§o'
        : turnoPeriodo === 'noite'
        ? 'Jantar'
        : '';

    if (atividade.tipo === 'area') {
      const nomeArea = (atividade.area || atividade.titulo || '')
        .replace(/^Ã¡rea:\s*/i, '')
        .replace(/^regiÃ£o:\s*/i, '')
        .trim();

      return (
        <CardSecao
          key={key}
          titulo={`Ãrea: ${nomeArea}`}
          icone="map-outline"
          tipo="area"
        >
          <HighlightLabelText style={styles.texto}>
            {atividade.descricao || ''}
          </HighlightLabelText>
        </CardSecao>
      );
    }

    if (atividade.tipo === 'refeicao') {
      // tÃ­tulo com sufixo por perÃ­odo
      const tituloBase = (atividade.titulo || '').split(' â€“ ')[0].trim();
      const titulo = sufixoRefeicao ? `${tituloBase} â€“ ${sufixoRefeicao}` : tituloBase;

      // linha meta "PreÃ§o MÃ©dio: $ 12 - EconÃ´mico"
      const tipoPerfil = extrairTipoPerfil(atividade as any);
      const preco = extrairPreco(atividade as any);
      const linhaMeta = montarLinhaMeta(preco, tipoPerfil);

      // textos sÃ³ com descritivos (sem rÃ³tulos) e sem "PreÃ§o mÃ©dio..." embutido
      const acesso = semRotulo(
        (atividade as any).acesso ?? (atividade as any).ondeFica ?? atividade.local
      );

      const destaqueRaw =
        (atividade as any).destaque ??
        (atividade as any).descricaoDestaque ??
        atividade.descricao ??
        '';

      const destaque = removerPrecoDentro(semRotulo(destaqueRaw));

      // DescriÃ§Ã£o final: 1Âª linha meta + quebra + destaque
      const descricaoComMeta =
        (linhaMeta ? `${linhaMeta}${destaque ? '\n' : ''}` : '') + (destaque || '');

      return (
        <CardRefeicao
          key={key}
          titulo={titulo}
          tipoRefeicao={sufixoRefeicao}
          regiao={undefined}             // nÃ£o usa 'regiao' como subtÃ­tulo
          descricao={descricaoComMeta}   // 1Âª linha: meta | 2Âª: destaque
          local={acesso || ''}           // sÃ³ o descritivo (ex.: "Dentro do Walmart")
        />
      );
    }

    if (atividade.tipo === 'descanso') {
      return (
        <CardDescanso
          key={key}
          titulo={atividade.titulo}
          descricao={atividade.descricao || ''}
          local={atividade.local || ''}
        />
      );
    }

    if (atividade.tipo === 'compras') {
      return (
        <CardCompras
          key={key}
          titulo={atividade.titulo}
          descricao={atividade.descricao || ''}
          local={atividade.local || ''}
        />
      );
    }

    return (
      <CardSecao key={key} titulo={atividade.titulo}>
        <CardListaSimples
          itens={[atividade.descricao || '', atividade.local || ''].filter(Boolean)}
        />
      </CardSecao>
    );
  };

  const criarCardTransporte = (
    distNum: number,
    tempoMin: number,
    destino: string,
    precoUber?: number
  ) => {
    if (distNum <= 0.5) {
      return (
        <CardTransporteAtracao
          meio="Caminhada"
          distancia={`${Math.round(distNum * 1000)} metros`}
          tempoEstimado={`${Math.round(tempoMin)} minutos`}
          destino={destino}
          tipo="descanso"
          icone="walk-outline"
        />
      );
    } else if (distNum > 0.5 && distNum <= 1.0) {
      return (
        <CardTransporteAtracao
          meio="Caminhada ou Carro"
          icone="walk-outline"
          distancia={`${distNum.toFixed(2)} km`}
          tempoEstimado={`${Math.round(tempoMin)} minutos`}
          destino={destino}
          precoUber={`$${precoUber?.toFixed(2) ?? '---'}`}
          tipo="descanso"
        />
      );
    } else {
      return (
        <CardTransporteAtracao
          meio="Carro"
          icone="car-outline"
          distancia={`${distNum.toFixed(2)} km`}
          tempoEstimado={`${Math.round(tempoMin)} minutos`}
          destino={destino}
          precoUber={`$${precoUber?.toFixed(2) ?? '---'}`}
          tipo="descanso"
        />
      );
    }
  };

  // Usa a Ãºltima referÃªncia NÃƒO-AREA para calcular o transporte (garante Jantar -> 1Âª atividade da noite)
  const renderAtividadesComTransporte = (
    atividades: AtividadeDia[],
    turnoIndex: number,
    baseLatAnterior: number | null,
    baseLonAnterior: number | null,
    atualizarBase: (lat: number, lon: number) => void,
    turnoPeriodo: string
  ) => {
    const componentes: React.ReactNode[] = [];
    let refLat = baseLatAnterior;
    let refLon = baseLonAnterior;

    atividades.forEach((atividade, index) => {
      const lat = (atividade as any).latitude ?? null;
      const lon = (atividade as any).longitude ?? null;

      if (lat != null && lon != null) {
        const temRef = refLat != null && refLon != null;
        const mudou = temRef ? refLat !== lat || refLon !== lon : false;

        if (temRef && mudou) {
          try {
            const distNum = calcDistanciaKm(refLat!, refLon!, lat, lon);
            const estimativa = calcularTransporteEstimado(distNum);
            componentes.push(
              <React.Fragment key={`transporte-${turnoIndex}-${index}`}>
                {criarCardTransporte(
                  distNum,
                  estimativa.tempoMin ?? 0,
                  (atividade as any).regiao ?? 'Destino',
                  estimativa.precoUber
                )}
              </React.Fragment>
            );
          } catch {}
        }

        // atualiza a referÃªncia sÃ³ para itens reais (ignora 'area')
        if (atividade.tipo !== 'area') {
          refLat = lat;
          refLon = lon;
          atualizarBase(lat, lon);
        }
      }

      componentes.push(
        <React.Fragment key={`atividade-${turnoIndex}-${index}`}>
          {renderAtividade(atividade, `atividade-${turnoIndex}-${index}`, turnoPeriodo)}
        </React.Fragment>
      );
    });

    return { componentes, ultimaLat: refLat, ultimaLon: refLon };
  };

  let baseLatGlobal: number | null = parkisheiroAtual.regiaoHospedagem?.latitude ?? null;
  let baseLonGlobal: number | null = parkisheiroAtual.regiaoHospedagem?.longitude ?? null;
  const atualizarBaseGlobal = (lat: number, lon: number) => {
    baseLatGlobal = lat;
    baseLonGlobal = lon;
  };

  return (
    <View style={styles.container}>
      {Array.isArray(dia.turnos) &&
        dia.turnos.map((turno: any, i: number) => {
          const { componentes, ultimaLat, ultimaLon } = renderAtividadesComTransporte(
            turno.atividades,
            i,
            baseLatGlobal,
            baseLonGlobal,
            atualizarBaseGlobal,
            turno.periodo
          );

          // Apenas no ÃšLTIMO turno (noite): retorno Ã  regiÃ£o/hotel
          const cardRetornoRegiao =
            turno.periodo === 'noite' &&
            i === dia.turnos.length - 1 &&
            ultimaLat != null &&
            ultimaLon != null &&
            parkisheiroAtual.regiaoHospedagem?.latitude != null &&
            parkisheiroAtual.regiaoHospedagem?.longitude != null
              ? (() => {
                  const distNum = calcDistanciaKm(
                    ultimaLat,
                    ultimaLon,
                    parkisheiroAtual.regiaoHospedagem.latitude,
                    parkisheiroAtual.regiaoHospedagem.longitude
                  );
                  const estimativa = calcularTransporteEstimado(distNum);
                  const destinoNome =
                    parkisheiroAtual.regiaoHospedagem?.nome || 'RegiÃ£o de Hospedagem';
                  return criarCardTransporte(
                    distNum,
                    estimativa.tempoMin ?? 0,
                    destinoNome,
                    estimativa.precoUber
                  );
                })()
              : null;

          return (
            <CardSecao
              key={`turno-${i}`}
              titulo={turno.titulo}
              subtitulo={turno.atividades[0]?.subtitulo || ''}
            >
              {componentes}
              {cardRetornoRegiao}
            </CardSecao>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  texto: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'justify',
  },
});

export default DiaCompras;
