﻿ï»¿// src/navigation/RootStack.tsx
import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas principais (import direto evita require cycles)
import MenuPrincipal from '@/screens/inicio/MenuPrincipal';

// Ã°Å¸Å½Â¥ Tela de vÃƒÂ­deo
import YouTubePlayerScreen from '@/logic/media/YouTubePlayerScreen';

// Ã°Å¸Â§Â¾ WebView de cardÃƒÂ¡pio
import MenuWebScreen from '@/logic/menu/MenuWebScreen';

// Ã°Å¸ÂÂ½Ã¯Â¸Â Tela de refeiÃƒÂ§ÃƒÂµes
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
        // evita botÃƒÂ£o "Back" com texto no iOS antigo
        ...(Platform.OS !== 'web' && { headerBackTitleVisible: false }),
        // animaÃƒÂ§ÃƒÂ£o padrÃƒÂ£o mais suave
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
