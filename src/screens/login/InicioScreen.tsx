import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/imagens/logo4.png';
import fraseImg from '../../assets/imagens/frase.png';

// 🔵 Padrões fixos (pedidos)
const PADRAO_LARGURA_BOTAO = 240;   // tamanho da "caixa azul"
const PADRAO_PADDING_VERTICAL = 12; // altura do botão
const PADRAO_FONT_SIZE = 14;        // tamanho do texto

export default function InicioScreen() {
  const navigation = useNavigation<any>();

  const irMenuPrincipal = () =>
    navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#add8e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Topo: Logo (não clicável) + Frase */}
      <View style={styles.topArea}>
        <Image source={logoImg} style={styles.logo} resizeMode="contain" />
        <Image source={fraseImg} style={styles.frase} resizeMode="contain" />
      </View>

      {/* Botões (posicionados mais embaixo) */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Cadastro')}
          activeOpacity={0.9}
        >
          <Text style={styles.botaoTexto} allowFontScaling={false}>
            🎡 Quero ser Parkisheiro!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.9}
        >
          <Text style={styles.botaoTexto} allowFontScaling={false}>
            🏰 Já sou Parkisheiro!
          </Text>
        </TouchableOpacity>
      </View>

      {/* (selo/ticket removido) */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },

  /* Topo */
  topArea: {
    alignItems: 'center',
    marginTop: 64,
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 170,
    marginBottom: 8,
  },
  frase: {
    width: '100%',
    height: 250,
    marginBottom: 8,
  },

  /* Botões posicionados para baixo */
  botoesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 110, // desce os botões agora que o selo saiu
    alignItems: 'center',
    gap: 10,
  },
  botao: {
    backgroundColor: '#007acc',
    paddingVertical: PADRAO_PADDING_VERTICAL,
    borderRadius: 10,
    width: PADRAO_LARGURA_BOTAO,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: PADRAO_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
