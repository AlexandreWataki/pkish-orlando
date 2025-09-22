ï»¿import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  texto: string;
  selecionado?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

const CardDiaBotao = ({ texto, selecionado = false, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.botao,
        selecionado && styles.botaoSelecionado,
        style,
      ]}
    >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    backgroundColor: 'rgba(0, 51, 102, 0.5)', // azul escuro translÃƒÂºcido
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#FFD700',
    marginRight: 8,
  },
  botaoSelecionado: {
    borderColor: '#FFFF33',
    borderWidth: 3,
  },
  texto: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CardDiaBotao;
