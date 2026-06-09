import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Marca global líder',
    body:  'Más de 120 años de trayectoria en iluminación y soluciones energéticas presentes en más de 100 países.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Garantía de 25 años',
    body:  'Paneles con garantía de rendimiento de 25 años y garantía de producto de 12 años certificada internacionalmente.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    title: 'Calidad certificada',
    body:  'Módulos fabricados bajo normas IEC 61215 e IEC 61730, con certificaciones UL, CE y TÜV para los mercados más exigentes.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Soporte técnico mundial',
    body:  'Red de servicio técnico especializado disponible en toda Latinoamérica con repuestos originales y actualizaciones de firmware.',
  },
]

export default function Sylvania() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#F5F4F0' }}>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right,rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.03) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Accent glow — top left */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,205,70,0.18) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 py-24 md:py-32">

        {/* ── Top label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="inline-block text-[11px] uppercase tracking-label text-black/40">
            Distribuidor autorizado
          </span>
          <div className="h-px w-12 bg-black/15" />
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT — headline + logo */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Logo card */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center justify-center bg-white rounded-2xl px-10 py-8 self-start shadow-[0_4px_32px_-4px_rgba(0,0,0,0.10)]"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <img
                src="/images/sylvania.png"
                alt="Sylvania"
                className="h-10 w-auto object-contain"
              />
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="flama-bold-italic text-ink leading-[1.06]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}
            >
              Paneles que respaldan
              <br />
              cada <em style={{ color: '#007A3E' }}>promesa</em> que
              <br />
              te hacemos.
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-[15px] leading-relaxed text-black/55 max-w-sm"
            >
              Somos distribuidores autorizados de Sylvania en Colombia.
              Esto significa que cada sistema que instalamos usa módulos fotovoltaicos
              genuinos, con trazabilidad de origen y garantía real.
            </motion.p>

            {/* Accent rule */}
            <motion.div
              variants={{
                hidden:  { scaleX: 0, originX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
              }}
              className="h-0.5 w-20"
              style={{ background: '#FFCD46' }}
            />
          </motion.div>

          {/* RIGHT — benefits */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-350 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{ y: -3, boxShadow: '0 12px 40px -8px rgba(0,0,0,0.12)', transition: { duration: 0.28, ease: EASE } }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-350"
                  style={{ background: 'rgba(255,205,70,0.15)', color: '#A07800' }}
                >
                  {b.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="flama-bold-italic text-ink text-[1.05rem] leading-snug mb-1.5">
                    {b.title}
                  </p>
                  <p className="font-sans text-[13px] leading-relaxed text-black/50">
                    {b.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── Bottom strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-16 pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="font-sans text-[13px] text-black/40 max-w-md leading-relaxed">
            Todos nuestros proyectos incluyen documentación de origen, certificados de instalación
            y activación de garantía directamente con Sylvania.
          </p>
          <a href="#contacto" className="btn-pill btn-pill-accent shrink-0">
            Solicitar información
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
