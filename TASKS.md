# Tareas de Catálogo Comercial Fuconsa (`TASKS.md`)

Las Etapas 1 a 5B están completadas y verificadas con **65/65 pruebas automatizadas en verde**. A continuación se define la **ETAPA 6** para ser ejecutada por un agente **Gemini 3.8 Flash**.

---

## Completadas (Etapas 1 a 5B)

- [x] **ETAPA 1:** Extracción de `fucon.es`, tarifas Excel y fotos (`762` productos, `506` con fotografía WebP).
- [x] **ETAPA 2:** Identidad Visual base (`logo.png`, `tokens.json`, `brand.css`, `docs/IDENTIDAD_VISUAL.md`).
- [x] **ETAPA 3:** Librería Core (`packages/lib/src/`) y Backend (`apps/api/`).
- [x] **ETAPA 4:** Aplicación Web (`apps/web/`), Impresión A4 y Selección a Medida.
- [x] **ETAPA 5A:** Saneamiento de `catalog.json`, Placeholder Oficial SVG, ruta `/assets/` en API y Docker base.
- [x] **ETAPA 5B:** Frontend con `ErrorBoundary` (*Pantalla Siempre Viva*), tarjetas con logo en productos sin foto e impresión A4 de sección completa.

---

## En curso (Ejecutar ahora con Agente Gemini 3.8 Flash)

### [ ] ETAPA 6: Blindaje de Auto-Arranque en VPS, Publicación en GitHub (`Ningrael/Fuconsa`) y Puesta en Marcha Local

> **INSTRUCCIÓN PARA EL AGENTE 3.8 FLASH:**
> Ejecuta los siguientes **4 bloques en orden estricto**, respetando **≤ 200 líneas por archivo** y **≤ 40 líneas por función**.

#### 1. Blindaje de Alta Disponibilidad y Auto-Arranque tras Reinicio de VPS (`docker-compose.yml` y `scripts/deploy/`)
- En [`docker-compose.yml`](docker-compose.yml):
  - Asegurar que tanto `api` como `web` tengan `restart: always`.
  - Añadir `healthcheck` en el servicio `api` (`CMD ["wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:4000/api/health"]`, `interval: 30s`, `timeout: 5s`, `retries: 3`) y en el servicio `web` (`CMD ["wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:80/"]`, `interval: 30s`, `timeout: 5s`, `retries: 3`).
  - Configurar `depends_on: api: condition: service_healthy` en `web` y rotación de logs (`max-size: "10m"`, `max-file: "3"`) en ambos contenedores para no saturar el disco de la VPS.
- Crear [`scripts/deploy/fuconsa.service`](scripts/deploy/fuconsa.service):
  - Unidad oficial de `systemd` (`After=network-online.target docker.service`, `Requires=docker.service`, `Restart=always`, `RestartSec=10`, `WantedBy=multi-user.target`) que ejecuta `docker compose up -d --build` al iniciar el servidor.
- Actualizar [`scripts/deploy/deploy-vps.sh`](scripts/deploy/deploy-vps.sh):
  - Script idempotente para OpenClaw que:
    1. Hace `git pull origin main`.
    2. Levanta los contenedores con `docker compose up -d --build --remove-orphans`.
    3. Instala y activa `fuconsa.service` en `/etc/systemd/system/fuconsa.service` (`systemctl daemon-reload && systemctl enable docker && systemctl enable fuconsa.service`) para garantizar que si la VPS se apaga o reinicia, el catálogo vuelva a encenderse solo automáticamente.
    4. Comprueba `http://localhost:3000/api/health` tras levantar.
- Crear test automatizado en `packages/lib/test/deployConfig.test.js` que verifique que `docker-compose.yml` contiene `restart: always`, `healthcheck` en ambos servicios y que `scripts/deploy/fuconsa.service` existe y tiene `WantedBy=multi-user.target`.

#### 2. Inicialización Git y Publicación en GitHub (`Ningrael/Fuconsa`)
- Crear `.gitignore` en la raíz excluyendo `node_modules/`, `dist/`, `.env`, `*.log`, `*.tmp*`, `__pycache__/`, `.audit-cache/`.
- Inicializar Git en `D:\Proyectos programas propios\Fuconsa` (`git init`), configurar rama principal `main`, realizar el commit inicial con todo el proyecto verificado, crear también la rama `development`, crear el repositorio en GitHub mediante GitHub CLI (`gh repo create Ningrael/Fuconsa --public --source=. --remote=origin --push` o `--private` si aplica, y subir tanto `main` como `development`: `git push -u origin main && git push -u origin development`).

#### 3. Encendido del Servidor Local para Revisión Visual en Vivo
- Añadir en el `package.json` raíz un script `"start:local"` o levantar en segundo plano el servidor `apps/api` (puerto `4000`) y `apps/web` (puerto `5173`) verificando que `http://localhost:5173` y `http://localhost:4000/api/catalog` responden con los 762 productos y las imágenes reales.

#### 4. Cierre Documental
- Ejecutar `npm test` en los 3 paquetes verificando 100% en verde.
- Marcar `[x] ETAPA 6` en `TASKS.md`, actualizar `README.md` y `docs/ESTADO.md` con la URL del repositorio en GitHub y el comando exacto para que OpenClaw lo despliegue en la VPS.
