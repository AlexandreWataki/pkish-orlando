import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  texto: string;
  onPress: () => void;
};

export default function BotaoPadrao({ texto, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  texto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});
