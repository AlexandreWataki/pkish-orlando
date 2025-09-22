ï»¿// src/components/card/HighlightLabelText.tsx
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
                fontSize: 10,           // Ã°Å¸â€Â¹ Fonte 10
                lineHeight: 14,         // Ã°Å¸â€Â¹ Leitura confortÃƒÂ¡vel
                textAlign: 'justify',   // Ã°Å¸â€Â¹ Sempre justificado
                marginBottom: 2,        // Ã°Å¸â€Â¹ EspaÃƒÂ§o sutil entre linhas
                color: '#fff',          // Ã°Å¸â€Â¹ Texto padrÃƒÂ£o branco
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
