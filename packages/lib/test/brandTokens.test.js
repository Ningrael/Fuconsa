import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKENS_PATH = resolve(__dirname, '../assets/brand/tokens.json');
const CSS_PATH = resolve(__dirname, '../styles/brand.css');
const LOGO_PATH = resolve(__dirname, '../assets/brand/logo.png');

test('tokens.json exists and contains all required brand tokens', () => {
  assert.ok(existsSync(TOKENS_PATH), 'tokens.json must exist');
  const raw = readFileSync(TOKENS_PATH, 'utf-8');
  const tokens = JSON.parse(raw);

  assert.equal(tokens.style, 'editorial-gastronomico');
  assert.equal(tokens.colors.primary, '#253B91');
  assert.equal(tokens.colors.secondary, '#0284C7');
  assert.equal(tokens.colors.bgScreen, '#F8F9FC');
  assert.equal(tokens.colors.bgPrint, '#FFFFFF');

  assert.equal(tokens.colors.sectors.horeca, '#253B91');
  assert.equal(tokens.colors.sectors.super, '#0284C7');
  assert.equal(tokens.colors.sectors.latinos, '#D97706');
  assert.equal(tokens.colors.sectors.acai, '#5B1B52');

  assert.equal(tokens.typography.numericVariant, 'tabular-nums');
  assert.equal(tokens.print.pageSize, 'A4');
});

test('brand.css contains all required CSS custom properties', () => {
  assert.ok(existsSync(CSS_PATH), 'brand.css must exist');
  const css = readFileSync(CSS_PATH, 'utf-8');

  const requiredVariables = [
    '--brand-primary',
    '--brand-secondary',
    '--brand-bg-screen',
    '--brand-bg-print',
    '--brand-text',
    '--brand-muted',
    '--brand-accent-horeca',
    '--brand-accent-super',
    '--brand-accent-latinos',
    '--brand-accent-acai',
    '--card-radius',
    '--card-border'
  ];

  for (const v of requiredVariables) {
    assert.ok(css.includes(v), `Missing required variable: ${v}`);
  }

  assert.ok(css.includes('tabular-nums'), 'CSS must specify tabular-nums');
  assert.ok(css.includes('@page'), 'CSS must specify @page print size');
  assert.ok(css.includes('@media print'), 'CSS must define print styles');
});

test('Fuconsa brand logo exists and is not empty', () => {
  assert.ok(existsSync(LOGO_PATH), 'logo.png must exist');
  const stats = statSync(LOGO_PATH);
  assert.ok(stats.size > 1000, 'Logo file size must be > 1KB');
});
