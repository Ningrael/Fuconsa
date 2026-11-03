# Catálogo Comercial Fuconsa · Definición

## Objetivo y destinatarios

Plataforma comercial web e imprimible en formato A4 para **Matías Sosa Marrazzo** (Comercial de Fuconsa en Cataluña, WhatsApp `+34 613 018 609`, correo `sosamatias@gmail.com`).

Resuelve dos necesidades operativas con una sola fuente de datos:
1. **En la calle y visitas a puerta fría:** permitir imprimir hojas A4 limpias por sector o marca para llevar en carpeta física, o enviar listas de precios ligeras (< 5 MB) por WhatsApp.
2. **Atención digital mediante código QR:** ofrecer al cliente (hostelería, supermercados, tiendas latinas y locales de açaí) una portada con los datos de contacto de Matías y acceso inmediato al catálogo actualizado con precios visibles.

## Primera entrega

### Incluye
- **Portada comercial (destino del QR):** presentación de Matías Sosa Marrazzo como comercial de Fuconsa, botones de contacto directo (WhatsApp `+34 613 018 609`, llamada telefónica y descarga de contacto vCard) y acceso a los sectores principales: **Horeca**, **Supermercados**, **Productos Latinos** y **Mundo Açaí / Polpa Norte**.
- **Soporte trilingüe (`ES | CA | EN`):** carga siempre en **Español** por defecto, con selector instantáneo a Catalán e Inglés.
- **Catálogo con precios visibles y buscador rápido:** filtrado inmediato por texto, sector o marca comercial.
- **Motor de impresión A4 y exportación a PDF:**
  - **Densidad adaptativa según la sección:** cuadrícula compacta de alta densidad (12–16 productos por página A4) para familias extensas y formato escaparate (6–8 tarjetas grandes por página A4) para gamas visuales cortas como Polpa Norte / Açaí.
  - **Modo "Solo con foto" vs. "Tarifa completa":** opción de mostrar únicamente productos con fotografía verificada o incluir al final de la sección una tabla compacta de listado (Nombre, Formato, Precio) para las referencias sin foto, evitando recuadros vacíos.
- **Armador de "Selección a Medida" en 1 clic:** botón `+` en cada producto para que Matías seleccione los artículos hablados con un cliente y genere al instante una hoja A4 / PDF de 1 carilla personalizada con su cabecera de contacto.
- **Base de datos unificada y mantenible por agentes:** archivo estructurado de productos e imágenes locales optimizadas para que tanto Antigravity (en PC) como OpenClaw (en la VPS) actualicen tarifas o fotos mediante GitHub (`Ningrael`).

### Excluye (para iteraciones posteriores)
- Carrito para que el propio cliente confeccione y envíe un pedido por WhatsApp.
- Sistema de etiquetas promocionales ("Oferta del mes" / precios tachados).
- Panel de administración con base de datos compleja (las actualizaciones se realizarán vía archivo de datos asistido por Antigravity u OpenClaw).

## Criterios de aceptación

- Al abrir la web (o escanear el QR), carga en español mostrando la tarjeta de Matías Sosa Marrazzo con enlace funcional a `https://wa.me/34613018609` y acceso claro a cada sector.
- Al cambiar el selector de idioma entre `ES`, `CA` y `EN`, la interfaz y las denominaciones de secciones/productos cambian sin recargar ni romper el diseño.
- Al pulsar imprimir o guardar PDF en cualquier sección (o en una "Selección a Medida"), se generan páginas A4 exactas sin tarjetas cortadas a mitad de página, con cabecera comercial y numeración limpia.
- En el modo "Tarifa completa", los productos sin foto aparecen agrupados en una tabla de lectura rápida y nunca como tarjetas vacías con relleno genérico.
- Cualquier cambio de precio en el archivo de datos se refleja automáticamente tanto en la web como en la vista de impresión A4.

## Restricciones y referencias

- **Materiales de partida:**
  - Carpeta compartida en Google Drive (`G:\.shortcut-targets-by-id\1EuLIFEMakda8UH4wvG5fPzeU0ztYlqrU\Creación de catálogos para Antigravity`) con tarifas Excel (`precios-horeca.xlsx`, `precios-supermercados.xlsx`), base inicial `productos-normalizados.csv` (451 registros) y los 4 PDFs previos de donde se rescatarán los activos gráficos y fotografías ya recortadas.
  - Catálogo web de origen `https://www.fucon.es/` (en español y catalán) para enriquecer imágenes y nombres.
