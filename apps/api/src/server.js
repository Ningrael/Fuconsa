import { createApp } from './app.js';

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

const server = createApp();

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`[Fuconsa API] Servidor activo en http://${HOST}:${PORT}`);
});
