// src/components/card/CabecalhoDia.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import logo from '@/assets/imagens/logo4.png';

type ClimaCompat =
  | string
  | {
      tempC?: number | string | null;
      temp?: number | string | null;
      temperatura?: number | string | null;
      descricao?: string;
      condicao?: string;
      icon?: string | ImageSourcePropType | null;
      icone?: string | ImageSourcePropType | null;
    }
  | null
  | undefined;

type Props = {
  data?: string | Date;
  diaSemana?: string;
  clima?: ClimaCompat;
  titulo?: string;
  subtitulo?: string;
  mostrarTitulo?: boolean;
  temperatura?: string | number;
  iconeClima?: ImageSourcePropType | string;

  /** Mostra SOMENTE: Dia da semana â€¢ Temperatura â€¢ CondiÃ§Ã£o (sem data/Ã­cone) */
  soDiaTempCond?: boolean;
  /** Mostra empilhado: DIA (nÃºmero) em cima, dia da semana embaixo; temperatura ao lado */
  empilharDiaSemana?: boolean;
};

// â¬…ï¸ deslocamento para a ESQUERDA (nÃºmero negativo)
const SHIFT_LEFT = -20;

export const CabecalhoDia = ({
  diaSemana = 'Domingo',
  data,
  clima,
  titulo = '',
  subtitulo,
  mostrarTitulo = false,
  temperatura,
  iconeClima,
  soDiaTempCond = false,
  empilharDiaSemana = false,
}: Props) => {
  const condicaoClima =
    typeof clima === 'string'
      ? clima
      : (clima?.descricao || clima?.condicao || '') || '';

  const fromClimaTemp =
    !clima || typeof clima === 'string'
      ? null
      : (clima.temp ?? clima.tempC ?? clima.temperatura ?? null);

  const temperaturaFinal = (() => {
    const val = temperatura ?? fromClimaTemp ?? 28;
    if (typeof val === 'number') return `${Math.round(val)}Â°C`;
    const s = String(val);
    return s.includes('Â°') ? s : `${s}Â°C`;
  })();

  const dateObj = data ? new Date(data) : new Date();
  const diaNumero = String(dateObj.getDate()).padStart(2, '0');

  // ---- MODO compacto: sÃ³ dia â€¢ temp â€¢ condiÃ§Ã£o
  if (soDiaTempCond) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={[styles.infoBox, styles.infoBoxShift]}>
            <View style={styles.climaRow}>
              <Text style={styles.dataTexto}>{diaSemana}</Text>
              <Text style={styles.bullet}> â€¢ </Text>
              <Text style={styles.temperatura}>{temperaturaFinal}</Text>
              {!!condicaoClima && (
                <>
                  <Text style={styles.bullet}> â€¢ </Text>
                  <Text style={styles.climaTexto}>{condicaoClima}</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }

  // ---- MODO empilhado
  if (empilharDiaSemana) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={[styles.infoBox, styles.infoBoxShift, { alignItems: 'flex-end' }]}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.diaGrande}>{diaNumero}</Text>
              <Text style={styles.dataTexto}>{diaSemana}</Text>
            </View>
            <Text style={[styles.temperatura, { marginTop: 2 }]}>{temperaturaFinal}</Text>
          </View>
        </View>
      </View>
    );
  }

  // ---- MODO completo
  const iconeFinal = (() => {
    if (iconeClima) return iconeClima;
    if (!clima || typeof clima === 'string') return null;
    return (clima.icon ?? clima.icone) ?? null;
  })();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <View style={[styles.infoBox, styles.infoBoxShift]}>
          {mostrarTitulo && !!titulo && <Text style={styles.titulo}>{titulo}</Text>}
          {!!subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}

          <Text style={styles.dataTexto}>
            {diaSemana}{data ? ` â€¢ ${String(data)}` : ''}
          </Text>

          <View style={styles.climaRow}>
            {iconeFinal
              ? typeof iconeFinal === 'number'
                ? <Image source={iconeFinal} style={styles.iconeClima} />
                : typeof iconeFinal === 'string'
                  ? (iconeFinal.startsWith('http') || iconeFinal.startsWith('data:')
                      ? <Image source={{ uri: iconeFinal }} style={styles.iconeClima} />
                      : <Text style={styles.iconeEmoji}>{iconeFinal}</Text>)
                  : null
              : null}
            <Text style={styles.temperatura}>{temperaturaFinal}</Text>
          </View>

          {!!condicaoClima && <Text style={styles.climaTexto}>{condicaoClima}</Text>}
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 0,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  logo: { width: width < 600 ? 180 : 220, height: width < 600 ? 54 : 66, marginLeft: 0 },

  // bloco dos textos (direita)
  infoBox: { alignItems: 'flex-end' },
  // â¬…ï¸ puxa ~20px para a ESQUERDA
  infoBoxShift: { transform: [{ translateX: SHIFT_LEFT }] },

  // comuns
  climaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 1 },
  dataTexto: { fontSize: width < 400 ? 10 : 12, color: '#fff', textAlign: 'right' },
  bullet: { color: '#fff', opacity: 0.9, fontSize: width < 400 ? 10 : 12, marginHorizontal: 2 },
  temperatura: { fontSize: width < 400 ? 11 : 13, color: '#fff', fontWeight: '700', textAlign: 'right' },
  climaTexto: { color: '#fff', fontSize: width < 400 ? 9 : 11, fontStyle: 'italic', textAlign: 'right' },

  // empilhado
  diaGrande: {
    color: '#fff',
    fontSize: width < 400 ? 18 : 22,
    fontWeight: '800',
    lineHeight: width < 400 ? 20 : 24,
  },

  // completo
  titulo: { color: '#fff', fontSize: width < 400 ? 16 : 18, fontWeight: 'bold', textAlign: 'right' },
  subtitulo: { color: '#ddd', fontSize: width < 400 ? 12 : 13, fontStyle: 'italic', marginTop: 1, marginBottom: 3, textAlign: 'right' },
  iconeClima: { width: 18, height: 18, marginRight: 4 },
  iconeEmoji: { fontSize: 16, marginRight: 6, color: '#fff' },
});

export default CabecalhoDia;
