# Instrucciones para Catálogo Comercial Fuconsa (`AGENTS.md`)

Este documento es normativo para cualquier agente (**Antigravity**, **OpenClaw**, **Codex**) que opere sobre el repositorio de **Fuconsa**.

---

## 1. Arquitectura y Reglas Estrictas de Desarrollo

### 1.1 Librería Central como Única Fuente de Verdad (`packages/lib` - SSOT)
- Toda estructura de datos, esquema de validación, catálogo normalizado de productos, diccionario de traducciones (`es`, `ca`, `en`), formateadores de precios, reglas de paginación A4 y tokens de diseño visual deben residir centralizados en `packages/lib`.
- **Prohibido duplicar lógica o datos:** ni el frontend ni el backend pueden definir reglas de negocio, constantes de contacto, cálculos de tarifas o estilos maestros por su cuenta; todo debe importarse desde `packages/lib`.

### 1.2 Separación Estricta Frontend y Backend (Cliente Ligero)
- **Frontend (`apps/web`):** se limita estrictamente a la presentación visual, interacción de usuario y maquetación de impresión A4 consumiendo contratos ya validados.
- **Backend (`apps/api`):** gestiona la lectura/escritura segura de tarifas, validación estricta de paquetes de entrada/salida, filtrado de catálogo y generación/actualización de datos.
- **Resiliencia de interfaz (Pantalla Siempre Viva):** ningún fallo de red o del servidor puede dejar la pantalla en blanco; la interfaz debe conservar el estado previo, informar con claridad y permitir reintentar.

### 1.3 Límites Estrictos de Modularidad (≤ 200 / ≤ 40 líneas)
- **Módulos y archivos:** máximo **200 líneas** por archivo.
- **Funciones, utilidades y componentes atómicos:** máximo **40 líneas** por función/bloque.
- Cada archivo y función debe cumplir una única responsabilidad bien definida. Cualquier cálculo o transformación común se extrae a `packages/lib`.

### 1.4 Testing Obligatorio en Cada Desarrollo
- **Cero entregas sin tests:** toda función de `packages/lib`, endpoint de `apps/api` y componente/flujo de `apps/web` debe contar con pruebas unitarias o de integración automatizadas.
- Queda prohibido dar por terminada una tarea si existen fallos en consola, errores de compilación o pruebas rotas (`npm test` debe pasar al 100%). Prohibido alterar o borrar tests para simular una validación exitosa.

### 1.5 Seguridad y Custodia de Secretos
- Prohibido escribir claves, tokens, credenciales o rutas privadas en el código fuente o en el cliente frontend. Toda configuración sensible reside en variables de entorno (`.env`) fuera del control de versiones.

---

## 2. Flujo Git y Sincronización (`Antigravity` ↔ GitHub `Ningrael` ↔ `OpenClaw`)

- **Repositorio como fuente única de verdad:** ningún cambio se despliega en la VPS sin estar previamente sincronizado y probado en GitHub (`Ningrael`).
- **Jerarquía de ramas:**
  - `main`: producción estable en la VPS (cero commits directos).
  - `development`: rama de integración activa (base de todas las ramas de trabajo).
  - `feature/<nombre>`, `fix/<nombre>`, `chore/<nombre>`: ramas por tarea verificable, integradas mediante Pull Request y *Squash-Merge* tras pasar el 100% de los tests.
- **Disciplina en `TASKS.md`:** trabaja una sola tarea verificable a la vez, registra ideas nuevas en el buzón y marca `[x]` únicamente después de ejecutar y comprobar sus pruebas.

---

## 3. Reglas de Dominio Fuconsa

