// Minimal inline SVG icons — no external libraries.
// All icons inherit currentColor and accept a className prop.

const baseProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

export const SunIcon = ({ className = '', size = 28 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

export const BuildingIcon = ({ className = '', size = 28 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="0.5" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
  </svg>
)

export const FactoryIcon = ({ className = '', size = 28 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M3 21V10l6 4V10l6 4V5h6v16z" />
    <path d="M9 17h2M14 17h2M19 17h.01" />
  </svg>
)

export const WrenchIcon = ({ className = '', size = 28 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
  </svg>
)

export const ArrowRightIcon = ({ className = '', size = 18 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowDownIcon = ({ className = '', size = 18 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const ArrowLeftIcon = ({ className = '', size = 18 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
)

export const PhoneIcon = ({ className = '', size = 22 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const MailIcon = ({ className = '', size = 22 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <rect x="2" y="4" width="20" height="16" rx="0" />
    <path d="m2 6 10 7 10-7" />
  </svg>
)

export const PinIcon = ({ className = '', size = 22 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const WhatsAppIcon = ({ className = '', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.88 11.9L4 20l4.22-1.1a7.92 7.92 0 0 0 3.82.97h.01a7.94 7.94 0 0 0 5.55-13.55ZM12.05 18.5h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 1 1 12.27-3.5 6.6 6.6 0 0 1-6.67 6.6Zm3.62-4.94c-.2-.1-1.17-.58-1.35-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.12.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.1-1.38-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.38-.01a.74.74 0 0 0-.54.25c-.18.2-.71.7-.71 1.7 0 1 .73 1.97.83 2.1.1.13 1.43 2.18 3.46 3.06.48.21.86.33 1.16.43.49.16.94.13 1.29.08.39-.06 1.17-.48 1.34-.94.16-.46.16-.85.11-.94-.05-.08-.18-.13-.38-.23Z" />
  </svg>
)

export const PlayIcon = ({ className = '', size = 22 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M5 3v18l15-9z" fill="currentColor" stroke="none" />
  </svg>
)

export const StarIcon = ({ className = '', size = 22 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export const FacebookIcon = ({ className = '', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
)

export const InstagramIcon = ({ className = '', size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

export const MenuIcon = ({ className = '', size = 24 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export const CloseIcon = ({ className = '', size = 24 }) => (
  <svg {...baseProps} width={size} height={size} className={className}>
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
)

const ICONS = {
  sun: SunIcon,
  building: BuildingIcon,
  factory: FactoryIcon,
  wrench: WrenchIcon
}

export const ServiceIcon = ({ name, className = '', size = 32 }) => {
  const Cmp = ICONS[name] || SunIcon
  return <Cmp className={className} size={size} />
}
