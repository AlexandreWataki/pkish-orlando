// src/logic/media/YouTubePlayerScreen.tsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, Platform, Text, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '@/navigation/RootStack';
import { openYouTube } from '@/logic/media/openYouTube'; // ✅ helper global (Web + iOS/Android)

type Nav = NativeStackNavigationProp<RootStackParamList, 'YouTubePlayer'>;
type Rt = RouteProp<RootStackParamList, 'YouTubePlayer'>;

function extractId(input?: string | null): string | null {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const m = input.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export default function YouTubePlayerScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { idOrUrl } = route.params ?? {};

  const [opening, setOpening] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoId = useMemo(() => extractId(idOrUrl), [idOrUrl]);

  const didGoBack = useRef(false);

  const openAndReturn = useCallback(async () => {
    if (!idOrUrl && !videoId) {
      setOpening(false);
      setError('Vídeo inválido.');
      return;
    }

    try {
      // 🔗 abre via helper unificado (Web abre sem popup; Mobile tenta app e faz fallback)
      await openYouTube(idOrUrl as string);

      // ⏳ dá um respiro para o sistema trocar de app/aba e voltamos
      // Evita "double back" caso o usuário toque no botão Voltar manualmente
      if (!didGoBack.current) {
        didGoBack.current = true;
        setTimeout(() => {
          try { navigation.goBack(); } catch {}
        }, Platform.OS === 'web' ? 0 : 250);
      }
    } catch (e) {
      setError('Não foi possível abrir o YouTube.');
      setOpening(false);
    }
  }, [idOrUrl, videoId, navigation]);

  // abre automaticamente ao montar
  useEffect(() => {
    openAndReturn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {/* Botão voltar (canto superior direito) */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          if (!didGoBack.current) {
            didGoBack.current = true;
            navigation.goBack();
          }
        }}
        activeOpacity={0.9}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Voltar"
      >
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {opening ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
          <Text style={styles.helperText}>Abrindo no YouTube…</Text>
        </View>
      ) : (
        <View style={styles.fallbackBox}>
          <Text style={styles.fallbackText}>
            {error ?? 'Vídeo indisponível.'}
          </Text>
          {!!(videoId || idOrUrl) && (
            <TouchableOpacity
              style={styles.tryBtn}
              onPress={openAndReturn}
              activeOpacity={0.9}
            >
              <Ionicons name="logo-youtube" size={20} color="#fff" />
              <Text style={styles.tryBtnText}>Tentar abrir novamente</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Fundo escuro simples
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },

  // seta vermelha no canto DIREITO
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 16,
    backgroundColor: 'red',
    borderRadius: 22,
    padding: 6,
    zIndex: 10,
    elevation: 6,
  },

  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    marginTop: 12,
    color: '#fff',
  },

  fallbackBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fallbackText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  tryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#cc0000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  tryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
