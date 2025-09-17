// ⚠️ Importa apenas do módulo de tipos compartilhados para evitar require cycle.
import type { NomeMenu } from "./nomesRefeicoes.shared";

/**
 * Perfis oficiais (ou de loja/unidade) no Instagram para marcas/grandes redes.
 * Se não houver no mapa, caímos no fallback de busca do Instagram (segue abaixo).
 *
 * IMPORTANTE: As chaves PRECISAM ser únicas. Para unidades repetidas, diferencie pelo bairro/região.
 */
const IG_MAP: Record<string, string> = {
  // 1 - International Drive
  "The Capital Grille": "https://www.instagram.com/thecapitalgrille/",
  "First Watch Lunch I-Drive": "https://www.instagram.com/firstwatch/",
  "Five Guys I-Drive Lunch": "https://www.instagram.com/fiveguys/",
  "Green Kitchen I-Drive": "https://www.instagram.com/greenkitchenorlando/",

  // 2 - Lake Buena Vista
  "Olive Garden Lake Buena Vista": "https://www.instagram.com/olivegarden/",
  "Rainforest Cafe Lunch": "https://www.instagram.com/rainforest_cafe/",
  "Cheddar's Scratch Kitchen Lunch": "https://www.instagram.com/cheddarskitchen/",
  "Subway Vineland Lunch": "https://www.instagram.com/subway/",
  "Jason’s Deli Lake Buena Vista": "https://www.instagram.com/jasonsdeli/",
    
 // 3 - Kissimmee
"LongHorn Steakhouse Kissimmee": "https://www.instagram.com/longhornsteaks/",
"Medieval Times Kissimmee": "https://www.instagram.com/medievaltimes/",
"Cracker Barrel Kissimmee": "https://www.instagram.com/crackerbarrel/",
"Wendy’s Kissimmee": "https://www.instagram.com/wendys/",
"Nature’s Table Kissimmee": "https://www.instagram.com/naturestable/",
 
// 4 - Celebration
  "Columbia Restaurant Lunch": "https://www.instagram.com/columbiarestaurant/",
  "Cafe D’Antonio Celebration": "https://www.instagram.com/explore/search/keyword/",
  "Market Street Cafe Lunch": "https://www.instagram.com/explore/search/keyword/",
  "Tijuana Flats Lunch": "https://www.instagram.com/tijuanaflats/",
  "Vitality Bowls Celebration": "https://www.instagram.com/vitalitybowls/",

  // 5 - Disney Springs
  "House of Blues Lunch": "https://www.instagram.com/houseofblues/",
  "T-Rex Cafe Lunch": "https://www.instagram.com/t_rexcafe/",
  "D-Luxe Burger Lunch": "https://www.instagram.com/disneysprings/",
  "Earl of Sandwich Lunch": "https://www.instagram.com/earlofsandwich/",
  "Blaze Pizza Lunch": "https://www.instagram.com/blazepizza/",

  // 6 - Windsor Hills
  "Drafts Sports Bar & Grill (Windsor Hills)": "https://www.instagram.com/westgateresorts/",
  "Minnie’s Cafe Lunch": "https://www.instagram.com/disneyparks/",
  "Perkins Restaurant & Bakery (Windsor Hills)": "https://www.instagram.com/perkinsrestaurant/",
  "McDonald's Formosa Blvd": "https://www.instagram.com/mcdonalds/",
  "Freshii Windsor Hills": "https://www.instagram.com/freshii/",

  // 7 - ChampionsGate
  "Miller’s Ale House ChampionsGate": "https://www.instagram.com/millers_ale_house/",
  "Blue Coast Asian Grill": "https://www.instagram.com/explore/search/keyword/",
  "Panera Bread ChampionsGate": "https://www.instagram.com/panerabread/",
  "Taco Bell ChampionsGate": "https://www.instagram.com/tacobell/",
  "Bolay ChampionsGate": "https://www.instagram.com/bolay/",

  // 8 - Four Corners
  "Applebee’s Four Corners": "https://www.instagram.com/applebees/",
  "Flippers Pizzeria Lunch": "https://www.instagram.com/flipperspizzeria/",
  "Perkins Family Restaurant": "https://www.instagram.com/perkinsrestaurant/",
  "Popeyes Louisiana Kitchen": "https://www.instagram.com/popeyes/",
  "Tropical Smoothie Cafe": "https://www.instagram.com/tropicalsmoothiecafe/",

    // 9 - Vineland Premium Outlets (Almoço)
  "The Cheesecake Factory Vineland": "https://www.instagram.com/cheesecakefactory/",
  "Benihana Orlando": "https://www.instagram.com/benihana/",
  "BJ's Restaurant & Brewhouse Vineland": "https://www.instagram.com/bjsrestaurants/",
  "Panera Bread Vineland": "https://www.instagram.com/panerabread/",
  "Olive Garden Vineland": "https://www.instagram.com/olivegarden/",



  // 9 - Reunion
  "Eleven at Reunion Resort": "https://www.instagram.com/explore/search/keyword/",
  "Grand Lobby Sushi Bar": "https://www.instagram.com/explore/search/keyword/",
  "Traditions at Nicklaus Clubhouse": "https://www.instagram.com/explore/search/keyword/",
  "7-Eleven Lunch": "https://www.instagram.com/7eleven/",
  "Nature’s Table Reunion": "https://www.instagram.com/naturestable/",

  // 10 - Davenport
  "Ovation Bistro & Bar": "https://www.instagram.com/explore/search/keyword/",
  "Giovanni’s Pizza Lunch": "https://www.instagram.com/explore/search/keyword/",
  "IHOP Davenport": "https://www.instagram.com/ihop/",
  "Burger King Davenport": "https://www.instagram.com/burgerking/",
  "Smoothie King Davenport": "https://www.instagram.com/smoothieking/",

  // 11 - Westgate Lakes
  "Drafts Sports Bar & Grill (Westgate Lakes)": "https://www.instagram.com/westgateresorts/",
  "Villa Italiano Chophouse": "https://www.instagram.com/explore/search/keyword/",
  "Cordovano Joe’s Pizza": "https://www.instagram.com/explore/search/keyword/",
  "Subway Westgate": "https://www.instagram.com/subway/",
  "Juice Bar Westgate": "https://www.instagram.com/westgateresorts/",

  // 12 - Vista Cay
  "Spencer’s for Steaks and Chops": "https://www.instagram.com/explore/search/keyword/",
  "NYPD Pizza Vista Cay": "https://www.instagram.com/explore/search/keyword/",
  "The Bistro – Vista Cay": "https://www.instagram.com/explore/search/keyword/",
  "Domino’s Pizza": "https://www.instagram.com/dominos/",
  "Fresh Kitchen Vista Cay": "https://www.instagram.com/eatfreshkitchen/",

  // 14 - Dr. Phillips
  "The Whiskey Orlando": "https://www.instagram.com/thewhiskeyorlando/",
  "Dragonfly Robata Grill & Sushi": "https://www.instagram.com/dragonflyrestaurants/",
  "The H Orlando": "https://www.instagram.com/thehorlando/",
  "Taco Bell Dr. Phillips": "https://www.instagram.com/tacobell/",
  "Clean Eatz Dr. Phillips": "https://www.instagram.com/cleaneatz/",

// 16 - Orlando Airport Area
"Chili’s Grill & Bar – Orlando Airport": "https://www.instagram.com/chilis/",
"Another Broken Egg Cafe": "https://www.instagram.com/anotherbrokenegg/",
"Rock & Brews - Lee Vista": "https://www.instagram.com/rockbrews/",
"Bar Louie - Orlando Airport": "https://www.instagram.com/barlouie/",
"Nature’s Table Airport": "https://www.instagram.com/naturestable/",

// 17 - Downtown Orlando
  "Hamburger Mary's Orlando": "https://www.instagram.com/hamburgermarysorlando/",
  "Cindy’s Cuban Café": "https://www.instagram.com/cindyscafeorlando/",
  "The Stubborn Mule": "https://www.instagram.com/thestubbornmuleorlando/",
  "Planted Kitchen": "https://www.instagram.com/plantedinorlando/",
  "Dunkin’ Downtown Orlando": "https://www.instagram.com/dunkin/",

  // 18 - Hunter's Creek
  "The Porch South Orange": "https://www.instagram.com/theporchorlando/",
  "La Fiesta Mexican Grill": "https://www.instagram.com/explore/search/keyword/",
  "Miller’s Ale House Hunter’s Creek": "https://www.instagram.com/millers_ale_house/",
  "Taco Bell Hunter’s Creek": "https://www.instagram.com/tacobell/",
  "Bolay Hunter’s Creek": "https://www.instagram.com/bolay/",

  // 19 - Windermere
  "Yellow Dog Eats": "https://www.instagram.com/yellowdogeats/",
  "Bella Tuscany": "https://www.instagram.com/explore/search/keyword/",
  "Peach Valley Cafe": "https://www.instagram.com/peachvalleycafe/",
  "McDonald’s Windermere": "https://www.instagram.com/mcdonalds/",
  "Greenbeat Windermere": "https://www.instagram.com/greenbeatlife/",

  // 20 - Winter Garden
  "MoonCricket Grille": "https://www.instagram.com/explore/search/keyword/",
  "Crooked Can Brewing Company": "https://www.instagram.com/crookedcan/",
  "Urban on Plant Kitchen & Bar": "https://www.instagram.com/explore/search/keyword/",
  "Taco Bell Winter Garden": "https://www.instagram.com/tacobell/",
  "Plant Street Market – Press’d": "https://www.instagram.com/explore/search/keyword/",

  // 21 - Altamonte Springs
  "Bahama Breeze": "https://www.instagram.com/bahamabreezeislandgrille/",
  "Kobe Japanese Steakhouse": "https://www.instagram.com/kobesteakhouse/",
  "Cracker Barrel Old Country Store": "https://www.instagram.com/crackerbarrel/",
  "Chick-fil-A Altamonte": "https://www.instagram.com/chickfila/",
  "Vitality Bowls Altamonte": "https://www.instagram.com/vitalitybowls/",

  // 22 - Clermont
  "Chili’s Grill & Bar Clermont": "https://www.instagram.com/chilis/",
  "The Crooked Spoon Gastropub": "https://www.instagram.com/crookedspoonclermont/",
  "Bob Evans Clermont": "https://www.instagram.com/bobevansfarms/",
  "Taco Bell Clermont": "https://www.instagram.com/tacobell/",
  "Vitality Bowls Clermont": "https://www.instagram.com/vitalitybowls/",

  // 23 - Oak Ridge
  "Applebee’s Grill + Bar": "https://www.instagram.com/applebees/",
  "Café Tu Tu Tango": "https://www.instagram.com/explore/search/keyword/",
  "Perkins Restaurant & Bakery (Oak Ridge)": "https://www.instagram.com/perkinsrestaurant/",
  "Pollo Tropical Oak Ridge": "https://www.instagram.com/pollotropical/",
  "Smoothie King Oak Ridge": "https://www.instagram.com/smoothieking/",

  // 24 - Maingate East
  "Olive Garden Maingate East": "https://www.instagram.com/olivegarden/",
  "Pirate’s Dinner Adventure Lunch": "https://www.instagram.com/explore/search/keyword/",
  "Cracker Barrel Maingate East": "https://www.instagram.com/crackerbarrel/",
  "Taco Bell Maingate East": "https://www.instagram.com/tacobell/",
  "Nature’s Table Maingate East": "https://www.instagram.com/naturestable/",

  // 25 - Maingate West
  "Ford's Garage Sunset Walk": "https://www.instagram.com/explore/search/keyword/",
  "Logan’s Roadhouse": "https://www.instagram.com/explore/search/keyword/",
  "Bob Evans Maingate West": "https://www.instagram.com/bobevansfarms/",
  "Wendy’s Maingate West": "https://www.instagram.com/wendys/",
  "Freshii Maingate West": "https://www.instagram.com/freshii/",

  // 26 - Bonnet Creek
  "Zeta Asia at Hilton Bonnet Creek": "https://www.instagram.com/waldorforlando/",
  "La Luce at Hilton Bonnet Creek": "https://www.instagram.com/laluceorlando/",
  "Harvest Bistro": "https://www.instagram.com/waldorforlando/",
  "Subway Bonnet Creek": "https://www.instagram.com/subway/",
  "Spoon & Sprout Bonnet Creek": "https://www.instagram.com/explore/search/keyword/",


  // 28 - Flamingo Crossings
  "Five Guys Flamingo": "https://www.instagram.com/fiveguys/",
  "Hash House A Go Go": "https://www.instagram.com/hashhouseagogo/",
  "Applebee's Flamingo": "https://www.instagram.com/applebees/",
  "Taco Bell Flamingo": "https://www.instagram.com/tacobell/",
  "Green Fork Café": "https://www.instagram.com/explore/search/keyword/",

  // 29 - MetroWest
  "Teak Neighborhood Grill": "https://www.instagram.com/teakorlando/",
  "Outta Control Magic Show Lunch": "https://www.instagram.com/wonderworksorlando/",
  "Metro Diner": "https://www.instagram.com/metrodiner/",
  "Taco Maker MetroWest": "https://www.instagram.com/tacomaker/",
  "Fresh Kitchen MetroWest": "https://www.instagram.com/eatfreshkitchen/",

  // 30 - Winter Park
  "The Ravenous Pig": "https://www.instagram.com/theravenouspig/",
  "Bosphorous Turkish Cuisine": "https://www.instagram.com/bosphorous_orlando/",
  "Hillstone Restaurant": "https://www.instagram.com/hillstonerestaurant/",
  "BurgerFi Winter Park": "https://www.instagram.com/burgerfi/",
  "Create Your Nature": "https://www.instagram.com/createyournature/",

  // 31 - Osceola Parkway
  "Texas Roadhouse Osceola": "https://www.instagram.com/texasroadhouse/",
  "Planet Hollywood Lunch": "https://www.instagram.com/planethollywood/",
  "Perkins Restaurant Osceola": "https://www.instagram.com/perkinsrestaurant/",
  "Burger King Osceola Parkway": "https://www.instagram.com/burgerking/",
  "Tropical Smoothie Café Osceola": "https://www.instagram.com/tropicalsmoothiecafe/",

  // 32 - Millenia Area
  "The Cheesecake Factory Millenia": "https://www.instagram.com/cheesecakefactory/",
  "P.F. Chang’s Millenia": "https://www.instagram.com/pfchangs/",
  "Brio Italian Grille": "https://www.instagram.com/brioitaliangrille/",
  "Chipotle Millenia": "https://www.instagram.com/chipotlemexicangrill/",
  "Bolay Millenia": "https://www.instagram.com/bolay/",

  // 33 - Southchase
  "Miller's Ale House Southchase": "https://www.instagram.com/millers_ale_house/",
  "Chuy's Tex-Mex Southchase": "https://www.instagram.com/chuysrestaurant/",
  "Perkins Restaurant & Bakery (Southchase)": "https://www.instagram.com/perkinsrestaurant/",
  "Pollo Tropical Southchase": "https://www.instagram.com/pollotropical/",
  "Tropical Smoothie Cafe Southchase": "https://www.instagram.com/tropicalsmoothiecafe/",

  // 34 - Baldwin Park
  "Seito Sushi Baldwin": "https://www.instagram.com/seitobp/",
  "The Osprey Tavern": "https://www.instagram.com/theospreyorlando/",
  "Gators Dockside Baldwin": "https://www.instagram.com/gatorsdockside/",
  "Tijuana Flats Baldwin Park": "https://www.instagram.com/tijuanaflats/",
  "Green Kitchen Baldwin Park": "https://www.instagram.com/greenkitchenorlando/",

  // 35 - Sand Lake Road Area
  "Rocco's Tacos and Tequila Bar": "https://www.instagram.com/roccostacos/",
  "The Melting Pot Orlando": "https://www.instagram.com/themeltingpot/",
  "The Whiskey": "https://www.instagram.com/thewhiskeyorlando/",
  "Moe’s Southwest Grill": "https://www.instagram.com/moes/",
  "Too Much Sauce": "https://www.instagram.com/toomuchsaucefl/",

  // 36 - North Kissimmee
  "Medieval Times Lunch Hall": "https://www.instagram.com/medievaltimes/",
  "Broadway Pizza Bar": "https://www.instagram.com/broadwaypizzabar/",
  "Denny’s North Kissimmee": "https://www.instagram.com/dennysdiner/",
  "Taco Bell North Kissimmee": "https://www.instagram.com/tacobell/",
  "Nature’s Table North Kissimmee": "https://www.instagram.com/naturestable/",


// 37 - Four Corners
"Chili’s Grill & Bar – Four Corners": "https://www.instagram.com/chilis/",
"Sr. Tequila Mexican Grill": "https://www.instagram.com/srtequilamexicangrill/",
"Friar Tuck – British Fish & Chips": "https://www.instagram.com/friartuckfishnchips/",
"Orlando Cat Café": "https://www.instagram.com/orlandocatcafe/",
"I Love NY Pizza – Cagan Crossings": "https://www.instagram.com/ilovenypizza_clermont/",
// 30 - Winter Park
"The Glass Knife": "https://www.instagram.com/theglassknife/",
"Barnie’s Coffee & Tea Co. – Park Ave": "https://www.instagram.com/barniescoffee/",
"Foxtail Coffee Co. – Winter Park": "https://www.instagram.com/foxtailcoffee/",
"First Watch – Winter Park": "https://www.instagram.com/firstwatch/",
"Keke’s Breakfast Café – Winter Park": "https://www.instagram.com/kekesbreakfastcafe/",


};

/** Fallback: gera link de BUSCA do Instagram pelo nome do restaurante. */
const igSearch = (nome: string) =>
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(nome)}`;

export const NOMES_REFEICOES_ALMOCO: NomeMenu[] = Object.keys(IG_MAP).map((nome) => ({
  nome,
  menuUrl: IG_MAP[nome] || igSearch(nome),
})).sort((a, b) =>
  a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
);
