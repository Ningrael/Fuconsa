# Estado del Proyecto — Catálogo Comercial Fuconsa

Última actualización: 2026-11-03

---

## 1. Resumen Ejecutivo y Repositorio Oficial

- **Repositorio GitHub:** [https://github.com/Ningrael/Fuconsa](https://github.com/Ningrael/Fuconsa)
- **Ramas:** `main` (despliegue en VPS) y `development` (desarrollo e integración).
- **Cobertura de Pruebas:** 68/68 pruebas automatizadas en verde (100% éxito en `lib`, `api` y `web`).
- **Servidores Locales Activos:** API en `http://localhost:4000` y Web en `http://localhost:5173`.

---

## 2. Hitos Completados (Etapas 1 a 6)

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
