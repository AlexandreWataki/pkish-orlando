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
                fontSize: 10,           // ðŸ”¹ Fonte 10
                lineHeight: 14,         // ðŸ”¹ Leitura confortÃ¡vel
                textAlign: 'justify',   // ðŸ”¹ Sempre justificado
                marginBottom: 2,        // ðŸ”¹ EspaÃ§o sutil entre linhas
                color: '#fff',          // ðŸ”¹ Texto padrÃ£o branco
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
