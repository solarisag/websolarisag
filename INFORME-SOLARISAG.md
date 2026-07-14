# Informe de revisión, corrección y optimización — SolarISAG

Fecha: 2026-07-14 · Ejecutado sobre el proyecto actual (React + Vite), en 3 olas de trabajo.

---

## 1. Resumen ejecutivo

Se transformó el sitio de SolarISAG de una SPA de una sola página (con SEO limitado)
a una plataforma **prerenderizada estáticamente**, más comercial, mejor estructurada
y preparada para buscadores y motores de respuesta de IA, sin cambiar de framework ni
rediseñar desde cero.

Objetivo: posicionar a SolarISAG como empresa confiable y especializada en energía
solar en Bucaramanga, su área metropolitana (Floridablanca, Girón, Piedecuesta) y
Santander, aplicando buenas prácticas técnicas, semánticas y editoriales — sin prometer
posiciones ni inventar datos.

**Decisiones del cliente durante el trabajo:**
- Arquitectura de renderizado: **Prerender/SSG** (elegido sobre "solo meta en cliente").
- Ejecución: **fundación primero por olas**.
- El sitio es de **una sola página**: todo el contenido vive en el home **excepto los
  artículos** (rutas propias). Productos y Mantenimiento se **sintetizaron como secciones**
  del home (no páginas independientes).
- "Nuestros productos" es la sección de **respaldo de marca Sylvania** (distribuidores
  autorizados), no un catálogo de venta. Titular elegido: *"Distribuidores autorizados de
  Sylvania en Colombia"*.
- **Se omitieron** las 7 páginas de servicio dedicadas (por indicación del cliente).

---

## 2. Tecnología identificada

- **Framework / build:** React 18 + Vite 5. Migrado a **vite-react-ssg** (prerenderizado
  estático) — no es cambio de framework, solo se añadió un paso de build.
- **Lenguaje:** JavaScript (JSX). Sin TypeScript.
- **Estilos:** Tailwind CSS 3 + variables CSS (design tokens) en `index.css`.
- **Ruteo:** React Router 6 (rutas como datos en `src/routes.jsx`).
- **Animación:** framer-motion. **Scroll:** lenis. **Analítica:** @vercel/analytics.
- **Fuentes:** Flama (OTF locales, precargadas).
- **Contenido:** archivos de datos JS (`src/data/*`). Sin CMS ni base de datos (no era
  necesario para el volumen actual).
- **Imágenes:** `public/images` y `public/projects`. Optimización con `sharp`.
- **Deploy:** Vercel (proyecto `solarisag`, dominio `solarisag.com.co`).

---

## 3. Errores encontrados

| # | Error | Severidad |
|---|-------|-----------|
| 1 | SPA con SEO único en `index.html`: **todas las rutas compartían el mismo title/description/JSON-LD** | Alta |
| 2 | Ruta comodín `*` renderizaba el Home → **no existía un 404 real** (siempre 200) | Alta |
| 3 | **Botón principal del Hero roto**: "¿Cuánto me ahorro?" apuntaba a `#calculadora`, sección desactivada → no hacía nada | Alta |
| 4 | **Footer con enlace muerto** `href="#"` (dirección) | Media |
| 5 | `etl.jpg` (certificación ETL) referenciada pero **excluida del deploy** por `.vercelignore` (`*.jpg`) → imagen rota en producción | Media |
| 6 | **Video de 119 MB** en `public/projects/...` (supera el límite de 100 MB de Vercel en deploy prebuilt) | Media |
| 7 | Imagen de mantenimiento sin usar y pesada (`mantenimiento.JPG`, 4.8 MB, excluida por `.vercelignore`) | Media |
| 8 | Preload del video de fondo (~7 MB) en el `<head>` global → penalizaba el LCP en todas las páginas | Media |
| 9 | Código huérfano: `App.jsx` (reemplazado por el nuevo entry) | Baja |
| 10 | Inconsistencias de copy (Footer "26 años" vs Hero "+55 proyectos") | Baja |

---

## 4. Cambios implementados (resumen)

