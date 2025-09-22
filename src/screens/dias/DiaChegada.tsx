import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Dia } from '@/logic/types/dia';
import { AtividadeDia } from '@/logic/types/atividade';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { gerarDiaChegada } from '@/logic/geradores/gerarDiaChegada';

import { CardSecao } from '@/components/card/CardSecao';
import { HighlightLabelText } from '@/components/card/HighlightLabelText';
import { CardCompras } from '@/components/card/CardCompras';
import { CardDescanso } from '@/components/card/CardDescanso';
import { CardRefeicao } from '@/components/card/CardRefeicao';
import { CardTransporteAtracao } from '@/components/card/CardTransporteAtracao';

type Props = {
  diaBruto: { id: string; tipo: string };
};

function renderTituloComDoisPontos(titulo: string) {
  if (!titulo) return null;
  const match = titulo.match(/^(.*?)(:)(\s*)$/);
  if (match) {
    return (
      <Text style={[styles.titulo, { fontWeight: 'bold' }]}>
        {match[1]}
        <Text style={{ color: '#FFD700' }}>{match[2]}</Text>
        {match[3]}
      </Text>
    );
  }
  return <Text style={[styles.titulo, { fontWeight: 'bold' }]}>{titulo}</Text>;
}

export const DiaChegada = ({ diaBruto }: Props) => {
  const { parkisheiroAtual } = useParkisheiro();
  const [dia, setDia] = useState<Dia | null>(null);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(0,255,255,1)', 'rgba(0,119,204,1)', 'rgba(0,255,255,1)'],
  });

  useEffect(() => {
    async function gerar() {
      if (!diaBruto) {
        setDia(null);
        return;
      }
      const numero = parseInt(diaBruto.id.replace('dia', ''), 10);
      const diaGerado = await gerarDiaChegada(numero, parkisheiroAtual);
      setDia(diaGerado);
    }
    gerar();
  }, [diaBruto, parkisheiroAtual]);

  

  if (!dia) return <Text style={styles.texto}>Carregando...</Text>;

  function renderAtividadesComTransporte(
    atividades: AtividadeDia[],
    periodo: string,
    isUltimoTurno: boolean
  ) {
    const filtradas =
      periodo === 'noite' && isUltimoTurno
        ? atividades
        : atividades.filter(
            (a) =>
              !(a.tipo === 'transporte' && a.titulo?.toLowerCase().includes('retorno Ã  regiÃ£o'))
          );

return filtradas.map((atividade, idx) => {
  if (atividade.tipo === 'transporte') {
    if (atividade.opcoes) {
      return (
        <Animated.View
          style={[
            styles.transporteContainer,
            styles.cardWrapper,
            {
              borderWidth: 1.5,
              borderColor: animatedBorderColor,
              shadowColor: '#00ffff',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 6,
              elevation: 5,
            },
          ]}
          key={idx}
        >
          <View style={styles.transporteHeader}><Text style={styles.transporteIcon}>ðŸš—</Text>
            <Text style={styles.transporteTitulo}>{atividade.titulo}</Text>
          </View>
          {atividade.local && (
            <Text style={[styles.texto, styles.transporteLocal]}>{atividade.local}</Text>
          )}
          {atividade.opcoes?.length > 0 ? (
            atividade.opcoes.map((opcao: any, j: number) => (
              <View key={j} style={{ marginBottom: 5 }}>
                <Text style={styles.transporteSubtitulo}>{opcao.subtitulo}</Text>
                <Text style={[styles.texto, styles.transporteValor]}>{opcao.descricao}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.texto}>Nenhuma opÃ§Ã£o de transporte disponÃ­vel.</Text>
          )}
        </Animated.View>
      );
    } else {
      return (
        <View style={styles.cardWrapper} key={idx}>
          <CardTransporteAtracao
            meio={atividade.meio}
            distancia={
              atividade.distancia != null
                ? atividade.distancia <= 1
                  ? `${(atividade.distancia * 1000).toFixed(0)} metros`
                  : `${atividade.distancia.toFixed(2)} km`
                : '--'
            }
            tempoEstimado={
              atividade.tempoMin != null ? `${Math.round(atividade.tempoMin)} minutos` : '--'
            }
            destino={atividade.destino || 'Destino'}
            precoUber={
              atividade.precoUber != null ? `$${atividade.precoUber.toFixed(2)}` : undefined
            }
            tipo="descanso"
            icone={
              atividade.meio === 'Carro'
                ? 'car-outline'
                : atividade.meio === 'Caminhada'
                ? 'walk-outline'
                : 'walk-outline'
            }
          />
        </View>
      );
    }
  }



// -------- REFEIÃ‡ÃƒO: 1Âª linha "PreÃ§o MÃ©dio: $ 12 - Economico"; sem rÃ³tulos nos textos
if (atividade.tipo === 'refeicao') {
  let sufixo = '';
  if (periodo === 'manha') sufixo = 'CafÃ© da ManhÃ£';
  else if (periodo === 'tarde') sufixo = 'AlmoÃ§o';
  else if (periodo === 'noite') sufixo = 'Jantar';

  const tituloBase = (atividade.titulo || '').split(' â€“ ')[0].trim();

  // Tipo/perfil (evita mostrar "refeicao")
  const brutoTipo =
    (atividade as any).perfil ??
    (atividade as any).tipoPerfil ??
    (atividade as any).categoria ??
    (atividade as any).tipoCusto ??
    (atividade as any).estilo ??
    (atividade as any).tipoRefeicao ??
    (atividade as any).tipo ??
    undefined;

  const tipo =
    typeof brutoTipo === 'string' && brutoTipo.toLowerCase() !== 'refeicao'
      ? String(brutoTipo).trim()
      : undefined;

  // PreÃ§o -> normaliza "$12" para "$ 12"
  const precoBruto =
    (atividade as any).precoMedio ??
    (atividade as any).preco ??
    (atividade as any).precoEstimado;

  let precoSomente: string | undefined;
  if (precoBruto !== undefined && precoBruto !== null && precoBruto !== '') {
    if (typeof precoBruto === 'number') {
      precoSomente = `$ ${precoBruto}`;
    } else {
      const s = String(precoBruto).trim();
      precoSomente = s.replace(/^\$(\S)/, '$ $1');
    }
  }

  // 1Âª linha: "PreÃ§o MÃ©dio: $ 12 - Economico"
  let linhaMeta = '';
  if (precoSomente && tipo) linhaMeta = `PreÃ§o MÃ©dio: ${precoSomente} - ${tipo}`;
  else if (precoSomente) linhaMeta = `PreÃ§o MÃ©dio: ${precoSomente}`;
  else if (tipo) linhaMeta = tipo;

  // Limpa rÃ³tulos e remove qualquer "PreÃ§o mÃ©dio: ..." do destaque
  const semRotulo = (txt?: string) =>
    (txt ?? '')
      .replace(/^ *Acesso *: */i, '')
      .replace(/^ *Destaque *: */i, '')
      .trim();

  const removerPrecoDentro = (txt: string) =>
    txt.replace(/(?:^|\s)pre(Ã§|c)o\s*m[eÃ©]dio\s*:\s*\$?\s*\d+[.,]?\d*\s*\.?/gi, '').trim();

  const acesso = semRotulo(
    (atividade as any).acesso ?? (atividade as any).ondeFica ?? atividade.local
  );

  const destaqueRaw =
    (atividade as any).destaque ??
    (atividade as any).descricaoDestaque ??
    atividade.descricao ??
    '';

  const destaque = removerPrecoDentro(semRotulo(destaqueRaw));

  // DescriÃ§Ã£o = linha meta (se houver) + quebra de linha + destaque limpo
  const descricaoComMeta =
    (linhaMeta ? `${linhaMeta}${destaque ? '\n' : ''}` : '') + (destaque || '');

  return (
    <View style={styles.cardWrapper} key={`refeicao-${idx}`}>
      <CardRefeicao
        titulo={sufixo ? `${tituloBase} â€“ ${sufixo}` : tituloBase}
        tipoRefeicao={sufixo}
        regiao={undefined}                 // evitamos depender de "regiao"
        descricao={descricaoComMeta}       // 1Âª linha: meta | 2Âª: destaque
        local={acesso || ''}               // sÃ³ o descritivo (ex.: "Dentro do Disney Springs")
      />
    </View>
  );
}

//



      if (atividade.tipo === 'compras') {
        return (
          <View style={styles.cardWrapper} key={`compras-${idx}`}>
            <CardCompras
              titulo={atividade.titulo}
              descricao={atividade.descricao || ''}
              local={atividade.local || ''}
            />
          </View>
        );
      }

      if (atividade.tipo === 'descanso') {
        return (
          <View style={styles.cardWrapper} key={`descanso-${idx}`}>
            <CardDescanso
              titulo={atividade.titulo}
              descricao={atividade.descricao || ''}
              local={atividade.local || ''}
            />
          </View>
        );
      }

      if (atividade.tipo === 'informativa') {
        return (
          <Animated.View
            style={[
              styles.cardDestaque,
              styles.cardWrapper,
              {
                borderWidth: 1.5,
                borderColor: animatedBorderColor,
                shadowColor: '#00ffff',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
                elevation: 5,
              },
            ]}
            key={`info-${idx}`}
          >
            {atividade.titulo && renderTituloComDoisPontos(atividade.titulo)}
            {atividade.descricao && (
              <HighlightLabelText style={styles.texto}>{atividade.descricao}</HighlightLabelText>
            )}
          </Animated.View>
        );
      }

      return (
        <View key={idx} style={styles.cardWrapper}>
          {atividade.titulo && renderTituloComDoisPontos(atividade.titulo)}
          {atividade.descricao && <Text style={styles.texto}>{atividade.descricao}</Text>}
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      {dia.turnos.map((turno: any, i: number) => (
        <View key={`turno-${i}`} style={styles.turnoWrapper}>
          <CardSecao
  titulo={turno.titulo}
  subtitulo={turno.atividades[0]?.subtitulo || ''}
>

            {renderAtividadesComTransporte(
              turno.atividades,
              turno.periodo,
              turno.periodo === 'noite' && i === dia.turnos.length - 1
            )}
          </CardSecao>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  turnoWrapper: {
    marginBottom: 10,
  },
  titulo: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'justify',
    lineHeight: 14,
  },
  texto: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'justify',
  },
  cardWrapper: {
    marginBottom: 10,
  },
  cardDestaque: {
    backgroundColor: '#512DA8',
    borderColor: '#FFD700',
    borderRadius: 10,
    padding: 10,
  },
  transporteContainer: {
    backgroundColor: '#1976D2',
    borderColor: '#FFD700',
    borderRadius: 10,
    padding: 10,
  },
  transporteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  transporteIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  transporteTitulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    flex: 1,
    textAlign: 'justify',
  },
  transporteLocal: {
    fontStyle: 'italic',
    marginBottom: 3,
    fontSize: 10,
    textAlign: 'justify',
  },
  transporteSubtitulo: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    fontSize: 10,
    textAlign: 'justify',
  },
  transporteValor: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'justify',
    color: '#fff',
  },
});

export default DiaChegada;
