import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  texto: string;
  onPress: () => void;
  icone?: string;
};

export default function BotaoMenu({ texto, onPress, icone = 'âž¡ï¸' }: Props) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{icone} {texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
