import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { ArrowRightIcon } from '../components/ui/Icons.jsx'

const LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Nuestros productos', to: '/#productos' },
  { label: 'Mantenimiento', to: '/#mantenimiento' },
  { label: 'Artículos', to: '/articulos' },
  { label: 'Contacto', to: '/#contacto' },
]

export default function NotFound() {
  return (
    <main className="bg-white text-ink min-h-screen flex items-center">
      <Seo
        title="Página no encontrada | SolarISAG"
        description="La página que buscas no existe o fue movida. Vuelve al inicio o explora los servicios de energía solar de SolarISAG en Santander."
        path="/404"
        noindex
      />
      <section className="max-w-container mx-auto px-6 lg:px-10 py-32 w-full text-center">
        <span className="text-accent uppercase tracking-label text-xs font-semibold">Error 404</span>
        <h1 className="title text-ink mt-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05 }}>
          Esta página <em>no existe</em> o fue movida.
        </h1>
        <p className="text-muted mt-6 mb-10 max-w-md mx-auto">
          Puede que el enlace esté desactualizado. Estos accesos te llevan a lo más útil:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-5 py-2.5 rounded-full border border-line text-[13px] text-ink hover:border-primary hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/#contacto" className="btn-pill btn-pill-dark">
          Hablar con un asesor
          <ArrowRightIcon size={14} />
        </Link>
      </section>
    </main>
  )
}
