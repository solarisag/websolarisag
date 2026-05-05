import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '../ui/SectionLabel.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

function PhoneMockup() {
  return (
    <svg viewBox="0 0 320 640" className="w-full h-auto" role="img" aria-label="App de monitoreo SolarISAG">
      <defs>
        <linearGradient id="phoneBg" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#0d1e25" />
          <stop offset="100%" stopColor="#060d10" />
        </linearGradient>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCD46" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFCD46" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="kpiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3d4a" />
          <stop offset="100%" stopColor="#0f2830" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect x="8" y="8" width="304" height="624" rx="44" fill="#0a0a0a" />
      <rect x="10" y="10" width="300" height="620" rx="42" fill="#111" stroke="#222" strokeWidth="0.5" />
      <rect x="20" y="20" width="280" height="600" rx="34" fill="url(#phoneBg)" />

      <rect x="116" y="30" width="88" height="24" rx="12" fill="#0a0a0a" />
      <circle cx="160" cy="42" r="5" fill="#1a1a1a" />
      <circle cx="160" cy="42" r="2" fill="#333" />

      <text x="38" y="46" fill="rgba(255,255,255,0.7)" style={{ font: '600 11px Flama, sans-serif' }}>9:41</text>
      <rect x="248" y="38" width="18" height="8" rx="1.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <rect x="249" y="39" width="13" height="6" rx="1" fill="#FFCD46" />

      <text x="38" y="96" fill="rgba(255,205,70,0.7)" style={{ font: '600 9px Flama, sans-serif', letterSpacing: '0.2em' }}>
        SOLARISAG · MONITOR
      </text>
      <text x="38" y="128" fill="white" style={{ font: 'italic 400 26px Flama, sans-serif', letterSpacing: '-0.02em' }}>
        Tu producción
      </text>
      <text x="38" y="148" fill="rgba(255,255,255,0.4)" style={{ font: '400 11px Flama, sans-serif' }}>
        Lunes, 04 de mayo · Santander
      </text>

      <rect x="246" y="118" width="52" height="20" rx="10" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.4)" strokeWidth="0.8" />
      <circle cx="256" cy="128" r="3" fill="#4ade80" />
      <text x="263" y="132" fill="#4ade80" style={{ font: '600 9px Flama, sans-serif' }}>Live</text>

      <rect x="28" y="168" width="264" height="110" rx="8" fill="url(#kpiGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <rect x="28" y="168" width="264" height="2" rx="1" fill="#FFCD46" opacity="0.9" />
      <text x="46" y="196" fill="rgba(255,255,255,0.45)" style={{ font: '600 9px Flama, sans-serif', letterSpacing: '0.18em' }}>
        PRODUCIDO HOY
      </text>
      <text x="46" y="240" fill="#FFCD46" style={{ font: 'italic 400 46px Flama, sans-serif', letterSpacing: '-0.03em' }}
        filter="url(#glow)">
        38.2
      </text>
      <text x="130" y="240" fill="rgba(255,255,255,0.7)" style={{ font: '600 16px Flama, sans-serif' }}>kWh</text>
      <rect x="46" y="255" width="60" height="16" rx="3" fill="rgba(74,222,128,0.1)" />
      <text x="76" y="266" textAnchor="middle" fill="#4ade80" style={{ font: '600 10px Flama, sans-serif' }}>↑ +12%</text>
      <text x="175" y="266" fill="rgba(255,255,255,0.3)" style={{ font: '400 9px Flama, sans-serif' }}>vs ayer</text>

      <rect x="28" y="294" width="264" height="190" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      <text x="46" y="322" fill="rgba(255,255,255,0.4)" style={{ font: '600 9px Flama, sans-serif', letterSpacing: '0.18em' }}>
        ÚLTIMOS 7 DÍAS
      </text>
      {[30, 60, 42, 75, 55, 88, 68].map((h, i) => (
        <g key={i}>
          <rect x={46 + i * 33} y={468 - h * 0.85} width={22} height={h * 0.85} fill="url(#chartGrad)" rx="2" />
          <rect x={46 + i * 33} y={468 - h * 0.85} width={22} height={3} rx="1" fill="#FFCD46" opacity={i === 6 ? 1 : 0.5} />
        </g>
      ))}
      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
        <text key={i} x={57 + i * 33} y={488} textAnchor="middle" fill="rgba(255,255,255,0.3)"
          style={{ font: '600 9px Flama, sans-serif' }}>{d}</text>
      ))}

      <rect x="28" y="500" width="126" height="88" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      <text x="46" y="526" fill="rgba(255,255,255,0.4)" style={{ font: '600 9px Flama, sans-serif', letterSpacing: '0.14em' }}>AHORRO MES</text>
      <text x="46" y="563" fill="white" style={{ font: 'italic 400 22px Flama, sans-serif' }}>$284.500</text>
      <text x="46" y="578" fill="rgba(74,222,128,0.8)" style={{ font: '600 9px Flama, sans-serif' }}>↑ Meta cumplida</text>

      <rect x="166" y="500" width="126" height="88" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      <text x="184" y="526" fill="rgba(255,255,255,0.4)" style={{ font: '600 9px Flama, sans-serif', letterSpacing: '0.14em' }}>SISTEMA</text>
      <text x="184" y="558" fill="#FFCD46" style={{ font: 'italic 400 20px Flama, sans-serif' }}>14.4 kWp</text>
      <text x="184" y="574" fill="rgba(255,255,255,0.35)" style={{ font: '400 9px Flama, sans-serif' }}>32 paneles · OK</text>
      <circle cx="278" cy="518" r="4" fill="rgba(74,222,128,0.2)" />
      <circle cx="278" cy="518" r="2" fill="#4ade80" />

      <rect x="128" y="614" width="64" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
    </svg>
  )
}

