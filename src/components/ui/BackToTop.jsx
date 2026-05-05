import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 })
  // Map progress (0 → 1) to a stroke-dashoffset for the circular indicator
  const offset = useTransform(progress, [0, 1], [100, 0])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label="Subir al inicio"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 group"
        >
          <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-ink text-bg flex items-center justify-center shadow-lg shadow-ink/15 transition-colors group-hover:bg-primary">
            {/* Circular progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.4"
                strokeDasharray="100 100"
                style={{ strokeDashoffset: offset }}
                strokeLinecap="round"
              />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-label text-ink/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Subir
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
