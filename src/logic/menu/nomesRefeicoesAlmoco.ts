import type { NomeMenu } from "./nomesRefeicoes.shared";
import { normalizeNome } from "./nomesRefeicoes.shared";

/** Gera link de BUSCA no Instagram (fallback seguro). */
const igSearch = (nome: string) =>
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(nome + " Orlando")}`;

/** Mapeia marcas por padrão no nome → perfil oficial no Instagram. */
const BRAND_IG: Array<{ pattern: RegExp; url: string }> = [
  { pattern: /\bthe capital grille\b/i, url: "https://www.instagram.com/thecapitalgrille/" },
  { pattern: /\bfirst watch\b/i, url: "https://www.instagram.com/firstwatch/" },
  { pattern: /\bfive guys\b/i, url: "https://www.instagram.com/fiveguys/" },
  { pattern: /\bgreen kitchen\b/i, url: "https://www.instagram.com/greenkitchenorlando/" },

  { pattern: /\bolive garden\b/i, url: "https://www.instagram.com/olivegarden/" },
  { pattern: /\brainforest\s*caf[eé]\b/i, url: "https://www.instagram.com/rainforest_cafe/" },
  { pattern: /\bcheddar'?s\b/i, url: "https://www.instagram.com/cheddarskitchen/" },
  { pattern: /\bsubway\b/i, url: "https://www.instagram.com/subway/" },
  { pattern: /\bjason'?s deli\b/i, url: "https://www.instagram.com/jasonsdeli/" },

  { pattern: /\blong\s*horn\b/i, url: "https://www.instagram.com/longhornsteaks/" },
  { pattern: /\bmedieval times\b/i, url: "https://www.instagram.com/medievaltimes/" },
  { pattern: /\bcracker barrel\b/i, url: "https://www.instagram.com/crackerbarrel/" },
  { pattern: /\bwendy'?s\b/i, url: "https://www.instagram.com/wendys/" },
  { pattern: /\bnature'?s table\b/i, url: "https://www.instagram.com/naturestable/" },

  { pattern: /\bcolumbia restaurant\b/i, url: "https://www.instagram.com/columbiarestaurant/" },
  { pattern: /\btijuana flats\b/i, url: "https://www.instagram.com/tijuanaflats/" },
  { pattern: /\bvitality bowls\b/i, url: "https://www.instagram.com/vitalitybowls/" },

  { pattern: /\bhouse of blues\b/i, url: "https://www.instagram.com/houseofblues/" },
  { pattern: /\bt-?rex\b/i, url: "https://www.instagram.com/t_rexcafe/" },
  { pattern: /\bd-?luxe burger\b/i, url: "https://www.instagram.com/disneysprings/" }, // perfil do DS
  { pattern: /\bblaze\b.*pizza\b/i, url: "https://www.instagram.com/blazepizza/" },

  { pattern: /\bwestgate\b/i, url: "https://www.instagram.com/westgateresorts/" },
  { pattern: /\bperkins\b/i, url: "https://www.instagram.com/perkinsrestaurant/" },
  { pattern: /\bmc ?donald'?s\b/i, url: "https://www.instagram.com/mcdonalds/" },
  { pattern: /\bfreshii\b/i, url: "https://www.instagram.com/freshii/" },

  { pattern: /\bmiller'?s ale house\b/i, url: "https://www.instagram.com/millers_ale_house/" },
  { pattern: /\bpanera\b/i, url: "https://www.instagram.com/panerabread/" },
  { pattern: /\btaco bell\b/i, url: "https://www.instagram.com/tacobell/" },
  { pattern: /\bbolay\b/i, url: "https://www.instagram.com/bolay/" },

  { pattern: /\bapplebee'?s\b/i, url: "https://www.instagram.com/applebees/" },
  { pattern: /\bflippers\b.*pizz/i, url: "https://www.instagram.com/flipperspizzeria/" },
  { pattern: /\bpopeyes\b/i, url: "https://www.instagram.com/popeyes/" },
  { pattern: /\btropical smooth/i, url: "https://www.instagram.com/tropicalsmoothiecafe/" },

  { pattern: /\b7-?eleven\b/i, url: "https://www.instagram.com/7eleven/" },

  { pattern: /\bihop\b/i, url: "https://www.instagram.com/ihop/" },
  { pattern: /\bburger\s*king\b/i, url: "https://www.instagram.com/burgerking/" },
  { pattern: /\bsmoothie\s*king\b/i, url: "https://www.instagram.com/smoothieking/" },
  { pattern: /\bdomino'?s\b/i, url: "https://www.instagram.com/dominos/" },
  { pattern: /\bfresh kitchen\b/i, url: "https://www.instagram.com/eatfreshkitchen/" },

  { pattern: /\bthe whiskey\b/i, url: "https://www.instagram.com/thewhiskeyorlando/" },
  { pattern: /\bdragonfly\b/i, url: "https://www.instagram.com/dragonflyrestaurants/" },
  { pattern: /\bthe h orlando\b/i, url: "https://www.instagram.com/thehorlando/" },
  { pattern: /\bchili'?s\b/i, url: "https://www.instagram.com/chilis/" },
  { pattern: /\bclean eatz\b/i, url: "https://www.instagram.com/cleaneatz/" },

  { pattern: /\bhyatt regency\b/i, url: "https://www.instagram.com/hyattregencyorlandoairport/" },
  { pattern: /\bhemisphere\b/i, url: "https://www.instagram.com/hemisphereorlando/" },
  { pattern: /\bbar louie\b/i, url: "https://www.instagram.com/barlouie/" },

  { pattern: /\bhamburger mary'?s\b/i, url: "https://www.instagram.com/hamburgermarysorlando/" },
  { pattern: /\bjimmy john'?s\b/i, url: "https://www.instagram.com/jimmyjohns/" },
  { pattern: /\bsanctum\b/i, url: "https://www.instagram.com/thesanctumkitchen/" },

  { pattern: /\bthe porch\b/i, url: "https://www.instagram.com/theporchorlando/" },

  { pattern: /\byellow dog eats\b/i, url: "https://www.instagram.com/yellowdogeats/" },
  { pattern: /\bpeach valley\b/i, url: "https://www.instagram.com/peachvalleycafe/" },
  { pattern: /\bgreenbeat\b/i, url: "https://www.instagram.com/greenbeatlife/" },

  { pattern: /\bcrooked can\b/i, url: "https://www.instagram.com/crookedcan/" },

  { pattern: /\bbahama breeze\b/i, url: "https://www.instagram.com/bahamabreezeislandgrille/" },
  { pattern: /\bchick-?fil-?a\b/i, url: "https://www.instagram.com/chickfila/" },

  { pattern: /\bthe crooked spoon\b/i, url: "https://www.instagram.com/crookedspoonclermont/" },

  { pattern: /\bzeta asia\b/i, url: "https://www.instagram.com/waldorforlando/" }, // perfil do hotel
  { pattern: /\bla luce\b/i, url: "https://www.instagram.com/laluceorlando/" },
  { pattern: /\bwaldorf astoria orlando\b/i, url: "https://www.instagram.com/waldorforlando/" },

  { pattern: /\bdisney springs|disneyworld|chef mickey|contempo caf[eé]|steakhouse 71|bay lake\b/i,
    url: "https://www.instagram.com/disneyparks/" },

  { pattern: /\bhash house a go go\b/i, url: "https://www.instagram.com/hashhouseagogo/" },
  { pattern: /\bapplebee'?s\b/i, url: "https://www.instagram.com/applebees/" },

  { pattern: /\bteak neighborhood grill\b/i, url: "https://www.instagram.com/teakorlando/" },
  { pattern: /\bwonderworks|outta control\b/i, url: "https://www.instagram.com/wonderworksorlando/" },
  { pattern: /\btaco maker\b/i, url: "https://www.instagram.com/tacomaker/" },

  { pattern: /\bravenous pig\b/i, url: "https://www.instagram.com/theravenouspig/" },
  { pattern: /\bbosphorous\b/i, url: "https://www.instagram.com/bosphorous_orlando/" },
  { pattern: /\bhillstone\b/i, url: "https://www.instagram.com/hillstonerestaurant/" },
  { pattern: /\bburgerfi\b/i, url: "https://www.instagram.com/burgerfi/" },
  { pattern: /\bcreate your nature\b/i, url: "https://www.instagram.com/createyournature/" },

  { pattern: /\btexas roadhouse\b/i, url: "https://www.instagram.com/texasroadhouse/" },
  { pattern: /\bplanet hollywood\b/i, url: "https://www.instagram.com/planethollywood/" },

  { pattern: /\bcheesecake factory\b/i, url: "https://www.instagram.com/cheesecakefactory/" },
  { pattern: /\bp\.?f\.?\s*chang'?s\b/i, url: "https://www.instagram.com/pfchangs/" },
  { pattern: /\bbrio italian\b/i, url: "https://www.instagram.com/brioitaliangrille/" },
  { pattern: /\bchipotle\b/i, url: "https://www.instagram.com/chipotlemexicangrill/" },

  { pattern: /\brocco'?s tacos\b/i, url: "https://www.instagram.com/roccostacos/" },
  { pattern: /\bmelting pot\b/i, url: "https://www.instagram.com/themeltingpot/" },
  { pattern: /\bmoe'?s southwest\b/i, url: "https://www.instagram.com/moes/" },
  { pattern: /\btoo much sauce\b/i, url: "https://www.instagram.com/toomuchsaucefl/" },

  { pattern: /\bdenny'?s\b/i, url: "https://www.instagram.com/dennysdiner/" },
  { pattern: /\bbroadway pizza bar\b/i, url: "https://www.instagram.com/broadwaypizzabar/" },
];

/** Resolve o melhor link do Instagram (oficial por marca ou busca). */
function resolveIG(nome: string): string {
  const hit = BRAND_IG.find((b) => b.pattern.test(nome));
  return hit ? hit.url : igSearch(nome);
}

export const NOMES_REFEICOES_ALMOCO: NomeMenu[] = [
  // 1 - International Drive
  { nome: "The Capital Grille", menuUrl: resolveIG("The Capital Grille") },
  { nome: "First Watch Lunch I-Drive", menuUrl: resolveIG("First Watch") },
  { nome: "Five Guys I-Drive Lunch", menuUrl: resolveIG("Five Guys") },
  { nome: "Green Kitchen I-Drive", menuUrl: resolveIG("Green Kitchen Orlando") },

  // 2 - Lake Buena Vista
  { nome: "Olive Garden Lake Buena Vista", menuUrl: resolveIG("Olive Garden") },
  { nome: "Rainforest Cafe Lunch", menuUrl: resolveIG("Rainforest Cafe") },
  { nome: "Cheddar's Scratch Kitchen Lunch", menuUrl: resolveIG("Cheddar's") },
  { nome: "Subway Vineland Lunch", menuUrl: resolveIG("Subway") },
  { nome: "Jason’s Deli Lake Buena Vista", menuUrl: resolveIG("Jason's Deli Lake Buena Vista") },

  // 3 - Kissimmee
  { nome: "LongHorn Steakhouse Kissimmee", menuUrl: resolveIG("LongHorn Steakhouse") },
  { nome: "Medieval Times Lunch", menuUrl: resolveIG("Medieval Times") },
  { nome: "Cracker Barrel Kissimmee", menuUrl: resolveIG("Cracker Barrel") },
  { nome: "Wendy’s Kissimmee Lunch", menuUrl: resolveIG("Wendy's") },
  { nome: "Nature’s Table Kissimmee", menuUrl: resolveIG("Nature's Table") },

  // 4 - Celebration
  { nome: "Columbia Restaurant Lunch", menuUrl: resolveIG("Columbia Restaurant Celebration") },
  { nome: "Cafe D’Antonio Celebration", menuUrl: resolveIG("Cafe D’Antonio Celebration") },
  { nome: "Market Street Cafe Lunch", menuUrl: resolveIG("Market Street Cafe Celebration") },
  { nome: "Tijuana Flats Lunch", menuUrl: resolveIG("Tijuana Flats") },
  { nome: "Vitality Bowls Celebration", menuUrl: resolveIG("Vitality Bowls Celebration") },

  // 5 - Disney Springs
  { nome: "House of Blues Lunch", menuUrl: resolveIG("House of Blues Orlando") },
  { nome: "T-Rex Cafe Lunch", menuUrl: resolveIG("T-Rex Cafe") },
  { nome: "D-Luxe Burger Lunch", menuUrl: resolveIG("D-Luxe Burger Disney Springs") },
  { nome: "Earl of Sandwich Lunch", menuUrl: resolveIG("Earl of Sandwich Disney Springs") },
  { nome: "Blaze Pizza Lunch", menuUrl: resolveIG("Blaze Pizza Disney Springs") },

  // 6 - Windsor Hills
  { nome: "Drafts Sports Bar & Grill", menuUrl: resolveIG("Drafts Sports Bar Westgate") },
  { nome: "Minnie’s Cafe Lunch", menuUrl: resolveIG("Minnie's Cafe Disney") },
  { nome: "Perkins Restaurant & Bakery", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "McDonald's Formosa Blvd", menuUrl: resolveIG("McDonald's") },
  { nome: "Freshii Windsor Hills", menuUrl: resolveIG("Freshii") },

  // 7 - ChampionsGate
  { nome: "Miller’s Ale House", menuUrl: resolveIG("Miller's Ale House") },
  { nome: "Blue Coast Asian Grill", menuUrl: resolveIG("Blue Coast Asian Grill") },
  { nome: "Panera Bread ChampionsGate", menuUrl: resolveIG("Panera Bread") },
  { nome: "Taco Bell ChampionsGate", menuUrl: resolveIG("Taco Bell") },
  { nome: "Bolay ChampionsGate", menuUrl: resolveIG("Bolay") },

  // 8 - Four Corners
  { nome: "Applebee’s Four Corners", menuUrl: resolveIG("Applebee's") },
  { nome: "Flippers Pizzeria Lunch", menuUrl: resolveIG("Flippers Pizzeria") },
  { nome: "Perkins Family Restaurant", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "Popeyes Louisiana Kitchen", menuUrl: resolveIG("Popeyes") },
  { nome: "Tropical Smoothie Cafe", menuUrl: resolveIG("Tropical Smoothie Cafe") },

  // 9 - Reunion
  { nome: "Eleven at Reunion Resort", menuUrl: resolveIG("Eleven Reunion Resort") },
  { nome: "Grand Lobby Sushi Bar", menuUrl: resolveIG("Grand Lobby Sushi Bar Reunion") },
  { nome: "Traditions at Nicklaus Clubhouse", menuUrl: resolveIG("Traditions Nicklaus Clubhouse Reunion") },
  { nome: "7-Eleven Lunch", menuUrl: resolveIG("7-Eleven") },
  { nome: "Nature’s Table Reunion", menuUrl: resolveIG("Nature's Table") },

  // 10 - Davenport
  { nome: "Ovation Bistro & Bar", menuUrl: resolveIG("Ovation Bistro & Bar Davenport") },
  { nome: "Giovanni’s Pizza Lunch", menuUrl: resolveIG("Giovanni’s Pizza Davenport") },
  { nome: "IHOP Davenport", menuUrl: resolveIG("IHOP") },
  { nome: "Burger King Davenport", menuUrl: resolveIG("Burger King") },
  { nome: "Smoothie King Davenport", menuUrl: resolveIG("Smoothie King") },

  // 11 - Westgate Lakes
  { nome: "Drafts Sports Bar & Grill", menuUrl: resolveIG("Drafts Sports Bar Westgate") },
  { nome: "Villa Italiano Chophouse", menuUrl: resolveIG("Villa Italiano Chophouse Westgate") },
  { nome: "Cordovano Joe’s Pizza", menuUrl: resolveIG("Cordovano Joe’s Pizza Westgate") },
  { nome: "Subway Westgate", menuUrl: resolveIG("Subway") },
  { nome: "Juice Bar Westgate", menuUrl: resolveIG("Westgate Lakes Juice Bar") },

  // 12 - Vista Cay
  { nome: "Spencer’s for Steaks and Chops", menuUrl: resolveIG("Spencer’s for Steaks and Chops Hilton Orlando") },
  { nome: "NYPD Pizza Vista Cay", menuUrl: resolveIG("NYPD Pizza Orlando") },
  { nome: "The Bistro – Vista Cay", menuUrl: resolveIG("The Bistro Vista Cay") },
  { nome: "Domino’s Pizza", menuUrl: resolveIG("Domino's Pizza") },
  { nome: "Fresh Kitchen Vista Cay", menuUrl: resolveIG("Fresh Kitchen Orlando") },

  // 14 - Dr. Phillips
  { nome: "The Whiskey Orlando", menuUrl: resolveIG("The Whiskey Orlando") },
  { nome: "Dragonfly Robata Grill & Sushi", menuUrl: resolveIG("Dragonfly Orlando") },
  { nome: "The H Orlando", menuUrl: resolveIG("The H Orlando") },
  { nome: "Taco Bell Dr. Phillips", menuUrl: resolveIG("Taco Bell") },
  { nome: "Clean Eatz Dr. Phillips", menuUrl: resolveIG("Clean Eatz") },

  // 16 - Orlando Airport Area
  { nome: "McCoy's Bar & Grill", menuUrl: resolveIG("Hyatt Regency Orlando Airport") },
  { nome: "Hemisphere Restaurant", menuUrl: resolveIG("Hemisphere Orlando") },
  { nome: "Chili's Orlando Airport", menuUrl: resolveIG("Chili's") },
  { nome: "Wendy’s Airport Blvd", menuUrl: resolveIG("Wendy's") },
  { nome: "Nature’s Table Airport Plaza", menuUrl: resolveIG("Nature's Table") },

  // 17 - Downtown Orlando
  { nome: "Hamburger Mary's", menuUrl: resolveIG("Hamburger Mary's Orlando") },
  { nome: "Ceviche Tapas Orlando", menuUrl: resolveIG("Ceviche Tapas Orlando") },
  { nome: "The Stubborn Mule", menuUrl: resolveIG("The Stubborn Mule Orlando") },
  { nome: "Jimmy John’s", menuUrl: resolveIG("Jimmy John's") },
  { nome: "The Sanctum Cafe", menuUrl: resolveIG("The Sanctum Kitchen Orlando") },

  // 18 - Hunter's Creek
  { nome: "The Porch South Orange", menuUrl: resolveIG("The Porch Orlando") },
  { nome: "La Fiesta Mexican Grill", menuUrl: resolveIG("La Fiesta Mexican Grill Hunter's Creek") },
  { nome: "Miller’s Ale House", menuUrl: resolveIG("Miller's Ale House") },
  { nome: "Taco Bell Hunter’s Creek", menuUrl: resolveIG("Taco Bell") },
  { nome: "Bolay Hunter’s Creek", menuUrl: resolveIG("Bolay") },

  // 19 - Windermere
  { nome: "Yellow Dog Eats", menuUrl: resolveIG("Yellow Dog Eats") },
  { nome: "Bella Tuscany", menuUrl: resolveIG("Bella Tuscany Windermere") },
  { nome: "Peach Valley Cafe", menuUrl: resolveIG("Peach Valley Cafe") },
  { nome: "McDonald’s Windermere", menuUrl: resolveIG("McDonald's") },
  { nome: "Greenbeat Windermere", menuUrl: resolveIG("Greenbeat Windermere") },

  // 20 - Winter Garden
  { nome: "MoonCricket Grille", menuUrl: resolveIG("MoonCricket Grille Winter Garden") },
  { nome: "Crooked Can Brewing Company", menuUrl: resolveIG("Crooked Can Brewing Company") },
  { nome: "Urban on Plant Kitchen & Bar", menuUrl: resolveIG("Urban on Plant Kitchen & Bar") },
  { nome: "Taco Bell Winter Garden", menuUrl: resolveIG("Taco Bell") },
  { nome: "Plant Street Market – Press’d", menuUrl: resolveIG("Plant Street Market Press'd") },

  // 21 - Altamonte Springs
  { nome: "Bahama Breeze", menuUrl: resolveIG("Bahama Breeze Altamonte Springs") },
  { nome: "Kobe Japanese Steakhouse", menuUrl: resolveIG("Kobe Japanese Steakhouse") },
  { nome: "Cracker Barrel Old Country Store", menuUrl: resolveIG("Cracker Barrel") },
  { nome: "Chick-fil-A Altamonte", menuUrl: resolveIG("Chick-fil-A") },
  { nome: "Vitality Bowls Altamonte", menuUrl: resolveIG("Vitality Bowls Altamonte") },

  // 22 - Clermont
  { nome: "Chili’s Grill & Bar Clermont", menuUrl: resolveIG("Chili's Clermont") },
  { nome: "The Crooked Spoon Gastropub", menuUrl: resolveIG("The Crooked Spoon Clermont") },
  { nome: "Bob Evans Clermont", menuUrl: resolveIG("Bob Evans") },
  { nome: "Taco Bell Clermont", menuUrl: resolveIG("Taco Bell") },
  { nome: "Vitality Bowls Clermont", menuUrl: resolveIG("Vitality Bowls Clermont") },

  // 23 - Oak Ridge
  { nome: "Applebee’s Grill + Bar", menuUrl: resolveIG("Applebee's") },
  { nome: "Café Tu Tu Tango", menuUrl: resolveIG("Cafe Tu Tu Tango Orlando") },
  { nome: "Perkins Restaurant & Bakery", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "Pollo Tropical Oak Ridge", menuUrl: resolveIG("Pollo Tropical") },
  { nome: "Smoothie King Oak Ridge", menuUrl: resolveIG("Smoothie King") },

  // 24 - Maingate East
  { nome: "Olive Garden Maingate East", menuUrl: resolveIG("Olive Garden") },
  { nome: "Pirate’s Dinner Adventure Lunch", menuUrl: resolveIG("Pirate’s Dinner Adventure Orlando") },
  { nome: "Cracker Barrel Old Country Store", menuUrl: resolveIG("Cracker Barrel") },
  { nome: "Taco Bell Maingate East", menuUrl: resolveIG("Taco Bell") },
  { nome: "Nature’s Table Maingate East", menuUrl: resolveIG("Nature's Table") },

  // 25 - Maingate West
  { nome: "Ford's Garage Sunset Walk", menuUrl: resolveIG("Ford's Garage Sunset Walk") },
  { nome: "Logan’s Roadhouse", menuUrl: resolveIG("Logan's Roadhouse") },
  { nome: "Bob Evans Maingate West", menuUrl: resolveIG("Bob Evans") },
  { nome: "Wendy’s Maingate West", menuUrl: resolveIG("Wendy's") },
  { nome: "Freshii Maingate West", menuUrl: resolveIG("Freshii") },

  // 26 - Bonnet Creek
  { nome: "Zeta Asia at Hilton Bonnet Creek", menuUrl: resolveIG("Zeta Asia Waldorf Astoria Orlando") },
  { nome: "La Luce at Hilton Bonnet Creek", menuUrl: resolveIG("La Luce Orlando") },
  { nome: "Harvest Bistro", menuUrl: resolveIG("Waldorf Astoria Orlando Harvest Bistro") },
  { nome: "Subway Bonnet Creek", menuUrl: resolveIG("Subway") },
  { nome: "Spoon & Sprout Bonnet Creek", menuUrl: resolveIG("Hilton Bonnet Creek dining") },

  // 27 - Bay Lake
  { nome: "Contempo Café", menuUrl: resolveIG("Contempo Cafe Disney") },
  { nome: "Chef Mickey's Lunch", menuUrl: resolveIG("Chef Mickey's Disney") },
  { nome: "Gas Station Deli Bay Lake", menuUrl: resolveIG("Gas Station Deli Orlando") },
  { nome: "Bay Lake Greens & Bowls", menuUrl: resolveIG("Bay Lake dining Disney") },

  // 28 - Flamingo Crossings
  { nome: "Five Guys Flamingo", menuUrl: resolveIG("Five Guys") },
  { nome: "Hash House A Go Go", menuUrl: resolveIG("Hash House A Go Go") },
  { nome: "Applebee's Flamingo", menuUrl: resolveIG("Applebee's") },
  { nome: "Taco Bell Flamingo", menuUrl: resolveIG("Taco Bell") },
  { nome: "Green Fork Café", menuUrl: resolveIG("Green Fork Cafe Orlando") },

  // 29 - MetroWest
  { nome: "Teak Neighborhood Grill", menuUrl: resolveIG("Teak Neighborhood Grill") },
  { nome: "Outta Control Magic Show Lunch", menuUrl: resolveIG("WonderWorks Orlando") },
  { nome: "Metro Diner", menuUrl: resolveIG("Metro Diner") },
  { nome: "Taco Maker MetroWest", menuUrl: resolveIG("Taco Maker Orlando") },
  { nome: "Fresh Kitchen MetroWest", menuUrl: resolveIG("Fresh Kitchen Orlando") },

  // 30 - Winter Park
  { nome: "The Ravenous Pig", menuUrl: resolveIG("The Ravenous Pig") },
  { nome: "Bosphorous Turkish Cuisine", menuUrl: resolveIG("Bosphorous Turkish Cuisine Winter Park") },
  { nome: "Hillstone Restaurant", menuUrl: resolveIG("Hillstone Winter Park") },
  { nome: "BurgerFi Winter Park", menuUrl: resolveIG("BurgerFi") },
  { nome: "Create Your Nature", menuUrl: resolveIG("Create Your Nature Winter Park") },

  // 31 - Osceola Parkway
  { nome: "Texas Roadhouse Osceola", menuUrl: resolveIG("Texas Roadhouse") },
  { nome: "Planet Hollywood Lunch", menuUrl: resolveIG("Planet Hollywood Orlando") },
  { nome: "Perkins Restaurant Osceola", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "Burger King Osceola Parkway", menuUrl: resolveIG("Burger King") },
  { nome: "Tropical Smoothie Café Osceola", menuUrl: resolveIG("Tropical Smoothie Cafe") },

  // 32 - Millenia Area
  { nome: "The Cheesecake Factory Millenia", menuUrl: resolveIG("The Cheesecake Factory Millenia") },
  { nome: "P.F. Chang’s Millenia", menuUrl: resolveIG("P.F. Chang's") },
  { nome: "Brio Italian Grille", menuUrl: resolveIG("Brio Italian Grille") },
  { nome: "Chipotle Millenia", menuUrl: resolveIG("Chipotle Mexican Grill") },
  { nome: "Bolay Millenia", menuUrl: resolveIG("Bolay") },

  // 33 - Southchase
  { nome: "Miller's Ale House Southchase", menuUrl: resolveIG("Miller's Ale House") },
  { nome: "Chuy's Tex-Mex Southchase", menuUrl: resolveIG("Chuy's Restaurant") },
  { nome: "Perkins Restaurant & Bakery", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "Pollo Tropical Southchase", menuUrl: resolveIG("Pollo Tropical") },
  { nome: "Tropical Smoothie Cafe Southchase", menuUrl: resolveIG("Tropical Smoothie Cafe") },

  // 34 - Baldwin Park
  { nome: "Seito Sushi Baldwin", menuUrl: resolveIG("Seito Sushi Baldwin Park") },
  { nome: "The Osprey Tavern", menuUrl: resolveIG("The Osprey Orlando") },
  { nome: "Gators Dockside Baldwin", menuUrl: resolveIG("Gators Dockside Baldwin Park") },
  { nome: "Tijuana Flats Baldwin Park", menuUrl: resolveIG("Tijuana Flats Baldwin Park") },
  { nome: "Green Kitchen Baldwin Park", menuUrl: resolveIG("Green Kitchen Baldwin Park") },

  // 35 - Sand Lake Road Area
  { nome: "Rocco's Tacos and Tequila Bar", menuUrl: resolveIG("Rocco's Tacos Orlando") },
  { nome: "The Melting Pot Orlando", menuUrl: resolveIG("The Melting Pot") },
  { nome: "The Whiskey", menuUrl: resolveIG("The Whiskey Orlando") },
  { nome: "Moe’s Southwest Grill", menuUrl: resolveIG("Moe's Southwest Grill") },
  { nome: "Too Much Sauce", menuUrl: resolveIG("Too Much Sauce Orlando") },

  // 36 - North Kissimmee
  { nome: "Medieval Times Lunch Hall", menuUrl: resolveIG("Medieval Times Orlando") },
  { nome: "Broadway Pizza Bar", menuUrl: resolveIG("Broadway Pizza Bar Kissimmee") },
  { nome: "Denny’s North Kissimmee", menuUrl: resolveIG("Denny's") },
  { nome: "Taco Bell North Kissimmee", menuUrl: resolveIG("Taco Bell") },
  { nome: "Nature’s Table Kissimmee", menuUrl: resolveIG("Nature's Table") },
].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));

export const MENU_LOOKUP_ALMOCO: Map<string, string> = new Map(
  NOMES_REFEICOES_ALMOCO.map((i) => [normalizeNome(i.nome), i.menuUrl])
);

export function getMenuUrlAlmoco(nome: string): string {
  return MENU_LOOKUP_ALMOCO.get(normalizeNome(nome)) || "";
}
