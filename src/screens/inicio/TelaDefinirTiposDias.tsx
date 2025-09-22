ï»¿import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Ã¢Å“â€¦ Importa o AvisoLegal atualizado (variante "card")
import AvisoLegal from '@/components/card/AvisoLegal';

export type OpcaoParque = { id: string; label: string };

export const DISNEY_PARQUES: OpcaoParque[] = [
  { id: 'magic-kingdom',        label: 'Magic Kingdom (guia)' },
  { id: 'epcot',                label: 'Epcot (guia)' },
  { id: 'hollywood-studios',    label: "Disney's Hollywood Studios (guia)" },
  { id: 'animal-kingdom',       label: "Disney's Animal Kingdom (guia)" },
];

export const UNIVERSAL_PARQUES: OpcaoParque[] = [
  { id: 'universal-studios-fl', label: 'Universal Studios Florida (guia)' },
  { id: 'islands-of-adventure', label: 'Islands of Adventure (guia)' },
  { id: 'volcano-bay',          label: 'Volcano Bay (guia)' },
];

export default function TelaDefinirTiposDias() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual, atualizarParkisheiro, markVisited } = useParkisheiro();

  const totalDias = parkisheiroAtual.totalDias ?? 0;

  const [chegada, setChegada] = useState('0');
  const [saida, setSaida] = useState('0');
  const [disney, setDisney] = useState('0');
  const [universal, setUniversal] = useState('0');
  const [compras, setCompras] = useState('0');
  const [descanso, setDescanso] = useState('0');
  const [clima, setClima] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      markVisited('TelaDefinirTiposDias');

      if (!parkisheiroAtual || (parkisheiroAtual.totalDias ?? 0) <= 0) {
        Alert.alert('Erro', 'Total de dias nÃƒÂ£o definido. Volte ÃƒÂ  tela anterior.');
        navigation.goBack();
      }

      setChegada('0');
      setSaida('0');
      setDisney('0');
      setUniversal('0');
      setCompras('0');
      setDescanso('0');

      buscarClima('28.5383,-81.3792').then(setClima);
    }, [parkisheiroAtual])
  );

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const nChegada = parseInt(chegada || '0');
  const nSaida = parseInt(saida || '0');
  const nDisney = parseInt(disney || '0');
  const nUniversal = parseInt(universal || '0');
  const nCompras = parseInt(compras || '0');
  const nDescanso = parseInt(descanso || '0');

  const totalSelecionado = nChegada + nSaida + nDisney + nUniversal + nCompras + nDescanso;
  const restante = totalDias - totalSelecionado;
  const podeAvancar = restante === 0;

  const handleAvancar = () => {
    if (!podeAvancar) {
      Alert.alert(
        'Erro de DistribuiÃƒÂ§ÃƒÂ£o',
        restante > 0 ? `Faltam ${restante} dia(s) para completar.` : `VocÃƒÂª excedeu em ${-restante} dia(s).`
      );
      return;
    }

    const diasManuais = [
      ...Array(nChegada).fill({ tipo: 'chegada' }),
      ...Array(nDisney).fill({ tipo: 'disney' }),
      ...Array(nUniversal).fill({ tipo: 'universal' }),
      ...Array(nCompras).fill({ tipo: 'compras' }),
      ...Array(nDescanso).fill({ tipo: 'descanso' }),
      ...Array(nSaida).fill({ tipo: 'saida' }),
    ];

    atualizarParkisheiro('default', {
      diasDistribuidos: {
        chegada: nChegada,
        saida: nSaida,
        disney: nDisney,
        universal: nUniversal,
        compras: nCompras,
        descanso: nDescanso,
      },
      diasDistribuidosManuais: diasManuais,
    });

    navigation.navigate('DistribuicaodeDias');
  };

  function handleArrow(setValue: (v: string) => void, value: string, delta: number, max?: number) {
    let valorAtual = parseInt(value || '0');
    let novoValor = valorAtual + delta;
    if (novoValor < 0) novoValor = 0;
    if (typeof max === 'number' && novoValor > max) novoValor = max;

    const totalPrevisto = totalSelecionado - valorAtual + novoValor;
    if (totalPrevisto > totalDias) return;

    setValue(novoValor.toString());
  }

  function handleChangeInput(text: string, setValue: (v: string) => void, max?: number) {
    let clean = text.replace(/[^0-9]/g, '');
    if (clean === '') clean = '0';
    let num = parseInt(clean);
    if (typeof max === 'number' && num > max) num = max;

    const valorAtual = parseInt((valueBySetter(setValue) || '0'));
    const totalPrevisto = totalSelecionado - valorAtual + num;
    if (totalPrevisto > totalDias) return;

    setValue(num.toString());
  }

  function valueBySetter(setter: Function) {
    if (setter === setChegada) return chegada;
    if (setter === setSaida) return saida;
    if (setter === setDisney) return disney;
    if (setter === setUniversal) return universal;
    if (setter === setCompras) return compras;
    if (setter === setDescanso) return descanso;
    return '0';
  }

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
          clima={clima?.condicao || 'Parcialmente nublado'}
          temperatura={clima ? `${clima.temp}Ã‚Â°C` : '28Ã‚Â°C'}
          iconeClima={clima?.icone}
        />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: 20 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contadorDias}>
            <View style={styles.contadorRow}>
              <Text style={styles.contadorTexto}>
                Roteiro de {totalSelecionado}/{totalDias} dias
              </Text>
              {totalSelecionado === totalDias && (
                <Ionicons name="checkmark" size={22} color="#fff" />
              )}
            </View>
          </View>

          <View style={styles.box}>
            <CardTipo label="Dias de Chegada" value={chegada} setValue={setChegada} min={0} max={1} handleArrow={handleArrow} handleChangeInput={handleChangeInput} descricao="Dia de voo para Orlando." />
            <CardTipo label="Dias de Parques Disney" value={disney} setValue={setDisney} min={0} handleArrow={handleArrow} handleChangeInput={handleChangeInput} descricao="Guia independente para visitar os parques Disney." />
            <CardTipo label="Dias de Parques Universal" value={universal} setValue={setUniversal} min={0} handleArrow={handleArrow} handleChangeInput={handleChangeInput} descricao="Guia independente para visitar os parques Universal." />
            <CardTipo label="Dias de Compras" value={compras} setValue={setCompras} min={0} handleArrow={handleArrow} handleChangeInput={handleChangeInput} descricao="Dia para shoppings e outlets." />
            <CardTipo label="Dias de Descanso" value={descanso} setValue={setDescanso} min={0} handleArrow={handleArrow} handleChangeInput={handleChangeInput} descricao="Dia para relaxar ou passeios leves." />
            <CardTipo label="Dias de SaÃƒÂ­da" value={saida} setValue={setSaida} min={0} max={1} handleArrow={handleArrow} handleChangeInput={handleChangeInput} descricao="Dia de voo de retorno." />

            {/* Ã¢Å¡Â Ã¯Â¸Â Aviso Legal AGORA logo abaixo do "Dias de SaÃƒÂ­da",
                mesmo tamanho/raio dos cards graÃƒÂ§as a variant="card" */}
            <AvisoLegal
              theme="blue"
              fixoNoRodape={false}
              compact
              incluirGuiaNaoOficial
              variant="card"
            />
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        <TouchableOpacity
          style={[styles.floatingButton, { opacity: podeAvancar ? 1 : 0.3 }]}
          onPress={handleAvancar}
          disabled={!podeAvancar}
        >
          <Ionicons name="arrow-forward-circle" size={48} color="#004b87" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={48} color="#004b87" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

