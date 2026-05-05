import { Link } from 'react-router-dom'

const baseStyles =
  'inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold text-sm tracking-wide transition-all duration-300 ease-out-expo whitespace-nowrap'

const variants = {
  primary:
    'bg-accent text-black hover:bg-white hover:text-black active:scale-[0.98]',
  ghost:
    'bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5',
  link:
    'text-white underline-offset-4 underline decoration-white/30 hover:decoration-accent hover:text-accent px-0 py-0 normal-case'
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  external = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const cls = `${baseStyles} ${variants[variant] || variants.primary} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  )
}
