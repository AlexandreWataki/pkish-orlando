// src/services/usersApi.ts
import axios from "axios";
import { Platform } from "react-native";

/**
 * ✅ IP local do seu computador na rede
 * (você achou pelo ipconfig → 192.168.0.181)
 */
const LAN_IP = "192.168.0.181";

function resolveBaseURL(): string {
  // Emulador Android
  if (__DEV__ && Platform.OS === "android") {
    return "http://10.0.2.2:8080";
  }
  // Celular físico / APK / iOS / Web (mesma rede)
  return `http://${LAN_IP}:8080`;
}

const BASE_URL = process.env.EXPO_PUBLIC_USERS_API_URL || resolveBaseURL();

export const usersApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

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

export async function health() {
  const { data } = await usersApi.get("/health");
  return data;
}

export async function upsertGoogleUser(profile: GoogleProfile): Promise<NeonUser> {
  const { data } = await usersApi.post("/users/upsert-google", profile);
  return data?.user;
}

export async function createAnonymous(hint?: string): Promise<NeonUser> {
  const { data } = await usersApi.post("/users/create-anon", { hint });
  return data?.user;
}
