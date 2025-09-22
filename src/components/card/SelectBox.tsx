import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectBoxProps {
  label: string;
  value: string | null;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export default function SelectBox({ label, value, options, onChange }: SelectBoxProps) {
  const [visivel, setVisivel] = useState(false);

  const abrir = () => setVisivel(true);
  const fechar = () => setVisivel(false);

  const selecionar = (val: string) => {
    onChange(val);
    fechar();
  };

  const labelSelecionada = options.find(o => o.value === value)?.label || 'Selecione';

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={abrir} style={styles.caixa}>
        <Text style={styles.texto}>{labelSelecionada}</Text>
        <Ionicons name="chevron-down" size={20} color="#003366" />
      </TouchableOpacity>

      <Modal transparent visible={visivel} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={fechar}>
          <View style={styles.modalBox}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.opcao}
                  onPress={() => selecionar(item.value)}
                >
                  <Text style={styles.opcaoTexto}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
  },
  label: {
    fontSize: 12,            // ðŸ”¹ menor para combinar com os cards
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
  },
  caixa: {
    backgroundColor: '#ffffffcc', // ðŸ”¹ igual aos cards translÃºcidos
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // ðŸ”¹ remove borda
    borderWidth: 0,
    borderColor: 'transparent',

    // ðŸ”¹ remove sombra no Android
    elevation: 0,
  },
  texto: {
    color: '#003366',
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 400,
    paddingVertical: 10,
  },
  opcao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  opcaoTexto: {
    fontSize: 12,
    color: '#003366',
  },
});
