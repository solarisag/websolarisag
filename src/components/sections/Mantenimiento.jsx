import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel.jsx'
import { waLink, WA_MESSAGES } from '../../data/site.js'
import { WhatsAppIcon } from '../ui/Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]

const CHECKS = [
  'Revisión de la producción',
  'Inspección de paneles',
  'Verificación de conexiones',
  'Revisión del inversor',
  'Protecciones eléctricas',
  'Detección de sombras o suciedad',
]

export default function Mantenimiento() {
  return (
    <section id="mantenimiento" className="relative py-24 md:py-32 bg-surface border-y border-line overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: EASE }}
            className="rounded-2xl overflow-hidden border border-line order-1 lg:order-none"
          >
            <img
              src="/images/mantenimiento.webp"
              alt="Técnico realizando mantenimiento a paneles solares en Santander"
              width="1400" height="1050"
              loading="lazy" decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <SectionLabel>Mantenimiento</SectionLabel>
            <h2 className="title text-ink mt-2 mb-6" style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', lineHeight: 1.08 }}>
              Tus paneles pueden estar funcionando y aun así <em style={{ color: '#007A3E' }}>producir menos.</em>
            </h2>
            <p className="font-sans text-muted text-[15px] leading-relaxed mb-8 max-w-lg">
              La suciedad, las sombras, las conexiones deficientes o una falla que no se ve
              pueden reducir el rendimiento de tu sistema. Revisamos paneles, inversor,
              protecciones y producción para mantener tu inversión trabajando correctamente
              — sin importar quién lo instaló.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-9">
              {CHECKS.map((c) => (
                <span key={c} className="flex items-center gap-2.5 font-sans text-[14px] text-ink-soft">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7.5" stroke="rgba(39,83,96,0.3)" />
                    <path d="M5 8l2.5 2.5L11 5.5" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={waLink(WA_MESSAGES.mantenimiento)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-medium hover:bg-[#1ebe57] transition-colors text-[14px]"
              >
                <WhatsAppIcon size={18} />
                Solicitar revisión del sistema
              </a>
              <Link
                to="/articulos/mantenimiento-paneles-solares"
                className="font-sans text-[13.5px] text-primary underline underline-offset-2 hover:opacity-80"
              >
                Leer la guía de mantenimiento
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
