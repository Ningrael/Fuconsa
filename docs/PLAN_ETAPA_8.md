# Plan de Implementación — Etapa 8: Carátula Comercial A4 con QR, Exportación PDF Móvil y Puesta en Producción en VPS

## Objetivo
Completar la **Etapa 8** del Catálogo Comercial Fuconsa preservando intacto el rediseño visual B2B reciente (`commit 629514e`) y añadiendo tres capacidades críticas:
1. **Carátula Comercial Ejecutiva Obligatoria (`A4CoverSheet.jsx`) en la Página 1 de todo PDF / A4:** Muestra el logo de Fuconsa, los datos de **Matías Sosa Marrazzo** (`+34 613 018 609`, WhatsApp, email), el resumen de las 4 divisiones y el **código QR en gran formato** para abrir la web interactiva.
2. **Descarga y Compartido Directo de PDF A4 en Móvil (`pdfGenerator.js`):** Botones `📥 Descargar PDF` y `📲 Compartir PDF` (con *Web Share API* para enviar el archivo `.pdf` por WhatsApp en 1 toque).
3. **Despliegue Definitivo en la VPS (`scripts/deploy/deploy-vps.sh`):** Sincronización en GitHub (`development` y `main`) y despliegue automatizado con Docker Compose + `systemd`.

---

## Pasos Técnicos Detallados

### 1. Diccionario Trilingüe
- Actualizar `apps/web/src/i18n/translations.js` y `packages/lib/src/i18n/dictionary.js` añadiendo:
  - `downloadPdf`: `{ es: '📥 Descargar PDF', ca: '📥 Descarregar PDF', en: '📥 Download PDF' }`
  - `sharePdf`: `{ es: '📲 Compartir PDF', ca: '📲 Compartir PDF', en: '📲 Share PDF' }`
  - `generatingPdf`: `{ es: '⏳ Generando PDF...', ca: '⏳ Generant PDF...', en: '⏳ Generating PDF...' }`
  - `coverProposalLabel`: `{ es: 'PROPUESTA COMERCIAL Y SELECCIÓN DE PRODUCTOS', ca: 'PROPOSTA COMERCIAL I SELECCIÓ DE PRODUCTES', en: 'COMMERCIAL PROPOSAL & PRODUCT SELECTION' }`
  - `coverItemsIncluded`: `{ es: 'referencias seleccionadas en este documento', ca: 'referències seleccionades en aquest document', en: 'selected items included in this document' }`

### 2. Carátula Comercial en Página 1 (`apps/web/src/components/A4CoverSheet.jsx`)
- Crear `apps/web/src/components/A4CoverSheet.jsx` (`≤ 120 líneas`, funciones `≤ 40 líneas`).
- Renderiza `<section className="a4-sheet a4-cover-sheet">` como la **primera hoja `.a4-sheet`** dentro de `.print-container`.
- Consume `CONTACT_INFO` (`../constants/contact.js`), `SECTORS` (`../constants/sectors.js`) y `t` (`../i18n/translations.js`).
- Genera el código QR en alta resolución (`QRCode.toDataURL(currentUrl, { width: 320, margin: 1 })`) apuntando a la web para que `html2canvas` y `window.print()` lo incluyan con total nitidez.
- Añadir al final de `apps/web/src/styles/main.css` las reglas `.a4-cover-sheet` sin modificar el CSS existente.

### 3. Generador y Compartidor de PDF A4 (`apps/web/src/utils/pdfGenerator.js`)
- Instalar `jspdf` y `html2canvas` en `@fuconsa/web`:
  `npm install jspdf html2canvas --workspace=@fuconsa/web`
- Crear `apps/web/src/utils/pdfGenerator.js` (`≤ 100 líneas`, funciones `≤ 40 líneas`):
  - `buildA4PdfFile(containerEl, filename)`: captura todas las hojas `.a4-sheet` (Página 1 = `A4CoverSheet`, Páginas `2..N` = `A4Page`) con `html2canvas` (`scale: 2`, `useCORS: true`, `backgroundColor: '#ffffff'`) y ensambla el PDF A4 vertical (`210 × 297 mm`).
  - `downloadA4Pdf(containerEl, filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf')`: descarga el `.pdf` en el dispositivo.
  - `shareOrDownloadA4Pdf(containerEl, filename = 'Seleccion-Fuconsa-Matias-Sosa.pdf', title = 'Catálogo Fuconsa - Matías Sosa')`: comparte el `.pdf` vía `navigator.share({ files: [file] })` en móvil o descarga como fallback.
- Actualizar `apps/web/src/components/A4PrintDocument.jsx` para incluir `<A4CoverSheet lang={lang} title={title} totalItems={items.length} />` antes de `result.pages.map(...)` y añadir los botones `📥 Descargar PDF` y `📲 Compartir PDF` en `A4Controls`.

### 4. Verificación y Despliegue
- Crear `apps/web/test/pdfGenerator.test.js` y actualizar `apps/web/test/A4PrintDocument.test.jsx`.
- Ejecutar `npm test` y `npm run build` (100% pasando).
- Actualizar `TASKS.md` y `docs/ESTADO.md`, hacer commit/push a `development` y `main`, y ejecutar `scripts/deploy/deploy-vps.sh`.
