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

  // 4 - Celebration
  "Columbia Restaurant – Celebration": "https://www.instagram.com/columbiarestaurant/",
  "Celebration Town Tavern": "https://www.instagram.com/celebrationtowntavern/",
  // os próximos caem no fallback se não tiver perfil mapeado

  // 6 - Westgate Lakes (grandes redes)
  "Subway Westgate Lakes": "https://www.instagram.com/subway/",
  // Westgate restaurantes costumam ter perfil do hotel: pode usar fallback

  // 7 - Dr. Phillips
  "Seasons 52": "https://www.instagram.com/seasons52/",
  "Christini's Ristorante Italiano": "https://www.instagram.com/christinisrestaurant/",
  "The Venetian Chop House": "https://www.instagram.com/thevenetianchophouse/",
  "Tijuana Flats Dr. Phillips": "https://www.instagram.com/tijuanaflats/",
  "Pressed Juice Bar Dr. Phillips": "https://www.instagram.com/pressedjuicery/",

  // 8 - Pointe Orlando (redes)
  "The Oceanaire Seafood Room": "https://www.instagram.com/theoceanaire/",
  "The Pub Orlando": "https://www.instagram.com/thepuborlando/",
  "Johnny Rockets Pointe Orlando": "https://www.instagram.com/johnnyrockets/",
  "Tropical Smoothie Café Pointe": "https://www.instagram.com/tropicalsmoothiecafe/",

  // 9 - Vineland Premium Outlets
  "The Cheesecake Factory Vineland": "https://www.instagram.com/cheesecakefactory/",
  "Benihana Orlando": "https://www.instagram.com/benihanarestaurants/",
  "BJ's Restaurant & Brewhouse Vineland": "https://www.instagram.com/bjsrestaurants/",
  "Panda Express Vineland": "https://www.instagram.com/officialpandaexpress/",
  "Green Leaf's Vineland": "https://www.instagram.com/greenleafsbananas/",

  // 10 - Disney Springs
  "Rainforest Café Disney Springs": "https://www.instagram.com/rainforest_cafe/",
  "Wolfgang Puck Bar & Grill": "https://www.instagram.com/wolfgangpuckbarandgrill/",
  "Earl of Sandwich Disney Springs": "https://www.instagram.com/earlofsandwich/",
  "Joffrey's Coffee Disney Springs": "https://www.instagram.com/joffreyscoffeeandtea/",

  // 12 - Vista Cay (redes)
  "Dunkin’ Vista Cay": "https://www.instagram.com/dunkin/",
  // Yelp/Facebook caem no fallback

  // 14 - Dr. Phillips (Breakfast/Brunch)
  "Keke’s Breakfast Café": "https://www.instagram.com/kekesbreakfastcafe/",
  "Dunkin’ Dr. Phillips": "https://www.instagram.com/dunkin/",

  // 16 - Orlando Airport Area (redes)
  "Another Broken Egg Cafe": "https://www.instagram.com/anotherbrokenegg/",
  "Rock & Brews - Lee Vista": "https://www.instagram.com/rockandbrews/",
  "Bar Louie - Orlando Airport": "https://www.instagram.com/barlouie/",

  // 17 - Downtown Orlando (redes)
  "Hamburger Mary’s Orlando": "https://www.instagram.com/hamburgermarysorlando/",
  "Dunkin’ Downtown Orlando": "https://www.instagram.com/dunkin/",

  // 18 - Hunter's Creek
  "Keke’s Breakfast Café Hunter’s Creek": "https://www.instagram.com/kekesbreakfastcafe/",
  "Metro Diner Hunter’s Creek": "https://www.instagram.com/metrodiner/",
  "Bolay Fresh Bold Kitchen": "https://www.instagram.com/bolay/",
  "Dunkin’ Hunter’s Creek": "https://www.instagram.com/dunkin/",

  // 19 - Windermere (redes)
  "Peach Valley Café": "https://www.instagram.com/peachvalleycafe/",
  "Dunkin’ Windermere": "https://www.instagram.com/dunkin/",

  // 20 - Winter Garden (redes)
  "Dunkin’ Winter Garden": "https://www.instagram.com/dunkin/",
  // as páginas do Facebook caem no fallback

  // 21 - Altamonte Springs
  "First Watch Altamonte": "https://www.instagram.com/firstwatch/",
  "Kobe Japanese Steakhouse": "https://www.instagram.com/kobesteakhouse/",
  "Dunkin’ Altamonte": "https://www.instagram.com/dunkin/",
  "Vitality Bowls Altamonte": "https://www.instagram.com/vitalitybowls/",

  // 22 - Clermont
  "Bob Evans Clermont": "https://www.instagram.com/bobevansfarms/",
  "Taco Bell Clermont": "https://www.instagram.com/tacobell/",
  "Vitality Bowls Clermont": "https://www.instagram.com/vitalitybowls/",

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

  // 26 - Bonnet Creek (redes)
  "Subway Bonnet Creek": "https://www.instagram.com/subway/",
  "Nature’s Table Bonnet Creek": "https://www.instagram.com/naturestable/",

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

  // 30 - Winter Park
  "First Watch Winter Park": "https://www.instagram.com/firstwatch/",
  "Foxtail Coffee Winter Park": "https://www.instagram.com/foxtailcoffee/",
  // Briarpatch/Glass Knife têm perfis; fallback resolve caso mudem @

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
};

