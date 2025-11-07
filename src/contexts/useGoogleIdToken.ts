import { useGoogleIdTokenAuth } from "@/auth/useGoogleIdToken";

const { promptAsync } = useGoogleIdTokenAuth(
  async (idToken) => {
    await finishLogin(idToken);
    console.log("✅ Login Google OK");
  },
  (e) => {
    console.error("❌ Erro no login:", e);
    loginAsGuest();
  }
);

// Em vez de AuthSession.startAsync()
await promptAsync();
