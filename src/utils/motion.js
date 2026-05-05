// Motion system — SolarISAG 2026
// Refined ease-out: precise, silent, premium

export const EASE      = [0.22, 1, 0.36, 1]  // smooth ease-out — all entrances
export const EASE_IN   = [0.65, 0, 0.35, 1]  // ease-in — exits, tap release
export const EASE_IO   = [0.45, 0, 0.55, 1]  // ease-in-out — infinite loops

// Duration scale (seconds)
export const DUR = {
  micro: 0.12,   // tap compression, icon swap
  fast:  0.22,   // badge / opacity state changes
  ui:    0.35,   // hover lift, panel reveal
  enter: 0.65,   // content entrance
  scene: 0.85,   // headline / hero entrance
}

// Standard stagger between siblings
export const STAGGER = 0.07

// Viewport config (shared)
export const VIEWPORT = { once: true, margin: '-80px' }

// ── Variant presets ───────────────────────────────────────────────────────────

export const fadeUp = {
  hidden:  { opacity: 0, y: 22, filter: 'blur(5px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: DUR.enter, ease: EASE },
  },
}

export const staggerContainer = (stagger = STAGGER, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

// Tap compression — pass as whileTap prop
export const TAP = {
  scale: 0.97,
  transition: { duration: DUR.micro, ease: EASE_IN },
}
