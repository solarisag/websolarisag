import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { WhatsAppIcon, ArrowRightIcon } from './Icons.jsx'
import { waLink } from '../../data/site.js'

const EASE = [0.22, 1, 0.36, 1]

// Breadcrumbs visuales — items: [{ name, path }]. El último es la página actual.
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-label text-muted mb-8">
      {items.map((it, i) => {
        const last = i === items.length - 1
        return (
          <span key={it.path} className="flex items-center gap-2">
            {last ? (
              <span className="text-ink">{it.name}</span>
            ) : (
              <Link to={it.path} className="hover:text-primary transition-colors">{it.name}</Link>
            )}
            {!last && <span aria-hidden="true">/</span>}
          </span>
        )
      })}
    </nav>
  )
}

// Encabezado de página con padding para librar la barra de navegación fija.
export function PageHero({ label, title, intro, breadcrumbs }) {
  return (
    <section className="relative bg-white pt-32 md:pt-40 pb-10 md:pb-14 border-b border-line">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-primary mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="title text-ink max-w-4xl"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.06 }}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-sans text-ink-soft text-[16px] md:text-[17px] leading-relaxed max-w-2xl mt-6"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  )
}

// Banda CTA final reutilizable.
export function CtaBand({
  title = '¿Damos el primer paso?',
  message = 'Cuéntanos tu caso y te ayudamos a evaluar la mejor solución para tu consumo.',
  waMessage = 'Hola, quiero una asesoría solar con SolarISAG.',
  primaryLabel = 'Escribir por WhatsApp',
}) {
  return (
    <section className="py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
        <h2 className="title text-ink" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.08 }}>
          {title}
        </h2>
        <p className="font-sans text-muted text-[15px] leading-relaxed max-w-xl mx-auto mt-5">
          {message}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#1ebe57] transition-colors text-[14px]"
          >
            <WhatsAppIcon size={18} />
            {primaryLabel}
          </a>
          <Link to="/#contacto" className="btn-pill btn-pill-dark">
            Solicitar una evaluación
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
