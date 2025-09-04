// src/screens/inicio/ConfiguracoesAPIKeyScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, StatusBar, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { getApiKey, setApiKey, removeApiKey } from '@/logic/keys/openaiKey';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/* ===== Paleta NEON ===== */
const AZUL_NEON = '#00FFFF';
const AZUL_BORDA = '#00BFFF';
const AZUL_ESCURO = '#001F3F';
const PRETO_FUNDO = '#0B0F1A';
const VERMELHO_NEON = '#FF4D6D';
const VERMELHO_BORDA = '#FF2D55';

/* ===== Helpers ===== */
function formatoProvavelValido(k: string) {
  const s = (k || '').trim();
  return s.length >= 32 && /^([a-z]{2,4}-)/i.test(s);
}
async function validarNoServidor(k: string): Promise<{ ok: boolean; msg?: string }> {
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: { Authorization: `Bearer ${k.trim()}`, 'Content-Type': 'application/json' },
      signal: ctrl.signal,
    });
    clearTimeout(to);
    if (res.status === 200) return { ok: true };
    if (res.status === 401) return { ok: false, msg: 'Chave inválida (401).' };
    if (res.status === 403 || res.status === 429) return { ok: true };
    return { ok: true };
  } catch {
    return { ok: false, msg: 'Sem rede/timeout. Tente novamente.' };
  }
}

const DESTINO = 'IAventureSe';

