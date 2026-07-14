// ── Sistema de artículos ─────────────────────────────────────────────────────
// Contenido estructurado en bloques. Para agregar un artículo, añade un objeto
// al array `articles`. Cada bloque del `body` se renderiza en Articulo.jsx.
//
// Tipos de bloque:
//   { type: 'p',  text }                     — párrafo (admite <strong> vía markup simple)
//   { type: 'h2', text, id }                 — subtítulo (aparece en la tabla de contenido)
//   { type: 'h3', text }                     — sub-subtítulo
//   { type: 'ul', items: [] }                — lista con viñetas
//   { type: 'table', head: [], rows: [[]] }  — tabla comparativa
//   { type: 'note', text }                   — bloque destacado
//   { type: 'cta', text, href, label }       — llamado a la acción interno

export const CATEGORIES = [
  { slug: 'sistemas-solares', label: 'Sistemas solares' },
  { slug: 'ahorro-energetico', label: 'Ahorro energético' },
  { slug: 'mantenimiento', label: 'Mantenimiento' },
  { slug: 'legalizacion', label: 'Legalización' },
  { slug: 'empresas', label: 'Energía solar para empresas' },
  { slug: 'hogares', label: 'Energía solar para hogares' },
  { slug: 'casos', label: 'Casos y proyectos' },
]

export const categoryLabel = (slug) =>
  CATEGORIES.find((c) => c.slug === slug)?.label || slug

