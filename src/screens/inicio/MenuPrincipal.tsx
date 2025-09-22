ï»¿// src/screens/inicio/MenuPrincipal.tsx
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
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Rota = {
  titulo: string;
  icon: React.ComponentProps<typeof import('@expo/vector-icons').Ionicons>['name'];
  corFundo: string;
  corBorda: string;
  corTexto: string;
  destino: string;
  ativo: boolean;
  subtitulo: string;
};

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
      Alert.alert('Roteiro nÃ£o encontrado', 'Monte um roteiro primeiro para acessar a Ãºltima busca.');
      return;
    }

    let ultimoDia: any | undefined;
    if (Array.isArray(rf)) {
      ultimoDia = rf[rf.length - 1];
    } else if (typeof rf === 'object') {
      const dias = Object.values(rf) as any[];
      if (!dias.length) {
        Alert.alert('Roteiro nÃ£o encontrado', 'Monte um roteiro primeiro para acessar a Ãºltima busca.');
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
      Alert.alert('Erro', 'Dia do roteiro invÃ¡lido.');
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
      'Apagar Ãºltimo roteiro?',
      'Ao confirmar, seu Ãºltimo roteiro serÃ¡ apagado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await limparRoteiroFinal();
            Alert.alert(
              'Ãšltimo roteiro apagado',
              'Seu Ãºltimo roteiro foi removido.',
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

  // Itens do menu (agora usando Ã­cones do Ionicons)
  const botoesMenu: Rota[] = [
    {
      titulo: 'Criar Roteiro Orlando',
      icon: 'map-outline',
      corFundo: '#0B3D91',
      corBorda: '#00FFFF',
      corTexto: '#FFFFFF',
      destino: 'Calendario',
      ativo: true,
      subtitulo: 'Escolha as datas e monte seu roteiro',
    },
    {
      titulo: 'Ãšltimo Roteiro Salvo',
      icon: 'save-outline',
      corFundo: '#4B0082',
      corBorda: '#FF00FF',
      corTexto: '#FFF0FF',
      destino: 'UltimaBusca',
      ativo: true,
      subtitulo: 'Abra o roteiro mais recente deste aparelho',
    },
    {
      titulo: 'AtraÃ§Ãµes dos Parques',
      icon: 'star-outline',
      corFundo: '#FF8C00',
      corBorda: '#FFD700',
      corTexto: '#FFFFFF',
      destino: 'TelaAtracoes',
      ativo: true,
      subtitulo: 'Brinquedos, shows e experiÃªncias',
    },
    {
      titulo: 'Restaurantes e RefeiÃ§Ãµes',
      icon: 'restaurant-outline',
      corFundo: '#0077CC',
      corBorda: '#00BFFF',
      corTexto: '#FFFFFF',
      destino: 'TelaRefeicoes',
      ativo: true,
      subtitulo: 'OpÃ§Ãµes gastronÃ´micas por parque e Ã¡rea',
    },
  ];

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
              icon={btn.icon}
              corFundo={btn.corFundo}
              corBorda={btn.corBorda}
              corTexto={btn.corTexto}
              subtitulo={btn.subtitulo}
              onPress={async () => {
                if (navigatingRef.current) return;
                navigatingRef.current = true;
                try {
                  if (!btn.ativo) {
                    Alert.alert('Em breve', `${btn.titulo} estarÃ¡ disponÃ­vel em uma prÃ³xima atualizaÃ§Ã£o.`);
                    return;
                  }
                  if (!rotasImplementadas.has(btn.destino)) {
                    Alert.alert('IndisponÃ­vel', `A rota "${btn.destino}" ainda nÃ£o estÃ¡ disponÃ­vel.`);
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

        {/* Clube de Vantagens Orlando */}
        <View style={styles.cardWrapper}>
          <BotaoMenuNeon
            icon="pricetags-outline"
            titulo="Clube de Vantagens Orlando"
            subtitulo="PromoÃ§Ãµes e descontos exclusivos"
            onPress={() => navigation.navigate('Promocoes')}
          />
        </View>

        {/* Ãšltimo: Voltar ao Cadastro / Login */}
        <View style={styles.cardWrapper}>
          <BotaoMenuCard
            icon="log-in-outline"
            titulo="Voltar ao Cadastro / Login"
            corFundo="#87CEFA"
            corBorda="#FFFFFF"
            corTexto="#003B73"
            subtitulo="Acesse ou crie sua conta"
            onPress={() => navigation.navigate('Inicio')}
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
