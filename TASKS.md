# Tareas de Catálogo Comercial Fuconsa (`TASKS.md`)

Las Etapas 1 a 9 iniciales y el Rediseño Comercial en 5 Etapas están completados y verificados con **88/88 pruebas automatizadas en verde** (`22/22` en `lib`, `12/12` en `api` y `54/54` en `web`).

---

## Completadas (Etapas 1 a 8)

- [x] **ETAPA 1:** Extracción de fuente web de origen (`fucon.es`), tarifas Excel y fotos (`762` productos, `506` con fotografía WebP).
- [x] **ETAPA 2:** Identidad Visual base (`logo.png`, `tokens.json`, `brand.css`, `docs/IDENTIDAD_VISUAL.md`).
- [x] **ETAPA 3:** Librería Core (`packages/lib/src/`) y Backend (`apps/api/`).
- [x] **ETAPA 4:** Aplicación Web (`apps/web/`), Impresión A4 y Selección a Medida.
- [x] **ETAPA 5A:** Saneamiento de `catalog.json`, Placeholder Oficial SVG, ruta `/assets/` en API y Docker base.
- [x] **ETAPA 5B:** Frontend con `ErrorBoundary` (*Pantalla Siempre Viva*), tarjetas con logo en productos sin foto e impresión A4 de sección completa.
- [x] **ETAPA 6:** Blindaje de Auto-Arranque en VPS (`fuconsa.service`, `healthchecks` y rotación de logs), Publicación en GitHub (`https://github.com/Ningrael/Fuconsa` en ramas `main` y `development`), Puesta en marcha local en puertos 4000 y 5173, y 68/68 tests en verde.
- [x] **ETAPA 7:** Procesamiento de Estudio Fotográfico en las `506` fotografías WebP (recorte de fondo con canal alfa suave, auto-encuadre uniforme a `640×480` y realce de nitidez/color) + Rediseño Visual Moderno con Atmósfera Dinámica por Mundo, Cabecera Ejecutiva con miniaturas de producto recortadas y Ficha de Producto de alto contraste comercial.
- [x] **ETAPA 8:** Carátula Comercial Ejecutiva A4 con QR en Página 1 (`A4CoverSheet.jsx`), Generación y Compartido directo de PDF A4 en móviles (`pdfGenerator.js` con jsPDF, html2canvas y Web Share API) y Rediseño Editorial B2B Suizo con accesibilidad WCAG AA y **75/75 pruebas en verde**.
- [x] **ETAPA 9:** Despliegue en Producción VPS (`173.249.14.107`), Docker Compose activo con reinicio automático systemd, reverse proxy Nginx en puerto 80 conviviendo con Senda y URL pública verificada en `http://173.249.14.107/catalogo/` con 76/76 tests en verde.

---

## Rediseño Comercial Integral (Etapas 1 a 5 — 2026-11-19)

- [x] **ETAPA 1 (SSOT `@fuconsa/lib`):** Consolidación de `SECTORS`, `LEADING_BRANDS`, `CORPORATE_STATS` y diccionario trilingüe (`es`, `ca`, `en`) en `packages/lib`, conectando `apps/web` mediante re-exports limpios sin lógica duplicada.
- [x] **ETAPA 2 (Portada QR Gran Distribuidora):** Rediseño de `LandingVCard.jsx`, `LandingSectorsShowcase.jsx` y `vcard.css` con sello `+760`, cinta de grandes marcas, guía en 3 pasos, 4 tarjetas fotográficas por división y modal cristal «Mostrar mi QR».
- [x] **ETAPA 3 (Catálogo Móvil 2 Columnas):** Actualización de `ProductCard.jsx`, `productCard.css` y `drawerAndTable.css` con grid móvil de 2 columnas, referencia visible, botón explícito `+ Añadir a PDF` / `✓ En tu PDF` y bandeja cristal esmerilado.
- [x] **ETAPA 4 (Dossier PDF A4 Líder):** Portada Ejecutiva permanente en Pág. 1 (`A4CoverSheet.jsx`) con tarjeta personal de Matías Sosa Marrazzo y QR, cabeceras interiores con logo (`A4PageHeader.jsx`), fichas completas con ref/formato/precio unidad y caja (`A4PrintDocument.jsx`) y blindaje de captura A4 móvil (`pdfGenerator.js`, `print.css`).
- [x] **ETAPA 5 (Pruebas & Auditoría Modular):** Ampliación de pruebas en `core.test.js`, `CoverQRCard.test.jsx`, `A4PrintDocument.test.jsx` y `ProductCard.test.jsx` (**88/88 tests en verde**: `22` lib + `12` api + `54` web), auditoría modular (`<= 200` líneas por archivo) y `npm run build` exitoso.

---

## Buzón de Ideas y Próximas Fases

- [ ] Integración de webhook para despliegues continuos (CI/CD) automáticos en la VPS vía GitHub Actions.
- [ ] Incorporación de métricas de uso y telemetría ligera de descargas de catálogo en formato PDF.
- [ ] Optimización progresiva de carga diferida (lazy loading) avanzada en vistas de impresión con cientos de fotos.
