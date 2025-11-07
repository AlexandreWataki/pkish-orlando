export const Pandora = {
  parque: "Animal Kingdom",
  regiao: "Pandora – The World of Avatar",
  latitude: 28.3564,
  longitude: -81.5916,
  descricao:
    "Área imersiva inspirada no mundo de Avatar, com florestas bioluminescentes, cachoeiras flutuantes e experiências únicas, dia e noite. À noite, a iluminação bioluminescente transforma o ambiente em um espetáculo de cores.",
  imagem: "pandora.png",
  atracoes: [
    {
      id: "avatar-flight-of-passage",
      titulo: "Avatar Flight of Passage",
      subtitulo: "Pandora – The World of Avatar",
      tipo: "Simulador 3D",
      tipoPerfil: ["imersivas", "radicais", "tematicas"],
      alturaMinima: 112, // 44"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 80,
      filaAceitavel: 45,
      idadeRecomendada: "7+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Voe nas costas de um Banshee com efeitos de vento, aromas e movimento sincronizado. Experiência intensa e realista — pode causar enjoo em sensíveis a simuladores. À noite, a fila externa fica ainda mais bonita iluminada.",
      icone: "🦋",
      imagem: "flight-of-passage.jpg",
      regiao: "Pandora – The World of Avatar",
      parque: "Animal Kingdom",
      latitude: 28.3568,
      longitude: -81.5917
    },
    {
      id: "navi-river-journey",
      titulo: "Na'vi River Journey",
      subtitulo: "Pandora – The World of Avatar",
      tipo: "Passeio de barco",
      tipoPerfil: ["familiares", "imersivas", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 45,
      filaAceitavel: 30,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Passeio tranquilo de barco pela floresta bioluminescente de Pandora, com criaturas místicas e trilha sonora envolvente. Ideal pela manhã, quando a fila é menor.",
      icone: "🌌",
      imagem: "navi-river.jpg",
      regiao: "Pandora – The World of Avatar",
      parque: "Animal Kingdom",
      latitude: 28.3562,
      longitude: -81.5911
    }
  ]
};
