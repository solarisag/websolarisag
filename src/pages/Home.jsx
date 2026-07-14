import { lazy, Suspense } from 'react'
import Seo from '../components/Seo.jsx'
import { localBusinessSchema, websiteSchema, faqSchema } from '../data/schema.js'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import { HOME_FAQS } from '../components/sections/Faq.jsx'

// Below-the-fold sections — code-split and lazy loaded
const Projects     = lazy(() => import('../components/sections/Projects.jsx'))
const Services     = lazy(() => import('../components/sections/Services.jsx'))
const HowItWorks   = lazy(() => import('../components/sections/HowItWorks.jsx'))
const Sylvania     = lazy(() => import('../components/sections/Sylvania.jsx'))
const Mantenimiento = lazy(() => import('../components/sections/Mantenimiento.jsx'))
const Support      = lazy(() => import('../components/sections/Support.jsx'))
const Cobertura    = lazy(() => import('../components/sections/Cobertura.jsx'))
const Faq          = lazy(() => import('../components/sections/Faq.jsx'))
const Contact      = lazy(() => import('../components/sections/Contact.jsx'))

// Minimal placeholder so layout doesn't jump while sections stream in
function SectionFallback() {
  return <div style={{ minHeight: '80px' }} />
}

export default function Home() {
  return (
    <main className="bg-white text-ink" style={{ backgroundColor: '#FFFFFF' }}>
      <Seo
        title="Paneles solares en Bucaramanga y Santander | SolarISAG"
        description="Diseño, instalación, legalización y mantenimiento de sistemas solares para hogares y empresas en Bucaramanga, Floridablanca, Girón y Piedecuesta. Solicita una evaluación con SolarISAG."
        path="/"
        jsonLd={[localBusinessSchema, websiteSchema, faqSchema(HOME_FAQS)]}
      />

      {/* Critical above-the-fold — not lazy */}
      <Hero />
      <About />

      {/* Below the fold — lazy loaded */}
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Sylvania />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Mantenimiento />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Support />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Cobertura />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Faq />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </main>
  )
}
