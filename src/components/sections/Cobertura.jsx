import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel.jsx'
import { COVERAGE } from '../../data/site.js'

const EASE = [0.22, 1, 0.36, 1]

export default function Cobertura() {
  return (
    <section id="cobertura" className="relative py-20 md:py-24 bg-ink text-bg overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,205,70,0.08) 0%, transparent 65%)' }} />
      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel>Cobertura</SectionLabel>
            <h2 className="title text-bg mt-2" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)', lineHeight: 1.1 }}>
              Donde <em>instalamos.</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <p className="font-sans text-bg/65 text-[15px] leading-relaxed mb-6 max-w-lg">
              Atendemos proyectos de energía solar en Bucaramanga, Floridablanca, Girón,
              Piedecuesta y diferentes municipios de Santander. La viabilidad de cada proyecto
              se analiza según ubicación, consumo, condiciones eléctricas y características del lugar.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[...COVERAGE, 'Santander'].map((c) => (
                <span key={c} className="px-4 py-2 rounded-full border border-bg/15 text-[13px] text-bg/80">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
