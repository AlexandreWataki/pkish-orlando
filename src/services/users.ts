// src/services/users.ts
import { env } from "@/config/env";

type LoginGoogleResponse = {
  ok: boolean;
  token?: string;
  user?: any;
  error?: string;
};

export async function loginWithGoogle(idToken: string): Promise<LoginGoogleResponse> {
  const url = `${env.apiUrl}/auth/google`;
  console.log("[loginWithGoogle] POST", url);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const text = await res.text();
  console.log("[loginWithGoogle] raw:", res.status, text);

  let data: LoginGoogleResponse;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Resposta não é JSON (${res.status})`);
  }

  if (!res.ok || !data.ok) {
    throw new Error(data.error || `Falha no login Google (${res.status})`);
  }

  return data;
}
