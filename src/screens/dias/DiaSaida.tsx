// src/screens/dias/DiaSaida.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dia } from '@/logic/types/dia';
import { AtividadeDia } from '@/logic/types/atividade';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { gerarDiaSaida } from '@/logic/geradores/gerarDiaSaida';

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
      <Text style={[styles.titulo, { fontWeight: 'bold', marginBottom: 2 }]}>
        {match[1]}
        <Text style={{ color: '#FFD700' }}>{match[2]}</Text>
        {match[3]}
      </Text>
    );
  }
  return (
    <Text style={[styles.titulo, { fontWeight: 'bold', marginBottom: 2 }]}>
      {titulo}
    </Text>
  );
}

function renderAtividadesComTransporteERefeicao(
  atividades: AtividadeDia[],
  turnoIndex: number,
  turnoPeriodo: string
) {
  const componentes: React.ReactNode[] = [];

  // helpers locais
  const semRotulo = (txt?: string) =>
    (txt ?? '')
      .replace(/^ *Acesso *: */i, '')
      .replace(/^ *Destaque *: */i, '')
      .trim();

  const removerPrecoDentro = (txt: string) =>
    txt.replace(/(?:^|\s)pre(ç|c)o\s*m[eé]dio\s*:\s*\$?\s*\d+[.,]?\d*\s*\.?/gi, '').trim();

  atividades.forEach((atividade, index) => {
    // ---------------------- TRANSPORTE
    if (atividade.tipo === 'transporte') {
      const isPrimeiroTransporte =
        index === 0 &&
        turnoPeriodo === 'manha' &&
        atividade.titulo?.toLowerCase().includes('café');

      componentes.push(
        <View
          key={`transporte-gerado-${turnoIndex}-${index}`}
          style={{ marginBottom: 10 }}
        >
          <CardTransporteAtracao
            meio={atividade.meio}
            distancia={
              atividade.distancia <= 0.5
                ? `${Math.round(atividade.distancia * 1000)} metros`
                : `${atividade.distancia.toFixed(2)} km`
            }
            tempoEstimado={`${Math.round(atividade.tempoMin)} minutos`}
            destino={atividade.destino}
            precoUber={
              atividade.meio === 'Carro' || atividade.meio === 'Caminhada ou Carro'
                ? `$${atividade.precoUber?.toFixed(2) ?? '---'}`
                : undefined
            }
            tipo="descanso"
            icone={
              atividade.meio === 'Caminhada'
                ? 'walk-outline'
                : atividade.meio === 'Caminhada ou Carro'
                ? 'walk-outline'
                : 'car-outline'
            }
            hideTicket={isPrimeiroTransporte ? true : undefined}
          />
        </View>
      );
      return;
    }

    // ---------------------- REFEIÇÃO (padrão: "Preço Médio: $ 12 - Econômico")
    if (atividade.tipo === 'refeicao') {
      // sufixo por período
      let sufixo = '';
      if (turnoPeriodo === 'manha') sufixo = 'Café da Manhã';
      else if (turnoPeriodo === 'tarde') sufixo = 'Almoço';
      else if (turnoPeriodo === 'noite') sufixo = 'Jantar';

      // título
      const tituloBase = (atividade.titulo || '').split(' – ')[0].trim();

      // tipo/perfil (evita "refeicao")
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

      // preço -> normaliza "$12" para "$ 12"
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

      // 1ª linha: "Preço Médio: $ 12 - Economico"
      let linhaMeta = '';
      if (precoSomente && tipo) linhaMeta = `Preço Médio: ${precoSomente} - ${tipo}`;
      else if (precoSomente) linhaMeta = `Preço Médio: ${precoSomente}`;
      else if (tipo) linhaMeta = tipo;

      // limpa e monta descrições
      const acesso = semRotulo(
        (atividade as any).acesso ?? (atividade as any).ondeFica ?? atividade.local
      );

      const destaqueRaw =
        (atividade as any).destaque ??
        (atividade as any).descricaoDestaque ??
        atividade.descricao ??
        '';

      const destaque = removerPrecoDentro(semRotulo(destaqueRaw));

      // Descrição final: linha meta (se houver) + quebra + destaque
      const descricaoComMeta =
        (linhaMeta ? `${linhaMeta}${destaque ? '\n' : ''}` : '') + (destaque || '');

      componentes.push(
        <CardRefeicao
          key={`refeicao-${turnoIndex}-${index}`}
          titulo={sufixo ? `${tituloBase} – ${sufixo}` : tituloBase}
          tipoRefeicao={sufixo}
          regiao={undefined}                 // não usamos "regiao" para evitar conflitos
          descricao={descricaoComMeta}       // 1ª linha: meta | 2ª: destaque
          local={acesso || ''}               // só o descritivo (ex.: "Dentro do Disney Springs")
        />
      );
      return;
    }

    // ---------------------- OUTROS
    if (atividade.tipo === 'compras') {
      componentes.push(
        <CardCompras
          key={`compras-${turnoIndex}-${index}`}
          titulo={atividade.titulo}
          descricao={atividade.descricao || ''}
          local={atividade.local || ''}
        />
      );
    } else if (atividade.tipo === 'descanso') {
      componentes.push(
        <CardDescanso
          key={`descanso-${turnoIndex}-${index}`}
          titulo={atividade.titulo}
          descricao={atividade.descricao || ''}
          local={atividade.local || ''}
        />
      );
    } else if (
      atividade.tipo === 'informativa' &&
      (atividade.titulo?.toLowerCase().includes('dica') ||
        atividade.titulo?.toLowerCase().includes('checklist'))
    ) {
      if (atividade.descricao) {
        componentes.push(
          <View style={[styles.cardDestaque, { marginBottom: 10 }]} key={`info-${turnoIndex}-${index}`}>
            {atividade.titulo && renderTituloComDoisPontos(atividade.titulo)}
            {atividade.descricao && (
              <HighlightLabelText style={styles.texto}>{atividade.descricao}</HighlightLabelText>
            )}
          </View>
        );
      }
    } else if (atividade.tipo === 'informativa') {
      if (atividade.descricao) {
        componentes.push(
          <View style={[styles.cardDestaque, { marginBottom: 10 }]} key={`destaque-${turnoIndex}-${index}`}>
            {atividade.titulo && renderTituloComDoisPontos(atividade.titulo)}
            {atividade.descricao && (
              <HighlightLabelText style={styles.texto}>{atividade.descricao}</HighlightLabelText>
            )}
          </View>
        );
      }
    } else {
      componentes.push(
        <View key={index} style={{ marginBottom: 10 }}>
          {atividade.titulo && renderTituloComDoisPontos(atividade.titulo)}
          {atividade.descricao && (
            <Text style={styles.texto}>{atividade.descricao}</Text>
          )}
        </View>
      );
    }
  });

  return componentes;
}

