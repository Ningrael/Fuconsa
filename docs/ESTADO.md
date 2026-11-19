# Estado del Proyecto — Catálogo Comercial Fuconsa

Última actualización: 2026-11-19

---

## 1. Resumen Ejecutivo y Repositorio Oficial

- **Repositorio GitHub:** [https://github.com/Ningrael/Fuconsa](https://github.com/Ningrael/Fuconsa)
- **Ramas:** `main` (despliegue en VPS) y `development` (desarrollo e integración).
- **Cobertura de Pruebas:** 88/88 pruebas automatizadas en verde (100% éxito: `22/22` en `lib`, `12/12` en `api` y `54/54` en `web`).
- **Build de Producción:** `npm run build` (`vite build`) completado sin errores (`620` módulos transformados).
- **URL Producción VPS:** `http://173.249.14.107/catalogo/` (o `http://173.249.14.107/fuconsa`)
- **Servidores Locales Activos:** API en `http://localhost:4000` y Web en `http://localhost:5173`.

---

## 2. Hitos Completados (Etapas 1 a 8 y Rediseño Comercial)

1. **Extracción y Normalización (Etapa 1):** 762 productos clasificados en 4 sectores (Horeca, Supermercados, Latinos, Açaí) con 506 fotografías optimizadas en WebP.
2. **Identidad Visual (Etapa 2):** Tokens de diseño editorial gastronómico, paleta cromática, CSS centralizado y logo oficial.
3. **Librería Central y API (Etapa 3):** Arquitectura cliente ligero, SSOT en `packages/lib`, esquemas de validación y endpoints `/api/health`, `/api/contact` y `/api/catalog`.
4. **Aplicación Web e Impresión A4 (Etapa 4):** Catálogo interactivo con QR, densidad adaptativa A4, tabla compacta sin fotos y Selección a Medida.
5. **Saneamiento y Resiliencia (Etapas 5A y 5B):** Erratas corregidas, placeholder oficial SVG, endpoint de assets, `ErrorBoundary` (*Pantalla Siempre Viva*) e impresión A4 por sección.
6. **Alta Disponibilidad VPS y GitHub (Etapa 6):**
   - Servicio `systemd` (`fuconsa.service`) con arranque automático tras reinicio.
   - `docker-compose.yml` blindado con `restart: always`, healthchecks y rotación de logs.
   - Repositorio público creado en GitHub (`Ningrael/Fuconsa`) con ramas `main` y `development`.
   - Script de arranque unificado `npm run start:local`.
7. **Estudio Fotográfico WebP (Etapa 7):** Recorte y realce de las 506 imágenes de catálogo a `640×480`.
8. **Carátula Comercial A4, Exportación PDF Móvil y Rediseño B2B (Etapa 8):**
   - Carátula Comercial Ejecutiva (`A4CoverSheet.jsx`) en Página 1 de todo documento A4 con QR de alta definición, datos de contacto comercial de Matías Sosa Marrazzo y resumen de líneas de distribución.
   - Exportación y Compartición de PDF A4 en dispositivos móviles vía `pdfGenerator.js` (jsPDF, html2canvas y Web Share API) con fallback instantáneo a descarga.
   - Rediseño editorial B2B Suizo e iconografía vectorial SVG (`Icons.jsx`), portada en doble estado (`cover-landing` vs. `cover-compact`), botones táctiles ergonómicos y accesibilidad WCAG AA.
   - Modularidad estricta (100% de archivos en `apps/web/src` con ≤ 173 líneas) y 75/75 pruebas automatizadas en verde.
9. **Rediseño Comercial Integral en 5 Etapas (2026-11-19):**
   - **SSOT y Cliente Ligero (Etapa 1):** `@fuconsa/lib` centraliza `SECTORS`, `LEADING_BRANDS`, `CORPORATE_STATS` y las 69 claves trilingües (`es`, `ca`, `en`), consumidos directamente por `apps/web` sin duplicación.
   - **Portada QR de Gran Distribuidora (Etapa 2):** Hero ejecutivo con sello `+760`, cinta de grandes marcas, guía en 3 pasos, 4 tarjetas fotográficas de división comercial y modal cristal «Mostrar mi QR».
   - **Catálogo Móvil Ágil (Etapa 3):** Grid de 2 columnas en móvil, código de referencia visible, botón explícito `+ Añadir a PDF` / `✓ En tu PDF` y bandeja inferior cristal esmerilado.
   - **Dossier PDF A4 Líder (Etapa 4):** Portada Ejecutiva en Pág. 1 con tarjeta personal de Matías Sosa Marrazzo y QR, cabeceras interiores con logotipo, fichas con código/formato/precio unidad y caja, y blindaje de captura A4 (`210mm × 297mm`, `windowWidth: 1024`) desde móviles.
   - **Validación y Modularidad (Etapa 5):** Cumplimiento estricto `<= 200` líneas por archivo en el 100% de `packages/lib/src`, `apps/web/src` y suites de prueba modificadas (`<= 40` líneas en todas las funciones/bloques de Etapas 1–5), **88/88** pruebas automatizadas en verde (`22` lib + `12` api + `54` web) y build Vite limpio.

---

## 3. Instrucciones de Despliegue y Edición de Catálogo para Smith (`OpenClaw` en VPS)

Para desplegar o actualizar el catálogo en el servidor VPS de producción (`173.249.14.107` / `/opt/fuconsa`):

```bash
# Despliegue inicial:
git clone https://github.com/Ningrael/Fuconsa.git /opt/fuconsa
cd /opt/fuconsa && bash scripts/deploy/deploy-vps.sh

# Actualizaciones continuas desde GitHub:
cd /opt/fuconsa && bash scripts/deploy/deploy-vps.sh
```

El script actualiza el código desde `origin/main`, reconstruye los contenedores, instala `fuconsa.service` en `/etc/systemd/system/` y confirma el healthcheck en `http://localhost:3000/api/health`.

### Cómo puede Smith modificar precios, productos, fotos o categorías en la VPS

Toda la guía detallada con el esquema JSON exacto y reglas de validación se encuentra en la **Sección 5 de [`AGENTS.md`](../AGENTS.md)**:

1. **Editar `packages/lib/data/catalog.json`:**
   - Modificar `unitPrice`, `boxPrice` y `priceText` para cambios de tarifas (nunca dejar precios en `0.00`).
   - Modificar `name.es`, `name.ca`, `name.en` o `format` para nombres y formatos.
   - Modificar `sector` (`"horeca"`, `"supermercados"`, `"latinos"`, `"acai"`), `channel` (`"horeca"` o `"supermercados"`) y `section` para recategorizar productos.
   - Para fotos: `"hasPhoto": true` con `"imagePath": "/assets/products/<archivo>.webp"` (el archivo debe existir en `packages/lib/assets/products/`), o `"hasPhoto": false` con `"imagePath": "/assets/brand/placeholder-product.svg"`.
2. **Validar, sincronizar con GitHub y publicar en producción:**
   ```bash
   cd /opt/fuconsa
   npm test
   npm run build
   git add packages/lib/data/catalog.json packages/lib/assets/
   git commit -m "chore(catalog): actualización de tarifas y productos por Smith"
   git push origin main
   git push origin main:development
   docker compose up -d --build
   ```
