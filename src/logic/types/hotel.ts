export interface Hotel {
  nome: string;
  endereco: string;
  localizacao: {
    lat: number;
    lng: number;
  };
  regiao?: string; // <- ADICIONE ISTO
}
