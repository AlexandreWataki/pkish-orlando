ï»¿// src/screens/login/CadastroScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  StatusBar,
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

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function CadastroScreen() {
  const navigation = useNavigation<any>();
  const { markVisited } = useParkisheiro();
  const { signUp } = useAuth(); // assinatura: signUp(usernameOuEmail: string, senha: string)

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    markVisited('CadastroScreen');
  }, []);

  const formValido = useMemo(() => {
    const nomeOk = !!nome.trim();
    const emailOk = isEmail(email.trim().toLowerCase());
    const senhaOk = senha.trim().length >= 6;
    return nomeOk && emailOk && senhaOk;
  }, [nome, email, senha]);

  const navegarHome = () =>
    navigation.reset({ index: 0, routes: [{ name: 'MenuPrincipal' }] });

  const handleCadastro = async () => {
    if (loading) return;

    const nomeOk = nome.trim();
    const emailOk = email.trim().toLowerCase(); // usaremos como username
    const senhaOk = senha.trim();

    if (!nomeOk || !emailOk || !senhaOk) {
      Alert.alert('Erro', 'Preencha nome, email e senha.');
      return;
    }
    if (!isEmail(emailOk)) {
      Alert.alert('Erro', 'Informe um email vÃƒÂ¡lido.');
      return;
    }
    if (senhaOk.length < 6) {
      Alert.alert('Erro', 'Senha deve ter ao menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      // signUp jÃƒÂ¡ registra e faz login; depois persiste no contexto
      await signUp(emailOk, senhaOk);
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navegarHome();
    } catch (e: any) {
      const raw = String(e?.message || '');
      const msg = raw.toLowerCase();

      if (raw.includes('jÃƒÂ¡ existe') || raw.includes('409') || /duplic/i.test(msg)) {
        Alert.alert('UsuÃƒÂ¡rio jÃƒÂ¡ existe', 'Este email jÃƒÂ¡ estÃƒÂ¡ cadastrado.');
      } else if (/timeout|tempo esgotado/i.test(msg)) {
        Alert.alert('Tempo esgotado', 'NÃƒÂ£o consegui falar com o servidor. Confira sua rede e tente novamente.');
      } else if (/network|fetch|failed to/i.test(msg)) {
        Alert.alert('Falha de rede', 'NÃƒÂ£o foi possÃƒÂ­vel alcanÃƒÂ§ar o servidor.');
      } else {
        Alert.alert('Erro no cadastro', raw || 'Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const irLogin = () => navigation.navigate('Login');
  const voltarInicio = () => navigation.navigate('Inicio');

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#add8e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Cadastro</Text>
        </View>

        <View style={styles.formWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#555"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#555"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginVertical: 0 }]}
              placeholder="Senha (mÃƒÂ­n. 6)"
              value={senha}
              onChangeText={setSenha}
              placeholderTextColor="#555"
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setMostrarSenha((v) => !v)}
              accessibilityLabel="Mostrar/ocultar senha"
            >
              <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={20} color="#003e63" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, (!formValido || loading) && { opacity: 0.6 }]}
            onPress={handleCadastro}
            activeOpacity={0.9}
            disabled={!formValido || loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
            <Ionicons name="person-add" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecondary} onPress={irLogin} activeOpacity={0.9} disabled={loading}>
            <Text style={styles.buttonText}>Ir para Login</Text>
            <Ionicons name="log-in" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonTertiary} onPress={voltarInicio} activeOpacity={0.9} disabled={loading}>
            <Text style={styles.buttonText}>Voltar ao InÃƒÂ­cio</Text>
            <Ionicons name="arrow-back" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        <Image source={frase} style={styles.frase} resizeMode="contain" />

        <View style={styles.bottomContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0, alignItems: 'center' },
  titleWrapper: { width: '100%', paddingHorizontal: 60, alignItems: 'flex-start', marginTop: 40 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  formWrapper: { marginTop: 10, alignItems: 'center' },
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
  frase: { width: '100%', height: 220, marginTop: 20 },
  bottomContainer: { position: 'absolute', left: 0, right: 0, bottom: 25, alignItems: 'flex-end', paddingRight: 20 },
  logo: { width: 96, height: 96 },
});
