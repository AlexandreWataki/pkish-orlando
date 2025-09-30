// src/screens/perfis/PerfilComprasPorDiaScreen.tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const opcoes = [
  {
    icone: '🛒',
    nome: 'Orlando Premium Outlets',
    valor: 'orlandoPremiumOutlets',
    descricao: (
      <Text>
        Perfeito para caçadores de promoções em marcas famosas como{' '}
        <Text style={{ fontWeight: 'bold' }}>Nike</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Adidas</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Coach</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Michael Kors</Text> e{' '}
        <Text style={{ fontWeight: 'bold' }}>Levi’s</Text>. Ambiente movimentado, ideal para{' '}
        <Text style={{ fontWeight: 'bold' }}>compras intensas</Text> e oportunidades únicas.
      </Text>
    ),
  },
  {
    icone: '💎',
    nome: 'The Mall at Millenia',
    valor: 'mallMillenia',
    descricao: (
      <Text>
        Luxo e conforto com marcas de alto padrão como{' '}
        <Text style={{ fontWeight: 'bold' }}>Chanel</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Gucci</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Apple</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Prada</Text> e{' '}
        <Text style={{ fontWeight: 'bold' }}>Louis Vuitton</Text>. Perfeito para quem busca{' '}
        <Text style={{ fontWeight: 'bold' }}>experiências refinadas</Text>.
      </Text>
    ),
  },
  {
    icone: '🏬',
    nome: 'Florida Mall',
    valor: 'floridaMall',
    descricao: (
      <Text>
        Shopping tradicional e variado com opções para todas as idades:{' '}
        <Text style={{ fontWeight: 'bold' }}>Macy’s</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Apple</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>GameStop</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Sephora</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Disney Store</Text> e{' '}
        <Text style={{ fontWeight: 'bold' }}>M&M’s</Text>. Ideal para passeios em família.
      </Text>
    ),
  },
  {
    icone: '🧸',
    nome: 'Walmart, Target & Five Below',
    valor: 'walmartTargetFive',
    descricao: (
      <Text>
        Ótimo para <Text style={{ fontWeight: 'bold' }}>lembrancinhas baratas</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>snacks</Text>, itens infantis e utilidades do dia a dia. Perfeito para{' '}
        <Text style={{ fontWeight: 'bold' }}>compras rápidas e práticas</Text>.
      </Text>
    ),
  },
  {
    icone: '🎠',
    nome: 'Disney Springs & CityWalk',
    valor: 'disneySpringsCityWalk',
    descricao: (
      <Text>
        Passeio divertido com lojas temáticas como{' '}
        <Text style={{ fontWeight: 'bold' }}>Disney</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Universal</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>LEGO</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Coca-Cola</Text> e{' '}
        <Text style={{ fontWeight: 'bold' }}>Marvel</Text>. Ideal para{' '}
        <Text style={{ fontWeight: 'bold' }}>curtir a noite</Text> com música e gastronomia.
      </Text>
    ),
  },
  {
    icone: '🖼️',
    nome: 'Lake Buena Vista Factory Stores',
    valor: 'lakeBuenaVista',
    descricao: (
      <Text>
        Outlet mais tranquilo, perfeito para{' '}
        <Text style={{ fontWeight: 'bold' }}>evitar multidões</Text>, com lojas como{' '}
        <Text style={{ fontWeight: 'bold' }}>Reebok</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Nike</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Gap</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>Levi’s</Text> e{' '}
        <Text style={{ fontWeight: 'bold' }}>Carter’s</Text>.
      </Text>
    ),
  },
  {
    icone: '🎨',
    nome: 'Arte local e feirinhas',
    valor: 'arteLocalFeiras',
    descricao: (
      <Text>
        Presentes únicos e <Text style={{ fontWeight: 'bold' }}>produtos artesanais</Text> em feiras e mercados locais.
        Ideal para quem gosta de <Text style={{ fontWeight: 'bold' }}>cultura</Text> e{' '}
        <Text style={{ fontWeight: 'bold' }}>criatividade</Text>.
      </Text>
    ),
  },
];

