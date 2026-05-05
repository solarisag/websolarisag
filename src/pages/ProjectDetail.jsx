import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/ui/Navbar.jsx'
import Footer from '../components/ui/Footer.jsx'
import BackToTop from '../components/ui/BackToTop.jsx'
import { getProjectBySlug, projects } from '../data/projects.js'
import { ArrowLeftIcon, ArrowRightIcon, WhatsAppIcon } from '../components/ui/Icons.jsx'

const WHATSAPP_TEMPLATE = (title) =>
  `https://wa.me/573175696832?text=${encodeURIComponent(
    `Hola, me interesa un proyecto similar a "${title}". ¿Podemos hablar?`
  )}`

function NotFound() {
  return (
    <main className="bg-bg text-ink min-h-screen">
      <Navbar />
      <section className="pt-40 pb-32 max-w-container mx-auto px-6 lg:px-10 text-center">
        <span className="text-accent uppercase tracking-label text-xs font-semibold">404</span>
        <h1 className="title text-display-md mt-4">
          Proyecto <em>no encontrado.</em>
        </h1>
        <p className="text-muted mt-6 mb-10">El proyecto que buscas no existe o fue movido.</p>
        <Link to="/#proyectos" className="btn-pill btn-pill-dark">
          <ArrowLeftIcon size={14} /> Ver todos los casos
        </Link>
      </section>
      <Footer />
    </main>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="border-b border-line py-5 flex items-baseline gap-6">
      <span className="text-[10px] uppercase tracking-label text-muted w-32 shrink-0">
        {label}
      </span>
      <span className="text-ink text-[15px]">{value}</span>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const { title, type, location, kwp, year, coverImage, images, description, details } = project
  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <main className="bg-bg text-ink min-h-screen">
      <Navbar />
      <BackToTop />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-ink to-ink" />
        <img
          src={coverImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 h-full flex flex-col justify-end pb-20 pt-32">
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2 text-bg/70 hover:text-accent text-sm mb-8 transition-colors w-fit"
          >
            <ArrowLeftIcon size={14} /> Ver todos los casos
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6 text-bg/70">
              <span className="text-[10px] uppercase tracking-label text-accent">{type}</span>
              <span className="w-1 h-1 rounded-full bg-bg/40" />
              <span className="text-[10px] uppercase tracking-label">{location}</span>
              <span className="w-1 h-1 rounded-full bg-bg/40" />
              <span className="text-[10px] uppercase tracking-label">{year}</span>
            </div>
            <h1 className="title text-bg text-4xl md:text-display-lg lg:text-display-xl max-w-5xl">
              {title.split(' ').slice(0, -1).join(' ')}{' '}
              <em>{title.split(' ').slice(-1)}</em>
            </h1>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="serif-italic text-accent text-5xl md:text-6xl leading-none">
                {kwp}
              </span>
              <span className="text-bg/65 text-sm uppercase tracking-label">
                kWp instalados
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description + Details */}
      <section className="py-20 md:py-28 max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              El proyecto
            </span>
            <p className="text-ink-soft text-lg md:text-xl leading-relaxed">{description}</p>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Ficha técnica
            </span>
            <div>
              {Object.entries(details).map(([key, val]) => (
                <DetailRow key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
              ))}
              <DetailRow label="Año" value={year} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 md:pb-28 max-w-container mx-auto px-6 lg:px-10">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Galería
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`bg-surface border border-line overflow-hidden ${
                i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={src}
                alt={`${title} — foto ${i + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-surface border-y border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <h2 className="title text-display-sm md:text-display-md max-w-2xl mx-auto">
            ¿Te interesa un proyecto similar?
            <br />
            <em>Hablemos.</em>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_TEMPLATE(title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#1ebe57] transition-colors text-[14px]"
            >
              <WhatsAppIcon size={18} />
              Escribir por WhatsApp
            </a>
            <Link to="/#contacto" className="btn-pill btn-pill-ghost">
              o llena el formulario
            </Link>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next && next.slug !== slug && (
        <section className="py-20 md:py-28 max-w-container mx-auto px-6 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Siguiente proyecto
          </span>
          <Link
            to={`/proyectos/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-t border-b border-line py-10 hover:border-ink transition-colors"
          >
            <div>
              <span className="text-[11px] uppercase tracking-label text-muted">
                {next.type} · {next.location}
              </span>
              <h3 className="title text-ink text-2xl md:text-display-md mt-2 group-hover:translate-x-2 transition-transform duration-500">
                {next.title.split(' ').slice(0, -1).join(' ')}{' '}
                <em>{next.title.split(' ').slice(-1)}</em>
              </h3>
            </div>
            <ArrowRightIcon size={28} className="text-ink shrink-0" />
          </Link>
        </section>
      )}

      <Footer />
    </main>
  )
}
