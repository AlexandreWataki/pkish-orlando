export type Promocao = {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: any; // ImageSourcePropType | string (URL)
  precoOriginal?: number;
  precoComDesconto?: number;
  porcentagem?: number; // ex.: 25 (%)
  categoria?: 'parques' | 'restaurantes' | 'hoteis' | 'compras' | 'transporte' | 'outros';
  validade?: string; // texto livre ou ISO
  parceiro?: string; // ex.: "Parceiro Oficial"
  link?: string;     // URL externa (opcional)
};