const FEATURES = [
  {
    n: '01',
    title: 'En tiempo real',
    desc: 'kWh producidos, consumo instantáneo y ahorro del día — en tu teléfono, donde estés.',
    color: 'var(--color-accent)'
  },
  {
    n: '02',
    title: 'Alertas automáticas',
    desc: 'Detectamos fallas antes que tú. Notificación inmediata y despacho técnico sin que lo pidas.',
    color: 'var(--color-accent)'
  },
  {
    n: '03',
    title: 'Histórico completo',
    desc: 'Día, mes, año — compara tu producción, proyecta ahorros y exporta reportes cuando quieras.',
    color: 'var(--color-primary)'
  },
  {
    n: '04',
    title: 'Soporte por WhatsApp',
    desc: 'Reporta una falla, agenda mantenimiento o consulta tu garantía — directo con el equipo técnico.',
    color: 'var(--color-primary)'
  },
]

export default function Support() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="soporte"
      ref={ref}
      className="relative py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Subtle glows */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,205,70,0.05) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(39,83,96,0.07) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel>Soporte y monitoreo</SectionLabel>
              <SectionTitle size="lg">
                Ves tu ahorro.
                <br />
                <em>En tiempo real.</em>
              </SectionTitle>
              <p className="font-sans text-muted mb-10 text-[15px] leading-relaxed mt-6" style={{ maxWidth: '28rem' }}>
                Conecta tu sistema y monitorea producción, consumo y ahorro
                desde la app — 24/7. Nuestro equipo recibe alertas automáticas
                y actúa antes de que notes algo.
              </p>
            </motion.div>

            {/* Features grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-10 border border-line bg-line"
            >
              {FEATURES.map((f) => (
                <motion.div
                  key={f.n}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
                  className="relative p-6 bg-bg group hover:bg-surface transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: f.color }} />
                  <span className="flama-bold-italic text-3xl leading-none mb-3 block"
                    style={{ color: f.color, opacity: 0.75 }}>
                    {f.n}
                  </span>
                  <span className="block title text-ink text-base mb-1.5">{f.title}</span>
                  <span className="font-sans text-muted text-[12px] leading-relaxed">{f.desc}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* RIGHT — Phone mockup */}
          <motion.div style={{ y }} className="relative max-w-xs mx-auto lg:max-w-sm w-full">
            <div className="absolute -inset-8 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,205,70,0.1) 0%, transparent 65%)' }} />

            <div className="relative" style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
              <PhoneMockup />
            </div>

            {/* Floating annotation — left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute top-28 -left-14 p-4 rounded-lg bg-bg border border-line shadow-lg"
              style={{ minWidth: '160px' }}
            >
              <span className="text-[9px] uppercase tracking-label text-muted block mb-1">
                Producción hoy
              </span>
              <span className="flama-bold-italic text-primary text-xl">38.2 kWh</span>
              <span className="block text-[10px] mt-0.5" style={{ color: '#16a34a' }}>↑ +12% vs ayer</span>
            </motion.div>

            {/* Floating annotation — right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute bottom-36 -right-14 p-4 rounded-lg bg-bg shadow-lg"
              style={{ border: '1px solid var(--color-accent)', minWidth: '160px' }}
            >
              <span className="text-[9px] uppercase tracking-label block mb-1"
                style={{ color: 'var(--color-accent-deep)' }}>
                Ahorro acumulado
              </span>
              <span className="flama-bold-italic text-ink text-xl">$284.500</span>
              <span className="block text-[10px] text-muted mt-0.5">este mes</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