- **Arquitectura SSG:** entry `main.jsx` con `ViteReactSSG`, rutas en `routes.jsx`, layout
  compartido (`Layout.jsx`), componente `Seo.jsx` (title/description/canonical/OG/Twitter +
  JSON-LD por página) y helpers de schema (`data/schema.js`).
- **Config central** (`data/site.js`): teléfono, WhatsApp, cobertura, redes y mensajes
  predefinidos de WhatsApp con codificación correcta.
- **404 real** (`NotFound.jsx`) con enlaces útiles; `vercel.json` sin catch-all para que
  Vercel sirva `404.html` con estado 404, + **redirects 301**.
- **Hero** reescrito (ver §5) con CTAs funcionales.
- **Sección "Nuestros productos"** = respaldo Sylvania (ver §6).
- **Sección de Mantenimiento** en el home (ver §7).
- **Secciones nuevas en el home:** Cobertura local y Preguntas frecuentes (acordeón).
- **Sistema de artículos** escalable + **10 artículos** (ver §10).
- **Footer y Navbar** actualizados; enlaces muertos corregidos.
- **Optimización de imágenes:** `mantenimiento.JPG` 4.8 MB → `mantenimiento.webp` 286 KB;
  `etl.jpg` → `etl.webp` 6 KB.
- **Sitemap autogenerado** en cada build (`scripts/gen-sitemap.mjs`).

---

## 5. Cambios en el Hero

**Antes**
- H1: "Cada mes sin paneles es dinero que no vuelve."
- Botón principal: "¿Cuánto me ahorro?" → `#calculadora` (**roto**, sección desactivada).
- Botón secundario: "Ver proyectos" → `#proyectos`.
- Sub-copy: "…Ahorra hasta el 100% de tu factura de energía."

**Después**
- H1 (único): **"Tu factura de energía sigue subiendo. Empieza a producir la tuya."**
- Señal geográfica: "Energía solar en Bucaramanga · Santander".
- Sub-copy: "Diseñamos, instalamos y legalizamos sistemas solares para hogares y empresas
  en Bucaramanga y Santander. Analizamos tu consumo para construir una solución que
  responda a tus necesidades."
- Botón principal: **"Cotiza tu sistema solar"** → `#contacto` (formulario/WhatsApp).
- Botón secundario: **"Ver proyectos realizados"** → `#proyectos`.
- Menor altura superior en móvil para que título + texto + botón se vean antes.

---

## 6. Cambios en productos

- El ítem de menú **"Sylvania" → "Nuestros productos"**.
- Según indicación del cliente, **no** es un catálogo de venta: la sección "Nuestros
  productos" (`#productos`) es el **respaldo de marca Sylvania** — distribuidores
  autorizados, calidad de la marca de los paneles y certificaciones (RETILAP, RETIE, UL, ETL).
- Titular: **"Distribuidores autorizados de Sylvania en Colombia"**.
- Etiqueta: "Nuestros productos · Distribuidor autorizado".
- Se eliminó el catálogo de categorías que se había probado (leía como "vendemos esto").
- Redirect 301 `/sylvania` y `/productos` → `/#productos`.

---

## 7. Cambios en mantenimiento

- **Imagen utilizada:** la foto real del proyecto `public/images/mantenimiento.JPG`
  (4.8 MB) → optimizada a `mantenimiento.webp` (1400×1050, 286 KB). ALT: *"Técnico
  realizando mantenimiento a paneles solares en Santander"*.
- **Estructura:** sección del home (`#mantenimiento`) a dos columnas (imagen + texto),
  lista de qué se revisa y CTA.
- **Copy:** *"Tus paneles pueden estar funcionando y aun así producir menos."* + texto de
  apoyo del brief.
- **CTA:** "Solicitar revisión del sistema" → WhatsApp con mensaje predefinido; enlace a la
  guía de mantenimiento (artículo).
- **Página creada:** inicialmente se creó `/mantenimiento-paneles-solares`, pero por
  indicación del cliente (sitio de una sola página) se **sintetizó como sección del home**
  y se dejó redirect 301 de la ruta antigua a `/#mantenimiento`.

