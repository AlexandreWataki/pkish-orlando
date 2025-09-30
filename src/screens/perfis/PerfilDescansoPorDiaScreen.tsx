// src/screens/perfis/PerfilDescansoPorDiaScreen.tsx
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
    icone: '🛍️',
    nome: 'Compras leves + Descanso',
    valor: 'comprasLevesDescanso',
    descricao: (
      <Text>
        Prefere um dia tranquilo com pequenas compras em <Text style={{ fontWeight: 'bold' }}>lojas</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>outlets</Text> ou <Text style={{ fontWeight: 'bold' }}>feirinhas</Text>, intercalando com momentos de{' '}
        <Text style={{ fontWeight: 'bold' }}>descanso</Text> em cafés ou praças aconchegantes. <Text style={{ fontWeight: 'bold' }}>Dica:</Text> explore o{' '}
        <Text style={{ fontWeight: 'bold' }}>Pointe Orlando</Text> ou a charmosa <Text style={{ fontWeight: 'bold' }}>Celebration</Text>.
      </Text>
    ),
  },
  {
    icone: '🌳',
    nome: 'Natureza & Parques abertos',
    valor: 'naturezaParquesAbertos',
    descricao: (
      <Text>
        Gosta de passar o dia em <Text style={{ fontWeight: 'bold' }}>parques</Text>, <Text style={{ fontWeight: 'bold' }}>jardins</Text> ou <Text style={{ fontWeight: 'bold' }}>lagos</Text>, fazendo caminhadas leves ou relaxando ao ar livre. <Text style={{ fontWeight: 'bold' }}>Dica:</Text> visite o{' '}
        <Text style={{ fontWeight: 'bold' }}>Lake Eola</Text> ou o <Text style={{ fontWeight: 'bold' }}>Cranes Roost Park</Text>.
      </Text>
    ),
  },
  {
    icone: '🏙️',
    nome: 'Passeios urbanos tranquilos',
    valor: 'passeiosUrbanos',
    descricao: (
      <Text>
        Prefere explorar a cidade com calma, caminhando por <Text style={{ fontWeight: 'bold' }}>áreas arborizadas</Text>, <Text style={{ fontWeight: 'bold' }}>centros de lazer</Text> e bairros charmosos como{' '}
        <Text style={{ fontWeight: 'bold' }}>Winter Park</Text> ou <Text style={{ fontWeight: 'bold' }}>ICON Park</Text>.
      </Text>
    ),
  },
  {
    icone: '🦅',
    nome: 'Conhecendo os EUA',
    valor: 'conhecendoEUA',
    descricao: (
      <Text>
        Curte a <Text style={{ fontWeight: 'bold' }}>cultura americana</Text>? Este perfil inclui <Text style={{ fontWeight: 'bold' }}>locais históricos</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>memoriais</Text> e bairros típicos como <Text style={{ fontWeight: 'bold' }}>Downtown Orlando</Text> e a{' '}
        <Text style={{ fontWeight: 'bold' }}>Kissimmee histórica</Text>.
      </Text>
    ),
  },
  {
    icone: '🍽️',
    nome: 'Sabores do Mundo',
    valor: 'saboresDoMundo',
    descricao: (
      <Text>
        Ama comer bem e experimentar <Text style={{ fontWeight: 'bold' }}>culturas pela culinária</Text>? Visite cafés e <Text style={{ fontWeight: 'bold' }}>restaurantes temáticos</Text> em{' '}
        <Text style={{ fontWeight: 'bold' }}>Sand Lake Road</Text>, <Text style={{ fontWeight: 'bold' }}>Dr. Phillips</Text> e <Text style={{ fontWeight: 'bold' }}>Celebration</Text>.
      </Text>
    ),
  },
];

