// src/logic/exportar/salvarPerfis.ts
import { Platform } from 'react-native';

export const perfisWeb: Record<string, string[]> = {}; // ✅ agora está exportado

export async function salvarPerfis(tipo: string, opcoes: string[]) {
  if (Platform.OS === 'web') {
    perfisWeb[tipo] = opcoes;
    console.warn(`⚠️ [WEB] Perfil '${tipo}' salvo em memória:`, opcoes);
    return;
  }

  const FileSystem = require('expo-file-system');
  const pasta = `${FileSystem.documentDirectory}perfis`;

  const existe = await FileSystem.getInfoAsync(pasta);
  if (!existe.exists) {
    await FileSystem.makeDirectoryAsync(pasta, { intermediates: true });
  }

  const caminho = `${pasta}/${tipo}.json`;
  await FileSystem.writeAsStringAsync(caminho, JSON.stringify(opcoes, null, 2));
  console.log(`✅ Perfil '${tipo}' salvo com sucesso em: ${caminho}`);
}
