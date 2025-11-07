export const DinoLand = {
  parque: "Animal Kingdom",
  descricao:
    "Tema de dinossauros, fósseis e escavações, misturando atrações radicais, brinquedos familiares e um grande show musical subaquático.",
  imagem: "dinolandusa.png",
  latitude: 28.3581,
  longitude: -81.5867,
  atracoes: [
    {
      id: "dinosaur",
      titulo: "DINOSAUR",
      subtitulo: "DinoLand U.S.A.",
      tipo: "Simulador escuro com movimento",
      tipoPerfil: ["radicais", "imersivas", "tematicas"],
      alturaMinima: 102,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 40,
      filaAceitavel: 30,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Simulador intenso em jipe pelo mundo dos dinossauros, com sustos e sacudidas. Sente-se no meio para menos impacto e prepare-se para rugidos e efeitos no escuro.",
      icone: "🦖",
      imagem: "dinosaur.jpg",
      regiao: "DinoLand U.S.A.",
      parque: "Animal Kingdom",
      latitude: 28.3579,
      longitude: -81.5871
    },
    {
      id: "triceratop-spin",
      titulo: "TriceraTop Spin",
      subtitulo: "DinoLand U.S.A.",
      tipo: "Brinquedo giratório",
      tipoPerfil: ["familiares", "tematicas", "interativas"],
      alturaMinima: 0,
      filaExpress: false, // fila comum
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Voe em um dinossauro controlando a altura durante o giro. Sente nas pontas para melhor vista da área e mais liberdade para brincar.",
      icone: "🦕",
      imagem: "triceratop-spin.jpg",
      regiao: "DinoLand U.S.A.",
      parque: "Animal Kingdom",
      latitude: 28.3583,
      longitude: -81.5865
    },
    // SHOW PRINCIPAL DA ÁREA
    {
      id: "finding-nemo-big-blue",
      titulo: "Finding Nemo: The Big Blue... and Beyond!",
      subtitulo: "DinoLand U.S.A.",
      tipo: "Show musical ao vivo",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão
      tempoMedioFila: 15,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Espetáculo teatral com fantoches e músicas de Procurando Nemo. Chegue cerca de 20 min antes para garantir um bom assento central e aproveitar o ar-condicionado.",
      icone: "🐠🎭",
      imagem: "finding-nemo-show.jpg",
      regiao: "DinoLand U.S.A.",
      parque: "Animal Kingdom",
      latitude: 28.3575,
      longitude: -81.5866
    }
  ]
};
