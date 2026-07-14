import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import { PageHero, CtaBand } from '../components/ui/PageParts.jsx'
import { breadcrumbSchema } from '../data/schema.js'
import { waLink, WA_MESSAGES } from '../data/site.js'
import { ArrowRightIcon } from '../components/ui/Icons.jsx'

const Sylvania = lazy(() => import('../components/sections/Sylvania.jsx'))

const EASE = [0.22, 1, 0.36, 1]

// Categorías de producto. Estructura editable: descripciones genéricas y
// verificables. No se listan referencias, potencias, precios ni garantías
// concretas hasta que el negocio las confirme (ver [Información pendiente]).
const CATEGORIES = [
  {
    name: 'Paneles solares',
    desc: 'Módulos fotovoltaicos que convierten la radiación solar en electricidad. La potencia y la cantidad se definen según tu consumo y el espacio disponible.',
    apps: 'Hogares, empresas e industria',
  },
  {
    name: 'Inversores',
    desc: 'Transforman la corriente de los paneles en la energía que usan tus equipos. Los hay On-Grid, para trabajar con la red, e híbridos, compatibles con baterías.',
    apps: 'Sistemas On-Grid e híbridos',
  },
  {
    name: 'Baterías',
    desc: 'Almacenan energía para usarla cuando no hay sol o durante un corte de red. Su capacidad se dimensiona según los equipos que necesites respaldar.',
    apps: 'Sistemas híbridos y Off-Grid',
  },
  {
    name: 'Estructuras de montaje',
    desc: 'Soportes que fijan los paneles a la cubierta o al terreno con la orientación e inclinación adecuadas, según el tipo de techo y las condiciones del sitio.',
    apps: 'Cubiertas, tejados y terreno',
  },
  {
    name: 'Protecciones eléctricas',
    desc: 'Elementos de seguridad que protegen el sistema y a las personas ante sobrecargas, descargas y fallas. Son parte del cumplimiento normativo de la instalación.',
    apps: 'Todos los sistemas',
  },
  {
    name: 'Equipos de monitoreo',
    desc: 'Permiten ver la producción y el consumo del sistema en tiempo real y detectar caídas de rendimiento a tiempo desde una app o plataforma.',
    apps: 'Seguimiento y mantenimiento',
  },
]

function ProductCard({ cat, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: EASE }}
      className="group rounded-2xl bg-white border border-line p-7 flex flex-col"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <h3 className="flama-bold-italic text-ink text-[1.15rem] mb-2">{cat.name}</h3>
      <p className="font-sans text-[13.5px] leading-relaxed text-muted mb-4 flex-1">{cat.desc}</p>
      <span className="text-[11px] uppercase tracking-label text-primary mb-5">{cat.apps}</span>
      <a
        href={waLink(`Hola, quiero información sobre ${cat.name.toLowerCase()} para energía solar.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-ink group-hover:text-primary transition-colors"
      >
        Solicitar información
        <ArrowRightIcon size={13} />
      </a>
    </motion.div>
  )
}

export default function Productos() {
  return (
    <main className="bg-white text-ink">
      <Seo
        title="Productos para energía solar: paneles, inversores y baterías | SolarISAG"
        description="Paneles solares, inversores, baterías, estructuras, protecciones y monitoreo para sistemas solares en Bucaramanga y Santander. Respaldados por la marca Sylvania."
        path="/productos"
        jsonLd={breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Nuestros productos', path: '/productos' },
        ])}
      />

      <PageHero
        breadcrumbs={[
          { name: 'Inicio', path: '/' },
          { name: 'Nuestros productos', path: '/productos' },
        ]}
        label="Nuestros productos"
        title={<>Los equipos que <em style={{ color: '#007A3E' }}>sostienen</em> tu sistema solar</>}
        intro="Cada instalación se arma con componentes elegidos según tu consumo y las condiciones del sitio. Estas son las categorías que integramos en un sistema solar completo."
      />

      {/* Categorías */}
      <section className="py-16 md:py-20 max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <ProductCard key={cat.name} cat={cat} i={i} />
          ))}
        </div>
        <p className="font-sans text-[12.5px] text-muted/80 mt-8 max-w-2xl">
          Las categorías son referenciales. Las referencias, potencias y marcas específicas
          se definen en la propuesta técnica según tu proyecto. Escríbenos para conocer las
          opciones disponibles.
        </p>
      </section>

      {/* Marca Sylvania + certificaciones */}
      <Suspense fallback={<div style={{ minHeight: 200 }} />}>
        <Sylvania />
      </Suspense>

      <CtaBand
        title={<>¿Buscas un equipo <em>en particular?</em></>}
        message="Cuéntanos qué necesitas para tu sistema solar y te orientamos sobre las opciones más adecuadas para tu proyecto."
        waMessage={WA_MESSAGES.productos}
        primaryLabel="Consultar productos"
      />
    </main>
  )
}
