# Catálogo Comercial Fuconsa

Catálogo digital interactivo (accesible por QR) y generador de hojas comerciales imprimibles en formato A4 para la operativa de ventas de **Matías Sosa Marrazzo** en **Fuconsa** (Horeca, Supermercados, Productos Latinos y Mundo Açaí / Polpa Norte), en Español, Catalán e Inglés (`ES | CA | EN`).

## Estado actual

- **Documentación y arquitectura definidas:** alcance, criterios de aceptación y guía de estilo editorial documentados en [`docs/PROYECTO.md`](docs/PROYECTO.md).
- **Materiales base localizados:** tarifas Excel, CSV normalizado (451 referencias) y PDFs de referencia disponibles en la unidad compartida de Google Drive.
- **Aplicación y extracción de activos:** pendientes de iniciar tras cerrar el plan de desarrollo en [`TASKS.md`](TASKS.md).

## Cómo empezar

1. Revisa [`docs/PROYECTO.md`](docs/PROYECTO.md) para consultar el alcance de la primera entrega y la guía visual.
2. Consulta [`TASKS.md`](TASKS.md) para ver la tarea activa una vez acordado el plan de implementación.
3. Sigue las pautas de [`AGENTS.md`](AGENTS.md) tanto desde **Antigravity** (entorno local) como desde **OpenClaw** (VPS) sincronizando siempre mediante GitHub (`Ningrael`).

## Documentación

- [Objetivo, alcance y estilo visual](docs/PROYECTO.md).
- [Instrucciones para agentes (Antigravity / OpenClaw)](AGENTS.md).
- [Tareas y próximas ideas](TASKS.md).
- [Estado y continuidad](docs/ESTADO.md).

## Comprobación

La validación de la primera entrega se realizará comprobando:
- Carga en español por defecto y cambio fluido entre `ES`, `CA` y `EN`.
- Enlace directo al WhatsApp comercial (`+34 613 018 609`) desde la portada QR.
- Impresión A4 y exportación a PDF sin cortes de tarjeta, con densidad adaptativa (12–16 productos en familias extensas y 6–8 en gamas visuales como Açaí), tabla compacta para referencias sin foto y generador de "Selección a Medida" en 1 clic.
