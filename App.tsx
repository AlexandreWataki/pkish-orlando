// src/App.tsx
import { LogBox } from 'react-native';

// 🔕 Ignorar warning globalmente (logo no início, antes de qualquer outro import)
LogBox.ignoreLogs([
  'setLayoutAnimationEnabledExperimental', // substring ampla
  'no-op in the New Architecture',         // reforço para pegar qualquer quebra de linha
]);

import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ParkisheiroProvider } from '@/contexts/ParkisheiroContext';
import { AuthProvider } from '@/contexts/AuthContext';

// telas de login
import SplashScreen from '@/screens/login/SplashScreen';
import InicioScreen from '@/screens/login/InicioScreen';
import LoginScreen from '@/screens/login/LoginScreen';
import CadastroScreen from '@/screens/login/CadastroScreen';

// início/fluxo principal
import MenuPrincipal from '@/screens/inicio/MenuPrincipal';
import TelaDefinirQuantidadeDias from '@/screens/inicio/TelaDefinirQuantidadeDias';
import TelaDefinirTiposDias from '@/screens/inicio/TelaDefinirTiposDias';
import TelaDistribuirDias from '@/screens/inicio/TelaDistribuirDias';
import TelaAeroportoHotel from '@/screens/inicio/TelaAeroportoHotel';

// mídias
import TelaAtracoes from '@/logic/media/TelaAtracoes';
import TelaRefeicoes from '@/logic/menu/TelaRefeicoes';

// perfis
import PerfilRefeicoesScreen from '@/screens/perfis/PerfilRefeicoes';
import PerfilDescansoPorDiaScreen from '@/screens/perfis/PerfilDescansoPorDiaScreen';
import PerfilComprasPorDiaScreen from '@/screens/perfis/PerfilComprasPorDiaScreen';
import PerfilAtracoesScreen from '@/screens/perfis/PerfilAtracoesScreen';

// dias
import DiaDetalheScreen from '@/screens/dias/DiaDetalheScreen';

// 🛍️ Clube de Vantagens / Promoções (nova)
import PromocoesScreen from '@/IA/PromocoesScreen';

// ▶️ player de YouTube
import YouTubePlayerScreen from '@/logic/media/YouTubePlayerScreen';

// 🧾 WebView para cardápio
import MenuWebScreen from '@/logic/menu/MenuWebScreen';

import { enableLayoutAnimationAndroidLegacy } from '@/logic/types/enableLayoutAnimationAndroidLegacy';

// 🔇 Desabilitar logs em produção
if (!__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error = () => {};
}

export type Turnos = { manha: string[]; tarde: string[]; noite: string[] };

export type RootStackParamList = {
  // Splash / Auth
  Splash: undefined;
  Inicio: undefined;
  Login: undefined;
  Cadastro: undefined;

  // App principal
  MenuPrincipal: undefined;
  Calendario: undefined;
  TiposdeDias: undefined;
  DistribuicaodeDias: undefined;
  'Aeroporto&Hotel': undefined;

  // Conteúdo
  TelaAtracoes: undefined;
  TelaRefeicoes: undefined;

  // Perfis
  PerfilComprasPorDiaScreen: undefined;
  PerfilDescansoPorDiaScreen: undefined;
  PerfilAtracoes: undefined;
  PerfilRefeicoes: undefined;

  // Dias
  DiaCompleto: { diaId?: string } | undefined;

  // 🛍️ Promoções
  Promocoes: undefined;

  // Mídia/Web
  YouTubePlayer: { title?: string; idOrUrl: string };
  MenuWeb: { url: string; title?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    // Habilita LayoutAnimation apenas quando seguro (Android legado)
    enableLayoutAnimationAndroidLegacy();
  }, []);

  return (
    <AuthProvider>
      <ParkisheiroProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerBackVisible: true,
              ...(Platform.OS !== 'web' && { headerBackTitleVisible: false }),
              headerShown: false,
            }}
          >
            {/* Fluxo de splash/autenticação */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Inicio" component={InicioScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />

            {/* App */}
            <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
            <Stack.Screen name="Calendario" component={TelaDefinirQuantidadeDias} />
            <Stack.Screen name="TiposdeDias" component={TelaDefinirTiposDias} />
            <Stack.Screen name="DistribuicaodeDias" component={TelaDistribuirDias} />
            <Stack.Screen name="Aeroporto&Hotel" component={TelaAeroportoHotel} />
            <Stack.Screen name="TelaAtracoes" component={TelaAtracoes} />
            <Stack.Screen name="TelaRefeicoes" component={TelaRefeicoes} />

            {/* Perfis */}
            <Stack.Screen name="PerfilComprasPorDiaScreen" component={PerfilComprasPorDiaScreen} />
            <Stack.Screen name="PerfilDescansoPorDiaScreen" component={PerfilDescansoPorDiaScreen} />
            <Stack.Screen name="PerfilAtracoes" component={PerfilAtracoesScreen} />
            <Stack.Screen name="PerfilRefeicoes" component={PerfilRefeicoesScreen} />

            {/* Dias */}
            <Stack.Screen name="DiaCompleto" component={DiaDetalheScreen} />

            {/* 🛍️ Clube de Vantagens / Promoções */}
            <Stack.Screen name="Promocoes" component={PromocoesScreen} />

            {/* ▶️ Vídeo YouTube */}
            <Stack.Screen
              name="YouTubePlayer"
              component={YouTubePlayerScreen}
              options={{ headerShown: false }}
            />

            {/* 🧾 Cardápio (WebView) */}
            <Stack.Screen
              name="MenuWeb"
              component={MenuWebScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ParkisheiroProvider>
    </AuthProvider>
  );
}