- **Trilingüe con Español por defecto:** toda clave de texto e información de producto debe soportar Español (`es`, idioma inicial por defecto), Catalán (`ca`) e Inglés (`en`).
- **Contacto comercial inmutable:** los datos de **Matías Sosa Marrazzo** (`+34 613 018 609` / `sosamatias@gmail.com`) se consumen desde `packages/lib` en la portada QR, cabeceras A4 y hojas de selección a medida.
- **Fidelidad Editorial A4:** respeta los tokens de estilo definidos en [`docs/PROYECTO.md`](docs/PROYECTO.md) (diseño limpio editorial, sin clichés de IA, números tabulares en precios y densidad adaptativa en páginas A4).

---

## 4. Contexto según la tarea

- Para uso y comandos del monorepo, consulta [README.md](README.md).
- Para alcance, arquitectura y guía visual, consulta [PROYECTO.md](docs/PROYECTO.md).
- Para la tarea activa y planificación, consulta [TASKS.md](TASKS.md).
- Para el estado entre sesiones, consulta [ESTADO.md](docs/ESTADO.md).

---

## 5. Guía Operativa para Smith (`OpenClaw` en la VPS): Edición de Precios, Productos y Categorías

Esta sección está diseñada específicamente para **Smith (OpenClaw / Clawbot)** operando en la VPS (`/opt/fuconsa`) cuando Matías solicite modificar precios, añadir/quitar productos, cambiar nombres, formatos, fotos o categorías.

### 5.1 Ubicación de la Única Fuente de Verdad del Catálogo
- **Archivo maestro de productos y tarifas:** `packages/lib/data/catalog.json`
- **Fotografías de productos (`.webp`):** `packages/lib/assets/products/`
- **Logotipos oficiales de marcas (`.svg` / `.png`):** `packages/lib/assets/brands/`
- **Imagen por defecto para productos sin foto:** `/assets/brand/placeholder-product.svg` (`packages/lib/assets/brand/placeholder-product.svg`)

> **Importante:** Nunca edites productos en el frontend (`apps/web`) ni en el backend (`apps/api`). Tanto la API como la web y el generador PDF A4 leen automáticamente desde `packages/lib/data/catalog.json`.

### 5.2 Estructura Exacta de un Producto en `packages/lib/data/catalog.json`
El archivo `catalog.json` tiene la forma `{ "meta": { ... }, "items": [ ... ] }`. Cada elemento dentro de `"items"` debe cumplir estrictamente este contrato JSON:

```json
{
  "id": "fripozo-tequenos-12x1kg",
  "channel": "horeca",
  "sector": "horeca",
  "section": "Platos precocinados",
  "brand": "Fripozo",
  "name": {
    "es": "TEQUEÑOS",
    "ca": "TEQUEÑOS",
    "en": "TEQUEÑOS"
  },
  "format": "12x1kg",
  "unitPrice": 9.95,
  "boxPrice": null,
  "priceText": "9.95 €",
  "hasPhoto": true,
  "imagePath": "/assets/products/tequenos-30g.webp"
}
```

### 5.3 Reglas de Validación Obligatorias (Testeadas por `npm test`)
Si alguno de estos campos no respeta estas reglas, `npm test` fallará y bloqueará el despliegue:

1. **`id`** *(string único, sin espacios)*: identificador en minúsculas separado por guiones (`marca-nombre-formato`). No se muestra al cliente final, pero debe ser único.
2. **`channel`** *(string)*: solo acepta `"horeca"` o `"supermercados"`.
   - Usa `"horeca"` para productos de `sector`: `"horeca"`, `"latinos"` o `"acai"`.
   - Usa `"supermercados"` para productos de `sector`: `"supermercados"`.
3. **`sector`** *(string)*: define la pestaña principal del catálogo. Solo acepta uno de estos 4 valores:
   - `"horeca"` — Hostelería y restauración
   - `"supermercados"` — Grandes marcas de retail/supermercado
   - `"latinos"` — Productos Latinos
   - `"acai"` — Mundo Açaí / Polpa Norte (exclusivo para Polpa Norte; no mezclar en Horeca)
