// src/screens/perfis/PerfilAtracoesScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useParkisheiro } from '@/contexts/ParkisheiroContext';
import { CabecalhoDia } from '@/components/card/CabecalhoDia';
import { buscarClima } from '@/logic/clima/buscarclima';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AvisoLegal from '@/components/card/AvisoLegal';
import LogoAtencao from '@/components/card/LogoAtencao';

const opcoes = [
  { icone: '🎢', nome: 'Radicais', tipo: 'radicais', descricao: 'Adrenalina pura: VelociCoaster, Rock ’n’ Roller Coaster e Expedition Everest.' },
  { icone: '👨‍👩‍👧', nome: 'Familiares', tipo: 'familiares', descricao: 'Diversão para todas as idades: Peter Pan’s Flight, It’s a Small World e Nemo & Friends.' },
  { icone: '🏰', nome: 'Temáticas', tipo: 'tematicas', descricao: 'Cenários mágicos de filmes: Harry Potter, Star Wars Galaxy’s Edge, Toy Story Land e Frozen Ever After.' },
  { icone: '🎯', nome: 'Interativas', tipo: 'interativas', descricao: 'Atrações que testam suas habilidades: Men in Black, Buzz Lightyear e Toy Story Mania.' },
  { icone: '🌌', nome: 'Imersivas', tipo: 'imersivas', descricao: 'Tecnologia e realismo: Avatar Flight of Passage, Spider-Man e Soarin’.' },
];

