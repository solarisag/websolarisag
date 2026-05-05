import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import SectionLabel from '../ui/SectionLabel.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { WhatsAppIcon } from '../ui/Icons.jsx'
import { services } from '../../data/services.js'

/* ─── Service Modal ──────────────────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  const { title, tagline, longDescription, includes, benefits, overlayColor } = service

  const WHATSAPP_URL = `https://wa.me/573175696832?text=${encodeURIComponent(
    `Hola, me interesa el servicio de energía solar ${title}. ¿Podemos hablar?`
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
      transition={{ duration: 0.22 }}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        className="relative z-10 bg-bg w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: '90vh' }}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed inside modal */}
        <div
          className="relative shrink-0 px-8 pt-8 pb-7 rounded-t-2xl overflow-hidden"
          style={{ background: overlayColor.replace('0.72', '0.95').replace('0.80', '0.95').replace('0.82', '0.95') }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
          <div className="relative z-10">
            <span
              className="text-[10px] uppercase tracking-label text-white/50 mb-3 block"
              style={{ fontFamily: 'Flama, sans-serif' }}
            >
              {tagline}
            </span>
            <h2
              className="flama-bold-italic text-white leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {title}
            </h2>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8 space-y-8" style={{ overscrollBehavior: 'contain' }} onWheel={(e) => e.stopPropagation()}>

          {/* Description */}
          <p
            className="text-muted leading-relaxed"
            style={{ fontFamily: 'Flama, sans-serif', fontSize: '15px' }}
          >
            {longDescription}
          </p>

          {/* What's included */}
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              ¿Qué incluye?
            </span>
            <ul className="space-y-2.5">
              {includes.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent shrink-0 mt-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className="text-ink"
                    style={{ fontFamily: 'Flama, sans-serif', fontSize: '14px' }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-surface rounded-xl p-6">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-ink mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Beneficios clave
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-bg border border-line rounded-lg px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span
                    className="text-ink"
                    style={{ fontFamily: 'Flama, sans-serif', fontSize: '13px' }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pb-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#1ebe57] transition-colors text-[14px]"
            >
              <WhatsAppIcon size={17} />
              Solicitar asesoría
            </a>
            <a href="#contacto" onClick={onClose} className="btn-pill btn-pill-ghost">
              Ver formulario
            </a>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── Service Card ───────────────────────────────────────────────── */
function ServiceCard({ service, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      className="relative flex-none overflow-hidden rounded-xl cursor-pointer group"
      style={{ width: 'clamp(220px, 22vw, 310px)', aspectRatio: '3/4' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-10 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: '#FFCD46' }}
      />

      {/* Background photo */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={service.coverImage}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{ filter: 'brightness(0.55) saturate(0.7)' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </motion.div>

      {/* Color tint overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: service.overlayColor }}
        animate={{ opacity: hovered ? 0.45 : 0.82 }}
        transition={{ duration: 0.45 }}
      />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">

        {/* Top: number + tagline */}
        <div className="flex items-start justify-between">
          <motion.span
            animate={{ opacity: hovered ? 0.35 : 0.2 }}
            transition={{ duration: 0.3 }}
            className="flama-bold-italic text-white leading-none"
            style={{ fontSize: '3.5rem' }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.15em] text-accent mt-2"
            style={{ fontFamily: 'Flama, sans-serif' }}
          >
            {service.tagline}
          </motion.span>
        </div>

        {/* Bottom: title + button */}
        <div className="flex items-end justify-between gap-3">
          <div className="overflow-hidden">
            <motion.h3
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flama-bold-italic text-white leading-tight"
              style={{ fontSize: 'clamp(1.4rem, 2vw, 1.75rem)' }}
            >
              {service.title}
            </motion.h3>
            <motion.span
              animate={{ opacity: hovered ? 0.65 : 0, y: hovered ? 0 : 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block font-sans text-white text-[12px] mt-1"
            >
              Ver detalles
            </motion.span>
          </div>

          <motion.button
            onClick={() => onOpen(service)}
            animate={{
              backgroundColor: hovered ? '#FFCD46' : 'rgba(255,255,255,0.12)',
              scale: hovered ? 1.1 : 1,
              rotate: hovered ? 45 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center"
            aria-label={`Ver ${service.title}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke={hovered ? '#0A0A0A' : 'white'} strokeWidth="2.2">
              <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function Services() {
  const ref = useRef(null)
  const [selected, setSelected] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgX = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section id="servicios" ref={ref} className="relative py-24 md:py-32 bg-surface">

      {/* Atmospheric background — own overflow-hidden so it doesn't clip horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ x: bgX }} className="absolute inset-0">
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
        </motion.div>
      </div>

      <div className="relative z-10">

        {/* Header */}
        <div className="max-w-container mx-auto px-6 lg:px-10 mb-14 md:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel>Lo que hacemos</SectionLabel>
              <SectionTitle size="lg">
                Instalamos donde vives,
                <br />
                trabajas o <em>produces.</em>
              </SectionTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:text-right"
            >
              <p className="font-sans text-muted text-[14px] leading-relaxed lg:max-w-xs lg:ml-auto">
                De una habitación a una planta industrial — mismos estándares,
                misma garantía. Tu escala no cambia nuestra exigencia.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Cards — centered on desktop, horizontal scroll on mobile */}
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            className="flex gap-4 md:gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:justify-center scroll-smooth"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          >
            {services.map((s, i) => (
              <div key={s.id} style={{ scrollSnapAlign: 'start' }}>
                <ServiceCard service={s} index={i} onOpen={setSelected} />
              </div>
            ))}
            <div className="shrink-0 w-1 md:hidden" />
          </motion.div>
        </div>

        {/* RETIE Certificate */}
        <div className="max-w-container mx-auto px-6 lg:px-10 mt-14 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="border border-line rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left — text */}
              <div className="relative p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-line">
                {/* Hairline accent */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-8 w-10 h-[2px] bg-primary"
                />

                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[11px] uppercase tracking-label text-primary block mb-6 mt-2"
                >
                  Certificación oficial
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="title text-ink text-display-sm md:text-display-md leading-tight mb-6"
                >
                  Cada instalación,
                  <br />
                  <em>certificada bajo RETIE.</em>
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="text-muted text-[14px] leading-relaxed mb-8"
                >
                  El Reglamento Técnico de Instalaciones Eléctricas (RETIE) es el
                  estándar de seguridad obligatorio en Colombia. Todos nuestros
                  proyectos son certificados y avalados por{' '}
                  <span className="text-ink">ESSA Grupo EPM</span>,
                  lo que protege tu inversión técnica y legalmente.
                </motion.p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                  className="flex flex-col divide-y divide-line"
                >
                  {[
                    { label: 'Certificación', value: 'RETIE — Reglamento Técnico de Instalaciones Eléctricas' },
                    { label: 'Aval',          value: 'ESSA · Grupo EPM' },
                    { label: 'Trámites',      value: 'Gestionados 100% por SolarISAG' },
                  ].map(({ label, value }) => (
                    <motion.div
                      key={label}
                      variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                      className="flex items-baseline gap-6 py-4"
                    >
                      <span className="text-[10px] uppercase tracking-label text-muted w-24 shrink-0">{label}</span>
                      <span className="text-ink text-[13px]">{value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right — fotooo as background, certificate on top */}
              <div className="relative flex items-center justify-center p-8 md:p-12 overflow-hidden">
                {/* Background photo */}
                <img
                  src="/images/fotooo.webp"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-[340px] bg-white rounded-xl p-2 shadow-xl"
                >
                  <img
                    src="/images/CertificadoRetie.webp"
                    alt="Certificado RETIE SolarISAG"
                    className="w-full rounded-lg"
                  />
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>


      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ServiceModal service={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
