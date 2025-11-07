export const EchoLake = {
  regiao: "Echo Lake",
  parque: "Hollywood Studios",
  latitude: 28.3574,
  longitude: -81.5606,
  descricao:
    "Área com clima de Hollywood clássica, repleta de shows icônicos e aventuras inspiradas em Star Wars, Frozen e Indiana Jones.",
  imagem: "echolake.png",
  atracoes: [
    // SHOW PRINCIPAL
    {
      id: "for-the-first-time-in-forever",
      titulo: "For the First Time in Forever: A Frozen Sing-Along Celebration",
      subtitulo: "Echo Lake",
      tipo: "Show musical com personagens",
      tipoPerfil: ["familiares", "tematicas", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão
      tempoMedioFila: 15,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Show musical com cenas, piadas e canções de Frozen, com participação de Anna, Elsa e Kristoff. Chegue 15 min antes para bons assentos centrais.",
      icone: "❄️🎤",
      imagem: "frozen-sing-along.jpg",
      latitude: 28.3578,
      longitude: -81.5604
    },
    {
      id: "indiana-jones-stunt-spectacular",
      titulo: "Indiana Jones Epic Stunt Spectacular!",
      subtitulo: "Echo Lake",
      tipo: "Show de acrobacias",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 15,
      filaAceitavel: 10,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "tarde",
      descricao:
        "Espetáculo cheio de explosões, acrobacias e cenas clássicas de Indiana Jones. Sente-se no centro para ver todos os efeitos de perto.",
      icone: "🎬",
      imagem: "indiana-jones.jpg",
      latitude: 28.3575,
      longitude: -81.5607
    },
    {
      id: "star-tours",
      titulo: "Star Tours – The Adventures Continue",
      subtitulo: "Echo Lake",
      tipo: "Simulador 3D",
      tipoPerfil: ["imersivas", "radicais", "tematicas"],
      alturaMinima: 102,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 35,
      filaAceitavel: 30,
      idadeRecomendada: "7+",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Simulador 3D com missões variadas pelo universo Star Wars. Para menos impacto, sente-se no meio da cabine.",
      icone: "🚀",
      imagem: "star-tours.jpg",
      latitude: 28.3576,
      longitude: -81.5605
    },
    {
      id: "meet-olaf",
      titulo: "Meet Olaf at Celebrity Spotlight",
      subtitulo: "Echo Lake",
      tipo: "Encontro com personagem",
      tipoPerfil: ["familiares", "tematicas", "interativas"],
      alturaMinima: 0,
      filaExpress: false,
      tempoMedioFila: 20,
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Encontro e fotos com Olaf em cenário nevado. Leve caderno de autógrafos e aproveite o ar-condicionado enquanto espera.",
      icone: "☃️",
      imagem: "meet-olaf.jpg",
      latitude: 28.3573,
      longitude: -81.5608
    }
  ]
};
