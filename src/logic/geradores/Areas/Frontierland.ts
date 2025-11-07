export const Frontierland = {
  parque: "Magic Kingdom",
  regiao: "Frontierland",
  latitude: 28.4188,
  longitude: -81.5851,
  descricao:
    "Velho Oeste da Disney, com minas, quedas d’água e aventuras ao ar livre. Perfeito para quem gosta de emoção em cenário rústico.",
  imagem: "frontierland.png",
  atracoes: [
    {
      id: "big-thunder-mountain",
      titulo: "Big Thunder Mountain Railroad",
      subtitulo: "Frontierland",
      tipo: "Montanha-russa",
      tipoPerfil: ["radicais", "tematicas", "familiares"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane disponível (Genie+)
      tempoMedioFila: 60,
      filaAceitavel: 40,
      idadeRecomendada: "5+",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Montanha-russa em mina de ouro, com curvas rápidas e visual do Velho Oeste. Dica: sente nos últimos vagões para mais emoção.",
      icone: "🏔️",
      imagem: "big-thunder.jpg",
      regiao: "Frontierland",
      parque: "Magic Kingdom",
      latitude: 28.4190,
      longitude: -81.5853
    },
    {
      id: "tianas-bayou-adventure",
      titulo: "Tiana’s Bayou Adventure",
      subtitulo: "Frontierland",
      tipo: "Aventura aquática (log flume)",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 102, // 40"
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 90, // pós-abertura varia 70–120 min
      filaAceitavel: 60,
      idadeRecomendada: "5+",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Aventura musical com a Princesa Tiana pelo bayou, repleta de novos animatrônicos e uma grande queda final. Leve capa se não quiser se molhar.",
      icone: "🐸",
      imagem: "tiana-bayou.jpg",
      regiao: "Frontierland",
      parque: "Magic Kingdom",
      latitude: 28.4186,
      longitude: -81.5850
    },
    // SHOW PRINCIPAL DA ÁREA (mantido mesmo sem Lightning Lane)
    {
      id: "country-bear-musical-jamboree",
      titulo: "Country Bear Musical Jamboree",
      subtitulo: "Frontierland",
      tipo: "Show musical",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessões
      tempoMedioFila: 10,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Novo show dos Ursos com clássicos Disney em estilo country de Nashville. Excelente para relaxar e aproveitar o ar-condicionado.",
      icone: "🐻🎶",
      imagem: "country-bear-musical.jpg",
      regiao: "Frontierland",
      parque: "Magic Kingdom",
      latitude: 28.4189,
      longitude: -81.5854
    }
  ]
};
