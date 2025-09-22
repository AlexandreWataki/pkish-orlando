// src/logic/exportar/salvarPerfis.ts
import { Platform } from 'react-native';

export const perfisWeb: Record<string, string[]> = {}; // âœ… agora estÃ¡ exportado

export async function salvarPerfis(tipo: string, opcoes: string[]) {
  if (Platform.OS === 'web') {
    perfisWeb[tipo] = opcoes;
    console.warn(`âš ï¸ [WEB] Perfil '${tipo}' salvo em memÃ³ria:`, opcoes);
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
  console.log(`âœ… Perfil '${tipo}' salvo com sucesso em: ${caminho}`);
}
