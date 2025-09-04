// src/screens/inicio/MenuPrincipal.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import BotaoMenuCard from '@/components/card/BotaoMenuCard';
import BotaoMenuNeon from '@/components/card/BotaoMenuNeon';
import logo from '@/assets/imagens/logo4.png';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { getApiKey } from '@/logic/keys/openaiKey';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MenuPrincipal() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual, limparRoteiroFinal } = useParkisheiro();
  const [clima, setClima] = useState<any>(null);
  const navigatingRef = useRef(false);

  const rotasImplementadas = new Set<string>([
    'Calendario',
    'UltimaBusca',
    'DiaCompleto',
    'IAventureSe',
    'ConfiguracoesAPIKey',
    'Inicio',
    'TelaAtracoes',
    'TelaRefeicoes',
    'Cadastro',
    'Login',
  ]);

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
      dias.sort((a: any, b: any) => {
        const da = new Date(a.data || a.date || 0).getTime();
        const db = new Date(b.data || b.date || 0).getTime();
        return da - db;
      });
      ultimoDia = dias[dias.length - 1];
    }

    if (!ultimoDia?.id) {
      Alert.alert('Erro', 'Dia do roteiro inválido.');
      return;
    }

    navigation.navigate('DiaCompleto', { diaId: ultimoDia.id });
  };

  const irParaCalendarioComConfirmacao = () => {
    const rf = parkisheiroAtual?.roteiroFinal;
    const temRoteiro =
      !!rf &&
      ((Array.isArray(rf) && rf.length > 0) ||
        (typeof rf === 'object' && Object.keys(rf).length > 0));

    if (!temRoteiro) {
      navigation.reset({ index: 0, routes: [{ name: 'Calendario' }] });
      return;
    }

    Alert.alert(
      'Apagar último roteiro?',
      'Dê um OK para seu último roteiro ser apagado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await limparRoteiroFinal();
            Alert.alert(
              'Último roteiro apagado',
              'Seu último roteiro foi apagado.',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.reset({ index: 0, routes: [{ name: 'Calendario' }] }),
                },
              ],
              { cancelable: true }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  const botoesMenu = [
    {
      titulo: 'Roteiro Orlando Off-line',
      emoji: '📖',
      corFundo: '#0B3D91',
      corBorda: '#00FFFF',
      corTexto: '#FFFFFF',
      destino: 'Calendario',
      ativo: true,
      subtitulo: 'Escolha os dias e personalize sua aventura',
    },
    {
      titulo: 'Último Roteiro Orlando Off-line',
      emoji: '📂',
      corFundo: '#4B0082',
      corBorda: '#FF00FF',
      corTexto: '#FFF0FF',
      destino: 'UltimaBusca',
      ativo: true,
      subtitulo: 'Veja o roteiro mais recente salvo no app',
    },
    {
      titulo: 'Atrações dos Parques',
      emoji: '🎢',
      corFundo: '#FF8C00',
      corBorda: '#FFD700',
      corTexto: '#FFFFFF',
      destino: 'TelaAtracoes',
      ativo: true,
      subtitulo: 'Shows, rides e pontos famosos',
    },
    {
      titulo: 'Restaurantes & Refeições',
      emoji: '🍽️',
      corFundo: '#0077CC',
      corBorda: '#00BFFF',
      corTexto: '#FFFFFF',
      destino: 'TelaRefeicoes',
      ativo: true,
      subtitulo: 'Opções gastronômicas e culinárias variadas',
    },
  ] as const;

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#add8e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
                  setTimeout(() => {
                    navigatingRef.current = false;
                  }, 200);
                }
              }}
            />
          </View>
        ))}

        <View style={styles.cardWrapper}>
          <BotaoMenuNeon
            titulo="Roteiro Inteligente Orlando"
            emoji="💡"
            subtitulo="Requer créditos de IA"
            onPress={async () => {
              const key = (await getApiKey(parkisheiroAtual?.id)) ?? (await getApiKey());
              if (!key) {
                navigation.navigate('ConfiguracoesAPIKey', { returnTo: 'IAventureSe' } as any);
                return;
              }
              navigation.navigate('IAventureSe');
            }}
          />
        </View>

        {/* ÚLTIMO: Voltar ao Cadastro / Login — azul clarinho, borda branca, boneco branco, SEM sombra */}
        <View style={styles.cardWrapper}>
          <BotaoMenuCard
            titulo="Voltar ao Cadastro / Login"
            emoji="👤"
            corFundo="#87CEFA"   // azul clarinho (LightSkyBlue)
            corBorda="#FFFFFF"   // borda branca
            corTexto="#FFFFFF"   // texto branco
            subtitulo="Acesse ou crie sua conta"
            onPress={() => navigation.navigate('Inicio')}
            noShadow
            forceWhiteEmoji
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    justifyContent: 'flex-start',
  },
  menu: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 0,
    paddingTop: 40,
    marginTop: -10,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  logo: {
    width: 96,
    height: 96,
  },
});