function CardTipo({ label, value, setValue, min, max, handleArrow, handleChangeInput, descricao }: any) {
  return (
    <View style={styles.cardInput}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>
      <View style={styles.inputSetaArea}>
        <TouchableOpacity onPress={() => handleArrow(setValue, value, -1, max)}>
          <Ionicons name="chevron-back-circle" size={28} color="#004b87" />
        </TouchableOpacity>
        <TextInput
          value={value === '0' ? '' : value}
          keyboardType="numeric"
          onChangeText={text => handleChangeInput(text, setValue, max)}
          style={styles.inputMini}
          maxLength={2}
        />
        <TouchableOpacity onPress={() => handleArrow(setValue, value, 1, max)}>
          <Ionicons name="chevron-forward-circle" size={28} color="#004b87" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 80,
    width: '100%',
    gap: 5,
  },
  contadorDias: {
    width: '90%',
    backgroundColor: '#004b87',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 3,
    marginTop: 10,
  },
  contadorRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contadorTexto: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  box: {
    width: '100%',
    gap: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 2,
  },
  cardInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginVertical: 3,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 13,
    color: '#003366',
  },
  descricao: {
    fontSize: 10,
    color: '#444',
  },
  inputSetaArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  inputMini: {
    backgroundColor: 'transparent',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 30,
    maxWidth: 38,
    textAlign: 'center',
    color: '#003366',
    marginHorizontal: 2,
    fontSize: 12,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 100,
    elevation: 0,
  },
  floatingBackButton: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    zIndex: 100,
    elevation: 10,
  },
});