export default function PerfilComprasPorDiaScreen() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual, atualizarPerfilComprasPorDia, markVisited } = useParkisheiro();

  const [clima, setClima] = useState<any>(null);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // evita reidratar mais de 1x por dia (corrige o "treme-treme")
  const hydratedDatesRef = useRef<Set<string>>(new Set());
  // lock curtinho pra evitar duplo-toque acidental
  const lockRef = useRef(false);

  const diasCompras =
    parkisheiroAtual?.roteiroFinal?.filter((dia: any) => dia.tipo === 'compras') || [];

  const diaAtual = diasCompras[currentIndex];
  const dataISOAtual = diaAtual ? format(new Date(diaAtual.data), 'yyyy-MM-dd') : '';

  useEffect(() => {
    markVisited('PerfilComprasPorDiaScreen');
    buscarClima('28.5383,-81.3792').then(setClima);
    if (diasCompras.length === 0) irParaProximaTela();
  }, []);

  // Reidrata apenas UMA VEZ por data
  useEffect(() => {
    if (!dataISOAtual) return;
    if (hydratedDatesRef.current.has(dataISOAtual)) return;
    const salvo: string | undefined = (diaAtual as any)?.perfilCompras;
    setRespostas(prev => ({ ...prev, [dataISOAtual]: salvo || '' }));
    hydratedDatesRef.current.add(dataISOAtual);
  }, [dataISOAtual]); // <- só quando a data muda

  // Toque otimista (single-select). Sem await aqui.
  const handleSelecionar = (valor: string) => {
    if (!diaAtual || !dataISOAtual) return;
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 120); // lock muito curto

    setRespostas(prev => {
      const atual = prev[dataISOAtual] || '';
      const proximo = atual === valor ? '' : valor; // tocar de novo desmarca
      const novo = { ...prev, [dataISOAtual]: proximo };
      // salva sem bloquear a UI
      atualizarPerfilComprasPorDia(dataISOAtual, proximo).catch(() => {});
      return novo;
    });
  };

  const handleAvancar = async () => {
    const selecionado = respostas[dataISOAtual];
    if (diaAtual && selecionado !== undefined) {
      await atualizarPerfilComprasPorDia(dataISOAtual, selecionado);
    }
    if (currentIndex < diasCompras.length - 1) setCurrentIndex(prev => prev + 1);
    else irParaProximaTela();
  };

  const handleVoltar = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    else navigation.goBack();
  };

  // salva no desfoco (não interfere na UI local)
  useFocusEffect(
    useCallback(() => {
      return () => {
        const selecionado = respostas[dataISOAtual];
        if (diaAtual && selecionado !== undefined) {
          atualizarPerfilComprasPorDia(dataISOAtual, selecionado).catch(() => {});
        }
      };
    }, [dataISOAtual, respostas, diaAtual, atualizarPerfilComprasPorDia])
  );

  const irParaProximaTela = () => {
    const temDescanso = parkisheiroAtual?.roteiroFinal?.some((d: any) => d.tipo === 'descanso');
    const temParque = parkisheiroAtual?.roteiroFinal?.some((d: any) => d.tipo === 'disney' || d.tipo === 'universal');
    if (temDescanso) navigation.replace('PerfilDescansoPorDiaScreen');
    else if (temParque) navigation.replace('PerfilAtracoes');
    else navigation.replace('PerfilRefeicoes');
  };

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });
  const valorSelecionado = dataISOAtual ? respostas[dataISOAtual] : '';

  return (
      <LinearGradient
        colors={[
          '#0077cc', // azul piscina
          '#00c5d4', // turquesa
          '#f5deb3', // areia clara
          '#ffffff', // branco normal
          '#ffffff', // branco final (rasinho bem claro)
        ]}
        locations={[0, 0.3, 0.6, 0.85, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || 'Parcialmente nublado'}
          temperatura={clima?.temp ? `${clima.temp}°C` : '28°C'}
          iconeClima={clima?.icone}
        />
      </View>

      {diasCompras.length > 0 && diaAtual && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.cardPergunta}>
            <Text style={styles.pergunta}>
              🛍️ Escolha o melhor local de compras para este dia:{' '}
              <Text style={styles.dataDia}>
                {format(new Date(diaAtual.data), 'dd/MM/yyyy', { locale: ptBR })} –{' '}
                {format(new Date(diaAtual.data), 'EEEE', { locale: ptBR })}
              </Text>
            </Text>
          </View>

          <View style={styles.blocoDia}>
            {opcoes.map(opcao => {
              const selecionado = valorSelecionado === opcao.valor;
              return (
                <TouchableOpacity
                  key={opcao.valor}
                  style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
                  onPress={() => handleSelecionar(opcao.valor)}
                  activeOpacity={0.9}
                >
                  <View style={styles.linha}>
                    <Text style={styles.nome}>
                      {opcao.icone} {opcao.nome}
                    </Text>
                    {selecionado && (
                      <Ionicons name="checkmark-circle" size={22} color="#0077cc" style={{ marginLeft: 6 }} />
                    )}
                  </View>
                  <Text style={styles.descricao}>{opcao.descricao}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      )}

      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity onPress={handleVoltar} style={styles.botaoSeta}>
          <Ionicons name="arrow-back-circle" size={40} color="#004b87" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAvancar}
          style={styles.botaoSeta}
          disabled={diasCompras.length > 0 && !valorSelecionado}
        >
          <Ionicons
            name="arrow-forward-circle"
            size={40}
            color={diasCompras.length === 0 || valorSelecionado ? '#004b87' : 'rgba(0,75,135,0.3)'}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 0, alignItems: 'center' },
  cardPergunta: { backgroundColor: '#004b87', borderRadius: 12, padding: 10, alignSelf: 'stretch', marginBottom: 10 },
  pergunta: { color: '#fff', fontSize: 12, textAlign: 'justify', lineHeight: 18 },
  dataDia: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  blocoDia: { alignSelf: 'stretch' },
  opcao: { backgroundColor: '#ffffffcc', padding: 10, borderRadius: 10, marginBottom: 10 },
  opcaoSelecionada: { backgroundColor: '#cce6ff', borderWidth: 1.5, borderColor: '#0077cc', borderRadius: 10 },
  nome: { fontSize: 12, fontWeight: 'bold', color: '#003366' },
  descricao: { fontSize: 10, color: '#444', marginTop: 4, textAlign: 'justify', lineHeight: 12 },
  linha: { flexDirection: 'row', alignItems: 'center' },
  rodapeFundo: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#ffffffff', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  rodapeConteudo: { position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
