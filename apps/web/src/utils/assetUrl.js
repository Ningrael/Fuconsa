/**
 * Resuelve una ruta relativa al BASE_URL configurado en Vite.
 * Permite que la app funcione tanto en la raíz '/' como bajo subdirectorios como '/catalogo/'.
 *
 * @param {string} path - Ruta relativa o absoluta de asset o endpoint API.
 * @returns {string} - Ruta con el prefijo base correspondiente.
 */
export function withBase(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
