ï»¿// src/screens/login/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  Image, StatusBar, Alert, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { useAuth } from '@/contexts/AuthContext';

import logo from '../../assets/imagens/logo4.png';
import frase from '../../assets/imagens/frase.png';

const LARGURA_CARD = 240;
const PADDING_VERTICAL = 12;
const FONTE_PADRAO = 12;

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { markVisited } = useParkisheiro();
  const { signIn } = useAuth(); // signIn(usernameOrEmail: string, senha: string)

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    markVisited('LoginScreen');
  }, []);

  const navegarHome = () =>
    navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });

  const handleLogin = async () => {
    if (loading) return;

    const userOk = usernameOrEmail.trim();
    const senhaOk = senha.trim();

    if (!userOk || !senhaOk) {
      Alert.alert('Erro', 'Preencha usuÃ¡rio/e-mail e senha.');
      return;
    }

    try {
      setLoading(true);
      await signIn(userOk, senhaOk);
      navegarHome();
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('401') || /incorret/i.test(msg)) {
        Alert.alert('Credenciais invÃ¡lidas', 'UsuÃ¡rio ou senha incorretos.');
      } else if (/network|fetch|timeout/i.test(msg)) {
        Alert.alert('Falha de rede', 'NÃ£o foi possÃ­vel conectar ao servidor.');
      } else {
        Alert.alert('Erro', msg || 'NÃ£o foi possÃ­vel entrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const irCadastro = () => navigation.navigate('Cadastro');
  const voltarInicio = () => navigation.navigate('Inicio');

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#add8e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.formWrapper}>
        <TextInput
          style={styles.input}
          placeholder="UsuÃ¡rio ou e-mail"
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          placeholderTextColor="#555"
          autoCapitalize="none"
          keyboardType="default"
        />

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginVertical: 0 }]}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#555"
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setMostrarSenha(v => !v)}>
            <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={20} color="#003e63" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          activeOpacity={0.9}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={irCadastro}
          activeOpacity={0.9}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Ir para Cadastro</Text>
          <Ionicons name="person-add-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTertiary}
          onPress={voltarInicio}
          activeOpacity={0.9}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Voltar ao InÃ­cio</Text>
          <Ionicons name="arrow-back-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      <Image source={frase} style={styles.frase} resizeMode="contain" />

      {/* Logo clicÃ¡vel para ir direto ao MenuPrincipal */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={navegarHome}
          activeOpacity={0.8}
          disabled={loading}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel="Ir para o menu principal"
        >
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 20 : 0, alignItems: 'center' },
  titleWrapper: { width: '100%', paddingHorizontal: 60, alignItems: 'flex-start', marginTop: 60 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  formWrapper: { marginTop: 0, alignItems: 'center' },
  input: {
    width: LARGURA_CARD,
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 15,
    marginVertical: 5,
    color: '#000',
    fontSize: FONTE_PADRAO,
  },
  inputRow: {
    width: LARGURA_CARD,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 5,
  },
  eyeBtn: { paddingHorizontal: 8, height: 44, justifyContent: 'center', alignItems: 'center' },
  button: {
    width: LARGURA_CARD,
    backgroundColor: '#007acc',
    borderRadius: 10,
    paddingVertical: PADDING_VERTICAL,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSecondary: {
    width: LARGURA_CARD,
    backgroundColor: '#005fa3',
    borderRadius: 10,
    paddingVertical: PADDING_VERTICAL,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTertiary: {
    width: LARGURA_CARD,
    backgroundColor: '#00497d',
    borderRadius: 10,
    paddingVertical: PADDING_VERTICAL,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: FONTE_PADRAO, fontWeight: 'bold' },
  frase: { width: '100%', height: 277, marginTop: 10 },
  bottomContainer: { position: 'absolute', left: 0, right: 0, bottom: 25, alignItems: 'flex-end', paddingRight: 20 },
  logo: { width: 96, height: 96 },
});
