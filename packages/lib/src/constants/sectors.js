export const SECTORS = Object.freeze([
  {
    id: 'horeca',
    key: 'sectorHoreca',
    color: '#0284C7',
    img: '/assets/products/fuconsa-gamba-roja-no1-1kg.webp',
    tag: 'Pescado y Marisco, Verduras, Frutas/Purés y Precocinados',
    subcategories: ['Pescado y marisco', 'Verduras', 'Frutas y purés', 'Platos precocinados']
  },
  {
    id: 'supermercados',
    key: 'sectorSupermarkets',
    color: '#253B91',
    img: '/assets/products/dr-oetker-pizza-quattro-formaggi-dr-oetker.webp',
    tag: 'Fripozo, Maheso, Dr. Oetker, Buitoni, Nestlé...',
    subcategories: [
      'Fripozo',
      'Maheso',
      'Dr. Oetker',
      'Buitoni',
      'Delfín',
      'JV',
      'Frigo',
      "Ben & Jerry's",
      'Häagen-Dazs',
      'Nestlé',
      'Productos latinos'
    ]
  },
  {
    id: 'latinos',
    key: 'sectorLatinos',
    color: '#D97706',
    img: '/assets/products/productos-latinos-pulpa-mango.webp',
    tag: 'El Dorado, El Plebeyo y Frutimanía',
    subcategories: ['Productos latinos']
  },
  {
    id: 'acai',
    key: 'sectorAcai',
    color: '#9333EA',
    img: '/assets/products/polpa-norte-acai-1-02kg-polpanorte.webp',
    tag: 'Polpa Norte · Cubetas, Tarrinas y Pulpas',
    subcategories: ['Açaí']
  }
]);

export const LEADING_BRANDS = Object.freeze([
  'Maheso',
  'Fripozo',
  'Dr. Oetker',
  'Buitoni',
  'Nestlé',
  'Frigo',
  'Häagen-Dazs',
  "Ben & Jerry's",
  'Delfín',
  'Polpa Norte',
  'El Dorado'
]);

export const BRAND_LOGOS = Object.freeze({
  'Maheso': '/assets/brands/maheso.png',
  'Fripozo': '/assets/brands/fripozo.png',
  'Dr. Oetker': '/assets/brands/dr-oetker.svg',
  'Buitoni': '/assets/brands/buitoni.svg',
  'Nestlé': '/assets/brands/nestle.svg',
  'Frigo': '/assets/brands/frigo.svg',
  'Häagen-Dazs': '/assets/brands/haagen-dazs.svg',
  "Ben & Jerry's": '/assets/brands/ben-jerrys.svg',
  'Delfín': '/assets/brands/delfin.png',
  'JV': '/assets/brands/jv.png',
  'Polpa Norte': '/assets/brands/polpa-norte.png',
  'El Dorado': '/assets/brands/el-dorado.png',
  'Fuconsa': '/assets/brand/logo.png'
});

export const SECTION_THUMBNAILS = Object.freeze({
  'Pescado y marisco': '/assets/products/fuconsa-gamba-roja-no1-1kg.webp',
  'Verduras': '/assets/products/fuconsa-brocoli-jv-1kg.webp',
  'Frutas y purés': '/assets/products/fuconsa-frambuesa-1kg-ardo.webp',
  'Platos precocinados': '/assets/products/fuconsa-croqueta-iberico-meson-500gr-priela.webp',
  'Productos latinos': '/assets/products/productos-latinos-arepa-amarilla-el-dorado-450g.webp'
});

export function getBrandLogoUrl(name) {
  if (!name) return '';
  if (BRAND_LOGOS[name]) return BRAND_LOGOS[name];
  const norm = String(name).trim().toLowerCase();
  for (const [key, url] of Object.entries(BRAND_LOGOS)) {
    if (key.toLowerCase() === norm) return url;
  }
  if (norm.includes('polpa') || norm.includes('acai') || norm.includes('açaí')) return BRAND_LOGOS['Polpa Norte'];
  if (norm.includes('fuconsa')) return BRAND_LOGOS['Fuconsa'];
  return '';
}

export const CORPORATE_STATS = Object.freeze({
  totalReferences: '+760',
  sectorsCount: '4',
  coverageArea: 'Cataluña'
});
