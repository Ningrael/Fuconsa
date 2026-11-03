import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.resolve(REPO_ROOT, 'packages/lib/data/catalog.json');
const ASSETS_DIR = path.resolve(REPO_ROOT, 'packages/lib/assets/products');

function normalizeFormat(str) {
  if (!str) return 'Formato estándar';
  let text = str.trim();
  const pref = text.match(/^(caja|bolsa|estuche|pack|tarrina|bote|lata)\s+/i);
  let prefix = '';
  if (pref) {
    prefix = pref[1].charAt(0).toUpperCase() + pref[1].slice(1).toLowerCase() + ' ';
    text = text.slice(pref[0].length).trim();
  }
  const m = text.match(/^(\d+(?:[.,]\d+)?)\s*(kg|gr|g|ml|cl|l)(?:\s*(x\s*\d+|\(\s*x\s*\d+\s*\)))?$/i);
  if (m) {
    let u = m[2].toLowerCase();
    if (u === 'gr') u = 'g';
    const suf = m[3] ? ' ' + m[3].replace(/\s+/g, ' ') : '';
    return prefix + m[1] + ' ' + u + suf;
  }
  return prefix + text;
}

function extractFromText(text) {
  if (!text) return null;
  let m = text.match(/(?:caja|bolsa|estuche|pack|tarrina|bote|lata)\s+\d+(?:[.,]\d+)?\s*(?:kg|gr|g|ml|cl|l)\b/i);
  if (m) return normalizeFormat(m[0]);

  m = text.match(/\b\d+(?:[.,]\d+)?\s*(?:kg|gr|g|ml|cl|l)\s*(?:x\s*\d+|\(\s*x\s*\d+\s*\))/i);
  if (m) return normalizeFormat(m[0]);

  m = text.match(/\b\d+(?:[.,]\d+)?\s*(?:kg|gr|g|ml|cl|l)(?=[A-Z]|\b|$)/i);
  if (m) return normalizeFormat(m[0]);

  m = text.match(/\b\d+\s*x\s*\d+(?:[.,]\d+)?\s*(?:kg|gr|g|ml|cl|l)\b/i);
  if (m) return normalizeFormat(m[0]);

  m = text.match(/\bx\s*\d+\b/i);
  if (m) return m[0].replace(/\s+/, '').toLowerCase();

  return null;
}

function getCleanFormat(product) {
  const fromTitle = extractFromText(product.name?.es) ||
    extractFromText(product.name?.en) ||
    extractFromText(product.name?.ca);
  if (fromTitle) return fromTitle;

  const fromOld = extractFromText(product.format);
  if (fromOld) return fromOld;

  const unitMatch = product.format.match(/\b(\d+(?:-\d+)?)\s*(?:unidades|unitats|raciones)\b/i);
  if (unitMatch) return unitMatch[1] + ' uds.';

  return 'Formato estándar';
}

function sanitizeItem(item) {
  if (item.name?.en) {
    item.name.en = item.name.en.replace(/\s*\(Fuconsa Selection\)\s*/gi, '').trim();
  }

  if (item.id === 'polpa-norte-acasi-con-guarana' || (item.name?.es && item.name.es.includes('AÇASI'))) {
    item.name.es = item.name.es.replace(/AÇASI/g, 'Açaí');
    item.name.ca = item.name.ca.replace(/AÇASI/g, 'Açaí');
    item.name.en = item.name.en.replace(/AÇASI/g, 'Açaí');
  }

  // Normalizar AÇAI en mayúsculas a la ortografía estándar Açaí
  for (const lang of ['es', 'ca', 'en']) {
    if (item.name?.[lang] && item.name[lang].includes('AÇAI')) {
      item.name[lang] = item.name[lang].replace(/AÇAI/g, 'Açaí');
    }
  }

  if (item.format && /€|iva/i.test(item.format)) {
    item.format = getCleanFormat(item);
  }

  const photoFile = path.join(ASSETS_DIR, item.id + '.webp');
  if (fs.existsSync(photoFile)) {
    item.hasPhoto = true;
    item.imagePath = '/assets/products/' + item.id + '.webp';
  } else {
    item.hasPhoto = false;
    item.imagePath = '/assets/brand/placeholder-product.svg';
  }
}

export function runSanitization() {
  const raw = fs.readFileSync(CATALOG_PATH, 'utf-8');
  const catalog = JSON.parse(raw);

  for (const item of catalog) {
    sanitizeItem(item);
  }

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + '\n', 'utf-8');
  console.log(`[Sanitizer] Saneados correctamente ${catalog.length} productos en ${CATALOG_PATH}`);
}

runSanitization();
