// src/screens/promocoes/PromocoesScreen.tsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  StatusBar, Platform, Image, ScrollView
} from 'react-native';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PromoCard from './PromoCard';
import { PROMOCOES } from './promocoes';
import type { Promocao } from './promocao';

import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';

const AZUL_NEON = '#00FFFF';
const LOGO = require('@/assets/imagens/logo4.png');

const CATEGORIAS: Array<{ key: Promocao['categoria'] | 'todas'; label: string }> = [
  { key: 'todas', label: 'Todas' },
  { key: 'parques', label: 'Parques' },
  { key: 'restaurantes', label: 'Restaurantes' },
  { key: 'hoteis', label: 'HotÃ©is' },
  { key: 'compras', label: 'Compras' },
  { key: 'transporte', label: 'Transporte' },
  { key: 'outros', label: 'Outros' },
];

export default function PromocoesScreen() {
  const navigation = useNavigation<any>();
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]['key']>('todas');

  // CabeÃ§alho com clima
  const [clima, setClima] = useState<any>(null);
  useEffect(() => { buscarClima('Orlando').then(setClima).catch(() => {}); }, []);
  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const lista = useMemo(() => {
    if (categoria === 'todas') return PROMOCOES;
    return PROMOCOES.filter(p => (p.categoria ?? 'outros') === categoria);
  }, [categoria]);

  const abrir = (item: Promocao) => {
    if (item.link) {
      Linking.openURL(item.link).catch(() => {});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ===== CabeÃ§alho ===== */}
      <View style={styles.headerWrap}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || clima?.clima || 'Parcialmente nublado'}
          temperatura={clima?.temp ? `${clima.temp}Â°C` : undefined}
          iconeClima={clima?.icone}
        />

        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Clube de Vantagens Orlando</Text>
        </View>
      </View>

      {/* ConteÃºdo com filtros + lista */}
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <View style={styles.filtrosRow}>
          {CATEGORIAS.map(f => {
            const ativo = categoria === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.filtro, ativo && styles.filtroAtivo]}
                onPress={() => setCategoria(f.key)}
              >
                <Text style={[styles.filtroTxt, ativo && styles.filtroTxtAtivo]}>{f.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={lista}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => <PromoCard item={item} onPress={abrir} />}
          ListEmptyComponent={
            <View style={{ padding: 24, alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>Nenhuma promoÃ§Ã£o nessa categoria ainda.</Text>
            </View>
          }
        />
      </ScrollView>

      {/* ===== RodapÃ© (faixa preta atÃ© o fundo) ===== */}
      <View style={styles.footerBlack} pointerEvents="none">
        {/* Logo sobe 50px dentro da faixa */}
        <Image source={LOGO} style={styles.footerLogo} resizeMode="contain" />
      </View>

      {/* ===== Seta flutuante para voltar (tambÃ©m 50px acima) ===== */}
      <TouchableOpacity
        style={styles.bottomBackLeft}
        onPress={() => navigation.navigate('MenuPrincipal')}
        activeOpacity={0.8}
      >
        <View style={styles.glowCircle}>
          <Ionicons name="arrow-back-circle" size={44} color={AZUL_NEON} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerWrap: { paddingTop: Platform.OS === 'android' ? 40 : 20, paddingHorizontal: 16, paddingBottom: 8 },
  titleRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#E6F7FF' },

  filtrosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 16,
  },
  filtro: {
    borderWidth: 1,
    borderColor: '#00BFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  filtroAtivo: {
    borderColor: '#00FFFF',
    backgroundColor: 'rgba(0, 191, 255, 0.18)',
  },
  filtroTxt: { color: '#cfefff', fontWeight: '600', fontSize: 12 },
  filtroTxtAtivo: { color: '#00FFFF' },

  // â¬‡ï¸ Faixa preta vai atÃ© a borda inferior (altura aumentada)
  footerBlack: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: 120,               // â† aumentado (era 70)
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  // Logo elevado 50px dentro da faixa (mantido)
  footerLogo: { width: 120, height: 36, opacity: 0.95, marginBottom: 50 },

  // Seta elevada 50px acima da borda (mantida)
  bottomBackLeft: {
    position: 'absolute',
    left: 10,
    bottom: 50,
    zIndex: 999,
  },
  glowCircle: {
    borderRadius: 999,
    padding: 6,
    backgroundColor: 'rgba(0,255,255,0.12)',
  },
});
