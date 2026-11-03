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
