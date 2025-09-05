// src/screens/login/LoginScreen.tsx
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
import { api } from '@/services/api';

import logo from '../../assets/imagens/logo4.png';
import frase from '../../assets/imagens/frase.png';

const LARGURA_CARD = 240;
const PADDING_VERTICAL = 12;
const FONTE_PADRAO = 12;

// credencial pronta (demo)
const DEMO_USER = { username: 'fatec', password: '123' };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { markVisited } = useParkisheiro();
  const { signIn } = useAuth();

  const [emailOuUser, setEmailOuUser] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    markVisited('LoginScreen');
  }, []);

  const entrarComoDemo = async () => {
    try {
      setLoading(true);
      await signIn({ username: DEMO_USER.username });
      navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (loading) return;

    const input = emailOuUser.trim();
    const senhaOk = senha.trim();

    if (!input || !senhaOk) {
      Alert.alert('Erro', 'Preencha usuário/e-mail e senha.');
      return;
    }

    // Atalho demo
    if (input.toLowerCase() === DEMO_USER.username && senhaOk === DEMO_USER.password) {
      await entrarComoDemo();
      return;
    }

    setLoading(true);
    try {
      const r = await api.login(input, senhaOk);

      if (!r.ok) {
        const { code, status, message } = r.error;
        if (code === 'HTTP_401') {
          Alert.alert('Credenciais inválidas', 'Usuário ou senha incorretos.');
          return;
        }
        if (code === 'NETWORK') {
          Alert.alert('Falha de rede', 'Não foi possível conectar ao servidor.');
          return;
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Tempo esgotado', 'Servidor demorou a responder.');
          return;
        }
        Alert.alert('Erro', message || (status ? `Erro HTTP ${status}` : 'Falha no login.'));
        return;
      }

      // Sucesso
      const { token, user } = r.data;
      const usernameFinal = user?.username ?? user?.email ?? input;
      await signIn({ username: usernameFinal, token });
      navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('401')) {
        Alert.alert('Credenciais inválidas', 'Usuário ou senha incorretos.');
      } else if (msg.toLowerCase().includes('network')) {
        Alert.alert('Falha de rede', 'Não foi possível conectar ao servidor.');
      } else {
        Alert.alert('Erro', msg || 'Não foi possível entrar. Tente novamente.');
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
          placeholder="Email ou usuário"
          value={emailOuUser}
          onChangeText={setEmailOuUser}
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
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setMostrarSenha((v) => !v)}>
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
          <Ionicons name="log-in" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {__DEV__ && (
          <TouchableOpacity
            style={styles.buttonDemo}
            onPress={entrarComoDemo}
            activeOpacity={0.9}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Demo (fatec / 123)</Text>
            <Ionicons name="flash" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={irCadastro}
          activeOpacity={0.9}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Ir para Cadastro</Text>
          <Ionicons name="person-add" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTertiary}
          onPress={voltarInicio}
          activeOpacity={0.9}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Voltar ao Início</Text>
          <Ionicons name="arrow-back" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      <Image source={frase} style={styles.frase} resizeMode="contain" />

      <View style={styles.bottomContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
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
  buttonDemo: {
    width: LARGURA_CARD,
    backgroundColor: '#2f855a',
    borderRadius: 10,
    paddingVertical: PADDING_VERTICAL,
    alignItems: 'center',
    marginTop: 8,
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
