import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function serveLibAssetsPlugin() {
  const assetsDir = path.resolve(__dirname, '../../packages/lib/assets');
  return {
    name: 'serve-lib-assets',
    configureServer(server) {
      server.middlewares.use('/assets', (req, res, next) => {
        const cleanUrl = (req.url || '').split('?')[0];
        const filePath = path.join(assetsDir, cleanUrl);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes = {
            '.webp': 'image/webp',
            '.png': 'image/png',
            '.svg': 'image/svg+xml',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg'
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveLibAssetsPlugin()],
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.resolve(__dirname, '../../packages/lib/assets')
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/assets': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js'
  }
});
