# Tareas de Catálogo Comercial Fuconsa (`TASKS.md`)

Las Etapas 1 a 8 están completadas y verificadas con **69/69 pruebas automatizadas en verde**.

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
- [x] **ETAPA 8:** Rediseño Editorial B2B Suizo, sustitución integral de emojis por iconografía vectorial SVG (`Icons.jsx`), portada en doble estado (escaparate completo vs. modo compacto al navegar), botón táctil ergonómico `48×48 px` y accesibilidad WCAG AA (`alt` localizado y contraste certificado) con **69/69 pruebas en verde**.

---

## Buzón de Ideas y Próximas Fases

- [ ] Integración de webhook para despliegues continuos (CI/CD) automáticos en la VPS vía GitHub Actions.
- [ ] Incorporación de métricas de uso y telemetría ligera de descargas de catálogo en formato PDF.
- [ ] Optimización progresiva de carga diferida (lazy loading) avanzada en vistas de impresión con cientos de fotos.
