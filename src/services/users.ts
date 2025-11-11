import { env } from "@/config/env";

type User = {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
};

/**
 * 🔹 Tenta sincronizar usuário Google (requisição ao backend)
 * Se o backend não tiver a rota /users/upsert, ignora com segurança.
 */
export async function syncGoogleUser(profile: User) {
  try {
    const res = await fetch(`${env.apiUrl}/users/upsert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    // se o backend não tiver essa rota, retorna resposta simulada
    if (!res.ok) {
      console.warn("⚠️ /users/upsert não encontrado, usando fallback local");
      return {
        id: profile.sub || `google-${Date.now()}`,
        name: profile.name || "Usuário Google",
        email: profile.email || "",
        picture: profile.picture || "",
      };
    }

    const data = await res.json();
    return data?.user;
  } catch (err) {
    console.warn("⚠️ Falha ao sincronizar Google user:", err);
    return {
      id: profile.sub || `google-${Date.now()}`,
      name: profile.name || "Usuário Google",
      email: profile.email || "",
      picture: profile.picture || "",
    };
  }
}

/**
 * 🔸 Cria usuário anônimo (guest)
 * Se o backend não tiver /users/create-anon, cria localmente.
 */
export async function syncAnonymousUser(hint = "Guest") {
  try {
    const res = await fetch(`${env.apiUrl}/users/create-anon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hint }),
    });

    // fallback se a rota não existir
    if (!res.ok) {
      console.warn("⚠️ /users/create-anon não encontrado, criando guest local");
      return { id: `guest-${Date.now()}`, name: `Visitante ${hint}` };
    }

    const data = await res.json();
    return data?.user;
  } catch (err) {
    console.warn("⚠️ Falha ao criar visitante, seguindo offline:", err);
    return { id: `guest-${Date.now()}`, name: `Visitante ${hint}` };
  }
}
