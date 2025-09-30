// src/screens/login/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StatusBar, Platform, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

const MIN_SPLASH_MS = 900; // tempo mínimo do splash

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const { user, loading } = useAuth();
  const mountedAtRef = useRef<number>(Date.now());
  const navigatedRef = useRef(false);

  useEffect(() => {
    if (loading || navigatedRef.current) return;

    const next = user ? 'MenuPrincipal' : 'Inicio';
    const elapsed = Date.now() - mountedAtRef.current;
    const wait = Math.max(0, MIN_SPLASH_MS - elapsed);

    const t = setTimeout(() => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;
      navigation.reset({ index: 0, routes: [{ name: next }] });
    }, wait);

    return () => clearTimeout(t);
  }, [loading, user, navigation]);

  // Failsafe opcional: se ficar "loading" por muito tempo, cai no Inicio
  useEffect(() => {
    const t = setTimeout(() => {
      if (!navigatedRef.current && loading) {
        navigatedRef.current = true;
        navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
      }
    }, 5000);
    return () => clearTimeout(t);
  }, [loading, navigation]);

  return (
  <LinearGradient
    colors={[
      '#0077cc', // azul piscina
      '#00c5d4', // turquesa
      '#f5deb3', // areia clara
      '#ffffff', // branco normal
      '#ffffff', // branco final (rasinho bem claro)
    ]}
    locations={[0, 0.3, 0.6, 0.85, 1]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.container}
  >
  
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.center}>
        <Image source={require('@/assets/imagens/logo4.png')} style={styles.logo} resizeMode="contain" />
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 20 : 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  logo: { width: 180, height: 120 },
});
