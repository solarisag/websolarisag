import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Rising photon particles — light energy ascending through the scene
const PHOTONS = [
  { x: '6%',  y: '74%', dur: 11, delay: 0    },
  { x: '18%', y: '86%', dur: 14, delay: 2.2  },
  { x: '29%', y: '70%', dur: 9,  delay: 4.1  },
  { x: '41%', y: '91%', dur: 12, delay: 1.0  },
  { x: '54%', y: '78%', dur: 10, delay: 6.3  },
  { x: '66%', y: '84%', dur: 13, delay: 2.8  },
  { x: '77%', y: '72%', dur: 11, delay: 5.0  },
  { x: '88%', y: '89%', dur: 9,  delay: 7.5  },
]

function EnergyParticleLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {PHOTONS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent"
          style={{ width: 3, height: 3, left: p.x, top: p.y }}
          animate={{ y: -900, opacity: [0, 0.16, 0.13, 0] }}
          transition={{
            y:       { duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' },
            opacity: { duration: p.dur, delay: p.delay, repeat: Infinity, times: [0, 0.07, 0.86, 1] },
          }}
        />
      ))}
    </div>
  )
}

const STATS = [
  {
    number: '25',
    label: 'años de garantía\nen cada sistema',
    delay: 0.67,
    accent: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke="rgba(255,205,70,0.22)" strokeWidth="2.5"/>
        <motion.circle
          cx="16" cy="16" r="13"
          stroke="#FFCD46" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="82"
          animate={{ strokeDashoffset: [82, 0, 0, 82] }}
          transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.52, 0.8, 1], ease: 'easeInOut' }}
        />
      </svg>
    ),
  },
  {
    number: '+55',
    label: 'proyectos de paneles\nsolares desarrollados',
    delay: 0.79,
    accent: (
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none" aria-hidden="true">
        {[0,1,2,3,4,5].map((i) => {
          const maxH = 4 + i * 2.5
          return (
            <motion.rect
              key={i}
              x={i * 6} width="4" rx="1"
              fill={i === 5 ? '#FFCD46' : 'rgba(255,205,70,0.35)'}
              animate={{ height: [0, maxH, maxH, 0], y: [20, 20 - maxH, 20 - maxH, 20] }}
              transition={{ duration: 2.6, delay: i * 0.07, repeat: Infinity, times: [0, 0.38, 0.74, 1], ease: [0.22, 1, 0.36, 1] }}
            />
          )
        })}
      </svg>
    ),
  },
]

function StatCard({ number, label, delay, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 min-w-0"
    >
      <motion.div
        className="rounded-2xl px-5 py-5 flex flex-col gap-3 h-full"
        style={{ backgroundColor: '#275360', boxShadow: '0 8px 32px -8px rgba(39,83,96,0.5)' }}
        whileHover={{ scale: 1.02, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        whileTap={{ scale: 0.97, transition: { duration: 0.12, ease: [0.65, 0, 0.35, 1] } }}
      >
        {/* Accent graphic */}
        <div>{accent}</div>

        {/* Number */}
        <div className="flama-bold-italic text-white text-[2.2rem] md:text-[2.8rem] leading-none tracking-tight">
          {number}
        </div>

        {/* Label */}
        <p className="text-[12px] md:text-[13px] text-white/70 leading-snug whitespace-pre-line">
          {label}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen overflow-hidden flex flex-col justify-end"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Video — parallax */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-[115%]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/background.mp4"
          autoPlay muted loop playsInline preload="auto"
        />
      </motion.div>

      {/* Overlay — gradient darker at the bottom so the headline stays legible
          while the video remains visible up top */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.45) 100%)',
      }} />

      {/* Photon particles — rising light energy */}
      <EnergyParticleLayer />

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 pb-20 md:pb-24 pt-36 md:pt-52">

        {/* Geo signal */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-accent mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Energía solar en Bucaramanga · Santander
        </motion.span>

        {/* Headline */}
        <h1 className="title text-white max-w-[700px] lg:max-w-[880px] text-[2.3rem] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.4rem] xl:text-[4.9rem] mb-7">
          {[
            'Tu factura de energía',
            'sigue subiendo.',
            <>Empieza a producir <em>la tuya.</em></>,
          ].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.28 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Sub-copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end gap-6 mb-14 md:mb-16"
        >
          <p className="text-[15px] md:text-base text-white/70 leading-relaxed max-w-md">
            Diseñamos, instalamos y legalizamos sistemas solares para hogares y empresas
            en Bucaramanga y Santander. Analizamos tu consumo para construir una solución
            que responda a tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:ml-6 shrink-0">
            <a href="#contacto" className="btn-pill btn-pill-accent">
              Cotiza tu sistema solar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 text-white/60 text-[14px] hover:text-white transition-colors group"
            >
              <span className="border-b border-white/25 group-hover:border-white pb-0.5 transition-colors">
                Ver proyectos realizados
              </span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Floating stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {STATS.map((s) => (
            <StatCard key={s.number} {...s} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-label text-white/35">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
