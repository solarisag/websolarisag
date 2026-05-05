# SolarISAG — Sitio Web

Sitio web de SolarISAG (Iluminación San Juan de Girón S.A.) — soluciones solares en Girón, Santander.

## Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Router v6
- Deploy: Vercel

## Comandos

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo (http://localhost:5173)
npm run build      # Build de producción → dist/
npm run preview    # Previsualizar build local
```

## Estructura

```
public/
  videos/           background.mp4, background-2.mp4
  images/           logo.png, projects/<slug>/...
  favicon.png

src/
  components/
    sections/       Hero, Services, HowItWorks, Projects, Support, About, Contact
    ui/             Navbar, Footer, Button, SectionLabel, SectionTitle, Counter, Icons
  pages/
    Home.jsx        Página principal (ensambla todas las secciones)
    ProjectDetail.jsx  Detalle de cada proyecto (/proyectos/:slug)
  data/
    projects.js     Array editable de proyectos
    services.js     Servicios y pasos del proceso
  App.jsx           Rutas
  main.jsx          Entry point
  index.css         Tailwind + estilos base
```

## Añadir un proyecto

1. Coloca las imágenes en `public/images/projects/<slug>/`:
   - `cover.jpg` (portada del grid + hero del detalle)
   - `foto-1.jpg`, `foto-2.jpg`, `foto-3.jpg` (galería)
2. Añade el objeto al array `projects` en `src/data/projects.js`.
3. Redeploy.

## Sistema de diseño

| Token              | Valor      | Uso                          |
| ------------------ | ---------- | ---------------------------- |
| `--color-primary`  | `#275360`  | Petróleo — autoridad técnica |
| `--color-accent`   | `#ffcd46`  | Amarillo solar — acción      |
| `--color-bg`       | `#0A0A0A`  | Fondo base                   |
| `--color-surface`  | `#111111`  | Superficies secundarias      |
| `--color-text-muted` | `#888888` | Texto secundario            |

Tipografía: **Flama** (con `Inter` como fallback). Para activar Flama, deja los archivos `.woff2` en `public/fonts/` y descomenta los `@font-face` en `src/index.css`.

## Contacto

- WhatsApp: +57 317 569 6832
- Email: comercial@solarisag.com.co
- Cra 23 #30-47 Girón Centro, Santander, Colombia
