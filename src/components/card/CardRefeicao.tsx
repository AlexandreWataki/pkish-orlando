ï»¿import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

type Props = {
  titulo: string;
  tipoRefeicao?: string; // CafÃƒÂ© da ManhÃƒÂ£, AlmoÃƒÂ§o, Jantar
  tipo?: string;         // EconÃƒÂ´mico, ClÃƒÂ¡ssico, etc.
  precoMedio?: number | string;
  descricao?: string;    // mostra sem rÃƒÂ³tulo
  local?: string;        // mostra sem rÃƒÂ³tulo
};

export const CardRefeicao = ({ titulo, tipoRefeicao, tipo, precoMedio, descricao, local }: Props) => {
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(borderAnim, { toValue: 1, duration: 1000, useNativeDriver: false })
    ).start();
  }, []);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(0,255,255,1)', 'rgba(0,119,204,1)', 'rgba(0,255,255,1)'],
  });

  const tituloFormatado =
    tipoRefeicao && titulo.includes(tipoRefeicao)
      ? titulo
      : [titulo, tipoRefeicao].filter(Boolean).join(' Ã¢â‚¬â€œ ');

  const precoSomente =
    precoMedio === undefined || precoMedio === null || precoMedio === ''
      ? undefined
      : typeof precoMedio === 'number'
      ? `$${precoMedio}`
      : `${precoMedio}`.trim();

  // Linha ÃƒÂºnica: "PreÃƒÂ§o mÃƒÂ©dio: $12 - EconÃƒÂ´mico"
  const linhaMeta =
    precoSomente && tipo
      ? `PreÃƒÂ§o mÃƒÂ©dio: ${precoSomente} - ${tipo}`: precoSomente ? `PreÃƒÂ§o mÃƒÂ©dio: ${precoSomente}`
      : tipo
      ? `${tipo}`
      : '';

  return (
    <Animated.View
      style={[
        styles.card,
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
    >
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={2} ellipsizeMode="tail">
          {tituloFormatado}
        </Text>
      </View>

      {!!linhaMeta && <Text style={styles.meta}>{linhaMeta}</Text>}

      <View style={styles.content}>
        {!!descricao && <Text style={styles.texto}>{descricao}</Text>}
        {!!local && <Text style={styles.texto}>{local}</Text>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFD600',
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: 10,
    color: '#1A237E',
    lineHeight: 14,
    marginBottom: 4,
  },
  content: {
    gap: 2,
  },
  texto: {
    color: '#1A237E',
    fontSize: 10,
    textAlign: 'justify',
    lineHeight: 14,
    flexShrink: 1,
  },
});

export default CardRefeicao;
