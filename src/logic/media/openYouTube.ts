// src/logic/media/openYouTube.ts
import { Platform, Linking } from 'react-native';

function extractId(input: string) {
  // tenta várias formas: ?v=, youtu.be/, /embed/, /shorts/
  const direct = input.match(/^[A-Za-z0-9_-]{11}$/)?.[0];
  if (direct) return direct;

  try {
    const u = new URL(input);
    const v = u.searchParams.get('v');
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;

    const fromShorts = u.pathname.match(/\/shorts\/([A-Za-z0-9_-]{11})/)?.[1];
    if (fromShorts) return fromShorts;

    const fromEmbed = u.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/)?.[1];
    if (fromEmbed) return fromEmbed;

    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '');
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    // fallback regex pra strings que não são URL válidas
  }

  const m = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? input;
}

/** Abre no app do YouTube (Android/iOS) e, no Web, abre na aba atual (sem popup). */
export async function openYouTube(idOrUrl: string) {
  const id = extractId(idOrUrl);
  const isShorts = /shorts\/[A-Za-z0-9_-]{11}/.test(idOrUrl);
  const webUrl = `https://www.youtube.com/watch?v=${id}`;

  // WEB: navega na mesma aba (não bloqueia)
  if (Platform.OS === 'web') {
    window.location.assign(webUrl);
    return;
  }

  // MOBILE: tenta deep link do app
  const deepLinks = isShorts
    ? [`youtube://shorts/${id}`, `youtube://watch?v=${id}`, `vnd.youtube://${id}`]
    : [`youtube://watch?v=${id}`, `vnd.youtube://${id}`];

  for (const dl of deepLinks) {
    try {
      const can = await Linking.canOpenURL(dl);
      if (can) { await Linking.openURL(dl); return; }
    } catch {}
  }

  // Fallback: navegador
  await Linking.openURL(webUrl);
}