---

## 8. Auditoría SEO

- **Titles:** únicos por página (verificado en el HTML generado). Ejemplo home: *"Paneles
  solares en Bucaramanga y Santander | SolarISAG"*.
- **Meta descriptions:** únicas por página, con ubicación e intención local.
- **H1:** uno solo por página (home = hero; cada artículo = su título; 404 = su mensaje).
- **URLs:** limpias (`/articulos`, `/articulos/<slug>`, `/proyectos/<slug>`). Anclas del
  home para secciones.
- **Canonicals:** uno por página, absolutos (verificado).
- **Sitemap:** `public/sitemap.xml` **autogenerado** en cada build (19 URLs: home,
  /articulos, 10 artículos, 7 proyectos). Solo páginas públicas válidas.
- **Robots:** `robots.txt` permite indexación y apunta al sitemap.
- **Imágenes:** WebP, `width/height` en las nuevas, `loading="lazy"` salvo críticas
  (`fetchpriority="high"`), ALT descriptivos naturales.
- **Rendimiento:** eliminado el preload del video (~7 MB) del `<head>` global;
  imágenes optimizadas; code-splitting por sección/página; contenido prerenderizado.
- **Enlaces:** corregidos los enlaces muertos (`#` y `#calculadora`).
- **Schemas:** ver §11. Validez: JSON-LD generado por serialización controlada (sin errores
  de sintaxis).

**Nota:** el `<title>`/`description` estáticos se retiraron del template `index.html` para
evitar duplicados; ahora los inyecta react-helmet por ruta.

---

## 9. SEO local

Ubicaciones trabajadas de forma natural (sin relleno): **Bucaramanga, Floridablanca,
Girón, Piedecuesta, Lebrija y Santander (área metropolitana)**.

Integradas en: titles, meta descriptions, H1, introducción del hero, **sección de
Cobertura**, **FAQ del home**, artículos, `areaServed` del schema LocalBusiness y ALT
cuando es relevante.

Búsquedas cubiertas por los artículos e intención local: precio de paneles en Bucaramanga,
ahorro de empresas en Santander, energía solar para hoteles en Santander, empresa de
paneles solares en Bucaramanga, legalización ante ESSA, entre otras.

