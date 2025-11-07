export const Adventureland = {
  parque: "Magic Kingdom",
  descricao:
    "Área tropical e exótica com aventuras e shows temáticos. Combina selvas, piratas e cultura polinésia em atrações clássicas e experiências relaxantes.",
  imagem: "adventureland.png",
  latitude: 28.4187,
  longitude: -81.5830,
  atracoes: [
    {
      id: "jungle-cruise",
      titulo: "Jungle Cruise",
      subtitulo: "Adventureland",
      tipo: "Passeio de barco cômico",
      tipoPerfil: ["familiares", "tematicas", "interativas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 50,
      filaAceitavel: 40,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Passeio de barco por rios com cenários de selva, animais animatrônicos e piadas dos skippers. Dica: nos dias quentes, refresca e rende boas fotos.",
      icone: "🛶",
      imagem: "jungle-cruise.jpg",
      regiao: "Adventureland",
      parque: "Magic Kingdom",
      latitude: 28.4183,
      longitude: -81.5825
    },
    {
      id: "pirates-of-the-caribbean",
      titulo: "Pirates of the Caribbean",
      subtitulo: "Adventureland",
      tipo: "Dark ride temática",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 40,
      filaAceitavel: 35,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Barco por cenas clássicas com piratas animatrônicos e uma pequena descida com respingos leves. Melhor no meio do barco para ver tudo.",
      icone: "🏴‍☠️",
      imagem: "pirates-of-the-caribbean.jpg",
      regiao: "Adventureland",
      parque: "Magic Kingdom",
      latitude: 28.4175,
      longitude: -81.5842
    },
    {
      id: "magic-carpets-of-aladdin",
      titulo: "The Magic Carpets of Aladdin",
      subtitulo: "Adventureland",
      tipo: "Brinquedo giratório infantil",
      tipoPerfil: ["familiares", "tematicas", "interativas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 30,
      filaAceitavel: 25,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Voe em um tapete mágico controlando a altura. De olho nos camelos dourados que espirram água. Pilote alto para uma vista melhor.",
      icone: "🕌",
      imagem: "magic-carpets-of-aladdin.jpg",
      regiao: "Adventureland",
      parque: "Magic Kingdom",
      latitude: 28.4180,
      longitude: -81.5831
    },
    // SHOW PRINCIPAL DA ÁREA (incluído mesmo sem Lightning Lane)
    {
      id: "enchanted-tiki-room",
      titulo: "Walt Disney’s Enchanted Tiki Room",
      subtitulo: "Adventureland",
      tipo: "Show animatrônico musical",
      tipoPerfil: ["tematicas", "imersivas", "familiares"],
      alturaMinima: 0,
      filaExpress: false, // sem Lightning Lane
      tempoMedioFila: 10, // espera para próxima sessão
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false, // há espera/entrada por sessão
      turnoRecomendado: "noite",
      descricao:
        "Show clássico com aves animatrônicas, músicas e ambiente tropical. Ótimo para pausar e se refrescar; sente-se mais ao fundo para ver todos os efeitos.",
      icone: "🐦",
      imagem: "enchanted-tiki-room.jpg",
      regiao: "Adventureland",
      parque: "Magic Kingdom",
      latitude: 28.4188,
      longitude: -81.5836
    }
  ]
};
