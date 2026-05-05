import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // anchor clicks — scroll to section smoothly
    const handleAnchor = (e) => {
      const a = e.target.closest('a[href]')
      if (!a) return
      const href = a.getAttribute('href')
      const hashIdx = href.indexOf('#')
      if (hashIdx === -1) return
      const id = href.slice(hashIdx + 1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchor)
    }
  }, [])

  return null
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
