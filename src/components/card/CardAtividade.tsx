import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Atividade {
  titulo: string;
  descricao?: string;
  tipo?: string;
  local?: string;
  selecionavel?: boolean;
  escolhida?: boolean;
}

interface Props {
  atividade: Atividade;
  onEscolher?: () => void;
}

const CardAtividade: React.FC<Props> = ({ atividade, onEscolher }) => {
  const Container = atividade.selecionavel ? TouchableOpacity : View;
  const selecionada = atividade.escolhida;

  return (
    <Container
      style={[
        styles.card,
        selecionada && styles.cardSelecionado,
        atividade.selecionavel && styles.cardToque,
      ]}
      onPress={onEscolher}
    >
      <Text style={styles.titulo}>{atividade.titulo}</Text>
      {atividade.descricao && (
        <Text style={styles.descricao}>{atividade.descricao}</Text>
      )}
      {atividade.local && (
        <Text style={styles.local}>📍 {atividade.local}</Text>
      )}
      {atividade.tipo && (
        <Text style={styles.tipo}>Tipo: {atividade.tipo}</Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffffcc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelecionado: {
    borderColor: '#FFD700',
    backgroundColor: '#fff',
  },
  cardToque: {
    borderColor: '#004b87',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#003366',
  },
  descricao: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
  },
  local: {
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#444',
  },
  tipo: {
    marginTop: 2,
    color: '#666',
    fontSize: 13,
  },
});

export default CardAtividade;
