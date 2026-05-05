/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        'accent-deep': 'var(--color-accent-deep)'
      },
      fontFamily: {
        sans: ['Flama', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xs': ['1.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
        'display-md': ['2.5rem', { lineHeight: '1.06', letterSpacing: '-0.024em' }],
        'display-lg': ['3.25rem', { lineHeight: '1.04', letterSpacing: '-0.026em' }],
        'display-xl': ['4.25rem', { lineHeight: '1.02', letterSpacing: '-0.028em' }]
      },
      letterSpacing: {
        label: '0.18em'
      },
      maxWidth: {
        container: '1320px'
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      transitionDuration: {
        350: '350ms',
      }
    }
  },
  plugins: []
}
