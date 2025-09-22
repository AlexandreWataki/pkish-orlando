// src/screens/inicio/TelaRefeicoes.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  Platform,
  UIManager,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CardSecao } from '@/components/card/CardSecao';
import { CardRefeicao } from '@/components/card/CardRefeicao';

// Dados base (use fallback [])
import { refeicoesProximas as DATA } from '@/logic/blocos/ref/refeicoesProximas';

// CatÃ¡logo unificado: nomes â†’ urls
import { NOMES_REFEICOES } from '@/logic/menu/nomesRefeicoes';

// Abrir WebView de cardÃ¡pio
import { openMenu } from '@/logic/menu/openMenu';

// Tipagem de navegaÃ§Ã£o
import type { RootStackParamList } from '@/logic/types/navigation';
type Nav = NativeStackNavigationProp<RootStackParamList, 'TelaRefeicoes'>;

type Refeicao = {
  nome: string;
  regiao: string;
  tipo: string;
  acesso: string;
  precoMedio?: number;
  destaque?: string;
  latitude?: number;
  longitude?: number;
  menuUrl?: string;
  tipoRefeicao?: 'CafÃ© da ManhÃ£' | 'AlmoÃ§o' | 'Jantar' | string;
  icone?: string;
  imagem?: string;
};

/* Utils */
function normalizeNome(s: string) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['â€™"â€œâ€`]/g, '')
    .replace(/[â€“â€”\-]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const RefeicaoRow = memo(function RefeicaoRow({
  r,
  onOpenMenuInline,
}: {
  r: Refeicao;
  onOpenMenuInline: (r: Refeicao) => void;
}) {
  return (
    <View style={{ marginBottom: 10, position: 'relative' }}>
      <TouchableOpacity
        onPress={() => onOpenMenuInline(r)}
        activeOpacity={0.9}
        style={styles.menuFab}
        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      >
        {/* Ãcone Instagram */}
        <FontAwesome name="instagram" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <CardRefeicao
        titulo={r.nome}
        tipoRefeicao={r.tipoRefeicao}
        tipo={r.tipo}
        precoMedio={r.precoMedio}
        descricao={r.destaque}
        local={r.acesso}
      />
    </View>
  );
});

export default function TelaRefeicoes() {
  const navigation = useNavigation<Nav>();
  const { markVisited } = useParkisheiro();

  // Habilitar LayoutAnimation no Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // Clima / visita
  const [clima, setClima] = useState<any>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const c = await buscarClima('Orlando');
        if (alive) setClima(c);
      } catch {
        if (alive) setClima(null);
      }
    })();
    markVisited?.('TelaRefeicoes');
    return () => {
      alive = false;
    };
  }, [markVisited]);

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  // Seletores
  const [regiao, setRegiao] = useState<string>('');
  const [openRegiao, setOpenRegiao] = useState(false);

  const [refeicao, setRefeicao] = useState<string>(''); // CafÃ©/AlmoÃ§o/Jantar
  const [openRefeicao, setOpenRefeicao] = useState(false);

  const [tipo, setTipo] = useState<string>(''); // RÃ¡pido / Mesa / etc
  const [openTipo, setOpenTipo] = useState(false);

  // Mapa nome normalizado â†’ URL vindo do catÃ¡logo (sempre seguro)
  const mapMenus = useMemo(
    () =>
      new Map(
        (Array.isArray(NOMES_REFEICOES) ? NOMES_REFEICOES : []).map((n) => [
          normalizeNome(n.nome),
          n.menuUrl || '',
        ])
      ),
    []
  );

  // Base (SEMPRE array)
  const base: Refeicao[] = useMemo(
    () => (Array.isArray(DATA) ? (DATA as Refeicao[]) : []),
    []
  );

  // Normaliza dados e preenche menuUrl via catÃ¡logo
  const itens: Refeicao[] = useMemo(
    () =>
      base.map((r) => ({
        ...r,
        tipoRefeicao: r.tipoRefeicao || 'AlmoÃ§o',
        menuUrl: r.menuUrl || mapMenus.get(normalizeNome(r.nome)) || '',
      })),
    [base, mapMenus]
  );

  // Abrir menu
  const abrirMenuInline = useCallback(
    (r: Refeicao) => {
      const url = r.menuUrl || mapMenus.get(normalizeNome(r.nome)) || '';
      if (!url) {
        Alert.alert(
          'CardÃ¡pio indisponÃ­vel',
          'Ainda nÃ£o temos o site de menu para este restaurante.'
        );
        return;
      }
      openMenu(navigation, { title: r.nome, menuUrl: url });
    },
    [navigation, mapMenus]
  );

  // Listas Ãºnicas (sempre arrays)
  const regioesDisponiveis = useMemo(() => {
    const set = new Set<string>();
    itens.forEach((r) => r.regiao && set.add(r.regiao));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [itens]);

  const refeicoesDisponiveis = useMemo(() => {
    const set = new Set<string>();
    itens.forEach((r) => r.tipoRefeicao && set.add(String(r.tipoRefeicao)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [itens]);

  const tiposDisponiveis = useMemo(() => {
    const set = new Set<string>();
    itens.forEach((r) => r.tipo && set.add(String(r.tipo)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [itens]);

  // Reset encadeado
  useEffect(() => {
    setTipo('');
    setOpenTipo(false);
  }, [regiao, refeicao]);

  // Filtro + agrupamento
  const grupos = useMemo(() => {
    if (!regiao) return [] as { area: string; itens: Refeicao[] }[];
    const filtrados = itens.filter((r) => {
      const okRegiao = r.regiao === regiao;
      const okRefeicao = !refeicao || r.tipoRefeicao === refeicao;
      const okTipo = !tipo || r.tipo === tipo;
      return okRegiao && okRefeicao && okTipo;
    });
    return [{ area: regiao, itens: filtrados }];
  }, [itens, regiao, refeicao, tipo]);

  const tituloCard = 'RefeiÃ§Ãµes';
  const subtituloCard =
    (regiao ? `â€” ${regiao}` : '') +
    (refeicao ? ` â€¢ ${refeicao}` : '') +
    (tipo ? ` â€¢ ${tipo}` : '');

  // animaÃ§Ã£o aviso
  const avisoBlink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(avisoBlink, { toValue: 0.78, duration: 900, useNativeDriver: true }),
        Animated.timing(avisoBlink, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, [avisoBlink]);

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#52D6FF', '#52D6FF']}
      locations={[0, 0.6, 0.9, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* CabeÃ§alho */}
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          titulo=""
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || clima?.clima || 'Parcialmente nublado'}
          temperatura={
            Number.isFinite(clima?.temp ?? clima?.tempC)
              ? `${Math.round((clima?.temp ?? clima?.tempC) as number)}Â°C`
              : undefined
          }
          iconeClima={clima?.icone}
        />
      </View>

      {/* Seletor: RegiÃ£o */}
      <View style={styles.wrapSeletor}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setOpenRegiao((v) => !v);
          }}
          activeOpacity={0.9}
          style={styles.btnSeletorBranco}
        >
          <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
            {regiao || 'Selecione a RegiÃ£o'}
          </Text>
          <Ionicons name={openRegiao ? 'chevron-up' : 'chevron-down'} size={18} color="#004b87" />
        </TouchableOpacity>

        {openRegiao && (
          <View style={styles.listaContainer}>
            <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
              {(regioesDisponiveis || []).map((r) => (
                <TouchableOpacity
                  key={r}
                  activeOpacity={0.9}
                  style={styles.linhaItem}
                  onPress={() => {
                    setRegiao(r);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setOpenRegiao(false);
                  }}
                >
                  <Text style={styles.textoItem}>{r}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Linha ÃšNICA â€” RefeiÃ§Ã£o + Tipo */}
      {!!regiao && (
        <View style={[styles.wrapSeletor, styles.rowHalf]}>
          {/* RefeiÃ§Ã£o */}
          <View style={styles.halfBox}>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOpenRefeicao((v) => !v);
              }}
              activeOpacity={0.9}
              style={styles.btnSeletorBranco}
            >
              <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
                {refeicao || 'Selecione a RefeiÃ§Ã£o'}
              </Text>
              <Ionicons name={openRefeicao ? 'chevron-up' : 'chevron-down'} size={18} color="#004b87" />
            </TouchableOpacity>

            {openRefeicao && (
              <View style={styles.listaContainer}>
                {(refeicoesDisponiveis || []).map((t) => (
                  <TouchableOpacity
                    key={t}
                    activeOpacity={0.9}
                    style={styles.linhaItem}
                    onPress={() => {
                      setRefeicao(t);
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setOpenRefeicao(false);
                    }}
                  >
                    <Text style={styles.textoItem}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Tipo */}
          <View style={styles.halfBox}>
            <TouchableOpacity
              onPress={() => {
                if (!tiposDisponiveis.length) return;
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOpenTipo((v) => !v);
              }}
              activeOpacity={0.9}
              style={styles.btnSeletorBranco}
            >
              <Text numberOfLines={1} style={[styles.btnSeletorTxt, { color: '#004b87' }]}>
                {tipo || 'Selecione o Tipo'}
              </Text>
              <Ionicons name={openTipo ? 'chevron-up' : 'chevron-down'} size={18} color="#004b87" />
            </TouchableOpacity>

            {openTipo && (
              <View style={styles.listaContainer}>
                {(tiposDisponiveis || []).map((t) => (
                  <TouchableOpacity
                    key={t}
                    activeOpacity={0.9}
                    style={styles.linhaItem}
                    onPress={() => {
                      setTipo(t);
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setOpenTipo(false);
                    }}
                  >
                    <Text style={styles.textoItem}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* Lista */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator
        removeClippedSubviews
      >
        {!!regiao && !!grupos.length && (
          <View style={{ width: '96%', alignSelf: 'center' }}>
            <CardSecao titulo={tituloCard} subtitulo={subtituloCard} style={{ width: '100%' }}>
              {grupos.map(({ area: nomeArea, itens }) => (
                <View key={nomeArea} style={styles.areaBloco}>
                  <Text style={styles.areaTitle}>ðŸ½ï¸ {nomeArea.toUpperCase()}</Text>
                  {(itens || []).map((r, idx) => (
                    <RefeicaoRow
                      key={`${r.nome}-${idx}`}
                      r={r}
                      onOpenMenuInline={abrirMenuInline}
                    />
                  ))}
                </View>
              ))}
            </CardSecao>
          </View>
        )}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* RodapÃ© */}
      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MenuPrincipal')}
          style={styles.botaoSeta}
          activeOpacity={0.9}
        >
          <Ionicons name="arrow-back-circle" size={40} color="#0077cc" />
        </TouchableOpacity>

        <Animated.View style={[styles.avisoLegalCard, { opacity: avisoBlink }]}>
          <Text style={styles.avisoLegalTexto}>
            Guia independente e nÃ£o oficial, sem vÃ­nculo com Disney ou Universal.
            CardÃ¡pios exibidos via sites oficiais dos restaurantes.
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapSeletor: { width: '90%', alignSelf: 'center', marginTop: 8, marginBottom: 6 },
  rowHalf: { flexDirection: 'row', columnGap: 8 },
  halfBox: { flex: 1 },

  btnSeletorBranco: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }
      : {
          elevation: 2,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        }),
  },
  btnSeletorTxt: { fontSize: 12, fontWeight: 'bold', flexShrink: 1, textAlign: 'left' },
  listaContainer: { width: '100%', marginTop: 6, backgroundColor: 'transparent' },
  linhaItem: { paddingVertical: 8, paddingHorizontal: 10, width: '100%', backgroundColor: 'transparent' },
  textoItem: { color: '#FFFFFF', fontSize: 11, textAlign: 'left' },

  scrollArea: { flex: 1 },
  scrollContainer: { padding: 10, paddingBottom: 10, alignItems: 'center' },
  areaBloco: { marginTop: 0, marginBottom: 0 },

  areaTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    width: '100%',
    ...(Platform.OS === 'web'
      ? {}
      : {
          textShadowColor: '#00BFFF',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 16,
        }),
    marginBottom: 4,
  },

  menuFab: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,75,135,0.95)',
    borderWidth: 1,
    borderColor: '#00A3FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }
      : {
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 1 },
        }),
  },

  rodapeFundo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: '#52D6FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rodapeConteudo: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },

  avisoLegalCard: {
    flex: 1,
    backgroundColor: '#004b87',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avisoLegalTexto: { fontSize: 9, color: '#FFFFFF', lineHeight: 13, textAlign: 'justify' },
});
