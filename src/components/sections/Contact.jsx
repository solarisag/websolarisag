import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from '../../utils/motion.js'
import {
  ArrowRightIcon, ArrowLeftIcon, WhatsAppIcon, MailIcon, PinIcon,
  SunIcon, BuildingIcon, FactoryIcon, WrenchIcon
} from '../ui/Icons.jsx'

const WHATSAPP_BASE = 'https://wa.me/573175696832'

const TIPOS = [
  { value: 'Residencial', label: 'Residencial', icon: SunIcon, hint: 'Casa o apartamento' },
  { value: 'Corporativo', label: 'Corporativo', icon: BuildingIcon, hint: 'Empresa u oficina' },
  { value: 'Industrial', label: 'Industrial', icon: FactoryIcon, hint: 'Planta industrial' },
  { value: 'Mantenimiento', label: 'Mantenimiento', icon: WrenchIcon, hint: 'Sistema existente' },
]

const CIUDADES = ['Bucaramanga', 'Girón', 'Floridablanca', 'Piedecuesta', 'Lebrija', 'Otro municipio']

const PROBLEMAS = [
  { value: 'No genera como antes',  hint: 'Producción reducida' },
  { value: 'Falla eléctrica',       hint: 'Error o alarma en el sistema' },
  { value: 'Limpieza / revisión',   hint: 'Mantenimiento preventivo' },
  { value: 'Revisar garantía',      hint: 'Reclamar garantía de equipo' },
]

const STEPS_NORMAL = [
  { q: '¿Qué tipo de instalación necesitas?', hint: 'Selecciona la que mejor describe tu caso' },
  { q: '¿Cuánto pagas de energía al mes?',    hint: 'Aprox. en pesos — lo usamos para dimensionar tu sistema' },
  { q: '¿En qué ciudad estás?',               hint: 'Para coordinar tu visita técnica gratuita' },
  { q: 'Perfecto — ¿cómo te contactamos?',    hint: 'Un asesor te responde hoy mismo' },
]

const STEPS_MANT = [
  { q: '¿Qué tipo de instalación necesitas?', hint: 'Selecciona la que mejor describe tu caso' },
  { q: '¿Cuál es el problema?',               hint: 'Cuéntanos qué pasa con tu sistema actual' },
  { q: '¿En qué ciudad estás?',               hint: 'Para coordinar la visita técnica' },
  { q: 'Perfecto — ¿cómo te contactamos?',    hint: 'Un técnico te responde hoy mismo' },
]

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
const fmtN = (n) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(n)

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
}

