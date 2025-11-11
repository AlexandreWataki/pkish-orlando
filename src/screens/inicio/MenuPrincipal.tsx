// src/screens/inicio/MenuPrincipal.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  Alert,
  Text,
  BackHandler,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

import BotaoMenuCard from '@/components/card/BotaoMenuCard';
import BotaoMenuNeon from '@/components/card/BotaoMenuNeon';
import logo from '@/assets/imagens/logo4.png';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';

const OURO = '#FFD700';
const AZUL_REI = '#0B3D91';
const AZUL_BORDA = '#B9DEFF';
const FUNDO_BADGE = ['#0B3D91', '#1F66D1', '#49A7FF'];

export default function MenuPrincipal() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual, limparRoteiroFinal } = useParkisheiro();
  const { user, signOut } = useAuth();

  const [clima, setClima] = useState<any>(null);
  const [mostrarBadge, setMostrarBadge] = useState(true);
  const navigatingRef = useRef(false);
  const signingOutRef = useRef(false);

  // 🔹 Buscar clima
  useEffect(() => {
    (async () => {
      try {
        const c = await buscarClima('Orlando');
        setClima(c);
      } catch {
        setClima(null);
      }
    })();
  }, []);

  // 🔹 Ocultar o badge após 10 segundos (logo continua fixo)
  useEffect(() => {
    const timer = setTimeout(() => setMostrarBadge(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // 🔹 Mostrar alerta de boas-vindas (uma vez)
  useEffect(() => {
    (async () => {
      try {
        const flag = await AsyncStorage.getItem('@gravou_usage_ok');
        if (flag === 'true') {
          Alert.alert('Bem-vindo', '✅ Seja bem-vindo ao seu Roteiro!');
          await AsyncStorage.removeItem('@gravou_usage_ok');
        }
      } catch {}
    })();
  }, []);

  // ✅ Reinicia completamente o app
  const voltarAoCadastro = async () => {
    if (signingOutRef.current) return;
    signingOutRef.current = true;

    try {
      // logout normal
      await Promise.race([
        signOut(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
    } catch {}

    try {
      // 🔹 Reinicia o app completamente (como se fechasse e abrisse de novo)
      await Updates.reloadAsync();
    } catch (err) {
      console.warn('Erro ao reiniciar o app:', err);
      // fallback: volta pra Splash
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        })
      );
    } finally {
      signingOutRef.current = false;
    }
  };

  const rotasImplementadas = new Set<string>([
    'Calendario','UltimaBusca','DiaCompleto','IAventureSe','ConfiguracoesAPIKey',
    'Inicio','TelaAtracoes','TelaRefeicoes','Cadastro','Login','ParquesPDF',
    'VisualizarPDF','Promocoes','Splash',
  ]);

  // 🔹 Último roteiro salvo
  const irParaUltimaBusca = () => {
    const rf = parkisheiroAtual?.roteiroFinal;
    if (!rf || (Array.isArray(rf) && rf.length === 0)) {
      Alert.alert('Roteiro não encontrado', 'Monte um roteiro primeiro para acessar a última busca.');
      return;
    }
    let ultimoDia: any | undefined;
    if (Array.isArray(rf)) {
      ultimoDia = rf[rf.length - 1];
    } else if (typeof rf === 'object') {
      const dias = Object.values(rf) as any[];
      if (!dias.length) {
        Alert.alert('Roteiro não encontrado', 'Monte um roteiro primeiro para acessar a última busca.');
        return;
      }
      dias.sort((a: any, b: any) =>
        new Date(a.data || a.date || 0).getTime() - new Date(b.data || b.date || 0).getTime()
      );
      ultimoDia = dias[dias.length - 1];
    }
    if (!ultimoDia?.id) {
      Alert.alert('Erro', 'Dia do roteiro inválido.');
      return;
    }
    navigation.navigate('DiaCompleto', { diaId: ultimoDia.id });
  };

  // 🔹 Recomeçar roteiro com confirmação
  const irParaCalendarioComConfirmacao = () => {
    const rf = parkisheiroAtual?.roteiroFinal;
    const temRoteiro =
      !!rf && ((Array.isArray(rf) && rf.length > 0) ||
      (typeof rf === 'object' && Object.keys(rf).length > 0));
    if (!temRoteiro) {
      navigation.reset({ index: 0, routes: [{ name: 'Calendario' }] });
      return;
    }
    Alert.alert('Apagar último roteiro?','Ao confirmar, seu último roteiro será apagado.',[
      { text: 'Cancelar', style: 'cancel' },
      { text: 'OK', onPress: async () => {
          await limparRoteiroFinal();
          Alert.alert('Último roteiro apagado','Seu último roteiro foi removido.',[
            { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Calendario' }] }) }
          ]);
        } },
    ]);
  };

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const botoesMenu = [
    { titulo:'Criar Roteiro Orlando', emoji:'📖', corFundo:AZUL_REI, corBorda:'#00FFFF', corTexto:'#FFFFFF',
      destino:'Calendario', ativo:true, subtitulo:'Escolha as datas e monte seu roteiro' },
    { titulo:'Último Roteiro Salvo', emoji:'📂', corFundo:'#4B0082', corBorda:'#FF00FF', corTexto:'#FFF0FF',
      destino:'UltimaBusca', ativo:true, subtitulo:'Abra o roteiro mais recente deste aparelho' },
    { titulo:'Atrações dos Parques', emoji:'🎢', corFundo:'#FF8C00', corBorda:'#FFD700', corTexto:'#FFFFFF',
      destino:'TelaAtracoes', ativo:true, subtitulo:'Brinquedos, shows e experiências' },
    { titulo:'Restaurantes e Refeições', emoji:'🍽️', corFundo:'#0077CC', corBorda:'#00BFFF', corTexto:'#FFFFFF',
      destino:'TelaRefeicoes', ativo:true, subtitulo:'Opções gastronômicas por parque e área' },
  ] as const;

  return (
    <LinearGradient
      colors={['#0077cc', '#00c5d4', '#f5deb3', '#ffffff', '#ffffff']}
      locations={[0, 0.3, 0.6, 0.85, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <CabecalhoDia titulo="" data={dataFormatada} diaSemana={diaSemana} clima={clima} />

      <View style={styles.menu}>
        {botoesMenu.map((btn) => (
          <View key={btn.titulo} style={styles.cardWrapper}>
            <BotaoMenuCard
              titulo={btn.titulo}
              emoji={btn.emoji}
              corFundo={btn.corFundo}
              corBorda={btn.corBorda}
              corTexto={btn.corTexto}
              subtitulo={btn.subtitulo}
              onPress={async () => {
                if (navigatingRef.current) return;
                navigatingRef.current = true;
                try {
                  if (!btn.ativo) {
                    Alert.alert('Em breve', `${btn.titulo} estará disponível em uma próxima atualização.`);
                    return;
                  }
                  if (!rotasImplementadas.has(btn.destino)) {
                    Alert.alert('Indisponível', `A rota "${btn.destino}" ainda não está disponível.`);
                    return;
                  }
                  if (btn.destino === 'Calendario') {
                    await irParaCalendarioComConfirmacao();
                    return;
                  }
                  if (btn.destino === 'UltimaBusca') {
                    irParaUltimaBusca();
                    return;
                  }
                  navigation.navigate(btn.destino as any);
                } finally {
                  setTimeout(() => { navigatingRef.current = false; }, 200);
                }
              }}
            />
          </View>
        ))}

        <View style={styles.cardWrapper}>
          <BotaoMenuNeon
            titulo="Clube de Vantagens Orlando"
            emoji="🎟️"
            subtitulo="Promoções e descontos exclusivos"
            onPress={() => navigation.navigate('Promocoes')}
          />
        </View>

        <View style={styles.cardWrapper}>
          <BotaoMenuCard
            titulo="Mapas Oficiais dos Parques (PDF)"
            emoji="📑"
            corFundo="#B00020"
            corBorda="#FF5252"
            corTexto="#FFFFFF"
            subtitulo="Disney • Universal • Epic Universe"
            onPress={() => navigation.navigate('ParquesPDF')}
            forceWhiteEmoji
          />
        </View>

        <View style={styles.cardWrapper}>
          <BotaoMenuCard
            titulo="Voltar ao Cadastro"
            emoji="👤"
            corFundo="#001F3F"
            corBorda="#0B3D91"
            corTexto="#FFFFFF"
            subtitulo="Reiniciar o aplicativo"
            onPress={voltarAoCadastro}
            noShadow
            forceWhiteEmoji
          />
        </View>
      </View>

      {/* Rodapé fixo: logo sempre visível, badge some após 10s */}
      <View style={styles.footerRow}>
        <View style={styles.footerCardCol}>
          {mostrarBadge && (
            <LinearGradient colors={FUNDO_BADGE} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.userBadge}>
              <View style={styles.avatarWrap}>
                <Image
                  source={{ uri: user?.picture || 'https://i.pravatar.cc/120' }}
                  style={styles.avatar}
                />
                <View style={styles.avatarRing}/>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user?.name || 'Visitante'}
                </Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user?.email || 'Entrar para salvar roteiros'}
                </Text>
                <View style={styles.badgeLine}/>
                <Text style={styles.subtleText} numberOfLines={1}>
                  Bem-vindo ao seu roteiro mágico ✨
                </Text>
              </View>
            </LinearGradient>
          )}
        </View>

        <View style={styles.footerLogoCol}>
          <Image source={logo} style={styles.logoSide} resizeMode="contain" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0, paddingBottom: 120 },
  menu: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 18,
  },
  cardWrapper: { width: '100%', alignItems: 'center', marginBottom: 6 },

  footerRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  footerCardCol: { flex: 2, justifyContent: 'center' },
  footerLogoCol: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },

  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AZUL_BORDA,
    shadowColor: OURO,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
    minHeight: 64,
    marginLeft: 25,
  },
  avatarWrap: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#FFFFFFaa' },
  avatarRing: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: OURO,
  },
  userName: { fontWeight: '800', fontSize: 16, color: '#FFFFFF' },
  userEmail: { fontSize: 12.5, color: '#EAF4FF', marginTop: 1 },
  subtleText: { fontSize: 11.5, color: '#FFFFFF', opacity: 0.92, marginTop: 4 },
  badgeLine: { height: 1, backgroundColor: '#FFFFFF33', marginTop: 6, marginBottom: 2 },
  logoSide: { width: 96, height: 96, marginRight: 25 },
});
