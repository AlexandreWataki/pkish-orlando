ï»¿// src/App.tsx
import { LogBox } from 'react-native';

// Ã°Å¸â€â€¢ Ignorar warning globalmente (logo no inÃƒÂ­cio, antes de qualquer outro import)
LogBox.ignoreLogs([
  'setLayoutAnimationEnabledExperimental', // substring ampla
  'no-op in the New Architecture',         // reforÃƒÂ§o para pegar qualquer quebra de linha
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

// inÃƒÂ­cio/fluxo principal
import MenuPrincipal from '@/screens/inicio/MenuPrincipal';
import TelaDefinirQuantidadeDias from '@/screens/inicio/TelaDefinirQuantidadeDias';
import TelaDefinirTiposDias from '@/screens/inicio/TelaDefinirTiposDias';
import TelaDistribuirDias from '@/screens/inicio/TelaDistribuirDias';
import TelaAeroportoHotel from '@/screens/inicio/TelaAeroportoHotel';

// mÃƒÂ­dias
import TelaAtracoes from '@/logic/media/TelaAtracoes';
import TelaRefeicoes from '@/logic/menu/TelaRefeicoes';

// perfis
import PerfilRefeicoesScreen from '@/screens/perfis/PerfilRefeicoes';
import PerfilDescansoPorDiaScreen from '@/screens/perfis/PerfilDescansoPorDiaScreen';
import PerfilComprasPorDiaScreen from '@/screens/perfis/PerfilComprasPorDiaScreen';
import PerfilAtracoesScreen from '@/screens/perfis/PerfilAtracoesScreen';

// dias
import DiaDetalheScreen from '@/screens/dias/DiaDetalheScreen';

// Ã°Å¸â€ºÂÃ¯Â¸Â Clube de Vantagens / PromoÃƒÂ§ÃƒÂµes (nova)
import PromocoesScreen from '@/IA/PromocoesScreen';

// Ã¢â€“Â¶Ã¯Â¸Â player de YouTube
import YouTubePlayerScreen from '@/logic/media/YouTubePlayerScreen';

// Ã°Å¸Â§Â¾ WebView para cardÃƒÂ¡pio
import MenuWebScreen from '@/logic/menu/MenuWebScreen';

import { enableLayoutAnimationAndroidLegacy } from '@/logic/types/enableLayoutAnimationAndroidLegacy';

// Ã°Å¸â€â€¡ Desabilitar logs em produÃƒÂ§ÃƒÂ£o
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

  // ConteÃƒÂºdo
  TelaAtracoes: undefined;
  TelaRefeicoes: undefined;

  // Perfis
  PerfilComprasPorDiaScreen: undefined;
  PerfilDescansoPorDiaScreen: undefined;
  PerfilAtracoes: undefined;
  PerfilRefeicoes: undefined;

  // Dias
  DiaCompleto: { diaId?: string } | undefined;

  // Ã°Å¸â€ºÂÃ¯Â¸Â PromoÃƒÂ§ÃƒÂµes
  Promocoes: undefined;

  // MÃƒÂ­dia/Web
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
            {/* Fluxo de splash/autenticaÃƒÂ§ÃƒÂ£o */}
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

            {/* Ã°Å¸â€ºÂÃ¯Â¸Â Clube de Vantagens / PromoÃƒÂ§ÃƒÂµes */}
            <Stack.Screen name="Promocoes" component={PromocoesScreen} />

            {/* Ã¢â€“Â¶Ã¯Â¸Â VÃƒÂ­deo YouTube */}
            <Stack.Screen
              name="YouTubePlayer"
              component={YouTubePlayerScreen}
              options={{ headerShown: false }}
            />

            {/* Ã°Å¸Â§Â¾ CardÃƒÂ¡pio (WebView) */}
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