export default function PerfilDescansoPorDiaScreen() {
  const navigation = useNavigation<any>();
  const { parkisheiroAtual, atualizarPerfilDescansoPorDia, markVisited } = useParkisheiro();

  const [clima, setClima] = useState<any>(null);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // === Anti "treme-treme" (mesmo padrão do Compras)
  const hydratedDatesRef = useRef<Set<string>>(new Set()); // reidrata 1x por data
  const lockRef = useRef(false); // trava toques muito rápidos

  const diasDescanso =
    parkisheiroAtual?.roteiroFinal?.filter((dia: any) => dia.tipo === 'descanso') || [];
  const diaAtual = diasDescanso[currentIndex];
  const dataISOAtual = diaAtual ? format(new Date(diaAtual.data), 'yyyy-MM-dd') : '';

  // primeira carga
  useEffect(() => {
    markVisited('PerfilDescansoPorDiaScreen');
    buscarClima('28.5383,-81.3792').then(setClima).catch(() => {});
    if (diasDescanso.length === 0) {
      irParaProximaTela();
    }
  }, []);

  // Reidrata apenas UMA VEZ por data (igual Compras)
  useEffect(() => {
    if (!dataISOAtual) return;
    if (hydratedDatesRef.current.has(dataISOAtual)) return;
    const salvo: string | undefined = (diaAtual as any)?.perfilDescanso;
    setRespostas(prev => ({ ...prev, [dataISOAtual]: salvo || '' }));
    hydratedDatesRef.current.add(dataISOAtual);
  }, [dataISOAtual, diaAtual]);

  // Toque otimista (single-select). Salva em background, sem travar UI.
  const handleSelecionar = (valor: string) => {
    if (!diaAtual || !dataISOAtual) return;
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 120); // evita duplo-toque

    setRespostas(prev => {
      const atual = prev[dataISOAtual] || '';
      const proximo = atual === valor ? '' : valor; // tocar de novo desmarca
      const novo = { ...prev, [dataISOAtual]: proximo };
      atualizarPerfilDescansoPorDia(dataISOAtual, proximo).catch(() => {});
      return novo;
    });
  };

  const irParaProximaTela = () => {
    const temParque = parkisheiroAtual?.roteiroFinal?.some(
      (d: any) => d.tipo === 'disney' || d.tipo === 'universal'
    );
    if (temParque) {
      navigation.replace('PerfilAtracoes');
    } else {
      navigation.replace('PerfilRefeicoes');
    }
  };

  const handleAvancar = async () => {
    if (diaAtual) {
      const perfil = respostas[dataISOAtual];
      if (perfil !== undefined) {
        await atualizarPerfilDescansoPorDia(dataISOAtual, perfil).catch(() => {});
      }
    }
    if (currentIndex < diasDescanso.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      irParaProximaTela();
    }
  };

  const handleVoltar = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    else navigation.goBack();
  };

  // salva ao sair da tela (não bloqueia a UI)
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!diaAtual) return;
        const valor = respostas[dataISOAtual];
        if (valor !== undefined) {
          atualizarPerfilDescansoPorDia(dataISOAtual, valor).catch(() => {});
        }
      };
    }, [dataISOAtual, respostas, diaAtual, atualizarPerfilDescansoPorDia])
  );

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

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

      {diasDescanso.length > 0 && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.cardPergunta}>
            <Text style={styles.pergunta}>
              🧘‍♂️ Selecione o estilo ideal de descanso para este dia:{' '}
              {diaAtual && (
                <Text style={styles.dataDia}>
                  {format(new Date(diaAtual.data), 'dd/MM/yyyy', { locale: ptBR })} – {format(new Date(diaAtual.data), 'EEEE', { locale: ptBR })}
                </Text>
              )}
            </Text>
          </View>

          {diaAtual && (
            <View style={styles.blocoDia}>
              {opcoes.map((opcao) => {
                const selecionado = respostas[dataISOAtual] === opcao.valor;
                return (
                  <TouchableOpacity
                    key={opcao.valor}
                    style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
                    onPress={() => handleSelecionar(opcao.valor)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.linha}>
                      <Text style={styles.nome}>{opcao.icone} {opcao.nome}</Text>
                      {selecionado && (
                        <Ionicons name="checkmark-circle" size={22} color="#0077cc" style={{ marginLeft: 6 }} />
                      )}
                    </View>
                    <Text style={styles.descricao}>{opcao.descricao}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

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
          disabled={diasDescanso.length > 0 && !respostas[dataISOAtual]}
        >
          <Ionicons
            name="arrow-forward-circle"
            size={40}
            color={diasDescanso.length === 0 || respostas[dataISOAtual] ? '#004b87' : 'rgba(0,75,135,0.3)'}
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
