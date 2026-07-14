// Genera public/sitemap.xml a partir de los datos del sitio.
// Se ejecuta antes del build (ver package.json). Así el sitemap nunca
// queda desactualizado al agregar proyectos o artículos.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { projects } from '../src/data/projects.js'
import { articles } from '../src/data/articles.js'

const BASE = 'https://solarisag.com.co'
const today = new Date().toISOString().slice(0, 10)

const staticUrls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
  { loc: '/articulos', changefreq: 'weekly', priority: '0.8', lastmod: today },
]

const articleUrls = articles.map((a) => ({
  loc: `/articulos/${a.slug}`,
  changefreq: 'monthly',
  priority: '0.7',
  lastmod: a.dateModified || a.datePublished || today,
}))

const projectUrls = projects.map((p) => ({
  loc: `/proyectos/${p.slug}`,
  changefreq: 'monthly',
  priority: '0.8',
  lastmod: today,
}))

const all = [...staticUrls, ...articleUrls, ...projectUrls]

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  all
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${BASE}${u.loc}</loc>\n` +
        `    <lastmod>${u.lastmod}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../public/sitemap.xml')
writeFileSync(out, xml, 'utf8')
console.log(`sitemap.xml generado con ${all.length} URLs`)