export const DiaSaida = ({ diaBruto }: Props) => {
  const { parkisheiroAtual } = useParkisheiro();
  const [dia, setDia] = useState<Dia | null>(null);

  useEffect(() => {
    async function gerar() {
      if (!diaBruto) {
        setDia(null);
        return;
      }
      const numero = parseInt(diaBruto.id.replace('dia', ''), 10);
      const diaGerado = await gerarDiaSaida(numero, parkisheiroAtual);
      setDia(diaGerado);
    }
    gerar();
  }, [diaBruto, parkisheiroAtual]);

  if (!dia) return <Text style={styles.texto}>Carregando...</Text>;

  const blocosNormais = dia.turnos.slice(0, -1);
  const blocoFinal = dia.turnos[dia.turnos.length - 1];

  const turnoVoo = (parkisheiroAtual?.vooSaida?.horario || '')
    .toLowerCase()
    .replace('manha', 'Manhã')
    .replace('tarde', 'Tarde')
    .replace('noite', 'Noite')
    .replace('madrugada', 'Madrugada')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  function renderCardTransporteOpcoes(bloco: any, key: string) {
    return (
      <View style={[styles.transporteContainer, { marginBottom: 10 }]} key={key}>
        <View style={styles.transporteHeader}>
          <Text style={styles.transporteIcon}>🚗</Text>
          <Text style={styles.transporteTitulo}>
            {bloco.titulo || 'Transporte até o aeroporto'}
          </Text>
        </View>
        {bloco.local && (
          <Text style={[styles.texto, styles.transporteLocal]}>
            {bloco.local}
          </Text>
        )}
        {Array.isArray(bloco.opcoes)
          ? bloco.opcoes.map((opcao: any, j: number) => (
              <View key={j} style={{ marginBottom: 10 }}>
                <Text style={styles.transporteSubtitulo}>{opcao.subtitulo}</Text>
                <Text style={[styles.texto, styles.transporteValor]}>
                  {opcao.descricao}
                </Text>
              </View>
            ))
          : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {blocosNormais.map((turno: any, i: number) => (
        <CardSecao
          key={`turno-${i}`}
          titulo={turno.titulo}
          subtitulo={turno.atividades[0]?.subtitulo || ''}
        >
          {renderAtividadesComTransporteERefeicao(
            turno.atividades,
            i,
            turno.periodo
          )}
        </CardSecao>
      ))}

      {blocoFinal && blocoFinal.atividades && blocoFinal.atividades.some((bloco: any) =>
        (bloco?.descricao && bloco.descricao.trim() !== '') ||
        (Array.isArray(bloco) && bloco.some((b: any) => b?.descricao && b.descricao.trim() !== '')) ||
        bloco.componente || bloco.opcoes
      ) && (
        <CardSecao
          titulo={turnoVoo || "Finalização"}
          tipo="descanso"
        >
          {blocoFinal.atividades.map((bloco: any, idx: number) => {
            if (bloco?.tipo === 'transporte' && bloco?.opcoes) {
              return renderCardTransporteOpcoes(bloco, `final-transporte-${idx}`);
            }
            if (bloco.componente) {
              const Componente = bloco.componente;
              return <Componente key={`final-comp-${idx}`} {...(bloco.props || {})} />;
            }
            if (
              (bloco?.descricao && bloco.descricao.trim() !== '') ||
              (Array.isArray(bloco) && bloco.some((b: any) => b?.descricao && b.descricao.trim() !== ''))
            ) {
              return (
                <View style={[styles.cardDestaque, { marginBottom: 10 }]} key={`final-roxo-${idx}`}>
                  {bloco.titulo && renderTituloComDoisPontos(bloco.titulo)}
                  {bloco.descricao && (
                    <HighlightLabelText style={styles.texto}>{bloco.descricao}</HighlightLabelText>
                  )}
                </View>
              );
            }
            return null;
          })}
        </CardSecao>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  cardDestaque: {
    backgroundColor: '#512DA8',
    borderRadius: 10,
    padding: 10,
  },
  transporteContainer: {
    backgroundColor: '#1976D2',
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

export default DiaSaida;
