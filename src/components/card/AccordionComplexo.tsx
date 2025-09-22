// src/components/card/AccordionComplexo.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  options: string[];                    // ex.: ['Todas as Ã¡reas','Disney','Universal']
  defaultLabel?: string;                // ex.: 'Selecione o Complexo (Disney/Universal)'
  onSelect?: (value: string) => void;   // callback na seleÃ§Ã£o
  value?: string;                       // controle externo opcional
};

const BLUE = '#28A9E2';     // borda azul do mock
const DARK = '#004b87';

const AccordionComplexo: React.FC<Props> = ({
  options,
  defaultLabel = 'Selecione o Complexo (Disney/Universal)',
  onSelect,
  value,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [internal, setInternal] = useState<string | null>(null);

  const selected = value ?? internal;

  const selectAndCollapse = (v: string) => {
    setInternal(v);
    onSelect?.(v);
    setExpanded(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* CabeÃ§alho sempre visÃ­vel (mostra label ou seleÃ§Ã£o) */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.header}
        onPress={() => setExpanded(prev => !prev)}
      >
        <Ionicons
          name={expanded ? 'chevron-down' : 'chevron-up'} // ðŸ”½ expandir | ðŸ”¼ reabrir
          size={18}
          color={DARK}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.headerText}>
          {selected || defaultLabel}
        </Text>

        {/* seta no canto direito (redundante e familiar) */}
        <Ionicons
          name={expanded ? 'chevron-down' : 'chevron-up'}
          size={18}
          color={DARK}
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>

      {/* Lista de opÃ§Ãµes (aparece somente expandido) */}
      {expanded && (
        <View style={styles.options}>
          {options.map((opt) => {
            const isSel = opt === selected;
            return (
              <TouchableOpacity
                key={opt}
                style={[styles.optionItem, isSel && styles.optionItemSel]}
                activeOpacity={0.9}
                onPress={() => selectAndCollapse(opt)}
              >
                <Text style={[styles.optionText, isSel && styles.optionTextSel]}>
                  {opt}
                </Text>
                {isSel && <Ionicons name="checkmark" size={16} color={DARK} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    width: '94%',
    borderWidth: 4,               // borda externa destacada
    borderColor: BLUE,
    borderRadius: 16,
    backgroundColor: 'transparent',
    padding: 6,
    marginTop: 8,
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: DARK,
    fontWeight: '700',
    fontSize: 13,
  },
  options: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e6eef7',
  },
  optionItemSel: {
    backgroundColor: '#E8F6FF',
  },
  optionText: {
    color: DARK,
    fontSize: 12,
    fontWeight: '600',
  },
  optionTextSel: {
    textDecorationLine: 'underline',
  },
});

export default AccordionComplexo;
