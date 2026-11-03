import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateFilter,
  getTranslation,
  normalizeSearchText
} from '@fuconsa/lib';
import { SEED_CATALOG } from './seedCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getCatalogFilePath() {
  const candidates = [
    path.resolve(__dirname, '../../../../packages/lib/data/catalog.json'),
    path.resolve(__dirname, '../../../packages/lib/data/catalog.json'),
    path.resolve(process.cwd(), 'packages/lib/data/catalog.json'),
    path.resolve(process.cwd(), '../packages/lib/data/catalog.json')
  ];
  return candidates.find((p) => fs.existsSync(p)) || candidates[0];
}

export function loadCatalogFromDisk() {
  try {
    const catalogPath = getCatalogFilePath();
    if (fs.existsSync(catalogPath)) {
      const raw = fs.readFileSync(catalogPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fallback silencioso a semilla si el archivo no está listo o está corrupto
  }
  return SEED_CATALOG;
}

function matchesSearch(item, term) {
  if (!term) return true;
  const normalized = normalizeSearchText(term);
  const pool = [
    item.name?.es,
    item.name?.ca,
    item.name?.en,
    item.brand,
    item.section,
    item.format
  ].filter(Boolean).map(normalizeSearchText).join(' ');
  return pool.includes(normalized);
}

function filterItem(item, filter) {
  if (filter.sector) {
    const sec = filter.sector.toLowerCase();
    if (sec === 'horeca' && item.channel !== 'horeca' && item.sector.toLowerCase() !== 'horeca') return false;
    if (sec === 'supermercados' && item.channel !== 'supermercados' && item.sector.toLowerCase() !== 'supermercados') return false;
    if (sec !== 'horeca' && sec !== 'supermercados' && item.sector.toLowerCase() !== sec) return false;
  }
  if (filter.section && item.section.toLowerCase() !== filter.section.toLowerCase()) return false;
  if (filter.brand && item.brand.toLowerCase() !== filter.brand.toLowerCase()) return false;
  if (filter.onlyWithPhoto && !item.hasPhoto) return false;
  if (filter.search && !matchesSearch(item, filter.search)) return false;
  return true;
}

export function queryCatalog(rawFilters = {}) {
  const filter = validateFilter(rawFilters);
  const catalog = loadCatalogFromDisk();
  const filtered = catalog.filter((item) => filterItem(item, filter));
  const localized = filtered.map((item) => ({
    ...item,
    displayName: getTranslation(item.name, filter.lang)
  }));
  return {
    items: localized,
    total: localized.length,
    filters: filter
  };
}