export default function ConfiguracoesAPIKeyScreen() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual } = useParkisheiro();
  const userId = parkisheiroAtual?.id;

  const [apiKey, setApiKeyState] = useState('');
  const [masked, setMasked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clima, setClima] = useState<any>(null);

  const [validado, setValidado] = useState(false);
  const pressedRef = useRef(false);

  useEffect(() => { buscarClima('Orlando').then(setClima); }, []);

  useEffect(() => {
    (async () => {
      let k: string | null = null;
      try { k = await getApiKey(userId); } catch {}
      if (!k) { try { k = await getApiKey(); } catch {} }
      if (k) { setApiKeyState(k); setValidado(false); } else { setValidado(false); }
    })();
  }, [userId]);

  function irMenu() {
    Keyboard.dismiss();
    navigation.navigate('MenuPrincipal');
  }

  async function validarESalvar() {
    if (pressedRef.current) return;
    pressedRef.current = true;
    try {
      const k = apiKey.trim();
      if (!k) { Alert.alert('API não configurada', 'Cole sua chave.'); return; }
      if (!formatoProvavelValido(k)) { Alert.alert('Formato suspeito', 'Use uma chave válida (ex: começa com "sk-").'); return; }
      setLoading(true);
      const r = await validarNoServidor(k);
      if (!r.ok) { setValidado(false); Alert.alert('Inválida', r.msg || 'Não foi possível validar.'); return; }

      try { await setApiKey(k); } catch {}
      try { if (userId) await setApiKey(k, userId); } catch {}

      setValidado(true);
      Alert.alert('Chave validada', 'Tudo certo! Crie seu roteiro!');
    } finally {
      setLoading(false);
      setTimeout(() => (pressedRef.current = false), 200);
    }
  }

  async function remover() {
    if (pressedRef.current) return;
    pressedRef.current = true;
    try {
      setLoading(true);
      try { await removeApiKey(userId); } catch {}
      try { await removeApiKey(); } catch {}
      setApiKeyState('');
      setValidado(false);
      Alert.alert('Removida', 'Chave apagada.');
    } finally {
      setLoading(false);
      setTimeout(() => (pressedRef.current = false), 200);
    }
  }

  async function colarDoClipboard() {
    try {
      const clip = (await Clipboard.getStringAsync())?.trim();
      if (clip) { setApiKeyState(clip); setValidado(false); }
    } catch {}
  }

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  return (
    <LinearGradient
      colors={[PRETO_FUNDO, '#060912', '#000000']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || 'Parcialmente nublado'}
          temperatura={clima ? `${clima.temp}°C` : '—°C'}
          iconeClima={clima?.icone}
        />
      </View>

      <View style={styles.centerWrapper}>
        {/* INPUT com vibe glass/neon */}
        <View style={styles.inputRow}>
          <View style={styles.inputOuterGlow}>
            <TextInput
              style={styles.input}
              placeholder="Cole sua API Key aqui"
              placeholderTextColor="#88A"
              value={apiKey}
              onChangeText={(t) => { setApiKeyState(t); setValidado(false); }}
              secureTextEntry={masked}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />
          </View>

          <View style={styles.iconBox}>
            <TouchableOpacity onPress={() => setMasked(m => !m)} style={styles.iconBtn} activeOpacity={0.85}>
              <Ionicons name={masked ? 'eye' : 'eye-off'} size={20} color={AZUL_NEON} />
            </TouchableOpacity>
            <TouchableOpacity onPress={colarDoClipboard} style={styles.iconBtn} activeOpacity={0.85}>
              <Ionicons name="clipboard" size={20} color={AZUL_NEON} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botões com borda neon */}
        <View style={styles.buttonGroup}>
          <LinearGradient colors={[AZUL_BORDA, AZUL_NEON]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.neonBorder}>
            <TouchableOpacity
              style={[styles.btnInner, loading && styles.btnDisabled]}
              onPress={validarESalvar}
              disabled={loading}
              activeOpacity={0.9}
            >
              <Ionicons name="shield-checkmark" size={18} color={AZUL_NEON} style={styles.btnIcon} />
              <Text style={styles.btnTxt}>{loading ? 'Validando...' : 'Validar & Salvar'}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient colors={[VERMELHO_BORDA, VERMELHO_NEON]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.neonBorder}>
            <TouchableOpacity
              style={[styles.btnInner, loading && styles.btnDisabled]}
              onPress={remover}
              disabled={loading}
              activeOpacity={0.9}
            >
              <Ionicons name="trash" size={18} color={VERMELHO_NEON} style={styles.btnIcon} />
              <Text style={styles.btnTxt}>{loading ? 'Removendo...' : 'Remover'}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/* Setas redondas com glow circular (sem retângulo atrás) */}
      <TouchableOpacity style={styles.floatingBackButton} onPress={irMenu} activeOpacity={0.9}>
        <View style={styles.glowCircle}>
          <Ionicons name="arrow-back-circle" size={56} color={AZUL_NEON} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.floatingButton, { opacity: validado ? 1 : 0.35 }]}
        onPress={() => navigation.navigate(DESTINO)}
        activeOpacity={0.9}
        disabled={!validado}
      >
        <View style={styles.glowCircle}>
          <Ionicons name="arrow-forward-circle" size={56} color={AZUL_NEON} />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 20 },
  centerWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80 },

  /* ====== Input ====== */
  inputRow: { flexDirection: 'row', width: '100%', alignItems: 'center', gap: 10, marginBottom: 16 },
  inputOuterGlow: { flex: 2, borderRadius: 12, padding: 2, backgroundColor: 'rgba(0,255,255,0.08)' },
  input: {
    backgroundColor: 'rgba(10,14,25,0.9)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 14,
    borderColor: AZUL_BORDA,
    borderWidth: 1,
    color: '#E6F4FF',
    textShadowColor: 'rgba(0,255,255,0.25)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  iconBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AZUL_ESCURO,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: AZUL_BORDA,
  },
  iconBtn: { paddingHorizontal: 6 },

  /* ====== Botões ====== */
  buttonGroup: { width: '100%', gap: 12, marginTop: 6 },
  neonBorder: {
    borderRadius: 14,
    padding: 2,
    shadowColor: AZUL_NEON,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  btnInner: {
    backgroundColor: '#0E1424',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'rgba(0,255,255,0.25)',
    borderWidth: 1,
  },
  btnIcon: { marginRight: 8 },
  btnTxt: {
    color: '#E8FBFF',
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'rgba(0,255,255,0.35)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  btnDisabled: { opacity: 0.5 },

  /* ====== Setas flutuantes ====== */
  floatingButton: { position: 'absolute', bottom: 40, right: 20, zIndex: 100 },
  floatingBackButton: { position: 'absolute', bottom: 40, left: 20, zIndex: 100 },
  glowCircle: {
    borderRadius: 999,
    padding: 4,
    backgroundColor: 'rgba(0,255,255,0.12)', // glow circular
  },
});
