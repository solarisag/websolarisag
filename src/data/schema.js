import { SITE, COVERAGE } from './site.js'

// ── Generadores de JSON-LD schema.org ────────────────────────────────────────
// Solo información confirmada. No inventar horarios, reseñas ni certificaciones.

const ORG_ID = `${SITE.url}/#business`

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  description: SITE.description,
  url: SITE.url,
  telephone: `+${SITE.whatsappNumber}`,
  email: SITE.email,
  logo: SITE.logo,
  image: SITE.ogImage,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.address.lat,
    longitude: SITE.address.lng,
  },
  areaServed: [
    ...COVERAGE.map((name) => ({ '@type': 'City', name })),
    { '@type': 'State', name: 'Santander' },
  ],
  sameAs: [SITE.social.facebook, SITE.social.instagram],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'es-CO',
  publisher: { '@id': ORG_ID },
}

// Breadcrumbs — items: [{ name, path }]
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  }
}

// FAQPage — faqs: [{ q, a }] (solo usar si son visibles en la página)
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Service — para páginas de servicio
export function serviceSchema({ name, description, path, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: serviceType || name,
    url: `${SITE.url}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      ...COVERAGE.map((n) => ({ '@type': 'City', name: n })),
      { '@type': 'State', name: 'Santander' },
    ],
  }
}

// Article / BlogPosting
export function articleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.image?.startsWith('http')
      ? article.image
      : `${SITE.url}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { '@type': 'Organization', name: article.author || 'Equipo SolarISAG', url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.logo },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/articulos/${article.slug}` },
    url: `${SITE.url}/articulos/${article.slug}`,
  }
}
