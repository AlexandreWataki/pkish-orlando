import AsyncStorage from '@react-native-async-storage/async-storage';

const GLOBAL_KEY = 'OPENAI_KEY';
const USER_PREFIX = 'OPENAI_KEY:';

export async function setApiKey(key: string, userId?: string) {
  const trimmed = key.trim();
  if (!trimmed) throw new Error('API Key vazia');
  if (userId) await AsyncStorage.setItem(`${USER_PREFIX}${userId}`, trimmed);
  else await AsyncStorage.setItem(GLOBAL_KEY, trimmed);
}

export async function getApiKey(userId?: string): Promise<string | null> {
  if (userId) {
    const userKey = await AsyncStorage.getItem(`${USER_PREFIX}${userId}`);
    if (userKey) return userKey;
  }
  return (await AsyncStorage.getItem(GLOBAL_KEY)) ?? null;
}

export async function removeApiKey(userId?: string) {
  if (userId) await AsyncStorage.removeItem(`${USER_PREFIX}${userId}`);
  else await AsyncStorage.removeItem(GLOBAL_KEY);
}
