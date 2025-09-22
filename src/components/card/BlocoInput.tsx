import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}

export default function BlocoInput({
  label,
  value,
  editable = false,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        editable={editable}
        keyboardType="number-pad"
        onChangeText={onChangeText}
        style={[styles.input, !editable && styles.readOnly]}
        accessibilityLabel={label}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#003366',
    flex: 1,
  },
  input: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
    minWidth: 60,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  readOnly: {
    color: '#666',
  },
});
