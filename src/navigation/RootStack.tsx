// src/navigation/RootStack.tsx
import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas principais (import direto evita require cycles)
import MenuPrincipal from '@/screens/inicio/MenuPrincipal';

// 🎥 Tela de vídeo
import YouTubePlayerScreen from '@/logic/media/YouTubePlayerScreen';

// 🧾 WebView de cardápio
import MenuWebScreen from '@/logic/menu/MenuWebScreen';

// 🍽️ Tela de refeições
import TelaRefeicoes from '@/logic/menu/TelaRefeicoes';

/** Tipagem das rotas internas do App (stack logado) */
export type RootStackParamList = {
  MenuPrincipal: undefined;
  TelaRefeicoes: undefined;
  YouTubePlayer: { title?: string; idOrUrl: string };
  MenuWeb: { url: string; title?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="MenuPrincipal"
      screenOptions={{
        headerShown: false,
        // evita botão "Back" com texto no iOS antigo
        ...(Platform.OS !== 'web' && { headerBackTitleVisible: false }),
        // animação padrão mais suave
        animation: Platform.OS === 'android' ? 'slide_from_right' : 'default',
        // performance
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
      <Stack.Screen name="TelaRefeicoes" component={TelaRefeicoes} />
      <Stack.Screen name="YouTubePlayer" component={YouTubePlayerScreen} />
      <Stack.Screen name="MenuWeb" component={MenuWebScreen} />
    </Stack.Navigator>
  );
}
