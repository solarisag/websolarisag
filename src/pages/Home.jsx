import { lazy, Suspense } from 'react'
import Navbar from '../components/ui/Navbar.jsx'
import Footer from '../components/ui/Footer.jsx'
import BackToTop from '../components/ui/BackToTop.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'

// Below-the-fold sections — code-split and lazy loaded
const Projects   = lazy(() => import('../components/sections/Projects.jsx'))
const Services   = lazy(() => import('../components/sections/Services.jsx'))
const HowItWorks = lazy(() => import('../components/sections/HowItWorks.jsx'))
const Calculator = lazy(() => import('../components/sections/Calculator.jsx'))
const Support    = lazy(() => import('../components/sections/Support.jsx'))
const Contact    = lazy(() => import('../components/sections/Contact.jsx'))

// Minimal placeholder so layout doesn't jump while sections stream in
function SectionFallback() {
  return <div style={{ minHeight: '80px' }} />
}

export default function Home() {
  return (
    <main className="bg-white text-ink" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <BackToTop />

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
        <Calculator />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Support />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>

      <Footer />
    </main>
  )
}
