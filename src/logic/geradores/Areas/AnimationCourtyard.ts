export const AnimationCourtyard = {
  parque: "Hollywood Studios",
  descricao:
    "Área dedicada aos clássicos da animação Disney, com atrações interativas e um show principal para todas as idades.",
  imagem: "animationcourtyard.png",
  latitude: 28.3563,
  longitude: -81.5606,
  atracoes: [
    // SHOW PRINCIPAL DA ÁREA (incluído mesmo sem Lightning Lane)
    {
      id: "little-mermaid-musical-adventure",
      titulo: "The Little Mermaid – A Musical Adventure",
      subtitulo: "Animation Courtyard",
      tipo: "Show musical ao vivo",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessões (sem LL)
      tempoMedioFila: 20, // espera média até a próxima sessão
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Novo espetáculo teatral da Pequena Sereia com cenários físicos, puppets e efeitos modernos. Chegue ~20 min antes para assentos centrais.",
      icone: "🧜‍♀️",
      imagem: "little-mermaid-musical.jpg",
      regiao: "Animation Courtyard",
      parque: "Hollywood Studios",
      latitude: 28.3561,
      longitude: -81.5605
    },
    {
      id: "disney-junior-play-dance",
      titulo: "Disney Junior Play & Dance!",
      subtitulo: "Animation Courtyard",
      tipo: "Show musical interativo",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false, // sem Lightning Lane
      tempoMedioFila: 15,
      filaAceitavel: 10,
      idadeRecomendada: "Pré-escolares e crianças pequenas",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Crianças dançam e interagem com Mickey, Vampirina, Doc McStuffins e Timon. Fique nas primeiras fileiras para aumentar a chance de interação.",
      icone: "🕺",
      imagem: "disney-junior.jpg",
      regiao: "Animation Courtyard",
      parque: "Hollywood Studios",
      latitude: 28.3567,
      longitude: -81.5611
    }
  ]
};
