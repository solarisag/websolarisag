import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const EASE = [0.22, 1, 0.36, 1]

// Preguntas frecuentes del inicio. Se exporta para generar el FAQPage schema
// en la página (el schema solo debe marcar contenido visible como este).
export const HOME_FAQS = [
  {
    q: '¿Cuánto cuesta instalar paneles solares?',
    a: 'No existe un precio único. Depende de tu consumo, del tipo de sistema, de los equipos y de las condiciones del sitio. Por eso partimos de tu factura de energía y una visita técnica para darte una propuesta real.',
  },
  {
    q: '¿Cuánto se puede ahorrar?',
    a: 'Depende de tu consumo, de cuándo lo usas y del tamaño del sistema. No manejamos un porcentaje universal: lo estimamos a partir de tus facturas y del diseño, siempre como una estimación y no como una garantía.',
  },
  {
    q: '¿SolarISAG trabaja en Bucaramanga?',
    a: 'Sí. Atendemos proyectos en Bucaramanga y su área metropolitana: Floridablanca, Girón y Piedecuesta.',
  },
  {
    q: '¿También realizan proyectos en otros municipios de Santander?',
    a: 'Sí. Trabajamos en distintos municipios de Santander. La viabilidad se analiza según la ubicación, el consumo y las condiciones del lugar.',
  },
  {
    q: '¿Es necesario desconectarse de la red?',
    a: 'No. La mayoría de sistemas trabajan conectados a la red: usas energía solar durante el día y la red cubre el resto. Solo un sistema Off-Grid funciona sin red.',
  },
  {
    q: '¿SolarISAG realiza la legalización?',
    a: 'Sí. Acompañamos el proceso de legalización del sistema. Los requisitos y tiempos pueden variar según el proyecto y la normativa vigente.',
  },
  {
    q: '¿También realizan mantenimiento?',
    a: 'Sí. Revisamos paneles, inversor, protecciones y producción, incluso en sistemas instalados por otras empresas.',
  },
  {
    q: '¿Cómo se solicita una cotización?',
    a: 'Escríbenos por WhatsApp o completa el formulario de contacto y envía tu factura de energía. Con eso hacemos una evaluación inicial y coordinamos la visita técnica.',
  },
]

function FaqItem({ item, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (i % 4) * 0.05, ease: EASE }}
      className="border-b border-line"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left py-5 group"
      >
        <span className="flama-bold-italic text-ink text-[1.05rem] md:text-[1.15rem] group-hover:text-primary transition-colors">
          {item.q}
        </span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          className="text-muted shrink-0"
        >
          <path d="M12 5v14M5 12h14" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[14.5px] text-muted leading-relaxed pb-5 max-w-2xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  return (
    <section id="preguntas" className="relative py-24 md:py-32 bg-bg">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <SectionTitle size="lg">
              Lo que más
              <br />
              <em>nos preguntan.</em>
            </SectionTitle>
            <p className="font-sans text-muted text-[14px] leading-relaxed mt-6 max-w-xs">
              ¿No ves tu pregunta? Escríbenos por WhatsApp y te respondemos el mismo día.
            </p>
          </div>
          <div className="lg:col-span-8">
            {HOME_FAQS.map((item, i) => <FaqItem key={item.q} item={item} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
