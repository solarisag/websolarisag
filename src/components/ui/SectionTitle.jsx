import { motion } from 'framer-motion'

/**
 * Editorial title with a clip-path curtain-sweep reveal.
 * Wrap accent words in <em>:
 *   <SectionTitle>El primer paso<br /><em>no cuesta nada.</em></SectionTitle>
 */
export default function SectionTitle({
  children,
  className = '',
  size = 'md',
  as: Tag = 'h2'
}) {
  const sizes = {
    sm: 'text-display-xs md:text-display-sm',
    md: 'text-display-sm md:text-display-md',
    lg: 'text-display-md md:text-display-lg',
    xl: 'text-display-lg md:text-display-xl'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag className={`title text-ink ${sizes[size]} ${className}`}>
        {children}
      </Tag>
    </motion.div>
  )
}
