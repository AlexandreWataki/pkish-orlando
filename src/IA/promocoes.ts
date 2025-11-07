import type { Promocao } from "./promocao";

export const PROMOCOES: (Promocao & { sobre?: string; oQueTem?: string[]; imperdivel?: boolean })[] = [
// ============= COMPRAS (atualizado: outlets e lojas baratas com promoções reais) =============

{
  id: 'orlando-intl-premium-outlets',
  titulo: 'Orlando International Premium Outlets – Deals',
  descricao: 'Página oficial de ofertas do maior outlet da International Drive.',
  categoria: 'compras',
  parceiro: 'Simon Premium Outlets',
  link: 'https://www.premiumoutlets.com/outlet/orlando-international/deals',
  sobre: 'O maior outlet de Orlando, com mais de 180 lojas de marcas populares e premium em formato ao ar livre. Frequentemente oferece descontos adicionais e cupons digitais no site.',
  oQueTem: ['Cupons oficiais e ofertas', 'Marcas esportivas e casuais', 'Praça de alimentação ampla'],
  imperdivel: true,
},

{
  id: 'orlando-vineland-premium-outlets',
  titulo: 'Orlando Vineland Premium Outlets – Deals',
  descricao: 'Deals atualizados do outlet mais próximo da Disney.',
  categoria: 'compras',
  parceiro: 'Simon Premium Outlets',
  link: 'https://www.premiumoutlets.com/outlet/orlando-vineland/deals',
  sobre: 'Outlet arborizado e elegante próximo à Disney, com marcas de luxo e esportivas, estacionamento coberto e descontos exclusivos via aplicativo VIP Shopper Club.',
  oQueTem: ['Lojas premium e esportivas', 'Estacionamento coberto', 'Descontos digitais (VIP Club)'],
  imperdivel: true,
},

{
  id: 'the-florida-mall-deals',
  titulo: 'The Florida Mall – Deals & Steals',
  descricao: 'Ofertas e cupons no maior shopping coberto de Orlando.',
  categoria: 'compras',
  parceiro: 'Simon',
  link: 'https://www.simon.com/mall/the-florida-mall/deals',
  sobre: 'Shopping tradicional com mais de 250 lojas, praça de alimentação completa e grandes marcas como Apple, Sephora e Macy’s. Ideal para compras confortáveis em ambiente fechado.',
  oQueTem: ['Lojas âncora e boutiques', 'Restaurantes variados', 'Eventos e promoções sazonais'],
},

{
  id: 'mall-at-millenia-events',
  titulo: 'The Mall at Millenia – Offers & Events',
  descricao: 'Página oficial com promoções e eventos de luxo.',
  categoria: 'compras',
  parceiro: 'Mall at Millenia',
  link: 'https://www.mallatmillenia.com/events/',
  sobre: 'Shopping sofisticado com marcas premium como Louis Vuitton, Chanel, Apple e Tiffany. Ideal para quem busca produtos de alto padrão com atendimento exclusivo.',
  oQueTem: ['Marcas de luxo', 'Estacionamento gratuito', 'Eventos e vitrines sazonais'],
},

{
  id: 'disney-character-warehouse',
  titulo: 'Disney Character Warehouse (Outlet Disney)',
  descricao: 'Excedentes oficiais da Disney com até 70% de desconto.',
  categoria: 'compras',
  parceiro: 'Disney Outlet',
  link: 'https://www.premiumoutlets.com/outlet/orlando-vineland/stores/disney-character-warehouse',
  sobre: 'Loja oficial da Disney com produtos de coleções passadas, roupas, brinquedos e souvenires originais a preços muito reduzidos. Estoque muda constantemente.',
  oQueTem: ['Produtos oficiais Disney', 'Descontos agressivos', 'Roupas e souvenirs originais'],
  imperdivel: true,
},

{
  id: 'ross-dress-for-less',
  titulo: 'Ross Dress for Less – Orlando',
  descricao: 'Lojas de descontos com roupas, malas e calçados até 60% mais baratos.',
  categoria: 'compras',
  parceiro: 'Ross Stores',
  link: 'https://www.rossstores.com/',
  sobre: 'Rede de lojas de ponta de estoque, com preços muito abaixo do varejo. Ideal para comprar roupas de marca, malas, perfumes e itens de casa. As melhores peças chegam no início da semana.',
  oQueTem: ['Moda e calçados com desconto', 'Malas e bolsas', 'Ofertas rotativas diárias'],
  imperdivel: true,
},

{
  id: 'marshalls-orlando',
  titulo: 'Marshalls – Orlando',
  descricao: 'Lojas de departamentos com grandes marcas a preços reduzidos.',
  categoria: 'compras',
  parceiro: 'Marshalls',
  link: 'https://www.marshalls.com/',
  sobre: 'Variedade de roupas, calçados e artigos para casa com descontos médios de 30% a 70% em relação às lojas tradicionais. Ambientes organizados e fácil de achar ofertas.',
  oQueTem: ['Moda e calçados', 'Decoração e utilidades domésticas', 'Descontos permanentes'],
},

{
  id: 'burlington-orlando',
  titulo: 'Burlington – Orlando',
  descricao: 'Rede popular de roupas e acessórios com preços imbatíveis.',
  categoria: 'compras',
  parceiro: 'Burlington Stores',
  link: 'https://www.burlington.com/',
  sobre: 'Oferece roupas, malas, artigos infantis e de decoração com preços até 70% abaixo do varejo. Uma das lojas mais procuradas por brasileiros em busca de economia real.',
  oQueTem: ['Roupas e acessórios', 'Itens para casa e bebê', 'Promoções semanais'],
},

{
  id: 'tj-maxx-orlando',
  titulo: 'TJ Maxx – Orlando',
  descricao: 'Grandes marcas com preços de outlet em lojas de bairro.',
  categoria: 'compras',
  parceiro: 'TJ Maxx',
  link: 'https://tjmaxx.tjx.com/',
  sobre: 'Pertence ao mesmo grupo da Marshalls, oferecendo roupas, bolsas e perfumes de grife com descontos constantes. Boa alternativa para quem quer variedade e qualidade.',
  oQueTem: ['Roupas e perfumes de marca', 'Bolsas e acessórios', 'Descontos contínuos'],
},

{
  id: 'target-orlando-deals',
  titulo: 'Target – Weekly Deals & Coupons',
  descricao: 'Ofertas semanais e cupons digitais em loja de departamento americana.',
  categoria: 'compras',
  parceiro: 'Target',
  link: 'https://www.target.com/c/top-deals/-/N-4xw74',
  sobre: 'Loja popular entre turistas por reunir roupas, eletrônicos, brinquedos, cosméticos e produtos de supermercado. O app Target Circle oferece cupons e cashback em várias compras.',
  oQueTem: ['Cupons digitais', 'Seções variadas', 'Ofertas sazonais no app'],
  imperdivel: true,
},

{
  id: 'walmart-orlando-deals',
  titulo: 'Walmart – Orlando Stores & Specials',
  descricao: 'Supermercado completo com ofertas diárias em eletrônicos, brinquedos e roupas.',
  categoria: 'compras',
  parceiro: 'Walmart',
  link: 'https://www.walmart.com/',
  sobre: 'Rede mais procurada pelos turistas brasileiros. Oferece preços baixos em eletrônicos, roupas infantis, snacks, lembranças e produtos de higiene. As lojas 24h são ideais para compras noturnas.',
  oQueTem: ['Preços baixos garantidos', 'Eletrônicos e brinquedos', 'Aberto até tarde'],
  imperdivel: true,
},

{
  id: 'dd-s-discounts-orlando',
  titulo: 'dd’s Discounts – Orlando',
  descricao: 'Versão mais econômica da Ross, com preços imbatíveis em roupas e acessórios.',
  categoria: 'compras',
  parceiro: 'dd’s Discounts',
  link: 'https://www.ddsdiscounts.com/',
  sobre: 'Pertencente ao grupo Ross, a dd’s Discounts tem preços ainda mais baixos e estoques rotativos. Ideal para quem busca roupas e calçados baratos, principalmente infantis.',
  oQueTem: ['Moda barata', 'Calçados e mochilas', 'Descontos permanentes e semanais'],
},

{
  id: 'five-below-orlando',
  titulo: 'Five Below – Orlando',
  descricao: 'Lojas de desconto com tudo por US$ 5 ou menos (alguns itens até US$ 10).',
  categoria: 'compras',
  parceiro: 'Five Below',
  link: 'https://www.fivebelow.com/',
  sobre: 'Perfeita para lembrancinhas, brinquedos, fones de ouvido e itens criativos a preços fixos baixos. Popular entre turistas e famílias com crianças.',
  oQueTem: ['Itens até US$ 5', 'Presentes e eletrônicos pequenos', 'Decoração e brinquedos'],
},


// ============= PARQUES (10) =============
// (atualizado: apenas páginas oficiais de promoções)

{
  id: 'universal-orlando-deals',
  titulo: 'Universal Orlando – Deals & Specials',
  descricao: 'Ofertas oficiais de ingressos (ex.: compre 2 dias e ganhe +2).',
  categoria: 'parques',
  parceiro: 'Universal Orlando',
  link: 'https://www.universalorlando.com/web/pt/br/ingressos-para-os-parques',
  sobre: 'Dois parques temáticos e um aquático, com combos e promoções frequentes.',
  oQueTem: ['Ofertas multi-dia', 'Pacotes com hotel', 'Promoções sazonais'],
  imperdivel: true,
},

{
  id: 'seaworld-orlando-ofertas',
  titulo: 'SeaWorld Orlando – Offers',
  descricao: 'Página oficial com descontos, combos e passes.',
  categoria: 'parques',
  parceiro: 'SeaWorld Orlando',
  link: 'https://seaworld.com/orlando/Special-Offers/Ofertas-de-Ingresso/',
  sobre: 'Parque marinho com montanhas-russas e eventos sazonais.',
  oQueTem: ['Passes anuais com perks', 'Combos com Aquatica/Discovery Cove', 'Promoções por data'],
},

{
  id: 'discovery-cove-deals',
  titulo: 'Discovery Cove – Tickets & Deals',
  descricao: 'Pacotes all-inclusive com ofertas sazonais.',
  categoria: 'parques',
  parceiro: 'SeaWorld Parks',
  link: 'https://discoverycove.com/orlando/pricing/',
  sobre: 'Experiência de dia inteiro com lagoas, snorkel e interação com animais.',
  oQueTem: ['Refeições incluídas', 'Opção com golfinhos', 'Combos com SeaWorld/Aquatica'],
  imperdivel: true,
},

{
  id: 'aquatica-orlando-ofertas',
  titulo: 'Aquatica Orlando – Offers',
  descricao: 'Descontos e combos oficiais no parque aquático.',
  categoria: 'parques',
  parceiro: 'Aquatica',
  link: 'https://aquatica.com/orlando/tickets/',
  sobre: 'Parque aquático com toboáguas e áreas infantis.',
  oQueTem: ['Ingressos com desconto', 'Cabanas/lockers', 'Combos com SeaWorld'],
},

{
  id: 'fun-spot-orlando-specials',
  titulo: 'Fun Spot America Orlando – Specials',
  descricao: 'Ofertas em passes diários e anuais.',
  categoria: 'parques',
  parceiro: 'Fun Spot',
  link: 'https://fun-spot.com/buy-tickets/?_gl=1*17a3r5m*_gcl_au*MTQ5NTk2Njk2Ni4xNzU4MDk5NTc1*_ga*MzExODkwMDcxLjE3NTg3MzEwOTU.*_ga_RS7PPKHNSR*czE3NjE4MzAyNjAkbzIkZzEkdDE3NjE4MzAyNzIkajQ4JGwwJGgxOTI2MTM3NjM0',
  sobre: 'Parque familiar com karts e atrações radicais.',
  oQueTem: ['Passes ilimitados', 'Promoções por tempo limitado', 'Atrações individuais'],
},

{
  id: 'gatorland-specials',
  titulo: 'Gatorland – Coupons & Specials',
  descricao: 'Cupons oficiais e ofertas para o “Alligator Capital”.',
  categoria: 'parques',
  parceiro: 'Gatorland',
  link: 'https://www.gatorland.com/specials/',
  sobre: 'Parque temático de vida selvagem da Flórida.',
  oQueTem: ['Cupons no site', 'Zip line e experiências', 'Shows e trilhas'],
},

{
  id: 'legoland-florida-deals',
  titulo: 'LEGOLAND Florida – Offers',
  descricao: 'Ofertas de ingressos e pacotes no parque temático.',
  categoria: 'parques',
  parceiro: 'LEGOLAND',
  link: 'https://www.legoland.com/florida/tickets-passes/tickets/',
  sobre: 'Parque focado em famílias com crianças e hotel temático.',
  oQueTem: ['Ingressos com desconto', 'Parque aquático sazonal', 'Pacotes de hospedagem'],
},

{
  id: 'waltdisneyworld-deals',
  titulo: 'Walt Disney World – Ingressos Oficiais e Ofertas',
  descricao: 'Compra oficial de ingressos diretamente no site da Disney, com opções de múltiplos dias e o adicional Park Hopper.',
  categoria: 'parques',
  parceiro: 'Walt Disney World Resort',
  link: 'https://disneyworld.disney.go.com/pt-br/admission/tickets/',
  sobre: 'Inclui acesso aos quatro parques temáticos (Magic Kingdom, EPCOT, Hollywood Studios e Animal Kingdom). O site oficial permite escolher datas, adicionar o Park Hopper para visitar vários parques no mesmo dia e ver promoções sazonais e pacotes com hospedagem Disney Resorts.',
  oQueTem: ['Ingressos 1 a 10 dias', 'Opcionais Park Hopper e Water Park & Sports', 'Pacotes com hotéis Disney', 'Ofertas sazonais e descontos regionais', 'Compra 100% segura no site oficial'],
  imperdivel: true,
},
{
  id: 'waltdisneyworld-waterparks',
  titulo: 'Disney Water Parks – Typhoon Lagoon & Blizzard Beach',
  descricao: 'Ingressos oficiais para os parques aquáticos da Disney em Orlando.',
  categoria: 'parques',
  parceiro: 'Walt Disney World Resort',
  link: 'https://disneyworld.disney.go.com/pt-br/destinations/water-parks/',
  sobre: 'A Disney conta com dois parques aquáticos temáticos: o Typhoon Lagoon, com clima tropical e a maior piscina de ondas da América do Norte, e o Blizzard Beach, inspirado em uma estação de esqui derretida com toboáguas radicais e áreas infantis. Apenas um deles costuma operar por vez, alternando durante o ano.',
  oQueTem: ['Ingressos individuais e combos', 'Acesso via opção Water Park & Sports', 'Lockers e cabanas para aluguel', 'Ofertas e descontos sazonais', 'Compra oficial e segura no site da Disney'],
},

{
  id: 'volcano-bay-deals',
  titulo: 'Universal’s Volcano Bay – Tickets & Offers',
  descricao: 'Compra oficial de ingressos para o parque aquático temático da Universal.',
  categoria: 'parques',
  parceiro: 'Universal Orlando Resort',
  link: 'https://www.universalorlando.com/web/pt/br/ingressos-para-os-parques',
  sobre: 'Parque aquático inspirado em uma ilha tropical com um vulcão central de 60 metros e sistema virtual TapuTapu para filas digitais. Destaques incluem Krakatau Aqua Coaster, Waturi Beach e Honu ika Moana.',
  oQueTem: ['Ingressos 1 e 2 dias', 'Incluso em combos 3 Parks', 'TapuTapu digital sem filas', 'Lockers e cabanas', 'Compra direta no site oficial'],
  imperdivel: true,
},

{
  id: 'island-h2o-deals',
  titulo: 'Island H2O Water Park – Tickets & Passes',
  descricao: 'Parque aquático independente com ingressos diários e passes anuais.',
  categoria: 'parques',
  parceiro: 'Island H2O Live!',
  link: 'https://www.tripster.com/detail/island-h2o-live-kissimmee?gad_source=1&gad_campaignid=23027217803&gbraid=0AAAAADdIp9EILKVvko6ks7hg3F4zS01mw&gclid=Cj0KCQjwmYzIBhC6ARIsAHA3IkQMUA1wyGNVEKTf1Kccs1lIKDdn6cqe7WSdvKhq9aE7ctWQGanxlSgaAhmmEALw_wcB',
  sobre: 'Localizado ao lado do Margaritaville Resort em Kissimmee, o Island H2O combina atrações aquáticas modernas com integração digital via aplicativo, permitindo compartilhar experiências e personalizar músicas nas atrações.',
  oQueTem: ['Ingressos 1 dia', 'Passes anuais', 'Promoções sazonais', 'Lockers e cabanas', 'Eventos noturnos de verão'],
},
{
  id: 'buschgardens-tampa-offers',
  titulo: 'Busch Gardens Tampa Bay – Offers & Tickets',
  descricao: 'Ofertas oficiais e combos com SeaWorld e Aquatica.',
  categoria: 'parques',
  parceiro: 'Busch Gardens Tampa Bay',
  link: 'https://buschgardens.com/tampa/tickets/',
  sobre: 'Parque localizado em Tampa (cerca de 1 h de Orlando), famoso por suas montanhas-russas radicais, zoológico com mais de 200 espécies e shows ao vivo. Parte do grupo SeaWorld Parks, ele pode ser adquirido em combos 2, 3 ou 4 parques com SeaWorld, Aquatica e Adventure Island.',
  oQueTem: ['Ingressos 1 e 2 dias', 'Combos 2–4 parques', 'Passes anuais', 'Eventos sazonais (Howl-O-Scream, Christmas Town)', 'Descontos online oficiais'],
  imperdivel: true,
},
{
  id: 'adventure-island-deals',
  titulo: 'Adventure Island – Tampa Water Park',
  descricao: 'Parque aquático parceiro do Busch Gardens, com descontos combinados.',
  categoria: 'parques',
  parceiro: 'SeaWorld Parks',
  link: 'https://adventureisland.com/limited-time-offers/',
  sobre: 'Localizado em frente ao Busch Gardens Tampa Bay, o Adventure Island oferece toboáguas radicais, piscinas de ondas e áreas de descanso tropicais. A entrada pode ser adquirida separadamente ou em combo com Busch Gardens e SeaWorld.',
  oQueTem: ['Ingressos avulsos', 'Combos com Busch Gardens', 'Lockers e cabanas', 'Promoções sazonais', 'Compra segura no site oficial'],
},
{
  id: 'icon-park-deals',
  titulo: 'ICON Park – Tickets & Attractions',
  descricao: 'Ofertas e ingressos oficiais para o complexo ICON Park, no coração da International Drive.',
  categoria: 'parques',
  parceiro: 'ICON Park Orlando',
  link: 'https://iconparkorlando.com/',
  sobre: 'Complexo de entretenimento na International Drive com mais de 40 atrações, incluindo a The Wheel (roda-gigante de 122 metros), o museu Madame Tussauds, o SEA LIFE Aquarium e dezenas de restaurantes e bares. É possível comprar ingressos individuais ou combos com múltiplas atrações.',
  oQueTem: ['Ingressos avulsos e combos', 'Descontos online', 'Restaurantes e lojas', 'Atrações noturnas', 'Estacionamento gratuito'],
},

{
  id: 'peppa-pig-theme-park',
  titulo: 'Peppa Pig Theme Park Florida – Tickets & Offers',
  descricao: 'Parque temático voltado para crianças pequenas, anexo ao LEGOLAND Florida Resort.',
  categoria: 'parques',
  parceiro: 'LEGOLAND / Merlin Entertainments',
  link: 'https://www.peppapigthemepark.com/florida/tickets-passes/',
  sobre: 'Totalmente dedicado ao universo de Peppa Pig, o parque conta com brinquedos suaves, áreas molhadas, shows e playgrounds interativos. Fica localizado ao lado do LEGOLAND Florida e pode ser visitado com ingresso combinado.',
  oQueTem: ['Ingressos 1 dia', 'Combos com LEGOLAND', 'Zonas molhadas e brinquedos infantis', 'Shows e encontros com personagens', 'Pacotes familiares e acessibilidade total'],
},
{
  id: 'kennedy-space-center-deals',
  titulo: 'Kennedy Space Center – Official Tickets',
  descricao: 'Centro espacial da NASA com ingressos e experiências oficiais.',
  categoria: 'parques',
  parceiro: 'NASA / Delaware North',
  link: 'https://www.kennedyspacecenter.com/info/tickets/',
  sobre: 'Localizado em Cabo Canaveral, a cerca de 1h de Orlando, o Kennedy Space Center oferece simuladores, foguetes reais, o Space Shuttle Atlantis e o novo Gateway Complex. Uma das experiências mais educativas e impressionantes da Flórida.',
  oQueTem: ['Ingressos 1 dia', 'Experiência com astronautas', 'Tours especiais (Launch Pad e Saturn V)', 'Loja e cinema IMAX', 'Compra direta no site oficial'],
  imperdivel: true,
},


// ============= RESTAURANTES BRASILEIROS (atualizado) =============

{
  id: 'camilas-restaurant-orlando',
  titulo: 'Camila’s Restaurant – Orlando',
  descricao: 'Restaurante brasileiro mais tradicional de Orlando, famoso entre turistas do Brasil. Buffet livre com comida caseira e churrasco por preço acessível.',
  categoria: 'restaurantes',
  parceiro: 'Camila’s Restaurant',
  link: 'https://camilasrestaurant.com/',
  sobre: 'Localizado na International Drive, o Camila’s serve buffet livre (US$ 18–25 por pessoa) com pratos típicos brasileiros, arroz, feijão, churrasco, massas, saladas e sobremesas. Ambiente familiar e atendimento em português, é parada obrigatória de brasileiros em Orlando.',
  oQueTem: ['Buffet brasileiro completo', 'Comida caseira e churrasco', 'Ambiente familiar', 'Sobremesas incluídas', 'Atendimento em português'],
  imperdivel: true,
},

{
  id: 'cafe-mineiro-brazilian-steakhouse',
  titulo: 'Café Mineiro Brazilian Steakhouse – Orlando',
  descricao: 'Churrascaria brasileira na International Drive com rodízio completo e buffet variado. Excelente custo-benefício.',
  categoria: 'restaurantes',
  parceiro: 'Café Mineiro Steakhouse',
  link: 'https://cafemineirosteakhouse.us//',
  sobre: 'O Café Mineiro oferece rodízio de carnes por cerca de US$ 34,95 e buffet livre (US$ 19,95 sem churrasco) com pratos típicos, massas, saladas e sobremesas. Atendimento caloroso e ambiente simples, ideal para famílias e grupos que querem boa comida brasileira a preço justo.',
  oQueTem: ['Rodízio de carnes', 'Buffet de saladas e massas', 'Sobremesas brasileiras', 'Ambiente familiar', 'Estacionamento gratuito'],
},

{
  id: 'boteco-do-manolo-orlando',
  titulo: 'Boteco do Manolo – Orlando',
  descricao: 'Restaurante brasileiro moderno com pratos à la carte, feijoada e porções para compartilhar.',
  categoria: 'restaurantes',
  parceiro: 'Boteco do Manolo',
  link: 'https://www.getsauce.com/order/boteco-do-manolo-orlando/menu?fbclid=PAAaas0XPqT45G2g0HDbhUgVZGMmis2JqZ8Xra81qTIxDcQ1AVcH3w53sGOs0',
  sobre: 'Filial da famosa rede brasileira, o Boteco do Manolo oferece pratos à la carte (US$ 20–30), feijoada completa aos sábados e petiscos com chope gelado. Ambiente descontraído e familiar, ideal para jantares e encontros entre amigos.',
  oQueTem: ['Feijoada completa', 'Porções e pratos à la carte', 'Drinks e chope', 'Ambiente moderno', 'Música leve ao vivo em alguns dias'],
},

{
  id: 'adega-gaucha-orlando',
  titulo: 'Adega Gaucha Brazilian Steakhouse – Orlando',
  descricao: 'Churrascaria premium com carnes nobres e serviço refinado próximo à Universal Boulevard.',
  categoria: 'restaurantes',
  parceiro: 'Adega Gaucha',
  link: 'https://adegagaucha.com/',
  sobre: 'Oferece rodízio premium (US$ 59–75 por pessoa) com cortes selecionados como picanha, cordeiro e costela, além de buffet gourmet e carta de vinhos premiada. Ambiente sofisticado e atendimento impecável, ideal para jantares especiais.',
  oQueTem: ['Rodízio premium', 'Buffet gourmet', 'Carta de vinhos extensa', 'Ambiente elegante', 'Atendimento de alto padrão'],
  imperdivel: true,
},

{
  id: 'fogo-de-chao-orlando',
  titulo: 'Fogo de Chão – Orlando (International Drive)',
  descricao: 'Rede brasileira internacional de churrascarias com rodízio de carnes e buffet de saladas.',
  categoria: 'restaurantes',
  parceiro: 'Fogo de Chão',
  link: 'https://fogodechao.com/location/orlando/',
  sobre: 'A unidade da Fogo de Chão em Orlando oferece rodízio completo (US$ 59–69 por pessoa) com carnes nobres, buffet de saladas e sobremesas. Ambiente sofisticado e atendimento profissional, com brunch disponível aos fins de semana.',
  oQueTem: ['Rodízio completo de carnes', 'Buffet de saladas', 'Sobremesas e drinks', 'Brunch aos fins de semana', 'Ambiente elegante'],
},


{
  id: 'texas-de-brazil-orlando',
  titulo: 'Texas de Brazil – Orlando I-Drive',
  descricao: 'Churrascaria brasileira-americana com rodízio e buffet gourmet, muito popular entre turistas.',
  categoria: 'restaurantes',
  parceiro: 'Texas de Brazil',
  link: 'https://texasdebrazil.com/locations/orlando/',
  sobre: 'Mistura o estilo brasileiro de churrasco com a hospitalidade texana. Rodízio completo (US$ 54–65 por pessoa) com carnes ilimitadas e buffet variado. Ideal para famílias e grupos. Oferece descontos para almoço e residentes da Flórida.',
  oQueTem: ['Rodízio completo', 'Buffet gourmet', 'Menu infantil', 'Descontos para almoço', 'Happy Hour no bar'],
},



// ============= HOTÉIS (10) =============

// ============= RESORTS E HOTÉIS EXTRAORDINÁRIOS (Disney, Universal e Orlando) =============

{
  id: 'swan-dolphin-offers',
  titulo: 'Walt Disney World Swan & Dolphin – Offers',
  descricao: 'Tarifas promocionais e pacotes oficiais dentro do complexo Disney.',
  categoria: 'hoteis',
  parceiro: 'Swan & Dolphin',
  link: 'https://swandolphin.com/offers/',
  sobre: 'Localizados entre o EPCOT e o Hollywood Studios, os hotéis Swan & Dolphin oferecem hospedagem de alto padrão operada pela Marriott, com transporte gratuito aos parques Disney, restaurantes premiados e acesso antecipado aos parques.',
  oQueTem: ['Localização privilegiada dentro do complexo Disney', 'Restaurantes renomados e spa', 'Ofertas diretas e pacotes oficiais'],
},

{
  id: 'four-seasons-orlando-offers',
  titulo: 'Four Seasons Orlando – Offers',
  descricao: 'Resort 5 estrelas dentro do Walt Disney World com pacotes de luxo e experiências exclusivas.',
  categoria: 'hoteis',
  parceiro: 'Four Seasons',
  link: 'https://www.fourseasons.com/orlando/offers/',
  sobre: 'Hotel mais luxuoso da Disney, localizado dentro do Golden Oak. Possui lazy river, toboáguas, spa premiado e restaurantes com vista para os fogos do Magic Kingdom. Ideal para famílias e casais que buscam conforto e exclusividade.',
  oQueTem: ['Piscinas e lazy river', 'Kids club e spa completo', 'Restaurantes premiados com vista para os fogos'],
},

{
  id: 'disney-grand-floridian-offers',
  titulo: 'Disney’s Grand Floridian Resort & Spa – Offers',
  descricao: 'O resort mais elegante da Disney, com pacotes oficiais e benefícios exclusivos.',
  categoria: 'hoteis',
  parceiro: 'Walt Disney World Resort',
  link: 'https://disneyworld.disney.go.com/pt-br/resorts/grand-floridian-resort-and-spa/',
  sobre: 'Resort de luxo com arquitetura vitoriana e acesso direto ao Magic Kingdom via monorail. Oferece spa completo, restaurantes sofisticados e vista para os fogos do parque. Experiência premium com benefícios Disney.',
  oQueTem: ['Acesso direto ao monorail', 'Vista para os fogos do Magic Kingdom', 'Restaurantes e spa de luxo'],
  imperdivel: true,
},

{
  id: 'disney-polynesian-offers',
  titulo: 'Disney’s Polynesian Village Resort – Offers',
  descricao: 'Resort tropical temático da Disney com vista para o lago e fogos do Magic Kingdom.',
  categoria: 'hoteis',
  parceiro: 'Walt Disney World Resort',
  link: 'https://disneyworld.disney.go.com/pt-br/resorts/polynesian-village-resort/',
  sobre: 'Um dos resorts mais queridos da Disney, com atmosfera polinésia, bangalôs sobre a água e acesso ao monorail. Oferece restaurantes icônicos como o Ohana e vistas incríveis dos fogos à noite.',
  oQueTem: ['Temática tropical e bangalôs sobre a água', 'Restaurantes Ohana e Kona Café', 'Vista noturna para os fogos'],
},

{
  id: 'universal-portofino-bay-offers',
  titulo: 'Loews Portofino Bay Hotel at Universal Orlando – Offers',
  descricao: 'Hotel 5 estrelas inspirado na Itália, com entrada antecipada aos parques Universal.',
  categoria: 'hoteis',
  parceiro: 'Universal Orlando Resort',
  link: 'https://www.universalorlando.com/web/en/us/places-to-stay/loews-portofino-bay-hotel',
  sobre: 'Inspirado na charmosa vila italiana de Portofino, o resort oferece luxo, transporte gratuito de barco aos parques Universal e benefício de entrada antecipada em atrações populares como Hagrid’s Magical Creatures Motorbike Adventure.',
  oQueTem: ['Entrada antecipada nos parques', 'Transporte gratuito por barco', 'Piscinas e spa de luxo'],
},

{
  id: 'universal-hard-rock-hotel',
  titulo: 'Hard Rock Hotel at Universal Orlando – Offers',
  descricao: 'Resort musical com entrada expressa gratuita para atrações da Universal.',
  categoria: 'hoteis',
  parceiro: 'Universal Orlando Resort',
  link: 'https://www.universalorlando.com/web/en/us/places-to-stay/hard-rock-hotel',
  sobre: 'Resort de luxo com tema musical, próximo aos parques da Universal. Hóspedes recebem Universal Express Unlimited gratuito, que permite pular filas em quase todas as atrações. Ambiente animado com piscina, música ao vivo e restaurantes famosos.',
  oQueTem: ['Universal Express Unlimited incluso', 'Piscina com música ao vivo', 'Acesso rápido aos parques'],
  imperdivel: true,
},

{
  id: 'universal-cabana-bay-offers',
  titulo: 'Universal’s Cabana Bay Beach Resort – Offers',
  descricao: 'Resort retrô da Universal com ótimo custo-benefício e acesso direto ao Volcano Bay.',
  categoria: 'hoteis',
  parceiro: 'Universal Orlando Resort',
  link: 'https://www.universalorlando.com/web/en/us/places-to-stay/universals-cabana-bay-beach-resort',
  sobre: 'Hotel temático dos anos 1950 com decoração vibrante, área de boliche, lazy river e passarela direta para o parque aquático Volcano Bay. Ideal para famílias e quem busca economia sem abrir mão da imersão.',
  oQueTem: ['Acesso direto ao Volcano Bay', 'Lazy river e piscinas temáticas', 'Ambiente retrô e familiar'],
  imperdivel: true,
},

{
  id: 'rosen-shingle-creek-offers',
  titulo: 'Rosen Shingle Creek – Offers',
  descricao: 'Resort completo com pacotes e tarifas promocionais.',
  categoria: 'hoteis',
  parceiro: 'Rosen Hotels',
  link: 'https://www.rosenshinglecreek.com/specials-packages/',
  sobre: 'Resort 4 estrelas com campo de golfe, quatro piscinas, spa e estrutura completa de lazer e convenções. Localizado próximo à Universal e ao centro de convenções de Orlando.',
  oQueTem: ['Campo de golfe e spa', 'Piscinas e lazer completo', 'Pacotes e descontos diretos no site'],
},

{
  id: 'rosen-centre-offers',
  titulo: 'Rosen Centre – Offers',
  descricao: 'Hotel moderno com localização privilegiada na International Drive.',
  categoria: 'hoteis',
  parceiro: 'Rosen Hotels',
  link: 'https://www.rosencentre.com/specials/',
  sobre: 'Hotel ideal para quem visita Orlando a negócios ou lazer, com piscina, restaurantes, academia e fácil acesso ao Orange County Convention Center.',
  oQueTem: ['Localização central', 'Piscina e academia', 'Restaurantes e bar no local'],
},

{
  id: 'hilton-orlando-offers',
  titulo: 'Hilton Orlando – Offers',
  descricao: 'Resort Hilton com pacotes e tarifas promocionais diretas no site.',
  categoria: 'hoteis',
  parceiro: 'Hilton',
  link: 'https://www.thehiltonorlando.com/offers/',
  sobre: 'Resort completo com toboáguas, lazy river, quadras esportivas e spa. Localizado entre os complexos Disney e Universal, é ideal para famílias que buscam conforto com boa localização.',
  oQueTem: ['Piscinas e toboáguas', 'Spa e quadras esportivas', 'Ofertas sazonais e pacotes familiares'],
},

// ============= TRANSPORTE (atualizado com Uber e destaques imperdíveis) =============

{
  id: 'mears-connect',
  titulo: 'Mears Connect – Airport Shuttle Deals',
  descricao: 'Traslado oficial entre o Aeroporto de Orlando (MCO) e hotéis da Disney e região turística.',
  categoria: 'transporte',
  parceiro: 'Mears',
  link: 'https://www.mearsconnect.com/',
  sobre: 'Serviço oficial de traslado entre o Aeroporto de Orlando e os hotéis do Walt Disney World e área turística. Oferece opção Standard (coletiva) e Express (direta), com reservas online e preço fixo por trecho.',
  oQueTem: ['Traslado aeroporto ↔ hotéis Disney', 'Opções Standard e Express', 'Compra online antecipada'],
  imperdivel: true,
},

{
  id: 'lynx-fares',
  titulo: 'LYNX Bus – Fares & Passes',
  descricao: 'Passes e informações de tarifas do transporte público de Orlando.',
  categoria: 'transporte',
  parceiro: 'LYNX',
  link: 'https://www.golynx.com/fares-passes/',
  sobre: 'Sistema de ônibus público que cobre grande parte da região de Orlando, inclusive International Drive, aeroportos e shoppings. Excelente opção econômica, mas com tempo de deslocamento maior.',
  oQueTem: ['Passes diários e mensais', 'Linhas por toda a cidade', 'Integração com hubs principais'],
},

{
  id: 'alamo-mco-deals',
  titulo: 'Alamo Rent A Car – Orlando Deals',
  descricao: 'Ofertas para retirada de carros no Aeroporto de Orlando (MCO).',
  categoria: 'transporte',
  parceiro: 'Alamo',
  link: 'https://www.alamo.com/en_US/car-rental/deals/us.html',
  sobre: 'Locadora popular entre brasileiros, com balcões no aeroporto e preços competitivos online. Permite check-in digital e retirada sem fila.',
  oQueTem: ['Frota variada', 'Códigos promocionais', 'Opções de seguro'],
},

{
  id: 'hertz-mco-deals',
  titulo: 'Hertz – Deals (MCO)',
  descricao: 'Tarifas promocionais e cupons para locação de veículos em Orlando.',
  categoria: 'transporte',
  parceiro: 'Hertz',
  link: 'https://www.hertz.com/rentacar/reservation/',
  sobre: 'Locadora tradicional com balcão no aeroporto, frota ampla e programa de fidelidade Gold Rewards.',
  oQueTem: ['Ofertas por categoria', 'Programa Gold Rewards', 'Retirada e devolução facilitadas'],
},

{
  id: 'avis-mco-deals',
  titulo: 'Avis – Orlando/MCO Offers',
  descricao: 'Códigos e promoções sazonais para locação em Orlando.',
  categoria: 'transporte',
  parceiro: 'Avis',
  link: 'https://www.avis.com/en/offers',
  sobre: 'Rede de locação presente em diversas regiões de Orlando e no aeroporto. Ideal para viagens em grupo e longas estadias.',
  oQueTem: ['Cupons por período', 'Categorias variadas', 'Planos com seguro incluso'],
},

{
  id: 'budget-mco-deals',
  titulo: 'Budget – Orlando Deals',
  descricao: 'Cupons e promoções com foco em custo-benefício.',
  categoria: 'transporte',
  parceiro: 'Budget',
  link: 'https://www.budget.com/en/offers',
  sobre: 'Locadora reconhecida pelo preço acessível e variedade de categorias. Oferece descontos adicionais no site para reservas antecipadas.',
  oQueTem: ['Tarifas promocionais', 'Códigos e parcerias', 'Retirada no MCO'],
},

{
  id: 'sixt-mco-deals',
  titulo: 'SIXT – Orlando/MCO Offers',
  descricao: 'Descontos e upgrades no aluguel de carros premium.',
  categoria: 'transporte',
  parceiro: 'SIXT',
  link: 'https://www.sixt.com/deals/',
  sobre: 'Locadora com frota moderna e veículos de luxo. Costuma oferecer upgrades gratuitos em promoções sazonais.',
  oQueTem: ['Upgrades sazonais', 'Planos flexíveis', 'Retirada no aeroporto e na cidade'],
},

{
  id: 'lyft-promo',
  titulo: 'Lyft – Promo & Credits',
  descricao: 'Créditos e descontos no aplicativo de transporte Lyft.',
  categoria: 'transporte',
  parceiro: 'Lyft',
  link: 'https://www.lyft.com/rider/promo',
  sobre: 'Aplicativo de corridas sob demanda com presença ampla em Orlando, incluindo aeroporto, parques e outlets. Oferece cupons de boas-vindas e créditos para usuários frequentes.',
  oQueTem: ['Créditos e cupons', 'Categorias variadas (XL, Lux)', 'App para iOS e Android'],
  imperdivel: true,
},

// ============= OUTROS / ATRAÇÕES (atualizado com diversão alternativa) =============

{
  id: 'crayola-experience',
  titulo: 'Crayola Experience – Special Offers',
  descricao: 'Cupons e promoções da atração indoor no Florida Mall.',
  categoria: 'outros',
  parceiro: 'Crayola',
  link: 'https://www.crayolaexperience.com/orlando/plan-your-visit/special-offers',
  sobre: 'Atração coberta ideal para crianças, com mais de 20 atividades criativas, oficinas de arte e experiências coloridas no universo Crayola.',
  oQueTem: ['Oficinas e arte interativa', 'Loja temática', 'Cupons sazonais no site'],
},

{
  id: 'madame-tussauds-orlando',
  titulo: 'Madame Tussauds Orlando – Deals',
  descricao: 'Ingressos e combos oficiais com outras atrações do ICON Park.',
  categoria: 'outros',
  parceiro: 'Merlin Entertainments',
  link: 'https://www.madametussauds.com/orlando/tickets/',
  sobre: 'Museu de cera com estátuas realistas de celebridades do cinema, música, esportes e cultura pop. Excelente para fotos e combinações com o aquário SEA LIFE.',
  oQueTem: ['Combos com The Wheel e SEA LIFE', 'Fotos com celebridades', 'Exposições temáticas'],
},

{
  id: 'sea-life-orlando',
  titulo: 'SEA LIFE Orlando Aquarium – Deals',
  descricao: 'Descontos e combos com outras atrações do ICON Park.',
  categoria: 'outros',
  parceiro: 'Merlin Entertainments',
  link: 'https://www.visitsealife.com/orlando/tickets-passes/',
  sobre: 'Aquário moderno com túneis de vidro 360°, tubarões, águas-vivas e áreas educativas. Localizado no ICON Park, é ideal para famílias com crianças.',
  oQueTem: ['Ingressos e combos', 'Experiências educativas', 'Túneis e tanques interativos'],
},

{
  id: 'museum-of-illusions',
  titulo: 'Museum of Illusions Orlando – Offers',
  descricao: 'Cupons, combos e pacotes promocionais no ICON Park.',
  categoria: 'outros',
  parceiro: 'MOI Orlando',
  link: 'https://moiorlando.com/',
  sobre: 'Museu interativo repleto de ilusões de ótica, salas invertidas e instalações instagramáveis. Experiência divertida para todas as idades.',
  oQueTem: ['Exposições fotogênicas', 'Ingressos digitais', 'Localização central no ICON Park'],
},

{
  id: 'wonderworks-orlando',
  titulo: 'WonderWorks Orlando – Coupons',
  descricao: 'Cupons oficiais e combos com o jantar-show “Outta Control Magic Comedy”.',
  categoria: 'outros',
  parceiro: 'WonderWorks',
  link: 'https://www.wonderworksonline.com/orlando/contact-wonderworks-orlando/ticket-prices/',
  sobre: 'A famosa “casa de cabeça para baixo” com experiências de ciência, simuladores, laser tag e atividades interativas. Boa pedida para dias chuvosos.',
  oQueTem: ['Simuladores e desafios', 'Laser tag e cordas', 'Show de mágica com jantar incluso (opcional)'],
},

{
  id: 'ripleys-orlando',
  titulo: 'Ripley’s Believe It or Not! Orlando – Deals',
  descricao: 'Descontos e cupons oficiais da atração de curiosidades.',
  categoria: 'outros',
  parceiro: 'Ripley’s',
  link: 'https://www.ripleys.com/attractions/ripleys-believe-it-or-not-orlando/',
  sobre: 'Museu excêntrico com galerias de fatos e objetos curiosos, ilusões e itens inacreditáveis. Localizado na International Drive.',
  oQueTem: ['Galerias interativas', 'Exposições bizarras', 'Descontos e combos'],
},

{
  id: 'boggy-creek-airboat',
  titulo: 'Boggy Creek Airboat Adventures – Deals',
  descricao: 'Passeios de airboat com cupons e descontos no site oficial.',
  categoria: 'outros',
  parceiro: 'Boggy Creek',
  link: 'https://bcairboats.com/specials/',
  sobre: 'Passeios de barco de alta velocidade pelos pântanos da Flórida, com possibilidade de avistar jacarés e pássaros selvagens. Oferece tours diurnos e noturnos.',
  oQueTem: ['Passeios de airboat', 'Contato com vida selvagem', 'Combos e descontos online'],
},

{
  id: 'orlando-science-center',
  titulo: 'Orlando Science Center – Discounts',
  descricao: 'Descontos e eventos educativos para toda a família.',
  categoria: 'outros',
  parceiro: 'OSC',
  link: 'https://www.osc.org/tickets/',
  sobre: 'Centro de ciências com planetário, experimentos interativos e exposições sobre tecnologia e natureza. Indicado para famílias com crianças.',
  oQueTem: ['Exposições científicas', 'Eventos familiares', 'Ingressos promocionais'],
},

{
  id: 'gatorland-orlando',
  titulo: 'Gatorland – Coupons & Specials',
  descricao: 'Descontos oficiais no “Alligator Capital of the World”.',
  categoria: 'outros',
  parceiro: 'Gatorland',
  link: 'https://www.gatorland.com/specials/',
  sobre: 'Parque temático com centenas de jacarés e crocodilos, shows de alimentação e tirolesas sobre os lagos. Mistura de zoológico e aventura.',
  oQueTem: ['Shows com animais', 'Zipline “Screamin’ Gator”', 'Descontos e passes anuais'],
},

{
  id: 'ifly-orlando',
  titulo: 'iFLY Orlando Indoor Skydiving – Deals',
  descricao: 'Descontos em pacotes de voo indoor no simulador de paraquedismo.',
  categoria: 'outros',
  parceiro: 'iFLY',
  link: 'https://www.iflyworld.com/orlando/',
  sobre: 'Experiência de voo livre dentro de um túnel de vento vertical, segura e divertida para adultos e crianças. Ideal para quem quer adrenalina sem saltar de verdade.',
  oQueTem: ['Simulador de paraquedismo', 'Pacotes individuais e familiares', 'Fotos e vídeos opcionais'],
},


// ============= OUTROS / CUPONS E PASSES (extras úteis) =============
{
  id: 'groupon-orlando',
  titulo: 'Groupon – Orlando Deals',
  descricao: 'Cupons e ofertas locais em atrações, restaurantes e serviços.',
  categoria: 'outros',
  parceiro: 'Groupon',
  link: 'https://www.groupon.com/local/orlando',
  sobre: 'Marketplace de cupons com centenas de promoções ativas em Orlando. Inclui restaurantes, spas, experiências e passeios turísticos com até 70% de desconto.',
  oQueTem: ['Descontos imediatos', 'Restaurantes e spas', 'Atividades e ingressos locais'],
  // imperdivel: false (não marcar por padrão, pois é bem variável)
},

{
  id: 'go-city-orlando',
  titulo: 'Go City – Orlando Pass',
  descricao: 'Passe digital com economia em mais de 25 atrações.',
  categoria: 'outros',
  parceiro: 'Go City',
  link: 'https://gocity.com/orlando/en-us',
  sobre: 'Oferece passes Explorer e All-Inclusive que reúnem atrações como ICON Park, Gatorland, WonderWorks e LEGOLAND, com até 40% de economia comparado a ingressos avulsos.',
  oQueTem: ['Economia em combos', 'App com QR code', 'Várias durações disponíveis'],
  imperdivel: true,
},

{
  id: 'citypass-orlando',
  titulo: 'CityPASS Orlando – Ticket Combos',
  descricao: 'Combos digitais com ingressos dos principais parques e atrações.',
  categoria: 'outros',
  parceiro: 'CityPASS',
  link: 'https://www.citypass.com/orlando',
  sobre: 'Combina ingressos para Disney, Universal, SeaWorld e outras atrações com descontos progressivos. Compra segura e digital.',
  oQueTem: ['Economia em múltiplos parques', 'Válido por vários dias', 'Compra oficial e segura'],
  imperdivel: true,
},

{
  id: 'aaa-discounts-orlando',
  titulo: 'AAA – Discounts in Orlando',
  descricao: 'Benefícios exclusivos para membros AAA em hotéis e atrações.',
  categoria: 'outros',
  parceiro: 'AAA',
  link: 'https://discounts.aaa.com/',
  sobre: 'Associação que oferece tarifas reduzidas e cupons para hotéis, locadoras e parques. Válido para membros norte-americanos e afiliados internacionais.',
  oQueTem: ['Hotéis e locadoras', 'Restaurantes e parques', 'Descontos exclusivos'],
  // imperdivel depende de ser membro; não marcar por padrão
},

{
  id: 'govx-orlando',
  titulo: 'GovX – Orlando Attractions Discounts',
  descricao: 'Descontos para militares, socorristas e servidores públicos.',
  categoria: 'outros',
  parceiro: 'GovX',
  link: 'https://www.govx.com/',
  sobre: 'Plataforma com verificação de elegibilidade e ofertas especiais para militares, policiais, professores e profissionais da saúde.',
  oQueTem: ['Ingressos e produtos', 'Verificação rápida', 'Economia exclusiva'],
  // imperdivel depende de elegibilidade; não marcar por padrão
},

// ============= TICKETS COM DESCONTO (revendas oficiais/parceiras) =============
{
  id: 'undercover-tourist-orlando',
  titulo: 'Undercover Tourist – Orlando Tickets Deals',
  descricao: 'Ingressos de parques com desconto (Disney, Universal, SeaWorld).',
  categoria: 'parques',
  parceiro: 'Undercover Tourist',
  link: 'https://www.undercovertourist.com/orlando/',
  sobre: 'Revendedor autorizado de ingressos com preços abaixo da bilheteria.',
  oQueTem: ['Disney/Universal/SeaWorld', 'E-tickets', 'Ofertas sazonais'],
  imperdivel: true,
}
];
