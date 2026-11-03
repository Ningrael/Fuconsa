# Tareas de Catálogo Comercial Fuconsa (`TASKS.md`)

Las Etapas 1 a 8 están completadas y verificadas con **70/70 pruebas automatizadas en verde**.

---

## Completadas (Etapas 1 a 8)

- [x] **ETAPA 1:** Extracción de `fucon.es`, tarifas Excel y fotos (`762` productos, `506` con fotografía WebP).
- [x] **ETAPA 2:** Identidad Visual base (`logo.png`, `tokens.json`, `brand.css`, `docs/IDENTIDAD_VISUAL.md`).
- [x] **ETAPA 3:** Librería Core (`packages/lib/src/`) y Backend (`apps/api/`).
- [x] **ETAPA 4:** Aplicación Web (`apps/web/`), Impresión A4 y Selección a Medida.
- [x] **ETAPA 5A:** Saneamiento de `catalog.json`, Placeholder Oficial SVG, ruta `/assets/` en API y Docker base.
- [x] **ETAPA 5B:** Frontend con `ErrorBoundary` (*Pantalla Siempre Viva*), tarjetas con logo en productos sin foto e impresión A4 de sección completa.
- [x] **ETAPA 6:** Blindaje de Auto-Arranque en VPS (`fuconsa.service`, `healthchecks` y rotación de logs), Publicación en GitHub (`https://github.com/Ningrael/Fuconsa` en ramas `main` y `development`), Puesta en marcha local en puertos 4000 y 5173, y 68/68 tests en verde.
- [x] **ETAPA 7:** Procesamiento de Estudio Fotográfico en las `506` fotografías WebP (recorte de fondo con canal alfa suave, auto-encuadre uniforme a `640×480` y realce de nitidez/color) + Rediseño Visual Moderno con Atmósfera Dinámica por Mundo, Cabecera Ejecutiva con miniaturas de producto recortadas y Ficha de Producto de alto contraste comercial.
- [x] **ETAPA 8:** Transformación Gourmet B2B de Alto Impacto:
  - Eliminación total de fondos de fango/marrón oscuro; implantación del Azul Marino Fuconsa institucional inmutable (`#0F2342`) y fondo blanco luminoso editorial.
  - Eliminación de slugs técnicos internos de base de datos (`productos-latinos-...`) en las fichas de producto.
  - Tarjetas de producto de nivel Michelin con fotografía destacada, tipografía nítida y botón táctil ergonómico de 44px.
  - Barra de herramientas ágil y despejada (sin controles redundantes ni sobrecarga de opciones).
  - Portada ejecutiva y carátula comercial nítida de 1 página con QR para Matías Sosa.
  - 100% de cumplimiento en límites estrictos de modularidad (todos los archivos de `apps/web/src` con ≤ 182 líneas).
  - 70/70 pruebas en verde y sincronización en GitHub (`main` y `development`).

---

## Buzón de Ideas y Próximas Fases

- [ ] Integración de webhook para despliegues continuos (CI/CD) automáticos en la VPS vía GitHub Actions.
- [ ] Incorporación de métricas de uso y telemetría ligera de descargas de catálogo en formato PDF.
- [ ] Optimización progresiva de carga diferida (lazy loading) avanzada en vistas de impresión con cientos de fotos.
