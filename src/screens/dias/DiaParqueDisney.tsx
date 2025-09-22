// src/screens/dias/DiaParqueDisney.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Dia } from '@/logic/types/dia';
import { TurnoDia } from '@/logic/types/turno';
import { AtividadeDia } from '@/logic/types/atividade';

import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { gerarDiaParqueDisney } from '@/logic/geradores/gerarDiaParqueDisney';

import { CardSecao } from '@/components/card/CardSecao';
import { CardListaSimples } from '@/components/card/CardListaSimples';
import { CardAtracao } from '@/components/card/CardAtracao';
import { CardRefeicao } from '@/components/card/CardRefeicao';
import { CardTransporteChegada } from '@/components/card/CardTransporteChegada';
import { CardTransporteVolta } from '@/components/card/CardTransporteVolta';
import { HighlightLabelText } from '@/components/card/HighlightLabelText';

import { calcDistanciaKm } from '@/logic/types/calcDistanciaKm';
import { calcularTransporteEstimado } from '@/logic/types/calcResumoTransporte';

export const DiaParqueDisney = ({ diaBruto }: {diaBruto: Dia }) => {
  const { parkisheiroAtual, getLocalHospedagem } = useParkisheiro();
  const [dia, setDia] = useState<Dia | null>(null);
  const [cardTransporteChegada, setCardTransporteChegada] = useState<React.ReactNode>(null);
  const [cardTransporteVolta, setCardTransporteVolta] = useState<React.ReactNode>(null);

  const coordenadasParques: Record<string, { latitude: number; longitude: number }> = {
    'Magic Kingdom': { latitude: 28.4177, longitude: -81.5812 },
    'EPCOT': { latitude: 28.3747, longitude: -81.5494 },
    'Hollywood Studios': { latitude: 28.3575, longitude: -81.5586 },
    'Animal Kingdom': { latitude: 28.359, longitude: -81.5913 },
  };

  const mapaParques: Record<string, string> = {
    'magic kingdom': 'Magic Kingdom',
    'epcot': 'EPCOT',
    'hollywood studios': 'Hollywood Studios',
    'animal kingdom': 'Animal Kingdom',
  };

  useEffect(() => {
    async function gerar() {
      if (!diaBruto || !parkisheiroAtual) {
        setDia(null);
        return;
      }

      const numero = parseInt(diaBruto.id.replace('dia', ''), 10);
      const diaGerado = await gerarDiaParqueDisney(numero, parkisheiroAtual);
      setDia(diaGerado);

      const origem = getLocalHospedagem();

      const nomeParqueNormalizado = (diaBruto.nomeParque ?? 'Magic Kingdom').toLowerCase().trim();
      const nomeParqueKey = mapaParques[nomeParqueNormalizado] || diaBruto.nomeParque || 'Magic Kingdom';
      const destino = coordenadasParques[nomeParqueKey];

      if (!origem?.latitude || !origem?.longitude || !destino) return;

      const distIda = calcDistanciaKm(origem.latitude, origem.longitude, destino.latitude, destino.longitude);
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

      const distVolta = calcDistanciaKm(destino.latitude, destino.longitude, origem.latitude, origem.longitude);
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

  // Helpers para REF EIÃ‡ÃƒO
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
    const s = bruto.trim();
    return s.toLowerCase() === 'refeicao' ? undefined : s;
  };

  const extrairPreco = (a: any): string | undefined => {
    const bruto = a?.precoMedio ?? a?.preco ?? a?.precoEstimado;
    if (bruto === undefined || bruto === null || bruto === '') return undefined;
    if (typeof bruto === 'number') return `$ ${bruto}`; // espaÃ§o apÃ³s $
    return String(bruto).trim().replace(/^\$(\S)/, '$ $1'); // normaliza "$12" -> "$ 12"
  };

  const montarLinhaMeta = (preco?: string, tipo?: string): string =>
    preco && tipo ? `PreÃ§o MÃ©dio: ${preco} - ${tipo}` : preco ? `PreÃ§o MÃ©dio: ${preco}` : tipo ?? '';

  const renderAtividade = (atividade: AtividadeDia, index: number, periodo?: string) => {
    const wrapper = (content: React.ReactNode) => (
      <View key={index} style={styles.cardWrapper}>{content}</View>
    );

    
    if (['refeicao', 'cafe', 'almoco', 'jantar'].includes(atividade.tipo)) {
      // sufixo (de acordo com tipo/periodo)
      let tipoRefeicao =
        atividade.tipo === 'cafe'
          ? 'CafÃ© da ManhÃ£'
          : atividade.tipo === 'almoco'
          ? 'AlmoÃ§o'
          : atividade.tipo === 'jantar'
          ? 'Jantar'
          : periodo === 'manha'
          ? 'CafÃ© da ManhÃ£'
          : periodo === 'tarde'
          ? 'AlmoÃ§o'
          : periodo === 'noite'
          ? 'Jantar'
          : '';

      // tÃ­tulo (remove sufixo antigo e reaplica)
      const tituloBase = (atividade.titulo || '').split(' â€“ ')[0].trim();
      const titulo = tipoRefeicao ? `${tituloBase} â€“ ${tipoRefeicao}` : tituloBase;

      // linha meta "PreÃ§o MÃ©dio: $ 12 - EconÃ´mico"
      const tipoPerfil = extrairTipoPerfil(atividade as any);
      const preco = extrairPreco(atividade as any);
      const linhaMeta = montarLinhaMeta(preco, tipoPerfil);

      // textos: sÃ³ descritivos (sem rÃ³tulos) e sem "PreÃ§o mÃ©dio" embutido
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
        <CardRefeicao
          titulo={titulo}
          tipoRefeicao={tipoRefeicao}
          regiao={undefined}                 // evitamos depender de 'regiao'
          descricao={descricaoComMeta}       // 1Âª linha: meta | 2Âª: destaque
          local={acesso || ''}               // sÃ³ o descritivo (ex.: "Dentro do Disney Springs")
        />
      );
    }

    if (atividade.tipo === 'atracao') {
      return wrapper(<CardAtracao atracao={atividade} />);
    }

    if (atividade.tipo === 'informativa') {
      const titulo = atividade.titulo?.toLowerCase() || '';

      // forÃ§a roxo para dicas do dia e Ã¡reas
      const tipoCard =
        titulo.includes('dicas') || titulo.startsWith('Ã¡rea:')
          ? 'noite'
          : titulo.includes('informaÃ§Ãµes importantes')
          ? 'importante'
          : titulo.includes('noite') || titulo.includes('show') || titulo.includes('fogos')
          ? 'noite'
          : 'disney';

      return wrapper(
        <CardSecao titulo={atividade.titulo} icone="information-circle" tipo={tipoCard}>
          <HighlightLabelText style={styles.texto}>
            {atividade.descricao || ''}
          </HighlightLabelText>
        </CardSecao>
      );
    }

    return wrapper(
      <CardSecao titulo={atividade.titulo} icone="alert-circle-outline" tipo="disney">
        <Text style={styles.texto}>{atividade.descricao || ''}</Text>
      </CardSecao>
    );
  };

  return (
    <View style={styles.container}>
      {cardTransporteChegada && (
        <View style={styles.cardWrapper}>
          <CardSecao titulo="Transporte atÃ© o Parque" icone="car-outline" tipo="chegada">
            {cardTransporteChegada}
          </CardSecao>
        </View>
      )}

      {Array.isArray(dia.turnos) &&
        dia.turnos.map((turno: TurnoDia, i: number) => {
          const periodo = turno.periodo || 'disney';
          const isNoite = periodo === 'noite';

          const atividadesFiltradas = Array.isArray(turno.atividades)
            ? turno.atividades.filter((a) => a.tipo !== 'transporte')
            : [];

          if (atividadesFiltradas.length === 0) return null;

          const tituloTurno = turno.titulo.includes('Tarde')
            ? 'Tarde'
            : turno.titulo.includes('Noite')
            ? 'Noite'
            : 'ManhÃ£';

          return (
            <View key={`turno-${i}`} style={styles.cardWrapper}>
              <CardSecao
                titulo={tituloTurno}
                icone="time-outline"
                tipo={isNoite ? 'noite' : 'disney'}
              >
                {atividadesFiltradas.map((atividade, j) =>
                  renderAtividade(atividade, j, periodo)
                )}
              </CardSecao>
            </View>
          );
        })}

      {cardTransporteVolta && (
        <View style={styles.cardWrapper}>
          <CardSecao titulo="Transporte de Volta" icone="car-outline" tipo="saida">
            {cardTransporteVolta}
          </CardSecao>
        </View>
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

export default DiaParqueDisney;
