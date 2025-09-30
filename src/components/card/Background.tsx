import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardAtividade from './CardAtividade';

interface Atividade {
  titulo: string;
  descricao?: string;
  tipo?: string;
  local?: string;
  selecionavel?: boolean;
  escolhida?: boolean;
}

interface Props {
  titulo: string;
  atividades: Atividade[];
  onEscolherAtividade?: (atividade: Atividade) => void;
}

const CardTurno: React.FC<Props> = ({ titulo, atividades, onEscolherAtividade }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo.toUpperCase()}</Text>
      {atividades.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma atividade definida.</Text>
      ) : (
        atividades.map((atividade, index) => (
          <CardAtividade
            key={index}
            atividade={atividade}
            onEscolher={() => onEscolherAtividade?.(atividade)}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004b87',
    marginBottom: 12,
  },
  vazio: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default CardTurno;
