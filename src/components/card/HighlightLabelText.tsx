// src/components/card/HighlightLabelText.tsx
import React from 'react';
import { Text } from 'react-native';

export const HighlightLabelText = ({
  children,
  style = {},
}: {
  children: string;
  style?: any;
}) => {
  const linhas = children.split('\n');
  return (
    <>
      {linhas.map((linha, i) => {
        const [prefixo, ...resto] = linha.split(':');
        const temPrefixo = resto.length > 0;

        return (
          <Text
            key={i}
            style={[
              style,
              {
                fontSize: 10,           // 🔹 Fonte 10
                lineHeight: 14,         // 🔹 Leitura confortável
                textAlign: 'justify',   // 🔹 Sempre justificado
                marginBottom: 2,        // 🔹 Espaço sutil entre linhas
                color: '#fff',          // 🔹 Texto padrão branco
              },
            ]}
          >
            {temPrefixo ? (
              <>
                <Text style={{ color: '#FFD700', fontWeight: 'bold' }}>
                  {prefixo}:
                </Text>{' '}
                {resto.join(':')}
              </>
            ) : (
              linha
            )}
          </Text>
        );
      })}
    </>
  );
};
