ï»¿// src/logic/menu/MenuWebScreen.tsx
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import {
  Platform,
  View,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Animated,
  Linking,
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

type RouteParams = { url: string; title?: string };

const UA_MOBILE =
  'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36';

function normalizeUrl(raw: string) {
  if (!raw) return '';
  let u = raw.trim();
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  return u;
}

function toGoogleViewer(url: string) {
  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`;
}

function looksPdf(url: string) {
  return /\.pdf(\?.*)?$/i.test(url);
}

function isIntentUrl(url: string) {
  return /^intent:\/\//i.test(url);
}

export default function MenuWebScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { url: rawUrl } = (route.params || {}) as RouteParams;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rawUrl) {
      Alert.alert('Link invÃƒÂ¡lido', 'Nenhum URL recebido para exibir.');
      navigation.goBack();
    }
  }, [rawUrl, navigation]);

  const normalized = useMemo(() => normalizeUrl(rawUrl || ''), [rawUrl]);
  const webUrl = useMemo(
    () => (normalized && looksPdf(normalized) ? toGoogleViewer(normalized) : normalized),
    [normalized]
  );

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
      return () => sub.remove();
    }, [navigation])
  );

  const handleShouldStart = useCallback(async (req: any) => {
    const u = req.url || '';
    // Permite http/https
    if (u.startsWith('http://') || u.startsWith('https://')) return true;

    // Trata intent:// (Android) para abrir em apps (ex.: WhatsApp, Maps)
    if (Platform.OS === 'android' && isIntentUrl(u)) {
      try {
        await Linking.openURL(u);
      } catch {}
      return false;
    }

    // Bloqueia outros esquemas
    return false;
  }, []);

  const handleError = useCallback(() => {
    Alert.alert('Falha ao carregar', 'NÃƒÂ£o foi possÃƒÂ­vel abrir o conteÃƒÂºdo.');
    navigation.goBack();
  }, [navigation]);

  // animaÃƒÂ§ÃƒÂ£o do botÃƒÂ£o
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.55, duration: 700, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [blink]);

  if (!webUrl) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <WebView
        source={{ uri: webUrl }}
        startInLoadingState
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={handleShouldStart}
        setSupportMultipleWindows
        onOpenWindow={(event) => {
          // Abre target="_blank" no mesmo WebView
          const targetUrl = event.nativeEvent.targetUrl;
          if (targetUrl) {
            // Navega para o link no prÃƒÂ³prio WebView
            (event as any).preventDefault?.();
          }
        }}
        javaScriptEnabled
        domStorageEnabled
        // Cookies compartilhados ajudam em alguns sites (iOS)
        sharedCookiesEnabled
        // Cookies de 3Ã‚Âª parte (Android)
        thirdPartyCookiesEnabled
        userAgent={UA_MOBILE}
        mixedContentMode="always"
        androidLayerType={Platform.OS === 'android' ? 'hardware' : undefined}
        onError={handleError}
        onHttpError={handleError as any}
        onLoadEnd={() => setLoading(false)}
        // Evita zoom involuntÃƒÂ¡rio em pÃƒÂ¡ginas mobile
        scalesPageToFit={false}
        // Desativa cache agressivo em pÃƒÂ¡ginas de login
        cacheEnabled={false}
      />

      <Animated.View style={[styles.backBtn, { opacity: blink }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back-circle" size={54} color="#0077cc" />
        </TouchableOpacity>
      </Animated.View>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#00BFFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 57 : 57,
    left: 16,
    backgroundColor: 'transparent',
    borderRadius: 32,
    padding: 2,
    zIndex: 30,
    elevation: 6,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
