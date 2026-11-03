export const SUPPORTED_LANGUAGES = Object.freeze(['es', 'ca', 'en']);
export const DEFAULT_LANGUAGE = 'es';

export const DICTIONARY = Object.freeze({
  commercialRole: {
    es: 'Comercial Fuconsa en Cataluña',
    ca: 'Comercial Fuconsa a Catalunya',
    en: 'Fuconsa Sales Representative in Catalonia'
  },
  callAction: { es: 'Llamar', ca: 'Trucar', en: 'Call' },
  whatsappAction: { es: 'WhatsApp', ca: 'WhatsApp', en: 'WhatsApp' },
  saveContactAction: { es: 'Guardar Contacto', ca: 'Desar Contacte', en: 'Save Contact' },
  sectorHoreca: { es: 'Horeca', ca: 'Horeca', en: 'Horeca' },
  sectorSupermarkets: { es: 'Supermercados', ca: 'Supermercats', en: 'Supermarkets' },
  sectorLatinos: { es: 'Productos Latinos', ca: 'Productes Llatins', en: 'Latin Products' },
  sectorAcai: { es: 'Mundo Açaí / Polpa Norte', ca: 'Món Açaí / Polpa Norte', en: 'Açaí World / Polpa Norte' },
  searchPlaceholder: {
    es: 'Buscar por producto o marca...',
    ca: 'Cercar per producte o marca...',
    en: 'Search by product or brand...'
  },
  allSectors: { es: 'Todos los sectores', ca: 'Tots els sectors', en: 'All sectors' },
  allSections: { es: 'Todas las familias', ca: 'Totes les famílies', en: 'All categories' },
  onlyWithPhoto: { es: 'Solo con foto', ca: 'Només amb foto', en: 'Only with photo' },
  fullRate: { es: 'Tarifa completa', ca: 'Tarifa completa', en: 'Full price list' },
  noProductsFound: { es: 'No se encontraron referencias', ca: "No s'han trobat referències", en: 'No items found' },
  customSelection: { es: 'Selección a Medida', ca: 'Selecció a Mida', en: 'Custom Selection' },
  addToSelection: { es: 'Añadir a selección', ca: 'Afegir a selecció', en: 'Add to selection' },
  removeFromSelection: { es: 'Quitar', ca: 'Treure', en: 'Remove' },
  printSheet: { es: 'Imprimir A4', ca: 'Imprimir A4', en: 'Print A4' },
  createPdf: { es: 'Crear PDF', ca: 'Crear PDF', en: 'Create PDF' },
  clearSelection: { es: 'Vaciar', ca: 'Buidar', en: 'Clear' },
  colCode: { es: 'Cód.', ca: 'Codi', en: 'Code' },
  colProduct: { es: 'Producto', ca: 'Producte', en: 'Product' },
  colBrand: { es: 'Marca', ca: 'Marca', en: 'Brand' },
  colFormat: { es: 'Formato', ca: 'Format', en: 'Format' },
  colUnitPrice: { es: 'Precio Ud./kg', ca: 'Preu Ud./kg', en: 'Unit/kg Price' },
  colBoxPrice: { es: 'Precio Caja', ca: 'Preu Caixa', en: 'Box Price' },
  compactTableTitle: {
    es: 'Otras referencias disponibles (tarifa)',
    ca: 'Altres referències disponibles (tarifa)',
    en: 'Other available references (price list)'
  },
  page: { es: 'Página', ca: 'Pàgina', en: 'Page' },
  disclaimerVat: {
    es: 'Precios netos sin IVA sujetos a variación.',
    ca: 'Preus nets sense IVA subjectes a variació.',
    en: 'Net prices excluding VAT subject to change.'
  },
  retry: { es: 'Reintentar', ca: 'Reintentar', en: 'Retry' },
  offlineNotice: {
    es: 'Modo sin conexión. Mostrando catálogo local almacenado.',
    ca: 'Mode fora de línia. Mostrant catàleg local emmagatzemat.',
    en: 'Offline mode. Displaying local cached catalog.'
  },
  closePreview: { es: 'Cerrar', ca: 'Tancar', en: 'Close' },
  photoComingSoon: {
    es: 'Imagen en preparación',
    ca: 'Imatge en preparació',
    en: 'Photo coming soon'
  },
  printSectionA4: {
    es: 'Crear PDF',
    ca: 'Crear PDF',
    en: 'Create PDF'
  },
  errorBoundaryTitle: {
    es: 'Se ha producido un error inesperado al cargar la vista',
    ca: "S'ha produït un error inesperat en carregar la vista",
    en: 'An unexpected error occurred while loading the view'
  },
  reloadApp: {
    es: 'Reintentar / Recargar aplicación',
    ca: 'Reintentar / Recarregar aplicació',
    en: 'Retry / Reload application'
  },
  viewAllCards: {
    es: 'Vista Tarjetas (todos)',
    ca: 'Vista Targetes (tots)',
    en: 'Cards View (all)'
  },
  viewSplit: {
    es: 'Tarjetas + Tabla rápida',
    ca: 'Targetes + Taula ràpida',
    en: 'Cards + Quick Table'
  },
  contactAssistance: {
    es: 'Para asistencia técnica o comercial inmediata:',
    ca: 'Per a assistència tècnica o comercial immediata:',
    en: 'For immediate technical or commercial assistance:'
  },
  qrSectionTitle: {
    es: 'Escanea mi contacto',
    ca: 'Escaneja el meu contacte',
    en: 'Scan my contact'
  },
  qrSectionDesc: {
    es: 'Guarda mi tarjeta directa y el catálogo en tu móvil.',
    ca: 'Desa la meva targeta directa i el catàleg al teu mòbil.',
    en: 'Save my direct card and the catalog on your phone.'
  },
  installAppTitle: {
    es: 'Acceso directo en tu móvil',
    ca: 'Accés directe al mòbil',
    en: 'Shortcut on your phone'
  },
  installAppBtn: {
    es: 'Instalar Acceso Directo',
    ca: 'Instal·lar Accés Directe',
    en: 'Install Web App'
  },
  installIosHint: {
    es: 'En Safari: toca Compartir y elige «Añadir a pantalla de inicio».',
    ca: 'A Safari: toca Compartir i tria «Afegir a la pantalla d’inici».',
    en: 'In Safari: tap Share and select "Add to Home Screen".'
  },
  backToHome: {
    es: 'Inicio',
    ca: 'Inici',
    en: 'Home'
  },
  enterCatalog: {
    es: 'Entrar al Catálogo',
    ca: 'Entrar al Catàleg',
    en: 'Enter Catalog'
  },
  downloadPdf: {
    es: 'Descargar PDF',
    ca: 'Descarregar PDF',
    en: 'Download PDF'
  },
  sharePdf: {
    es: 'Compartir PDF',
    ca: 'Compartir PDF',
    en: 'Share PDF'
  },
  generatingPdf: {
    es: 'Generando PDF...',
    ca: 'Generant PDF...',
    en: 'Generating PDF...'
  },
  coverProposalLabel: {
    es: 'PROPUESTA COMERCIAL Y SELECCIÓN DE PRODUCTOS',
    ca: 'PROPOSTA COMERCIAL I SELECCIÓ DE PRODUCTES',
    en: 'COMMERCIAL PROPOSAL & PRODUCT SELECTION'
  },
  coverItemsIncluded: {
    es: 'referencias seleccionadas en este documento',
    ca: 'referències seleccionades en aquest document',
    en: 'selected items included in this document'
  }
});

export function isValidLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function t(key, lang = DEFAULT_LANGUAGE) {
  const targetLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const entry = DICTIONARY[key];
  if (!entry) return key;
  return entry[targetLang] || entry[DEFAULT_LANGUAGE] || key;
}

export function getTranslation(localizedObj, lang = DEFAULT_LANGUAGE) {
  if (!localizedObj || typeof localizedObj !== 'object') {
    return String(localizedObj || '');
  }
  const targetLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return localizedObj[targetLang] || localizedObj[DEFAULT_LANGUAGE] || Object.values(localizedObj)[0] || '';
}
