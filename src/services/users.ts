// src/services/users.ts
import { Alert } from "react-native";
import { env } from "@/config/env";

type UpsertBody = {
  sub?: string | null;
  email?: string | null;
  name?: string | null;
  picture?: string | null;
};

type AnyUser = {
  id?: string;
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
  isGuest?: boolean;
};

/** Faz uma requisição JSON ao backend */
async function httpJSON<T = any>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${env.apiUrl}${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`❌ HTTP ${res.status} ${res.statusText}:`, text);
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return res.json();
}

/** 🔹 Sincroniza um perfil Google (já decodificado) com o Neon */
export async function syncGoogleUser(profile: UpsertBody) {
  const payload: UpsertBody = {
    sub: profile.sub ?? null,
    email: profile.email ?? null,
    name: profile.name ?? null,
    picture: profile.picture ?? null,
  };

  try {
    const data = await httpJSON<{ ok: boolean; user: AnyUser }>(
      "/users/upsert-google",
      payload
    );
    console.log("✅ Google salvo no Neon:", data.user?.email || data.user?.name);
    return data.user;
  } catch (e: any) {
    console.warn("⚠️ syncGoogleUser erro:", e?.message || e);
    throw e;
  }
}

/** 🔸 Cria ou retorna um usuário convidado (não trava se falhar) */
export async function syncAnonymousUser(hint?: string) {
  try {
    const data = await httpJSON<{ ok: boolean; user: AnyUser }>(
      "/users/create-anon",
      { hint: hint || "Guest" }
    );
    console.log("🟢 Usuário convidado criado:", data.user?.id);
    return data.user;
  } catch (e: any) {
    console.warn("syncAnonymousUser erro:", e?.message || e);
    // não propaga erro, para não impedir a navegação
    return null;
  }
}

/** 🔸 Decide automaticamente entre Google e anônimo */
export async function syncUser(u: AnyUser) {
  if (u?.sub || u?.email) {
    try {
      return await syncGoogleUser({
        sub: u.sub ?? null,
        email: u.email ?? null,
        name: u.name ?? null,
        picture: u.picture ?? null,
      });
    } catch {
      return null; // falhou Neon, mas não quebra app
    }
  }
  return syncAnonymousUser("Guest");
}

export const UsersAPI = { API_BASE: env.apiUrl };
