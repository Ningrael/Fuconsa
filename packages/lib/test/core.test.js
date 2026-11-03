import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONTACT_INFO,
  generateVCard,
  productSchema,
  catalogFilterSchema,
  validateProduct,
  safeValidateProduct,
  validateCatalog,
  validateFilter,
  t,
  getTranslation,
  paginateCatalog,
  paginateSelection,
  DENSITY_MODES,
  formatPrice,
  formatPricePerUnit,
  formatBoxPrice,
  formatPhone,
  normalizeSearchText
} from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('CONTACT_INFO and generateVCard produce valid commercial contact details', () => {
  assert.equal(CONTACT_INFO.fullName, 'Matías Sosa Marrazzo');
  assert.equal(CONTACT_INFO.email, 'sosamatias@gmail.com');
  assert.ok(CONTACT_INFO.whatsappUrl.includes('34613018609'));
  assert.ok(Object.isFrozen(CONTACT_INFO));

  const vcard = generateVCard();
  assert.ok(vcard.startsWith('BEGIN:VCARD'));
  assert.ok(vcard.includes('FN:Matías Sosa Marrazzo'));
  assert.ok(vcard.includes('TEL;TYPE=CELL,VOICE:+34613018609'));
  assert.ok(vcard.endsWith('END:VCARD'));
});

test('productSchema validates valid product and rejects invalid payloads', () => {
  const sample = {
    id: 'horeca-001',
    channel: 'horeca',
    sector: 'horeca',
    section: 'Pescados',
    brand: 'Fuconsa',
    name: { es: 'Merluza', ca: 'Lluç', en: 'Hake' },
    format: 'Caja 5kg',
    unitPrice: 8.5,
    boxPrice: 42.5,
    priceText: '8,50 €/kg',
    hasPhoto: true,
    imagePath: '/images/merluza.jpg'
  };

  const parsed = validateProduct(sample);
  assert.equal(parsed.id, 'horeca-001');

  const invalid = safeValidateProduct({ id: 'bad' });
  assert.equal(invalid.success, false);

  const filter = validateFilter({ sector: 'horeca', onlyWithPhoto: 'true', lang: 'ca' });
  assert.equal(filter.sector, 'horeca');
  assert.equal(filter.onlyWithPhoto, true);
  assert.equal(filter.lang, 'ca');
});

test('i18n dictionary supports es, ca, en and provides solid fallbacks', () => {
  assert.equal(t('callAction', 'es'), 'Llamar');
  assert.equal(t('callAction', 'ca'), 'Trucar');
  assert.equal(t('callAction', 'en'), 'Call');
  assert.equal(t('callAction', 'de'), 'Llamar');

  const nameObj = { es: 'Pez Espada', ca: 'Peix Espasa', en: 'Swordfish' };
  assert.equal(getTranslation(nameObj, 'ca'), 'Peix Espasa');
  assert.equal(getTranslation(nameObj, 'en'), 'Swordfish');
  assert.equal(getTranslation(nameObj, 'unknown'), 'Pez Espada');
});

test('a4Paginator adapts density for showcase vs high-density and separates non-photo items', () => {
  const items = Array.from({ length: 25 }, (_, i) => ({
    id: `item-${i + 1}`,
    hasPhoto: i < 20,
    name: { es: `Prod ${i + 1}`, ca: `Prod ${i + 1}`, en: `Prod ${i + 1}` }
  }));

  const standard = paginateCatalog(items, { sector: 'horeca', section: 'Mariscos' });
  assert.equal(standard.pages[0].density, DENSITY_MODES.HIGH);
  assert.equal(standard.pages[0].items.length, 12);
  assert.equal(standard.pages[1].items.length, 8);
  assert.equal(standard.pages[2].type, 'table');
  assert.equal(standard.pages[2].items.length, 5);

  const acai = paginateCatalog(items.slice(0, 10), { sector: 'acai', section: 'Polpa Norte' });
  assert.equal(acai.pages[0].density, DENSITY_MODES.SHOWCASE);
  assert.equal(acai.pages[0].items.length, 6);

  const selection = paginateSelection(items.slice(0, 6));
  assert.equal(selection.totalPages, 1);
  assert.equal(selection.pages[0].type, 'selection');
});

test('priceFormatter formats prices, phone numbers and search queries', () => {
  assert.equal(formatPrice(12.5), '12,50 €');
  assert.equal(formatPrice(null), '—');
  assert.equal(formatPricePerUnit(4.2, 'kg'), '4,20 €/kg');
  assert.equal(formatBoxPrice(25), '25,00 €/caja');
  assert.equal(formatPhone('+34613018609'), '+34 613 018 609');
  assert.equal(normalizeSearchText('Açaí Congelado!'), 'acai congelado!');
});

test('validateCatalog validates the complete 762 products from catalog.json', () => {
  const catalogPath = path.resolve(__dirname, '../data/catalog.json');
  const items = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  assert.equal(items.length, 762);
  const validated = validateCatalog(items);
  assert.equal(validated.length, 762);
  assert.ok(validated.every((p) => p.name && p.name.es && p.name.ca && p.name.en));
});

test('dictionary provides all Etapa 5 keys across es, ca and en', () => {
  const keys = ['photoComingSoon', 'offlineNotice', 'retry', 'closePreview', 'printSectionA4', 'errorBoundaryTitle'];
  for (const k of keys) {
    for (const lang of ['es', 'ca', 'en']) {
      const val = t(k, lang);
      assert.ok(val && val !== k, `Missing translation for key ${k} in ${lang}`);
    }
  }
});

test('dictionary provides all Etapa 8 keys across es, ca and en', () => {
  const keys = ['downloadPdf', 'sharePdf', 'generatingPdf', 'coverProposalLabel', 'coverItemsIncluded'];
  for (const k of keys) {
    for (const lang of ['es', 'ca', 'en']) {
      const val = t(k, lang);
      assert.ok(val && val !== k, `Missing translation for key ${k} in ${lang}`);
    }
  }
});
