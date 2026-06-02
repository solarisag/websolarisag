import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { processSteps } from '../../data/services.js'

const EASE = [0.22, 1, 0.36, 1]

/* ─── Process Timeline ───────────────────────────────────────────── */
function ProcessTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
      {processSteps.map((step, i) => (
        <motion.div
          key={step.n}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
          className="relative bg-bg p-7 md:p-8 group hover:bg-surface transition-colors duration-350"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
            className="absolute top-0 left-0 w-full h-[2px] origin-left"
            style={{ backgroundColor: i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-primary)' }}
          />
          <div className="flex items-start justify-between mb-6">
            <span
              className="flama-bold-italic leading-none"
              style={{
                fontSize: '3.5rem',
                color: i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-primary)',
                opacity: 0.9
              }}
            >
              {step.n}
            </span>
          </div>
          <h3 className="flama-bold-italic text-ink text-xl md:text-2xl mb-3 leading-tight">
            {step.title}
          </h3>
          <p className="font-sans text-muted text-[13px] leading-relaxed">
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── How It Works — visual step cards ──────────────────────────── */
const STEPS = [
  {
    n: '01',
    title: 'El sol golpea los paneles',
    desc: 'Los paneles capturan la luz solar y la convierten en electricidad. Sin ruido, sin combustible, sin partes móviles.',
    color: 'var(--color-accent)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="11" fill="#FFCD46" />
        {[0,45,90,135,180,225,270,315].map(deg => {
          const r = (deg * Math.PI) / 180
          return (
            <line key={deg}
              x1={24 + Math.cos(r) * 15} y1={24 + Math.sin(r) * 15}
              x2={24 + Math.cos(r) * 20} y2={24 + Math.sin(r) * 20}
              stroke="#FFCD46" strokeWidth="2.5" strokeLinecap="round"
            />
          )
        })}
      </svg>
    )
  },
  {
    n: '02',
    title: 'El inversor la convierte',
    desc: 'Un pequeño equipo transforma esa corriente en la misma electricidad que usa cualquier enchufe de tu casa.',
    color: 'var(--color-primary)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="10" width="32" height="28" rx="4" fill="#275360" />
        <path d="M19 24l4-7 4 7" stroke="#FFCD46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 17v7h6" stroke="#FFCD46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15" cy="33" r="2" fill="#FFCD46" opacity="0.4" />
        <circle cx="24" cy="33" r="2" fill="#FFCD46" />
        <circle cx="33" cy="33" r="2" fill="#FFCD46" opacity="0.4" />
      </svg>
    )
  },
  {
    n: '03',
    title: 'Tu hogar consume primero',
    desc: 'Todo lo que produces lo usas tú directamente — luces, nevera, aire acondicionado, computadores.',
    color: 'var(--color-primary)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8L40 20v22H8V20L24 8Z" fill="#275360" />
        <path d="M8 20L24 8l16 12" fill="none" stroke="#1a3540" strokeWidth="2" />
        <rect x="19" y="28" width="10" height="14" rx="1" fill="rgba(255,255,255,0.15)" />
        <rect x="28" y="22" width="7" height="6" rx="1" fill="rgba(255,205,70,0.5)" />
        <circle cx="24" cy="20" r="2" fill="#FFCD46" opacity="0.8" />
      </svg>
    )
  },
  {
    n: '04',
    title: 'Los excedentes se convierten en dinero',
    desc: 'Lo que no consumes va a la red. El operador lo valora y transfiere su valor directamente a tu cuenta bancaria.',
    color: 'var(--color-accent)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="3" fill="#275360" />
        <path d="M8 20h32" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M24 14v-4M24 38v-4" stroke="#FFCD46" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 24c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#FFCD46" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 28l-1.5-1.5" stroke="#FFCD46" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 20l3-3M16 28l-3 3" stroke="#FFCD46" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    )
  },
  {
    n: '05',
    title: '25 años de producción garantizada',
    desc: 'Paneles con garantía de rendimiento por 25 años. El sistema trabaja solo — sin mantenimiento mayor, sin combustible, sin piezas móviles.',
    color: 'var(--color-accent)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" fill="#275360" />
        <path d="M18 24l4.5 4.5L31 19" stroke="#FFCD46" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="18" stroke="#FFCD46" strokeWidth="1" strokeOpacity="0.2" />
        <circle cx="24" cy="24" r="21" stroke="#FFCD46" strokeWidth="0.5" strokeOpacity="0.1" />
        <text x="24" y="9" textAnchor="middle" fill="#FFCD46" style={{ font: 'bold 5px sans-serif', opacity: 0.5 }}>25</text>
      </svg>
    )
  },
]

