import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

let server;
let baseUrl;

before(() => {
  return new Promise((resolve) => {
    server = createApp();
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

test('GET /api/health devuelve 200 con estado ok y uptime', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, 'ok');
  assert.equal(typeof data.uptime, 'number');
  assert.ok(data.timestamp);
});

test('GET /api/contact devuelve JSON con datos comerciales de Matías Sosa', async () => {
  const res = await fetch(`${baseUrl}/api/contact`);
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.fullName, 'Matías Sosa Marrazzo');
  assert.equal(json.data.phoneDisplay, '+34 613 018 609');
  assert.ok(json.data.whatsappUrl.includes('34613018609'));
});

test('GET /api/contact?format=vcf devuelve archivo vCard adjunto', async () => {
  const res = await fetch(`${baseUrl}/api/contact?format=vcf`);
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type')?.includes('text/vcard'));
  assert.ok(res.headers.get('content-disposition')?.includes('matias-sosa-fuconsa.vcf'));
  const body = await res.text();
  assert.ok(body.includes('BEGIN:VCARD'));
  assert.ok(body.includes('FN:Matías Sosa Marrazzo'));
  assert.ok(body.includes('END:VCARD'));
});

test('GET /api/contact/vcf también descarga la tarjeta de contacto', async () => {
  const res = await fetch(`${baseUrl}/api/contact/vcf`);
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type')?.includes('text/vcard'));
});

test('GET /api/catalog responde con catálogo completo y filtros aplicados', async () => {
  const res = await fetch(`${baseUrl}/api/catalog`);
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.ok(json.total > 0);
  assert.ok(Array.isArray(json.data));
});

test('GET /api/catalog filtra por sector y respeta onlyWithPhoto', async () => {
  const resSector = await fetch(`${baseUrl}/api/catalog?sector=acai`);
  const jsonSector = await resSector.json();
  assert.ok(jsonSector.data.length > 0);
  assert.ok(jsonSector.data.every((item) => item.sector === 'acai'));

  const resPhotos = await fetch(`${baseUrl}/api/catalog?onlyWithPhoto=true`);
  const jsonPhotos = await resPhotos.json();
  assert.ok(jsonPhotos.data.length > 0);
  assert.ok(jsonPhotos.data.every((item) => item.hasPhoto === true));
});

test('GET /api/catalog filtra por búsqueda y traduce displayName', async () => {
  const res = await fetch(`${baseUrl}/api/catalog?search=guarana&lang=ca`);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.ok(json.data.length > 0);
  assert.ok(json.data[0].displayName.includes('Açaí'));
});

test('GET /api/catalog rechaza parámetros inválidos con código 400', async () => {
  const res = await fetch(`${baseUrl}/api/catalog?lang=idioma_invalido`);
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.equal(json.success, false);
});

test('Ruta inexistente devuelve 404 y método incorrecto 405', async () => {
  const res404 = await fetch(`${baseUrl}/api/desconocida`);
  assert.equal(res404.status, 404);

  const res405 = await fetch(`${baseUrl}/api/catalog`, { method: 'POST' });
  assert.equal(res405.status, 405);
});

test('GET /assets/brand/logo.png sirve el logotipo oficial de Fuconsa con tipo PNG', async () => {
  const res = await fetch(`${baseUrl}/assets/brand/logo.png`);
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type')?.includes('image/png'));
  const buf = await res.arrayBuffer();
  assert.ok(buf.byteLength > 100);
});

test('GET /assets/brand/placeholder-product.svg sirve el SVG oficial de placeholder', async () => {
  const res = await fetch(`${baseUrl}/assets/brand/placeholder-product.svg`);
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type')?.includes('image/svg+xml'));
  const text = await res.text();
  assert.ok(text.includes('<svg'));
  assert.ok(text.includes('FUCONSA'));
  assert.ok(text.includes('Imagen en preparación'));
});

test('GET /assets gestiona 404 para archivos inexistentes y bloquea traversal', async () => {
  const resMissing = await fetch(`${baseUrl}/assets/brand/no-existe.webp`);
  assert.equal(resMissing.status, 404);

  const resTraversal = await fetch(`${baseUrl}/assets/../package.json`);
  assert.equal(resTraversal.status, 404);
});
