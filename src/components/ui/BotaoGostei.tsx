import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function BotaoGostei({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.emoji}>â¤ï¸</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#e0f2f1',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  emoji: {
    fontSize: 24,
  },
});
