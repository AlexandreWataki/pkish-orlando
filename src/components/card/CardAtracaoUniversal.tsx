// src/components/card/CardAtracaoUniversal.tsx
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AtividadeDia } from '@/logic/types/atividade';
import YoutubeInline from '@/logic/media/AtracaoVideo'; // âœ… caminho corrigido

type Props = { atracao: AtividadeDia };

export const CardAtracaoUniversal = ({ atracao }: Props) => {
  if (!atracao) return null;

  const {
    titulo,
    descricao,
    alturaMinima,
    tempoMedioFila,
    filaAceitavel,
    idadeRecomendada,
  } = atracao as any;

  // tenta achar um campo com a URL do vÃ­deo
  const videoUrl: string =
    (atracao as any).videoUrl ||
    (atracao as any).youtube ||
    (atracao as any).video ||
    (atracao as any).midia ||
    (atracao as any).urlVideo ||
    '';
  const hasVideo = typeof videoUrl === 'string' && videoUrl.length > 6;

  const [showVideo, setShowVideo] = useState(false);

  const atracaoImperdivel =
    typeof tempoMedioFila === 'number' && tempoMedioFila > 30;

  let idadeTexto = '';
  if (idadeRecomendada) {
    const m =
      typeof idadeRecomendada === 'string'
        ? idadeRecomendada.match(/\d+/)
        : null;
    idadeTexto = m?.[0]
      ? `ðŸ‘¶ Recomendado: a partir de ${m[0]} anos`
      : `ðŸ‘¶ Recomendado: ${idadeRecomendada}`;
  }

  const pulse = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (atracaoImperdivel) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 0.35, duration: 430, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 430, useNativeDriver: true }),
        ])
      ).start();
    }
    Animated.loop(
      Animated.timing(borderAnim, { toValue: 1, duration: 1000, useNativeDriver: false })
    ).start();
  }, [atracaoImperdivel]);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(0,255,255,1)', 'rgba(0,119,204,1)', 'rgba(0,255,255,1)'],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          borderWidth: 1.5,
          borderColor: animatedBorderColor as any,
          shadowColor: '#00ffff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        },
      ]}
    >
      {atracaoImperdivel && (
        <Animated.View style={[styles.uniIcon, { opacity: pulse }]}>
          <Ionicons name="planet-outline" size={16} color="#FFD700" />
        </Animated.View>
      )}

      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {titulo ?? 'Sem tÃ­tulo'}
        </Text>

        <View style={styles.actions}>
          {atracaoImperdivel && (
            <Animated.Text
              style={[styles.imperdivelInline, { opacity: pulse }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              âœ¨ AtraÃ§Ã£o ImperdÃ­vel âœ¨
            </Animated.Text>
          )}

          {hasVideo && (
            <TouchableOpacity
              onPress={() => setShowVideo(v => !v)}
              style={styles.youtubeBtn}
              activeOpacity={0.8}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={showVideo ? 'Fechar vÃ­deo' : 'Abrir vÃ­deo'}
            >
              <Ionicons
                name={showVideo ? 'close-circle' : 'logo-youtube'}
                size={18}
                color={showVideo ? '#FFFFFF' : '#FF3D3D'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {hasVideo && showVideo && (
        <View style={styles.videoWrap}>
          {/* ocupa ~92% da largura do card */}
          <YoutubeInline videoUrl={videoUrl} widthPct={0.92} />
        </View>
      )}

      <View style={styles.content}>
        {descricao ? <Text style={styles.texto}>{descricao}</Text> : null}

        {typeof alturaMinima === 'number' && alturaMinima > 0 && (
          <Text style={styles.info}>ðŸ“ Altura mÃ­nima: {alturaMinima} cm</Text>
        )}

        {(typeof tempoMedioFila === 'number' && tempoMedioFila > 0) ||
        (typeof filaAceitavel === 'number' && filaAceitavel > 0) ? (
          <View style={styles.filaLinha}>
            {typeof tempoMedioFila === 'number' && tempoMedioFila > 0 && (
              <Text style={styles.info}>â³ Fila mÃ©dia: {tempoMedioFila} min</Text>
            )}
            {typeof filaAceitavel === 'number' && filaAceitavel > 0 && (
              <Text style={styles.info}>âœ… AceitÃ¡vel: {filaAceitavel} min</Text>
            )}
          </View>
        ) : null}

        {idadeTexto ? <Text style={styles.info}>{idadeTexto}</Text> : null}

        {atracaoImperdivel && (
          <Animated.Text style={[styles.info, styles.usePass, { opacity: pulse }]} numberOfLines={1}>
            Use um Express Pass
          </Animated.Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4C0073',
    borderRadius: 10,
    marginBottom: 14,
    padding: 10,
    position: 'relative',
    overflow: 'visible',
  },
  uniIcon: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    zIndex: 10,
    backgroundColor: 'rgba(90, 20, 160, 0.9)',
    borderRadius: 10,
    padding: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexShrink: 1,
    textAlign: 'justify',
    lineHeight: 15,
    marginRight: 6,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  imperdivelInline: {
    color: '#FFD700',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: 140,
  },
  youtubeBtn: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  videoWrap: { marginBottom: 8, alignItems: 'center' },
  content: { gap: 3 },
  texto: { color: '#FFFFFF', fontSize: 10, textAlign: 'justify', lineHeight: 14 },
  info: { color: '#FFFFFF', fontSize: 10, marginRight: 6, textAlign: 'justify', lineHeight: 14 },
  usePass: { color: '#FFD700', fontWeight: 'bold', marginTop: 2 },
  filaLinha: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
});

export default CardAtracaoUniversal;
