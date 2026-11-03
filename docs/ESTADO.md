# Estado del Proyecto — Catálogo Comercial Fuconsa

Última actualización: 2026-11-03

---

## 1. Resumen Ejecutivo y Repositorio Oficial

- **Repositorio GitHub:** [https://github.com/Ningrael/Fuconsa](https://github.com/Ningrael/Fuconsa)
- **Ramas:** `main` (despliegue en VPS) y `development` (desarrollo e integración).
- **Cobertura de Pruebas:** 76/76 pruebas automatizadas en verde (100% éxito en `lib`, `api` y `web`).
- **URL Producción VPS:** `http://173.249.14.107/catalogo/` (o `http://173.249.14.107/fuconsa`)
- **Servidores Locales Activos:** API en `http://localhost:4000` y Web en `http://localhost:5173`.

---

## 2. Hitos Completados (Etapas 1 a 8)

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

---

## 3. Instrucciones de Despliegue para OpenClaw (VPS)

Para desplegar o actualizar el catálogo en el servidor VPS de producción:

```bash
# Despliegue inicial:
git clone https://github.com/Ningrael/Fuconsa.git /opt/fuconsa
cd /opt/fuconsa && bash scripts/deploy/deploy-vps.sh

# Actualizaciones continuas:
cd /opt/fuconsa && bash scripts/deploy/deploy-vps.sh
```

El script actualiza el código desde `origin/main`, reconstruye los contenedores, instala `fuconsa.service` en `/etc/systemd/system/` y confirma el healthcheck en `http://localhost:3000/api/health`.
