import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon } from '../ui/Icons.jsx'

/* ── System tiers by monthly bill ────────────────────────────────────── */
const TIERS = [
  { max: 250_000,   kwp: 3.6,  panels: 6  },
  { max: 450_000,   kwp: 6.0,  panels: 12 },
  { max: 1_500_000, kwp: 10.0, panels: 16 },
]

/* ── Default tariffs COP/kWh for savings estimate ────────────────────── */
const TARIFF = { residencial: 700, comercial: 820, industrial: 680 }

const PROD_MONTH = 125  // kWh/kWp/month in Santander

function getTier(bill) {
  return TIERS.find(t => bill <= t.max) ?? null
}

function calc(bill, type) {
  const tier = getTier(bill)
  if (!tier) return null

  const tariff         = TARIFF[type]
  const monthlyKwh     = bill / tariff
  const systemProd     = tier.kwp * PROD_MONTH
  const coverage       = Math.min(systemProd / monthlyKwh, 0.95)
  const monthlySavings = bill * coverage
  const annualSavings  = monthlySavings * 12
  const co2KgYear      = monthlyKwh * 12 * coverage * 0.4

  return {
    kwp: tier.kwp.toFixed(1),
    panels: tier.panels,
    coveragePct: Math.round(coverage * 100),
    monthlySavings,
    annualSavings,
    co2KgYear: Math.round(co2KgYear),
  }
}

const fmt  = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
const fmtN = (n) => new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(n)
const EASE = [0.22, 1, 0.36, 1]

function Pill({ active, onClick, children, wide }) {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
      className={`${wide ? 'px-5' : 'w-10'} h-10 rounded-full text-[13px] transition-all duration-250 flama-bold-italic`}
      style={{
        border: active ? '1px solid #FFCD46' : '1px solid rgba(255,255,255,0.14)',
        background: active ? '#FFCD46' : 'transparent',
        color: active ? '#0A0A0A' : 'rgba(255,255,255,0.55)',
        fontWeight: active ? 700 : 400,
      }}>
      {children}
    </motion.button>
  )
}

const DEFAULT_BILL = { residencial: 350_000, comercial: 600_000, industrial: 900_000 }

export default function Calculator() {
  const [bill, setBill] = useState(350_000)
  const [type, setType] = useState('residencial')

  function switchType(t) {
    setType(t)
    setBill(DEFAULT_BILL[t])
  }

  const r       = useMemo(() => calc(bill, type), [bill, type])
  const pct     = ((bill - 95_000) / (1_500_000 - 95_000)) * 100
  const isLarge = bill >= 1_500_000

  return (
    <section id="calculadora" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #091820 0%, #0e2c38 55%, #091820 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right,rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.025) 1px,transparent 1px)',
        backgroundSize: '72px 72px'
      }} />
      <div className="absolute -top-40 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,205,70,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 items-end">
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

              {/* Type selector */}
              <div className="flex gap-2 mb-6">
                <Pill wide active={type === 'residencial'} onClick={() => switchType('residencial')}>Residencial</Pill>
                <Pill wide active={type === 'comercial'}   onClick={() => switchType('comercial')}>Comercial</Pill>
                <Pill wide active={type === 'industrial'}  onClick={() => switchType('industrial')}>Industrial</Pill>
              </div>

              {/* Bill */}
              <span className="block text-[11px] uppercase tracking-label mb-4"
                style={{ color: 'rgba(255,255,255,0.38)' }}>
                Tu factura mensual de luz
              </span>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="flama-bold-italic text-2xl" style={{ color: 'rgba(255,255,255,0.35)' }}>$</span>
                <motion.span key={bill} initial={{ opacity: 0.6, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flama-bold-italic text-white"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', lineHeight: 1 }}>
                  {fmtN(bill)}
                </motion.span>
                <span className="text-xs uppercase tracking-label self-end pb-1.5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}>COP</span>
              </div>
              <input type="range" min="95000" max="1500000" step="5000"
                value={bill} onChange={(e) => setBill(+e.target.value)}
                className="solar-range mb-2"
                style={{
                  background: `linear-gradient(to right, #FFCD46 0%, #FFCD46 ${Math.min(100, Math.max(0, pct))}%, rgba(255,255,255,0.1) ${Math.min(100, Math.max(0, pct))}%, rgba(255,255,255,0.1) 100%)`
                }} />
              <div className="flex justify-between text-[10px] uppercase tracking-label mb-1.5"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                <span>$95K</span><span>$1.5M</span>
              </div>
              <div className="text-center mb-10">
                <span className="font-sans text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {isLarge
                    ? 'Proyecto de gran escala — requiere estudio personalizado'
                    : `Sistema de ${r?.kwp} kWp · ${r?.panels} paneles aprox.`
                  }
                </span>
              </div>

              < href="#contacto" className="btn-pill btn-pill-accent w-full flex justify-center">
                Solicitar propuesta exacta
                <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isLarge ? (
                <motion.div
                  key="large"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6"
                  style={{ border: '1px solid rgba(255,205,70,0.22)', background: 'rgba(255,205,70,0.04)', minHeight: 320 }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle cx="24" cy="24" r="22" stroke="rgba(255,205,70,0.35)" strokeWidth="2"/>
                    <path d="M24 14v14M24 34v2" stroke="#FFCD46" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="flama-bold-italic text-white text-2xl mb-2">Proyecto de gran escala</p>
                    <p className="font-sans text-[14px] leading-relaxed max-w-sm mx-auto"
                      style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Para facturaciones superiores a $1.5M diseñamos un estudio energético personalizado con proyección de retorno de inversión.
                    </p>
                  </div>
                  <a href="#contacto" className="btn-pill btn-pill-accent">
                    Iniciar estudio energético
                    <ArrowRightIcon size={14} />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  {/* Panels */}
                  <div className="flex items-end gap-6 pb-8 mb-8"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
                    <div>
                      <span className="block text-[11px] uppercase tracking-label mb-2"
                        style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Paneles solares necesarios
                      </span>
                      <motion.div key={r?.panels} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex items-end gap-3">
                        <span className="flama-bold-italic text-accent leading-none tabular-nums"
                          style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}>
                          {r?.panels}
                        </span>
                        <span className="flama-bold-italic text-white/60 pb-2 text-2xl">paneles</span>
                      </motion.div>
                      <span className="block font-sans text-[13px] mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Sistema de {r?.kwp} kWp · cubre hasta el {r?.coveragePct}% de tu consumo
                      </span>
                    </div>
                  </div>

                  {/* Savings + CO2 */}
                  <div className="grid grid-cols-2 gap-6 pb-8 mb-8"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
                    <div>
                      <span className="block text-[10px] uppercase tracking-label mb-2"
                        style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Ahorro mensual
                      </span>
                      <motion.span key={r?.monthlySavings} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="block flama-bold-italic text-xl md:text-2xl tabular-nums leading-none"
                        style={{ color: '#FFCD46' }}>
                        {fmt(r?.monthlySavings)}
                      </motion.span>
                      <span className="block font-sans text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        {fmt(r?.annualSavings)} al año
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-label mb-2"
                        style={{ color: 'rgba(255,255,255,0.3)' }}>
                        CO2 evitado
                      </span>
                      <motion.span key={r?.co2KgYear} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="block flama-bold-italic text-xl md:text-2xl tabular-nums leading-none text-white/90">
                        {fmtN(r?.co2KgYear)} kg
                      </motion.span>
                      <span className="block font-sans text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        anuales no emitidos
                      </span>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
