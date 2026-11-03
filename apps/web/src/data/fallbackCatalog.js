export const FALLBACK_CATALOG = Object.freeze([
  {
    id: 'HOR-001',
    channel: 'horeca',
    sector: 'horeca',
    section: 'Pescado y Marisco',
    brand: 'Fuconsa Selección',
    name: {
      es: 'Lomo de Bacalao Extra 250-300g',
      ca: 'Llom de Bacallà Extra 250-300g',
      en: 'Extra Cod Loin 250-300g'
    },
    format: 'Caja 5kg IQF',
    unitPrice: 14.85,
    boxPrice: 74.25,
    priceText: '14,85 €/kg',
    hasPhoto: true,
    imagePath: '/images/products/bacalao-extra.jpg'
  },
  {
    id: 'HOR-002',
    channel: 'horeca',
    sector: 'horeca',
    section: 'Platos Precocinados',
    brand: 'Maheso Horeca',
    name: {
      es: 'Croquetas Artesanas de Jamón Ibérico',
      ca: 'Croquetes Artesanes de Pernil Ibèric',
      en: 'Artisan Iberian Ham Croquettes'
    },
    format: 'Bolsa 1kg (aprox. 35 uds)',
    unitPrice: 8.9,
    boxPrice: 35.6,
    priceText: '8,90 €/kg',
    hasPhoto: true,
    imagePath: '/images/products/croquetas-jamon.jpg'
  },
  {
    id: 'HOR-003',
    channel: 'horeca',
    sector: 'horeca',
    section: 'Verduras',
    brand: 'Fuconsa',
    name: {
      es: 'Puntas de Espárragos Verdes Selección',
      ca: "Puntes d'Espàrrecs Verds Selecció",
      en: 'Selected Green Asparagus Tips'
    },
    format: 'Caja 4x2.5kg',
    unitPrice: 5.4,
    boxPrice: 54.0,
    priceText: '5,40 €/kg',
    hasPhoto: false,
    imagePath: ''
  },
  {
    id: 'SUP-001',
    channel: 'supermercados',
    sector: 'supermercados',
    section: 'Pizzas y Precocinados',
    brand: 'Dr. Oetker',
    name: {
      es: 'Pizza Ristorante Prosciutto',
      ca: 'Pizza Ristorante Prosciutto',
      en: 'Ristorante Prosciutto Pizza'
    },
    format: 'Caja 7 uds x 330g',
    unitPrice: 2.85,
    boxPrice: 19.95,
    priceText: '2,85 €/ud',
    hasPhoto: true,
    imagePath: '/images/products/pizza-ristorante.jpg'
  },
  {
    id: 'SUP-002',
    channel: 'supermercados',
    sector: 'supermercados',
    section: 'Aperitivos y Snacks',
    brand: 'Fripozo',
    name: {
      es: 'Tenders de Pollo Crunchy',
      ca: 'Tenders de Pollastre Crunchy',
      en: 'Crunchy Chicken Tenders'
    },
    format: 'Caja 6 bolsas x 400g',
    unitPrice: 3.2,
    boxPrice: 19.2,
    priceText: '3,20 €/ud',
    hasPhoto: true,
    imagePath: '/images/products/chicken-tenders.jpg'
  },
  {
    id: 'SUP-003',
    channel: 'supermercados',
    sector: 'supermercados',
    section: 'Helados',
    brand: 'Häagen-Dazs',
    name: {
      es: 'Helado Salted Caramel 460ml',
      ca: 'Gelat Salted Caramel 460ml',
      en: 'Salted Caramel Ice Cream 460ml'
    },
    format: 'Caja 8 tarrinas',
    unitPrice: 4.65,
    boxPrice: 37.2,
    priceText: '4,65 €/ud',
    hasPhoto: false,
    imagePath: ''
  },
  {
    id: 'LAT-001',
    channel: 'latinos',
    sector: 'latinos',
    section: 'Masas y Harinas',
    brand: 'Doña Blanca',
    name: {
      es: 'Humitas Tradicionales de Choclo',
      ca: 'Humitas Tradicionals de Blat de Moro',
      en: 'Traditional Sweet Corn Humitas'
    },
    format: 'Caja 12 paquetes x 4 uds',
    unitPrice: 3.95,
    boxPrice: 47.4,
    priceText: '3,95 €/paq',
    hasPhoto: true,
    imagePath: '/images/products/humitas.jpg'
  },
  {
    id: 'LAT-002',
    channel: 'latinos',
    sector: 'latinos',
    section: 'Bebidas y Pulpa',
    brand: 'Goya',
    name: {
      es: 'Pulpa de Maracuyá Congelada 100% Pura',
      ca: 'Polpa de Maracujà Congelada 100% Pura',
      en: '100% Pure Frozen Passion Fruit Pulp'
    },
    format: 'Caja 20 x 400g',
    unitPrice: 2.1,
    boxPrice: 42.0,
    priceText: '2,10 €/ud',
    hasPhoto: false,
    imagePath: ''
  },
  {
    id: 'ACA-001',
    channel: 'acai',
    sector: 'acai',
    section: 'Polpa Norte Premium',
    brand: 'Polpa Norte',
    name: {
      es: 'Açaí Puro Orgánico Especial Bares y Locales',
      ca: 'Açaí Pur Orgànic Especial Bars i Locals',
      en: 'Organic Pure Açaí Foodservice Special'
    },
    format: 'Cubeta 5kg lista para servir',
    unitPrice: 7.9,
    boxPrice: 39.5,
    priceText: '7,90 €/kg',
    hasPhoto: true,
    imagePath: '/images/products/acai-cubeta-5kg.jpg'
  },
  {
    id: 'ACA-002',
    channel: 'acai',
    sector: 'acai',
    section: 'Polpa Norte Sorbet',
    brand: 'Polpa Norte',
    name: {
      es: 'Sorbete de Açaí con Guaraná Envase Individual',
      ca: 'Sorbet de Açaí amb Guaranà Envàs Individual',
      en: 'Açaí Sorbet with Guaraná Single Cup'
    },
    format: 'Caja 24 x 150g con cuchara',
    unitPrice: 1.45,
    boxPrice: 34.8,
    priceText: '1,45 €/ud',
    hasPhoto: true,
    imagePath: '/images/products/acai-cup-150g.jpg'
  }
]);
