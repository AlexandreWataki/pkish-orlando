// âš ï¸ Importa apenas do mÃ³dulo de tipos compartilhados para evitar require cycle.
import type { NomeMenu } from "./nomesRefeicoes.shared";

/**
 * Perfis oficiais (ou de loja/unidade) no Instagram para marcas/grandes redes.
 * Se nÃ£o houver no mapa, caÃ­mos no fallback de busca do Instagram (segue abaixo).
 */
const IG_MAP: Record<string, string> = {
  // 1 - International Drive
  "The Capital Grille": "https://www.instagram.com/thecapitalgrille/",
  "Maggiano's Little Italy (Pointe Orlando)": "https://www.instagram.com/maggianoslittleitaly/",
  "Shake Shack â€“ ICON Park": "https://www.instagram.com/shakeshack/",
  "Natureâ€™s Table (Convention Center)": "https://www.instagram.com/naturestable/",
  "Seito Sushi Baldwin Park": "https://www.instagram.com/seitobp/",

  // 2 - Lake Buena Vista (Disney Springs)
  "The Polite Pig": "https://www.instagram.com/thepolitepig/",
  "T-REX CafÃ©": "https://www.instagram.com/t_rexcafe/",
  "Earl of Sandwich": "https://www.instagram.com/earlofsandwich/",
  "Blaze Fast-Fireâ€™d Pizza": "https://www.instagram.com/blazepizza/",
  "Joffreyâ€™s Coffee & Tea Company (Disney Springs)": "https://www.instagram.com/joffreyscoffeeandtea/",


    // 3 - Kissimmee
  "Big John's Rockin' BBQ": "https://www.instagram.com/bigjohnsrockinbbq/",
  "Matador Tacos + Tapas Bar": "https://www.instagram.com/matadorfl/",
  "Woodsby's Cafe": "https://www.instagram.com/woodsbycafe/",
  "The Italian Joint Kissimmee": "https://www.instagram.com/theitalianjointkissimmee/",
  "El Tenampa Mexican Restaurant": "https://www.instagram.com/eltenamparestaurant/",

  // 4 - Celebration
  "Columbia Restaurant â€“ Celebration": "https://www.instagram.com/columbiarestaurant/",
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
  "Tropical Smoothie CafÃ© Pointe": "https://www.instagram.com/tropicalsmoothiecafe/",

  // 9 - Vineland Premium Outlets
  "The Cheesecake Factory Vineland": "https://www.instagram.com/cheesecakefactory/",
  "Benihana Orlando": "https://www.instagram.com/benihana/",
  "BJ's Restaurant & Brewhouse Vineland": "https://www.instagram.com/bjsrestaurants/",
  "Panda Express Vineland": "https://www.instagram.com/officialpandaexpress/",
  "Green Leaf's Vineland": "https://www.instagram.com/greenleafsbgs/",

// 10 - Disney Springs
  "The Boathouse": "https://www.instagram.com/theboathousefla/",
  "Rainforest CafÃ© Disney Springs": "https://www.instagram.com/rainforest_cafe/",
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
  "Dunkinâ€™ Vista Cay": "https://www.instagram.com/dunkin/",

  // 14 - Dr. Phillips (Breakfast/Brunch)
  "Kekeâ€™s Breakfast CafÃ©": "https://www.instagram.com/kekesbreakfastcafe/",
  "Dunkinâ€™ Dr. Phillips": "https://www.instagram.com/dunkin/",

  // 16 - Orlando Airport Area
  "Another Broken Egg Cafe": "https://www.instagram.com/anotherbrokenegg/",
  "Rock & Brews - Lee Vista": "https://www.instagram.com/rockandbrews/",
  "Bar Louie - Orlando Airport": "https://www.instagram.com/barlouie/",

  // 17 - Downtown Orlando
  "Hamburger Maryâ€™s Orlando": "https://www.instagram.com/hamburgermarysorlando/",
  "Dunkinâ€™ Downtown Orlando": "https://www.instagram.com/dunkin/",

  // 18 - Hunter's Creek
  "Kekeâ€™s Breakfast CafÃ© Hunterâ€™s Creek": "https://www.instagram.com/kekesbreakfastcafe/",
  "Metro Diner Hunterâ€™s Creek": "https://www.instagram.com/metrodiner/",
  "Bolay Fresh Bold Kitchen": "https://www.instagram.com/bolay/",
  "Dunkinâ€™ Hunterâ€™s Creek": "https://www.instagram.com/dunkin/",

  // 19 - Windermere
  "Peach Valley CafÃ©": "https://www.instagram.com/peachvalleycafe/",
  "Dunkinâ€™ Windermere": "https://www.instagram.com/dunkin/",

  // 20 - Winter Garden
  "Dunkinâ€™ Winter Garden": "https://www.instagram.com/dunkin/",

  // 21 - Altamonte Springs
  "First Watch Altamonte": "https://www.instagram.com/firstwatch/",
  "Kobe Japanese Steakhouse": "https://www.instagram.com/kobesteakhouse/",
  "Dunkinâ€™ Altamonte": "https://www.instagram.com/dunkin/",
  "Vitality Bowls Altamonte": "https://www.instagram.com/vitalitybowls/",

// 22 - Clermont
  "Lillyâ€™s on the Lake": "https://www.instagram.com/lillysonthelake/",
  "The Crooked Spoon Gastropub": "https://www.instagram.com/crookedspoonclermont/",
  "Bob Evans Clermont": "https://www.instagram.com/bobevansfarms/",
  "Taco Bell Clermont": "https://www.instagram.com/tacobell/",
  "Vitality Bowls Clermont": "https://www.instagram.com/vitalitybowlsclermont/",

  // 23 - Oak Ridge
  "Applebeeâ€™s Oak Ridge": "https://www.instagram.com/applebees/",
  "Perkins Restaurant & Bakery": "https://www.instagram.com/perkinsrestaurant/",
  "Pollo Tropical Oak Ridge": "https://www.instagram.com/pollotropical/",
  "Smoothie King Oak Ridge": "https://www.instagram.com/smoothieking/",

  // 24 - Maingate East
  "Olive Garden Maingate East": "https://www.instagram.com/olivegarden/",
  "Cracker Barrel Maingate East": "https://www.instagram.com/crackerbarrel/",
  "Taco Bell Maingate East": "https://www.instagram.com/tacobell/",
  "Natureâ€™s Table Maingate East": "https://www.instagram.com/naturestable/",

  // 25 - Maingate West
  "IHOP Maingate West": "https://www.instagram.com/ihop/",
  "McDonaldâ€™s Formosa Blvd": "https://www.instagram.com/mcdonalds/",
  "Freshii Maingate West": "https://www.instagram.com/freshii/",

  // 26 - Bonnet Creek
  "Subway Bonnet Creek": "https://www.instagram.com/subway/",
  "Natureâ€™s Table Bonnet Creek": "https://www.instagram.com/naturestable/",

  // 27 - ChampionsGate
  "First Watch â€“ ChampionsGate": "https://www.instagram.com/firstwatch/",
  "Dulcetto CafÃ© & Gelato": "https://www.instagram.com/dulcettocafeandgelato/",
  "Panera Bread â€“ ChampionsGate": "https://www.instagram.com/panerabread/",
  "Clean Juice â€“ ChampionsGate": "https://www.instagram.com/cleanjuice/",
  "Dunkinâ€™ â€“ ChampionsGate": "https://www.instagram.com/dunkin/",

  
  // 28 - Flamingo Crossings
  "IHOP Flamingo Crossings": "https://www.instagram.com/ihop/",
  "Hash House A Go Go": "https://www.instagram.com/hashhouseagogo/",
  "Applebeeâ€™s Flamingo Crossings": "https://www.instagram.com/applebees/",
  "Tropical Smoothie CafÃ© Flamingo": "https://www.instagram.com/tropicalsmoothiecafe/",
  "Dunkinâ€™ Flamingo Crossings": "https://www.instagram.com/dunkin/",

  // 29 - MetroWest
  "Metro Diner": "https://www.instagram.com/metrodiner/",
  "Fresh Kitchen MetroWest": "https://www.instagram.com/eatfreshkitchen/",
  "Dunkinâ€™ MetroWest": "https://www.instagram.com/dunkin/",

  // 20 - Winter Garden (Instagram)
  "Winter Garden CafÃ©": "https://www.instagram.com/wintergardencafe/",
  "Crooked Can Brewing Company": "https://www.instagram.com/crookedcan/",
  "MoonCricket Grille": "https://www.instagram.com/mooncricketgrille/",
  "Plant Street Market â€“ Pressâ€™d": "https://www.instagram.com/plantstreetmarket/",

  // 31 - Osceola Parkway
  "First Watch â€“ The Loop": "https://www.instagram.com/firstwatch/",
  "Panera Bread â€“ The Loop": "https://www.instagram.com/panerabread/",
  "Vitality Bowls â€“ Kissimmee": "https://www.instagram.com/vitalitybowls/",
  "Dunkinâ€™ Osceola Parkway": "https://www.instagram.com/dunkin/",

  // 32 - Millenia Area
  "Keke's Breakfast CafÃ© â€“ Millenia": "https://www.instagram.com/kekesbreakfastcafe/",
  "Earls Kitchen + Bar": "https://www.instagram.com/earlsonly/",
  "Brio Italian Grille â€“ Millenia": "https://www.instagram.com/brioitaliangrille/",
  "The Cheesecake Factory â€“ Millenia": "https://www.instagram.com/cheesecakefactory/",
  "Foxtail Coffee â€“ Millenia": "https://www.instagram.com/foxtailcoffee/",

  // 33 - Southchase
  "Metro Diner Southchase": "https://www.instagram.com/metrodiner/",
  "Chuyâ€™s Tex-Mex Southchase": "https://www.instagram.com/chuysrestaurant/",
  "Millerâ€™s Ale House Southchase": "https://www.instagram.com/millers_ale_house/",
  "Tropical Smoothie Cafe Southchase": "https://www.instagram.com/tropicalsmoothiecafe/",
  "Dunkinâ€™ Southchase": "https://www.instagram.com/dunkin/",

  // 34 - Baldwin Park
  "The Osprey Tavern": "https://www.instagram.com/theospreyorlando/",
  "Gators Dockside Baldwin": "https://www.instagram.com/gatorsdockside/",
  "Dunkinâ€™ Baldwin Park": "https://www.instagram.com/dunkin/",

  // 35 - Sand Lake Road Area
  "The Whiskey": "https://www.instagram.com/thewhiskeyorlando/",
  "The Melting Pot Orlando": "https://www.instagram.com/themeltingpot/",
  "Roccoâ€™s Tacos & Tequila Bar": "https://www.instagram.com/roccostacos/",
  "Too Much Sauce": "https://www.instagram.com/toomuchsaucefl/",

  // 36 - North Kissimmee
  "Dennyâ€™s North Kissimmee": "https://www.instagram.com/dennysdiner/",
  "Medieval Times Dinner & Tournament": "https://www.instagram.com/medievaltimes/",
  "Cracker Barrel Old Country Store": "https://www.instagram.com/crackerbarrel/",
  "Natureâ€™s Table Kissimmee": "https://www.instagram.com/naturestable/",
  "Dunkinâ€™ North Kissimmee": "https://www.instagram.com/dunkin/",

  // 37 - Four Corners
"Chiliâ€™s Grill & Bar â€“ Four Corners": "https://www.instagram.com/chilis/",
"Sr. Tequila Mexican Grill": "https://www.instagram.com/srtequilamexicangrill/",
"Friar Tuck â€“ British Fish & Chips": "https://www.instagram.com/friartuckfishandchips/",
"Orlando Cat CafÃ©": "https://www.instagram.com/orlandocatcafe/",
"I Love NY Pizza â€“ Cagan Crossings": "https://www.instagram.com/ilovenypizza/",

// 38 - Reunion
"Traditions at Reunion Resort": "https://www.instagram.com/reunionresort/",
"Eleven at Reunion Resort": "https://www.instagram.com/reunionresort/",
"Clubhouse Grille": "https://www.instagram.com/reunionresort/",
"Dunkinâ€™ â€“ Reunion": "https://www.instagram.com/dunkin/",
"Starbucks â€“ Reunion": "https://www.instagram.com/starbucks/",

// 12 - Vista Cay
"Spoleto Italian Kitchen": "https://www.instagram.com/spoleto_usa/",
"NYPD Pizza CafÃ©": "https://www.instagram.com/nypdpizzaorlando/",
"Menchieâ€™s Frozen Yogurt Vista Cay": "https://www.instagram.com/menchiesfroyo/",
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
