ï»¿// src/logic/exportar/salvarPerfis.ts
import { Platform } from 'react-native';

export const perfisWeb: Record<string, string[]> = {}; // Ã¢Å“â€¦ agora estÃƒÂ¡ exportado

export async function salvarPerfis(tipo: string, opcoes: string[]) {
  if (Platform.OS === 'web') {
    perfisWeb[tipo] = opcoes;
    console.warn(`Ã¢Å¡Â Ã¯Â¸Â [WEB] Perfil '${tipo}' salvo em memÃƒÂ³ria:`, opcoes);
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
  console.log(`Ã¢Å“â€¦ Perfil '${tipo}' salvo com sucesso em: ${caminho}`);
}
