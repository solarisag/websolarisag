import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import { waLink } from '../../data/site.js'
import { ArrowRightIcon } from '../ui/Icons.jsx'

const EASE = [0.22, 1, 0.36, 1]

// Categorías de producto — descripciones genéricas y verificables.
// No se listan referencias, potencias, precios ni garantías hasta que
// el negocio las confirme.
const CATEGORIES = [
  { name: 'Paneles solares', desc: 'Módulos fotovoltaicos que convierten la radiación solar en electricidad.', apps: 'Hogares, empresas e industria' },
  { name: 'Inversores', desc: 'Transforman la corriente de los paneles en la energía que usan tus equipos. On-Grid o híbridos.', apps: 'Sistemas On-Grid e híbridos' },
  { name: 'Baterías', desc: 'Almacenan energía para usarla sin sol o durante un corte de red. Se dimensionan según lo que respaldas.', apps: 'Sistemas híbridos y Off-Grid' },
  { name: 'Estructuras de montaje', desc: 'Soportes que fijan los paneles con la orientación e inclinación adecuadas al tipo de techo.', apps: 'Cubiertas, tejados y terreno' },
  { name: 'Protecciones eléctricas', desc: 'Elementos de seguridad que protegen el sistema y a las personas, parte del cumplimiento normativo.', apps: 'Todos los sistemas' },
  { name: 'Equipos de monitoreo', desc: 'Permiten ver producción y consumo en tiempo real y detectar caídas de rendimiento a tiempo.', apps: 'Seguimiento y mantenimiento' },
]

function ProductCard({ cat, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: EASE }}
      className="group rounded-2xl bg-surface border border-line p-6 flex flex-col"
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
        style={{ background: 'rgba(39,83,96,0.08)', color: 'var(--color-primary)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <h3 className="flama-bold-italic text-ink text-[1.05rem] mb-2">{cat.name}</h3>
      <p className="font-sans text-[13px] leading-relaxed text-muted mb-3 flex-1">{cat.desc}</p>
      <span className="text-[10px] uppercase tracking-label text-primary">{cat.apps}</span>
    </motion.div>
  )
}

export default function Productos() {
  return (
    <section id="productos" className="relative py-24 md:py-32 bg-bg">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-2xl mb-14"
        >
          <SectionLabel>Nuestros productos</SectionLabel>
          <SectionTitle size="lg">
            Los equipos que <em>sostienen</em>
            <br />
            tu sistema solar.
          </SectionTitle>
          <p className="font-sans text-muted text-[15px] leading-relaxed mt-6 max-w-xl">
            Cada instalación se arma con componentes elegidos según tu consumo y las condiciones
            del sitio. Estas son las categorías que integramos en un sistema completo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => <ProductCard key={cat.name} cat={cat} i={i} />)}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <a
            href={waLink('Hola, quiero información sobre productos para energía solar.')}
            target="_blank" rel="noopener noreferrer"
            className="btn-pill btn-pill-dark"
          >
            Consultar productos
            <ArrowRightIcon size={14} />
          </a>
          <p className="font-sans text-[12.5px] text-muted/80 max-w-md">
            Las referencias, potencias y marcas específicas se definen en la propuesta técnica según tu proyecto.
          </p>
        </div>
      </div>
    </section>
  )
}
