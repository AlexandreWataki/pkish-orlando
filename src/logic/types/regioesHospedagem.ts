ï»¿import { SugestaoRefeicao } from './tiposRefeicao'; // ajuste o caminho se necessÃƒÂ¡rio
import { cafesProximos } from '../blocos/ref/cafesProximos';
import { almocosProximos } from '../blocos/ref/almocosProximos';
import { jantaresProximos } from '../blocos/ref/jantaresProximos';


export type Regiao = {
  nome: string;
  latitude: number;           // preferencialmente nÃƒÂ£o null
  longitude: number;          // preferencialmente nÃƒÂ£o null
  descricao: string;
  tempoAteDisney: number;
  tempoAteUniversal: number;
  tempoAteAeroportoMCO: number;
  tempoAteAeroportoMiami: number;
  cafesProximos?: SugestaoRefeicao[];
  almocosProximos?: SugestaoRefeicao[];
  jantaresProximos?: SugestaoRefeicao[];
};



export const regioesHospedagem = [

  {
  nome: "International Drive",
  latitude: 28.4352,
  longitude: -81.4704,
  descricao: "Principal corredor turÃƒÂ­stico com hotÃƒÂ©is, restaurantes e acesso rÃƒÂ¡pido aos parques.",
  tempoAteDisney: 15,
  tempoAteUniversal: 10,
  tempoAteAeroportoMCO: 20,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "International Drive"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "International Drive"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "International Drive")
},
{
  nome: "Lake Buena Vista",
  latitude: 28.3747,
  longitude: -81.5166,
  descricao: "Bairro sofisticado e vizinho da Disney Springs, com ÃƒÂ³timos hotÃƒÂ©is e resorts.",
  tempoAteDisney: 10,
  tempoAteUniversal: 20,
  tempoAteAeroportoMCO: 25,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Lake Buena Vista"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Lake Buena Vista"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Lake Buena Vista")
},
{
  nome: "Kissimmee",
  latitude: 28.3047,
  longitude: -81.4167,
  descricao: "ÃƒÂrea econÃƒÂ´mica e popular com muitos hotÃƒÂ©is, casas de temporada e fÃƒÂ¡cil acesso aos parques.",
  tempoAteDisney: 20,
  tempoAteUniversal: 30,
  tempoAteAeroportoMCO: 30,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Kissimmee"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Kissimmee"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Kissimmee")
},
{
  nome: "Celebration",
  latitude: 28.3256,
  longitude: -81.5333,
  descricao: "Cidade planejada pela Disney, charmosa, familiar e tranquila.",
  tempoAteDisney: 12,
  tempoAteUniversal: 25,
  tempoAteAeroportoMCO: 28,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Celebration"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Celebration"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Celebration")
},
{
  nome: "Disney Springs Area",
  latitude: 28.3708,
  longitude: -81.5194,
  descricao: "ÃƒÂrea cheia de entretenimento, restaurantes, lojas e hotÃƒÂ©is oficiais Disney.",
  tempoAteDisney: 7,
  tempoAteUniversal: 22,
  tempoAteAeroportoMCO: 25,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Disney Springs Area"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Disney Springs Area"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Disney Springs Area")
},
{
  nome: "Windsor Hills",
  latitude: 28.3193,
  longitude: -81.5883,
  descricao: "CondomÃƒÂ­nio fechado muito popular entre famÃƒÂ­lias, prÃƒÂ³ximo ÃƒÂ  Disney.",
  tempoAteDisney: 10,
  tempoAteUniversal: 25,
  tempoAteAeroportoMCO: 35,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Windsor Hills"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Windsor Hills"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Windsor Hills")
},
{
  nome: "ChampionsGate",
  latitude: 28.2631,
  longitude: -81.6322,
  descricao: "Resorts e condomÃƒÂ­nios com campos de golfe, ideal para lazer e famÃƒÂ­lias.",
  tempoAteDisney: 22,
  tempoAteUniversal: 35,
  tempoAteAeroportoMCO: 35,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "ChampionsGate"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "ChampionsGate"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "ChampionsGate")
},
{
  nome: "Four Corners",
  latitude: 28.3321,
  longitude: -81.6509,
  descricao: "Ponto estratÃƒÂ©gico com muitos imÃƒÂ³veis de temporada e boa estrutura.",
  tempoAteDisney: 18,
  tempoAteUniversal: 30,
  tempoAteAeroportoMCO: 40,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Four Corners"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Four Corners"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Four Corners")
},
{
  nome: "Reunion",
  latitude: 28.2817,
  longitude: -81.5871,
  descricao: "Complexo de luxo com casas e resorts sofisticados.",
  tempoAteDisney: 17,
  tempoAteUniversal: 32,
  tempoAteAeroportoMCO: 38,
  tempoAteAeroportoMiami: 232,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Reunion"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Reunion"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Reunion")
},
{
  nome: "Davenport",
  latitude: 28.1617,
  longitude: -81.6016,
  descricao: "Cidade ao sul, ÃƒÂ³tima para casas grandes e econÃƒÂ´micas para grupos.",
  tempoAteDisney: 28,
  tempoAteUniversal: 40,
  tempoAteAeroportoMCO: 42,
  tempoAteAeroportoMiami: 235,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Davenport"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Davenport"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Davenport")
},
{
  nome: "Westgate Lakes",
  latitude: 28.4250,
  longitude: -81.4667,
  descricao: "Grande resort e entorno prÃƒÂ³ximo ÃƒÂ  International Drive e aos parques.",
  tempoAteDisney: 15,
  tempoAteUniversal: 10,
  tempoAteAeroportoMCO: 21,
  tempoAteAeroportoMiami: 229,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Westgate Lakes"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Westgate Lakes"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Westgate Lakes")
},
{
  nome: "Vista Cay",
  latitude: 28.4258,
  longitude: -81.4692,
  descricao: "Complexo de apartamentos e resorts prÃƒÂ³ximo ao Convention Center.",
  tempoAteDisney: 14,
  tempoAteUniversal: 11,
  tempoAteAeroportoMCO: 19,
  tempoAteAeroportoMiami: 228,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Vista Cay"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Vista Cay"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Vista Cay")
},
{
  nome: "Dr. Phillips",
  latitude: 28.4631,
  longitude: -81.4933,
  descricao: "Bairro nobre, famoso por bons restaurantes e tranquilidade.",
  tempoAteDisney: 15,
  tempoAteUniversal: 7,
  tempoAteAeroportoMCO: 23,
  tempoAteAeroportoMiami: 229,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Dr. Phillips"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Dr. Phillips"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Dr. Phillips")
},
{
  nome: "Orlando Airport Area",
  latitude: 28.4312,
  longitude: -81.3081,
  descricao: "HotÃƒÂ©is prÃƒÂ¡ticos e econÃƒÂ´micos prÃƒÂ³ximos ao aeroporto internacional de Orlando.",
  tempoAteDisney: 27,
  tempoAteUniversal: 22,
  tempoAteAeroportoMCO: 5,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Orlando Airport Area"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Orlando Airport Area"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Orlando Airport Area")
},
{
  nome: "Downtown Orlando",
  latitude: 28.5417,
  longitude: -81.3792,
  descricao: "Centro da cidade, ideal para quem quer explorar o lado urbano de Orlando.",
  tempoAteDisney: 26,
  tempoAteUniversal: 18,
  tempoAteAeroportoMCO: 19,
  tempoAteAeroportoMiami: 240,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Downtown Orlando"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Downtown Orlando"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Downtown Orlando")
},
{
  nome: "Hunter's Creek",
  latitude: 28.3569,
  longitude: -81.4251,
  descricao: "Bairro familiar e residencial, tranquilo, com boas opÃƒÂ§ÃƒÂµes de locaÃƒÂ§ÃƒÂ£o.",
  tempoAteDisney: 20,
  tempoAteUniversal: 25,
  tempoAteAeroportoMCO: 22,
  tempoAteAeroportoMiami: 231,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Hunter's Creek"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Hunter's Creek"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Hunter's Creek")
},
{
  nome: "Windermere",
  latitude: 28.4958,
  longitude: -81.5354,
  descricao: "RegiÃƒÂ£o nobre, com belas casas e opÃƒÂ§ÃƒÂµes tranquilas para famÃƒÂ­lias.",
  tempoAteDisney: 20,
  tempoAteUniversal: 16,
  tempoAteAeroportoMCO: 28,
  tempoAteAeroportoMiami: 235,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Windermere"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Windermere"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Windermere")
},
{
  nome: "Winter Garden",
  latitude: 28.5653,
  longitude: -81.5861,
  descricao: "Cidade charmosa com centro histÃƒÂ³rico e boas opÃƒÂ§ÃƒÂµes de hospedagem.",
  tempoAteDisney: 24,
  tempoAteUniversal: 21,
  tempoAteAeroportoMCO: 31,
  tempoAteAeroportoMiami: 239,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Winter Garden"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Winter Garden"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Winter Garden")
},
{
  nome: "Altamonte Springs",
  latitude: 28.6611,
  longitude: -81.3656,
  descricao: "Cidade com hotÃƒÂ©is econÃƒÂ´micos, boa para quem quer fugir do eixo turÃƒÂ­stico.",
  tempoAteDisney: 37,
  tempoAteUniversal: 25,
  tempoAteAeroportoMCO: 35,
  tempoAteAeroportoMiami: 255,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Altamonte Springs"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Altamonte Springs"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Altamonte Springs")
},
{
  nome: "Clermont",
  latitude: 28.5494,
  longitude: -81.7729,
  descricao: "Cidade com casas grandes e tranquilidade, boa para longa estadia.",
  tempoAteDisney: 28,
  tempoAteUniversal: 35,
  tempoAteAeroportoMCO: 42,
  tempoAteAeroportoMiami: 250,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Clermont"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Clermont"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Clermont")
},
{
  nome: "Oak Ridge",
  latitude: 28.4711,
  longitude: -81.4120,
  descricao: "Bairro tradicional prÃƒÂ³ximo ao The Florida Mall e fÃƒÂ¡cil acesso aos parques.",
  tempoAteDisney: 19,
  tempoAteUniversal: 10,
  tempoAteAeroportoMCO: 18,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Oak Ridge"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Oak Ridge"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Oak Ridge")
},
{
  nome: "Maingate East",
  latitude: 28.3366,
  longitude: -81.5168,
  descricao: "Porta de entrada leste para a Disney, cheia de hotÃƒÂ©is e restaurantes acessÃƒÂ­veis.",
  tempoAteDisney: 8,
  tempoAteUniversal: 23,
  tempoAteAeroportoMCO: 26,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Maingate East"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Maingate East"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Maingate East")
},
{
  nome: "Maingate West",
  latitude: 28.3230,
  longitude: -81.6080,
  descricao: "Porta de entrada oeste para a Disney, muitos resorts e aluguel de casas.",
  tempoAteDisney: 5,
  tempoAteUniversal: 24,
  tempoAteAeroportoMCO: 33,
  tempoAteAeroportoMiami: 232,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Maingate West"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Maingate West"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Maingate West")
},
{
  nome: "Bonnet Creek",
  latitude: 28.3566,
  longitude: -81.5335,
  descricao: "ÃƒÂrea exclusiva com resorts de luxo, bem ao lado do complexo Disney.",
  tempoAteDisney: 3,
  tempoAteUniversal: 20,
  tempoAteAeroportoMCO: 21,
  tempoAteAeroportoMiami: 232,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Bonnet Creek"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Bonnet Creek"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Bonnet Creek")
},

