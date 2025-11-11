// src/services/usersApi.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { env } from "@/config/env";

const LAN_IP = "192.168.0.181";

function resolveBaseURL(): string {
  if (__DEV__ && Platform.OS === "android") {
    return "http://10.0.2.2:8080";
  }
  return `http://${LAN_IP}:8080`;
}

// ✅ Produção: usa env.apiUrl (Cloud Run); dev: resolveBaseURL()
const BASE_URL = env.apiUrl || resolveBaseURL();

export const usersApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// ✅ Interceptor para anexar o JWT salvo no AsyncStorage
usersApi.interceptors.request.use(async (config) => {
  try {
    const raw = await AsyncStorage.getItem("@user");
    if (raw) {
      const user = JSON.parse(raw);
      if (user?.jwtToken) {
        config.headers.Authorization = `Bearer ${user.jwtToken}`;
      }
    }
  } catch {
    // ignora erros silenciosamente
  }
  return config;
});

// ===== Tipagens =====
export type GoogleProfile = {
  sub: string;
  name?: string;
  email: string;
  picture?: string;
};

export type NeonUser = {
  id: string;
  sub?: string;
  name?: string;
  email: string;
  picture?: string;
  is_anonymous: boolean;
  created_at: string;
  last_login: string;
};

// ===== Endpoints =====
export async function health() {
  const { data } = await usersApi.get("/health");
  return data;
}

export async function upsertGoogleUser(profile: GoogleProfile): Promise<NeonUser> {
  const { data } = await usersApi.post("/users/upsert", profile);
  return data?.user;
}

export async function createAnonymous(hint?: string): Promise<NeonUser> {
  const { data } = await usersApi.post("/users/create-anon", { hint });
  return data?.user;
}
