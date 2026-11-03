import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = Object.freeze({
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json'
});

export function resolveAssetsBaseDir() {
  const candidates = [
    path.resolve(__dirname, '../../../../packages/lib/assets'),
    path.resolve(__dirname, '../../../packages/lib/assets'),
    path.resolve(process.cwd(), 'packages/lib/assets'),
    path.resolve(process.cwd(), '../packages/lib/assets')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function resolveFilePath(pathname, baseDir) {
  const relative = pathname.replace(/^\/assets\/?/, '');
  const normalized = path.normalize(relative).replace(/^(\.\.(\/|\\|$))+/, '');
  const absolute = path.resolve(baseDir, normalized);
  if (!absolute.startsWith(baseDir)) return null;
  return absolute;
}

export function handleAssets(req, res, pathname) {
  const baseDir = resolveAssetsBaseDir();
  const filePath = resolveFilePath(pathname, baseDir);

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Activo no encontrado' }));
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no válida' }));
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': 'public, max-age=86400'
  });
  fs.createReadStream(filePath).pipe(res);
}
