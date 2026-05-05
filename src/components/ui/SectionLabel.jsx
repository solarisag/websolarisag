import { motion } from 'framer-motion'

export default function SectionLabel({ children, className = '' }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-label text-ink mb-7 ${className}`}
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
      />
      {children}
    </motion.span>
  )
}
