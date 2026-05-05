import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRightIcon } from '../ui/Icons.jsx'

const TARIFF = 750
const SOLAR_COVERAGE = 0.8
const COST_PER_KWP = 2_800_000
const BASE_INSTALL_COST = 5_000_000
const PROD_PER_KWP_MONTH = 125

function calc(monthlyBill) {
  const monthlyKwh = monthlyBill / TARIFF
  const kwp = Math.max(1, monthlyKwh / PROD_PER_KWP_MONTH / SOLAR_COVERAGE)
  const monthlySavings = monthlyBill * SOLAR_COVERAGE
  const annualSavings = monthlySavings * 12
  const systemCost = BASE_INSTALL_COST + kwp * COST_PER_KWP
  const paybackYears = systemCost / annualSavings
  const lifetimeSavings = annualSavings * 25 - systemCost
  const co2KgYear = monthlyKwh * 12 * SOLAR_COVERAGE * 0.4
  const treesEquivalent = Math.round(co2KgYear / 21)
  const taxDeduction = systemCost * 0.5
  return {
    kwp: kwp.toFixed(1),
    panels: Math.ceil((kwp * 1000) / 450),
    monthlySavings,
    annualSavings,
    systemCost,
    taxDeduction,
    paybackYears: paybackYears.toFixed(1),
    lifetimeSavings,
    co2KgYear: Math.round(co2KgYear),
    treesEquivalent
  }
}

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
const fmtN = (n) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(n)

const EASE = [0.22, 1, 0.36, 1]

function Num({ value, large, accent }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`block flama-bold-italic tabular-nums leading-none ${large ? 'text-[1.9rem] md:text-[2.2rem]' : 'text-xl md:text-2xl'}`}
      style={{ color: accent ? '#FFCD46' : 'rgba(255,255,255,0.92)' }}
    >
      {value}
    </motion.span>
  )
}

