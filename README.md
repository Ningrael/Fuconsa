# Catálogo Comercial Fuconsa

Catálogo digital interactivo (accesible por QR) y generador de hojas comerciales imprimibles en formato A4 para la operativa de ventas de **Matías Sosa Marrazzo** en **Fuconsa** (Horeca, Supermercados, Productos Latinos y Mundo Açaí / Polpa Norte), en Español, Catalán e Inglés (`ES | CA | EN`).

- **Repositorio Oficial en GitHub:** [https://github.com/Ningrael/Fuconsa](https://github.com/Ningrael/Fuconsa)
- **Ramas activas:** `main` (producción estable para VPS) y `development` (integración continua).

---

## Arranque Rápido Local

Para levantar tanto el API backend (puerto 4000) como la Web interactiva (puerto 5173) en un solo comando:

```bash
npm install
npm run start:local
```

- **Interfaz Web:** [http://localhost:5173](http://localhost:5173)
- **API Backend:** [http://localhost:4000/api/catalog](http://localhost:4000/api/catalog)
- **Salud del Sistema:** [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## Despliegue y Gestión en VPS (Guía para Smith / OpenClaw)

El despliegue está 100% automatizado, es idempotente y configura auto-arranque permanente tras reinicios con `systemd`:

```bash
# Primera instalación en VPS:
git clone https://github.com/Ningrael/Fuconsa.git /opt/fuconsa
cd /opt/fuconsa
bash scripts/deploy/deploy-vps.sh

# Actualizaciones posteriores desde GitHub:
cd /opt/fuconsa && bash scripts/deploy/deploy-vps.sh
```

El script compila los contenedores Docker, configura `fuconsa.service` en `systemd`, activa rotación de logs (máx. 10MB) y valida la respuesta HTTP 200 en `http://localhost:3000/api/health`.

### Edición de Precios, Productos y Categorías por Smith (`OpenClaw`)

Cuando **Smith** (el agente en la VPS) reciba instrucciones para editar tarifas, añadir o mover productos, o actualizar fotografías:

1. **Única Fuente de Verdad (SSOT):** Editar exclusivamente [`packages/lib/data/catalog.json`](packages/lib/data/catalog.json).
2. **Activos fotográficos:**
   - Fotos de productos (`.webp`): `packages/lib/assets/products/<archivo>.webp` (`"hasPhoto": true`, `"imagePath": "/assets/products/<archivo>.webp"`).
   - Producto sin foto: `"hasPhoto": false`, `"imagePath": "/assets/brand/placeholder-product.svg"`.
   - Logos oficiales de marcas: `packages/lib/assets/brands/`.
3. **Sectores (`sector`) y Categorías (`section`) válidos:**
   - `sector: "horeca"` (`channel: "horeca"`): `"Pescado y marisco"`, `"Verduras"`, `"Frutas y purés"`, `"Platos precocinados"`.
   - `sector: "supermercados"` (`channel: "supermercados"`): `"Ben & Jerry's"`, `"Buitoni"`, `"Delfín"`, `"Dr. Oetker"`, `"Frigo"`, `"Fripozo"`, `"Häagen-Dazs"`, `"JV"`, `"Maheso"`, `"Nestlé"`.
   - `sector: "latinos"` (`channel: "horeca"`): `"Productos latinos"`.
   - `sector: "acai"` (`channel: "horeca"`): `"Açaí"` (exclusivo para productos Polpa Norte).
4. **Contrato completo y comandos paso a paso:** Consulta la **Sección 5 de [`AGENTS.md`](AGENTS.md)** antes de aplicar cualquier cambio, ejecuta siempre `npm test` para validar las 88 pruebas de integridad y redespliega con `docker compose up -d --build`.

---

## Verificación de Calidad

Ejecuta el conjunto completo de 88 pruebas automatizadas:

```bash
npm test
```

Incluye validación de tokens de marca, catálogo auditado (`759` referencias activas sin precios a cero ni fotos desajustadas), logotipos oficiales de marcas, contratos de esquemas, paginación adaptativa A4, rutas y activos API, componentes frontend con pantalla siempre viva y archivos de alta disponibilidad en VPS.
