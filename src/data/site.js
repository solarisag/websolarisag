// ── Configuración central del sitio ─────────────────────────────────────────
// Fuente única de verdad para datos de contacto, cobertura y URLs.
// Cambiar aquí actualiza navbar, footer, formularios, schema y sitemap.

export const SITE = {
  name: 'SolarISAG',
  legalName: 'Iluminación San Juan de Girón S.A.',
  url: 'https://solarisag.com.co',
  domain: 'solarisag.com.co',
  description:
    'Diseño, instalación, legalización y mantenimiento de sistemas solares para hogares y empresas en Bucaramanga y Santander.',
  email: 'comercial@solarisag.com.co',
  // Teléfono en formato internacional (sin signos) para wa.me
  whatsappNumber: '573175696832',
  phoneDisplay: '+57 317 569 6832',
  address: {
    street: 'Cra 23 #30-47 Girón Centro',
    locality: 'Girón',
    region: 'Santander',
    postalCode: '681001',
    country: 'CO',
    lat: 7.0715,
    lng: -73.1699,
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61576808824705',
    instagram: 'https://www.instagram.com/solarisagcolombia',
  },
  ogImage: 'https://solarisag.com.co/images/og-image.webp',
  logo: 'https://solarisag.com.co/images/logo.png',
}

// Municipios donde SolarISAG atiende proyectos (cobertura, NO sedes físicas)
export const COVERAGE = [
  'Bucaramanga',
  'Floridablanca',
  'Girón',
  'Piedecuesta',
  'Lebrija',
]

// ── Helpers de WhatsApp ──────────────────────────────────────────────────────
export const waBase = `https://wa.me/${SITE.whatsappNumber}`

// Construye un enlace de WhatsApp con mensaje predefinido correctamente codificado
export function waLink(message) {
  return `${waBase}?text=${encodeURIComponent(message)}`
}

// Mensajes predefinidos por contexto
export const WA_MESSAGES = {
  cotizacion:
    'Hola, quiero evaluar la instalación de un sistema solar y puedo enviar mi factura de energía.',
  mantenimiento: 'Hola, quiero solicitar una revisión de mi sistema solar.',
  legalizacion:
    'Hola, quiero información sobre la legalización de un sistema solar ante ESSA.',
  productos: 'Hola, quiero información sobre productos para energía solar.',
  general: 'Hola, me interesa una asesoría solar con SolarISAG.',
}
