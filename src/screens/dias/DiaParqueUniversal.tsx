ï»¿// src/screens/dias/DiaParqueUniversal.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Dia } from '@/logic/types/dia';
import { TurnoDia } from '@/logic/types/turno';
import { AtividadeDia } from '@/logic/types/atividade';

import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { gerarDiaParqueUniversal } from '@/logic/geradores/gerarDiaParqueUniversal';

import { CardSecao } from '@/components/card/CardSecao';
import { CardAtracaoUniversal } from '@/components/card/CardAtracaoUniversal';
import { CardRefeicao } from '@/components/card/CardRefeicao';
import { CardTransporteChegada } from '@/components/card/CardTransporteChegada';
import { CardTransporteVolta } from '@/components/card/CardTransporteVolta';
import { HighlightLabelText } from '@/components/card/HighlightLabelText';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';

export const DiaParqueUniversal = ({ diaBruto }: { diaBruto: Dia }) => {
  const { parkisheiroAtual, getLocalHospedagem } = useParkisheiro();
  const [dia, setDia] = useState<Dia | null>(null);
  const [cardTransporteChegada, setCardTransporteChegada] = useState<React.ReactNode>(null);
  const [cardTransporteVolta, setCardTransporteVolta] = useState<React.ReactNode>(null);

  const coordenadasParques: Record<string, { latitude: number; longitude: number }> = {
    'Universal Studios Florida': { latitude: 28.4721, longitude: -81.4689 },
    'Islands of Adventure': { latitude: 28.4727, longitude: -81.4688 },
    "Universal's Epic Universe": { latitude: 28.4729, longitude: -81.469 },
  };

  const mapaParques: Record<string, string> = {
    'universal studios florida': 'Universal Studios Florida',
    'usf': 'Universal Studios Florida',
    'universal studios': 'Universal Studios Florida',
    'islands of adventure': 'Islands of Adventure',
    'ioa': 'Islands of Adventure',
    'epic universe': "Universal's Epic Universe",
    'epic': "Universal's Epic Universe",
  };

  useEffect(() => {
    async function gerar() {
      if (!diaBruto || !parkisheiroAtual) {
        setDia(null);
        return;
      }

      const numero = parseInt(diaBruto.id.replace('dia', ''), 10);
      const diaGerado = await gerarDiaParqueUniversal(numero, parkisheiroAtual);
      setDia(diaGerado);

      const origem = getLocalHospedagem();

      const nomeParqueNormalizado = (diaBruto.nomeParque ?? 'Universal Studios Florida')
        .toLowerCase()
        .trim();
      const nomeParqueKey =
        mapaParques[nomeParqueNormalizado] ||
        diaBruto.nomeParque ||
        'Universal Studios Florida';
      const destino = coordenadasParques[nomeParqueKey];

      if (!origem?.latitude || !origem?.longitude || !destino) return;

      const distIda = calcDistanciaKm(
        origem.latitude,
        origem.longitude,
        destino.latitude,
        destino.longitude
      );
      const estimativaIda = calcularTransporteEstimado(distIda);

      setCardTransporteChegada(
        <CardTransporteChegada
          meio="Carro"
          distancia={`${distIda.toFixed(2)} km`}
          tempoEstimado={`${Math.round(estimativaIda.tempoMin)} minutos`}
          destino={nomeParqueKey}
          precoUber={`$${estimativaIda.precoUber?.toFixed(2) ?? '---'}`}
          tipo="chegada"
          icone="car-outline"
        />
      );

      const distVolta = calcDistanciaKm(
        destino.latitude,
        destino.longitude,
        origem.latitude,
        origem.longitude
      );
      const estimativaVolta = calcularTransporteEstimado(distVolta);

      setCardTransporteVolta(
        <CardTransporteVolta
          meio="Carro"
          distancia={`${distVolta.toFixed(2)} km`}
          tempoEstimado={`${Math.round(estimativaVolta.tempoMin)} minutos`}
          destino={origem.nome ?? 'Hospedagem'}
          precoUber={`$${estimativaVolta.precoUber?.toFixed(2) ?? '---'}`}
          tipo="saida"
          icone="car-outline"
        />
      );
    }

    gerar();
  }, [diaBruto, parkisheiroAtual]);

  if (!dia) return <Text style={styles.texto}>Carregando...</Text>;

  // ==== Helpers para padronizar REFEIÃƒâ€¡ÃƒÆ’O (igual ao Disney) ====
  const semRotulo = (txt?: string) =>
    (txt ?? '')
      .replace(/^ *Acesso *: */i, '')
      .replace(/^ *Destaque *: */i, '')
      .trim();

  const removerPrecoDentro = (txt: string) =>
    txt.replace(/(?:^|\s)pre(ÃƒÂ§|c)o\s*m[eÃƒÂ©]dio\s*:\s*\$?\s*\d+[.,]?\d*\s*\.?/gi, '').trim();

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
    const s = bruto.trim();
    return s.toLowerCase() === 'refeicao' ? undefined : s;
  };

  const extrairPreco = (a: any): string | undefined => {
    const bruto = a?.precoMedio ?? a?.preco ?? a?.precoEstimado;
    if (bruto === undefined || bruto === null || bruto === '') return undefined;
    if (typeof bruto === 'number') return `$ ${bruto}`; // espaÃƒÂ§o apÃƒÂ³s $
    return String(bruto).trim().replace(/^\$(\S)/, '$ $1'); // "$12" -> "$ 12"
  };

  const montarLinhaMeta = (preco?: string, tipo?: string): string =>
    preco && tipo ? `PreÃƒÂ§o MÃƒÂ©dio: ${preco} - ${tipo}` : preco ? `PreÃƒÂ§o MÃƒÂ©dio: ${preco}` : tipo ?? '';

  const getTipoCardInformativa = (tituloRaw?: string) => {
    const t = (tituloRaw || '').toLowerCase();

    const isShowNoite =
      t.includes('noite') ||
      t.includes('show') ||
      t.includes('fogos') ||
      t.includes('parade') ||
      t.includes('cinematic') ||
      t.includes('hogwarts') ||
      t.includes('hollywood boulevard');

    const isArea = t.startsWith('ÃƒÂ¡rea:') || t.startsWith('area:') || t === 'titulo-area';

    if (isShowNoite || isArea || t.includes('dicas do dia')) return 'noite'; // roxo
    if (t.includes('informaÃƒÂ§ÃƒÂµes importantes') || t.includes('importante')) return 'importante';
    return 'universal';
  };

  const wrapper = (key: React.Key, content: React.ReactNode) => (
    <View key={key} style={styles.cardWrapper}>{content}</View>
  );

  const renderAtividade = (atividade: AtividadeDia, index: number, periodo?: string) => {
    // ======= REFEIÃƒâ€¡ÃƒÆ’O (padrÃƒÂ£o unificado) =======
    if (['refeicao', 'cafe', 'almoco', 'jantar'].includes(atividade.tipo)) {
      // sufixo por tipo/perÃƒÂ­odo
      const tipoRefeicao =
        atividade.tipo === 'cafe'
          ? 'CafÃƒÂ© da ManhÃƒÂ£'
          : atividade.tipo === 'almoco'
          ? 'AlmoÃƒÂ§o'
          : atividade.tipo === 'jantar'
          ? 'Jantar'
          : periodo === 'manha'
          ? 'CafÃƒÂ© da ManhÃƒÂ£'
          : periodo === 'tarde'
          ? 'AlmoÃƒÂ§o'
          : periodo === 'noite'
          ? 'Jantar'
          : '';

      // tÃƒÂ­tulo sem sufixo duplicado + sufixo aplicado
      const tituloBase = (atividade.titulo || '').split(' Ã¢â‚¬â€œ ')[0].trim();
      const titulo = tipoRefeicao ? `${tituloBase} Ã¢â‚¬â€œ ${tipoRefeicao}` : tituloBase;

      // 1Ã‚Âª linha: "PreÃƒÂ§o MÃƒÂ©dio: $ 12 - EconÃƒÂ´mico" (se houver)
      const tipoPerfil = extrairTipoPerfil(atividade as any);
      const preco = extrairPreco(atividade as any);
      const linhaMeta = montarLinhaMeta(preco, tipoPerfil);

      // somente descritivos (sem rÃƒÂ³tulos) e sem "PreÃƒÂ§o mÃƒÂ©dio..." embutido
      const acesso = semRotulo(
        (atividade as any).acesso ?? (atividade as any).ondeFica ?? atividade.local
      );

      const destaqueRaw =
        (atividade as any).destaque ??
        (atividade as any).descricaoDestaque ??
        atividade.descricao ??
        '';

      const destaque = removerPrecoDentro(semRotulo(destaqueRaw));

      const descricaoComMeta =
        (linhaMeta ? `${linhaMeta}${destaque ? '\n' : ''}` : '') + (destaque || '');

      return wrapper(
        index,
        <CardRefeicao
          titulo={titulo}
          tipoRefeicao={tipoRefeicao}
          regiao={undefined}                 // evita subtÃƒÂ­tulo com regiÃƒÂ£o
          descricao={descricaoComMeta}       // 1Ã‚Âª linha meta | 2Ã‚Âª destaque
          local={acesso || ''}               // sÃƒÂ³ o descritivo
        />
      );
    }

    // ======= AtraÃƒÂ§ÃƒÂ£o =======
    if (atividade.tipo === 'atracao') {
      return wrapper(index, <CardAtracaoUniversal atracao={atividade} />);
    }

    // ======= ÃƒÂrea =======
    if (
      atividade.tipo === 'titulo-area' ||
      (atividade.titulo || '').toLowerCase().startsWith('ÃƒÂ¡rea:') ||
      (atividade.titulo || '').toLowerCase().startsWith('area:')
    ) {
      const tituloLimpo = (atividade.titulo || '').replace(/^ÃƒÂ¡rea:\s*|^area:\s*/i, '').trim();

      return wrapper(
        index,
        <CardSecao titulo={` ÃƒÂREA: ${tituloLimpo} `} icone="map-outline" tipo="noite">
          {!!atividade.descricao && <Text style={styles.texto}>{atividade.descricao}</Text>}
        </CardSecao>
      );
    }

    // ======= Informativa =======
    if (atividade.tipo === 'informativa') {
      const tipoCard = getTipoCardInformativa(atividade.titulo);
      return wrapper(
        index,
        <CardSecao titulo={atividade.titulo} icone="information-circle" tipo={tipoCard}>
          <HighlightLabelText style={styles.texto}>
            {atividade.descricao || ''}
          </HighlightLabelText>
        </CardSecao>
      );
    }

    // ======= Fallback =======
    return wrapper(
      index,
      <CardSecao titulo={atividade.titulo} icone="alert-circle-outline" tipo="universal">
        <Text style={styles.texto}>{atividade.descricao || ''}</Text>
      </CardSecao>
    );
  };

  return (
    <View style={styles.container}>
      {cardTransporteChegada && wrapper(
        'chegada',
        <CardSecao titulo="Transporte atÃƒÂ© o Parque" icone="car-outline" tipo="chegada">
          {cardTransporteChegada}
        </CardSecao>
      )}

      {Array.isArray(dia.turnos) &&
        dia.turnos.map((turno: TurnoDia, i: number) => {
          const periodo = turno.periodo || 'universal';
          const isNoite = periodo === 'noite';

          const atividadesFiltradas = Array.isArray(turno.atividades)
            ? turno.atividades.filter((a) => a.tipo !== 'transporte')
            : [];

          if (atividadesFiltradas.length === 0) return null;

          const tituloTurno = turno.titulo.includes('Tarde')
            ? 'Tarde'
            : turno.titulo.includes('Noite')
            ? 'Noite'
            : 'ManhÃƒÂ£';

          return wrapper(
            `turno-${i}`,
            <CardSecao
              titulo={tituloTurno}
              icone="time-outline"
              tipo={isNoite ? 'noite' : 'universal'}
            >
              {atividadesFiltradas.map((atividade, j) => renderAtividade(atividade, j, periodo))}
            </CardSecao>
          );
        })}

      {cardTransporteVolta && wrapper(
        'volta',
        <CardSecao titulo="Transporte de Volta" icone="car-outline" tipo="saida">
          {cardTransporteVolta}
        </CardSecao>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardWrapper: {
    marginBottom: 3,
  },
  texto: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'justify',
  },
});

export default DiaParqueUniversal;
