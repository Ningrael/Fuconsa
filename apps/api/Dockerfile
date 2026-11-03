FROM node:20-alpine

WORKDIR /app

# Copiar configuraciones de dependencias para aprovechar caché de Docker
COPY package.json ./
COPY packages/lib/package.json ./packages/lib/
COPY apps/api/package.json ./apps/api/

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar código y assets de la librería y la API
COPY packages/lib ./packages/lib
COPY apps/api ./apps/api

WORKDIR /app/apps/api

ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0

EXPOSE 4000

CMD ["node", "src/server.js"]
