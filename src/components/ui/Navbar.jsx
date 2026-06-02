import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuIcon, CloseIcon } from './Icons.jsx'

const navLinks = [
  { href: '/#nosotros',    label: 'Nosotros'         },
  { href: '/#servicios',   label: 'Servicios'        },
  { href: '/#proyectos',   label: 'Proyectos'        },
  { href: '/#calculadora', label: 'Calcula tu ahorro'},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      {/* ── Desktop floating bar ─────────────────────────────────── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-4 inset-x-0 z-50 hidden lg:flex justify-center pointer-events-none"
      >
        <nav className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-2xl border border-black/8 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.10)]">
          {/* Logo — larger */}
          <Link to="/" aria-label="SolarISAG" className="shrink-0 mr-4 group">
            <img
              src="/images/logo.png"
              alt="SolarISAG"
              className="h-14 w-auto max-w-[220px] object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          <span className="w-px h-5 bg-black/10 mx-1 shrink-0" />

          {/* Nav links */}
          {navLinks.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              whileTap={{ scale: 0.95, transition: { duration: 0.12 } }}
              className="px-4 py-2 text-[13px] font-sans text-ink/55 hover:text-ink rounded-xl hover:bg-black/5 transition-all duration-200 whitespace-nowrap"
            >
              {l.label}
            </motion.a>
          ))}

          <span className="w-px h-5 bg-black/10 mx-1 shrink-0" />

          {/* CTA — Contactar */}
          <a href="/#contacto" className="btn-pill btn-pill-primary text-[13px] py-2 px-5">
            Contactar
          </a>
        </nav>
      </motion.div>

      {/* ── Mobile header ────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 inset-x-0 z-50 lg:hidden bg-white border-b border-black/8"
      >
        <div className="flex items-center justify-between h-16 px-5">
          <Link to="/" aria-label="SolarISAG">
            <img
              src="/images/logo.png"
              alt="SolarISAG"
              className="h-10 w-auto max-w-[160px] object-contain"
            />
          </Link>
          <motion.button
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            className="text-ink p-2 -mr-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate:  90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen menu ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-white flex flex-col"
          >
            <div className="h-16 shrink-0 border-b border-line/40" />

            <nav className="flex flex-col px-6 py-6 gap-0 flex-1 overflow-y-auto">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
                  className="title text-[2rem] text-ink py-4 border-b border-line/50 flex items-baseline gap-4 group"
                >
                  <span className="flama-bold-italic text-sm text-muted w-6 shrink-0 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                    {l.label}
                  </span>
                </motion.a>
              ))}

              {/* Contact CTA */}
              <motion.a
                href="/#contacto"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
                className="title text-[2rem] text-primary py-4 border-b border-line/50 flex items-baseline gap-4 group"
              >
                <span className="flama-bold-italic text-sm text-primary/50 w-6 shrink-0 tabular-nums">
                  0{navLinks.length + 1}
                </span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                  Contactar
                </span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + (navLinks.length + 1) * 0.06 }}
                className="mt-10"
              >
                <a
                  href="/#contacto"
                  onClick={() => setOpen(false)}
                  className="btn-pill btn-pill-primary self-start"
                >
                  Contactar ahora
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
