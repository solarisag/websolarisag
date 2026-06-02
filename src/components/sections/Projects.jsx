import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import SectionLabel from '../ui/SectionLabel.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { WhatsAppIcon } from '../ui/Icons.jsx'
import { projects } from '../../data/projects.js'

const FILTERS = [
  { key: 'todos',      label: 'Todos' },
  { key: 'hogar',      label: 'Hogares' },
  { key: 'comercial',  label: 'Comercial' },
  { key: 'industrial', label: 'Industrial' },
]

// Split "Todos" view into 2 rows after this many panels
const ROW_SPLIT = 4

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

/* ─── Project Modal (desktop only) ──────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const { title, type, location, kwp, year, coverImage, images, description, details } = project

  const WHATSAPP_URL = `https://wa.me/573175696832?text=${encodeURIComponent(
    `Hola, me interesa un proyecto similar a "${title}". ¿Podemos hablar?`
  )}`

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/75 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        className="relative z-10 bg-bg w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        style={{ maxHeight: '90vh' }}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-ink/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-ink transition-colors duration-200"
          aria-label="Cerrar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
          </svg>
        </button>

        {/* Scrollable body */}
        <div className="flex-1 min-h-0 overflow-y-auto" style={{ overscrollBehavior: 'contain' }} onWheel={(e) => e.stopPropagation()}>

          {/* Hero image */}
          <div className="relative w-full bg-ink" style={{ aspectRatio: '21/9' }}>
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
            <div className="absolute bottom-5 left-7 flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-label text-accent">{type}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-[10px] uppercase tracking-label text-white/65">{location}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-[10px] uppercase tracking-label text-white/65">{year}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-7 md:p-10">

            {/* Title + kWp */}
            <div className="flex items-start justify-between gap-6 mb-8 pb-8 border-b border-line">
              <h2
                className="flama-bold-italic text-ink leading-tight"
                style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
              >
                {title}
              </h2>
              <div className="shrink-0 text-right">
                <span
                  className="flama-bold-italic text-accent leading-none block"
                  style={{ fontSize: '2.5rem' }}
                >
                  {kwp}
                </span>
                <span className="text-[10px] uppercase tracking-label text-muted">kWp instalados</span>
              </div>
            </div>

            {/* Description + Technical details */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-10">
              <div className="md:col-span-3">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  El proyecto
                </span>
                <p
                  className="text-muted leading-relaxed"
                  style={{ fontFamily: 'Flama, sans-serif', fontSize: '15px' }}
                >
                  {description}
                </p>
              </div>

              <div className="md:col-span-2">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Ficha técnica
                </span>
                <div>
                  {Object.entries(details).map(([key, val]) => (
                    <div key={key} className="border-b border-line py-3 flex items-baseline gap-4">
                      <span className="text-[10px] uppercase tracking-label text-muted w-24 shrink-0">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span className="text-ink text-[13px]" style={{ fontFamily: 'Flama, sans-serif' }}>
                        {val}
                      </span>
                    </div>
                  ))}
                  <div className="border-b border-line py-3 flex items-baseline gap-4">
                    <span className="text-[10px] uppercase tracking-label text-muted w-24 shrink-0">Año</span>
                    <span className="text-ink text-[13px]" style={{ fontFamily: 'Flama, sans-serif' }}>{year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Galería
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-lg bg-surface ${
                        i === 0 ? 'col-span-2 md:col-span-3' : ''
                      }`}
                      style={{ aspectRatio: i === 0 ? '16/7' : '4/3' }}
                    >
                      <img
                        src={src}
                        alt={`${title} ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-line">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#1ebe57] transition-colors text-[14px]"
              >
                <WhatsAppIcon size={17} />
                Quiero algo similar
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Accordion Panel ────────────────────────────────────────────── */
function Panel({ project, displayIndex, isActive, anyHovered, isDesktop, onSelect, onHover, onHoverEnd }) {
  const content = (
    <>
      {/* Background photo */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isActive ? 1.06 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.backgroundColor = '#0f2027' }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      <motion.div
        className="absolute inset-0 bg-black/30"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top: number + type */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between px-6 py-7">
        <motion.span
          animate={{ opacity: isActive ? 1 : 0.35 }}
          transition={{ duration: 0.35 }}
          className="flama-bold-italic text-white leading-none"
          style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
        >
          {String(displayIndex + 1).padStart(2, '0')}
        </motion.span>
        <span
          className="text-[10px] uppercase tracking-[0.16em] text-accent mt-2"
          style={{ fontFamily: 'Flama, sans-serif', fontWeight: 500 }}
        >
          {project.type}
        </span>
      </div>

      {/* Bottom: title + meta */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-7">
        <motion.h3
          animate={{ y: isActive ? -4 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flama-bold-italic text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.35rem, 2.2vw, 2rem)' }}
        >
          {project.title}
        </motion.h3>

        <div className="flex items-end justify-between gap-4">
          <div>
            <span
              className="block text-white/55 uppercase tracking-[0.13em] mb-1"
              style={{ fontFamily: 'Flama, sans-serif', fontSize: '10px' }}
            >
              {project.location}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="flama-bold-italic text-accent leading-none" style={{ fontSize: '2rem' }}>
                {project.kwp}
              </span>
              <span
                className="text-white/40 uppercase tracking-[0.1em]"
                style={{ fontFamily: 'Flama, sans-serif', fontSize: '10px' }}
              >
                kWp
              </span>
            </div>
          </div>

          <motion.div
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center shrink-0 mb-0.5"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  )

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer min-h-[420px] md:min-h-0"
      style={{ flex: 1 }}
      animate={{ flexGrow: isActive ? 1.6 : anyHovered ? 0.7 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {isDesktop ? (
        <div className="absolute inset-0" onClick={() => onSelect(project)}>
          {content}
        </div>
      ) : (
        <Link to={`/proyectos/${project.slug}`} className="absolute inset-0">
          {content}
        </Link>
      )}
    </motion.div>
  )
}

/* ─── Accordion Row ──────────────────────────────────────────────── */
function AccordionRow({ rowProjects, startIndex, hovered, setHovered, isDesktop, onSelect, className }) {
  const anyHoveredInRow = rowProjects.some((p) => p.id === hovered)

  return (
    <motion.div
      className={`flex flex-col md:flex-row ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {rowProjects.map((p, i) => (
        <Panel
          key={p.id}
          project={p}
          displayIndex={startIndex + i}
          isActive={hovered === p.id}
          anyHovered={anyHoveredInRow}
          isDesktop={isDesktop}
          onSelect={onSelect}
          onHover={() => setHovered(p.id)}
          onHoverEnd={() => setHovered(null)}
        />
      ))}
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function Projects() {
  const [hovered, setHovered]     = useState(null)
  const [activeFilter, setFilter] = useState('todos')
  const [selected, setSelected]   = useState(null)
  const isDesktop                 = useIsDesktop()

  const filtered = activeFilter === 'todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const twoRows   = filtered.length > ROW_SPLIT
  const row1      = twoRows ? filtered.slice(0, ROW_SPLIT) : filtered
  const row2      = twoRows ? filtered.slice(ROW_SPLIT) : []

  return (
    <section id="proyectos">
      {/* Section header */}
      <div className="pt-16 md:pt-20 pb-10 bg-bg">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-10">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel>En obra</SectionLabel>
              <SectionTitle size="lg">
                Donde el sol
                <br />
                ya <em>trabaja.</em>
              </SectionTitle>
            </motion.div>
            <motion.div
              className="lg:col-span-5 lg:text-right flex lg:justify-end gap-3 items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] uppercase tracking-label text-muted">
                {filtered.length} caso{filtered.length !== 1 ? 's' : ''}
              </span>
              <span className="w-px h-4 bg-line" />
              <span className="text-[11px] uppercase tracking-label text-muted">
                Santander, Colombia
              </span>
            </motion.div>
          </div>

          {/* Category filters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => {
              const count = f.key === 'todos'
                ? projects.length
                : projects.filter((p) => p.category === f.key).length
              if (count === 0 && f.key !== 'todos') return null
              return (
                <motion.button
                  key={f.key}
                  onClick={() => { setFilter(f.key); setHovered(null) }}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                  className={`px-5 py-2 rounded-full text-[12px] border transition-all duration-350 ${
                    activeFilter === f.key
                      ? 'bg-ink text-bg border-ink'
                      : 'border-line text-muted hover:border-ink hover:text-ink'
                  }`}
                  style={{ fontFamily: 'Flama, sans-serif' }}
                >
                  {f.label}
                  <span className={`ml-2 text-[10px] ${activeFilter === f.key ? 'text-bg/50' : 'text-muted/60'}`}>
                    {count}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Accordion — one or two rows depending on count */}
      <AccordionRow
        rowProjects={row1}
        startIndex={0}
        hovered={hovered}
        setHovered={setHovered}
        isDesktop={isDesktop}
        onSelect={setSelected}
        className={twoRows
          ? 'md:h-[54vh] md:min-h-[380px]'
          : 'md:h-[88vh] md:min-h-[600px]'
        }
      />
      {twoRows && (
        <AccordionRow
          rowProjects={row2}
          startIndex={row1.length}
          hovered={hovered}
          setHovered={setHovered}
          isDesktop={isDesktop}
          onSelect={setSelected}
          className="md:h-[40vh] md:min-h-[280px]"
        />
      )}

      {/* Maintenance CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="py-16 md:py-20 max-w-container mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <p className="text-ink text-lg md:text-xl max-w-2xl">
          ¿Tus paneles no rinden como antes?
          <br />
          <em className="serif-italic text-2xl md:text-3xl">
            No importa quién los instaló — los revisamos.
          </em>
        </p>
        <a href="#contacto" className="btn-pill btn-pill-dark shrink-0">
          Solicitar mantenimiento
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>

      {/* Modal — desktop only */}
      <AnimatePresence>
        {selected && isDesktop && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
