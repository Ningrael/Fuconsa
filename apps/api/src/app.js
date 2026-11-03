import http from 'node:http';
import { handleHealth } from './routes/healthRoute.js';
import { handleContact } from './routes/contactRoute.js';
import { handleCatalog } from './routes/catalogRoute.js';
import { handleAssets } from './routes/assetsRoute.js';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

export function requestHandler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Método no permitido' }));
    return;
  }
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const query = Object.fromEntries(url.searchParams.entries());

  if (pathname === '/api/health') return handleHealth(req, res);
  if (pathname === '/api/contact' || pathname === '/api/contact/vcf' || pathname === '/api/contact.vcf') {
    return handleContact(req, res, query, pathname);
  }
  if (pathname === '/api/catalog') return handleCatalog(req, res, query);
  if (pathname.startsWith('/assets/')) return handleAssets(req, res, pathname);

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
}

export function createApp() {
  return http.createServer(requestHandler);
}
