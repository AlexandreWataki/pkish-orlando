// /src/logic/geradores/AreasUniversal/TheWizardingWorldDiagonAlley.ts
export const TheWizardingWorldDiagonAlley = {
  parque: "Universal Studios Florida",
  regiao: "The Wizarding World of Harry Potter – Diagon Alley",
  latitude: 28.4742,
  longitude: -81.4679,
  descricao:
    "O Beco Diagonal oferece uma imersão completa no universo bruxo, com lojas, restaurantes e detalhes impressionantes — desde o dragão sobre o banco Gringotts até as varinhas interativas que ativam feitiços pelas vitrines.",
  imagem: "the-wizarding-world-diagonalley.png",
  atracoes: [
    {
      id: "harry-potter-escape-from-gringotts",
      titulo: "Harry Potter and the Escape from Gringotts",
      subtitulo: "Diagon Alley",
      tipo: "Montanha-russa e simulador 3D híbrido",
      tipoPerfil: ["radicais", "tematicas", "imersivas"],
      alturaMinima: 107, // 42"
      filaExpress: true,
      tempoMedioFila: 60,
      filaAceitavel: 45,
      idadeRecomendada: "8+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Aventura épica pelo banco Gringotts com movimentos reais, telas 3D e encontros com Harry, Bellatrix e Voldemort. Dica: sente-se no meio do trem para a melhor sincronia entre as projeções e os efeitos físicos.",
      icone: "🐉",
      imagem: "escape-from-gringotts.jpg",
      regiao: "Diagon Alley",
      parque: "Universal Studios Florida",
      latitude: 28.4743,
      longitude: -81.4681
    },
    {
      id: "ollivanders-wand-shop-diagon",
      titulo: "Ollivanders – Diagon Alley",
      subtitulo: "Diagon Alley",
      tipo: "Experiência interativa e loja temática",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "manha",
      descricao:
        "Participe da experiência da varinha escolhendo o bruxo, com efeitos mágicos e interação com o funcionário da loja. Depois, explore as varinhas interativas e ative feitiços em vitrines do Beco Diagonal e do Carkitt Market.",
      icone: "🪄",
      imagem: "ollivanders-diagon.jpg",
      regiao: "Diagon Alley",
      parque: "Universal Studios Florida",
      latitude: 28.4745,
      longitude: -81.4682
    },
    {
      id: "knockturn-alley",
      titulo: "Knockturn Alley",
      subtitulo: "Diagon Alley",
      tipo: "Exploração temática indoor",
      tipoPerfil: ["imersivas", "tematicas", "familiares"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 0,
      filaAceitavel: 0,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "noite",
      descricao:
        "Corredor escuro com sons e efeitos de magia das artes das trevas, abrigando a loja Borgin and Burkes. Ótimo para explorar à noite ou em dias quentes, com ar-condicionado e atmosfera misteriosa.",
      icone: "🌑",
      imagem: "knockturn-alley.jpg",
      regiao: "Diagon Alley",
      parque: "Universal Studios Florida",
      latitude: 28.4746,
      longitude: -81.4683
    }
  ]
};