Se respetó la regla de **no afirmar sedes no confirmadas**: se habla de cobertura,
atención, instalación y visitas técnicas. Dirección mostrada solo la ya existente
(Cra 23 #30-47, Girón).

---

## 10. Artículos creados

Ruta canónica única: **`/articulos`** (con redirects 301 desde `/blog` y `/noticias`).
Todos: respuesta directa al inicio, FAQ, tabla de contenido (artículos largos), CTA,
cross-links, autor "Equipo SolarISAG", fecha de publicación y actualización.

| # | Título | Slug | Palabra clave | Categoría | Estado |
|---|--------|------|---------------|-----------|--------|
| 1 | ¿Cuánto cuesta instalar paneles solares en Bucaramanga? | `cuanto-cuesta-instalar-paneles-solares-bucaramanga` | paneles solares en Bucaramanga precio | Ahorro energético | Publicado |
| 2 | ¿Cuánto puede ahorrar una empresa con paneles solares en Santander? | `ahorro-empresas-paneles-solares-santander` | paneles solares para empresas en Santander | Empresas | Publicado |
| 3 | Sistema On-Grid, híbrido u Off-Grid: ¿cuál necesitas? | `on-grid-hibrido-off-grid-diferencias` | diferencia On-Grid, híbrido y Off-Grid | Sistemas solares | Publicado |
| 4 | ¿Debes desconectarte de la red para instalar paneles solares? | `paneles-solares-conectados-a-la-red` | paneles solares conectados a la red | Sistemas solares | Publicado |
| 5 | Legalización de paneles solares ante ESSA: guía general | `legalizacion-paneles-solares-essa` | legalización de paneles solares ante ESSA | Legalización | Publicado |
| 6 | Mantenimiento de paneles solares: producir energía no es producir al máximo | `mantenimiento-paneles-solares` | mantenimiento de paneles solares en Bucaramanga | Mantenimiento | Publicado |
| 7 | ¿Tu techo sirve para instalar paneles solares? | `techo-para-instalar-paneles-solares` | techo para paneles solares | Hogares | Publicado |
| 8 | Paneles solares para hoteles: cómo reducir costos de operación | `paneles-solares-para-hoteles` | paneles solares para hoteles | Empresas | Publicado |
| 9 | Errores comunes al contratar una empresa de paneles solares | `errores-contratar-empresa-paneles-solares` | empresa de paneles solares en Bucaramanga | Sistemas solares | Publicado |
| 10 | ¿Los paneles solares funcionan cuando está nublado o lloviendo? | `paneles-solares-dias-nublados-lluvia` | paneles solares en días nublados | Sistemas solares | Publicado |

**Enlazado interno (ejemplos):** mantenimiento → `/#mantenimiento`; ESSA →
`/#contacto`; hoteles ↔ empresas; On-Grid ↔ conexión a la red; techo → visita técnica
(`/#contacto`). Cada artículo enlaza a 2 relacionados y a un servicio/ancla del home.

---

## 11. Datos estructurados

| Página | Schemas JSON-LD |
|--------|-----------------|
| Home (`/`) | `LocalBusiness`, `WebSite`, `FAQPage` (con las FAQ visibles del home) |
| Artículos (`/articulos/<slug>`) | `BlogPosting`, `BreadcrumbList`, `FAQPage` |
| Proyectos (`/proyectos/<slug>`) | `BreadcrumbList` |

`LocalBusiness` solo con información confirmada (nombre, URL, logo, teléfono, correo,
redes, dirección existente, `areaServed`). **No** se inventaron horarios, reseñas ni
certificaciones dentro del schema.

---

## 12. Archivos modificados

- `index.html` (template limpio; SEO por ruta)
- `package.json` (build SSG + prebuild sitemap)
- `vite.config.js` (manualChunks solo en cliente)
- `vercel.json` (build SSG, 404 real, redirects 301)
- `src/main.jsx` (entry ViteReactSSG)
- `src/pages/Home.jsx` (secciones + SEO + FAQ schema)
- `src/pages/ProjectDetail.jsx` (SEO + breadcrumbs, sin Navbar/Footer duplicados)
- `src/components/ui/Navbar.jsx` (enlaces reales + "Nuestros productos")
- `src/components/ui/Footer.jsx` (enlaces, cobertura, fix `href="#"`)
- `src/components/sections/Hero.jsx` (copy + CTAs)
- `src/components/sections/Sylvania.jsx` (id=productos, titular, copy de respaldo, etl.webp)
- `public/sitemap.xml` (regenerado)

## 13. Archivos creados

- `src/routes.jsx`, `src/components/Layout.jsx`, `src/components/Seo.jsx`
- `src/components/ui/PageParts.jsx`
- `src/components/sections/Mantenimiento.jsx`, `Cobertura.jsx`, `Faq.jsx`
- `src/pages/NotFound.jsx`, `src/pages/Articulos.jsx`, `src/pages/Articulo.jsx`
- `src/data/site.js`, `src/data/schema.js`, `src/data/articles.js`, `src/data/articlesExtra.js`
- `scripts/gen-sitemap.mjs`
- `public/images/mantenimiento.webp`, `public/images/etl.webp`
- `INFORME-SOLARISAG.md` (este archivo)

## 14. Archivos eliminados

- `src/App.jsx` — reemplazado por `routes.jsx` + `main.jsx` (ViteReactSSG). Verificado que
  no lo importaba nadie.
- `src/pages/Productos.jsx` y `src/pages/Mantenimiento.jsx` — su contenido se sintetizó en
  secciones del home (indicación del cliente: sitio de una sola página).
- `src/components/sections/Productos.jsx` (catálogo) — retirado por indicación del cliente.

> `Calculator.jsx` se **conservó** (fue desactivado a propósito por el cliente en un commit
> previo; no es código muerto). El video de 119 MB se conservó (no está en git; excluido del
> deploy por `.vercelignore`).

## 15. Redirecciones (301)

| Origen | Destino |
|--------|---------|
| `/sylvania` | `/#productos` |
| `/productos` | `/#productos` |
| `/mantenimiento-paneles-solares` | `/#mantenimiento` |
| `/mantenimiento` | `/#mantenimiento` |
| `/blog` | `/articulos` |
| `/noticias` | `/articulos` |

---

## 16. Pruebas ejecutadas

- **Build de producción** (`npm run build` = prebuild sitemap + `vite-react-ssg build`):
  **exitoso**, sin errores ni warnings. Genera **20 páginas** prerenderizadas.
- **Verificación del HTML generado** (grep sobre `dist/`):
  - Un único `<title>`, `description` y `canonical` por página, todos distintos. ✓
  - JSON-LD por página con los tipos esperados. ✓
  - Contenido de cada sección/artículo presente en el HTML (no depende de JS). ✓
  - 10 artículos con tarjetas y enlaces en `/articulos`; cross-links resuelven (0 "undefined"). ✓
  - `404.html`, `etl.webp` y `mantenimiento.webp` presentes en `dist/`. ✓
  - Menú apunta a `/#productos`, `/#mantenimiento`, `/articulos`. ✓

**No ejecutado por Claude:** no hay lint ni tests configurados en el proyecto, y **no se
validó en el navegador ni en el deploy de Vercel** (el deploy lo ejecuta el cliente). No se
corrió auditoría Lighthouse.

---

## 17. Información pendiente (por confirmar por el cliente)

- **Afirmaciones existentes a validar** (se conservaron por ser datos del negocio; el brief
  pide no inventar): "ahorra hasta el 100%", "25 años de garantía", "deducción 50% de renta",
  "26 años", cifras de ahorro/producción en proyectos, dirección física.
- **Analítica:** hay `@vercel/analytics`. **Faltan** Google Analytics / GTM, Google Search
  Console y Meta Pixel si se desean (no se inventaron IDs). Eventos recomendados: clic en
  WhatsApp, envío de formulario, clic en cotización/mantenimiento, visita a proyectos/artículos.
- **Productos:** referencias, potencias, marcas y garantías concretas (hoy la sección es de
  respaldo de marca, sin fichas).
- **Proyectos:** confirmar cifras mostradas (kWp, ahorros) por ser afirmaciones sensibles.
- **Redes/contacto:** confirmar que Facebook, Instagram, WhatsApp y correo son los vigentes.
- **Legalización:** los artículos aclaran que requisitos y tiempos varían; conviene validar
  con la fuente oficial vigente antes de cualquier afirmación específica.

---

## 18. Recomendaciones posteriores (no implementadas)

- **7 páginas de servicio dedicadas** (`/sistema-on-grid`, `/paneles-solares-para-hogares`,
  etc.): **omitidas por indicación del cliente** (sitio de una sola página). Si a futuro se
  quiere más superficie SEO, el sistema de rutas + `Seo` ya está listo para añadirlas.
- **15 artículos locales adicionales** (Fase 16 del brief): no creados en esta entrega. Se
  recomienda priorizar los que aporten contenido realmente distinto (evitar páginas locales
  casi idénticas). El sistema de artículos permite añadirlos fácilmente en `articlesExtra.js`.
- **Formulario:** el actual es un asistente que abre WhatsApp con el mensaje armado (funciona).
  Si se quiere un formulario con backend (validación server, anti-spam, confirmación), requiere
  definir un endpoint/servicio; no se cambió para no romper la integración actual.
- **Mover el video de 119 MB** fuera de `public/` (no se usa) para simplificar cualquier
  deploy prebuilt.
- **Conectar Google Search Console y Analytics** para medir resultados reales.
- **Auditoría Lighthouse** tras el primer deploy para afinar Core Web Vitals con datos reales.

---

*Preparado por el equipo de desarrollo. Todo el trabajo se realizó sobre el proyecto
existente, sin migrar de framework, sin inventar datos y sin prometer posicionamiento.*
