// src/logic/exportar/salvarPerfis.ts
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USUARIO_ATUAL_KEY } from '@/contexts/ParkisheiroContext';
import { Parkisheiro } from '@/logic/types/parkisheiro';

export const perfisWeb: Record<string, any> = {};

type PerfilTipo = 'viagem' | 'atracoes' | 'compras' | 'descanso' | 'refeicoes';

export async function salvarPerfis(tipo: PerfilTipo, respostas: any) {
  try {
    let dadosParaSalvar: any = respostas;

    // ðŸŒŸ Ajuste inteligente para lidar com strings ou array de strings
    if (['refeicoes', 'descanso', 'compras', 'viagem', 'atracoes'].includes(tipo)) {
      if (typeof respostas === 'string') {
        dadosParaSalvar = { perfil: respostas };
      } else if (Array.isArray(respostas) && typeof respostas[0] === 'string') {
        // Se for um array como ["ðŸŽ¢ Radicais"]
        const nome = respostas[0];
        dadosParaSalvar = {
          perfil: nome.replace(/[^a-zA-Z]/g, '').toLowerCase(),
          nome: nome,
          icone: nome.charAt(0),
        };
      }
    }

    // ðŸ’¾ Salvar em arquivo (apenas no mobile)
    if (Platform.OS === 'web') {
      perfisWeb[tipo] = dadosParaSalvar;
      console.warn(`âš ï¸ [WEB] Perfil '${tipo}' salvo em memÃ³ria:`, dadosParaSalvar);
    } else {
      const nomeArquivo = `${tipo}.json`;
      const pasta = `${FileSystem.documentDirectory}perfis`;
      const pastaExiste = await FileSystem.getInfoAsync(pasta);
      if (!pastaExiste.exists) {
        await FileSystem.makeDirectoryAsync(pasta, { intermediates: true });
      }
      const caminho = `${pasta}/${nomeArquivo}`;
      await FileSystem.writeAsStringAsync(caminho, JSON.stringify(dadosParaSalvar, null, 2));
      console.log(`âœ… Perfil '${tipo}' salvo com sucesso em:`, caminho);
    }

    // ðŸ§  Salvar em AsyncStorage
    const json = await AsyncStorage.getItem(USUARIO_ATUAL_KEY);
    if (json) {
      const usuario: Parkisheiro = JSON.parse(json);
      usuario.perfis = {
        ...(usuario.perfis || {}),
        [tipo]: dadosParaSalvar,
      };
      await AsyncStorage.setItem(USUARIO_ATUAL_KEY, JSON.stringify(usuario));

      if (Platform.OS === 'web') {
        const event = new Event('recarregar-parkisheiro');
        (globalThis as any).dispatchEvent?.(event);
      }
    }
  } catch (error) {
    console.error(`âŒ Erro ao salvar perfil '${tipo}':`, error);
  }
}
