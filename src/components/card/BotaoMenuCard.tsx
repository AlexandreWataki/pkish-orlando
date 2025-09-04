import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Platform, Dimensions } from 'react-native';

type Props = {
  titulo: string;
  emoji?: string;
  subtitulo?: string;
  corFundo?: string;
  corBorda?: string;
  corTexto?: string;
  onPress: () => void;
};

const BotaoMenuCard = ({
  titulo,
  emoji = '✨',
  subtitulo,
  corFundo = 'rgba(0, 119, 200, 0.9)',
  corBorda = '#FFD700',
  corTexto = '#fff',
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { backgroundColor: corFundo, borderColor: corBorda }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.titulo, { color: corTexto }]} numberOfLines={2} adjustsFontSizeToFit>
          {emoji} {titulo}
        </Text>
        {subtitulo ? (
          <Text style={[styles.subtitulo, { color: corTexto }]}>
            {subtitulo}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: '5%',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titulo: {
    fontSize: width < 380 ? 14 : 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1,
  },
  subtitulo: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
});

export default BotaoMenuCard;
