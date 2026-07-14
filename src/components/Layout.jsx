import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './ui/Navbar.jsx'
import Footer from './ui/Footer.jsx'
import BackToTop from './ui/BackToTop.jsx'

// Restablece el scroll al cambiar de ruta (salvo cuando hay ancla #)
function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}

// Smooth scroll con Lenis + manejo de anclas internas (#seccion)
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const handleAnchor = (e) => {
      const a = e.target.closest('a[href]')
      if (!a) return
      const href = a.getAttribute('href')
      // Solo interceptar anclas dentro de la misma página (mismo pathname)
      const hashIdx = href.indexOf('#')
      if (hashIdx === -1) return
      const pathPart = href.slice(0, hashIdx)
      if (pathPart && pathPart !== '/' && pathPart !== window.location.pathname) return
      const id = href.slice(hashIdx + 1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', handleAnchor)
    }
  }, [])
}

export default function Layout() {
  useScrollRestoration()
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <BackToTop />
      <Outlet />
      <Footer />
      <Analytics />
    </>
  )
}
