export type PdfLink = {
  id: 'magic' | 'studios' | 'epcot' | 'animal' | 'universal' | 'ioa' | 'epic';
  nome: string;
  url: string;                 // URL oficial do PDF (pode ficar vazia)
  grupo: 'Disney' | 'Universal';
};

export const pdfLinks: PdfLink[] = [
{
  id: 'magic',
  nome: 'Magic Kingdom',
  url: 'https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-global-assets/disney-world/guest-services/guide-maps/MK_0825_EN_KM.pdf',
  grupo: 'Disney',
},


  {
    id: 'studios',
    nome: 'Hollywood Studios',
    url: 'https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-global-assets/disney-world/guest-services/guide-maps/DHS_100824_EN-KM.pdf',
    grupo: 'Disney',
  },
 {
  id: 'epcot',
  nome: 'EPCOT',
  url: 'https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-global-assets/disney-world/guest-services/guide-maps/EPCOT-guidemap_072225_ENG_KM-.pdf',
  grupo: 'Disney',
},

{
  id: 'animal',
  nome: 'Animal Kingdom',
  url: 'https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-standard-assets/disney-world/guide-maps/animal-kingdom/DAK-0325-ENG-KM.pdf',
  grupo: 'Disney',
},

  {
    id: 'universal',
    nome: 'Universal Studios Florida',
    url: 'https://www.universalorlando.com/webdata/k2/en/us/files/Documents/universal-studios-florida-park-map-english.pdf',
    grupo: 'Universal',
  },
  {
    id: 'ioa',
    nome: 'Islands of Adventure',
    url: 'https://www.universalorlando.com/webdata/k2/en/us/files/Documents/islands-of-adventure-park-map-english.pdf',
    grupo: 'Universal',
  },
 {
  id: 'epic',
  nome: "Universal's Epic Universe",
  url: 'https://www.universalorlando.com/webdata/k2/en/us/files/Documents/universal-epic-universe-park-map-english.pdf',
  grupo: 'Universal',
},

];
