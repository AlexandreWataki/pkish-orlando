import React, { useMemo, useRef, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import { normalizeUrl } from './pdfOpen';

type RouteParams = { title?: string; url: string };

/** Google Viewer padrão */
const toGView = (u: string) =>
  `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(u)}#scrollbar=1&rm=minimal`;

/** Google Viewer “legacy” (às vezes funciona quando o de cima não renderiza) */
const toGViewLegacy = (u: string) =>
  `https://docs.google.com/viewer?embedded=1&url=${encodeURIComponent(u)}`;

export default function VisualizarPDFScreen() {
  const route = useRoute() as any;
  const navigation = useNavigation<any>();
  const { url: rawUrl } = (route.params || {}) as RouteParams;

  // normaliza a URL que veio da lista
  const baseUrl = useMemo(() => normalizeUrl(rawUrl || ''), [rawUrl]);

  // ordem de tentativas: direto → gview → gview legacy
  const sources = useMemo(() => {
    if (!baseUrl) return [];
    return [baseUrl, toGView(baseUrl), toGViewLegacy(baseUrl)];
  }, [baseUrl]);

  const [idx, setIdx] = useState(0);
  const tried = useRef(new Set<number>());

  useEffect(() => {
    setIdx(0);
    tried.current.clear();
  }, [baseUrl]);

  if (!baseUrl || sources.length === 0) {
    navigation.goBack();
    return null;
  }

  const current = sources[idx];

  const goNext = () => {
    tried.current.add(idx);
    const next = idx + 1;
    if (next < sources.length) setIdx(next);
    else navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <WebView
        source={{ uri: current }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loader}><ActivityIndicator size="large" color="#00BFFF" /></View>
        )}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
        mixedContentMode="always"
        androidLayerType={Platform.OS === 'android' ? 'hardware' : undefined}
        scalesPageToFit={false}
        onHttpError={goNext}
        onError={goNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