export default function Contact() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    tipo: '',
    factura: 450_000,
    estrato: 4,
    problema: '',
    ciudad: '',
    nombre: '',
    whatsapp: ''
  })

  const isMant        = form.tipo === 'Mantenimiento'
  const isResidencial = form.tipo === 'Residencial'
  const STEPS = isMant ? STEPS_MANT : STEPS_NORMAL

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const go = (next) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const selectTipo = (v) => {
    update('tipo', v)
    setTimeout(() => go(1), 260)
  }

  const selectCiudad = (v) => {
    update('ciudad', v)
    setTimeout(() => go(3), 260)
  }

  const selectProblema = (v) => {
    update('problema', v)
    setTimeout(() => go(2), 260)
  }

  const canProceed = () => {
    if (step === 1) return isMant ? form.problema !== '' : form.factura >= 100_000
    if (step === 3) return form.nombre.trim().length > 0 && form.whatsapp.trim().length > 0
    return false
  }

  const onSubmit = () => {
    const body = isMant
      ? `Hola, soy ${form.nombre}.\n\n` +
        `🔧 Solicitud: Mantenimiento\n` +
        `⚠️ Problema: ${form.problema}\n` +
        `📍 Ciudad: ${form.ciudad}\n` +
        `📱 WhatsApp: ${form.whatsapp}\n\n` +
        `Necesito asistencia técnica para mi sistema solar. ¿Cuándo pueden agendar la visita?`
      : `Hola, soy ${form.nombre}.\n\n` +
        `🏗️ Tipo de instalación: ${form.tipo}${isResidencial ? ` · Estrato ${form.estrato}` : ''}\n` +
        `💡 Factura mensual: ${fmt(form.factura)}\n` +
        `📍 Ciudad: ${form.ciudad}\n` +
        `📱 WhatsApp: ${form.whatsapp}\n\n` +
        `Me gustaría recibir una asesoría solar gratuita. ¿Cuándo pueden agendar la visita técnica?`
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const pct = ((form.factura - 100_000) / (5_000_000 - 100_000)) * 100

  return (
    <section id="contacto" className="relative overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/background-2.mp4"
        autoPlay muted loop playsInline preload="none"
        style={{ objectPosition: 'center 40%' }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(6,18,25,0.92) 0%, rgba(8,22,30,0.85) 50%, rgba(6,18,25,0.90) 100%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT — Editorial info */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="inline-block text-[11px] uppercase tracking-label text-accent mb-6">
                Hablemos
              </span>
              <h2 className="title text-white mb-6" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.04 }}>
                El primer paso
                <br />
                <em>no cuesta nada.</em>
              </h2>
              <p className="font-sans mb-10 text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '26rem' }}>
                Visita técnica gratuita en Bucaramanga, Girón, Floridablanca
                y Piedecuesta. Respondemos el mismo día.
              </p>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="flex flex-col gap-4 mb-10"
            >
              {[
                'Visita técnica sin costo',
                'Propuesta en 48h',
                'Sin compromiso de compra',
                '25 años de garantía en cada sistema',
              ].map((item) => (
                <span key={item} className="flex items-center gap-3 font-sans text-[14px]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="7.5" stroke="rgba(255,205,70,0.35)" />
                    <path d="M5 8l2.5 2.5L11 5.5" stroke="#FFCD46" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>

            {/* Direct WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mb-10 p-6 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
            >
              <span className="text-[10px] uppercase tracking-label block mb-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                WhatsApp · Respuesta el mismo día
              </span>
              <a href={`${WHATSAPP_BASE}?text=Hola%2C%20me%20interesa%20una%20asesor%C3%ADa%20solar`}
                target="_blank" rel="noopener noreferrer"
                className="block title text-white text-2xl md:text-3xl mb-5 hover:text-accent transition-colors duration-300"
              >
                +57 <em>317</em> 569 6832
              </a>
              <a
                href={`${WHATSAPP_BASE}?text=Hola%2C%20me%20interesa%20una%20asesor%C3%ADa%20solar`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-medium text-[14px] transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: '#25D366', color: 'white' }}
              >
                <WhatsAppIcon size={18} />
                Escribir ahora
              </a>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <a href="mailto:comercial@solarisag.com.co"
                className="flex items-center gap-3 group"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                <MailIcon size={16} />
                <span className="font-sans text-[13px] group-hover:text-accent transition-colors duration-250">
                  comercial@solarisag.com.co
                </span>
              </a>
              <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <PinIcon size={16} />
                <span className="font-sans text-[13px]">Cra 23 #30-47 Girón Centro · Santander</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Wizard form card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="lg:col-span-6 xl:col-span-7"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.98)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}
            >
              {!sent ? (
                <>
                  {/* Progress bar */}
                  <div className="flex gap-0" style={{ height: 3 }}>
                    {STEPS.map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1"
                        animate={{ background: i <= step ? 'var(--color-primary)' : 'var(--color-line)' }}
                        transition={{ duration: 0.4 }}
                      />
                    ))}
                  </div>

                  <div className="p-8 md:p-10">
                    {/* Step header */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] uppercase tracking-label text-muted">
                        Paso {step + 1} de {STEPS.length}
                      </span>
                      {step > 0 && (
                        <button
                          onClick={() => go(step - 1)}
                          className="flex items-center gap-1 text-[12px] text-muted hover:text-ink transition-colors"
                        >
                          <ArrowLeftIcon size={12} />
                          Atrás
                        </button>
                      )}
                    </div>

                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3 className="title text-ink text-xl md:text-2xl mt-2 mb-1.5" style={{ lineHeight: 1.2 }}>
                          {STEPS[step].q}
                        </h3>
                        <p className="font-sans text-muted text-[13px] mb-7">{STEPS[step].hint}</p>

                        {/* STEP 0 — Tipo */}
                        {step === 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {TIPOS.map((t) => {
                              const Icon = t.icon
                              const active = form.tipo === t.value
                              return (
                                <motion.button
                                  key={t.value}
                                  onClick={() => selectTipo(t.value)}
                                  whileTap={{ scale: 0.97 }}
                                  className="relative text-left p-5 rounded-xl border-2 transition-all duration-250"
                                  style={{
                                    borderColor: active ? 'var(--color-primary)' : 'var(--color-line)',
                                    background: active ? 'rgba(39,83,96,0.06)' : 'transparent',
                                  }}
                                >
                                  {active && (
                                    <motion.div
                                      layoutId="tipo-check"
                                      className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: 'var(--color-primary)' }}
                                    >
                                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </motion.div>
                                  )}
                                  <Icon size={22} className="mb-3"
                                    style={{ color: active ? 'var(--color-primary)' : 'var(--color-muted)' }} />
                                  <div className="font-sans font-semibold text-[14px] text-ink mb-0.5">{t.label}</div>
                                  <div className="font-sans text-[11px] text-muted">{t.hint}</div>
                                </motion.button>
                              )
                            })}
                          </div>
                        )}

                        {/* STEP 1 — Estrato+Factura (residencial), Factura (otros), Problema (mantenimiento) */}
                        {step === 1 && !isMant && (
                          <div>
                            {isResidencial && (
                              <div className="mb-6">
                                <span className="text-[10px] uppercase tracking-label text-muted block mb-3">
                                  Estrato
                                </span>
                                <div className="flex gap-2 flex-wrap mb-1">
                                  {[1, 2, 3, 4, 5, 6].map((e) => (
                                    <button
                                      key={e}
                                      onClick={() => update('estrato', e)}
                                      className="w-11 h-11 rounded-full border-2 font-sans font-semibold text-[14px] transition-all duration-200"
                                      style={{
                                        borderColor: form.estrato === e ? 'var(--color-primary)' : 'var(--color-line)',
                                        background: form.estrato === e ? 'var(--color-primary)' : 'transparent',
                                        color: form.estrato === e ? 'white' : 'var(--color-ink)',
                                      }}
                                    >
                                      {e}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="text-center mb-4 py-4 rounded-xl"
                              style={{ background: 'var(--color-surface)' }}>
                              <span className="flama-bold-italic text-primary"
                                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                                {fmt(form.factura)}
                              </span>
                              <span className="block font-sans text-[12px] text-muted mt-1">
                                pesos / mes
                              </span>
                            </div>
                            <input
                              type="range" min="100000" max="5000000" step="50000"
                              value={form.factura}
                              onChange={(e) => update('factura', +e.target.value)}
                              className="w-full mb-2 accent-primary"
                              style={{ height: '4px', cursor: 'pointer' }}
                            />
                            <div className="flex justify-between text-[10px] uppercase tracking-label text-muted mb-5">
                              <span>$100K</span>
                              <span>$5M</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {(isResidencial
                                ? [{ l: 'Casa', v: 300_000 }, { l: 'Apartamento', v: 180_000 }]
                                : [{ l: 'Oficina', v: 1_200_000 }, { l: 'Industria', v: 4_000_000 }]
                              ).map((p) => (
                                <button
                                  key={p.l}
                                  onClick={() => update('factura', p.v)}
                                  className="px-3 py-1.5 rounded-full text-[12px] border transition-all duration-200"
                                  style={{
                                    borderColor: form.factura === p.v ? 'var(--color-primary)' : 'var(--color-line)',
                                    background: form.factura === p.v ? 'rgba(39,83,96,0.08)' : 'transparent',
                                    color: form.factura === p.v ? 'var(--color-primary)' : 'var(--color-muted)',
                                    fontWeight: form.factura === p.v ? 600 : 400
                                  }}
                                >
                                  {p.l}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 1 && isMant && (
                          <div className="grid grid-cols-2 gap-3">
                            {PROBLEMAS.map((p) => {
                              const active = form.problema === p.value
                              return (
                                <motion.button
                                  key={p.value}
                                  onClick={() => selectProblema(p.value)}
                                  whileTap={{ scale: 0.97 }}
                                  className="relative text-left p-4 rounded-xl border-2 transition-all duration-250"
                                  style={{
                                    borderColor: active ? 'var(--color-primary)' : 'var(--color-line)',
                                    background: active ? 'rgba(39,83,96,0.06)' : 'transparent',
                                  }}
                                >
                                  {active && (
                                    <motion.div
                                      layoutId="problema-check"
                                      className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: 'var(--color-primary)' }}
                                    >
                                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </motion.div>
                                  )}
                                  <div className="font-sans font-semibold text-[13px] text-ink mb-0.5 pr-6">{p.value}</div>
                                  <div className="font-sans text-[11px] text-muted">{p.hint}</div>
                                </motion.button>
                              )
                            })}
                          </div>
                        )}

                        {/* STEP 2 — Ciudad */}
                        {step === 2 && (
                          <div className="flex flex-wrap gap-2.5">
                            {CIUDADES.map((c) => {
                              const active = form.ciudad === c
                              return (
                                <motion.button
                                  key={c}
                                  onClick={() => selectCiudad(c)}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-5 py-3 rounded-full border-2 text-[14px] font-sans transition-all duration-200"
                                  style={{
                                    borderColor: active ? 'var(--color-primary)' : 'var(--color-line)',
                                    background: active ? 'var(--color-primary)' : 'transparent',
                                    color: active ? 'white' : 'var(--color-ink)',
                                    fontWeight: active ? 600 : 400
                                  }}
                                >
                                  {c}
                                </motion.button>
                              )
                            })}
                          </div>
                        )}

                        {/* STEP 3 — Contacto */}
                        {step === 3 && (
                          <div className="space-y-1">
                            <div className="pt-3">
                              <label className="text-[10px] uppercase tracking-label text-muted block mb-1">
                                Tu nombre
                              </label>
                              <input
                                type="text"
                                value={form.nombre}
                                onChange={(e) => update('nombre', e.target.value)}
                                placeholder="¿Cómo te llamamos?"
                                className="input-base"
                                autoFocus
                              />
                            </div>
                            <div className="pt-4">
                              <label className="text-[10px] uppercase tracking-label text-muted block mb-1">
                                Tu WhatsApp
                              </label>
                              <input
                                type="tel"
                                value={form.whatsapp}
                                onChange={(e) => update('whatsapp', e.target.value)}
                                placeholder="300 000 0000"
                                className="input-base"
                              />
                            </div>
                            <p className="font-sans text-[11px] text-muted pt-4 leading-relaxed">
                              Al enviar, abrimos WhatsApp con tu consulta lista.
                              No usamos tus datos para nada más.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="mt-8">
                      {step === 1 && (
                        <motion.button
                          onClick={() => go(2)}
                          whileTap={{ scale: 0.97 }}
                          className="btn-pill btn-pill-dark w-full flex justify-center"
                        >
                          Continuar
                          <ArrowRightIcon size={14} />
                        </motion.button>
                      )}

                      {step === 3 && (
                        <motion.button
                          onClick={onSubmit}
                          disabled={!canProceed()}
                          whileTap={{ scale: 0.97 }}
                          className="w-full flex items-center justify-center gap-3 rounded-full px-7 py-4 font-medium text-[15px] transition-all duration-300"
                          style={{
                            background: canProceed() ? '#25D366' : 'var(--color-line)',
                            color: canProceed() ? 'white' : 'var(--color-muted)',
                            cursor: canProceed() ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <WhatsAppIcon size={18} />
                          Enviar consulta por WhatsApp
                        </motion.button>
                      )}
                    </div>

                    {/* Step summary chips */}
                    {step > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5 pt-5" style={{ borderTop: '1px solid var(--color-line)' }}>
                        {form.tipo && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans"
                            style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
                            {form.tipo}
                          </span>
                        )}
                        {step > 1 && !isMant && (
                          <>
                            {isResidencial && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans"
                                style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
                                Estrato {form.estrato}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans"
                              style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
                              {fmt(form.factura)}/mes
                            </span>
                          </>
                        )}
                        {step > 1 && isMant && form.problema && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans"
                            style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
                            {form.problema}
                          </span>
                        )}
                        {form.ciudad && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans"
                            style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
                            {form.ciudad}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Sent state */
                <div className="p-10 md:p-14 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: '#25D366' }}
                  >
                    <WhatsAppIcon size={28} className="text-white" />
                  </motion.div>
                  <h3 className="title text-ink text-2xl mb-3">¡Listo, {form.nombre}!</h3>
                  <p className="font-sans text-muted text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">
                    Abrimos WhatsApp con tu consulta lista. Un asesor te responde hoy mismo.
                  </p>
                  <button
                    onClick={() => { setSent(false); setStep(0); setForm({ tipo: '', factura: 450_000, estrato: 4, problema: '', ciudad: '', nombre: '', whatsapp: '' }) }}
                    className="font-sans text-[13px] text-muted hover:text-ink transition-colors underline underline-offset-4"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