4. **`section`** *(string)*: define la subcategoría o familia dentro del sector:
   - Si `sector === "horeca"`: `"Pescado y marisco"`, `"Verduras"`, `"Frutas y purés"`, `"Platos precocinados"`.
   - Si `sector === "supermercados"`: `"Ben & Jerry's"`, `"Buitoni"`, `"Delfín"`, `"Dr. Oetker"`, `"Frigo"`, `"Fripozo"`, `"Häagen-Dazs"`, `"JV"`, `"Maheso"`, `"Nestlé"`.
   - Si `sector === "latinos"`: `"Productos latinos"`.
   - Si `sector === "acai"`: `"Açaí"`.
5. **`name`** *(objeto trilingüe)*: siempre debe incluir las 3 claves `"es"`, `"ca"` y `"en"` con texto limpio (sin guiones tipo slug).
6. **Precios (`unitPrice`, `boxPrice`, `priceText`)**:
   - `unitPrice`: número decimal positivo (ej. `7.5` o `10.50`). **Prohibido dejar precios a `0` o `null`** (el test de integridad rechaza tarifas `0.00 €`).
   - `boxPrice`: número decimal positivo si tiene precio por caja (ej. `40.59`), o `null` si no aplica.
   - `priceText`: texto formateado que se muestra en la tarjeta y en el PDF. Ejemplos:
     - Solo unidad/kg: `"7.50 €/ud"`, `"10.50 €/kg"` o `"3.95 €"`.
     - Unidad + caja: `"7.15 €/kg · 40,59 €/caja"` o `"7.50 €/ud · 7,15 €/caja"`.
7. **Fotografías (`hasPhoto` e `imagePath`)**:
   - **Con foto (`"hasPhoto": true`)**: el archivo físico DEBE existir en `packages/lib/assets/products/<archivo>.webp` y `"imagePath"` debe ser `"/assets/products/<archivo>.webp"`.
   - **Sin foto (`"hasPhoto": false`)**: `"imagePath"` DEBE ser exactamente `"/assets/brand/placeholder-product.svg"`.

### 5.4 Recetas Rápidas para Smith ante Peticiones de Matías

- **Cambiar el precio de un producto:**
  1. Busca el producto por nombre en `packages/lib/data/catalog.json`.
  2. Actualiza `unitPrice`, `boxPrice` (si aplica) y `priceText` (manteniendo el formato `"X.XX €"` o `"X.XX €/ud · Y,YY €/caja"`).
- **Mover un producto de categoría:**
  1. Cambia `sector`, `channel` y `section` según la tabla de la sección 5.3.
- **Quitar una foto errónea de un producto:**
  1. Pon `"hasPhoto": false` y `"imagePath": "/assets/brand/placeholder-product.svg"`.
- **Poner una foto nueva a un producto:**
  1. Guarda la imagen en formato `.webp` (`640x480` recomendado) dentro de `packages/lib/assets/products/nombre-archivo.webp`.
  2. En el producto dentro de `catalog.json`, pon `"hasPhoto": true` y `"imagePath": "/assets/products/nombre-archivo.webp"`.

### 5.5 Flujo Obligatorio de Verificación, GitHub y Despliegue en VPS para Smith
Cada vez que Smith modifique `packages/lib/data/catalog.json` o cualquier activo en `/opt/fuconsa`, debe ejecutar estos pasos en orden:

```bash
cd /opt/fuconsa

# 1. Ejecutar las 88 pruebas automatizadas (verifica que no haya fotos rotas, precios a 0 ni esquemas inválidos)
npm test

# 2. Compilar el frontend de producción para confirmar que no hay errores de build
npm run build

# 3. Guardar y subir los cambios a GitHub (manteniendo main y development sincronizadas)
git add packages/lib/data/catalog.json packages/lib/assets/
git commit -m "chore(catalog): actualización de tarifas y productos por Smith"
git push origin main
git push origin main:development

# 4. Reconstruir y reiniciar el contenedor en producción
docker compose up -d --build

# 5. Verificar salud del servicio en vivo
curl -fsS http://localhost:3000/api/health
```

