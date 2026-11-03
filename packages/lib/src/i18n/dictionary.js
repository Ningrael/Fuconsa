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
  addToSelection: { es: 'Añadir', ca: 'Afegir', en: 'Add' },
  removeFromSelection: { es: 'Quitar', ca: 'Treure', en: 'Remove' },
  printSheet: { es: 'Imprimir A4', ca: 'Imprimir A4', en: 'Print A4' },
  clearSelection: { es: 'Vaciar selección', ca: 'Buidar selecció', en: 'Clear selection' },
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
  photoComingSoon: {
    es: 'Imagen en preparación',
    ca: 'Imatge en preparació',
    en: 'Image coming soon'
  },
  offlineNotice: {
    es: 'Sin conexión con el servidor. Mostrando catálogo en caché.',
    ca: 'Sense connexió amb el servidor. Mostrant catàleg en memòria cau.',
    en: 'No connection to server. Showing cached catalog.'
  },
  retry: {
    es: 'Reintentar',
    ca: 'Reintentar',
    en: 'Retry'
  },
  closePreview: {
    es: 'Cerrar vista previa',
    ca: 'Tancar vista prèvia',
    en: 'Close preview'
  },
  printSectionA4: {
    es: 'Imprimir Sección A4',
    ca: 'Imprimir Secció A4',
    en: 'Print Section A4'
  },
  errorBoundaryTitle: {
    es: 'Ha ocurrido un problema inesperado',
    ca: "S'ha produït un problema inesperat",
    en: 'An unexpected problem has occurred'
  },
  downloadPdf: {
    es: '📥 Descargar PDF',
    ca: '📥 Descarregar PDF',
    en: '📥 Download PDF'
  },
  sharePdf: {
    es: '📲 Compartir PDF',
    ca: '📲 Compartir PDF',
    en: '📲 Share PDF'
  },
  generatingPdf: {
    es: '⏳ Generando PDF...',
    ca: '⏳ Generant PDF...',
    en: '⏳ Generating PDF...'
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
