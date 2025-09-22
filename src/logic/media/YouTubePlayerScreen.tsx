ï»¿// src/logic/media/YouTubePlayerScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import type { RootStackParamList } from '@/navigation/RootStack'; // Ã¢Å“â€¦ AJUSTADO

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

  const [loading, setLoading] = useState(true);

  const embedUrl = useMemo(() => {
    const id = extractId(idOrUrl);
    if (!id) return null;
    // inicia com ÃƒÂ¡udio (sem mute), e com suporte a fullscreen
    return `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&fs=1`;
  }, [idOrUrl]);

  // Fallback simples se nÃƒÂ£o houver vÃƒÂ­deo
  if (!embedUrl) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', marginBottom: 12 }}>VÃƒÂ­deo indisponÃƒÂ­vel</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
        >
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Caixa 16:9 centralizada */}
      <View style={styles.playerBox}>
        <WebView
          source={{ uri: embedUrl }}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo
          originWhitelist={['*']}
          androidLayerType="hardware"
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      {/* Ã°Å¸â€Â´ BotÃƒÂ£o voltar no canto SUPERIOR DIREITO */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Voltar"
      >
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Fundo preto e conteÃƒÂºdo centralizado verticalmente
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },

  // Caixa com proporÃƒÂ§ÃƒÂ£o 16:9 ocupando toda a largura
  playerBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignSelf: 'center',
    backgroundColor: '#000',
  },

  // WebView ocupa a caixa 16:9 exatamente
  webview: {
    width: '100%',
    height: '100%',
  },

  // Ã°Å¸â€Â´ seta vermelha no canto DIREITO
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 312 : 312,
    left: 16,                 // Ã¢Å“â€¦ trocado de left -> right
    backgroundColor: 'red',
    borderRadius: 22,
    padding: 6,
    zIndex: 10,
    elevation: 6,
  },

  loader: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
});