// Descrições específicas por parque (mantidas iguais às suas)
const descricoesParque: Record<string, Record<string, JSX.Element>> = {
  'Magic Kingdom': {
    radicais: (
      <Text>
        No Magic Kingdom, os mais corajosos encaram atrações como <Text style={{ fontWeight: 'bold' }}>Space Mountain</Text>, uma montanha-russa veloz no escuro que simula uma jornada espacial; <Text style={{ fontWeight: 'bold' }}>Big Thunder Mountain</Text>, com trilhos por uma mina do velho oeste cheia de curvas e emoção; e a clássica <Text style={{ fontWeight: 'bold' }}>Splash Mountain</Text>, um passeio molhado com músicas animadas e uma grande queda refrescante.
      </Text>
    ),
    familiares: (
      <Text>
        Experiências suaves encantam todas as idades com <Text style={{ fontWeight: 'bold' }}>Peter Pan’s Flight</Text>, que voa sobre Londres até a Terra do Nunca; <Text style={{ fontWeight: 'bold' }}>It’s a Small World</Text>, um barco por culturas e músicas ao redor do mundo; e <Text style={{ fontWeight: 'bold' }}>Dumbo</Text>, que gira pelo céu em elefantes voadores com vista do parque.
      </Text>
    ),
    tematicas: (
      <Text>
        Ambientes mágicos envolvem os visitantes em <Text style={{ fontWeight: 'bold' }}>Adventureland</Text>, com selvas e piratas; <Text style={{ fontWeight: 'bold' }}>Fantasyland</Text>, que traz contos de fadas à vida; e o icônico <Text style={{ fontWeight: 'bold' }}>Castelo da Cinderela</Text>, símbolo da fantasia clássica da Disney.
      </Text>
    ),
    interativas: (
      <Text>
        Atividades participativas como <Text style={{ fontWeight: 'bold' }}>Buzz Lightyear</Text>, onde se atira em alvos em missão espacial; <Text style={{ fontWeight: 'bold' }}>Monsters Inc Laugh Floor</Text>, com comédia ao vivo e respostas do público; e <Text style={{ fontWeight: 'bold' }}>Sorcerers of the Magic Kingdom</Text>, jogo de cartas mágico pelo parque.
      </Text>
    ),
    imersivas: (
      <Text>
        Aventuras profundas com <Text style={{ fontWeight: 'bold' }}>Pirates of the Caribbean</Text>, viagem entre piratas e tesouros; <Text style={{ fontWeight: 'bold' }}>Haunted Mansion</Text>, com fantasmas dançantes e clima misterioso; e <Text style={{ fontWeight: 'bold' }}>Jungle Cruise</Text>, passeio guiado por selvas com piadas e animais animatrônicos.
      </Text>
    ),
  },
  'EPCOT': {
    radicais: (
      <Text>
        Em EPCOT, os aventureiros enfrentam <Text style={{ fontWeight: 'bold' }}>Test Track</Text>, com curvas e acelerações em testes automotivos; e <Text style={{ fontWeight: 'bold' }}>Mission: SPACE</Text>, que simula uma intensa viagem espacial com lançamento e órbita realista.
      </Text>
    ),
    familiares: (
      <Text>
        Momentos mágicos com <Text style={{ fontWeight: 'bold' }}>Frozen Ever After</Text>, passeio por Arendelle com personagens queridos; e <Text style={{ fontWeight: 'bold' }}>The Seas with Nemo & Friends</Text>, mergulho animado por cenários oceânicos coloridos.
      </Text>
    ),
    tematicas: (
      <Text>
        Descubra o mundo em <Text style={{ fontWeight: 'bold' }}>World Showcase</Text>, com pavilhões de países, e conheça a evolução da comunicação em <Text style={{ fontWeight: 'bold' }}>Spaceship Earth</Text>, dentro do icônico globo.
      </Text>
    ),
    interativas: (
      <Text>
        A criatividade ganha vida em <Text style={{ fontWeight: 'bold' }}>Journey Into Imagination</Text>, com o dragão Figment, e em <Text style={{ fontWeight: 'bold' }}>Exibições Interativas</Text>, cheias de ciência e diversão prática.
      </Text>
    ),
    imersivas: (
      <Text>
        Viva experiências únicas em <Text style={{ fontWeight: 'bold' }}>Soarin’</Text>, um voo de asa-delta por paisagens mundiais, e em <Text style={{ fontWeight: 'bold' }}>Ratatouille Adventure</Text>, uma corrida 4D deliciosa pelo restaurante de Gusteau.
      </Text>
    ),
  },
  'Hollywood Studios': {
    radicais: (
      <Text>
        No Hollywood Studios, a emoção atinge o ápice com <Text style={{ fontWeight: 'bold' }}>Rock ’n’ Roller Coaster</Text>, uma montanha-russa com loops e trilha sonora do Aerosmith; e <Text style={{ fontWeight: 'bold' }}>Tower of Terror</Text>, onde um elevador despenca em quedas imprevisíveis com efeitos assustadores.
      </Text>
    ),
    familiares: (
      <Text>
        Diversão em família com <Text style={{ fontWeight: 'bold' }}>Toy Story Mania</Text>, jogo 3D interativo cheio de desafios; e <Text style={{ fontWeight: 'bold' }}>Alien Swirling Saucers</Text>, giros suaves inspirados nos aliens de Toy Story.
      </Text>
    ),
    tematicas: (
      <Text>
        Imersão total em <Text style={{ fontWeight: 'bold' }}>Star Wars Galaxy’s Edge</Text>, uma vila espacial detalhada; e <Text style={{ fontWeight: 'bold' }}>Toy Story Land</Text>, onde tudo é gigante como se você fosse um brinquedo.
      </Text>
    ),
    interativas: (
      <Text>
        Participe de aventuras como <Text style={{ fontWeight: 'bold' }}>Millennium Falcon Smugglers Run</Text>, onde você pilota a nave em missão; e <Text style={{ fontWeight: 'bold' }}>Frozen Sing-Along</Text>, um show musical divertido com efeitos gelados.
      </Text>
    ),
    imersivas: (
      <Text>
        Experiências cinematográficas em <Text style={{ fontWeight: 'bold' }}>Rise of the Resistance</Text>, com perseguições e animatrônicos; e <Text style={{ fontWeight: 'bold' }}>MuppetVision 3D</Text>, um show 3D cômico com efeitos interativos.
      </Text>
    ),
  },
  'Animal Kingdom': {
    radicais: (
      <Text>
        No Animal Kingdom, sinta a adrenalina na <Text style={{ fontWeight: 'bold' }}>Expedition Everest</Text>, com trilhos velozes e encontro com o Yeti; e na <Text style={{ fontWeight: 'bold' }}>Avatar Flight of Passage</Text>, um voo em banshee por Pandora em 3D.
      </Text>
    ),
    familiares: (
      <Text>
        Atividades para todos em <Text style={{ fontWeight: 'bold' }}>Kilimanjaro Safaris</Text>, passeio por savanas africanas; e <Text style={{ fontWeight: 'bold' }}>Triceratop Spin</Text>, carrossel giratório de dinossauros.
      </Text>
    ),
    tematicas: (
      <Text>
        Viva culturas e mundos como <Text style={{ fontWeight: 'bold' }}>África</Text>, com música e dança; e <Text style={{ fontWeight: 'bold' }}>Pandora</Text>, com bioluminescência e natureza fantástica.
      </Text>
    ),
    interativas: (
      <Text>
        Participe dos <Text style={{ fontWeight: 'bold' }}>Tambores africanos</Text>, com ritmos vibrantes, e explore o <Text style={{ fontWeight: 'bold' }}>Boneyard</Text>, área infantil de escavação de fósseis.
      </Text>
    ),
    imersivas: (
      <Text>
        Embarque no <Text style={{ fontWeight: 'bold' }}>Na’vi River Journey</Text>, um passeio de barco por florestas brilhantes; e assista ao <Text style={{ fontWeight: 'bold' }}>It’s Tough to Be a Bug</Text>, show 3D cheio de surpresas.
      </Text>
    ),
  },
  'Universal Studios': {
    radicais: (
      <Text>
        Em Universal Studios, a adrenalina começa com a <Text style={{ fontWeight: 'bold' }}>Rip Ride Rockit</Text>, montanha-russa veloz com música personalizada e queda quase vertical, e <Text style={{ fontWeight: 'bold' }}>Revenge of the Mummy</Text>, uma aventura escura com fogo, sustos e reviravoltas surpreendentes.
      </Text>
    ),
    familiares: (
      <Text>
        Diversão para todos com <Text style={{ fontWeight: 'bold' }}>Despicable Me Minion Mayhem</Text>, simulação com os Minions cheia de trapalhadas, e <Text style={{ fontWeight: 'bold' }}>Shrek 4D</Text>, cinema interativo com vibrações e efeitos durante a história do ogro.
      </Text>
    ),
    tematicas: (
      <Text>
        Explore <Text style={{ fontWeight: 'bold' }}>Harry Potter Diagon Alley</Text>, com becos mágicos e lojas temáticas, e mergulhe no humor de <Text style={{ fontWeight: 'bold' }}>Springfield dos Simpsons</Text>, com restaurantes, lojas e atrações divertidas.
      </Text>
    ),
    interativas: (
      <Text>
        Torne-se herói em <Text style={{ fontWeight: 'bold' }}>Men in Black Alien Attack</Text>, atirando em alienígenas para marcar pontos, e divirta-se no <Text style={{ fontWeight: 'bold' }}>Kang & Kodos Twirl</Text>, passeio giratório com os famosos aliens dos Simpsons.
      </Text>
    ),
    imersivas: (
      <Text>
        Viva batalhas épicas em <Text style={{ fontWeight: 'bold' }}>Transformers</Text>, com robôs em 3D e efeitos explosivos, e no <Text style={{ fontWeight: 'bold' }}>Bourne Stuntacular</Text>, show ao vivo com acrobacias, tecnologia e cenas de ação realistas.
      </Text>
    ),
  },
  'Islands of Adventure': {
    radicais: (
      <Text>
        Enfrente emoções extremas na <Text style={{ fontWeight: 'bold' }}>VelociCoaster</Text>, montanha-russa com inversões e dinossauros, e na <Text style={{ fontWeight: 'bold' }}>The Incredible Hulk</Text>, com arrancadas potentes, loopings e giros de tirar o fôlego.
      </Text>
    ),
    familiares: (
      <Text>
        Aventure-se com a família no <Text style={{ fontWeight: 'bold' }}>Popeye</Text>, uma jornada aquática cheia de correntezas e respingos, e no <Text style={{ fontWeight: 'bold' }}>Cat in the Hat</Text>, passeio lúdico pelos contos do Dr. Seuss.
      </Text>
    ),
    tematicas: (
      <Text>
        Descubra <Text style={{ fontWeight: 'bold' }}>Hogsmeade</Text>, vila mágica do universo Harry Potter, e explore <Text style={{ fontWeight: 'bold' }}>Jurassic Park</Text>, com dinossauros animatrônicos em selvas tropicais.
      </Text>
    ),
    interativas: (
      <Text>
        Encare surpresas em <Text style={{ fontWeight: 'bold' }}>Skull Island</Text>, com King Kong realista, e aprenda brincando no <Text style={{ fontWeight: 'bold' }}>Discovery Center</Text>, centro educativo de dinossauros com experiências interativas.
      </Text>
    ),
    imersivas: (
      <Text>
        Voe com <Text style={{ fontWeight: 'bold' }}>Forbidden Journey</Text>, acompanhando Harry Potter por castelos e criaturas mágicas, e sinta a ação em <Text style={{ fontWeight: 'bold' }}>King Kong</Text>, experiência 4D com criaturas gigantes.
      </Text>
    ),
  },
  'Epic Universe': {
    radicais: (
      <Text>
        Em Epic Universe, desafie os limites na <Text style={{ fontWeight: 'bold' }}>How to Train Your Dragon</Text>, montanha-russa veloz entre cenários vikings, e na <Text style={{ fontWeight: 'bold' }}>Starfall Racers</Text>, corrida aérea com giros futuristas e muita adrenalina.
      </Text>
    ),
    familiares: (
      <Text>
        Diversão para todos com <Text style={{ fontWeight: 'bold' }}>Super Nintendo World</Text>, cheio de cores e desafios com Mario e Luigi, e o <Text style={{ fontWeight: 'bold' }}>Hotel Monstro</Text>, uma atração temática repleta de surpresas e humor monstruoso.
      </Text>
    ),
    tematicas: (
      <Text>
        Explore o <Text style={{ fontWeight: 'bold' }}>Ministério da Magia</Text>, com feitiços e corredores mágicos, e encante-se com o <Text style={{ fontWeight: 'bold' }}>Celestial Park</Text>, jardins futuristas cheios de iluminação e detalhes cósmicos.
      </Text>
    ),
    interativas: (
      <Text>
        Corra com emoção em <Text style={{ fontWeight: 'bold' }}>Mario Kart</Text>, atração interativa com realidade aumentada, e salte obstáculos em <Text style={{ fontWeight: 'bold' }}>Donkey Kong</Text>, trilho interativo em cenários tropicais.
      </Text>
    ),
    imersivas: (
      <Text>
        Sinta-se dentro de mundos completos com os <Text style={{ fontWeight: 'bold' }}>Mundos Temáticos</Text>, cheios de sons, cheiros e visuais envolventes, e curta as <Text style={{ fontWeight: 'bold' }}>Atrações 4D exclusivas</Text>, que misturam simulação, movimento e tecnologia de ponta.
      </Text>
    ),
  }
};

