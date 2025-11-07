export const Asia = {
  parque: "Animal Kingdom",
  descricao:
    "Inspirada no Himalaia e na selva asiática, mistura montanhas-russas radicais, aventuras aquáticas e um show com aves treinadas.",
  imagem: "asia.png",
  latitude: 28.3588,
  longitude: -81.5915,
  atracoes: [
    {
      id: "expedition-everest",
      titulo: "Expedition Everest – Legend of the Forbidden Mountain",
      subtitulo: "Asia",
      tipo: "Montanha-russa",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 112,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 55,
      filaAceitavel: 40,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Montanha-russa veloz com trecho em ré, túneis escuros e encontro com o Yeti. Mais emoção nos primeiros vagões; mais visual e suspense nos últimos.",
      icone: "🏔️",
      imagem: "expedition-everest.jpg",
      regiao: "Asia",
      parque: "Animal Kingdom",
      latitude: 28.3582,
      longitude: -81.5916
    },
    {
      id: "kali-river-rapids",
      titulo: "Kali River Rapids",
      subtitulo: "Asia",
      tipo: "Aventura aquática",
      tipoPerfil: ["familiares", "radicais", "interativas"],
      alturaMinima: 96,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 50,
      filaAceitavel: 35,
      idadeRecomendada: "6+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Descida de bote por corredeiras com respingos e quedas. Leve capa ou troca de roupa — quem senta de costas nas quedas costuma molhar mais.",
      icone: "🌊",
      imagem: "kali-river-rapids.jpg",
      regiao: "Asia",
      parque: "Animal Kingdom",
      latitude: 28.3590,
      longitude: -81.5914
    },
    // SHOW PRINCIPAL DA ÁREA (incluído mesmo sem Lightning Lane)
    {
      id: "feathered-friends-in-flight",
      titulo: "Feathered Friends in Flight!",
      subtitulo: "Asia",
      tipo: "Show com aves treinadas",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessões
      tempoMedioFila: 10, // espera média até a próxima sessão
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Apresentação educativa com aves voando sobre o público. Sente nas pontas das fileiras para vê-las passarem bem perto e garantir ótimas fotos.",
      icone: "🦜",
      imagem: "feathered-friends.jpg",
      regiao: "Asia",
      parque: "Animal Kingdom",
      latitude: 28.3591,
      longitude: -81.5910
    }
  ]
};