- **Infraestructura y despliegue:**
  - Alojado en la VPS existente del usuario (donde opera OpenClaw), accesible inicialmente mediante la dirección IP de la VPS.
  - Sincronizado a través de un repositorio en la cuenta de GitHub `Ningrael`.

### Guía de Estilo Visual (Editorial Comercial · Anti-IA Style)
Para lograr un aspecto profesional, sobrio y coherente tanto en pantalla móvil como en papel impreso A4, se aplican las siguientes reglas visuales:
- **Filosofía:** diseño editorial de catálogo gastronómico/mayorista (estilo revista técnica o tarifa suiza), huyendo de los clichés de plantillas generadas por IA (prohibidos los degradados neón/violetas, sombras flotantes difusas, bordes redondeados exagerados o iconos decorativos innecesarios).
- **Paleta cromática:**
  - **Azul Marino Fuconsa (Principal):** `#0F2942` (cabeceras, pastillas de precio, textos de marca).
  - **Azul Acero (Secundario):** `#1E4976` (acentos de navegación y bordes activos).
  - **Blanco Papel / Fondo Base:** `#F8FAFC` en pantalla y `#FFFFFF` puro en hoja A4 impresa para máximo ahorro de tóner y nitidez.
  - **Gris Pizarra (Texto y Tablas):** `#1E293B` para nombres de producto y `#64748B` para formatos/códigos.
  - **Acentos de Sector:** Verde Amazónico/Açaí (`#4A154B` / `#2E6F40`) para la línea Polpa Norte; Ámbar Cálido (`#B45309`) para Productos Latinos.
- **Tipografía y Jerarquía:**
  - Titulares y precios en tipografía geométrica contundente con números tabulares (`tabular-nums`) para que las columnas de precios alineen al milímetro.
  - El **precio** y el **formato** (`€/kg`, `€/ud`, `Caja 5kg`) son los elementos de mayor contraste dentro de cada ficha.
- **Fotografía de producto:** recorte limpio sobre contenedor blanco o gris hielo muy sutil (`#F1F5F9`), bordes rectos o radio mínimo (`4px`), con proporción uniforme y sin deformar ni rotar artificialmente el envase.

## Decisiones y Arquitectura Técnica

- **Arquitectura Monorepo con Librería Central (`packages/lib` - SSOT):**
  - `packages/lib`: única fuente de verdad (esquemas de validación Zod, catálogo normalizado trilingüe `es`/`ca`/`en`, formateadores de precios, algoritmo de paginación A4 adaptativa, constantes de contacto de Matías Sosa y tokens CSS/activos de marca).
  - `apps/api` (Backend): servidor ligero que expone y valida los datos del catálogo, filtra búsquedas y gestiona actualizaciones seguras.
  - `apps/web` (Frontend): cliente ligero limitado estrictamente a la interfaz visual interactiva y al renderizado de páginas A4 consumiendo `packages/lib` y `apps/api`.
- **Modularidad Atómica y Testing Obligatorio:**
  - Ningún archivo superará las **200 líneas** y ninguna función superará las **40 líneas**.
  - Cada módulo, endpoint y componente contará con pruebas automatizadas (`Vitest`) que deberán pasar al 100% antes de integrar cualquier cambio.
- **Unificación Web + Impresión A4 (CSS Paged Media / Print View):** se descarta mantener scripts desconectados que solo escupen PDFs pesados; la propia aplicación maqueta las páginas A4 listas para imprimir o guardar en PDF ligero.
- **Precios públicos:** siempre visibles sin PIN de bloqueo, dado que ya son públicos en la web oficial de Fuconsa.
- **Mantenimiento asistido por agentes (`Antigravity` + `OpenClaw`):** flujo Git estandarizado (`main` ← `development` ← `feature/*`) sincronizado en GitHub (`Ningrael`).

## Pendiente de decidir

- **Dominio propio:** por ahora se utilizará la IP directa de la VPS (y puerto/ruta que se asigne en el despliegue). La compra de un dominio comercial queda pospuesta para más adelante.
