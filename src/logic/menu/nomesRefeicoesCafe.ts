// ⚠️ Importa apenas do módulo de tipos compartilhados para evitar require cycle.
import type { NomeMenu } from "./nomesRefeicoes.shared";

/**
 * Perfis oficiais (ou de loja/unidade) no Instagram para marcas/grandes redes.
 * Se não houver no mapa, caímos no fallback de busca do Instagram (segue abaixo).
 */
const IG_MAP: Record<string, string> = {
  // 1 - International Drive
  "The Capital Grille": "https://www.instagram.com/thecapitalgrille/",
  "Maggiano's Little Italy (Pointe Orlando)": "https://www.instagram.com/maggianoslittleitaly/",
  "Shake Shack – ICON Park": "https://www.instagram.com/shakeshack/",
  "Nature’s Table (Convention Center)": "https://www.instagram.com/naturestable/",
  "Seito Sushi Baldwin Park": "https://www.instagram.com/seitobp/",

  // 2 - Lake Buena Vista (Disney Springs)
  "The Polite Pig": "https://www.instagram.com/thepolitepig/",
  "T-REX Café": "https://www.instagram.com/t_rexcafe/",
  "Earl of Sandwich": "https://www.instagram.com/earlofsandwich/",
  "Blaze Fast-Fire’d Pizza": "https://www.instagram.com/blazepizza/",
  "Joffrey’s Coffee & Tea Company (Disney Springs)": "https://www.instagram.com/joffreyscoffeeandtea/",


    // 3 - Kissimmee
  "Big John's Rockin' BBQ": "https://www.instagram.com/bigjohnsrockinbbq/",
  "Matador Tacos + Tapas Bar": "https://www.instagram.com/matadorfl/",
  "Woodsby's Cafe": "https://www.instagram.com/woodsbycafe/",
  "The Italian Joint Kissimmee": "https://www.instagram.com/theitalianjointkissimmee/",
  "El Tenampa Mexican Restaurant": "https://www.instagram.com/eltenamparestaurant/",

  // 4 - Celebration
  "Columbia Restaurant – Celebration": "https://www.instagram.com/columbiarestaurant/",
  "Celebration Town Tavern": "https://www.instagram.com/celebrationtowntavern/",

  // 5 - Kissimmee Gateway
  "Savion's Place": "https://www.instagram.com/savionsplace/",
  "El Tapatio Mexican Restaurant": "https://www.instagram.com/eltapatiokissimmee/",
  "Joanie's Diner": "https://www.instagram.com/joaniesdiner/",
  "Panda Express Kissimmee": "https://www.instagram.com/officialpandaexpress/",
  "Raw Juice Bar Kissimmee": "https://www.instagram.com/rawjuicebar/",


  // 6 - Westgate Lakes
  "Subway Westgate Lakes": "https://www.instagram.com/subway/",

  // 7 - Dr. Phillips
  "Seasons 52": "https://www.instagram.com/seasons52/",
  "Christini's Ristorante Italiano": "https://www.instagram.com/christinisorlando/",
  "The Venetian Chop House": "https://www.instagram.com/venetianchophouse/",
  "Tijuana Flats Dr. Phillips": "https://www.instagram.com/tijuanaflats/",
  "Pressed Juice Bar Dr. Phillips": "https://www.instagram.com/pressedjuicebar/",

  // 8 - Pointe Orlando
  "The Oceanaire Seafood Room": "https://www.instagram.com/theoceanaire/",
  "The Pub Orlando": "https://www.instagram.com/thepuborlando/",
  "Johnny Rockets Pointe Orlando": "https://www.instagram.com/johnnyrockets/",
  "Tropical Smoothie Café Pointe": "https://www.instagram.com/tropicalsmoothiecafe/",

  // 9 - Vineland Premium Outlets
  "The Cheesecake Factory Vineland": "https://www.instagram.com/cheesecakefactory/",
  "Benihana Orlando": "https://www.instagram.com/benihana/",
  "BJ's Restaurant & Brewhouse Vineland": "https://www.instagram.com/bjsrestaurants/",
  "Panda Express Vineland": "https://www.instagram.com/officialpandaexpress/",
  "Green Leaf's Vineland": "https://www.instagram.com/greenleafsbgs/",

// 10 - Disney Springs
  "The Boathouse": "https://www.instagram.com/theboathousefla/",
  "Rainforest Café Disney Springs": "https://www.instagram.com/rainforest_cafe/",
  "Wolfgang Puck Bar & Grill": "https://www.instagram.com/wolfgangpuckbarandgrill/",
  "Earl of Sandwich Disney Springs": "https://www.instagram.com/earlofsandwich/",
  "Joffrey's Coffee Disney Springs": "https://www.instagram.com/joffreyscoffeeandtea/",

  // 10 - Davenport
  "IHOP Davenport": "https://www.instagram.com/ihop/",
  "Ovation Bistro & Bar": "https://www.instagram.com/ovationbistro/",
  "Perkins Restaurant & Bakery Davenport": "https://www.instagram.com/perkinsrestaurants/",
  "Burger King Davenport": "https://www.instagram.com/burgerking/",
  "Smoothie King Davenport": "https://www.instagram.com/smoothieking/",


  // 12 - Vista Cay
  "Dunkin’ Vista Cay": "https://www.instagram.com/dunkin/",

  // 14 - Dr. Phillips (Breakfast/Brunch)
  "Keke’s Breakfast Café": "https://www.instagram.com/kekesbreakfastcafe/",
  "Dunkin’ Dr. Phillips": "https://www.instagram.com/dunkin/",

  // 16 - Orlando Airport Area
  "Another Broken Egg Cafe": "https://www.instagram.com/anotherbrokenegg/",
  "Rock & Brews - Lee Vista": "https://www.instagram.com/rockandbrews/",
  "Bar Louie - Orlando Airport": "https://www.instagram.com/barlouie/",

  // 17 - Downtown Orlando
  "Hamburger Mary’s Orlando": "https://www.instagram.com/hamburgermarysorlando/",
  "Dunkin’ Downtown Orlando": "https://www.instagram.com/dunkin/",

  // 18 - Hunter's Creek
  "Keke’s Breakfast Café Hunter’s Creek": "https://www.instagram.com/kekesbreakfastcafe/",
  "Metro Diner Hunter’s Creek": "https://www.instagram.com/metrodiner/",
  "Bolay Fresh Bold Kitchen": "https://www.instagram.com/bolay/",
  "Dunkin’ Hunter’s Creek": "https://www.instagram.com/dunkin/",

  // 19 - Windermere
  "Peach Valley Café": "https://www.instagram.com/peachvalleycafe/",
  "Dunkin’ Windermere": "https://www.instagram.com/dunkin/",

  // 20 - Winter Garden
  "Dunkin’ Winter Garden": "https://www.instagram.com/dunkin/",

  // 21 - Altamonte Springs
  "First Watch Altamonte": "https://www.instagram.com/firstwatch/",
  "Kobe Japanese Steakhouse": "https://www.instagram.com/kobesteakhouse/",
  "Dunkin’ Altamonte": "https://www.instagram.com/dunkin/",
  "Vitality Bowls Altamonte": "https://www.instagram.com/vitalitybowls/",

// 22 - Clermont
  "Lilly’s on the Lake": "https://www.instagram.com/lillysonthelake/",
  "The Crooked Spoon Gastropub": "https://www.instagram.com/crookedspoonclermont/",
  "Bob Evans Clermont": "https://www.instagram.com/bobevansfarms/",
  "Taco Bell Clermont": "https://www.instagram.com/tacobell/",
  "Vitality Bowls Clermont": "https://www.instagram.com/vitalitybowlsclermont/",

  // 23 - Oak Ridge
  "Applebee’s Oak Ridge": "https://www.instagram.com/applebees/",
  "Perkins Restaurant & Bakery": "https://www.instagram.com/perkinsrestaurant/",
  "Pollo Tropical Oak Ridge": "https://www.instagram.com/pollotropical/",
  "Smoothie King Oak Ridge": "https://www.instagram.com/smoothieking/",

  // 24 - Maingate East
  "Olive Garden Maingate East": "https://www.instagram.com/olivegarden/",
  "Cracker Barrel Maingate East": "https://www.instagram.com/crackerbarrel/",
  "Taco Bell Maingate East": "https://www.instagram.com/tacobell/",
  "Nature’s Table Maingate East": "https://www.instagram.com/naturestable/",

  // 25 - Maingate West
  "IHOP Maingate West": "https://www.instagram.com/ihop/",
  "McDonald’s Formosa Blvd": "https://www.instagram.com/mcdonalds/",
  "Freshii Maingate West": "https://www.instagram.com/freshii/",

  // 26 - Bonnet Creek
  "Subway Bonnet Creek": "https://www.instagram.com/subway/",
  "Nature’s Table Bonnet Creek": "https://www.instagram.com/naturestable/",

  // 27 - ChampionsGate
  "First Watch – ChampionsGate": "https://www.instagram.com/firstwatch/",
  "Dulcetto Café & Gelato": "https://www.instagram.com/dulcettocafeandgelato/",
  "Panera Bread – ChampionsGate": "https://www.instagram.com/panerabread/",
  "Clean Juice – ChampionsGate": "https://www.instagram.com/cleanjuice/",
  "Dunkin’ – ChampionsGate": "https://www.instagram.com/dunkin/",

  
  // 28 - Flamingo Crossings
  "IHOP Flamingo Crossings": "https://www.instagram.com/ihop/",
  "Hash House A Go Go": "https://www.instagram.com/hashhouseagogo/",
  "Applebee’s Flamingo Crossings": "https://www.instagram.com/applebees/",
  "Tropical Smoothie Café Flamingo": "https://www.instagram.com/tropicalsmoothiecafe/",
  "Dunkin’ Flamingo Crossings": "https://www.instagram.com/dunkin/",

  // 29 - MetroWest
  "Metro Diner": "https://www.instagram.com/metrodiner/",
  "Fresh Kitchen MetroWest": "https://www.instagram.com/eatfreshkitchen/",
  "Dunkin’ MetroWest": "https://www.instagram.com/dunkin/",

  // 20 - Winter Garden (Instagram)
  "Winter Garden Café": "https://www.instagram.com/wintergardencafe/",
  "Crooked Can Brewing Company": "https://www.instagram.com/crookedcan/",
  "MoonCricket Grille": "https://www.instagram.com/mooncricketgrille/",
  "Plant Street Market – Press’d": "https://www.instagram.com/plantstreetmarket/",

  // 31 - Osceola Parkway
  "First Watch – The Loop": "https://www.instagram.com/firstwatch/",
  "Panera Bread – The Loop": "https://www.instagram.com/panerabread/",
  "Vitality Bowls – Kissimmee": "https://www.instagram.com/vitalitybowls/",
  "Dunkin’ Osceola Parkway": "https://www.instagram.com/dunkin/",

  // 32 - Millenia Area
  "Keke's Breakfast Café – Millenia": "https://www.instagram.com/kekesbreakfastcafe/",
  "Earls Kitchen + Bar": "https://www.instagram.com/earlsonly/",
  "Brio Italian Grille – Millenia": "https://www.instagram.com/brioitaliangrille/",
  "The Cheesecake Factory – Millenia": "https://www.instagram.com/cheesecakefactory/",
  "Foxtail Coffee – Millenia": "https://www.instagram.com/foxtailcoffee/",

  // 33 - Southchase
  "Metro Diner Southchase": "https://www.instagram.com/metrodiner/",
  "Chuy’s Tex-Mex Southchase": "https://www.instagram.com/chuysrestaurant/",
  "Miller’s Ale House Southchase": "https://www.instagram.com/millers_ale_house/",
  "Tropical Smoothie Cafe Southchase": "https://www.instagram.com/tropicalsmoothiecafe/",
  "Dunkin’ Southchase": "https://www.instagram.com/dunkin/",

  // 34 - Baldwin Park
  "The Osprey Tavern": "https://www.instagram.com/theospreyorlando/",
  "Gators Dockside Baldwin": "https://www.instagram.com/gatorsdockside/",
  "Dunkin’ Baldwin Park": "https://www.instagram.com/dunkin/",

  // 35 - Sand Lake Road Area
  "The Whiskey": "https://www.instagram.com/thewhiskeyorlando/",
  "The Melting Pot Orlando": "https://www.instagram.com/themeltingpot/",
  "Rocco’s Tacos & Tequila Bar": "https://www.instagram.com/roccostacos/",
  "Too Much Sauce": "https://www.instagram.com/toomuchsaucefl/",

  // 36 - North Kissimmee
  "Denny’s North Kissimmee": "https://www.instagram.com/dennysdiner/",
  "Medieval Times Dinner & Tournament": "https://www.instagram.com/medievaltimes/",
  "Cracker Barrel Old Country Store": "https://www.instagram.com/crackerbarrel/",
  "Nature’s Table Kissimmee": "https://www.instagram.com/naturestable/",
  "Dunkin’ North Kissimmee": "https://www.instagram.com/dunkin/",

  // 37 - Four Corners
"Chili’s Grill & Bar – Four Corners": "https://www.instagram.com/chilis/",
"Sr. Tequila Mexican Grill": "https://www.instagram.com/srtequilamexicangrill/",
"Friar Tuck – British Fish & Chips": "https://www.instagram.com/friartuckfishandchips/",
"Orlando Cat Café": "https://www.instagram.com/orlandocatcafe/",
"I Love NY Pizza – Cagan Crossings": "https://www.instagram.com/ilovenypizza/",

// 38 - Reunion
"Traditions at Reunion Resort": "https://www.instagram.com/reunionresort/",
"Eleven at Reunion Resort": "https://www.instagram.com/reunionresort/",
"Clubhouse Grille": "https://www.instagram.com/reunionresort/",
"Dunkin’ – Reunion": "https://www.instagram.com/dunkin/",
"Starbucks – Reunion": "https://www.instagram.com/starbucks/",

// 12 - Vista Cay
"Spoleto Italian Kitchen": "https://www.instagram.com/spoleto_usa/",
"NYPD Pizza Café": "https://www.instagram.com/nypdpizzaorlando/",
"Menchie’s Frozen Yogurt Vista Cay": "https://www.instagram.com/menchiesfroyo/",
"Subway Vista Cay": "https://www.instagram.com/subway/",


};

/** Fallback: gera link de BUSCA do Instagram pelo nome do restaurante. */
const igSearch = (nome: string) =>
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(nome)}`;

export const NOMES_REFEICOES_CAFE: NomeMenu[] = Object.keys(IG_MAP).map((nome) => ({
  nome,
  menuUrl: IG_MAP[nome] ?? igSearch(nome),
})).sort((a, b) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
);