{
  nome: "Flamingo Crossings",
  latitude: 28.3911,
  longitude: -81.6501,
  descricao: "ÃƒÂrea nova e em expansÃƒÂ£o, com hotÃƒÂ©is econÃƒÂ´micos e prÃƒÂ³ximos da Disney.",
  tempoAteDisney: 6,
  tempoAteUniversal: 28,
  tempoAteAeroportoMCO: 36,
  tempoAteAeroportoMiami: 235,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Flamingo Crossings"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Flamingo Crossings"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Flamingo Crossings")
},
{
  nome: "MetroWest",
  latitude: 28.5131,
  longitude: -81.4630,
  descricao: "RegiÃƒÂ£o com apartamentos, ÃƒÂ³tima para estadias prolongadas e acesso ao Universal.",
  tempoAteDisney: 23,
  tempoAteUniversal: 9,
  tempoAteAeroportoMCO: 22,
  tempoAteAeroportoMiami: 240,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "MetroWest"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "MetroWest"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "MetroWest")
},
{
  nome: "Winter Park",
  latitude: 28.5999,
  longitude: -81.3392,
  descricao: "Bairro charmoso com comÃƒÂ©rcio, restaurantes e bons hotÃƒÂ©is boutique.",
  tempoAteDisney: 30,
  tempoAteUniversal: 18,
  tempoAteAeroportoMCO: 24,
  tempoAteAeroportoMiami: 240,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Winter Park"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Winter Park"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Winter Park")
},
{
  nome: "Osceola Parkway",
  latitude: 28.3297,
  longitude: -81.4102,
  descricao: "Via estratÃƒÂ©gica entre Kissimmee e Disney, com hotÃƒÂ©is e casas prÃƒÂ³ximas dos parques.",
  tempoAteDisney: 8,
  tempoAteUniversal: 27,
  tempoAteAeroportoMCO: 24,
  tempoAteAeroportoMiami: 235,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Osceola Parkway"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Osceola Parkway"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Osceola Parkway")
},
{
  nome: "Millenia Area",
  latitude: 28.4886,
  longitude: -81.4310,
  descricao: "RegiÃƒÂ£o nobre prÃƒÂ³xima ao The Mall at Millenia, com hotÃƒÂ©is de alto padrÃƒÂ£o e acesso fÃƒÂ¡cil ÃƒÂ  I-4.",
  tempoAteDisney: 20,
  tempoAteUniversal: 8,
  tempoAteAeroportoMCO: 22,
  tempoAteAeroportoMiami: 235,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Millenia Area"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Millenia Area"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Millenia Area")
},
{
  nome: "Southchase",
  latitude: 28.3858,
  longitude: -81.3927,
  descricao: "Bairro residencial ao sul de Orlando, com acesso rÃƒÂ¡pido ÃƒÂ  John Young Pkwy e boas opÃƒÂ§ÃƒÂµes econÃƒÂ´micas.",
  tempoAteDisney: 18,
  tempoAteUniversal: 20,
  tempoAteAeroportoMCO: 15,
  tempoAteAeroportoMiami: 228,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Southchase"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Southchase"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Southchase")
},
{
  nome: "Baldwin Park",
  latitude: 28.5682,
  longitude: -81.3250,
  descricao: "Bairro moderno e planejado, com charme urbano e boas opÃƒÂ§ÃƒÂµes de cafÃƒÂ©s e restaurantes.",
  tempoAteDisney: 30,
  tempoAteUniversal: 20,
  tempoAteAeroportoMCO: 24,
  tempoAteAeroportoMiami: 240,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Baldwin Park"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Baldwin Park"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Baldwin Park")
},
{
  nome: "Sand Lake Road Area",
  latitude: 28.4402,
  longitude: -81.4388,
  descricao: "Corredor gastronÃƒÂ´mico de Orlando com restaurantes renomados, prÃƒÂ³ximo ÃƒÂ  Dr. Phillips.",
  tempoAteDisney: 15,
  tempoAteUniversal: 10,
  tempoAteAeroportoMCO: 20,
  tempoAteAeroportoMiami: 232,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "Sand Lake Road Area"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "Sand Lake Road Area"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "Sand Lake Road Area")
},
{
  nome: "North Kissimmee",
  latitude: 28.3567,
  longitude: -81.4033,
  descricao: "ÃƒÂrea intermediÃƒÂ¡ria entre Kissimmee e Hunters Creek, com mix de hotÃƒÂ©is, supermercados e moradia.",
  tempoAteDisney: 18,
  tempoAteUniversal: 27,
  tempoAteAeroportoMCO: 21,
  tempoAteAeroportoMiami: 230,
  cafesProximos: cafesProximos.filter((r: any) => r.regiao === "North Kissimmee"),
  almocosProximos: almocosProximos.filter((r: any) => r.regiao === "North Kissimmee"),
  jantaresProximos: jantaresProximos.filter((r: any) => r.regiao === "North Kissimmee")
},


  
];
