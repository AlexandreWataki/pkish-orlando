// src/logic/clima/buscarclima.ts
import axios from 'axios';
import Constants from 'expo-constants';

export type DadosClimaSimplificado = {
  temp: string;
  condicao: string;
  icone: string;
  cidade: string;
};

const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

// Coordenadas seguras (evitam "No matching location found")
const CITY_COORDS: Record<string, string> = {
  orlando: '28.5383,-81.3792',
  'orlando, fl': '28.5383,-81.3792',
  'orlando, florida': '28.5383,-81.3792',
};

function getApiKey(): string | null {
  const fromEnv = process.env.EXPO_PUBLIC_WEATHER_API_KEY || process.env.WEATHER_API_KEY;
  if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.trim();

  const extra = (Constants?.expoConfig as any)?.extra ?? (Constants as any)?.manifest?.extra;
  const fromExtra = extra?.WEATHER_API_KEY;
  if (fromExtra && typeof fromExtra === 'string' && fromExtra.trim()) return fromExtra.trim();

  return null;
}

function normalizarIcone(url?: string): string {
  if (!url) return '';
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

async function chamarWeatherApi(key: string, q: string) {
  return axios.get(BASE_URL, {
    params: { key, q, lang: 'pt', aqi: 'no' },
    timeout: 8000,
  });
}

export async function buscarClima(
  cidade: string = 'Orlando'
): Promise<DadosClimaSimplificado | null> {
  const API_KEY = getApiKey();
  if (!API_KEY) {
    console.warn('⚠️ WEATHER_API_KEY ausente. Defina EXPO_PUBLIC_WEATHER_API_KEY no .env');
    return null;
  }

  // 1) Sanitiza e resolve para coordenadas quando conhecido
  const raw = typeof cidade === 'string' ? cidade.trim() : '';
  const base = raw || 'Orlando';
  const chave = base.toLowerCase();
  const q = CITY_COORDS[chave] ?? base; // usa coords se mapeado

  try {
    const { data } = await chamarWeatherApi(API_KEY, q);

    if (!data?.current || !data?.location) {
      console.warn('⚠️ Dados incompletos da WeatherAPI', data);
      return null;
    }

    const { temp_c, condition } = data.current;
    const icone = normalizarIcone(condition?.icon);

    return {
      temp: String(temp_c ?? 0),
      condicao: condition?.text ?? 'Desconhecido',
      icone,
      cidade: data.location?.name ?? base,
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const payload = error?.response?.data;
    const message = error?.message;

    console.error(`🌩️ Erro ao buscar clima para ${base}:`, { status, payload, message });
    return null;
  }
}
