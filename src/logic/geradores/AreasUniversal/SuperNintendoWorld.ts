// src/logic/geradores/AreasUniversal/SuperNintendoWorld.ts
export const SuperNintendoWorld = {
  parque: "Universal's Epic Universe",
  regiao: "Super Nintendo World",
  latitude: 28.4708,
  longitude: -81.4729,
  descricao:
    "Área imersiva da Nintendo que transporta os visitantes diretamente para o Reino do Cogumelo. Com cenários vibrantes, personagens icônicos e atrações de Mario, Yoshi e Donkey Kong, é um dos mundos mais aguardados do Epic Universe.",
  imagem: "super-nintendo-world.png",
  atracoes: [
    {
      id: "mario-kart-bowsers-challenge",
      titulo: "Mario Kart: Bowser’s Challenge",
      subtitulo: "Super Nintendo World",
      tipo: "Simulador interativo em movimento",
      tipoPerfil: ["radicais", "tematicas", "interativas"],
      alturaMinima: 107, // 42"
      filaExpress: true,
      tempoMedioFila: 60,
      filaAceitavel: 45,
      idadeRecomendada: "10+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Simulador competitivo com realidade aumentada que coloca você em uma corrida contra Bowser. Combine itens, mire nos inimigos e use os power-ups para pontuar mais. Dica: mire nos alvos grandes para combos e pontuações extras.",
      icone: "🏎️",
      imagem: "mario-kart-bowsers-challenge.jpg",
      regiao: "Super Nintendo World",
      parque: "Universal's Epic Universe",
      latitude: 28.4710,
      longitude: -81.4730
    },
    {
      id: "yoshis-adventure",
      titulo: "Yoshi’s Adventure",
      subtitulo: "Super Nintendo World",
      tipo: "Passeio de carrinho panorâmico",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 25,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Passeio tranquilo nas costas do Yoshi, explorando montanhas e cavernas coloridas em busca de ovos escondidos. Ideal para crianças pequenas e para fotos encantadoras do Reino do Cogumelo.",
      icone: "🥚",
      imagem: "yoshis-adventure.jpg",
      regiao: "Super Nintendo World",
      parque: "Universal's Epic Universe",
      latitude: 28.4712,
      longitude: -81.4732
    },
    {
      id: "mine-cart-madness",
      titulo: "Mine-Cart Madness",
      subtitulo: "Super Nintendo World (Donkey Kong Country)",
      tipo: "Montanha-russa familiar com truques de trilho",
      tipoPerfil: ["radicais", "tematicas", "familiares"],
      alturaMinima: 102, // 40"
      filaExpress: true,
      tempoMedioFila: 55,
      filaAceitavel: 40,
      idadeRecomendada: "7+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Montanha-russa de Donkey Kong com tecnologia de trilhos ocultos, criando o efeito de ‘pular’ entre trechos da mina. Mistura adrenalina e humor, com cenário vibrante e ótima trilha sonora. Sente-se no fundo para saltos mais intensos.",
      icone: "🍌",
      imagem: "mine-cart-madness.jpg",
      regiao: "Super Nintendo World",
      parque: "Universal's Epic Universe",
      latitude: 28.4711,
      longitude: -81.4731
    }
  ]
};