function HowItWorksFlow() {
  return (
    <div className="relative">
      {/* Desktop: horizontal row */}
      <div className="hidden lg:grid grid-cols-5 gap-0">
        {STEPS.map((s, i) => (
          <div key={s.n} className="relative flex">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="flex-1 flex flex-col p-6 xl:p-8 border-t-2 border-b border-line bg-bg group hover:bg-surface transition-colors duration-300"
              style={{ borderTopColor: s.color, borderLeft: i === 0 ? '1px solid var(--color-line)' : 'none', borderRight: '1px solid var(--color-line)' }}
            >
              {/* Number */}
              <span className="flama-bold-italic text-[2.8rem] leading-none mb-4"
                style={{ color: s.color, opacity: 0.18 }}>
                {s.n}
              </span>

              {/* Icon */}
              <div className="mb-5">{s.icon}</div>

              {/* Title */}
              <h3 className="title text-ink text-[1.05rem] leading-snug mb-3">{s.title}</h3>

              {/* Description */}
              <p className="font-sans text-muted text-[12.5px] leading-relaxed mt-auto">{s.desc}</p>
            </motion.div>

            {/* Arrow connector */}
            {i < STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: EASE }}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 origin-left"
              >
                <div className="w-6 h-6 rounded-full bg-bg border border-line flex items-center justify-center shadow-sm">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M6 3l2 2-2 2" stroke="var(--color-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="lg:hidden flex flex-col gap-0 border border-line">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            className="flex gap-5 p-6 bg-bg border-b border-line last:border-b-0"
          >
            {/* Left: number + connector */}
            <div className="flex flex-col items-center gap-3 shrink-0 pt-0.5">
              <span className="flama-bold-italic text-2xl leading-none"
                style={{ color: s.color }}>
                {s.n}
              </span>
              {i < STEPS.length - 1 && <div className="w-px flex-1 bg-line" />}
            </div>
            {/* Right: content */}
            <div className="pb-2">
              <div className="mb-3 scale-75 origin-left">{s.icon}</div>
              <h3 className="title text-ink text-lg mb-2 leading-snug">{s.title}</h3>
              <p className="font-sans text-muted text-[13px] leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32 bg-bg overflow-hidden">

      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10">

        {/* ── PART A: El Proceso ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 items-end">
          <div className="lg:col-span-7">
            <SectionLabel>El proceso</SectionLabel>
            <SectionTitle size="lg">
              De la primera llamada
              <br />a la <em>primera factura</em> cero.
            </SectionTitle>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="font-sans text-muted text-[14px] leading-relaxed lg:max-w-xs lg:ml-auto">
              Seis pasos, una sola firma. Sin subcontratistas, sin sorpresas.
            </p>
          </div>
        </div>

        <ProcessTimeline />

        {/* ── PART B: Cómo Funciona ─────────────────────────────── */}
        <div className="mt-28 md:mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 items-end">
            <div className="lg:col-span-7">
              <SectionLabel>Cómo funciona</SectionLabel>
              <SectionTitle size="lg">
                Generación, conversión,
                <br /><em>consumo propio.</em>
              </SectionTitle>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <p className="font-sans text-muted text-[14px] leading-relaxed lg:max-w-xs lg:ml-auto">
                Cinco pasos. Todo automático. Tú solo ves cómo baja la factura.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <HowItWorksFlow />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
