// src/screens/perfis/PerfilRefeicoesScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { LinearGradient } from 'expo-linear-gradient';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Opcao = { nome: string; valor: string; descricao: JSX.Element };

const opcoes: Opcao[] = [
  {
    nome: 'ðŸ’° EconÃ´mico â€“ RÃ¡pido e barato',
    valor: 'Economico',
    descricao: (
      <Text>
        Para quem quer economizar e ganhar tempo, sem abrir mÃ£o de comer bem. Experimente o clÃ¡ssico{' '}
        <Text style={{ fontWeight: 'bold' }}>Five Guys</Text> (hambÃºrguer artesanal suculento), o prÃ¡tico{' '}
        <Text style={{ fontWeight: 'bold' }}>Panda Express</Text> (asiÃ¡tico rÃ¡pido e saboroso) ou o conveniente{' '}
        <Text style={{ fontWeight: 'bold' }}>Walmart Deli</Text> (refeiÃ§Ãµes prontas e econÃ´micas).
      </Text>
    ),
  },
  {
    nome: 'ðŸŽ  TemÃ¡tico â€“ ExperiÃªncia imersiva',
    valor: 'Tematico',
    descricao: (
      <Text>
        Perfeito para quem busca comer em ambientes cenogrÃ¡ficos e divertidos. Visite o prÃ©-histÃ³rico{' '}
        <Text style={{ fontWeight: 'bold' }}>T-Rex CafÃ©</Text> (dinossauros e efeitos especiais), o retrÃ´{' '}
        <Text style={{ fontWeight: 'bold' }}>Sci-Fi Dine-In</Text> (cinema drive-in dos anos 50) ou o mÃ¡gico{' '}
        <Text style={{ fontWeight: 'bold' }}>Be Our Guest</Text> (castelo da Bela e a Fera).
      </Text>
    ),
  },
  {
    nome: 'ðŸª‘ Conforto â€“ Ambiente calmo',
    valor: 'Conforto',
    descricao: (
      <Text>
        Ideal para uma pausa relaxante com pratos bem servidos. ConheÃ§a o acolhedor{' '}
        <Text style={{ fontWeight: 'bold' }}>Olive Garden</Text> (massas e pÃ£es Ã  vontade), o moderno{' '}
        <Text style={{ fontWeight: 'bold' }}>First Watch</Text> (brunch leve e saudÃ¡vel) ou o famoso{' '}
        <Text style={{ fontWeight: 'bold' }}>The Cheesecake Factory</Text> (menu variado e sobremesas incrÃ­veis).
      </Text>
    ),
  },
  {
    nome: 'ðŸŒ± SaudÃ¡vel â€“ Leve e equilibrado',
    valor: 'Saudavel',
    descricao: (
      <Text>
        Para manter a alimentaÃ§Ã£o leve e saborosa durante o passeio. Visite o buffet fresco do{' '}
        <Text style={{ fontWeight: 'bold' }}>Sweet Tomatoes</Text> (saladas e sopas Ã  vontade), o completo{' '}
        <Text style={{ fontWeight: 'bold' }}>Whole Foods Market</Text> (orgÃ¢nicos e comidas prontas) ou o acolhedor{' '}
        <Text style={{ fontWeight: 'bold' }}>Freshii</Text> (bowls e wraps naturais).
      </Text>
    ),
  },
  {
    nome: 'ðŸ” ClÃ¡ssico â€“ HambÃºrguer e fritas',
    valor: 'Americano',
    descricao: (
      <Text>
        Para sentir o verdadeiro sabor dos EUA em cada mordida. Prove o famoso{' '}
        <Text style={{ fontWeight: 'bold' }}>Shake Shack</Text> (hambÃºrguer com batata crinkle), o vintage{' '}
        <Text style={{ fontWeight: 'bold' }}>Johnny Rockets</Text> (lanchonete estilo anos 50) ou o popular{' '}
        <Text style={{ fontWeight: 'bold' }}>Wendyâ€™s</Text> (clÃ¡ssico fast-food americano).
      </Text>
    ),
  },
];

