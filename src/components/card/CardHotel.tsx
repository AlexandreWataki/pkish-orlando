import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Hotel {
  nome: string;
  descricao: string;
  tempoAteDisney?: number;
  tempoAteUniversal?: number;
  tempoAteAeroportoMCO?: number;
  tempoAteAeroportoMiami?: number;
}

interface Props {
  hotel: Hotel;
}

export function CardHotel({ hotel }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ðŸ¨ Hospedagem</Text>
      <Text style={styles.nome}>{hotel.nome}</Text>
      <Text style={styles.descricao}>{hotel.descricao}</Text>

      <View style={styles.tempos}>
        {hotel.tempoAteDisney != null && (
          <Text style={styles.tempo}>ðŸš— Disney: {hotel.tempoAteDisney} min</Text>
        )}
        {hotel.tempoAteUniversal != null && (
          <Text style={styles.tempo}>ðŸŽ¢ Universal: {hotel.tempoAteUniversal} min</Text>
        )}
        {hotel.tempoAteAeroportoMCO != null && (
          <Text style={styles.tempo}>âœˆï¸ MCO: {hotel.tempoAteAeroportoMCO} min</Text>
        )}
        {hotel.tempoAteAeroportoMiami != null && (
          <Text style={styles.tempo}>âœˆï¸ Miami: {hotel.tempoAteAeroportoMiami} min</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff80',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
  },
  descricao: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  tempos: {
    marginTop: 4,
  },
  tempo: {
    fontSize: 14,
    color: '#444',
  },
});
