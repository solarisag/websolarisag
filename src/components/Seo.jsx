import { Head } from 'vite-react-ssg'
import { SITE } from '../data/site.js'

// ── Componente SEO por página ────────────────────────────────────────────────
// Renderiza title, meta description, canonical, Open Graph, Twitter Card y
// cualquier bloque JSON-LD que se le pase. Se inyecta en el <head> durante el
// prerenderizado, de modo que cada ruta entrega HTML con su meta única.
//
// Props:
//   title       — título de la pestaña / <title> (obligatorio)
//   description — meta description (obligatorio)
//   path        — ruta canónica relativa, ej. '/productos' (default '/')
//   image       — URL absoluta de imagen OG (default og-image del sitio)
//   type        — og:type ('website' | 'article' | 'product')
//   noindex     — si true, agrega robots noindex
//   jsonLd      — objeto o array de objetos JSON-LD schema.org
//   children    — meta adicionales opcionales

export default function Seo({
  title,
  description,
  path = '/',
  image = SITE.ogImage,
  type = 'website',
  noindex = false,
  jsonLd,
  children,
}) {
  const canonical = `${SITE.url}${path === '/' ? '/' : path.replace(/\/$/, '')}`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Head>
      <html lang="es-CO" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  )
}
