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
  { icone: 'ðŸŽ¢', nome: 'Radicais', tipo: 'radicais', descricao: 'Adrenalina pura: VelociCoaster, Rock â€™nâ€™ Roller Coaster e Expedition Everest.' },
  { icone: 'ðŸ‘¨â€ðŸ‘©â€ðŸ‘§', nome: 'Familiares', tipo: 'familiares', descricao: 'DiversÃ£o para todas as idades: Peter Panâ€™s Flight, Itâ€™s a Small World e Nemo & Friends.' },
  { icone: 'ðŸ°', nome: 'TemÃ¡ticas', tipo: 'tematicas', descricao: 'CenÃ¡rios mÃ¡gicos de filmes: Harry Potter, Star Wars Galaxyâ€™s Edge, Toy Story Land e Frozen Ever After.' },
  { icone: 'ðŸŽ¯', nome: 'Interativas', tipo: 'interativas', descricao: 'AtraÃ§Ãµes que testam suas habilidades: Men in Black, Buzz Lightyear e Toy Story Mania.' },
  { icone: 'ðŸŒŒ', nome: 'Imersivas', tipo: 'imersivas', descricao: 'Tecnologia e realismo: Avatar Flight of Passage, Spider-Man e Soarinâ€™.' },
];

// DescriÃ§Ãµes especÃ­ficas por parque (mantidas iguais Ã s suas)
const descricoesParque: Record<string, Record<string, JSX.Element>> = {
  'Magic Kingdom': {
    radicais: (
      <Text>
        No Magic Kingdom, os mais corajosos encaram atraÃ§Ãµes como <Text style={{ fontWeight: 'bold' }}>Space Mountain</Text>, uma montanha-russa veloz no escuro que simula uma jornada espacial; <Text style={{ fontWeight: 'bold' }}>Big Thunder Mountain</Text>, com trilhos por uma mina do velho oeste cheia de curvas e emoÃ§Ã£o; e a clÃ¡ssica <Text style={{ fontWeight: 'bold' }}>Splash Mountain</Text>, um passeio molhado com mÃºsicas animadas e uma grande queda refrescante.
      </Text>
    ),
    familiares: (
      <Text>
        ExperiÃªncias suaves encantam todas as idades com <Text style={{ fontWeight: 'bold' }}>Peter Panâ€™s Flight</Text>, que voa sobre Londres atÃ© a Terra do Nunca; <Text style={{ fontWeight: 'bold' }}>Itâ€™s a Small World</Text>, um barco por culturas e mÃºsicas ao redor do mundo; e <Text style={{ fontWeight: 'bold' }}>Dumbo</Text>, que gira pelo cÃ©u em elefantes voadores com vista do parque.
      </Text>
    ),
    tematicas: (
      <Text>
        Ambientes mÃ¡gicos envolvem os visitantes em <Text style={{ fontWeight: 'bold' }}>Adventureland</Text>, com selvas e piratas; <Text style={{ fontWeight: 'bold' }}>Fantasyland</Text>, que traz contos de fadas Ã  vida; e o icÃ´nico <Text style={{ fontWeight: 'bold' }}>Castelo da Cinderela</Text>, sÃ­mbolo da fantasia clÃ¡ssica da Disney.
      </Text>
    ),
    interativas: (
      <Text>
        Atividades participativas como <Text style={{ fontWeight: 'bold' }}>Buzz Lightyear</Text>, onde se atira em alvos em missÃ£o espacial; <Text style={{ fontWeight: 'bold' }}>Monsters Inc Laugh Floor</Text>, com comÃ©dia ao vivo e respostas do pÃºblico; e <Text style={{ fontWeight: 'bold' }}>Sorcerers of the Magic Kingdom</Text>, jogo de cartas mÃ¡gico pelo parque.
      </Text>
    ),
    imersivas: (
      <Text>
        Aventuras profundas com <Text style={{ fontWeight: 'bold' }}>Pirates of the Caribbean</Text>, viagem entre piratas e tesouros; <Text style={{ fontWeight: 'bold' }}>Haunted Mansion</Text>, com fantasmas danÃ§antes e clima misterioso; e <Text style={{ fontWeight: 'bold' }}>Jungle Cruise</Text>, passeio guiado por selvas com piadas e animais animatrÃ´nicos.
      </Text>
    ),
  },
  'EPCOT': {
    radicais: (
      <Text>
        Em EPCOT, os aventureiros enfrentam <Text style={{ fontWeight: 'bold' }}>Test Track</Text>, com curvas e aceleraÃ§Ãµes em testes automotivos; e <Text style={{ fontWeight: 'bold' }}>Mission: SPACE</Text>, que simula uma intensa viagem espacial com lanÃ§amento e Ã³rbita realista.
      </Text>
    ),
    familiares: (
      <Text>
        Momentos mÃ¡gicos com <Text style={{ fontWeight: 'bold' }}>Frozen Ever After</Text>, passeio por Arendelle com personagens queridos; e <Text style={{ fontWeight: 'bold' }}>The Seas with Nemo & Friends</Text>, mergulho animado por cenÃ¡rios oceÃ¢nicos coloridos.
      </Text>
    ),
    tematicas: (
      <Text>
        Descubra o mundo em <Text style={{ fontWeight: 'bold' }}>World Showcase</Text>, com pavilhÃµes de paÃ­ses, e conheÃ§a a evoluÃ§Ã£o da comunicaÃ§Ã£o em <Text style={{ fontWeight: 'bold' }}>Spaceship Earth</Text>, dentro do icÃ´nico globo.
      </Text>
    ),
    interativas: (
      <Text>
        A criatividade ganha vida em <Text style={{ fontWeight: 'bold' }}>Journey Into Imagination</Text>, com o dragÃ£o Figment, e em <Text style={{ fontWeight: 'bold' }}>ExibiÃ§Ãµes Interativas</Text>, cheias de ciÃªncia e diversÃ£o prÃ¡tica.
      </Text>
    ),
    imersivas: (
      <Text>
        Viva experiÃªncias Ãºnicas em <Text style={{ fontWeight: 'bold' }}>Soarinâ€™</Text>, um voo de asa-delta por paisagens mundiais, e em <Text style={{ fontWeight: 'bold' }}>Ratatouille Adventure</Text>, uma corrida 4D deliciosa pelo restaurante de Gusteau.
      </Text>
    ),
  },
  'Hollywood Studios': {
    radicais: (
      <Text>
        No Hollywood Studios, a emoÃ§Ã£o atinge o Ã¡pice com <Text style={{ fontWeight: 'bold' }}>Rock â€™nâ€™ Roller Coaster</Text>, uma montanha-russa com loops e trilha sonora do Aerosmith; e <Text style={{ fontWeight: 'bold' }}>Tower of Terror</Text>, onde um elevador despenca em quedas imprevisÃ­veis com efeitos assustadores.
      </Text>
    ),
    familiares: (
      <Text>
        DiversÃ£o em famÃ­lia com <Text style={{ fontWeight: 'bold' }}>Toy Story Mania</Text>, jogo 3D interativo cheio de desafios; e <Text style={{ fontWeight: 'bold' }}>Alien Swirling Saucers</Text>, giros suaves inspirados nos aliens de Toy Story.
      </Text>
    ),
    tematicas: (
      <Text>
        ImersÃ£o total em <Text style={{ fontWeight: 'bold' }}>Star Wars Galaxyâ€™s Edge</Text>, uma vila espacial detalhada; e <Text style={{ fontWeight: 'bold' }}>Toy Story Land</Text>, onde tudo Ã© gigante como se vocÃª fosse um brinquedo.
      </Text>
    ),
    interativas: (
      <Text>
        Participe de aventuras como <Text style={{ fontWeight: 'bold' }}>Millennium Falcon Smugglers Run</Text>, onde vocÃª pilota a nave em missÃ£o; e <Text style={{ fontWeight: 'bold' }}>Frozen Sing-Along</Text>, um show musical divertido com efeitos gelados.
      </Text>
    ),
    imersivas: (
      <Text>
        ExperiÃªncias cinematogrÃ¡ficas em <Text style={{ fontWeight: 'bold' }}>Rise of the Resistance</Text>, com perseguiÃ§Ãµes e animatrÃ´nicos; e <Text style={{ fontWeight: 'bold' }}>MuppetVision 3D</Text>, um show 3D cÃ´mico com efeitos interativos.
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
        Atividades para todos em <Text style={{ fontWeight: 'bold' }}>Kilimanjaro Safaris</Text>, passeio por savanas africanas; e <Text style={{ fontWeight: 'bold' }}>Triceratop Spin</Text>, carrossel giratÃ³rio de dinossauros.
      </Text>
    ),
    tematicas: (
      <Text>
        Viva culturas e mundos como <Text style={{ fontWeight: 'bold' }}>Ãfrica</Text>, com mÃºsica e danÃ§a; e <Text style={{ fontWeight: 'bold' }}>Pandora</Text>, com bioluminescÃªncia e natureza fantÃ¡stica.
      </Text>
    ),
    interativas: (
      <Text>
        Participe dos <Text style={{ fontWeight: 'bold' }}>Tambores africanos</Text>, com ritmos vibrantes, e explore o <Text style={{ fontWeight: 'bold' }}>Boneyard</Text>, Ã¡rea infantil de escavaÃ§Ã£o de fÃ³sseis.
      </Text>
    ),
    imersivas: (
      <Text>
        Embarque no <Text style={{ fontWeight: 'bold' }}>Naâ€™vi River Journey</Text>, um passeio de barco por florestas brilhantes; e assista ao <Text style={{ fontWeight: 'bold' }}>Itâ€™s Tough to Be a Bug</Text>, show 3D cheio de surpresas.
      </Text>
    ),
  },
  'Universal Studios': {
    radicais: (
      <Text>
        Em Universal Studios, a adrenalina comeÃ§a com a <Text style={{ fontWeight: 'bold' }}>Rip Ride Rockit</Text>, montanha-russa veloz com mÃºsica personalizada e queda quase vertical, e <Text style={{ fontWeight: 'bold' }}>Revenge of the Mummy</Text>, uma aventura escura com fogo, sustos e reviravoltas surpreendentes.
      </Text>
    ),
    familiares: (
      <Text>
        DiversÃ£o para todos com <Text style={{ fontWeight: 'bold' }}>Despicable Me Minion Mayhem</Text>, simulaÃ§Ã£o com os Minions cheia de trapalhadas, e <Text style={{ fontWeight: 'bold' }}>Shrek 4D</Text>, cinema interativo com vibraÃ§Ãµes e efeitos durante a histÃ³ria do ogro.
      </Text>
    ),
    tematicas: (
      <Text>
        Explore <Text style={{ fontWeight: 'bold' }}>Harry Potter Diagon Alley</Text>, com becos mÃ¡gicos e lojas temÃ¡ticas, e mergulhe no humor de <Text style={{ fontWeight: 'bold' }}>Springfield dos Simpsons</Text>, com restaurantes, lojas e atraÃ§Ãµes divertidas.
      </Text>
    ),
    interativas: (
      <Text>
        Torne-se herÃ³i em <Text style={{ fontWeight: 'bold' }}>Men in Black Alien Attack</Text>, atirando em alienÃ­genas para marcar pontos, e divirta-se no <Text style={{ fontWeight: 'bold' }}>Kang & Kodos Twirl</Text>, passeio giratÃ³rio com os famosos aliens dos Simpsons.
      </Text>
    ),
    imersivas: (
      <Text>
        Viva batalhas Ã©picas em <Text style={{ fontWeight: 'bold' }}>Transformers</Text>, com robÃ´s em 3D e efeitos explosivos, e no <Text style={{ fontWeight: 'bold' }}>Bourne Stuntacular</Text>, show ao vivo com acrobacias, tecnologia e cenas de aÃ§Ã£o realistas.
      </Text>
    ),
  },
  'Islands of Adventure': {
    radicais: (
      <Text>
        Enfrente emoÃ§Ãµes extremas na <Text style={{ fontWeight: 'bold' }}>VelociCoaster</Text>, montanha-russa com inversÃµes e dinossauros, e na <Text style={{ fontWeight: 'bold' }}>The Incredible Hulk</Text>, com arrancadas potentes, loopings e giros de tirar o fÃ´lego.
      </Text>
    ),
    familiares: (
      <Text>
        Aventure-se com a famÃ­lia no <Text style={{ fontWeight: 'bold' }}>Popeye</Text>, uma jornada aquÃ¡tica cheia de correntezas e respingos, e no <Text style={{ fontWeight: 'bold' }}>Cat in the Hat</Text>, passeio lÃºdico pelos contos do Dr. Seuss.
      </Text>
    ),
    tematicas: (
      <Text>
        Descubra <Text style={{ fontWeight: 'bold' }}>Hogsmeade</Text>, vila mÃ¡gica do universo Harry Potter, e explore <Text style={{ fontWeight: 'bold' }}>Jurassic Park</Text>, com dinossauros animatrÃ´nicos em selvas tropicais.
      </Text>
    ),
    interativas: (
      <Text>
        Encare surpresas em <Text style={{ fontWeight: 'bold' }}>Skull Island</Text>, com King Kong realista, e aprenda brincando no <Text style={{ fontWeight: 'bold' }}>Discovery Center</Text>, centro educativo de dinossauros com experiÃªncias interativas.
      </Text>
    ),
    imersivas: (
      <Text>
        Voe com <Text style={{ fontWeight: 'bold' }}>Forbidden Journey</Text>, acompanhando Harry Potter por castelos e criaturas mÃ¡gicas, e sinta a aÃ§Ã£o em <Text style={{ fontWeight: 'bold' }}>King Kong</Text>, experiÃªncia 4D com criaturas gigantes.
      </Text>
    ),
  },
  'Epic Universe': {
    radicais: (
      <Text>
        Em Epic Universe, desafie os limites na <Text style={{ fontWeight: 'bold' }}>How to Train Your Dragon</Text>, montanha-russa veloz entre cenÃ¡rios vikings, e na <Text style={{ fontWeight: 'bold' }}>Starfall Racers</Text>, corrida aÃ©rea com giros futuristas e muita adrenalina.
      </Text>
    ),
    familiares: (
      <Text>
        DiversÃ£o para todos com <Text style={{ fontWeight: 'bold' }}>Super Nintendo World</Text>, cheio de cores e desafios com Mario e Luigi, e o <Text style={{ fontWeight: 'bold' }}>Hotel Monstro</Text>, uma atraÃ§Ã£o temÃ¡tica repleta de surpresas e humor monstruoso.
      </Text>
    ),
    tematicas: (
      <Text>
        Explore o <Text style={{ fontWeight: 'bold' }}>MinistÃ©rio da Magia</Text>, com feitiÃ§os e corredores mÃ¡gicos, e encante-se com o <Text style={{ fontWeight: 'bold' }}>Celestial Park</Text>, jardins futuristas cheios de iluminaÃ§Ã£o e detalhes cÃ³smicos.
      </Text>
    ),
    interativas: (
      <Text>
        Corra com emoÃ§Ã£o em <Text style={{ fontWeight: 'bold' }}>Mario Kart</Text>, atraÃ§Ã£o interativa com realidade aumentada, e salte obstÃ¡culos em <Text style={{ fontWeight: 'bold' }}>Donkey Kong</Text>, trilho interativo em cenÃ¡rios tropicais.
      </Text>
    ),
    imersivas: (
      <Text>
        Sinta-se dentro de mundos completos com os <Text style={{ fontWeight: 'bold' }}>Mundos TemÃ¡ticos</Text>, cheios de sons, cheiros e visuais envolventes, e curta as <Text style={{ fontWeight: 'bold' }}>AtraÃ§Ãµes 4D exclusivas</Text>, que misturam simulaÃ§Ã£o, movimento e tecnologia de ponta.
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

    // âœ… grava apenas no contexto (nÃ£o salva arquivo em /data)
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
        <Text style={styles.emptyText}>NÃ£o hÃ¡ dias de parque para preencher perfil de atraÃ§Ãµes!</Text>
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
        <CabecalhoDia titulo="" data={dataFormatada} diaSemana={diaSemana} clima={clima?.condicao || 'Parcialmente nublado'} temperatura={clima?.temp ? `${clima.temp}Â°C` : '28Â°C'} iconeClima={clima?.icone} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.caixaPergunta}>
          <Text style={styles.pergunta}>
            ðŸš€ Escolha <Text style={styles.destaque}>DOIS(2)</Text> perfis de atraÃ§Ã£o
          </Text>

          {/* Linha com nome do parque â€“ Ã­cone piscante â€“ 'guia nÃ£o oficial' â€“ data */}
          <View style={styles.perguntaLinha}>
            <Text style={styles.tituloDia}>{nomeParque}</Text>
            <Text style={styles.tracinho}> - </Text>

            <View style={styles.subInfoWrap}>
              <LogoAtencao size={14} color="#FFFFFF" blink />
              <Text style={styles.subInfo}> guia nÃ£o oficial</Text>
            </View>

            <Text style={styles.tracinho}>  </Text>
            <Text style={styles.tituloDia}>
              {format(diaAtual.data, 'dd/MM/yyyy', { locale: ptBR })} â€“ {format(diaAtual.data, 'EEEE', { locale: ptBR })}
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

        {/* ðŸ”µ ÃšLTIMO CARD: aviso legal com MESMA largura/raio/espaÃ§amento dos outros cards */}
        <View style={styles.cardAviso}>
          <AvisoLegal theme="blue" fixoNoRodape={false}>
            App independente sem vÃ­nculo Disney/Universal.
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

  // linha flexÃ­vel para caber em telas menores (quebra com wrap)
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

  // ðŸ”µ Aviso legal com mesmo tamanho/raio/espaÃ§amento dos cards
cardAviso: {
  backgroundColor: '#004b87',  // ou use o tema do AvisoLegal
  borderRadius: 10,
  marginBottom: 10,
  marginTop: 0,
  alignSelf: 'stretch',   // â¬…ï¸ isso garante mesma largura dos outros
},


  rodapeFundo: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#52D6FF', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  rodapeConteudo: { position: 'absolute', bottom: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  botaoSeta: { justifyContent: 'center', alignItems: 'center' },
});
