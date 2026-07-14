import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FacebookIcon, InstagramIcon, WhatsAppIcon, ArrowRightIcon } from './Icons.jsx'

const navCols = [
  {
    title: 'Servicios',
    links: [
      { label: 'Sistemas solares', href: '/#servicios' },
      { label: 'Mantenimiento', href: '/mantenimiento-paneles-solares', route: true },
      { label: 'Nuestros productos', href: '/productos', route: true },
      { label: 'Cómo funciona', href: '/#como-funciona' },
    ]
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Artículos', href: '/articulos', route: true },
      { label: 'Proyectos', href: '/#proyectos' },
      { label: 'Nosotros', href: '/#nosotros' },
    ]
  },
  {
    title: 'Contacto',
    links: [
      { label: 'WhatsApp · 317 569 6832', href: 'https://wa.me/573175696832', external: true },
      { label: 'comercial@solarisag.com.co', href: 'mailto:comercial@solarisag.com.co' },
    ]
  }
]

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export default function Footer() {
  return (
    <footer className="bg-bg relative overflow-hidden" style={{ borderTop: '1px solid var(--color-line)' }}>

      {/* Watermark */}
      <div className="pointer-events-none select-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center"
        style={{ opacity: 0.03 }}>
        <span className="flama-bold-italic text-ink leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}>
          SolarISAG
        </span>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 pt-16 md:pt-24 pb-10">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16"
        >
          {/* Brand column */}
          <motion.div variants={item} className="md:col-span-4 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img src="/images/logo-dark.png" alt="SolarISAG"
                className="h-10 w-auto"
                onError={(e) => { e.target.src = '/images/logo.png' }}
              />
            </Link>
            <p className="font-sans text-[14px] text-muted leading-relaxed max-w-sm mb-4">
              Diseño, instalación, legalización y mantenimiento de sistemas solares
              para hogares y empresas en Bucaramanga y Santander.
            </p>
            <p className="font-sans text-[12.5px] text-muted/80 leading-relaxed max-w-sm mb-7">
              Cobertura: Bucaramanga, Floridablanca, Girón, Piedecuesta y municipios de Santander.
            </p>

            <a
              href="/#contacto"
              className="inline-flex items-center gap-2 btn-pill btn-pill-primary mb-8"
            >
              Pedir visita técnica
              <ArrowRightIcon size={14} />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=61576808824705"
                target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ border: '1px solid var(--color-line)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1877f2'; e.currentTarget.style.color = '#1877f2' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-line)'; e.currentTarget.style.color = 'var(--color-muted)' }}
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/solarisagcolombia"
                target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ border: '1px solid var(--color-line)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E1306C'; e.currentTarget.style.color = '#E1306C' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-line)'; e.currentTarget.style.color = 'var(--color-muted)' }}
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://wa.me/573175696832"
                target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ border: '1px solid var(--color-line)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = '#25D366' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-line)'; e.currentTarget.style.color = 'var(--color-muted)' }}
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </motion.div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <motion.div key={col.title} variants={item} className="md:col-span-2 lg:col-span-2 md:col-start-auto">
              <span className="block text-[11px] uppercase tracking-label text-muted mb-5 font-sans">
                {col.title}
              </span>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.route ? (
                      <Link
                        to={l.href}
                        className="font-sans text-[13px] text-muted hover:text-primary transition-colors duration-250"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        className="font-sans text-[13px] text-muted hover:text-primary transition-colors duration-250"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {col.title === 'Contacto' && (
                <p className="font-sans text-[13px] text-muted mt-3.5 leading-relaxed">
                  Cra 23 #30-47, Girón · Santander
                </p>
              )}
            </motion.div>
          ))}

          {/* CTA column */}
          <motion.div variants={item} className="md:col-span-3 lg:col-span-2">
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 pt-6 text-center"
          style={{ borderTop: '1px solid var(--color-line)' }}>
          <span className="font-sans text-[12px] text-muted">
            © {new Date().getFullYear()} SolarISAG · Iluminación San Juan de Girón S.A. Todos los derechos reservados.
          </span>
          <span className="font-sans text-[11px] text-muted/70">
            Web desarrollada por{' '}
            <a
              href="https://www.aisacreative.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-250 underline underline-offset-2"
            >
              Aisa Creative Partners
            </a>
          </span>
        </div>

      </div>
    </footer>
  )
}
