import { env } from "@/config/env";

/**
 * 🔹 Login com Google — envia idToken para o backend (/auth/google)
 * O backend valida o token, cria/atualiza o usuário e retorna { ok, token, user }.
 */
export async function loginWithGoogle(idToken: string) {
  try {
    const res = await fetch(`${env.apiUrl}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Erro no login Google");

    return data; // { ok, token, user }
  } catch (err) {
    console.error("⚠️ Falha ao logar com Google:", err);
    throw err;
  }
}
