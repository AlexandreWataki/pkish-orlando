// src/screens/inicio/TelaDefinirQuantidadeDias.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const { height } = Dimensions.get('window');

type DateObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export default function TelaDefinirQuantidadeDias() {
  const navigation = useNavigation<any>();
  const { atualizarParkisheiro, markVisited, parkisheiroAtual, setUsuarioAtual } = useParkisheiro();

  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const [clima, setClima] = useState<any>(null);

  useEffect(() => {
    markVisited('TelaDefinirQuantidadeDias');
    (async () => {
      try {
        const c = await buscarClima('Orlando');
        setClima(c);
      } catch {
        setClima(null);
      }
    })();
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const dataInicio = new Date(startDate.year, startDate.month - 1, startDate.day);
    const dataSaida = new Date(endDate.year, endDate.month - 1, endDate.day);
    const totalDias =
      Math.ceil((dataSaida.getTime() - dataInicio.getTime()) / (1000 * 3600 * 24)) + 1;

    atualizarParkisheiro(parkisheiroAtual.id, {
      dataInicio,
      dataSaida,
      totalDias,
    });

    setUsuarioAtual({
      ...parkisheiroAtual,
      dataInicio,
      dataSaida,
      totalDias,
    });
  }, [startDate, endDate]);

  const handleDayPress = (day: DateObject) => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (day.dateString < todayStr) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      const d1 = new Date(startDate.dateString);
      const d2 = new Date(day.dateString);
      if (d2 < d1) {
        setStartDate(day);
        setEndDate(startDate);
      } else {
        setEndDate(day);
      }
    }
  };

  const generateMarkedDates = () => {
    const marked: any = {};
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 1; i <= 365; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = d.toISOString().split('T')[0];
      marked[str] = {
        disabled: true,
        disableTouchEvent: true,
        textColor: '#999',
      };
    }

    marked[todayStr] = { textColor: '#003366' };

    if (startDate) {
      marked[startDate.dateString] = {
        ...marked[startDate.dateString],
        startingDay: true,
        endingDay: !endDate,
        color: '#003366',
        textColor: '#fff',
      };
    }

    if (startDate && endDate) {
      let current = new Date(startDate.dateString);
      const last = new Date(endDate.dateString);
      while (current <= last) {
        const dateStr = current.toISOString().split('T')[0];
        if (dateStr !== startDate.dateString && dateStr !== endDate.dateString) {
          marked[dateStr] = {
            ...marked[dateStr],
            color: '#003366',
            textColor: '#fff',
          };
        }
        current.setDate(current.getDate() + 1);
      }
      marked[endDate.dateString] = {
        ...marked[endDate.dateString],
        endingDay: true,
        color: '#003366',
        textColor: '#fff',
      };
    }

    return marked;
  };

  const getTotalDias = () => {
    if (!startDate || !endDate) return '';
    const d1 = new Date(startDate.dateString);
    const d2 = new Date(endDate.dateString);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1;
    return diff.toString();
  };

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  // 🔧 Normalização igual ao menu (agora inclui tempC)
  const condicaoClima = clima?.condicao ?? clima?.descricao ?? 'Parcialmente nublado';
  const tempValor = clima?.temp ?? clima?.temperatura ?? clima?.tempC ?? 28;
  const temperaturaClima =
    typeof tempValor === 'number'
      ? `${Math.round(tempValor)}°C`
      : String(tempValor).includes('°')
      ? String(tempValor)
      : `${tempValor}°C`;
  const iconeClima = clima?.icone ?? clima?.icon;

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#add8e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={condicaoClima}
          temperatura={temperaturaClima}  // ← agora aparece certinho na lateral
          iconeClima={iconeClima}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.calendarCard}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={generateMarkedDates()}
              markingType="period"
              firstDay={1}
              theme={{
                calendarBackground: 'transparent',
                textDayFontSize: 12,
                textMonthFontSize: 14,
                monthTextColor: '#003366',
                dayTextColor: '#003366',
                arrowColor: '#003366',
                todayTextColor: '#003366',
                selectedDayBackgroundColor: '#003366',
                textDisabledColor: '#aaa',
              }}
              style={[
                styles.calendarInside,
                { height: height * 0.5, marginTop: height * 0.04 },
              ]}
            />
          </View>

          <View style={styles.cardWrapper}>
            <View style={styles.datasRow}>
              <Text style={styles.dataInfo}>
                🛬 Chegada:{' '}
                {startDate ? startDate.dateString.split('-').reverse().join('/') : '--'}
              </Text>
              <Text style={styles.dataInfo}>
                🛫 Saída:{' '}
                {endDate ? endDate.dateString.split('-').reverse().join('/') : '--'}
              </Text>
            </View>
          </View>

          <View style={styles.cardWrapper}>
            <View style={styles.totalDiasRow}>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={getTotalDias() ? `${getTotalDias()} dias de viagem` : ''}
                  keyboardType="numeric"
                  style={styles.input}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={[styles.floatingButton, { opacity: startDate && endDate ? 1 : 0.3 }]}
        onPress={() => startDate && endDate && navigation.navigate('TiposdeDias')}
        disabled={!(startDate && endDate)}
      >
        <Ionicons name="arrow-forward-circle" size={48} color="#004b87" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => navigation.navigate('MenuPrincipal')}
      >
        <Ionicons name="arrow-back-circle" size={48} color="#004b87" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    gap: 8,
    paddingTop: 20,
    paddingBottom: 32,
  },
  cardWrapper: {
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  calendarCard: {
    width: '94%',
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 5,
    marginHorizontal: 12,
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  calendarInside: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: '100%',
    alignSelf: 'stretch',
  },
  datasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 6,
  },
  dataInfo: {
    flex: 1,
    backgroundColor: '#ffffffcc',
    padding: 12,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#003366',
    marginHorizontal: 2,
    textAlign: 'center',
  },
  totalDiasRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 6,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#ffffffcc',
    borderRadius: 8,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: '#003366',
    paddingVertical: 12,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 100,
    elevation: 0,
  },
  floatingBackButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    zIndex: 100,
    elevation: 10,
  },
});