export default function PerfilRefeicoesScreen() {
  const navigation = useNavigation<any>();
  const { markVisited, salvarPerfil, parkisheiroAtual } = useParkisheiro();

  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [clima, setClima] = useState<any>(null);

  // primeira carga
  useEffect(() => {
    markVisited('PerfilRefeicoesScreen');
    // usar coordenadas de Orlando para evitar erro de geocoding
    buscarClima('28.5383,-81.3792').then(setClima);

    // reidrata opÃ§Ã£o salva (se houver)
    const salvo = parkisheiroAtual?.perfis?.refeicoes?.perfil;
    if (salvo && typeof salvo === 'string') {
      const idx = opcoes.findIndex(o => o.valor === salvo);
      if (idx >= 0) setSelecionado(idx);
    }
  }, []);

  // autosave sempre que selecionar
  useEffect(() => {
    if (selecionado === null) return;
    const valor = opcoes[selecionado].valor;
    salvarPerfil('refeicoes', { perfil: valor });
  }, [selecionado, salvarPerfil]);

  // salva ao sair da tela tambÃ©m
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (selecionado === null) return;
        const valor = opcoes[selecionado].valor;
        salvarPerfil('refeicoes', { perfil: valor });
      };
    }, [selecionado, salvarPerfil])
  );

  const handleAvancar = async () => {
    if (selecionado === null) return;

    // garante persistÃªncia antes de navegar
    const valor = opcoes[selecionado].valor;
    await salvarPerfil('refeicoes', { perfil: valor });

    const primeiroDia = parkisheiroAtual?.roteiroFinal?.[0];
    if (primeiroDia) {
      navigation.replace('DiaCompleto', {
        diaId: primeiroDia.id,
        tipo: primeiroDia.tipo,
        nomeParque: primeiroDia.nomeParque,
      });
    } else {
      navigation.replace('DiaCompleto');
    }
  };

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  return (
    <LinearGradient
      colors={['#0077cc', '#00bfff', '#52D6FF', '#52D6FF']}
      locations={[0, 0.6, 0.9, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia
          data={dataFormatada}
          diaSemana={diaSemana}
          clima={clima?.condicao || 'Parcialmente nublado'}
          temperatura={clima?.temp ? `${clima.temp}Â°C` : '28Â°C'}
          iconeClima={clima?.icone}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.cardPergunta}>
          <Text style={styles.pergunta}>ðŸ½ï¸ Qual seu estilo de refeiÃ§Ã£o?</Text>
        </View>

        {opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={opcao.valor}
            style={[styles.opcao, selecionado === index && styles.opcaoSelecionada]}
            onPress={() => setSelecionado(index)}
          >
            <View style={styles.linha}>
              <Text style={styles.nome}>{opcao.nome}</Text>
              {selecionado === index && (
                <Ionicons name="checkmark-circle" size={22} color="#0077cc" style={{ marginLeft: 6 }} />
              )}
            </View>
            <Text style={styles.descricao}>{opcao.descricao}</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoSeta}>
          <Ionicons name="arrow-back-circle" size={40} color="#004b87" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAvancar} style={styles.botaoSeta} disabled={selecionado === null}>
          <Ionicons
            name="arrow-forward-circle"
            size={40}
            color={selecionado !== null ? '#004b87' : 'rgba(0,75,135,0.3)'}
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
  opcao: { backgroundColor: '#ffffffcc', padding: 10, borderRadius: 10, marginBottom: 10, alignSelf: 'stretch' },
  opcaoSelecionada: { backgroundColor: '#cce6ff', borderWidth: 1.5, borderColor: '#0077cc', borderRadius: 10 },
  nome: { fontSize: 12, fontWeight: 'bold', color: '#003366' },
  descricao: { fontSize: 10, color: '#444', marginTop: 4, textAlign: 'justify', lineHeight: 12 },
  linha: { flexDirection: 'row', alignItems: 'center' },
  rodapeFundo: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#52D6FF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  rodapeConteudo: { position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
