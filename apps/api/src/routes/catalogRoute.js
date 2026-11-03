import { queryCatalog } from '../data/catalogRepository.js';

export function handleCatalog(req, res, query = {}) {
  try {
    const result = queryCatalog(query);
    const payload = {
      success: true,
      total: result.total,
      filters: result.filters,
      data: result.items
    };
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
  } catch (err) {
    const errorPayload = {
      success: false,
      error: err.message || 'Error al consultar el catálogo'
    };
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(errorPayload));
  }
}
