ï»¿import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  idOrUrl: string;
  height?: number;
  autoplay?: boolean;
  onOpenExternal?: () => void;
};

function extractId(input?: string | null): string | null {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  try {
    const u = new URL(input);
    const v = u.searchParams.get('v');
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '');
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    const m1 = u.pathname.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
    if (m1?.[1]) return m1[1];
    const m2 = u.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    if (m2?.[1]) return m2[1];
  } catch {}
  const m = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function YouTubeViewCore({
  idOrUrl,
  height = 250,
  autoplay = true,
  onOpenExternal
}: Props) {
  const [mode, setMode] = useState<'embed' | 'nocookie' | 'external'>('embed');
  const [keyBump, setKeyBump] = useState(0);

  const videoId = useMemo(() => extractId(idOrUrl), [idOrUrl]);

  // iOS sÃƒÂ³ autoÃ¢â‚¬â€˜toca com mute=1; Android pode com mute=0
  const mute = autoplay && Platform.OS === 'ios' ? 1 : 0;

  const baseParams = useMemo(
    () =>
      `autoplay=${autoplay ? 1 : 0}&playsinline=1&rel=0&modestbranding=1&mute=${mute}&cc_load_policy=1&cc_lang_pref=pt&hl=pt-BR`,
    [autoplay, mute]
  );

  const embedUrl = useMemo(
    () => (videoId ? `https://www.youtube.com/embed/${videoId}?${baseParams}` : null),
    [videoId, baseParams]
  );

  const embedNoCookieUrl = useMemo(
    () => (videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?${baseParams}` : null),
    [videoId, baseParams]
  );

  useEffect(() => {
    if (!videoId) setMode('external');
  }, [videoId]);

  useEffect(() => {
    if (mode === 'external' && videoId) {
      Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`).catch(() => {});
      onOpenExternal?.();
    }
  }, [mode, videoId, onOpenExternal]);

  const failover = () => {
    setMode(m => (m === 'embed' ? 'nocookie' : 'external'));
    setKeyBump(k => k + 1);
  };

  const commonWebViewProps = {
    style: [styles.webview, { height }] as any,
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowsInlineMediaPlayback: true,
    mediaPlaybackRequiresUserAction: false,
    allowsFullscreenVideo: true,
    originWhitelist: ['*'],
    androidLayerType: 'hardware' as const,
    mixedContentMode: 'always' as const,
    setSupportMultipleWindows: false,
    javaScriptCanOpenWindowsAutomatically: false,
    onShouldStartLoadWithRequest: (req: any) =>
      /^(intent|vnd\.youtube|youtube:\/\/)/i.test(req.url) ? false : true,
    injectedJavaScript: `
      (function(){
        const report = () => {
          try {
            var t = document.title || '';
            if (/indispon[iÃƒÂ­]vel|unavailable|youtube/i.test(t)) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ err: 'unavailable', title: t }));
            }
          } catch(e){}
        };
        new MutationObserver(report).observe(document.querySelector('title')||document.documentElement,{childList:true,subtree:true});
        setTimeout(report, 700);
        true;
      })();
    `,
    onMessage: (e: any) => {
      try {
        const msg = JSON.parse(e.nativeEvent.data || "{}");
        if (msg?.err === 'unavailable') failover();
      } catch {}
    },
    onError: failover,
    onHttpError: failover,
    userAgent:
      'Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  };

  if (mode === 'external') return <View style={[styles.container, { height }]} />;

  return (
    <View style={styles.container}>
      {mode === 'embed' && embedUrl && (
        <WebView key={`embed-${keyBump}`} source={{ uri: embedUrl }} {...commonWebViewProps} />
      )}
      {mode === 'nocookie' && embedNoCookieUrl && (
        <WebView key={`nocookie-${keyBump}`} source={{ uri: embedNoCookieUrl }} {...commonWebViewProps} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  webview: { width: '100%' },
});
