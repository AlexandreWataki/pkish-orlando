// ⚠️ Importa apenas do módulo de tipos compartilhados para evitar require cycle.
import type { NomeMenu } from "./nomesRefeicoes.shared";

/**
 * Perfis oficiais (ou de loja/unidade) no Instagram para marcas/grandes redes.
 * Se não houver no mapa, caímos no fallback de busca do Instagram (segue abaixo).
 */
const IG_MAP: Record<string, string> = {
  // 1 - International Drive
  "The Capital Grille": "https://www.instagram.com/thecapitalgrille/",
  "Toothsome Chocolate Emporium Dinner": "https://www.instagram.com/universalorlando/",
  "Olive Garden I-Drive": "https://www.instagram.com/olivegarden/",
  "Green Fork": "https://www.instagram.com/greenforkorlando/",
  "Denny’s I-Drive": "https://www.instagram.com/dennysdiner/",

  // 2 - Lake Buena Vista
  "Chevys Fresh Mex": "https://www.instagram.com/chevysfreshmex/",
  "Rainforest Cafe": "https://www.instagram.com/rainforest_cafe/",
  "The Polite Pig": "https://www.instagram.com/thepolitepig/",
  "First Watch LBV": "https://www.instagram.com/firstwatch/",
  "Miller’s Ale House LBV": "https://www.instagram.com/millers_ale_house/",

  // 3 - Kissimmee
  "Logan’s Roadhouse": "https://www.instagram.com/logansroadhouse/",
  "Medieval Times Dinner & Tournament": "https://www.instagram.com/medievaltimes/",
  "Cracker Barrel Kissimmee": "https://www.instagram.com/crackerbarrel/",
  "Green Leaf Grill": "https://www.instagram.com/explore/search/keyword/?q=Green%20Leaf%20Grill%20Kissimmee",
  "Wendy’s Kissimmee": "https://www.instagram.com/wendys/",

  // 4 - Celebration
  "Columbia Restaurant Celebration": "https://www.instagram.com/columbiarestaurant/",
  "Bohemian Hotel – Lakeside Bar & Grill": "https://www.instagram.com/grandbohemianorlando/",
  "Celebration Town Tavern": "https://www.instagram.com/celebrationtowntavern/",
  "Vitality Bowls Celebration": "https://www.instagram.com/vitalitybowls/",
  "Upper Crust Pizza": "https://www.instagram.com/explore/search/keyword/?q=Upper%20Crust%20Pizza%20Celebration",

  // 5 - Disney Springs Area
  "The Boathouse": "https://www.instagram.com/disneysprings/",
  "Rainforest Café Disney Springs": "https://www.instagram.com/rainforest_cafe/",
  "Chef Art Smith’s Homecomin’": "https://www.instagram.com/disneysprings/",
  "Blaze Fast-Fire’d Pizza": "https://www.instagram.com/blazepizza/",
  "Earl of Sandwich": "https://www.instagram.com/earlofsandwich/",

  // 6 - Windsor Hills
  "Outback Steakhouse Kissimmee": "https://www.instagram.com/outback/",
  "Ford’s Garage Sunset Walk": "https://www.instagram.com/fordsgarageusa/",
  "Carrabba’s Italian Grill": "https://www.instagram.com/carrabbas/",
  "Freshii Windsor": "https://www.instagram.com/freshii/",
  "IHOP Windsor Hills": "https://www.instagram.com/ihop/",

  // 7 - ChampionsGate
  "Chili’s ChampionsGate": "https://www.instagram.com/chilis/",
  "Trevi’s at Omni Orlando": "https://www.instagram.com/omnichampionsgate/",
  "Miller’s Ale House ChampionsGate": "https://www.instagram.com/millers_ale_house/",
  "Bolay ChampionsGate": "https://www.instagram.com/bolay/",
  "Subway ChampionsGate": "https://www.instagram.com/subway/",

  // 8 - Four Corners
  "Texas Roadhouse Four Corners": "https://www.instagram.com/texasroadhouse/",
  "Flippers Pizzeria Four Corners": "https://www.instagram.com/flipperspizzeria/",
  "Bonefish Grill Four Corners": "https://www.instagram.com/bonefishgrill/",
  "Clean Eatz Four Corners": "https://www.instagram.com/cleaneatz/",
  "Taco Bell Four Corners": "https://www.instagram.com/tacobell/",

  // 9 - Reunion
  "Eleven at Reunion Resort": "https://www.instagram.com/reunionresort/",
  "Forte at Reunion Resort": "https://www.instagram.com/reunionresort/",
  "Reunion Café": "https://www.instagram.com/reunionresort/",
  "Vitality Bowls Reunion": "https://www.instagram.com/vitalitybowls/",
  "Burger King Reunion": "https://www.instagram.com/burgerking/",

  // 10 - Davenport
  "LongHorn Steakhouse Davenport": "https://www.instagram.com/longhornsteaks/",
  "Ovation Bistro & Bar": "https://www.instagram.com/ovationbistroandbar/",
  "Perkins Restaurant & Bakery": "https://www.instagram.com/perkinsrestaurant/",
  "Nature’s Table Davenport": "https://www.instagram.com/naturestable/",
  "Little Caesars Davenport": "https://www.instagram.com/littlecaesars/",

  // 11 - Westgate Lakes
  "Drafts Sports Bar & Grill": "https://www.instagram.com/westgateresorts/",
  "Villa Italiano Chophouse": "https://www.instagram.com/westgateresorts/",
  "Sid’s Bistro": "https://www.instagram.com/westgateresorts/",
  "The Juice Bar Westgate": "https://www.instagram.com/westgateresorts/",
  "Cordovano Joe’s Pizza": "https://www.instagram.com/westgateresorts/",

  // 12 - Vista Cay
  "NYPD Pizza": "https://www.instagram.com/nypdpizzeria/",
  "Mikado Japanese Steakhouse": "https://www.instagram.com/explore/search/keyword/?q=Mikado%20Japanese%20Steakhouse%20Orlando",
  "Beth’s Burger Bar": "https://www.instagram.com/bethsburgerbar/",
  "Freshii Vista Cay": "https://www.instagram.com/freshii/",
  "Subway Vista Cay": "https://www.instagram.com/subway/",

  // 14 - Dr. Phillips
  "Ruth’s Chris Steak House": "https://www.instagram.com/ruthschris/",
  "The Melting Pot": "https://www.instagram.com/themeltingpot/",
  "Seasons 52": "https://www.instagram.com/seasons52/",
  "Fresh Kitchen Dr. Phillips": "https://www.instagram.com/eatfreshkitchen/",
  "Firehouse Subs Dr. Phillips": "https://www.instagram.com/firehousesubs/",

  // 16 - Orlando Airport Area
  "Bonefish Grill Airport": "https://www.instagram.com/bonefishgrill/",
  "Marlow’s Tavern": "https://www.instagram.com/marlowstavern/",
  "LongHorn Steakhouse MCO": "https://www.instagram.com/longhornsteaks/",
  "Harvest Bistro": "https://www.instagram.com/hyattregencyorlandoairport/",
  "Chili’s MCO": "https://www.instagram.com/chilis/",

  // 17 - Downtown Orlando
  "The Boheme": "https://www.instagram.com/grandbohemianorlando/",
  "Hamburger Mary’s": "https://www.instagram.com/hamburgermarysorlando/",
  "Artisan’s Table": "https://www.instagram.com/artisanstableorlando/",
  "Dandelion Community Café": "https://www.instagram.com/dandelioncommunitycafe/",
  "Gringos Locos": "https://www.instagram.com/gringoslocosorlando/",

  // 18 - Hunter's Creek
  "Outback Steakhouse Hunter’s Creek": "https://www.instagram.com/outback/",
  "Tijuana Flats Hunter’s Creek": "https://www.instagram.com/tijuanaflats/",
  "Miller’s Ale House Hunter’s Creek": "https://www.instagram.com/millers_ale_house/",
  "Bolay Fresh Bold Kitchen": "https://www.instagram.com/bolay/",
  "McDonald's Hunter’s Creek": "https://www.instagram.com/mcdonalds/",

  // 19 - Windermere
  "Yellow Dog Eats": "https://www.instagram.com/yellowdogeats/",
  "My French Café": "https://www.instagram.com/myfrenchcafeorlando/",
  "Bella Tuscany": "https://www.instagram.com/explore/search/keyword/?q=Bella%20Tuscany%20Windermere",
  "The Grove Orlando": "https://www.instagram.com/explore/search/keyword/?q=The%20Grove%20Orlando%20Windermere",
  "Subway Windermere": "https://www.instagram.com/subway/",

  // 20 - Winter Garden
  "Urban Flats": "https://www.instagram.com/plantstreetmarket/",
  "MoonCricket Grille": "https://www.instagram.com/mooncricketgrille/",
  "The Whole Enchilada": "https://www.instagram.com/wholeenchiladafl/",
  "Plant St. Market - Press’d": "https://www.instagram.com/plantstreetmarket/",
  "Five Guys Winter Garden": "https://www.instagram.com/fiveguys/",

  // 21 - Altamonte Springs
  "Seasons 52 Altamonte": "https://www.instagram.com/seasons52/",
  "Kobe Japanese Steakhouse": "https://www.instagram.com/kobesteakhouse/",
  "Olive Garden Altamonte": "https://www.instagram.com/olivegarden/",
  "Fresh Kitchen Altamonte": "https://www.instagram.com/eatfreshkitchen/",
  "Tijuana Flats Altamonte": "https://www.instagram.com/tijuanaflats/",

  // 22 - Clermont
  "Guru Restaurant Clermont": "https://www.instagram.com/gururestaurantclermont/",
  "San Jose's Original Mexican Restaurant": "https://www.instagram.com/sanjoseoriginalmexican/",
  "Carrabba's Italian Grill Clermont": "https://www.instagram.com/carrabbas/",
  "Planet Smoothie & Bowl": "https://www.instagram.com/planetsmoothie/",
  "Zaxby's Clermont": "https://www.instagram.com/zaxbys/",

  // 23 - Oak Ridge
  "Red Lobster Oak Ridge": "https://www.instagram.com/redlobster/",
  "Azteca D’Oro Mexican Restaurant": "https://www.instagram.com/aztecadorofl/",
  "Cheddar’s Scratch Kitchen Oak Ridge": "https://www.instagram.com/cheddarskitchen/",
  "Greenbeat Oak Ridge": "https://www.instagram.com/greenbeatlife/",
  "Taco Bell Oak Ridge": "https://www.instagram.com/tacobell/",

  // 24 - Maingate East
  "Olive Garden Maingate East": "https://www.instagram.com/olivegarden/",
  "El Tenampa Mexican Restaurant": "https://www.instagram.com/explore/search/keyword/?q=El%20Tenampa%20Kissimmee",
  "Perkins Restaurant & Bakery Maingate": "https://www.instagram.com/perkinsrestaurant/",
  "Bolay Fresh Bold Kitchen (Maingate East)": "https://www.instagram.com/bolay/",
  "McDonald's Maingate East": "https://www.instagram.com/mcdonalds/",

  // 25 - Maingate West
  "Cracker Barrel Maingate West": "https://www.instagram.com/crackerbarrel/",
  "El Ranchito Mexican Grill": "https://www.instagram.com/explore/search/keyword/?q=El%20Ranchito%20Mexican%20Grill%20Kissimmee",
  "Giordano’s Maingate": "https://www.instagram.com/explore/search/keyword/?q=Giordano%27s%20Pizza%20Orlando",
  "Panera Bread Maingate": "https://www.instagram.com/panerabread/",
  "Wendy’s Maingate West": "https://www.instagram.com/wendys/",

  // 26 - Bonnet Creek
  "Bull & Bear": "https://www.instagram.com/waldorforlando/",
  "La Luce": "https://www.instagram.com/laluceorlando/",
  "Harvest Bistro (Waldorf/Signia)": "https://www.instagram.com/waldorforlando/",
  "Zeta Asia": "https://www.instagram.com/waldorforlando/",
  "Subway Bonnet Creek": "https://www.instagram.com/subway/",

  // 27 - Bay Lake (Disney)
  "Steakhouse 71": "https://www.instagram.com/disneyparks/",
  "Be Our Guest Restaurant": "https://www.instagram.com/disneyparks/",
  "Chef Mickey's": "https://www.instagram.com/disneyparks/",
  "California Grill": "https://www.instagram.com/disneyparks/",
  "Cosmic Ray's Starlight Café": "https://www.instagram.com/disneyparks/",

  // 28 - Flamingo Crossings
  "PDQ Flamingo Crossings": "https://www.instagram.com/eatpdq/",
  "Antojitos Flamingo Crossings": "https://www.instagram.com/universalorlando/",
  "Five Guys Flamingo": "https://www.instagram.com/fiveguys/",
  "The Salad Station": "https://www.instagram.com/thesaladstation/",
  "Little Caesars Flamingo": "https://www.instagram.com/littlecaesars/",

  // 29 - MetroWest
  "Teak Neighborhood Grill": "https://www.instagram.com/teakorlando/",
  "Chili's MetroWest": "https://www.instagram.com/chilis/",
  "Applebee's MetroWest": "https://www.instagram.com/applebees/",
  "Bolay MetroWest": "https://www.instagram.com/bolay/",
  "Taco Bell MetroWest": "https://www.instagram.com/tacobell/",

  // 30 - Winter Park
  "The Ravenous Pig": "https://www.instagram.com/theravenouspig/",
  "Bulla Gastrobar": "https://www.instagram.com/bullagastrobar/",
  "Hillstone Restaurant": "https://www.instagram.com/hillstonerestaurant/",
  "First Watch – Winter Park": "https://www.instagram.com/firstwatch/",
  "BurgerFi Winter Park": "https://www.instagram.com/burgerfi/",

  // 31 - Osceola Parkway
  "Olive Garden Osceola": "https://www.instagram.com/olivegarden/",
  "T-Rex Cafe (The Loop/Bay Lake routing)": "https://www.instagram.com/t_rexcafe/",
  "Cheddar’s Scratch Kitchen (The Loop)": "https://www.instagram.com/cheddarskitchen/",
  "Panera Bread – The Loop": "https://www.instagram.com/panerabread/",
  "Taco Bell Osceola": "https://www.instagram.com/tacobell/",

  // 32 - Millenia Area
  "Earls Kitchen + Bar": "https://www.instagram.com/earlsonly/",
  "P.F. Chang’s": "https://www.instagram.com/pfchangs/",
  "The Cheesecake Factory – Millenia": "https://www.instagram.com/cheesecakefactory/",
  "Panera Bread – Millenia Plaza": "https://www.instagram.com/panerabread/",
  "Chick-fil-A Millenia": "https://www.instagram.com/chickfila/",

  // 33 - Southchase
  "Outback Steakhouse Southchase": "https://www.instagram.com/outback/",
  "Bahama Breeze (Vineland)": "https://www.instagram.com/bahamabreezeislandgrille/",
  "Red Lobster S OBT": "https://www.instagram.com/redlobster/",
  "Tropical Smoothie Cafe": "https://www.instagram.com/tropicalsmoothiecafe/",
  "McDonald's Southchase": "https://www.instagram.com/mcdonalds/",

  // 34 - Baldwin Park
  "The Osprey": "https://www.instagram.com/theospreyorlando/",
  "Seito Sushi": "https://www.instagram.com/seitobp/",
  "Gators Dockside – Baldwin Park": "https://www.instagram.com/gatorsdockside/",
  "Green Kitchen": "https://www.instagram.com/greenkitchenorlando/",
  "Subway Baldwin Park": "https://www.instagram.com/subway/",

  // 35 - Sand Lake Road Area
  "Ruth’s Chris Steak House (Sand Lake)": "https://www.instagram.com/ruthschris/",
  "Benihana I-Drive": "https://www.instagram.com/benihanarestaurants/",
  "Seasons 52 (Sand Lake)": "https://www.instagram.com/seasons52/",
  "True Food Kitchen": "https://www.instagram.com/truefoodkitchen/",
  "Wendy’s Sand Lake": "https://www.instagram.com/wendys/",

  // 36 - North Kissimmee
  "Logan’s Roadhouse (North Kissimmee)": "https://www.instagram.com/logansroadhouse/",
  "El Tenampa (North Kissimmee)": "https://www.instagram.com/explore/search/keyword/?q=El%20Tenampa%20Kissimmee",
  "Cracker Barrel Old Country Store": "https://www.instagram.com/crackerbarrel/",
  "Vitality Bowls (North Kissimmee)": "https://www.instagram.com/vitalitybowls/",
  "Checkers Drive-In": "https://www.instagram.com/checkersrallys/",
};

/** Fallback: gera link de BUSCA do Instagram pelo nome do restaurante. */
const igSearch = (nome: string) =>
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(nome)}`;

export const NOMES_REFEICOES_JANTAR: NomeMenu[] = Object.keys(IG_MAP).map((nome) => ({
  nome,
  menuUrl: IG_MAP[nome] ?? igSearch(nome),
})).sort((a, b) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
);