export const articles = [
  {
    slug: 'on-grid-hibrido-off-grid-diferencias',
    title: 'Sistema On-Grid, híbrido u Off-Grid: ¿cuál necesitas?',
    metaTitle: 'On-Grid, híbrido u Off-Grid: diferencias y cuál elegir | SolarISAG',
    metaDescription:
      'Compara los sistemas solares On-Grid, híbrido y Off-Grid: conexión a red, baterías, respaldo en cortes, inversión y uso recomendado. Guía práctica de SolarISAG.',
    keyword: 'diferencia entre On-Grid, híbrido y Off-Grid',
    category: 'sistemas-solares',
    author: 'Equipo SolarISAG',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
    image: '/images/services/industrial/DJI_0068.webp',
    imageAlt: 'Sistema solar fotovoltaico instalado sobre cubierta industrial en Santander',
    readingTime: 7,
    excerpt:
      'On-Grid, híbrido y Off-Grid resuelven problemas distintos. Te explicamos en qué se diferencian y qué factores definen cuál conviene para tu caso.',
    answer:
      'Un sistema On-Grid trabaja conectado a la red y es el más económico, pero no da respaldo durante un corte. Un sistema híbrido suma baterías, así que sigue alimentando equipos críticos cuando falla la red. Un sistema Off-Grid funciona sin red y depende por completo de baterías. La elección depende de tu consumo, de cuánta continuidad necesitas y de si tienes red disponible.',
    body: [
      { type: 'p', text: 'Cuando alguien decide instalar paneles solares, la primera duda técnica suele ser la misma: ¿qué tipo de sistema conviene? La respuesta no es única, porque On-Grid, híbrido y Off-Grid están pensados para necesidades diferentes. Elegir bien evita pagar de más por baterías que no necesitas o quedarte sin respaldo cuando más lo requieres.' },
      { type: 'h2', text: 'Qué es un sistema On-Grid', id: 'on-grid' },
      { type: 'p', text: 'Un sistema On-Grid está conectado a la red eléctrica. Durante el día, los paneles cubren tu consumo y, si producen de más, el excedente se inyecta a la red. En la noche o en días de baja producción, tomas energía de la red con normalidad. Es la configuración más común en hogares y empresas porque tiene la mejor relación entre inversión y ahorro.' },
      { type: 'p', text: 'Su principal limitación es el comportamiento durante un apagón: por seguridad, el inversor se desconecta y el sistema deja de entregar energía, aunque haya sol. Esto se llama protección anti-isla y evita que tu instalación energice la red mientras un técnico trabaja en ella.' },
      { type: 'h2', text: 'Qué es un sistema híbrido', id: 'hibrido' },
      { type: 'p', text: 'Un sistema híbrido combina la conexión a la red con un banco de baterías. Funciona como un On-Grid en el día a día, pero cuando la red falla, las baterías mantienen encendidos los equipos que definas como prioritarios: nevera, internet, iluminación, bombas o equipos médicos. Es la opción indicada cuando la continuidad importa y los cortes son frecuentes.' },
      { type: 'p', text: 'El costo es mayor que un On-Grid porque las baterías son un componente caro, y su capacidad determina cuántos equipos y por cuánto tiempo puedes respaldar. Por eso el dimensionamiento debe partir de qué necesitas mantener encendido, no de un número general.' },
      { type: 'h2', text: 'Qué es un sistema Off-Grid', id: 'off-grid' },
      { type: 'p', text: 'Un sistema Off-Grid opera sin conexión a la red. Toda la energía proviene de los paneles y se almacena en baterías para usarla cuando no hay sol. Es la solución para fincas, estaciones remotas o unidades móviles donde llevar la red sería costoso o imposible.' },
      { type: 'p', text: 'Al no tener a la red como respaldo, exige un diseño más conservador: más baterías, más paneles y a veces una planta de apoyo. Un error de dimensionamiento se siente de inmediato en forma de cortes en la propia instalación.' },
      { type: 'h2', text: 'Tabla comparativa', id: 'comparacion' },
      {
        type: 'table',
        head: ['Característica', 'On-Grid', 'Híbrido', 'Off-Grid'],
        rows: [
          ['Conexión a la red', 'Sí', 'Sí', 'No'],
          ['Usa baterías', 'No', 'Sí', 'Sí (esencial)'],
          ['Funciona en un corte', 'No', 'Sí (equipos definidos)', 'Sí'],
          ['Inversión inicial', 'Menor', 'Media-alta', 'Alta'],
          ['Uso recomendado', 'Hogar y empresa con red estable', 'Zonas con cortes frecuentes', 'Sitios sin red'],
          ['Mantenimiento', 'Bajo', 'Medio (baterías)', 'Medio-alto (baterías)'],
        ],
      },
      { type: 'h2', text: 'Entonces, ¿cuál elegir?', id: 'cual-elegir' },
      { type: 'p', text: 'No hay una respuesta universal. La decisión correcta depende de varios factores concretos:' },
      {
        type: 'ul',
        items: [
          'Tu consumo mensual y en qué horario ocurre.',
          'Qué tan seguido se corta la energía en tu zona.',
          'Si tienes red eléctrica disponible en el sitio.',
          'Qué equipos son críticos y no pueden apagarse.',
          'El presupuesto disponible para la inversión inicial.',
        ],
      },
      { type: 'p', text: 'En la mayoría de hogares y empresas con red estable, un sistema On-Grid entrega el mejor retorno. Si los cortes son un problema real, el híbrido justifica el sobrecosto. El Off-Grid tiene sentido cuando llegar con la red no es opción.' },
      { type: 'note', text: 'La forma más segura de decidir es analizar tu factura y las condiciones del sitio con una visita técnica. Así se dimensiona sobre datos reales y no sobre supuestos.' },
      { type: 'cta', text: 'Conoce cómo funciona un sistema conectado a la red', href: '/articulos/paneles-solares-conectados-a-la-red', label: 'Leer sobre sistemas On-Grid' },
    ],
    faqs: [
      { q: '¿Un sistema On-Grid funciona durante un apagón?', a: 'Normalmente no. Por seguridad se desconecta cuando falla la red. Para tener respaldo se requiere un sistema híbrido o con baterías.' },
      { q: '¿Puedo agregar baterías a un On-Grid más adelante?', a: 'Depende del inversor. Algunos inversores son híbridos y admiten baterías después; otros no. Conviene preverlo desde el diseño si crees que las necesitarás.' },
      { q: '¿El Off-Grid es más ecológico?', a: 'No necesariamente. Todos aprovechan energía solar; el Off-Grid simplemente no usa la red. Suele requerir más equipos y baterías, que también tienen un ciclo de vida a considerar.' },
    ],
    relatedService: { label: 'Ver sistemas solares para tu hogar o empresa', path: '/#servicios' },
    relatedArticles: ['paneles-solares-conectados-a-la-red', 'mantenimiento-paneles-solares'],
  },

  {
    slug: 'mantenimiento-paneles-solares',
    title: 'Mantenimiento de paneles solares: producir energía no es producir al máximo',
    metaTitle: 'Mantenimiento de paneles solares en Bucaramanga | SolarISAG',
    metaDescription:
      'Un sistema solar puede estar encendido y aun así producir menos. Qué revisar, cada cuánto y por qué el mantenimiento cuida tu inversión. Guía de SolarISAG en Santander.',
    keyword: 'mantenimiento de paneles solares en Bucaramanga',
    category: 'mantenimiento',
    author: 'Equipo SolarISAG',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
    image: '/images/services/mantenimiento/DJI_0330.webp',
    imageAlt: 'Técnico revisando el estado de paneles solares durante un mantenimiento en Santander',
    readingTime: 8,
    excerpt:
      'Suciedad, sombras, conexiones flojas o una falla que no se ve pueden bajar la producción sin apagar el sistema. Esto es lo que conviene revisar y por qué.',
    answer:
      'Un sistema solar puede estar encendido y aun así producir por debajo de su capacidad. La suciedad acumulada, las sombras nuevas, las conexiones deficientes o una falla en el inversor reducen el rendimiento sin que el sistema se apague. El mantenimiento consiste en revisar paneles, inversor, protecciones y producción para detectar esas pérdidas a tiempo y proteger la inversión.',
    body: [
      { type: 'p', text: 'Uno de los malentendidos más comunes con la energía solar es pensar que, si el sistema enciende y la app muestra producción, todo está bien. La realidad es más matizada: un sistema puede estar generando y, al mismo tiempo, producir bastante menos de lo que podría. La diferencia no siempre se ve a simple vista, pero sí se nota en la factura.' },
      { type: 'h2', text: 'Por qué un sistema produce menos sin apagarse', id: 'por-que' },
      { type: 'p', text: 'La producción depende de cuánta luz llega a las celdas y de qué tan limpio es el camino que recorre la energía hasta tu tablero. Cualquier obstáculo en ese trayecto resta. Las causas más frecuentes son:' },
      {
        type: 'ul',
        items: [
          'Polvo, tierra y hollín acumulados sobre los paneles.',
          'Hojas, excremento de aves o residuos que tapan celdas.',
          'Sombras nuevas por árboles que crecieron o construcciones cercanas.',
          'Conectores flojos, oxidados o con contacto deficiente.',
          'Cableado o estructuras con desgaste o corrosión.',
          'El inversor operando con alarmas o fuera de sus parámetros.',
        ],
      },
      { type: 'p', text: 'Una celda sombreada o sucia no solo deja de aportar: puede arrastrar el rendimiento de todo el string al que pertenece. Por eso una suciedad que parece menor a veces explica una caída de producción mayor a la esperada.' },
      { type: 'h2', text: 'Qué se revisa en un mantenimiento', id: 'que-se-revisa' },
      { type: 'p', text: 'Un mantenimiento serio no es solo lavar los paneles. Es un diagnóstico del sistema completo:' },
      {
        type: 'ul',
        items: [
          'Comparación de la producción real contra la esperada.',
          'Inspección visual de paneles y celdas.',
          'Revisión de conectores, cableado y puntos de contacto.',
          'Estado de estructuras de soporte y anclajes.',
          'Verificación del inversor y sus parámetros.',
          'Revisión de protecciones eléctricas.',
          'Estado del sistema de monitoreo y sus alarmas.',
        ],
      },
      { type: 'p', text: 'El objetivo es encontrar la causa de una pérdida antes de que se convierta en una falla mayor y más costosa.' },
      { type: 'h2', text: 'Cada cuánto se debe hacer', id: 'frecuencia' },
      { type: 'p', text: 'No existe una frecuencia universal, y desconfía de quien te dé una cifra fija sin conocer tu instalación. La periodicidad depende del entorno y del comportamiento del sistema:' },
      {
        type: 'ul',
        items: [
          'Entornos con mucho polvo, obra o vías sin pavimentar ensucian más rápido.',
          'La cercanía de árboles y aves aumenta la caída de hojas y excremento.',
          'La temporada de lluvias limpia parcialmente, pero no reemplaza una limpieza técnica.',
          'El tipo y la inclinación de la instalación influyen en cuánta suciedad se acumula.',
          'El monitoreo es la mejor señal: si la producción baja sin explicación climática, algo pasa.',
        ],
      },
      { type: 'note', text: 'La regla práctica: deja que los datos manden. Si tu sistema tiene monitoreo, una caída sostenida frente a meses anteriores comparables es la señal más confiable de que conviene una revisión.' },
      { type: 'h2', text: 'Por qué no conviene improvisar', id: 'seguridad' },
      { type: 'p', text: 'Subir a un techo y manipular una instalación eléctrica sin conocimiento es peligroso, tanto por el riesgo de caída como por el eléctrico. Además, una limpieza mal hecha puede rayar los paneles o dañar sellos. El mantenimiento lo debe hacer personal con equipo y experiencia; no es una tarea para resolver por cuenta propia.' },
      { type: 'h2', text: 'Vale para cualquier instalación', id: 'cualquier-sistema' },
      { type: 'p', text: 'El mantenimiento no requiere que hayamos instalado el sistema. Revisamos instalaciones de cualquier marca o instalador previo, porque el diagnóstico se hace sobre el estado real del equipo, no sobre quién lo montó.' },
      { type: 'cta', text: '¿Notaste que tu sistema produce menos? Solicita una revisión técnica', href: '/#mantenimiento', label: 'Ver servicio de mantenimiento' },
    ],
    faqs: [
      { q: '¿Cada cuánto se deben revisar los paneles?', a: 'Depende del entorno (polvo, árboles, aves) y del comportamiento de la producción. No hay una cifra universal; el monitoreo es la mejor guía para decidir cuándo revisar.' },
      { q: '¿La lluvia limpia completamente los paneles?', a: 'Ayuda a retirar polvo suelto, pero no elimina hollín, excremento ni residuos adheridos. No reemplaza una limpieza técnica.' },
      { q: '¿Se debe apagar el sistema para hacer mantenimiento?', a: 'El procedimiento seguro incluye trabajar con las protecciones adecuadas. Un técnico gestiona el estado del sistema durante la intervención; no es algo que deba improvisar el usuario.' },
      { q: '¿Revisan sistemas instalados por otras empresas?', a: 'Sí. El diagnóstico se hace sobre el estado real del equipo, sin importar quién lo instaló.' },
    ],
    relatedService: { label: 'Conoce el servicio de mantenimiento', path: '/#mantenimiento' },
    relatedArticles: ['on-grid-hibrido-off-grid-diferencias', 'paneles-solares-conectados-a-la-red'],
  },
]

export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug)

export const getRelatedArticles = (slug) => {
  const current = getArticleBySlug(slug)
  if (!current) return []
  return (current.relatedArticles || [])
    .map((s) => getArticleBySlug(s))
    .filter(Boolean)
}
