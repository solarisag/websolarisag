import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import { PageHero } from '../components/ui/PageParts.jsx'
import { breadcrumbSchema } from '../data/schema.js'
import { SITE } from '../data/site.js'
import { articles, categoryLabel } from '../data/articles.js'
import { ArrowRightIcon } from '../components/ui/Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]

const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

function ArticleCard({ a, i, featured = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: EASE }}
      className={featured ? 'lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center' : ''}
    >
      <Link to={`/articulos/${a.slug}`} className="group block">
        <div className="rounded-2xl overflow-hidden border border-line bg-surface mb-5 aspect-[16/10]">
          <img
            src={a.image}
            alt={a.imageAlt}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.opacity = 0 }}
          />
        </div>
        <div className={featured ? 'lg:pr-6' : ''}>
          <div className="flex items-center gap-3 mb-3 text-[11px] uppercase tracking-label">
            <span className="text-primary">{categoryLabel(a.category)}</span>
            <span className="w-1 h-1 rounded-full bg-line" />
            <span className="text-muted">{a.readingTime} min</span>
          </div>
          <h2 className={`flama-bold-italic text-ink group-hover:text-primary transition-colors leading-snug ${featured ? 'text-[1.6rem] md:text-[2rem] mb-4' : 'text-[1.2rem] mb-3'}`}>
            {a.title}
          </h2>
          <p className="font-sans text-[14px] text-muted leading-relaxed mb-4 line-clamp-3">{a.excerpt}</p>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[12px] text-muted">{fmtDate(a.datePublished)}</span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink group-hover:text-primary transition-colors ml-auto">
              Leer artículo <ArrowRightIcon size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Articulos() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Artículos', path: '/articulos' },
  ]
  const [featured, ...rest] = articles

  return (
    <main className="bg-white text-ink">
      <Seo
        title="Aprende sobre energía solar: guías y artículos | SolarISAG"
        description="Guías claras sobre paneles solares, ahorro, mantenimiento y legalización en Bucaramanga y Santander. Aprende antes de invertir con SolarISAG."
        path="/articulos"
        jsonLd={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Aprende sobre energía solar — SolarISAG',
            url: `${SITE.url}/articulos`,
            inLanguage: 'es-CO',
            publisher: { '@id': `${SITE.url}/#business` },
          },
        ]}
      />

      <PageHero
        breadcrumbs={crumbs}
        label="Noticias y artículos"
        title={<>Aprende sobre <em style={{ color: '#007A3E' }}>energía solar</em></>}
        intro="Guías claras y sin promesas vacías para entender cómo funciona un sistema solar, cuánto influye tu consumo y qué revisar antes de invertir."
      />

      <section className="py-16 md:py-20 max-w-container mx-auto px-6 lg:px-10">
        {featured && (
          <div className="mb-14">
            <ArticleCard a={featured} i={0} featured />
          </div>
        )}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {rest.map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
