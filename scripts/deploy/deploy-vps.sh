#!/usr/bin/env bash
set -euo pipefail

echo "==> Iniciando despliegue de Catálogo Comercial Fuconsa..."

if ! command -v docker >/dev/null 2>&1; then
  echo "Error: Docker no está instalado en este sistema." >&2
  exit 1
fi

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${APP_DIR}"

echo "==> 1. Sincronizando repositorio con rama main..."
if [ -d .git ]; then
  git pull origin main
fi

echo "==> 2. Levantando contenedores con Docker Compose..."
docker compose up -d --build --remove-orphans

echo "==> 3. Configurando auto-arranque continuo con systemd..."
if [ -d /etc/systemd/system ] && command -v systemctl >/dev/null 2>&1; then
  cp "${APP_DIR}/scripts/deploy/fuconsa.service" /etc/systemd/system/fuconsa.service
  sed -i "s|WorkingDirectory=.*|WorkingDirectory=${APP_DIR}|g" /etc/systemd/system/fuconsa.service || true
  systemctl daemon-reload
  systemctl enable docker
  systemctl enable fuconsa.service
  echo "==> fuconsa.service habilitado para auto-arranque tras reinicios."
else
  echo "==> Advertencia: systemctl no disponible. Omitiendo registro de servicio systemd."
fi

echo "==> 4. Verificando healthcheck en http://localhost:3000/api/health..."
MAX_ATTEMPTS=15
ATTEMPT=0
HEALTH_URL="http://localhost:3000/api/health"

until [ "${ATTEMPT}" -ge "${MAX_ATTEMPTS}" ]; do
  HTTP_CODE=""
  if command -v curl >/dev/null 2>&1; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${HEALTH_URL}" || true)
  else
    HTTP_CODE=$(wget --spider --server-response "${HEALTH_URL}" 2>&1 | awk '/HTTP\// {print $2}' | tail -n1 || true)
  fi

  if [ "${HTTP_CODE}" = "200" ]; then
    echo "==> Healthcheck confirmado (HTTP 200). Fuconsa operativo en http://localhost:3000"
    exit 0
  fi

  ATTEMPT=$((ATTEMPT + 1))
  echo "Esperando respuesta de salud (${ATTEMPT}/${MAX_ATTEMPTS})..."
  sleep 2
done

echo "Error: Fuconsa no respondió al healthcheck en ${HEALTH_URL}" >&2
exit 1
