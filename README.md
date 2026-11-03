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

## Despliegue en VPS (Comando para OpenClaw)

El despliegue está 100% automatizado, es idempotente y configura auto-arranque permanente tras reinicios con `systemd`:

```bash
# Primera instalación en VPS:
git clone https://github.com/Ningrael/Fuconsa.git /opt/fuconsa
cd /opt/fuconsa
bash scripts/deploy/deploy-vps.sh

# Actualizaciones posteriores:
cd /opt/fuconsa && bash scripts/deploy/deploy-vps.sh
```

El script compila los contenedores Docker, configura `fuconsa.service` en `systemd`, activa rotación de logs (máx. 10MB) y valida la respuesta HTTP 200 en `http://localhost:3000/api/health`.

---

## Verificación de Calidad

Ejecuta el conjunto completo de 68 pruebas automatizadas:

```bash
npm test
```

Incluye validación de tokens de marca, catálogo saneado (762 referencias), contratos de esquemas, paginación adaptativa A4, rutas y activos API, componentes frontend con pantalla siempre viva y archivos de alta disponibilidad en VPS.
