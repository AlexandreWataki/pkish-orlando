// src/screens/dias/DiaParqueUniversal.tsx
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

  // ==== Helpers para padronizar REFEIÇÃO (igual ao Disney) ====
  const semRotulo = (txt?: string) =>
    (txt ?? '')
      .replace(/^ *Acesso *: */i, '')
      .replace(/^ *Destaque *: */i, '')
      .trim();

  const removerPrecoDentro = (txt: string) =>
    txt.replace(/(?:^|\s)pre(ç|c)o\s*m[eé]dio\s*:\s*\$?\s*\d+[.,]?\d*\s*\.?/gi, '').trim();

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
    if (typeof bruto === 'number') return `$ ${bruto}`; // espaço após $
    return String(bruto).trim().replace(/^\$(\S)/, '$ $1'); // "$12" -> "$ 12"
  };

  const montarLinhaMeta = (preco?: string, tipo?: string): string =>
    preco && tipo ? `Preço Médio: ${preco} - ${tipo}` : preco ? `Preço Médio: ${preco}` : tipo ?? '';

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

    const isArea = t.startsWith('área:') || t.startsWith('area:') || t === 'titulo-area';

    if (isShowNoite || isArea || t.includes('dicas do dia')) return 'noite'; // roxo
    if (t.includes('informações importantes') || t.includes('importante')) return 'importante';
    return 'universal';
  };

  const wrapper = (key: React.Key, content: React.ReactNode) => (
    <View key={key} style={styles.cardWrapper}>{content}</View>
  );

  const renderAtividade = (atividade: AtividadeDia, index: number, periodo?: string) => {
    // ======= REFEIÇÃO (padrão unificado) =======
    if (['refeicao', 'cafe', 'almoco', 'jantar'].includes(atividade.tipo)) {
      // sufixo por tipo/período
      const tipoRefeicao =
        atividade.tipo === 'cafe'
          ? 'Café da Manhã'
          : atividade.tipo === 'almoco'
          ? 'Almoço'
          : atividade.tipo === 'jantar'
          ? 'Jantar'
          : periodo === 'manha'
          ? 'Café da Manhã'
          : periodo === 'tarde'
          ? 'Almoço'
          : periodo === 'noite'
          ? 'Jantar'
          : '';

      // título sem sufixo duplicado + sufixo aplicado
      const tituloBase = (atividade.titulo || '').split(' – ')[0].trim();
      const titulo = tipoRefeicao ? `${tituloBase} – ${tipoRefeicao}` : tituloBase;

      // 1ª linha: "Preço Médio: $ 12 - Econômico" (se houver)
      const tipoPerfil = extrairTipoPerfil(atividade as any);
      const preco = extrairPreco(atividade as any);
      const linhaMeta = montarLinhaMeta(preco, tipoPerfil);

      // somente descritivos (sem rótulos) e sem "Preço médio..." embutido
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
          regiao={undefined}                 // evita subtítulo com região
          descricao={descricaoComMeta}       // 1ª linha meta | 2ª destaque
          local={acesso || ''}               // só o descritivo
        />
      );
    }

    // ======= Atração =======
    if (atividade.tipo === 'atracao') {
      return wrapper(index, <CardAtracaoUniversal atracao={atividade} />);
    }

    // ======= Área =======
    if (
      atividade.tipo === 'titulo-area' ||
      (atividade.titulo || '').toLowerCase().startsWith('área:') ||
      (atividade.titulo || '').toLowerCase().startsWith('area:')
    ) {
      const tituloLimpo = (atividade.titulo || '').replace(/^área:\s*|^area:\s*/i, '').trim();

      return wrapper(
        index,
        <CardSecao titulo={` ÁREA: ${tituloLimpo} `} icone="map-outline" tipo="noite">
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
        <CardSecao titulo="Transporte até o Parque" icone="car-outline" tipo="chegada">
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
            : 'Manhã';

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
