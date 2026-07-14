import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import NotFound from './NotFound.jsx'
import { Breadcrumbs, CtaBand } from '../components/ui/PageParts.jsx'
import { breadcrumbSchema, articleSchema, faqSchema } from '../data/schema.js'
import { getArticleBySlug, getRelatedArticles, categoryLabel } from '../data/articles.js'
import { ArrowRightIcon } from '../components/ui/Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]

const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

// Renderiza un bloque del cuerpo del artículo
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={block.id} className="flama-bold-italic text-ink text-[1.5rem] md:text-[1.7rem] mt-12 mb-4 scroll-mt-28">{block.text}</h2>
    case 'h3':
      return <h3 className="flama-bold-italic text-ink text-[1.2rem] mt-8 mb-3">{block.text}</h3>
    case 'ul':
      return (
        <ul className="my-5 flex flex-col gap-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 font-sans text-[16px] text-ink-soft leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {it}
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="my-7 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left border-collapse text-[14px]">
            <thead>
              <tr className="bg-surface">
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-sans font-semibold text-ink border-b border-line whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="odd:bg-white even:bg-surface/40">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 border-b border-line/60 text-ink-soft ${ci === 0 ? 'font-medium text-ink' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'note':
      return (
        <div className="my-7 rounded-xl bg-surface border-l-2 border-accent px-5 py-4">
          <p className="font-sans text-[15px] text-ink-soft leading-relaxed italic">{block.text}</p>
        </div>
      )
    case 'cta':
      return (
        <Link to={block.href} className="my-7 group flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 hover:border-primary transition-colors">
          <span className="font-sans text-[15px] font-medium text-ink">{block.text}</span>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-primary shrink-0">
            {block.label} <ArrowRightIcon size={13} />
          </span>
        </Link>
      )
    default:
      return <p className="my-4 font-sans text-[16px] md:text-[17px] text-ink-soft leading-[1.75]">{block.text}</p>
  }
}

export default function Articulo() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <NotFound />

  const related = getRelatedArticles(slug)
  const toc = article.body.filter((b) => b.type === 'h2' && b.id)
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Artículos', path: '/articulos' },
    { name: article.title, path: `/articulos/${slug}` },
  ]

  return (
    <main className="bg-white text-ink">
      <Seo
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.excerpt}
        path={`/articulos/${slug}`}
        image={article.image.startsWith('http') ? article.image : `https://solarisag.com.co${article.image}`}
        type="article"
        jsonLd={[
          breadcrumbSchema(crumbs),
          articleSchema(article),
          ...(article.faqs?.length ? [faqSchema(article.faqs)] : []),
        ]}
      />

      <section className="pt-32 md:pt-40 pb-8 border-b border-line">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Breadcrumbs items={crumbs} />
          <span className="inline-block text-[11px] uppercase tracking-label text-primary mb-4">
            {categoryLabel(article.category)}
          </span>
          <h1 className="title text-ink" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.08 }}>
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-6 text-[12.5px] text-muted font-sans">
            <span>{article.author}</span>
            <span className="w-1 h-1 rounded-full bg-line" />
            <span>Publicado {fmtDate(article.datePublished)}</span>
            {article.dateModified && article.dateModified !== article.datePublished && (
              <>
                <span className="w-1 h-1 rounded-full bg-line" />
                <span>Actualizado {fmtDate(article.dateModified)}</span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-line" />
            <span>{article.readingTime} min de lectura</span>
          </div>
        </div>
      </section>

      {/* Imagen destacada */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 -mt-0 pt-10">
        <div className="rounded-2xl overflow-hidden border border-line aspect-[16/9]">
          <img
            src={article.image}
            alt={article.imageAlt}
            width="1280" height="720"
            fetchpriority="high" decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.opacity = 0 }}
          />
        </div>
      </div>

      {/* Cuerpo */}
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-12 md:py-16">
        {/* Respuesta directa */}
        {article.answer && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl bg-surface border border-line p-6 mb-10"
          >
            <span className="text-[11px] uppercase tracking-label text-primary block mb-2">En resumen</span>
            <p className="font-sans text-[16px] md:text-[17px] text-ink leading-relaxed">{article.answer}</p>
          </motion.div>
        )}

        {/* Tabla de contenido */}
        {toc.length >= 3 && (
          <nav aria-label="Tabla de contenido" className="mb-10 rounded-xl border border-line p-5">
            <span className="text-[11px] uppercase tracking-label text-muted block mb-3">En este artículo</span>
            <ol className="flex flex-col gap-2">
              {toc.map((b, i) => (
                <li key={b.id}>
                  <a href={`#${b.id}`} className="font-sans text-[14px] text-ink-soft hover:text-primary transition-colors">
                    {i + 1}. {b.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Bloques */}
        {article.body.map((block, i) => <Block key={i} block={block} />)}

        {/* FAQ */}
        {article.faqs?.length > 0 && (
          <div className="mt-14">
            <h2 className="flama-bold-italic text-ink text-[1.5rem] md:text-[1.7rem] mb-6">Preguntas frecuentes</h2>
            <div className="flex flex-col divide-y divide-line">
              {article.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="flama-bold-italic text-ink text-[1.05rem] mb-2">{f.q}</h3>
                  <p className="font-sans text-[15px] text-muted leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Servicio relacionado */}
        {article.relatedService && (
          <Link to={article.relatedService.path} className="mt-12 group flex items-center justify-between gap-4 rounded-xl bg-primary/[0.06] border border-primary/20 px-6 py-5 hover:bg-primary/[0.1] transition-colors">
            <span className="font-sans text-[15px] font-medium text-ink">{article.relatedService.label}</span>
            <ArrowRightIcon size={16} className="text-primary shrink-0" />
          </Link>
        )}
      </article>

      {/* Artículos relacionados */}
      {related.length > 0 && (
        <section className="py-14 md:py-20 bg-surface border-t border-line">
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <h2 className="flama-bold-italic text-ink text-[1.4rem] mb-8">Sigue leyendo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((a) => (
                <Link key={a.slug} to={`/articulos/${a.slug}`} className="group rounded-2xl bg-white border border-line p-6 hover:border-primary transition-colors">
                  <span className="text-[11px] uppercase tracking-label text-primary">{categoryLabel(a.category)}</span>
                  <h3 className="flama-bold-italic text-ink text-[1.15rem] mt-2 mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="font-sans text-[13.5px] text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={<>¿Listo para <em>tu propio sistema?</em></>}
        message="Envía tu factura de energía y solicita una evaluación inicial para tu hogar o empresa en Bucaramanga y Santander."
        waMessage="Hola, leí un artículo en la web y quiero evaluar un sistema solar. Puedo enviar mi factura de energía."
        primaryLabel="Solicitar evaluación"
      />
    </main>
  )
}
