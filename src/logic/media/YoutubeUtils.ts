// src/logic/media/youtubeUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as EntriesModule from './entries/indexEntries';

export type AttrLike = { id?: string; titulo?: string; parque?: string; regiao?: string };
export type Entry = { attrKey: string; titleKey: string; yt: string };

const EMBED_BASE = 'https://www.youtube.com/embed/';
const CACHE_PREFIX = '@yt:atr:';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

/* ============================================================
   NormalizaÃ§Ã£o e ID/URL Helpers
   ============================================================ */
export function normalize(s?: string | null): string {
  if (!s) return '';
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase();
}

export function toYouTubeId(input?: string | null): string | null {
  if (!input) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  const m = input.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export function toEmbedUrl(videoIdOrUrl: string): string {
  const id = toYouTubeId(videoIdOrUrl);
  return id
    ? `${EMBED_BASE}${id}?autoplay=1&playsinline=1&fs=1&rel=0&modestbranding=1&enablejsapi=1&origin=https://example.com`
    : videoIdOrUrl;
}

export function getYouTubeSearchUrl(q: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

/* ============================================================
   Static Map Lookup (manual entries)
   ============================================================ */
function collectAllEntries(mod: Record<string, unknown>): Entry[] {
  const buckets: Entry[][] = [];
  for (const value of Object.values(mod)) {
    if (Array.isArray(value) && value.length > 0) {
      const looksLikeEntries = value.every(
        (v) => v && typeof v === 'object' && 'attrKey' in v && 'titleKey' in v && 'yt' in v
      );
      if (looksLikeEntries) buckets.push(value as Entry[]);
    }
  }
  const maybeEntries = (mod as any).ENTRIES as Entry[] | undefined;
  if (buckets.length === 0 && Array.isArray(maybeEntries)) return maybeEntries;
  return buckets.flat();
}

const ALL_ENTRIES: Entry[] = collectAllEntries(EntriesModule);

const YT_BY_ATTR_ID: Record<string, string> = Object.fromEntries(
  ALL_ENTRIES.map((e) => [e.attrKey, e.yt])
);
const YT_BY_TITLE: Record<string, string> = Object.fromEntries(
  ALL_ENTRIES.map((e) => [e.titleKey, e.yt])
);

export function getVideoIdOrUrlFromMap(atr: AttrLike): string | null {
  if (atr?.id && YT_BY_ATTR_ID[atr.id]) return YT_BY_ATTR_ID[atr.id];
  const keyTitle = normalize(atr?.titulo);
  const keyParque = normalize(atr?.parque);
  const composed = keyParque && keyTitle ? `${keyParque}_${keyTitle}` : keyTitle;
  if (composed && YT_BY_TITLE[composed]) return YT_BY_TITLE[composed];
  if (keyTitle && YT_BY_TITLE[keyTitle]) return YT_BY_TITLE[keyTitle];
  return null;
}

export function getVideoUrlFromMap(atr: AttrLike): string | null {
  const found = getVideoIdOrUrlFromMap(atr);
  return found ? toEmbedUrl(found) : null;
}

/* ============================================================
   Cache helpers (AsyncStorage)
   ============================================================ */
function cacheKey(a: AttrLike) {
  const titulo = normalize(a.titulo);
  const parque = normalize(a.parque);
  const regiao = normalize(a.regiao);
  return `${CACHE_PREFIX}${parque}:${titulo}:${regiao}`;
}

async function getFromCache(key: string): Promise<string | null> {
  try {
    const val = await AsyncStorage.getItem(key);
    if (!val) return null;
    const obj: { url: string; ts: number } = JSON.parse(val);
    if (!obj?.url || !obj?.ts) return null;
    if (Date.now() - obj.ts > CACHE_TTL_MS) {
      AsyncStorage.removeItem(key).catch(() => {});
      return null;
    }
    return obj.url;
  } catch {
    return null;
  }
}

async function saveToCache(key: string, url: string) {
  const payload = { url, ts: Date.now() };
  try {
    await AsyncStorage.setItem(key, JSON.stringify(payload));
  } catch {}
}

function buildQuery(a: AttrLike) {
  const parts = [a.titulo ?? '', a.parque ?? '', a.regiao ?? '', 'ride POV'];
  return parts.filter(Boolean).join(' ').trim();
}

async function fetchWithTimeout(url: string, ms = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

/** Busca vÃ­deo do YouTube via API oficial (embed url preferencial) */
export async function searchYouTubeForAttraction(
  a: AttrLike,
  apiKey: string
): Promise<string | null> {
  try {
    if (!apiKey) return null;
    const key = cacheKey(a);
    const cached = await getFromCache(key);
    if (cached) return cached;

    const q = buildQuery(a);
    if (!q) return null;

    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: '5',
      order: 'relevance',
      q,
      key: apiKey,
      videoEmbeddable: 'true',
      videoSyndicated: 'true',
      relevanceLanguage: 'pt-BR',
      regionCode: 'BR',
      safeSearch: 'none',
      fields: 'items(id/videoId,snippet/title)',
    });

    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;

    const json = await res.json();
    const items: Array<{ id?: { videoId?: string } }> = json?.items ?? [];
    const firstId = items.find((it) => it?.id?.videoId)?.id?.videoId;
    if (!firstId) return null;

    const embedUrl = toEmbedUrl(firstId);
    await saveToCache(key, embedUrl);
    return embedUrl;
  } catch {
    return null;
  }
}
