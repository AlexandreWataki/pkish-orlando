export const HollywoodBoulevard = {
  parque: "Hollywood Studios",
  regiao: "Hollywood Boulevard",
  latitude: 28.3575,
  longitude: -81.5586,
  descricao:
    "A avenida principal do parque, com teatros clássicos, lojas temáticas e acesso às áreas centrais — lar do Chinese Theatre.",
  imagem: "hollywoodboulevard.png",
  atracoes: [
    {
      id: "runaway-railway",
      titulo: "Mickey & Minnie’s Runaway Railway",
      subtitulo: "Hollywood Boulevard",
      tipo: "Dark ride imersiva",
      tipoPerfil: ["imersivas", "familiares", "tematicas"],
      alturaMinima: 0,
      filaExpress: true, // Lightning Lane disponível
      tempoMedioFila: 45,
      filaAceitavel: 35,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "manha",
      descricao:
        "Passeio imersivo com Mickey e Minnie usando projeções modernas e trilha animada. Sente-se no meio para melhor visão das cenas.",
      icone: "🎥",
      imagem: "runaway-railway.jpg",
      regiao: "Hollywood Boulevard",
      parque: "Hollywood Studios",
      latitude: 28.3576,
      longitude: -81.5587
    },
    // SHOW PRINCIPAL DA ÁREA (incluído mesmo sem Lightning Lane)
    {
      id: "wonderful-world-of-animation",
      titulo: "Wonderful World of Animation",
      subtitulo: "Hollywood Boulevard",
      tipo: "Show noturno de projeções",
      tipoPerfil: ["tematicas", "familiares", "imersivas"],
      alturaMinima: 0,
      filaExpress: false, // entrada por sessão (sem LL)
      tempoMedioFila: 15, // espera média até a sessão
      filaAceitavel: 15,
      idadeRecomendada: "Todas as idades",
      atracaoSemFila: false,
      turnoRecomendado: "noite",
      descricao:
        "Projeções e trilha de clássicos Disney no Chinese Theatre. Chegue ~15–20 min antes e posicione-se centralizado para ver bem as projeções.",
      icone: "🌙🎆",
      imagem: "wonderful-world-of-animation.jpg",
      regiao: "Hollywood Boulevard",
      parque: "Hollywood Studios",
      latitude: 28.3576,
      longitude: -81.5587
    }
  ]
};
