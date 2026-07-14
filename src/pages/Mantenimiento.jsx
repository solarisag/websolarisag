import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import { Breadcrumbs, CtaBand } from '../components/ui/PageParts.jsx'
import { breadcrumbSchema, serviceSchema, faqSchema } from '../data/schema.js'
import { waLink, WA_MESSAGES } from '../data/site.js'
import { WhatsAppIcon, ArrowRightIcon } from '../components/ui/Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]

const BENEFITS = [
  'Revisión de la producción real frente a la esperada',
  'Inspección de paneles y celdas',
  'Verificación de conexiones y cableado',
  'Revisión del inversor y sus parámetros',
  'Revisión de protecciones eléctricas',
  'Inspección de estructuras y anclajes',
  'Detección de sombras o suciedad',
  'Revisión del sistema de monitoreo',
  'Identificación de pérdidas de rendimiento',
  'Recomendaciones preventivas',
]

const FRECUENCIA = [
  'El entorno y la exposición al polvo',
  'La cercanía de árboles y aves',
  'La lluvia y la temporada del año',
  'El tipo y la inclinación de la instalación',
  'El comportamiento de la producción en el monitoreo',
]

const FAQS = [
  { q: '¿Cada cuánto se deben revisar los paneles?', a: 'No hay una frecuencia universal. Depende del entorno (polvo, árboles, aves), del tipo de instalación y, sobre todo, del comportamiento de la producción. El monitoreo es la mejor guía.' },
  { q: '¿Cómo sé si están produciendo menos?', a: 'Si tu sistema tiene monitoreo, una caída sostenida frente a meses anteriores comparables —sin explicación climática— es la señal más confiable de que conviene una revisión.' },
  { q: '¿La lluvia limpia completamente los paneles?', a: 'Ayuda a retirar polvo suelto, pero no elimina hollín, excremento ni residuos adheridos. No reemplaza una limpieza técnica.' },
  { q: '¿Se debe apagar el sistema para hacer mantenimiento?', a: 'El procedimiento seguro se realiza con las protecciones adecuadas. Un técnico gestiona el estado del sistema durante la intervención; no es algo que deba improvisar el usuario.' },
  { q: '¿Revisan sistemas instalados por otras empresas?', a: 'Sí. El diagnóstico se hace sobre el estado real del equipo, sin importar quién lo instaló.' },
  { q: '¿Qué elementos se inspeccionan?', a: 'Producción, paneles, conexiones, inversor, protecciones, estructuras, sombras o suciedad y el sistema de monitoreo.' },
]

export default function Mantenimiento() {
  const crumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Mantenimiento de paneles solares', path: '/mantenimiento-paneles-solares' },
  ]

  return (
    <main className="bg-white text-ink">
      <Seo
        title="Mantenimiento de paneles solares en Bucaramanga y Santander | SolarISAG"
        description="Revisamos paneles, inversor, protecciones y producción para que tu sistema solar rinda al máximo. Mantenimiento para cualquier instalación en Bucaramanga y Santander."
        path="/mantenimiento-paneles-solares"
        jsonLd={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: 'Mantenimiento de paneles solares',
            description: 'Diagnóstico y mantenimiento de sistemas solares fotovoltaicos: paneles, inversor, protecciones, estructuras y monitoreo.',
            path: '/mantenimiento-paneles-solares',
            serviceType: 'Mantenimiento de sistemas fotovoltaicos',
          }),
          faqSchema(FAQS),
        ]}
      />

      {/* Header */}
      <section className="relative bg-white pt-32 md:pt-40 pb-12 border-b border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <Breadcrumbs items={crumbs} />
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-label text-primary mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Mantenimiento
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="title text-ink max-w-4xl"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.3rem)', lineHeight: 1.06 }}
          >
            Tus paneles pueden estar funcionando y aun así <em style={{ color: '#007A3E' }}>producir menos.</em>
          </motion.h1>
        </div>
      </section>

      {/* Intro: imagen + texto */}
      <section className="py-16 md:py-24 max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: EASE }}
            className="rounded-2xl overflow-hidden border border-line"
          >
            <img
              src="/images/mantenimiento.webp"
              alt="Técnico realizando mantenimiento a paneles solares en Santander"
              width="1400" height="1050"
              loading="lazy" decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <p className="font-sans text-ink-soft text-[16px] md:text-[17px] leading-relaxed mb-6">
              La suciedad, las sombras, las conexiones deficientes o una falla que no se ve a
              simple vista pueden reducir el rendimiento de tu sistema. En SolarISAG revisamos
              el estado de los paneles, el inversor, las protecciones y la producción para
              ayudarte a mantener tu inversión trabajando correctamente.
            </p>
            <a
              href={waLink(WA_MESSAGES.mantenimiento)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#1ebe57] transition-colors text-[14px]"
            >
              <WhatsAppIcon size={18} />
              Solicitar revisión del sistema
            </a>
          </motion.div>
        </div>
      </section>

      {/* Qué revisamos */}
      <section className="py-16 md:py-20 bg-surface border-y border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <h2 className="title text-ink mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            Qué revisamos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 2) * 0.05, ease: EASE }}
                className="flex items-start gap-3 py-2 border-b border-line/60"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                  <circle cx="8" cy="8" r="7.5" stroke="rgba(39,83,96,0.3)" />
                  <path d="M5 8l2.5 2.5L11 5.5" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-sans text-[14.5px] text-ink-soft">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cada cuánto */}
      <section className="py-16 md:py-24 max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="title text-ink mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              ¿Cada cuánto hacer mantenimiento?
            </h2>
            <p className="font-sans text-ink-soft text-[16px] leading-relaxed">
              No existe una frecuencia única para todos los sistemas. Desconfía de quien te dé una
              cifra fija sin conocer tu instalación. La periodicidad adecuada depende de varios factores:
            </p>
          </div>
          <ul className="flex flex-col gap-3 lg:pt-4">
            {FRECUENCIA.map((f) => (
              <li key={f} className="flex items-start gap-3 font-sans text-[15px] text-ink-soft">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="font-sans text-[14px] text-muted mt-8 max-w-3xl">
          ¿Quieres profundizar?{' '}
          <Link to="/articulos/mantenimiento-paneles-solares" className="text-primary underline underline-offset-2 hover:opacity-80">
            Lee nuestra guía de mantenimiento de paneles solares
          </Link>.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-surface border-y border-line">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <h2 className="title text-ink mb-10" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            Preguntas frecuentes
          </h2>
          <div className="max-w-3xl flex flex-col divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="flama-bold-italic text-ink text-[1.05rem] mb-2">{f.q}</h3>
                <p className="font-sans text-[14.5px] text-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Cuida tu inversión <em>a tiempo.</em></>}
        message="Agenda una revisión de tu sistema solar. Diagnosticamos el estado real y te decimos qué conviene hacer — sin importar quién lo instaló."
        waMessage={WA_MESSAGES.mantenimiento}
        primaryLabel="Solicitar revisión del sistema"
      />
    </main>
  )
}
