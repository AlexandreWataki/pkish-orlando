export const WorldExpo = {
  parque: "Universal Studios Florida",
  descricao:
    "Setor futurista World Expo junto da vizinha Springfield (The Simpsons), reunindo tiro interativo, simulador 3D e um clássico brinquedo giratório dos aliens.",
  imagem: "world-expo-springfield.png",
  latitude: 28.4738,
  longitude: -81.4682,
  atracoes: [
    {
      id: "men-in-black-alien-attack",
      titulo: "MEN IN BLACK: Alien Attack",
      subtitulo: "World Expo",
      tipo: "Tiro interativo",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 107, // 42"
      filaExpress: true,
      tempoMedioFila: 40,
      filaAceitavel: 30,
      idadeRecomendada: "A partir de 8 anos",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Dispare nos aliens enquanto o carrinho gira e compare a pontuação no final. Dicas: acerte os alvos que surgem/ somem rápido, mire na antena do carrinho oposto para bônus e NÃO esqueça o botão vermelho no fim.",
      icone: "👽",
      imagem: "men-in-black-alien-attack.jpg",
      regiao: "World Expo",
      parque: "Universal Studios Florida",
      latitude: 28.4739,
      longitude: -81.4684
    },
    {
      id: "the-simpsons-ride",
      titulo: "The Simpsons Ride",
      subtitulo: "Springfield",
      tipo: "Simulador 3D",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 102, // 40"
      filaExpress: true,
      tempoMedioFila: 45,
      filaAceitavel: 35,
      idadeRecomendada: "A partir de 7 anos",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Simulador caótico com a família Simpsons em Krustyland. Melhor imersão nas fileiras centrais da plataforma; pode causar enjoo leve em sensíveis a simuladores.",
      icone: "🎢",
      imagem: "the-simpsons-ride.jpg",
      regiao: "Springfield",
      parque: "Universal Studios Florida",
      latitude: 28.4742,
      longitude: -81.4680
    },
    {
      id: "kang-kodos-twirl-n-hurl",
      titulo: "Kang & Kodos’ Twirl ‘n’ Hurl",
      subtitulo: "Springfield",
      tipo: "Brinquedo giratório",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Gire sua nave alienígena com vistas da área de Springfield. Assentos externos passam mais perto dos alvos e rendem fotos melhores.",
      icone: "🛸",
      imagem: "kang-and-kodos-twirl-n-hurl.jpg",
      regiao: "Springfield",
      parque: "Universal Studios Florida",
      latitude: 28.4740,
      longitude: -81.4678
    }
  ]
};
