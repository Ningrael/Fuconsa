/**
 * Semilla de catálogo comercial Fuconsa para modo autónomo y fallback seguro.
 * Abarca los 4 sectores: Horeca, Supermercados, Productos Latinos y Mundo Açaí.
 */

export const SEED_CATALOG = Object.freeze([
  {
    id: 'acai-001',
    channel: 'acai',
    sector: 'acai',
    section: 'Polpa Norte',
    brand: 'Polpa Norte',
    name: {
      es: 'Açaí Orgánico Congelado 100g',
      ca: 'Açaí Orgànic Congelat 100g',
      en: 'Organic Frozen Açaí 100g'
    },
    format: 'Caja 40x100g (4kg)',
    unitPrice: 1.25,
    boxPrice: 50.0,
    priceText: '12,50 €/kg',
    hasPhoto: true,
    imagePath: '/images/products/acai-polpa-norte-100g.webp'
  },
  {
    id: 'acai-002',
    channel: 'acai',
    sector: 'acai',
    section: 'Polpa Norte',
    brand: 'Polpa Norte',
    name: {
      es: 'Sorbet Açaí con Guaraná 1L',
      ca: 'Sorbet Açaí amb Guaranà 1L',
      en: 'Açaí Sorbet with Guarana 1L'
    },
    format: 'Caja 6x1L',
    unitPrice: 6.8,
    boxPrice: 40.8,
    priceText: '6,80 €/ud',
    hasPhoto: true,
    imagePath: '/images/products/acai-guarana-1l.webp'
  },
  {
    id: 'horeca-001',
    channel: 'horeca',
    sector: 'horeca',
    section: 'Pescados y Mariscos',
    brand: 'Fuconsa Selección',
    name: {
      es: 'Lomo de Merluza Austral',
      ca: 'Llom de Lluç Austral',
      en: 'Austral Hake Loin'
    },
    format: 'Caja 5kg',
    unitPrice: 9.4,
    boxPrice: 47.0,
    priceText: '9,40 €/kg',
    hasPhoto: true,
    imagePath: '/images/products/lomo-merluza.webp'
  },
  {
    id: 'horeca-002',
    channel: 'horeca',
    sector: 'horeca',
    section: 'Pescados y Mariscos',
    brand: 'Fuconsa',
    name: {
      es: 'Gamba Roja Congelada Nº 2',
      ca: 'Gamba Vermella Congelada Nº 2',
      en: 'Frozen Red Shrimp No. 2'
    },
    format: 'Caja 2kg',
    unitPrice: 28.5,
    boxPrice: 57.0,
    priceText: '28,50 €/kg',
    hasPhoto: false,
    imagePath: ''
  },
  {
    id: 'super-001',
    channel: 'supermercados',
    sector: 'supermercados',
    section: 'Pizzas y Precocinados',
    brand: 'Dr. Oetker',
    name: {
      es: 'Pizza Ristorante 4 Quesos',
      ca: 'Pizza Ristorante 4 Formatges',
      en: 'Ristorante 4 Cheeses Pizza'
    },
    format: 'Caja 7 uds',
    unitPrice: 2.85,
    boxPrice: 19.95,
    priceText: '2,85 €/ud',
    hasPhoto: true,
    imagePath: '/images/products/dr-oetker-ristorante-4q.webp'
  },
  {
    id: 'super-002',
    channel: 'supermercados',
    sector: 'supermercados',
    section: 'Helados',
    brand: 'Häagen-Dazs',
    name: {
      es: 'Helado Pralines & Cream 460ml',
      ca: 'Gelat Pralines & Cream 460ml',
      en: 'Pralines & Cream Ice Cream 460ml'
    },
    format: 'Caja 8 uds',
    unitPrice: 4.15,
    boxPrice: 33.2,
    priceText: '4,15 €/ud',
    hasPhoto: true,
    imagePath: '/images/products/haagen-dazs-pralines.webp'
  },
  {
    id: 'latinos-001',
    channel: 'latinos',
    sector: 'latinos',
    section: 'Maíz y Tradición',
    brand: 'Doña Blanca',
    name: {
      es: 'Humitas Caseras de Maíz',
      ca: 'Humites Casolanes de Blat de Moro',
      en: 'Homemade Corn Humitas'
    },
    format: 'Bolsa 4 uds (800g)',
    unitPrice: 3.9,
    boxPrice: 39.0,
    priceText: '3,90 €/bolsa',
    hasPhoto: true,
    imagePath: '/images/products/humitas-dona-blanca.webp'
  },
  {
    id: 'latinos-002',
    channel: 'latinos',
    sector: 'latinos',
    section: 'Plátano y Tubérculos',
    brand: 'El Paisano',
    name: {
      es: 'Tostones de Plátano Verde',
      ca: 'Tostones de Plàtan Verd',
      en: 'Green Plantain Tostones'
    },
    format: 'Caja 10 bolsas x 500g',
    unitPrice: 2.1,
    boxPrice: 21.0,
    priceText: '2,10 €/bolsa',
    hasPhoto: false,
    imagePath: ''
  }
]);
