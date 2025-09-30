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
import { LinearGradient } from 'expo-linear-gradient';

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
  { key: 'hoteis', label: 'Hotéis' },
  { key: 'compras', label: 'Compras' },
  { key: 'transporte', label: 'Transporte' },
  { key: 'outros', label: 'Outros' },
];

export default function PromocoesScreen() {
  const navigation = useNavigation<any>();
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]['key']>('todas');

  // Cabeçalho com clima
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
    <LinearGradient
      colors={[
        '#0077cc', // azul piscina
        '#00c5d4', // turquesa
        '#f5deb3', // areia clara
        '#ffffff', // branco normal
        '#ffffff', // branco final (rasinho bem claro)
      ]}
      locations={[0, 0.3, 0.6, 0.85, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
    
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ===== Cabeçalho ===== */}
      <View style={styles.headerWrap}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || clima?.clima || 'Parcialmente nublado'}
          temperatura={clima?.temp ? `${clima.temp}°C` : undefined}
          iconeClima={clima?.icone}
        />

        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Clube de Vantagens Orlando</Text>
        </View>
      </View>

      {/* Conteúdo com filtros + lista */}
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
              <Text style={{ color: '#fff' }}>Nenhuma promoção nessa categoria ainda.</Text>
            </View>
          }
        />
      </ScrollView>

      {/* ===== Rodapé com logo ===== */}
      <View style={styles.footerBlack} pointerEvents="none">
        <Image source={LOGO} style={styles.footerLogo} resizeMode="contain" />
      </View>

      {/* ===== Seta flutuante para voltar ===== */}
      <TouchableOpacity
        style={styles.bottomBackLeft}
        onPress={() => navigation.navigate('MenuPrincipal')}
        activeOpacity={0.8}
      >
        <View style={styles.glowCircle}>
          <Ionicons name="arrow-back-circle" size={44} color={AZUL_NEON} />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    backgroundColor: '#002B5B',
  },
  filtroTxt: { color: '#cfefff', fontWeight: '600', fontSize: 12 },
  filtroTxtAtivo: { color: '#00FFFF' },

  footerBlack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,              // ⬅️ antes estava 150, reduzimos
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
footerLogo: { 
  width: 80, 
  height: 36, 
  opacity: 0.95, 
  marginBottom: 60,   // ⬅️ sobe o logo dentro do rodapé
},

  bottomBackLeft: {
    position: 'absolute',
    left: 10,
    bottom: 55,               // ⬅️ antes estava 10, subimos o botão
    zIndex: 999,
  },
  glowCircle: {
    borderRadius: 999,
    padding: 6,
    backgroundColor: 'rgba(0,255,255,0.12)',
  },

});
