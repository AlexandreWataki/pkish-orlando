// src/logic/media/entries/types.ts
export type Entry = {
  attrKey: string;  // id interno único (ex: 'kilimanjaro-safaris')
  titleKey: string; // chave normalizada (ex: 'animalkingdom_kilimanjaro safaris')
  yt: string;       // id do vídeo no YouTube
};