function SavingsChart({ annualSavings, paybackYears, inView }) {
  const pts = Array.from({ length: 26 }, (_, i) => i)
  const maxY = Math.max(annualSavings * 25, 1) * 1.08
  const W = 520, H = 180
  const x = (i) => (i / 25) * W
  const yS = (v) => H - (v / maxY) * H
  const path = pts.map((i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${yS(i * annualSavings)}`).join(' ')
  const pb = Math.min(25, +paybackYears)
  const pbX = x(pb)
  const pbY = yS(pb * annualSavings)

  return (
    <svg viewBox={`0 0 ${W} ${H + 36}`} className="w-full h-auto" aria-label="Proyección de ahorro 25 años">
      <defs>
        <linearGradient id="calcFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCD46" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFCD46" stopOpacity="0" />
        </linearGradient>
        <filter id="dotGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {[0.25, 0.5, 0.75].map((t, i) => (
        <line key={i} x1="0" y1={H * t} x2={W} y2={H * t}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 8" />
      ))}
      <line x1="0" y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <motion.path
        d={`${path} L${W} ${H} L0 ${H} Z`}
        fill="url(#calcFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      />
      <motion.path
        d={path} fill="none"
        stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.3, ease: EASE }}
        key={annualSavings}
      />

      {inView && pb < 24 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
        >
          <line x1={pbX} y1={0} x2={pbX} y2={H}
            stroke="#FFCD46" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.5" />
          <circle cx={pbX} cy={pbY} r="5" fill="#FFCD46" filter="url(#dotGlow)" />
          <circle cx={pbX} cy={pbY} r="2.5" fill="white" />
          <rect x={pbX + 8} y={pbY - 16} width={130} height={20} rx="3"
            fill="rgba(255,205,70,0.12)" stroke="rgba(255,205,70,0.28)" strokeWidth="1" />
          <text x={pbX + 73} y={pbY - 3} textAnchor="middle"
            fill="#FFCD46" style={{ font: '600 8.5px Flama, sans-serif', letterSpacing: '0.06em' }}>
            RECUPERAS LA INVERSIÓN
          </text>
        </motion.g>
      )}

      {[0, 5, 10, 15, 20, 25].map((y) => (
        <text key={y} x={x(y)} y={H + 20} textAnchor="middle"
          fill="rgba(255,255,255,0.28)" style={{ font: '500 10px Flama, sans-serif' }}>
          {y === 0 ? 'Hoy' : `${y}a`}
        </text>
      ))}
    </svg>
  )
}

export default function Calculator() {
  const [bill, setBill] = useState(450_000)
  const r = useMemo(() => calc(bill), [bill])
  const chartRef = useRef(null)
  const chartInView = useInView(chartRef, { once: true, margin: '-80px 0px' })

  const pct = ((bill - 100_000) / (5_000_000 - 100_000)) * 100
  return (
    <section
      id="calculadora"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #091820 0%, #0e2c38 55%, #091820 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right,rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.025) 1px,transparent 1px)',
          backgroundSize: '72px 72px'
        }}
      />
      <div className="absolute -top-40 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,205,70,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(39,83,96,0.28) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-7">
            <span className="inline-block text-[11px] uppercase tracking-label text-accent mb-6">
              Calculadora de ahorro
            </span>
            <h2 className="title text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.08 }}>
              Cuánto dejas de pagar.
              <br />
              Cuándo empieza a <em>sobrar.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="font-sans text-[14px] leading-relaxed lg:max-w-xs lg:ml-auto"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              Estimación basada en tarifas de Santander y radiación local.
              La tarifa sube un 9% anual — tu ahorro real será mayor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT — Input */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <span className="block text-[11px] uppercase tracking-label mb-4"
                style={{ color: 'rgba(255,255,255,0.38)' }}>
                Tu factura mensual de luz
              </span>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="flama-bold-italic text-2xl" style={{ color: 'rgba(255,255,255,0.35)' }}>$</span>
                <motion.span
                  key={bill}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flama-bold-italic text-white"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', lineHeight: 1 }}
                >
                  {fmtN(bill)}
                </motion.span>
                <span className="text-xs uppercase tracking-label self-end pb-1.5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}>
                  COP
                </span>
              </div>

              <input
                type="range" min="100000" max="5000000" step="50000"
                value={bill} onChange={(e) => setBill(+e.target.value)}
                className="solar-range mb-2"
                style={{
                  background: `linear-gradient(to right, #FFCD46 0%, #FFCD46 ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
              <div className="flex justify-between text-[10px] uppercase tracking-label mb-1.5"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                <span>$100K</span>
                <span>$5M</span>
              </div>
              <div className="text-center mb-8">
                <span className="font-sans text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Estimado {fmtN(Math.round(bill / TARIFF))} kWh/mes
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  { label: 'Casa', v: 350_000, sub: '$350K' },
                  { label: 'Pyme', v: 1_200_000, sub: '$1.2M' },
                  { label: 'Industria', v: 4_000_000, sub: '$4M' }
                ].map((p) => (
                  <motion.button
                    key={p.label}
                    onClick={() => setBill(p.v)}
                    whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
                    className="px-4 py-2 rounded-full text-[12px] transition-all duration-300"
                    style={{
                      border: bill === p.v ? '1px solid #FFCD46' : '1px solid rgba(255,255,255,0.12)',
                      background: bill === p.v ? '#FFCD46' : 'transparent',
                      color: bill === p.v ? '#0A0A0A' : 'rgba(255,255,255,0.55)',
                      fontWeight: bill === p.v ? 600 : 400
                    }}
                  >
                    {p.label} <span style={{ opacity: 0.65 }}>{p.sub}</span>
                  </motion.button>
                ))}
              </div>

              <a href="#contacto" className="btn-pill btn-pill-accent w-full flex justify-center">
                Solicitar propuesta exacta
                <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Primary stats */}
            <div className="grid grid-cols-2 gap-8 pb-8 mb-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
              <div>
                <span className="block text-[10px] uppercase tracking-label mb-3"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Ahorro mensual
                </span>
                <Num value={fmt(r.monthlySavings)} large accent />
                <motion.span key={r.annualSavings}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  className="block font-sans text-[12px] mt-2"
                  style={{ color: 'rgba(255,255,255,0.32)' }}>
                  {fmt(r.annualSavings)} al año
                </motion.span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-label mb-3"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Punto de equilibrio
                </span>
                <Num value={`${r.paybackYears} años`} large />
                <span className="block font-sans text-[12px] mt-2"
                  style={{ color: 'rgba(255,255,255,0.32)' }}>
                  Recuperas la inversión
                </span>
              </div>
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 gap-8 pb-8 mb-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
              <div>
                <span className="block text-[10px] uppercase tracking-label mb-2.5"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Sistema
                </span>
                <Num value={`${r.kwp} kWp`} />
                <span className="block font-sans text-[11px] mt-1.5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {r.panels} paneles
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-label mb-2.5"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  CO2 evitado
                </span>
                <Num value={`${fmtN(r.co2KgYear)} kg`} />
                <span className="block font-sans text-[11px] mt-1.5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {r.treesEquivalent} arboles/año
                </span>
              </div>
            </div>

            {/* Chart — no box, flows naturally */}
            <div ref={chartRef} className="flex-1">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <span className="block text-[10px] uppercase tracking-label mb-1"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Proyección acumulada · 25 años
                  </span>
                  <motion.span
                    key={r.lifetimeSavings}
                    initial={{ y: 4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flama-bold-italic text-accent text-2xl md:text-[1.7rem] tabular-nums"
                  >
                    {fmt(r.lifetimeSavings)}
                  </motion.span>
                  <span className="block font-sans text-[11px] mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.28)' }}>
                    beneficio neto tras recuperar inversión
                  </span>
                </div>
              </div>
              <SavingsChart
                annualSavings={r.annualSavings}
                paybackYears={r.paybackYears}
                inView={chartInView}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
