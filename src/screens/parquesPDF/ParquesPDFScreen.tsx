// src/screens/parquesPDF/ParquesPDFScreen.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { pdfLinks } from './pdfLinks';
import { openExternalDirect } from './pdfOpen';

const VERMELHO_NEON  = '#FF4C4C';
const VERMELHO_ESCURO = '#7A0014';
const VERMELHO_BORDA  = '#FF6B6B';
const TAG_BG  = 'rgba(255,255,255,0.12)'; // (mantido caso use em outro lugar)
const TAG_TXT = '#FFECEC';                 // (mantido caso use em outro lugar)

const DESCRICOES: Record<string, string> = {
  magic:
    'Áreas: Main Street, Adventureland, Frontierland, Liberty Square, Fantasyland, Tomorrowland. Imperdíveis: TRON, Seven Dwarfs, Pirates, Haunted Mansion, Space Mountain, Big Thunder + fogos.',
  epcot:
    'Áreas: World Celebration, World Discovery, World Nature e World Showcase. Imperdíveis: Guardians (Cosmic Rewind), Soarin’, Test Track, Frozen Ever After, Remy, Spaceship Earth + festivais.',
  studios:
    'Áreas: Star Wars: Galaxy’s Edge, Toy Story Land, Sunset Blvd, Echo Lake. Imperdíveis: Rise of the Resistance, Slinky Dog Dash, Tower of Terror, Runaway Railway, Rock ’n’ Roller, Fantasmic!',
  animal:
    'Áreas: Pandora, Africa, Asia, Discovery Island. Imperdíveis: Flight of Passage, Na’vi River, Kilimanjaro Safaris, Expedition Everest, Festival of the Lion King.',
  universal:
    'Áreas: Production Central, New York, San Francisco, World Expo, Springfield, Diagon Alley. Imperdíveis: Gringotts, Hogwarts Express, Bourne Stuntacular, Transformers, Rip Ride Rockit, E.T.',
  ioa:
    'Áreas: Port of Entry, Marvel Super Hero Island, Toon Lagoon, Skull Island, Jurassic Park, Hogsmeade, Seuss Landing. Imperdíveis: Hagrid’s, VelociCoaster, Forbidden Journey, Kong, Dudley Do-Right, Popeye.',
  epic:
    'Áreas: Celestial Park, Super Nintendo World, Wizarding World – Ministry of Magic, Isle of Berk, Dark Universe. Imperdíveis: Starfall Racers, Mario Kart, Donkey Kong, atrações de Monstros e Berk.',
};

export default function ParquesPDFScreen() {
  const navigation = useNavigation<any>();

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const [clima, setClima] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setClima(await buscarClima('Orlando'));
      } catch {
        setClima(null);
      }
    })();
  }, []);

  const climaHeader = useMemo(() => {
    if (clima && typeof clima.temp === 'number') {
      return { tempC: Math.round(clima.temp), condition: clima.condicao ?? '', iconUrl: clima.icone ?? undefined };
    }
    return null;
  }, [clima]);

  // animação de “piscar”
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.35, duration: 650, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 650, useNativeDriver: true }),
      ])
    ).start();
  }, [blink]);

  const abrirDireto = async (rawUrl: string) => {
    const ok = await openExternalDirect(rawUrl);
    if (!ok) {
      Alert.alert('Falha ao abrir', 'Não consegui abrir o PDF no navegador.');
    }
  };

  return (
    <LinearGradient
      colors={['#0077cc', '#00c5d4', '#f5deb3', '#ffffff', '#ffffff']}
      locations={[0, 0.25, 0.5, 0.78, 1]}
      start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo="Mapas Oficiais dos Parques (PDF)"
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={climaHeader}
        />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContainer}>
        <View style={{ width: '96%', alignSelf: 'center' }}>
          {pdfLinks.map((p) => {
            const disabled = !p.url;
            return (
              <View key={p.id} style={styles.card}>
                <TouchableOpacity
                  style={styles.cardPressArea}
                  activeOpacity={0.9}
                  onPress={() => {
                    if (disabled) {
                      Alert.alert(p.nome, 'Mapa oficial ainda não disponível.');
                      return;
                    }
                    abrirDireto(p.url);
                  }}
                >
                  <Text numberOfLines={2} style={styles.nome}>{p.nome}</Text>
                  <Text numberOfLines={3} style={styles.desc}>
                    {DESCRICOES[p.id] || 'Mapa oficial em PDF • alta resolução.'}
                  </Text>
                </TouchableOpacity>

                {/* Selo piscante no canto direito inferior */}
                <Animated.View style={[styles.bottomBadge, { opacity: blink }]}>
                  <TouchableOpacity
                    disabled={disabled}
                    onPress={() => !disabled && abrirDireto(p.url)}
                    activeOpacity={0.95}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={[styles.badgePress, disabled && { opacity: 0.4 }]}
                  >
                    <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={18}
                      color="#FFFFFF"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.badgeTxt}>
                      {disabled ? 'Em breve' : 'PDF oficial'}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')} style={styles.botaoSeta} activeOpacity={0.9}>
          <MaterialCommunityIcons name="arrow-left-circle" size={40} color="#0077cc" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollArea: { flex: 1 },
  scrollContainer: { padding: 10, paddingBottom: 10, alignItems: 'center' },

  card: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: VERMELHO_ESCURO,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 60, // espaço pro selo no canto inferior
    marginBottom: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: VERMELHO_BORDA,
    ...(Platform.OS === 'web'
      ? { boxShadow: `0 0 10px ${VERMELHO_NEON}55` as any }
      : {
          elevation: 5,
          shadowColor: VERMELHO_NEON,
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
        }),
  },

  cardPressArea: {
    flex: 1,
    paddingRight: 12, // só margem visual
  },

  nome: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  desc: { marginTop: 4, fontSize: 12, color: '#FFECEC', lineHeight: 18, textAlign: 'justify' },

  // NOVO selo no canto direito inferior
  bottomBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255, 76, 76, 0.18)', // VERMELHO_NEON com alpha
  },
  badgePress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeTxt: { color: '#FFFFFF', fontSize: 11, fontWeight: '800', letterSpacing: 0.2 },

  // Rodapé / navegação
  rodapeFundo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#ffffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rodapeConteudo: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
