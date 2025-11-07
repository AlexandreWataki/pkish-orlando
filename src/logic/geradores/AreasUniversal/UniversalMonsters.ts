// src/logic/geradores/AreasUniversal/UniversalMonsters.ts
export const UniversalMonsters = {
  parque: "Universal's Epic Universe",
  regiao: "Darkmoor – Universal Monsters",
  descricao:
    "Área gótica dedicada aos monstros clássicos da Universal, com arquitetura sombria, trilhas sonoras orquestrais e três atrações que unem tecnologia e terror em uma vila inspirada na Europa antiga.",
  imagem: "universal-monsters.png",
  latitude: 28.4709,
  longitude: -81.4735,
  atracoes: [
    {
      id: "monsters-unchained",
      titulo: "Monsters Unchained: The Frankenstein Experiment",
      subtitulo: "Darkmoor – Universal Monsters",
      tipo: "Dark ride imersiva de última geração",
      tipoPerfil: ["radicais", "tematicas", "imersivas"],
      alturaMinima: 107, // 42"
      filaExpress: true,
      tempoMedioFila: 70,
      filaAceitavel: 45,
      idadeRecomendada: "7+",
      atracaoSemFila: false,
      turnoRecomendado: "noite",
      descricao:
        "Dark ride intensa com projeções, animatrônicos e efeitos práticos, levando os visitantes ao laboratório do Dr. Frankenstein e a encontros próximos com Drácula, Múmia e outros ícones do terror. As fileiras centrais proporcionam a melhor visão panorâmica.",
      icone: "🧪",
      imagem: "monsters-unchained.jpg",
      regiao: "Darkmoor – Universal Monsters",
      parque: "Universal's Epic Universe",
      latitude: 28.4710,
      longitude: -81.4736
    },
    {
      id: "curse-of-the-werewolf",
      titulo: "Curse of the Werewolf",
      subtitulo: "Darkmoor – Universal Monsters",
      tipo: "Montanha-russa familiar temática",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 102, // 40"
      filaExpress: true,
      tempoMedioFila: 45,
      filaAceitavel: 30,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Coaster familiar que percorre as florestas sombrias de Darkmoor, com curvas rápidas e ambientação assustadoramente detalhada. À noite, a iluminação torna a experiência ainda mais imersiva.",
      icone: "🐺",
      imagem: "curse-of-the-werewolf.jpg",
      regiao: "Darkmoor – Universal Monsters",
      parque: "Universal's Epic Universe",
      latitude: 28.4712,
      longitude: -81.4737
    },
    {
      id: "darkmoor-monster-makeup",
      titulo: "Darkmoor Monster Makeup Experience",
      subtitulo: "Darkmoor – Universal Monsters",
      tipo: "Show interativo de bastidores",
      tipoPerfil: ["familiares", "interativas", "tematicas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 15,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: true,
      turnoRecomendado: "manha",
      descricao:
        "Apresentação ao vivo com artistas de efeitos especiais demonstrando técnicas de maquiagem e próteses usadas em filmes de monstros. O público pode participar de forma divertida e educativa.",
      icone: "🎭",
      imagem: "darkmoor-monster-makeup.jpg",
      regiao: "Darkmoor – Universal Monsters",
      parque: "Universal's Epic Universe",
      latitude: 28.4714,
      longitude: -81.4739
    }
  ]
};
