/**
 * Motor de maquetación y paginación adaptativa para documentos comerciales A4.
 * Cumple con diseño editorial: cuadrícula densa (12-16), escaparate (6-8) y tabla compacta (hasta 40).
 */

export const DENSITY_MODES = Object.freeze({
  HIGH: 'high',
  SHOWCASE: 'showcase',
  COMPACT_TABLE: 'compact_table'
});

export const DEFAULT_PAGE_LIMITS = Object.freeze({
  highDensity: 12,
  showcase: 6,
  compactTable: 36,
  selectionSingleSheet: 8
});

export function detectDensity(sector = '', section = '', itemCount = 0) {
  const normSector = String(sector).toLowerCase();
  const normSection = String(section).toLowerCase();
  const isAcai = normSector.includes('acai') || normSection.includes('acai') || normSection.includes('polpa');
  if (isAcai || (itemCount > 0 && itemCount <= 8)) {
    return DENSITY_MODES.SHOWCASE;
  }
  return DENSITY_MODES.HIGH;
}

export function chunkArray(list, chunkSize) {
  const size = Math.max(1, chunkSize);
  const chunks = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

export function paginateCatalog(items = [], options = {}) {
  const { sector = '', section = '', includeCompactTable = true, limits = DEFAULT_PAGE_LIMITS } = options;
  const withPhotos = items.filter((item) => Boolean(item.hasPhoto));
  const withoutPhotos = items.filter((item) => !item.hasPhoto);
  const density = options.density && options.density !== 'auto'
    ? options.density
    : detectDensity(sector, section, withPhotos.length);
  const gridChunkSize = density === DENSITY_MODES.SHOWCASE ? limits.showcase : limits.highDensity;
  const rawPages = chunkArray(withPhotos, gridChunkSize).map((chunk) => ({
    type: 'grid',
    density,
    items: chunk
  }));

  if (includeCompactTable && withoutPhotos.length > 0) {
    const tableChunks = chunkArray(withoutPhotos, limits.compactTable);
    tableChunks.forEach((chunk) => rawPages.push({ type: 'table', density: DENSITY_MODES.COMPACT_TABLE, items: chunk }));
  }

  const totalPages = Math.max(1, rawPages.length);
  const pages = (rawPages.length ? rawPages : [{ type: 'grid', density, items: [] }]).map((page, idx) => ({
    ...page,
    pageNumber: idx + 1,
    totalPages,
    sector,
    section
  }));
  return { pages, totalPages, totalItems: items.length, withPhotosCount: withPhotos.length, withoutPhotosCount: withoutPhotos.length };
}

export function paginateSelection(items = [], options = {}) {
  const { limits = DEFAULT_PAGE_LIMITS } = options;
  const limit = items.length <= limits.selectionSingleSheet ? limits.selectionSingleSheet : limits.highDensity;
  const density = items.length <= limits.selectionSingleSheet ? DENSITY_MODES.SHOWCASE : DENSITY_MODES.HIGH;
  const chunks = chunkArray(items, limit);
  const totalPages = Math.max(1, chunks.length);
  const pages = (chunks.length ? chunks : [[]]).map((chunk, idx) => ({
    type: 'selection',
    density,
    pageNumber: idx + 1,
    totalPages,
    items: chunk
  }));
  return { pages, totalPages, totalItems: items.length };
}
