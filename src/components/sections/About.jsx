import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Counter from '../ui/Counter.jsx'

const stats = [
  { to: 100, suffix: '%', label: 'De ahorro posible\nen tu factura de luz' },
  { to: 50,  suffix: '%', label: 'Deducción en\nimpuesto de renta' },
  { to: null, value: '+',  label: 'Valorización\nde tu propiedad' },
]

/* ── Variants ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const fadeLeft = {
  hidden:  { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const lineReveal = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger      = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const staggerLeft  = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const cardStagger  = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.28 } } }
const statsStagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="nosotros" ref={ref} className="relative bg-bg">

      {/* ── Editorial split ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">

        <motion.div
          className="absolute -top-16 right-0 w-[480px] h-[480px] rounded-full bg-accent/10 blur-[140px] pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        />

        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

            {/* ── Left column — staggered entrance ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-7"
            >
              {/* Quote marks */}
              <motion.svg
                variants={fadeUp}
                width="40" height="30" viewBox="0 0 40 30" fill="none" aria-hidden="true"
              >
                <path
                  d="M0 30V19C0 13.4 1.56 8.9 4.67 5.37 7.78 1.79 12.2 0 18 0v5.6c-3.56 0-6.26.97-8.1 2.9C8.06 10.43 7.11 13.1 7.11 16.5v1.56H18V30H0zm22 0V19c0-5.6 1.56-10.1 4.67-13.63C29.78 1.79 34.2 0 40 0v5.6c-3.56 0-6.26.97-8.1 2.9-1.84 1.93-2.79 4.6-2.79 8v1.56H40V30H22z"
                  fill="rgba(255,205,70,0.30)"
                />
              </motion.svg>

              {/* Headline */}
              <motion.h2
                variants={{
                  hidden:  { opacity: 0, y: 32, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="title text-ink text-display-md md:text-display-lg"
              >
                No instalamos paneles.
                <br />
                Instalamos <em>independencia</em>
                <br />
                energética.
              </motion.h2>

              {/* Photo */}
              <motion.div
                variants={scaleIn}
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: '16/9' }}
              >
                <motion.div
                  className="absolute left-0 right-0"
                  style={{ y: imgY, top: '-8%', height: '116%' }}
                >
                  <img
                    src="/images/DJI_0592.webp"
                    alt="Girón, Santander"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Right — dark card with interior stagger ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <div
                className="rounded-2xl p-8 md:p-10 h-full overflow-hidden"
                style={{ backgroundColor: '#1a3540' }}
              >
                <motion.div
                  variants={cardStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="flex flex-col gap-7 h-full"
                >
                  {/* Title + sun icon */}
                  <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
                    <span className="flama-bold-italic text-accent text-3xl md:text-[2.6rem] leading-none">
                      Sobre nosotros
                    </span>
                    <motion.svg
                      width="32" height="32" viewBox="0 0 32 32" fill="none"
                      aria-hidden="true"
                      className="shrink-0 -mt-0.5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    >
                      <circle cx="16" cy="16" r="6" fill="#FFCD46" />
                      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
                        const rad = (deg * Math.PI) / 180
                        return (
                          <line
                            key={deg}
                            x1={16 + Math.cos(rad) * 9}  y1={16 + Math.sin(rad) * 9}
                            x2={16 + Math.cos(rad) * 14} y2={16 + Math.sin(rad) * 14}
                            stroke="#FFCD46" strokeWidth="2" strokeLinecap="round"
                          />
                        )
                      })}
                    </motion.svg>
                  </motion.div>

                  {/* Body */}
                  <motion.p variants={fadeUp} className="text-white text-lg md:text-xl leading-relaxed">
                    Especialistas en energía solar para los sectores residencial,
                    comercial e industrial. Nuestro enfoque va más allá de los
                    paneles: acompañamos cada proyecto de principio a fin.
                  </motion.p>

                  {/* Process steps — each row slides from left */}
                  <motion.div
                    variants={staggerLeft}
                    className="flex flex-col divide-y divide-white/[0.08]"
                  >
                    {[
                      'Diagnóstico energético',
                      'Diseño del sistema',
                      'Suministro e instalación',
                      'Puesta en marcha',
                      'Soporte técnico continuo',
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        variants={fadeLeft}
                        className="flex items-center gap-5 py-3 group/step"
                      >
                        <span className="flama-bold-italic text-accent text-2xl leading-none w-10 shrink-0 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-white/80 text-[15px] md:text-base group-hover/step:text-white transition-colors duration-350">
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Divider — draws in */}
                  <motion.div
                    variants={lineReveal}
                    className="h-px bg-white/10"
                    style={{ originX: 0 }}
                  />

                  {/* Benefits — bordered tags */}
                  <motion.div
                    variants={stagger}
                    className="grid grid-cols-2 gap-2"
                  >
                    {[
                      'Reduce tu factura',
                      'Beneficios tributarios',
                      'Optimiza tu consumo',
                      'Energía sostenible',
                    ].map((b, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="flex items-center gap-2.5 border border-white/10 rounded-lg px-4 py-3 hover:border-accent/40 hover:bg-white/5 transition-all duration-350 cursor-default group/b"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent shrink-0">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-white/65 text-[13px] md:text-[14px] leading-snug group-hover/b:text-white/90 transition-colors duration-350">
                          {b}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={statsStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-container mx-auto px-6 lg:px-10 pb-16 md:pb-20"
      >
        <div className="border border-line rounded-2xl grid grid-cols-1 sm:grid-cols-3 overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`relative pt-8 pb-9 px-8 md:px-10 group cursor-default
                ${i > 0 ? 'sm:border-l border-t sm:border-t-0 border-line' : ''}
              `}
            >
              {/* Accent hairline — draws in on enter */}
              <motion.div
                variants={lineReveal}
                className="absolute top-0 left-8 w-10 h-[2px] bg-accent"
                style={{ originX: 0 }}
              />

              <div className="flex items-end gap-1 mb-3 leading-none">
                <span className="flama-bold-italic text-ink text-[3.5rem] md:text-[4.25rem] leading-none group-hover:text-primary transition-colors duration-350">
                  {s.to !== null
                    ? <Counter to={s.to} suffix="" duration={1.8} />
                    : s.value
                  }
                </span>
                {s.suffix && (
                  <span className="flama-bold-italic text-accent text-[1.75rem] md:text-[2.25rem] leading-none mb-1">
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="text-muted text-[11px] uppercase tracking-label leading-snug whitespace-pre-line">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
