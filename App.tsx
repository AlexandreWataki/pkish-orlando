// src/App.tsx
import { LogBox, Platform } from 'react-native';

// 🔕 Ignorar warnings chatos
LogBox.ignoreLogs([
  'setLayoutAnimationEnabledExperimental',
  'no-op in the New Architecture',
]);

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ParkisheiroProvider } from '@/contexts/ParkisheiroContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; // ✅ useAuth

// ── Splash / Inicio
import SplashScreen from '@/screens/login/SplashScreen';
import InicioScreen from '@/screens/login/InicioScreen';

// ── Fluxo principal
import MenuPrincipal from '@/screens/inicio/MenuPrincipal';
import TelaDefinirQuantidadeDias from '@/screens/inicio/TelaDefinirQuantidadeDias';
import TelaDefinirTiposDias from '@/screens/inicio/TelaDefinirTiposDias';
import TelaDistribuirDias from '@/screens/inicio/TelaDistribuirDias';
import TelaAeroportoHotel from '@/screens/inicio/TelaAeroportoHotel';

// ── Conteúdo / Lógicas
import TelaAtracoes from '@/logic/media/TelaAtracoes';
import TelaRefeicoes from '@/logic/menu/TelaRefeicoes';

// ── Perfis
import PerfilRefeicoesScreen from '@/screens/perfis/PerfilRefeicoes';
import PerfilDescansoPorDiaScreen from '@/screens/perfis/PerfilDescansoPorDiaScreen';
import PerfilComprasPorDiaScreen from '@/screens/perfis/PerfilComprasPorDiaScreen';
import PerfilAtracoesScreen from '@/screens/perfis/PerfilAtracoesScreen';

// ── Dias
import DiaDetalheScreen from '@/screens/dias/DiaDetalheScreen';

// 🛍️ Clube de Vantagens
import PromocoesScreen from '@/IA/PromocoesScreen';

// ▶️ Player YouTube
import YouTubePlayerScreen from '@/logic/media/YouTubePlayerScreen';

// 🧾 WebView cardápio
import MenuWebScreen from '@/logic/menu/MenuWebScreen';

// 📑 PDFs dos Parques
import ParquesPDFScreen from '@/screens/parquesPDF/ParquesPDFScreen';
import VisualizarPDFScreen from '@/screens/parquesPDF/VisualizarPDFScreen';

import { enableLayoutAnimationAndroidLegacy } from '@/logic/types/enableLayoutAnimationAndroidLegacy';

// 🔷 Barra de navegação Android branca
import * as NavigationBar from 'expo-navigation-bar';

if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

export type Turnos = { manha: string[]; tarde: string[]; noite: string[] };

export type RootStackParamList = {
  // Splash / Auth
  Splash: undefined;
  Inicio: undefined;

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

  // 📑 PDFs dos Parques
  ParquesPDF: undefined;
  VisualizarPDF: { title: string; url: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Decide rota inicial:
 * - enquanto `loading` -> Splash
 * - se `user` existe -> MenuPrincipal
 * - senão -> Inicio (com botão Google)
 */
function RootNavigator() {
  const { user, loading } = useAuth(); // ✅ sem useContext(AuthContext)

  if (loading) {
    return <SplashScreen />;
  }

  // remonta navigator ao mudar estado de auth
  const navigatorKey = user ? 'auth' : 'guest';

  return (
    <Stack.Navigator
      key={navigatorKey}
      initialRouteName={user ? 'MenuPrincipal' : 'Inicio'}
      screenOptions={{
        headerShown: false,
        ...(Platform.OS !== 'web' && { headerBackTitleVisible: false }),
      }}
    >
      {/* Fluxo Splash/Auth */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Inicio" component={InicioScreen} />

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

      {/* 🛍️ Promoções */}
      <Stack.Screen name="Promocoes" component={PromocoesScreen} />

      {/* ▶️ YouTube */}
      <Stack.Screen name="YouTubePlayer" component={YouTubePlayerScreen} />

      {/* 🧾 Cardápio */}
      <Stack.Screen name="MenuWeb" component={MenuWebScreen} />

      {/* 📑 PDFs dos Parques */}
      <Stack.Screen name="ParquesPDF" component={ParquesPDFScreen} />
      <Stack.Screen name="VisualizarPDF" component={VisualizarPDFScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    enableLayoutAnimationAndroidLegacy();
  }, []);

  // ▶️ Configura a barra de navegação Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#ffffff').catch(() => {});
      NavigationBar.setButtonStyleAsync('dark').catch(() => {});
    }
  }, []);

  return (
    <AuthProvider>
      <ParkisheiroProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ParkisheiroProvider>
    </AuthProvider>
  );
}