/** Fallback: gera link de BUSCA do Instagram pelo nome do restaurante. */
const igSearch = (nome: string) =>
  `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(nome)}`;

export const NOMES_REFEICOES_CAFE: NomeMenu[] = [
  // 1 - International Drive
  { nome: "The Capital Grille", menuUrl: IG_MAP["The Capital Grille"] ?? igSearch("The Capital Grille") },
  { nome: "Maggiano's Little Italy (Pointe Orlando)", menuUrl: IG_MAP["Maggiano's Little Italy (Pointe Orlando)"] ?? igSearch("Maggiano's Little Italy Pointe Orlando") },
  { nome: "Shake Shack – ICON Park", menuUrl: IG_MAP["Shake Shack – ICON Park"] ?? igSearch("Shake Shack ICON Park") },
  { nome: "Nature’s Table (Convention Center)", menuUrl: IG_MAP["Nature’s Table (Convention Center)"] ?? igSearch("Nature's Table Orlando Convention Center") },
  { nome: "Seito Sushi Baldwin Park", menuUrl: IG_MAP["Seito Sushi Baldwin Park"] ?? igSearch("Seito Sushi Baldwin Park") },

  // 2 - Lake Buena Vista (Disney Springs)
  { nome: "The Polite Pig", menuUrl: IG_MAP["The Polite Pig"] ?? igSearch("The Polite Pig Disney Springs") },
  { nome: "T-REX Café", menuUrl: IG_MAP["T-REX Café"] ?? igSearch("T-REX Cafe Disney Springs") },
  { nome: "Earl of Sandwich", menuUrl: IG_MAP["Earl of Sandwich"] ?? igSearch("Earl of Sandwich Disney Springs") },
  { nome: "Blaze Fast-Fire’d Pizza", menuUrl: IG_MAP["Blaze Fast-Fire’d Pizza"] ?? igSearch("Blaze Pizza Disney Springs") },
  { nome: "Joffrey’s Coffee & Tea Company (Disney Springs)", menuUrl: IG_MAP["Joffrey’s Coffee & Tea Company (Disney Springs)"] ?? igSearch("Joffrey's Coffee Disney Springs") },

  // 4 - Celebration
  { nome: "Columbia Restaurant – Celebration", menuUrl: IG_MAP["Columbia Restaurant – Celebration"] ?? igSearch("Columbia Restaurant Celebration") },
  { nome: "Celebration Town Tavern", menuUrl: IG_MAP["Celebration Town Tavern"] ?? igSearch("Celebration Town Tavern") },
  { nome: "Downtown Diner – Celebration", menuUrl: igSearch("Downtown Diner Celebration") },
  { nome: "Upper Crust Pizza", menuUrl: igSearch("Upper Crust Pizza Celebration") },
  { nome: "Sweet Escape – Celebration", menuUrl: igSearch("Sweet Escape Celebration") },

  // 5 - Kissimmee Gateway
  { nome: "Savion's Place", menuUrl: igSearch("Savion's Place Orlando") },
  { nome: "El Tapatio Mexican Restaurant", menuUrl: igSearch("El Tapatio Mexican Restaurant Kissimmee") },
  { nome: "Joanie's Diner", menuUrl: igSearch("Joanie's Diner Kissimmee") },
  { nome: "Panda Express Kissimmee", menuUrl: IG_MAP["Panda Express Vineland"] ?? igSearch("Panda Express Kissimmee") },
  { nome: "Raw Juice Bar Kissimmee", menuUrl: igSearch("Raw Juice Bar Kissimmee") },

  // 6 - Westgate Lakes
  { nome: "Drafts Sports Bar & Grill", menuUrl: igSearch("Drafts Sports Bar & Grill Westgate Orlando") },
  { nome: "Villa Italiano Chophouse", menuUrl: igSearch("Villa Italiano Chophouse Westgate Orlando") },
  { nome: "Sid's Bistro", menuUrl: igSearch("Sid's Bistro Westgate Orlando") },
  { nome: "Subway Westgate Lakes", menuUrl: IG_MAP["Subway Westgate Lakes"] ?? igSearch("Subway Westgate Lakes") },
  { nome: "Juice Bar Westgate", menuUrl: igSearch("Westgate Lakes Juice Bar Orlando") },

  // 7 - Dr. Phillips
  { nome: "Seasons 52", menuUrl: IG_MAP["Seasons 52"] ?? igSearch("Seasons 52 Orlando Dr. Phillips") },
  { nome: "Christini's Ristorante Italiano", menuUrl: IG_MAP["Christini's Ristorante Italiano"] ?? igSearch("Christini's Ristorante Italiano Orlando") },
  { nome: "The Venetian Chop House", menuUrl: IG_MAP["The Venetian Chop House"] ?? igSearch("Venetian Chop House Orlando") },
  { nome: "Tijuana Flats Dr. Phillips", menuUrl: IG_MAP["Tijuana Flats Dr. Phillips"] ?? igSearch("Tijuana Flats Dr. Phillips") },
  { nome: "Pressed Juice Bar Dr. Phillips", menuUrl: IG_MAP["Pressed Juice Bar Dr. Phillips"] ?? igSearch("Pressed Juicery Orlando") },

  // 8 - Pointe Orlando
  { nome: "The Oceanaire Seafood Room", menuUrl: IG_MAP["The Oceanaire Seafood Room"] ?? igSearch("The Oceanaire Orlando") },
  { nome: "Maggiano's Little Italy Pointe", menuUrl: IG_MAP["Maggiano's Little Italy (Pointe Orlando)"] ?? igSearch("Maggiano's Pointe Orlando") },
  { nome: "The Pub Orlando", menuUrl: IG_MAP["The Pub Orlando"] ?? igSearch("The Pub Orlando") },
  { nome: "Johnny Rockets Pointe Orlando", menuUrl: IG_MAP["Johnny Rockets Pointe Orlando"] ?? igSearch("Johnny Rockets Pointe Orlando") },
  { nome: "Tropical Smoothie Café Pointe", menuUrl: IG_MAP["Tropical Smoothie Café Pointe"] ?? igSearch("Tropical Smoothie Cafe Orlando") },

  // 9 - Vineland Premium Outlets
  { nome: "The Cheesecake Factory Vineland", menuUrl: IG_MAP["The Cheesecake Factory Vineland"] ?? igSearch("Cheesecake Factory Orlando Vineland") },
  { nome: "Benihana Orlando", menuUrl: IG_MAP["Benihana Orlando"] ?? igSearch("Benihana Orlando") },
  { nome: "BJ's Restaurant & Brewhouse Vineland", menuUrl: IG_MAP["BJ's Restaurant & Brewhouse Vineland"] ?? igSearch("BJ's Restaurant Vineland Orlando") },
  { nome: "Panda Express Vineland", menuUrl: IG_MAP["Panda Express Vineland"] ?? igSearch("Panda Express Vineland Orlando") },
  { nome: "Green Leaf's Vineland", menuUrl: IG_MAP["Green Leaf's Vineland"] ?? igSearch("Green Leaf's & Bananas Orlando") },

  // 10 - Disney Springs
  { nome: "The Boathouse", menuUrl: igSearch("The Boathouse Disney Springs") },
  { nome: "Rainforest Café Disney Springs", menuUrl: IG_MAP["Rainforest Café Disney Springs"] ?? igSearch("Rainforest Cafe Disney Springs") },
  { nome: "Wolfgang Puck Bar & Grill", menuUrl: IG_MAP["Wolfgang Puck Bar & Grill"] ?? igSearch("Wolfgang Puck Bar & Grill Orlando") },
  { nome: "Earl of Sandwich Disney Springs", menuUrl: IG_MAP["Earl of Sandwich Disney Springs"] ?? igSearch("Earl of Sandwich Disney Springs") },
  { nome: "Joffrey's Coffee Disney Springs", menuUrl: IG_MAP["Joffrey's Coffee Disney Springs"] ?? igSearch("Joffrey's Coffee Disney Springs") },

  // 11 - Westgate Lakes (Brunch)
  { nome: "Westgate Smokehouse Café", menuUrl: igSearch("Westgate Smokehouse Cafe Orlando") },
  { nome: "Villa Italiano Brunch", menuUrl: igSearch("Villa Italiano Chophouse Brunch Orlando") },
  { nome: "Joe’s Brunch Westgate", menuUrl: igSearch("Westgate Lakes Brunch Orlando") },
  { nome: "Dunkin’ Westgate", menuUrl: "https://www.instagram.com/dunkin/" },
  { nome: "Juice Bar Westgate", menuUrl: igSearch("Westgate Lakes Juice Bar Orlando") },

  // 12 - Vista Cay
  { nome: "Vista Cay Diner", menuUrl: igSearch("Vista Cay Diner Orlando") },
  { nome: "NYPD Pizza Café", menuUrl: igSearch("NYPD Pizza Orlando") },
  { nome: "Sunset Brunch House", menuUrl: igSearch("Sunset Brunch House Orlando") },
  { nome: "Dunkin’ Vista Cay", menuUrl: IG_MAP["Dunkin’ Vista Cay"] ?? "https://www.instagram.com/dunkin/" },
  { nome: "Healthy Morning Café", menuUrl: igSearch("Healthy Morning Cafe Orlando") },

  // 14 - Dr. Phillips (Breakfast/Brunch spots)
  { nome: "Keke’s Breakfast Café", menuUrl: IG_MAP["Keke’s Breakfast Café"] ?? igSearch("Keke's Breakfast Cafe Orlando") },
  { nome: "Toothsome Brunch Lab", menuUrl: igSearch("Toothsome Chocolate Emporium Orlando Brunch") },
  { nome: "Cozy Brunch Spot", menuUrl: igSearch("Cozy Brunch Spot Orlando") },
  { nome: "Green Fuel Café", menuUrl: igSearch("Green Fuel Cafe Orlando") },
  { nome: "Dunkin’ Dr. Phillips", menuUrl: IG_MAP["Dunkin’ Dr. Phillips"] ?? "https://www.instagram.com/dunkin/" },

  // 16 - Orlando Airport Area
  { nome: "Hemisphere Restaurant (Hyatt Regency Airport)", menuUrl: igSearch("Hemisphere Restaurant Orlando Airport") },
  { nome: "Another Broken Egg Cafe", menuUrl: IG_MAP["Another Broken Egg Cafe"] ?? igSearch("Another Broken Egg Cafe Orlando") },
  { nome: "Rock & Brews - Lee Vista", menuUrl: IG_MAP["Rock & Brews - Lee Vista"] ?? igSearch("Rock & Brews Lee Vista Orlando") },
  { nome: "Bar Louie - Orlando Airport", menuUrl: IG_MAP["Bar Louie - Orlando Airport"] ?? igSearch("Bar Louie Orlando Airport") },

  // 17 - Downtown Orlando
  { nome: "Cindy’s Cuban Café", menuUrl: igSearch("Cindy’s Cuban Café Orlando") },
  { nome: "Hamburger Mary’s Orlando", menuUrl: IG_MAP["Hamburger Mary’s Orlando"] ?? igSearch("Hamburger Mary's Orlando") },
  { nome: "The Stubborn Mule", menuUrl: igSearch("The Stubborn Mule Orlando") },
  { nome: "The Sanctum Café", menuUrl: igSearch("The Sanctum Cafe Orlando") },
  { nome: "Dunkin’ Downtown Orlando", menuUrl: IG_MAP["Dunkin’ Downtown Orlando"] ?? "https://www.instagram.com/dunkin/" },

  // 18 - Hunter's Creek
  { nome: "Keke’s Breakfast Café Hunter’s Creek", menuUrl: IG_MAP["Keke’s Breakfast Café Hunter’s Creek"] ?? igSearch("Keke's Breakfast Cafe Hunter's Creek") },
  { nome: "La Fiesta Mexican Grill", menuUrl: igSearch("La Fiesta Mexican Grill Hunter's Creek") },
  { nome: "Metro Diner Hunter’s Creek", menuUrl: IG_MAP["Metro Diner Hunter’s Creek"] ?? igSearch("Metro Diner Hunter's Creek") },
  { nome: "Bolay Fresh Bold Kitchen", menuUrl: IG_MAP["Bolay Fresh Bold Kitchen"] ?? igSearch("Bolay Hunter's Creek") },
  { nome: "Dunkin’ Hunter’s Creek", menuUrl: IG_MAP["Dunkin’ Hunter’s Creek"] ?? "https://www.instagram.com/dunkin/" },

  // 19 - Windermere
  { nome: "Yellow Dog Eats", menuUrl: igSearch("Yellow Dog Eats Windermere") },
  { nome: "Bella Tuscany Ristorante Italiano", menuUrl: igSearch("Bella Tuscany Ristorante Italiano Windermere") },
  { nome: "Peach Valley Café", menuUrl: IG_MAP["Peach Valley Café"] ?? igSearch("Peach Valley Cafe") },
  { nome: "Greenbeat Windermere", menuUrl: igSearch("Greenbeat Windermere") },
  { nome: "Dunkin’ Windermere", menuUrl: IG_MAP["Dunkin’ Windermere"] ?? "https://www.instagram.com/dunkin/" },

  // 20 - Winter Garden
  { nome: "Winter Garden Café", menuUrl: igSearch("Winter Garden Cafe") },
  { nome: "Crooked Can Brewing Company", menuUrl: igSearch("Crooked Can Brewing Company") },
  { nome: "MoonCricket Grille", menuUrl: igSearch("MoonCricket Grille Winter Garden") },
  { nome: "Plant Street Market – Press’d", menuUrl: igSearch("Plant Street Market Press'd") },
  { nome: "Dunkin’ Winter Garden", menuUrl: IG_MAP["Dunkin’ Winter Garden"] ?? "https://www.instagram.com/dunkin/" },

  // 21 - Altamonte Springs
  { nome: "First Watch Altamonte", menuUrl: IG_MAP["First Watch Altamonte"] ?? igSearch("First Watch Altamonte Springs") },
  { nome: "Kobe Japanese Steakhouse", menuUrl: IG_MAP["Kobe Japanese Steakhouse"] ?? igSearch("Kobe Japanese Steakhouse Orlando") },
  { nome: "Dunkin’ Altamonte", menuUrl: IG_MAP["Dunkin’ Altamonte"] ?? "https://www.instagram.com/dunkin/" },
  { nome: "Vitality Bowls Altamonte", menuUrl: IG_MAP["Vitality Bowls Altamonte"] ?? igSearch("Vitality Bowls Altamonte Springs") },

  // 22 - Clermont
  { nome: "Lilly’s on the Lake", menuUrl: igSearch("Lilly’s on the Lake Clermont") },
  { nome: "The Crooked Spoon Gastropub", menuUrl: igSearch("The Crooked Spoon Gastropub Clermont") },
  { nome: "Bob Evans Clermont", menuUrl: IG_MAP["Bob Evans Clermont"] ?? igSearch("Bob Evans Clermont") },
  { nome: "Taco Bell Clermont", menuUrl: IG_MAP["Taco Bell Clermont"] ?? "https://www.instagram.com/tacobell/" },
  { nome: "Vitality Bowls Clermont", menuUrl: IG_MAP["Vitality Bowls Clermont"] ?? igSearch("Vitality Bowls Clermont") },

  // 23 - Oak Ridge
  { nome: "Applebee’s Oak Ridge", menuUrl: IG_MAP["Applebee’s Oak Ridge"] ?? "https://www.instagram.com/applebees/" },
  { nome: "Café Tu Tu Tango", menuUrl: igSearch("Cafe Tu Tu Tango Orlando") },
  { nome: "Perkins Restaurant & Bakery", menuUrl: IG_MAP["Perkins Restaurant & Bakery"] ?? "https://www.instagram.com/perkinsrestaurant/" },
  { nome: "Pollo Tropical Oak Ridge", menuUrl: IG_MAP["Pollo Tropical Oak Ridge"] ?? "https://www.instagram.com/pollotropical/" },
  { nome: "Smoothie King Oak Ridge", menuUrl: IG_MAP["Smoothie King Oak Ridge"] ?? "https://www.instagram.com/smoothieking/" },

  // 24 - Maingate East
  { nome: "Olive Garden Maingate East", menuUrl: IG_MAP["Olive Garden Maingate East"] ?? "https://www.instagram.com/olivegarden/" },
  { nome: "Pirate’s Dinner Adventure", menuUrl: igSearch("Pirate’s Dinner Adventure Orlando") },
  { nome: "Cracker Barrel Maingate East", menuUrl: IG_MAP["Cracker Barrel Maingate East"] ?? "https://www.instagram.com/crackerbarrel/" },
  { nome: "Taco Bell Maingate East", menuUrl: IG_MAP["Taco Bell Maingate East"] ?? "https://www.instagram.com/tacobell/" },
  { nome: "Nature’s Table Maingate East", menuUrl: IG_MAP["Nature’s Table Maingate East"] ?? "https://www.instagram.com/naturestable/" },

  // 25 - Maingate West
  { nome: "IHOP Maingate West", menuUrl: IG_MAP["IHOP Maingate West"] ?? "https://www.instagram.com/ihop/" },
  { nome: "Ford’s Garage Sunset Walk", menuUrl: igSearch("Ford’s Garage Sunset Walk") },
  { nome: "Bob Evans Maingate West", menuUrl: IG_MAP["Bob Evans Maingate West"] ?? igSearch("Bob Evans Kissimmee") },
  { nome: "McDonald’s Formosa Blvd", menuUrl: IG_MAP["McDonald’s Formosa Blvd"] ?? "https://www.instagram.com/mcdonalds/" },
  { nome: "Freshii Maingate West", menuUrl: IG_MAP["Freshii Maingate West"] ?? "https://www.instagram.com/freshii/" },

  // 26 - Bonnet Creek
  { nome: "Harvest Bistro", menuUrl: igSearch("Harvest Bistro Waldorf Astoria Orlando") },
  { nome: "La Luce at Hilton Bonnet Creek", menuUrl: igSearch("La Luce Orlando") },
  { nome: "Zeta Asia", menuUrl: igSearch("Zeta Asia Waldorf Astoria Orlando") },
  { nome: "Nature’s Table Bonnet Creek", menuUrl: IG_MAP["Nature’s Table Bonnet Creek"] ?? "https://www.instagram.com/naturestable/" },
  { nome: "Subway Bonnet Creek", menuUrl: IG_MAP["Subway Bonnet Creek"] ?? "https://www.instagram.com/subway/" },

  // 27 - Bay Lake
  { nome: "Contempo Café", menuUrl: igSearch("Contempo Cafe Disney") },
  { nome: "Chef Mickey’s", menuUrl: igSearch("Chef Mickey's Disney") },
  { nome: "Steakhouse 71 (ex-The Wave… of American Flavors)", menuUrl: igSearch("Steakhouse 71 Disney Contemporary") },
  { nome: "Bay Lake Fresh Greens", menuUrl: igSearch("Bay Lake Tower dining") },
  { nome: "Gas Station Deli (Bay Lake)", menuUrl: igSearch("Gas Station Deli Orlando") },

  // 28 - Flamingo Crossings
  { nome: "IHOP Flamingo Crossings", menuUrl: IG_MAP["IHOP Flamingo Crossings"] ?? "https://www.instagram.com/ihop/" },
  { nome: "Hash House A Go Go", menuUrl: IG_MAP["Hash House A Go Go"] ?? "https://www.instagram.com/hashhouseagogo/" },
  { nome: "Applebee’s Flamingo Crossings", menuUrl: IG_MAP["Applebee’s Flamingo Crossings"] ?? "https://www.instagram.com/applebees/" },
  { nome: "Tropical Smoothie Café Flamingo", menuUrl: IG_MAP["Tropical Smoothie Café Flamingo"] ?? "https://www.instagram.com/tropicalsmoothiecafe/" },
  { nome: "Dunkin’ Flamingo Crossings", menuUrl: IG_MAP["Dunkin’ Flamingo Crossings"] ?? "https://www.instagram.com/dunkin/" },

  // 29 - MetroWest
  { nome: "Metro Diner", menuUrl: IG_MAP["Metro Diner"] ?? "https://www.instagram.com/metrodiner/" },
  { nome: "Teak Neighborhood Grill", menuUrl: igSearch("Teak Neighborhood Grill Orlando") },
  { nome: "Peach Valley Café MetroWest", menuUrl: IG_MAP["Peach Valley Café"] ?? igSearch("Peach Valley Cafe Orlando") },
  { nome: "Fresh Kitchen MetroWest", menuUrl: IG_MAP["Fresh Kitchen MetroWest"] ?? "https://www.instagram.com/eatfreshkitchen/" },
  { nome: "Dunkin’ MetroWest", menuUrl: IG_MAP["Dunkin’ MetroWest"] ?? "https://www.instagram.com/dunkin/" },

  // 30 - Winter Park
  { nome: "The Briarpatch Restaurant", menuUrl: igSearch("The Briarpatch Restaurant Winter Park") },
  { nome: "The Glass Knife", menuUrl: igSearch("The Glass Knife Winter Park") },
  { nome: "Buttermilk Bakery", menuUrl: igSearch("Buttermilk Bakery Winter Park") },
  { nome: "First Watch Winter Park", menuUrl: IG_MAP["First Watch Winter Park"] ?? "https://www.instagram.com/firstwatch/" },
  { nome: "Foxtail Coffee Winter Park", menuUrl: IG_MAP["Foxtail Coffee Winter Park"] ?? "https://www.instagram.com/foxtailcoffee/" },

  // 31 - Osceola Parkway
  { nome: "First Watch – The Loop", menuUrl: IG_MAP["First Watch – The Loop"] ?? "https://www.instagram.com/firstwatch/" },
  { nome: "Panera Bread – The Loop", menuUrl: IG_MAP["Panera Bread – The Loop"] ?? "https://www.instagram.com/panerabread/" },
  { nome: "Perkins Restaurant & Bakery Osceola", menuUrl: IG_MAP["Perkins Restaurant & Bakery Osceola"] ?? "https://www.instagram.com/perkinsrestaurant/" },
  { nome: "Vitality Bowls – Kissimmee", menuUrl: IG_MAP["Vitality Bowls – Kissimmee"] ?? "https://www.instagram.com/vitalitybowls/" },
  { nome: "Dunkin’ Osceola Parkway", menuUrl: IG_MAP["Dunkin’ Osceola Parkway"] ?? "https://www.instagram.com/dunkin/" },

  // 32 - Millenia Area
  { nome: "Keke's Breakfast Café – Millenia", menuUrl: IG_MAP["Keke's Breakfast Café – Millenia"] ?? "https://www.instagram.com/kekesbreakfastcafe/" },
  { nome: "Earls Kitchen + Bar", menuUrl: IG_MAP["Earls Kitchen + Bar"] ?? "https://www.instagram.com/earlsonly/" },
  { nome: "Brio Italian Grille – Millenia", menuUrl: IG_MAP["Brio Italian Grille – Millenia"] ?? "https://www.instagram.com/brioitaliangrille/" },
  { nome: "The Cheesecake Factory – Millenia", menuUrl: IG_MAP["The Cheesecake Factory – Millenia"] ?? "https://www.instagram.com/cheesecakefactory/" },
  { nome: "Foxtail Coffee – Millenia", menuUrl: IG_MAP["Foxtail Coffee – Millenia"] ?? "https://www.instagram.com/foxtailcoffee/" },

  // 33 - Southchase
  { nome: "Metro Diner Southchase", menuUrl: IG_MAP["Metro Diner Southchase"] ?? "https://www.instagram.com/metrodiner/" },
  { nome: "Chuy’s Tex-Mex Southchase", menuUrl: IG_MAP["Chuy’s Tex-Mex Southchase"] ?? "https://www.instagram.com/chuysrestaurant/" },
  { nome: "Miller’s Ale House Southchase", menuUrl: IG_MAP["Miller’s Ale House Southchase"] ?? "https://www.instagram.com/millers_ale_house/" },
  { nome: "Tropical Smoothie Cafe Southchase", menuUrl: IG_MAP["Tropical Smoothie Cafe Southchase"] ?? "https://www.instagram.com/tropicalsmoothiecafe/" },
  { nome: "Dunkin’ Southchase", menuUrl: IG_MAP["Dunkin’ Southchase"] ?? "https://www.instagram.com/dunkin/" },

  // 34 - Baldwin Park
  { nome: "The Osprey Tavern", menuUrl: IG_MAP["The Osprey Tavern"] ?? igSearch("The Osprey Orlando") },
  { nome: "Seito Sushi Baldwin Park", menuUrl: IG_MAP["Seito Sushi Baldwin Park"] ?? igSearch("Seito Sushi Baldwin Park") },
  { nome: "Gators Dockside Baldwin", menuUrl: IG_MAP["Gators Dockside Baldwin"] ?? "https://www.instagram.com/gatorsdockside/" }, // ✅ corrige o "//"
  { nome: "Green Kitchen Baldwin Park", menuUrl: igSearch("Green Kitchen Baldwin Park Orlando") },
  { nome: "Dunkin’ Baldwin Park", menuUrl: IG_MAP["Dunkin’ Baldwin Park"] ?? "https://www.instagram.com/dunkin/" },

  // 35 - Sand Lake Road Area
  { nome: "The Whiskey", menuUrl: IG_MAP["The Whiskey"] ?? "https://www.instagram.com/thewhiskeyorlando/" },
  { nome: "The Melting Pot Orlando", menuUrl: IG_MAP["The Melting Pot Orlando"] ?? "https://www.instagram.com/themeltingpot/" },
  { nome: "Rocco’s Tacos & Tequila Bar", menuUrl: IG_MAP["Rocco’s Tacos & Tequila Bar"] ?? "https://www.instagram.com/roccostacos/" },
  { nome: "Too Much Sauce", menuUrl: IG_MAP["Too Much Sauce"] ?? "https://www.instagram.com/toomuchsaucefl/" },
  { nome: "Dunkin’ Sand Lake", menuUrl: IG_MAP["Dunkin’ Sand Lake"] ?? "https://www.instagram.com/dunkin/" },

  // 36 - North Kissimmee
  { nome: "Denny’s North Kissimmee", menuUrl: IG_MAP["Denny’s North Kissimmee"] ?? "https://www.instagram.com/dennysdiner/" },
  { nome: "Medieval Times Dinner & Tournament", menuUrl: IG_MAP["Medieval Times Dinner & Tournament"] ?? "https://www.instagram.com/medievaltimes/" },
  { nome: "Cracker Barrel Old Country Store", menuUrl: IG_MAP["Cracker Barrel Old Country Store"] ?? "https://www.instagram.com/crackerbarrel/" },
  { nome: "Nature’s Table Kissimmee", menuUrl: IG_MAP["Nature’s Table Kissimmee"] ?? "https://www.instagram.com/naturestable/" },
  { nome: "Dunkin’ North Kissimmee", menuUrl: IG_MAP["Dunkin’ North Kissimmee"] ?? "https://www.instagram.com/dunkin/" },
].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));
