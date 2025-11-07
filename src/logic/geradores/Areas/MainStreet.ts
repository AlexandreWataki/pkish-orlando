export const MainStreet = {
  parque: "Magic Kingdom",
  regiao: "Main Street, U.S.A.",
  latitude: 28.4187,
  longitude: -81.5818,
  descricao:
    "Entrada principal do parque, inspirada em cidade americana do início do século 20, com vista para o Castelo da Cinderela, lojas e o grande desfile do parque.",
  imagem: "mainstreetusa.png",
  atracoes: [
    // SHOW PRINCIPAL DA ÁREA (incluído mesmo sem Lightning Lane)
    {
      id: "main-street-parade",
      titulo: "Festival of Fantasy Parade",
      subtitulo: "Main Street, U.S.A.",
      tipo: "Desfile temático",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // não há LL; espera para posicionamento
      tempoMedioFila: 20, // tempo médio de antecedência p/ garantir bom lugar
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Desfile com carros alegóricos, músicas e personagens Disney. Chegue 15–20 min antes e busque sombra para fotos melhores.",
      icone: "🎉",
      imagem: "festival-of-fantasy.jpg",
      regiao: "Main Street, U.S.A.",
      parque: "Magic Kingdom",
      latitude: 28.4190,
      longitude: -81.5817
    },
    {
      id: "walt-disney-world-railroad",
      titulo: "Walt Disney World Railroad – Main Street Station",
      subtitulo: "Main Street, U.S.A.",
      tipo: "Passeio de trem nostálgico",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // embarque por horários; fila leve
      tempoMedioFila: 10,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Trem a vapor que percorre o parque com paradas em Frontierland e Fantasyland. Sente-se do lado direito para melhores vistas.",
      icone: "🚂",
      imagem: "main-street-train.jpg",
      regiao: "Main Street, U.S.A.",
      parque: "Magic Kingdom",
      latitude: 28.4188,
      longitude: -81.5819
    },
    {
      id: "character-greetings-town-square",
      titulo: "Encontro com Mickey na Town Square Theater",
      subtitulo: "Main Street, U.S.A.",
      tipo: "Encontro com personagem",
      tipoPerfil: ["personagens", "familiares", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 30,
      filaAceitavel: 20,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Fotos e autógrafos com Mickey em trajes clássicos, em ambiente climatizado. Leve algo para autógrafo e registre o abraço na primeira foto.",
      icone: "🎭",
      imagem: "mickey-town-square.jpg",
      regiao: "Main Street, U.S.A.",
      parque: "Magic Kingdom",
      latitude: 28.4185,
      longitude: -81.5820
    }
  ]
};
