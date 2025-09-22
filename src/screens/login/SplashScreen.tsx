ï»¿import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Inicio');
    }, 1200); // Ã¢ÂÂ±Ã¯Â¸Â 1.2 segundos
    return () => clearTimeout(timeout);
  }, []);

  return (
   <LinearGradient
  colors={['#0077cc', '#00bfff', '#add8e6']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.container}
>

      <View style={styles.content}>
        <Image
          source={require('@/assets/imagens/logo4.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Ã°Å¸â€â€ž Spinner reduzido para 2/3 */}
        <ActivityIndicator
          size="large"
          color="#fff"
          style={[styles.loading, { transform: [{ scale: 2 }] }]} // 3 Ã¢â€ â€™ 2
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,    // 300 * 2/3
    height: 134,   // 200 * 2/3
    marginBottom: 20, // 30 * 2/3
  },
  loading: {
    marginTop: 7,  // 10 * 2/3
  },
});
