import type { NomeMenu } from "./nomesRefeicoes.shared";
import { normalizeNome } from "./nomesRefeicoes.shared";

/** Fallback seguro: busca no Instagram pelo nome (com “Orlando” p/ refinar). */
const igSearch = (nome: string) =>
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(nome + " Orlando")}`;

/** Principais marcas → perfil oficial no Instagram (regex por robustez). */
const BRAND_IG: Array<{ pattern: RegExp; url: string }> = [
  { pattern: /\bthe capital grille\b/i, url: "https://www.instagram.com/thecapitalgrille/" },
  { pattern: /\btoothsome|emporium\b/i, url: "https://www.instagram.com/universalorlando/" }, // CityWalk
  { pattern: /\bolive garden\b/i, url: "https://www.instagram.com/olivegarden/" },
  { pattern: /\bgreen fork\b/i, url: "https://www.instagram.com/greenforkorlando/" },
  { pattern: /\bdenny'?s\b/i, url: "https://www.instagram.com/dennysdiner/" },

  { pattern: /\bchevys\b/i, url: "https://www.instagram.com/chevysfreshmex/" },
  { pattern: /\brainforest\s*caf[eé]\b/i, url: "https://www.instagram.com/rainforest_cafe/" },
  { pattern: /\bpolite pig\b/i, url: "https://www.instagram.com/thepolitepig/" },
  { pattern: /\bfirst watch\b/i, url: "https://www.instagram.com/firstwatch/" },
  { pattern: /\bmiller'?s ale house\b/i, url: "https://www.instagram.com/millers_ale_house/" },

  { pattern: /\blogan'?s roadhouse\b/i, url: "https://www.instagram.com/logansroadhouse/" },
  { pattern: /\bmedieval times\b/i, url: "https://www.instagram.com/medievaltimes/" },
  { pattern: /\bcracker barrel\b/i, url: "https://www.instagram.com/crackerbarrel/" },
  { pattern: /\bwendy'?s\b/i, url: "https://www.instagram.com/wendys/" },

  { pattern: /\bcolumbia restaurant\b/i, url: "https://www.instagram.com/columbiarestaurant/" },
  { pattern: /\bcelebration town tavern\b/i, url: "https://www.instagram.com/celebrationtowntavern/" },
  { pattern: /\bvitality bowls\b/i, url: "https://www.instagram.com/vitalitybowls/" },

  { pattern: /\bthe boathouse\b/i, url: "https://www.instagram.com/disneysprings/" }, // perfil do DS
  { pattern: /\bhomecomin\b/i, url: "https://www.instagram.com/disneysprings/" },
  { pattern: /\bblaze\b.*pizza\b/i, url: "https://www.instagram.com/blazepizza/" },
  { pattern: /\bearl of sandwich\b/i, url: "https://www.instagram.com/earlofsandwich/" },

  { pattern: /\boutback\b/i, url: "https://www.instagram.com/outback/" },
  { pattern: /\bford'?s garage\b/i, url: "https://www.instagram.com/fordsgarageusa/" },
  { pattern: /\bcarrabba'?s\b/i, url: "https://www.instagram.com/carrabbas/" },
  { pattern: /\bfreshii\b/i, url: "https://www.instagram.com/freshii/" },
  { pattern: /\bihop\b/i, url: "https://www.instagram.com/ihop/" },

  { pattern: /\bchili'?s\b/i, url: "https://www.instagram.com/chilis/" },
  { pattern: /\bomni\b|trevi'?s/i, url: "https://www.instagram.com/omnichampionsgate/" },
  { pattern: /\bbolay\b/i, url: "https://www.instagram.com/bolay/" },
  { pattern: /\bsubway\b/i, url: "https://www.instagram.com/subway/" },

  { pattern: /\btexas roadhouse\b/i, url: "https://www.instagram.com/texasroadhouse/" },
  { pattern: /\bflippers\b.*pizz/i, url: "https://www.instagram.com/flipperspizzeria/" },
  { pattern: /\bbonefish grill\b/i, url: "https://www.instagram.com/bonefishgrill/" },
  { pattern: /\bclean eatz\b/i, url: "https://www.instagram.com/cleaneatz/" },
  { pattern: /\btaco bell\b/i, url: "https://www.instagram.com/tacobell/" },

  { pattern: /\breunion resort\b/i, url: "https://www.instagram.com/reunionresort/" },
  { pattern: /\bburger king\b/i, url: "https://www.instagram.com/burgerking/" },

  { pattern: /\blong\s*horn\b/i, url: "https://www.instagram.com/longhornsteaks/" },
  { pattern: /\bovation bistro\b/i, url: "https://www.instagram.com/ovationbistroandbar/" },
  { pattern: /\bperkins\b/i, url: "https://www.instagram.com/perkinsrestaurant/" },
  { pattern: /\bnature'?s table\b/i, url: "https://www.instagram.com/naturestable/" },
  { pattern: /\blittle caesars\b/i, url: "https://www.instagram.com/littlecaesars/" },

  { pattern: /\bwestgate\b/i, url: "https://www.instagram.com/westgateresorts/" },

  { pattern: /\bnypd pizza\b/i, url: "https://www.instagram.com/nypdpizzeria/" },
  { pattern: /\bbeth'?s burger bar\b/i, url: "https://www.instagram.com/bethsburgerbar/" },

  { pattern: /\bruth'?s chris\b/i, url: "https://www.instagram.com/ruthschris/" },
  { pattern: /\bmelting pot\b/i, url: "https://www.instagram.com/themeltingpot/" },
  { pattern: /\bseasons 52\b/i, url: "https://www.instagram.com/seasons52/" },
  { pattern: /\beat\s*fresh\s*kitchen|fresh kitchen\b/i, url: "https://www.instagram.com/eatfreshkitchen/" },
  { pattern: /\bfirehouse subs\b/i, url: "https://www.instagram.com/firehousesubs/" },

  { pattern: /\bbonefish grill airport|bonefish grill\b/i, url: "https://www.instagram.com/bonefishgrill/" },
  { pattern: /\bmarlow'?s tavern\b/i, url: "https://www.instagram.com/marlowstavern/" },
  { pattern: /\bhyatt regency orlando airport|harvest bistro\b/i, url: "https://www.instagram.com/hyattregencyorlandoairport/" },

  { pattern: /\bboheme|grand bohemian\b/i, url: "https://www.instagram.com/grandbohemianorlando/" },
  { pattern: /\bhamburger mary'?s\b/i, url: "https://www.instagram.com/hamburgermarysorlando/" },
  { pattern: /\bartisan'?s table\b/i, url: "https://www.instagram.com/artisanstableorlando/" },
  { pattern: /\bdandelion\b/i, url: "https://www.instagram.com/dandelioncommunitycafe/" },
  { pattern: /\bgringos locos\b/i, url: "https://www.instagram.com/gringoslocosorlando/" },

  { pattern: /\btijuana flats\b/i, url: "https://www.instagram.com/tijuanaflats/" },
  { pattern: /\bmc ?donald'?s\b/i, url: "https://www.instagram.com/mcdonalds/" },

  { pattern: /\byellow dog eats\b/i, url: "https://www.instagram.com/yellowdogeats/" },
  { pattern: /\bmy french caf[eé]\b/i, url: "https://www.instagram.com/myfrenchcafeorlando/" },
  { pattern: /\bsubway\b/i, url: "https://www.instagram.com/subway/" },

  { pattern: /\burban flats\b/i, url: "https://www.instagram.com/plantstreetmarket/" },
  { pattern: /\bmooncricket\b/i, url: "https://www.instagram.com/mooncricketgrille/" },
  { pattern: /\bwhole enchilada\b/i, url: "https://www.instagram.com/wholeenchiladafl/" },
  { pattern: /\bfive guys\b/i, url: "https://www.instagram.com/fiveguys/" },

  { pattern: /\bkobe japanese\b/i, url: "https://www.instagram.com/kobesteakhouse/" },

  { pattern: /\bguru restaurant\b/i, url: "https://www.instagram.com/gururestaurantclermont/" },
  { pattern: /\bsan jose'?s original\b/i, url: "https://www.instagram.com/sanjoseoriginalmexican/" },
  { pattern: /\bcarrabba'?s\b/i, url: "https://www.instagram.com/carrabbas/" },
  { pattern: /\bplanet smoothie\b/i, url: "https://www.instagram.com/planetsmoothie/" },
  { pattern: /\bzaxby'?s\b/i, url: "https://www.instagram.com/zaxbys/" },

  { pattern: /\bred lobster\b/i, url: "https://www.instagram.com/redlobster/" },
  { pattern: /\bazteca d[’']oro\b/i, url: "https://www.instagram.com/aztecadorofl/" },
  { pattern: /\bgreenbeat\b/i, url: "https://www.instagram.com/greenbeatlife/" },

  { pattern: /\bbull\s*&\s*bear|waldorf|bonnet creek|zeta asia|harvest bistro|la luce\b/i, url: "https://www.instagram.com/waldorforlando/" },

  { pattern: /\bdisney|bay lake|steakhouse 71|be our guest|chef mickey|california grill|cosmic ray/i, url: "https://www.instagram.com/disneyparks/" },

  { pattern: /\bpdq\b/i, url: "https://www.instagram.com/eatpdq/" },
  { pattern: /\bantojitos\b/i, url: "https://www.instagram.com/universalorlando/" },
  { pattern: /\bsalad station\b/i, url: "https://www.instagram.com/thesaladstation/" },
  { pattern: /\blittle caesars\b/i, url: "https://www.instagram.com/littlecaesars/" },

  { pattern: /\bteak neighborhood grill\b/i, url: "https://www.instagram.com/teakorlando/" },
  { pattern: /\bapplebee'?s\b/i, url: "https://www.instagram.com/applebees/" },
  { pattern: /\bbolay\b/i, url: "https://www.instagram.com/bolay/" },

  { pattern: /\bravenous pig\b/i, url: "https://www.instagram.com/theravenouspig/" },
  { pattern: /\bbulla gastrobar\b/i, url: "https://www.instagram.com/bullagastrobar/" },
  { pattern: /\bhillstone\b/i, url: "https://www.instagram.com/hillstonerestaurant/" },
  { pattern: /\bfirst watch\b/i, url: "https://www.instagram.com/firstwatch/" },
  { pattern: /\bburgerfi\b/i, url: "https://www.instagram.com/burgerfi/" },

  { pattern: /\bearls kitchen\b/i, url: "https://www.instagram.com/earlsonly/" },
  { pattern: /\bp\.?f\.?\s*chang'?s\b/i, url: "https://www.instagram.com/pfchangs/" },
  { pattern: /\bcheesecake factory\b/i, url: "https://www.instagram.com/cheesecakefactory/" },
  { pattern: /\bpanera\b/i, url: "https://www.instagram.com/panerabread/" },
  { pattern: /\bchick-?fil-?a\b/i, url: "https://www.instagram.com/chickfila/" },

  { pattern: /\bbahama breeze\b/i, url: "https://www.instagram.com/bahamabreezeislandgrille/" },
  { pattern: /\bcheckers|rally'?s\b/i, url: "https://www.instagram.com/checkersrallys/" },

  { pattern: /\bseito sushi\b/i, url: "https://www.instagram.com/seitobp/" },
  { pattern: /\bgators dockside\b/i, url: "https://www.instagram.com/gatorsdockside/" },
  { pattern: /\bthe osprey\b/i, url: "https://www.instagram.com/theospreyorlando/" },
  { pattern: /\btrue food kitchen\b/i, url: "https://www.instagram.com/truefoodkitchen/" },
];

/** Resolve o melhor link do Instagram (oficial por marca ou busca). */
function resolveIG(nome: string): string {
  const hit = BRAND_IG.find((b) => b.pattern.test(nome));
  return hit ? hit.url : igSearch(nome);
}

export const NOMES_REFEICOES_JANTAR: NomeMenu[] = [
  // 1 - International Drive
  { nome: "The Capital Grille", menuUrl: resolveIG("The Capital Grille") },
  { nome: "Toothsome Chocolate Emporium Dinner", menuUrl: resolveIG("Toothsome Chocolate Emporium") },
  { nome: "Olive Garden I-Drive", menuUrl: resolveIG("Olive Garden") },
  { nome: "Green Fork", menuUrl: resolveIG("Green Fork Orlando") },
  { nome: "Denny’s I-Drive", menuUrl: resolveIG("Denny's") },

  // 2 - Lake Buena Vista
  { nome: "Chevys Fresh Mex", menuUrl: resolveIG("Chevys Fresh Mex") },
  { nome: "Rainforest Cafe", menuUrl: resolveIG("Rainforest Cafe") },
  { nome: "The Polite Pig", menuUrl: resolveIG("The Polite Pig") },
  { nome: "Sweet Tomatoes LBV (FECHADO, SUBSTITUÍDO por First Watch LBV)", menuUrl: resolveIG("First Watch") },
  { nome: "Miller’s Ale House LBV", menuUrl: resolveIG("Miller's Ale House") },

  // 3 - Kissimmee
  { nome: "Logan’s Roadhouse", menuUrl: resolveIG("Logan's Roadhouse") },
  { nome: "Medieval Times Dinner & Tournament", menuUrl: resolveIG("Medieval Times") },
  { nome: "Cracker Barrel Kissimmee", menuUrl: resolveIG("Cracker Barrel") },
  { nome: "Green Leaf Grill", menuUrl: igSearch("Green Leaf Grill Kissimmee") },
  { nome: "Wendy’s Kissimmee", menuUrl: resolveIG("Wendy's") },

  // 4 - Celebration
  { nome: "Columbia Restaurant Celebration", menuUrl: resolveIG("Columbia Restaurant Celebration") },
  { nome: "Bohemian Hotel – Lakeside Bar & Grill", menuUrl: resolveIG("Grand Bohemian Celebration Hotel dining") },
  { nome: "Celebration Town Tavern", menuUrl: resolveIG("Celebration Town Tavern") },
  { nome: "Vitality Bowls Celebration", menuUrl: resolveIG("Vitality Bowls Celebration") },
  { nome: "Upper Crust Pizza", menuUrl: igSearch("Upper Crust Pizza Celebration") },

  // 5 - Disney Springs Area
  { nome: "The Boathouse", menuUrl: resolveIG("The Boathouse Disney Springs") },
  { nome: "Rainforest Café Disney Springs", menuUrl: resolveIG("Rainforest Cafe") },
  { nome: "Chef Art Smith’s Homecomin’", menuUrl: resolveIG("Homecomin' Disney Springs") },
  { nome: "Blaze Fast-Fire’d Pizza", menuUrl: resolveIG("Blaze Pizza Disney Springs") },
  { nome: "Earl of Sandwich", menuUrl: resolveIG("Earl of Sandwich Disney Springs") },

  // 6 - Windsor Hills
  { nome: "Outback Steakhouse Kissimmee", menuUrl: resolveIG("Outback Steakhouse") },
  { nome: "Ford’s Garage Sunset Walk", menuUrl: resolveIG("Ford's Garage") },
  { nome: "Carrabba’s Italian Grill", menuUrl: resolveIG("Carrabba's Italian Grill") },
  { nome: "Freshii Windsor", menuUrl: resolveIG("Freshii") },
  { nome: "IHOP Windsor Hills", menuUrl: resolveIG("IHOP") },

  // 7 - ChampionsGate
  { nome: "Chili’s ChampionsGate", menuUrl: resolveIG("Chili's") },
  { nome: "Trevi’s at Omni Orlando", menuUrl: resolveIG("Omni ChampionsGate Trevi's") },
  { nome: "Miller’s Ale House ChampionsGate", menuUrl: resolveIG("Miller's Ale House") },
  { nome: "Bolay ChampionsGate", menuUrl: resolveIG("Bolay") },
  { nome: "Subway ChampionsGate", menuUrl: resolveIG("Subway") },

  // 8 - Four Corners
  { nome: "Texas Roadhouse Four Corners", menuUrl: resolveIG("Texas Roadhouse") },
  { nome: "Flippers Pizzeria Four Corners", menuUrl: resolveIG("Flippers Pizzeria") },
  { nome: "Bonefish Grill Four Corners", menuUrl: resolveIG("Bonefish Grill") },
  { nome: "Clean Eatz Four Corners", menuUrl: resolveIG("Clean Eatz") },
  { nome: "Taco Bell Four Corners", menuUrl: resolveIG("Taco Bell") },

  // 9 - Reunion
  { nome: "Eleven at Reunion Resort", menuUrl: resolveIG("Reunion Resort Eleven") },
  { nome: "Forte at Reunion Resort", menuUrl: resolveIG("Reunion Resort Forte") },
  { nome: "Reunion Café", menuUrl: resolveIG("Reunion Cafe Davenport") },
  { nome: "Vitality Bowls Reunion", menuUrl: resolveIG("Vitality Bowls Reunion") },
  { nome: "Burger King Reunion", menuUrl: resolveIG("Burger King") },

  // 10 - Davenport
  { nome: "LongHorn Steakhouse Davenport", menuUrl: resolveIG("LongHorn Steakhouse") },
  { nome: "Ovation Bistro & Bar", menuUrl: resolveIG("Ovation Bistro & Bar Davenport") },
  { nome: "Perkins Restaurant & Bakery", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "Nature’s Table Davenport", menuUrl: resolveIG("Nature's Table") },
  { nome: "Little Caesars Davenport", menuUrl: resolveIG("Little Caesars") },

  // 11 - Westgate Lakes
  { nome: "Drafts Sports Bar & Grill", menuUrl: resolveIG("Drafts Sports Bar Westgate") },
  { nome: "Villa Italiano Chophouse", menuUrl: resolveIG("Villa Italiano Chophouse Westgate") },
  { nome: "Sid’s Bistro", menuUrl: resolveIG("Sid's Bistro Westgate") },
  { nome: "The Juice Bar Westgate", menuUrl: resolveIG("Westgate Lakes Juice Bar") },
  { nome: "Cordovano Joe’s Pizza", menuUrl: resolveIG("Cordovano Joe’s Pizza Westgate") },

  // 12 - Vista Cay
  { nome: "NYPD Pizza", menuUrl: resolveIG("NYPD Pizzeria Orlando") },
  { nome: "Mikado Japanese Steakhouse", menuUrl: resolveIG("Mikado Japanese Steakhouse Orlando") },
  { nome: "Beth’s Burger Bar", menuUrl: resolveIG("Beth’s Burger Bar Orlando") },
  { nome: "Freshii Vista Cay", menuUrl: resolveIG("Freshii") },
  { nome: "Subway Vista Cay", menuUrl: resolveIG("Subway") },

  // 14 - Dr. Phillips
  { nome: "Ruth’s Chris Steak House", menuUrl: resolveIG("Ruth’s Chris Steak House") },
  { nome: "The Melting Pot", menuUrl: resolveIG("The Melting Pot") },
  { nome: "Seasons 52", menuUrl: resolveIG("Seasons 52") },
  { nome: "Fresh Kitchen Dr. Phillips", menuUrl: resolveIG("Fresh Kitchen Orlando") },
  { nome: "Firehouse Subs Dr. Phillips", menuUrl: resolveIG("Firehouse Subs") },

  // 16 - Orlando Airport Area
  { nome: "Bonefish Grill Airport", menuUrl: resolveIG("Bonefish Grill") },
  { nome: "Marlow’s Tavern", menuUrl: resolveIG("Marlow’s Tavern") },
  { nome: "LongHorn Steakhouse MCO", menuUrl: resolveIG("LongHorn Steakhouse") },
  { nome: "Harvest Bistro", menuUrl: resolveIG("Hyatt Regency Orlando Airport") },
  { nome: "Chili’s MCO", menuUrl: resolveIG("Chili's") },

  // 17 - Downtown Orlando
  { nome: "The Boheme", menuUrl: resolveIG("Grand Bohemian Orlando Boheme") },
  { nome: "Hamburger Mary’s", menuUrl: resolveIG("Hamburger Mary's Orlando") },
  { nome: "Artisan’s Table", menuUrl: resolveIG("Artisan’s Table Orlando") },
  { nome: "Dandelion Community Café", menuUrl: resolveIG("Dandelion Community Cafe Orlando") },
  { nome: "Gringos Locos", menuUrl: resolveIG("Gringos Locos Orlando") },

  // 18 - Hunter's Creek
  { nome: "Outback Steakhouse Hunter’s Creek", menuUrl: resolveIG("Outback Steakhouse") },
  { nome: "Tijuana Flats Hunter’s Creek", menuUrl: resolveIG("Tijuana Flats") },
  { nome: "Miller’s Ale House Hunter’s Creek", menuUrl: resolveIG("Miller's Ale House") },
  { nome: "Bolay Fresh Bold Kitchen", menuUrl: resolveIG("Bolay") },
  { nome: "McDonald's Hunter’s Creek", menuUrl: resolveIG("McDonald's") },

  // 19 - Windermere
  { nome: "Yellow Dog Eats", menuUrl: resolveIG("Yellow Dog Eats") },
  { nome: "My French Café", menuUrl: resolveIG("My French Café Orlando") },
  { nome: "Bella Tuscany", menuUrl: resolveIG("Bella Tuscany Windermere") },
  { nome: "The Grove Orlando", menuUrl: resolveIG("The Grove Orlando") },
  { nome: "Subway Windermere", menuUrl: resolveIG("Subway") },

  // 20 - Winter Garden
  { nome: "Urban Flats", menuUrl: resolveIG("Urban Flats Winter Garden") },
  { nome: "MoonCricket Grille", menuUrl: resolveIG("MoonCricket Grille Winter Garden") },
  { nome: "The Whole Enchilada", menuUrl: resolveIG("The Whole Enchilada Winter Garden") },
  { nome: "Plant St. Market - Press’d", menuUrl: resolveIG("Plant Street Market Press'd") },
  { nome: "Five Guys Winter Garden", menuUrl: resolveIG("Five Guys") },

  // 21 - Altamonte Springs
  { nome: "Seasons 52", menuUrl: resolveIG("Seasons 52 Altamonte") },
  { nome: "Kobe Japanese Steakhouse", menuUrl: resolveIG("Kobe Japanese Steakhouse") },
  { nome: "Olive Garden Altamonte", menuUrl: resolveIG("Olive Garden") },
  { nome: "Fresh Kitchen Altamonte", menuUrl: resolveIG("Fresh Kitchen Altamonte") },
  { nome: "Tijuana Flats Altamonte", menuUrl: resolveIG("Tijuana Flats Altamonte") },

  // 22 - Clermont
  { nome: "Guru Restaurant Clermont", menuUrl: resolveIG("Guru Restaurant Clermont") },
  { nome: "San Jose's Original Mexican Restaurant", menuUrl: resolveIG("San Jose's Original Mexican Restaurant Clermont") },
  { nome: "Carrabba's Italian Grill Clermont", menuUrl: resolveIG("Carrabba's Italian Grill") },
  { nome: "Planet Smoothie & Bowl", menuUrl: resolveIG("Planet Smoothie Clermont") },
  { nome: "Zaxby's Clermont", menuUrl: resolveIG("Zaxby's") },

  // 23 - Oak Ridge
  { nome: "Red Lobster Oak Ridge", menuUrl: resolveIG("Red Lobster") },
  { nome: "Azteca D’Oro Mexican Restaurant", menuUrl: resolveIG("Azteca D’Oro Orlando") },
  { nome: "Cheddar’s Scratch Kitchen Oak Ridge", menuUrl: resolveIG("Cheddar's Scratch Kitchen") },
  { nome: "Greenbeat Oak Ridge", menuUrl: resolveIG("Greenbeat") },
  { nome: "Taco Bell Oak Ridge", menuUrl: resolveIG("Taco Bell") },

  // 24 - Maingate East
  { nome: "Olive Garden Maingate East", menuUrl: resolveIG("Olive Garden") },
  { nome: "El Tenampa Mexican Restaurant", menuUrl: resolveIG("El Tenampa Kissimmee") },
  { nome: "Perkins Restaurant & Bakery Maingate", menuUrl: resolveIG("Perkins Restaurant") },
  { nome: "Bolay Fresh Bold Kitchen", menuUrl: resolveIG("Bolay") },
  { nome: "McDonald's Maingate East", menuUrl: resolveIG("McDonald's") },

  // 25 - Maingate West
  { nome: "Cracker Barrel Maingate West", menuUrl: resolveIG("Cracker Barrel") },
  { nome: "El Ranchito Mexican Grill", menuUrl: resolveIG("El Ranchito Mexican Grill Kissimmee") },
  { nome: "Giordano’s Maingate", menuUrl: resolveIG("Giordano's Pizza Orlando") },
  { nome: "Panera Bread Maingate", menuUrl: resolveIG("Panera Bread") },
  { nome: "Wendy’s Maingate West", menuUrl: resolveIG("Wendy's") },

  // 26 - Bonnet Creek
  { nome: "Bull & Bear", menuUrl: resolveIG("Bull & Bear Waldorf Astoria Orlando") },
  { nome: "La Luce", menuUrl: resolveIG("La Luce Orlando") },
  { nome: "Harvest Bistro", menuUrl: resolveIG("Harvest Bistro Waldorf Astoria Orlando") },
  { nome: "Zeta Asia", menuUrl: resolveIG("Zeta Asia Waldorf Astoria Orlando") },
  { nome: "Subway Bonnet Creek", menuUrl: resolveIG("Subway") },

  // 27 - Bay Lake
  { nome: "Steakhouse 71", menuUrl: resolveIG("Steakhouse 71 Disney") },
  { nome: "Be Our Guest Restaurant", menuUrl: resolveIG("Be Our Guest Restaurant Disney") },
  { nome: "Chef Mickey's", menuUrl: resolveIG("Chef Mickey's Disney") },
  { nome: "California Grill", menuUrl: resolveIG("California Grill Disney") },
  { nome: "Cosmic Ray's Starlight Café", menuUrl: resolveIG("Cosmic Ray's Starlight Cafe Disney") },

  // 28 - Flamingo Crossings
  { nome: "PDQ Flamingo Crossings", menuUrl: resolveIG("PDQ") },
  { nome: "Antojitos Flamingo Crossings", menuUrl: resolveIG("Antojitos Orlando") },
  { nome: "Five Guys Flamingo", menuUrl: resolveIG("Five Guys") },
  { nome: "The Salad Station", menuUrl: resolveIG("The Salad Station") },
  { nome: "Little Caesars Flamingo", menuUrl: resolveIG("Little Caesars") },

  // 29 - MetroWest
  { nome: "Teak Neighborhood Grill", menuUrl: resolveIG("Teak Neighborhood Grill") },
  { nome: "Chili's MetroWest", menuUrl: resolveIG("Chili's") },
  { nome: "Applebee's MetroWest", menuUrl: resolveIG("Applebee's") },
  { nome: "Bolay MetroWest", menuUrl: resolveIG("Bolay") },
  { nome: "Taco Bell MetroWest", menuUrl: resolveIG("Taco Bell") },

  // 30 - Winter Park
  { nome: "The Ravenous Pig", menuUrl: resolveIG("The Ravenous Pig") },
  { nome: "Bulla Gastrobar", menuUrl: resolveIG("Bulla Gastrobar Winter Park") },
  { nome: "Hillstone Restaurant", menuUrl: resolveIG("Hillstone Winter Park") },
  { nome: "First Watch – Winter Park", menuUrl: resolveIG("First Watch") },
  { nome: "BurgerFi Winter Park", menuUrl: resolveIG("BurgerFi") },

  // 31 - Osceola Parkway
  { nome: "Olive Garden Osceola", menuUrl: resolveIG("Olive Garden") },
  { nome: "T-Rex Cafe", menuUrl: resolveIG("T-Rex Cafe") },
  { nome: "Cheddar’s Scratch Kitchen", menuUrl: resolveIG("Cheddar's Scratch Kitchen") },
  { nome: "Panera Bread – The Loop", menuUrl: resolveIG("Panera Bread") },
  { nome: "Taco Bell Osceola", menuUrl: resolveIG("Taco Bell") },

  // 32 - Millenia Area
  { nome: "Earls Kitchen + Bar", menuUrl: resolveIG("Earls Kitchen + Bar") },
  { nome: "P.F. Chang’s", menuUrl: resolveIG("P.F. Chang's") },
  { nome: "The Cheesecake Factory – Millenia", menuUrl: resolveIG("The Cheesecake Factory Millenia") },
  { nome: "Panera Bread – Millenia Plaza", menuUrl: resolveIG("Panera Bread") },
  { nome: "Chick-fil-A Millenia", menuUrl: resolveIG("Chick-fil-A") },

  // 33 - Southchase
  { nome: "Outback Steakhouse Southchase", menuUrl: resolveIG("Outback Steakhouse") },
  { nome: "Bahama Breeze (Vineland)", menuUrl: resolveIG("Bahama Breeze") },
  { nome: "Red Lobster S OBT", menuUrl: resolveIG("Red Lobster") },
  { nome: "Tropical Smoothie Cafe", menuUrl: resolveIG("Tropical Smoothie Cafe") },
  { nome: "McDonald's Southchase", menuUrl: resolveIG("McDonald's") },

  // 34 - Baldwin Park
  { nome: "The Osprey", menuUrl: resolveIG("The Osprey Orlando") },
  { nome: "Seito Sushi", menuUrl: resolveIG("Seito Sushi Baldwin Park") },
  { nome: "Gators Dockside – Baldwin Park", menuUrl: resolveIG("Gators Dockside Baldwin Park") },
  { nome: "Green Kitchen", menuUrl: resolveIG("Green Kitchen Baldwin Park") },
  { nome: "Subway Baldwin Park", menuUrl: resolveIG("Subway") },

  // 35 - Sand Lake Road Area
  { nome: "Ruth’s Chris Steak House", menuUrl: resolveIG("Ruth’s Chris Steak House") },
  { nome: "Benihana I-Drive", menuUrl: resolveIG("Benihana") },
  { nome: "Seasons 52", menuUrl: resolveIG("Seasons 52") },
  { nome: "True Food Kitchen", menuUrl: resolveIG("True Food Kitchen") },
  { nome: "Wendy’s Sand Lake", menuUrl: resolveIG("Wendy's") },

  // 36 - North Kissimmee
  { nome: "Logan’s Roadhouse", menuUrl: resolveIG("Logan's Roadhouse") },
  { nome: "El Tenampa", menuUrl: resolveIG("El Tenampa Kissimmee") },
  { nome: "Cracker Barrel Old Country Store", menuUrl: resolveIG("Cracker Barrel") },
  { nome: "Vitality Bowls", menuUrl: resolveIG("Vitality Bowls Kissimmee") },
  { nome: "Checkers Drive-In", menuUrl: resolveIG("Checkers Rally's") },
].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));

export const MENU_LOOKUP_JANTAR: Map<string, string> = new Map(
  NOMES_REFEICOES_JANTAR.map((i) => [normalizeNome(i.nome), i.menuUrl])
);

export function getMenuUrlJantar(nome: string): string {
  return MENU_LOOKUP_JANTAR.get(normalizeNome(nome)) || "";
}
