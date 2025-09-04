import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export const CardBlocoChegada = ({ children }: Props) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,119,200,0.95)', // Azul escuro translúcido
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 4,
    borderColor: '#FFD700', // Borda amarela ouro
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default CardBlocoChegada;
