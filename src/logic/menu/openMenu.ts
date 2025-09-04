// src/logic/menu/openMenu.ts
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/RootStack';

type Nav = NavigationProp<RootStackParamList, 'MenuWeb'>;

function ensureHttps(raw: string) {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function getHost(u: string) {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; }
}

function mustOpenExternally(url: string) {
  const host = getHost(url);
  // Inclui Instagram e domínios Meta que podem ser usados no login
  const blockedHosts = [
    'instagram.com',
    'm.instagram.com',
    'facebook.com',
    'm.facebook.com',
    'fb.com',
    'meta.com',
    'accountscenter.facebook.com',
    'accountscenter.instagram.com',
  ];
  return blockedHosts.includes(host);
}

export async function openMenu(
  navigation: Nav,
  item: { title?: string; menuUrl?: string }
): Promise<void> {
  try {
    const finalUrl = ensureHttps(item.menuUrl || '');
    if (!finalUrl) {
      Alert.alert('Cardápio indisponível', 'Nenhum link foi informado.');
      return;
    }

    if (mustOpenExternally(finalUrl)) {
      // Abre em Custom Tabs / SFSafariViewController (mais compatível com login)
      await WebBrowser.openBrowserAsync(finalUrl, {
        showTitle: true,
        toolbarColor: '#000000',
        presentationStyle: 'pageSheet',
      });
      return;
    }

    // Demais links: abre na tela interna
    navigation.navigate('MenuWeb', { url: finalUrl, title: item.title ?? 'Menu' });
  } catch {
    Alert.alert('Erro ao abrir o link', 'Tente novamente mais tarde.');
  }
}
