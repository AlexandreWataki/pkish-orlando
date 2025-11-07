export const HowToTrainYourDragon = {
  parque: "Universal's Epic Universe",
  regiao: "How to Train Your Dragon",
  descricao:
    "Área inspirada em Como Treinar o Seu Dragão, com coaster familiar, giro controlável, batalha de barcos e um show épico com fantoches.",
  imagem: "how-to-train-your-dragon.png",
  latitude: 28.4701,
  longitude: -81.4697,
  atracoes: [
    {
      id: "hiccups-wing-gliders",
      titulo: "Hiccup's Wing Gliders",
      subtitulo: "How to Train Your Dragon",
      tipo: "Montanha-russa familiar",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Express/LL disponível
      tempoMedioFila: 45,
      filaAceitavel: 35,
      idadeRecomendada: "5+",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Coaster familiar com curvas suaves sobre Berk. Nos últimos vagões a sensação de velocidade aumenta.",
      icone: "🪽",
      imagem: "hiccups-wing-gliders.jpg",
      regiao: "How to Train Your Dragon",
      parque: "Universal's Epic Universe",
      latitude: 28.4703,
      longitude: -81.4695
    },
    {
      id: "dragon-racers-rally",
      titulo: "Dragon Racers’ Rally",
      subtitulo: "How to Train Your Dragon",
      tipo: "Brinquedo giratório",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 97, // 38"
      filaExpress: false, // fila comum
      tempoMedioFila: 30,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Gire e incline o seu dragão durante os treinos de corrida. Controle o ângulo para um pouco mais de emoção.",
      icone: "🐲",
      imagem: "dragon-racers-rally.jpg",
      regiao: "How to Train Your Dragon",
      parque: "Universal's Epic Universe",
      latitude: 28.4704,
      longitude: -81.4698
    },
    {
      id: "fyre-drill",
      titulo: "Fyre Drill",
      subtitulo: "How to Train Your Dragon",
      tipo: "Batalha de barcos (água)",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false, // fila comum
      tempoMedioFila: 35,
      filaAceitavel: 25,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Treinamento de combate com canhões d’água. Você vai se molhar — leve capa ou troca de roupa.",
      icone: "💦",
      imagem: "fyre-drill.jpg",
      regiao: "How to Train Your Dragon",
      parque: "Universal's Epic Universe",
      latitude: 28.4707,
      longitude: -81.4699
    },

    // SHOW PRINCIPAL DA ÁREA
    {
      id: "the-untrainable-dragon",
      titulo: "The Untrainable Dragon",
      subtitulo: "How to Train Your Dragon",
      tipo: "Show ao vivo (principal)",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão (sem Express)
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "noite",
      descricao:
        "Espetáculo com Hiccup e Banguela, fantoches gigantes e trilha épica. Chegue com antecedência para bons assentos.",
      icone: "🎭",
      imagem: "the-untrainable-dragon.jpg",
      regiao: "How to Train Your Dragon",
      parque: "Universal's Epic Universe",
      latitude: 28.4705,
      longitude: -81.4696
    }
  ]
};
