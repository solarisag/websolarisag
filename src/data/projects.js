export const projects = [
  {
    id: 1,
    slug: 'furgoriente-unidad-movil',
    title: 'Unidad Móvil Furgoriente',
    type: 'Comercial',
    category: 'comercial',
    location: 'Santander, Colombia',
    kwp: 3.3,
    year: 2024,
    coverImage: '/projects/Furgon Movil/images/DJI_0417.webp',
    images: [
      '/projects/Furgon Movil/images/DJI_0406.webp',
      '/projects/Furgon Movil/images/DJI_0405.webp',
      '/projects/Furgon Movil/images/DJI_0404.webp',
      '/projects/Furgon Movil/images/DJI_0408.webp',
      '/projects/Furgon Movil/images/DJI_0417.webp',
    ],
    description:
      'Este proyecto no solo genera energía… sostiene salud en movimiento. Diseñamos e instalamos un sistema solar fotovoltaico para la unidad móvil de salud de Furgoriente, pensado para operar de forma autónoma y garantizar funcionamiento continuo en cualquier lugar. Porque cuando se trata de salud, la energía no puede fallar.',
    details: {
      paneles: '5 paneles de 665W',
      baterias: '4 baterías de respaldo',
      operacion: 'Off-grid · autónomo',
      ahorro: 'Sin dependencia de red eléctrica'
    }
  },
  {
    id: 2,
    slug: 'colina-del-viento',
    title: 'Colina del Viento',
    type: 'Residencial',
    category: 'hogar',
    location: 'Santander, Colombia',
    kwp: 10.8,
    year: 2024,
    coverImage: '/projects/Colina del Viento/images/DJI_0592.webp',
    images: [
      '/projects/Colina del Viento/images/DJI_0591.webp',
      '/projects/Colina del Viento/images/DJI_0582.webp',
      '/projects/Colina del Viento/images/DJI_0592.webp',
    ],
    description:
      'Sistema fotovoltaico residencial instalado en Colina del Viento. Un hogar que ahora genera su propia energía, reduce su factura y se desconecta de las alzas tarifarias. Diseño integrado a la cubierta, certificado RETIE y avalado por ESSA Grupo EPM.',
    details: {
      paneles: 'Paneles TIER 1 de alta eficiencia',
      certificacion: 'RETIE · ESSA Grupo EPM',
      produccion: 'Estimado 1.200 kWh/mes',
      ahorro: '80% de reducción en factura'
    }
  },
  {
    id: 3,
    slug: 'mesa-de-los-santos',
    title: 'Mesa de Los Santos',
    type: 'Rural · Turismo',
    category: 'comercial',
    location: 'Mesa de Los Santos, Santander',
    kwp: 7.5,
    year: 2024,
    coverImage: '/projects/Mesa de Los Santos/images/DJI_0231.webp',
    images: [
      '/projects/Mesa de Los Santos/images/DJI_0223.webp',
      '/projects/Mesa de Los Santos/images/DJI_0224.webp',
      '/projects/Mesa de Los Santos/images/DJI_0225.webp',
      '/projects/Mesa de Los Santos/images/DJI_0227.webp',
      '/projects/Mesa de Los Santos/images/DJI_0231.webp',
    ],
    description:
      'Instalación solar en uno de los paisajes más icónicos de Santander. Un sistema diseñado para la demanda continua de una propiedad rural, con autonomía energética y mínimo impacto visual. Energía limpia en armonía con el entorno natural de la Mesa.',
    details: {
      paneles: 'Paneles TIER 1 de alta eficiencia',
      certificacion: 'RETIE · ESSA Grupo EPM',
      produccion: 'Estimado 900 kWh/mes',
      ahorro: '75% de reducción en factura'
    }
  },
  {
    id: 4,
    slug: 'palmar-del-lago',
    title: 'Palmar del Lago',
    type: 'Residencial',
    category: 'hogar',
    location: 'Santander, Colombia',
    kwp: 14.4,
    year: 2025,
    coverImage: '/projects/Palmar del Lago/images/ING GABRIEL (1).webp',
    images: [
      '/projects/Palmar del Lago/images/ING GABRIEL (1).webp',
      '/projects/Palmar del Lago/images/ING GABRIEL (2).webp',
      '/projects/Palmar del Lago/images/ING GABRIEL (5).webp',
      '/projects/Palmar del Lago/images/ING GABRIEL (8).webp',
    ],
    description:
      'Sistema solar residencial en Palmar del Lago. Una propiedad que apostó por la independencia energética y hoy genera su propia electricidad con paneles de última generación. Instalación certificada, con monitoreo activo y garantía total de eficiencia por 25 años.',
    details: {
      paneles: 'Paneles TIER 1 de alta eficiencia',
      certificacion: 'RETIE · ESSA Grupo EPM',
      produccion: 'Estimado 1.600 kWh/mes',
      ahorro: '85% de reducción en factura'
    }
  }
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)