function normalizarParque(nome?: string) {
  if (!nome) return '';
  const key = nome.trim().toLowerCase();
  if (key.includes('epic')) return 'Epic Universe';
  if (key.includes('islands')) return 'Islands of Adventure';
  if (key.includes('studios')) return 'Universal Studios';
  if (key.includes('magic')) return 'Magic Kingdom';
  if (key.includes('animal')) return 'Animal Kingdom';
  if (key.includes('hollywood')) return 'Hollywood Studios';
  if (key.includes('epcot')) return 'EPCOT';
  return nome;
}

export default function PerfilAtracoesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { markVisited, parkisheiroAtual, atualizarPerfilAtracoesPorDia } = useParkisheiro();
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [clima, setClima] = useState<any>(null);

  useEffect(() => {
    if (!parkisheiroAtual?.roteiroFinal?.length) navigation.replace('MenuPrincipal');
  }, []);

  const indice = route.params?.indice ?? 0;
  const diasParque = (parkisheiroAtual.roteiroFinal || []).filter(d => d.tipo === 'disney' || d.tipo === 'universal');
  const diaAtual = diasParque[indice];

  useEffect(() => {
    markVisited('PerfilAtracoesScreen');
    buscarClima('Orlando').then(setClima);

    if (diaAtual && diaAtual.perfilAtracoes?.valor) {
      if (Array.isArray(diaAtual.perfilAtracoes.valor)) {
        const idxs = diaAtual.perfilAtracoes.valor
          .map((tipo: string) => opcoes.findIndex(o => o.tipo === tipo))
          .filter(i => i >= 0);
        setSelecionados(idxs);
      } else {
        const idx = opcoes.findIndex(o => o.tipo === diaAtual.perfilAtracoes.valor);
        setSelecionados(idx >= 0 ? [idx] : []);
      }
    } else {
      setSelecionados([]);
    }
  }, [indice, parkisheiroAtual.id]);

  const handleAvancar = async () => {
    if (selecionados.length !== 2 || !diaAtual) return;

    const perfisEscolhidos = selecionados.map(i => opcoes[i]);
    const perfilObj = {
      valor: perfisEscolhidos.map(p => p.tipo),
      nome: perfisEscolhidos.map(p => p.nome),
      icone: perfisEscolhidos.map(p => p.icone),
    };

    // ✅ grava apenas no contexto (não salva arquivo em /data)
    await atualizarPerfilAtracoesPorDia(format(diaAtual.data, 'yyyy-MM-dd'), perfilObj);

    if (indice < diasParque.length - 1) {
      navigation.replace('PerfilAtracoes', { indice: indice + 1 });
    } else {
      const temRefeicao = (parkisheiroAtual.roteiroFinal || []).length > 0;
      navigation.replace(temRefeicao ? 'PerfilRefeicoes' : 'DiaCompleto');
    }
  };

  const handleVoltar = () => {
    if (indice > 0) navigation.replace('PerfilAtracoes', { indice: indice - 1 });
    else navigation.goBack();
  };

  const handleSelecionar = (index: number) => {
    if (selecionados.includes(index)) setSelecionados(selecionados.filter(i => i !== index));
    else if (selecionados.length < 2) setSelecionados([...selecionados, index]);
  };

  const hoje = new Date();
  const dataFormatada = format(hoje, 'dd/MM/yyyy');
  const diaSemana = format(hoje, 'EEEE', { locale: ptBR });

  if (!diaAtual) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Não há dias de parque para preencher perfil de atrações!</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
          <Ionicons name="arrow-back-circle" size={48} color="#004b87" />
        </TouchableOpacity>
      </View>
    );
  }

  const nomeParque = diaAtual.nomeParque || (diaAtual.tipo === 'disney' ? 'Parque Disney' : 'Universal');
  const nomeNormalizado = normalizarParque(nomeParque);

  function getDescricao(tipo: string) {
    const descEspecifica = descricoesParque[nomeNormalizado]?.[tipo];
    return descEspecifica || opcoes.find(o => o.tipo === tipo)?.descricao || '';
  }

  return (
    <LinearGradient colors={['#0077cc', '#00bfff', '#52D6FF', '#52D6FF']} locations={[0, 0.6, 0.9, 1]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <CabecalhoDia titulo="" data={dataFormatada} diaSemana={diaSemana} clima={clima?.condicao || 'Parcialmente nublado'} temperatura={clima?.temp ? `${clima.temp}°C` : '28°C'} iconeClima={clima?.icone} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.caixaPergunta}>
          <Text style={styles.pergunta}>
            🚀 Escolha <Text style={styles.destaque}>DOIS(2)</Text> perfis de atração
          </Text>

          {/* Linha com nome do parque – ícone piscante – 'guia não oficial' – data */}
          <View style={styles.perguntaLinha}>
            <Text style={styles.tituloDia}>{nomeParque}</Text>
            <Text style={styles.tracinho}> - </Text>

            <View style={styles.subInfoWrap}>
              <LogoAtencao size={14} color="#FFFFFF" blink />
              <Text style={styles.subInfo}> guia não oficial</Text>
            </View>

            <Text style={styles.tracinho}>  </Text>
            <Text style={styles.tituloDia}>
              {format(diaAtual.data, 'dd/MM/yyyy', { locale: ptBR })} – {format(diaAtual.data, 'EEEE', { locale: ptBR })}
            </Text>
          </View>
        </View>

        {opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.opcao, selecionados.includes(index) && styles.opcaoSelecionada]}
            onPress={() => handleSelecionar(index)}
            disabled={selecionados.length === 2 && !selecionados.includes(index)}
          >
            <View style={styles.linha}>
              <Text style={styles.icone}>{opcao.icone}</Text>
              <Text style={styles.nome}>{opcao.nome}</Text>
              {selecionados.includes(index) && <Ionicons name="checkmark-circle" size={22} color="#0077cc" style={{ marginLeft: 10 }} />}
            </View>
            <Text style={styles.descricao}>{getDescricao(opcao.tipo)}</Text>
          </TouchableOpacity>
        ))}

        {/* 🔵 ÚLTIMO CARD: aviso legal com MESMA largura/raio/espaçamento dos outros cards */}
        <View style={styles.cardAviso}>
          <AvisoLegal theme="blue" fixoNoRodape={false}>
            App independente sem vínculo Disney/Universal.
          </AvisoLegal>
        </View>

        <View style={{ height: 150 }} />
      </ScrollView>

      <View style={styles.rodapeFundo} />
      <View style={styles.rodapeConteudo}>
        <TouchableOpacity onPress={handleVoltar} style={styles.botaoSeta}>
          <Ionicons name="arrow-back-circle" size={40} color="#004b87" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAvancar} style={styles.botaoSeta} disabled={selecionados.length !== 2}>
          <Ionicons name="arrow-forward-circle" size={40} color={selecionados.length === 2 ? '#004b87' : 'rgba(0,75,135,0.3)'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emptyText: { color: '#003366', fontSize: 12, margin: 24, textAlign: 'justify', lineHeight: 18 },
  scroll: { padding: 20, paddingBottom: 0, alignItems: 'center' },

  caixaPergunta: {
    backgroundColor: '#004b87',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  pergunta: { color: '#fff', fontSize: 10, textAlign: 'justify', lineHeight: 12 },
  destaque: { fontWeight: 'bold', color: '#fff' },
  tituloDia: { fontSize: 12, fontWeight: 'bold', color: '#fff' },

  // linha flexível para caber em telas menores (quebra com wrap)
  perguntaLinha: {
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tracinho: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subInfoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subInfo: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },

  opcao: { backgroundColor: '#ffffffcc', padding: 10, borderRadius: 10, marginBottom: 10, alignSelf: 'stretch' },
  opcaoSelecionada: { backgroundColor: '#cce6ff', borderWidth: 1.5, borderColor: '#0077cc', borderRadius: 10 },

  icone: { fontSize: 12, marginRight: 8 },
  nome: { fontSize: 12, fontWeight: 'bold', color: '#003366' },
  descricao: { fontSize: 10, color: '#444', marginTop: 4, textAlign: 'justify', lineHeight: 12 },
  linha: { flexDirection: 'row', alignItems: 'center' },

  // 🔵 Aviso legal com mesmo tamanho/raio/espaçamento dos cards
cardAviso: {
  backgroundColor: '#004b87',  // ou use o tema do AvisoLegal
  borderRadius: 10,
  marginBottom: 10,
  marginTop: 0,
  alignSelf: 'stretch',   // ⬅️ isso garante mesma largura dos outros
},


  rodapeFundo: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#52D6FF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  rodapeConteudo: { position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
