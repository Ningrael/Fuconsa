import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CATALOG_PATH = path.resolve(__dirname, '../data/catalog.json');
const ASSETS_DIR = path.resolve(__dirname, '../assets/products');

function loadCatalog() {
  assert.ok(fs.existsSync(CATALOG_PATH), 'catalog.json must exist');
  const raw = fs.readFileSync(CATALOG_PATH, 'utf-8');
  const items = JSON.parse(raw);
  assert.ok(Array.isArray(items), 'Catalog must be an array');
  assert.ok(items.length >= 300, `Catalog must have >= 300 items, got ${items.length}`);
  return items;
}

test('1. Catalog file exists and has substantial volume', () => {
  const items = loadCatalog();
  assert.ok(items.length > 0);
});

test('2. 100% of products have valid trilingual names (es, ca, en)', () => {
  const items = loadCatalog();
  for (const item of items) {
    assert.ok(item.name, `Item ${item.id} must have a name object`);
    assert.ok(item.name.es && item.name.es.trim().length > 0, `Item ${item.id} missing ES`);
    assert.ok(item.name.ca && item.name.ca.trim().length > 0, `Item ${item.id} missing CA`);
    assert.ok(item.name.en && item.name.en.trim().length > 0, `Item ${item.id} missing EN`);
  }
});

test('3. Schema contract fields, channels and sectors are valid', () => {
  const items = loadCatalog();
  const validChannels = new Set(['horeca', 'supermercados']);
  const validSectors = new Set(['horeca', 'supermercados', 'latinos', 'acai']);
  for (const item of items) {
    assert.ok(item.id, `Missing id on item`);
    assert.ok(validChannels.has(item.channel), `Invalid channel: ${item.channel}`);
    assert.ok(validSectors.has(item.sector), `Invalid sector: ${item.sector}`);
    assert.ok(item.section, `Item ${item.id} missing section`);
    assert.ok(item.brand, `Item ${item.id} missing brand`);
    assert.ok(typeof item.hasPhoto === 'boolean', `Item ${item.id} hasPhoto must be boolean`);
  }
});

test('4. Price formats and text are valid for all products', () => {
  const items = loadCatalog();
  for (const item of items) {
    assert.ok(item.priceText && item.priceText.trim().length > 0, `Item ${item.id} missing priceText`);
    if (item.unitPrice !== null) {
      assert.ok(typeof item.unitPrice === 'number' && item.unitPrice >= 0, `Item ${item.id} bad unitPrice`);
    }
    if (item.boxPrice !== null) {
      assert.ok(typeof item.boxPrice === 'number' && item.boxPrice >= 0, `Item ${item.id} bad boxPrice`);
    }
  }
});

test('5. Photo files on disk exist and are valid when hasPhoto is true', () => {
  const items = loadCatalog();
  let photosChecked = 0;
  for (const item of items) {
    if (item.hasPhoto) {
      assert.ok(item.imagePath, `Item ${item.id} hasPhoto=true but null imagePath`);
      assert.ok(item.imagePath.startsWith('/assets/products/'), `Item ${item.id} bad path`);
      const filename = path.basename(item.imagePath);
      const filePath = path.join(ASSETS_DIR, filename);
      assert.ok(fs.existsSync(filePath), `Image file missing on disk: ${filePath}`);
      const stats = fs.statSync(filePath);
      assert.ok(stats.size > 500, `Image file too small: ${filePath} (${stats.size}b)`);
      photosChecked++;
    } else {
      assert.equal(
        item.imagePath,
        '/assets/brand/placeholder-product.svg',
        `Item ${item.id} hasPhoto=false must have placeholder-product.svg`
      );
    }
  }
  assert.ok(photosChecked > 100, `Expected at least 100 verified photos, got ${photosChecked}`);
});

test('6. Erratas are thoroughly cleaned up', () => {
  const items = loadCatalog();
  for (const item of items) {
    const full = JSON.stringify(item).toLowerCase();
    assert.ok(!full.includes('dr-oerker'), `Errata dr-oerker found in ${item.id}`);
    assert.ok(!full.includes('ghumitas'), `Errata ghumitas found in ${item.id}`);
    assert.ok(!full.includes('culpa acerola'), `Errata culpa acerola found in ${item.id}`);
    assert.ok(!full.includes('acasi con guarana'), `Errata acasi con guarana found in ${item.id}`);
  }
});
