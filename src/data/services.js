export const services = [
  {
    id: 'residencial',
    title: 'Residencial',
    tagline: 'Para tu hogar',
    coverImage: '/images/DJI_0592.webp',
    overlayColor: 'rgba(20,45,55,0.65)',
    accentColor: '#FFCD46',
    description:
      'Tu casa produce su propia energía. Instalamos el sistema completo — medidor bidireccional, certificación RETIE y conexión a la red incluida.',
    longDescription:
      'Un sistema solar residencial bien diseñado puede cubrir hasta el 100% del consumo eléctrico de tu hogar. En SolarISAG dimensionamos cada instalación según tu consumo real, la orientación de tu techo y la irradiación solar de tu zona en Santander. No instalamos el sistema estándar: instalamos el tuyo.',
    includes: [
      'Estudio de consumo y visita técnica gratuita',
      'Diseño del sistema fotovoltaico a medida',
      'Paneles solares con garantía de cumplimiento RETIE',
      'Inversor On-Grid con monitoreo en tiempo real',
      'Medidor bidireccional e instalación eléctrica',
      'Certificación RETIE y registro ante ESSA Grupo EPM',
      '25 años de garantía de eficiencia al 100%',
      'Soporte técnico post-instalación incluido',
      'Primer mantenimiento y lavado de paneles gratis',
    ],
    benefits: [
      'Hasta 100% de reducción en consumo de energía eléctrica',
      'Valorización de tu propiedad',
      'Deducción del 50% en impuesto de renta',
      'Excedentes vendidos a la red eléctrica',
    ],
    icon: 'sun'
  },
  {
    id: 'corporativo',
    title: 'Corporativo',
    tagline: 'Para tu empresa',
    coverImage: '/images/services/comercial/DJI_0756.webp',
    overlayColor: 'rgba(10,25,35,0.70)',
    accentColor: '#FFCD46',
    description:
      'Convierte el consumo eléctrico de tu empresa en ahorro mensual. Sistema dimensionado para tu demanda real, con excedentes a tu favor.',
    longDescription:
      'Las empresas en Colombia pueden cubrir hasta el 100% de su consumo de energía convencional con energía solar. Además, la Ley 1715 permite deducir el 50% de la inversión del impuesto de renta y aplicar depreciación acelerada. En SolarISAG dimensionamos cada sistema según la demanda real de tu empresa — tu contador y tu gerencia lo van a agradecer.',
    includes: [
      'Auditoría energética detallada de tus instalaciones',
      'Sistemas solares fotovoltaicos empresariales de gran capacidad',
      'Paneles solares con garantía de cumplimiento RETIE',
      'Inversores industriales con monitoreo centralizado',
      'Gestión completa de trámites RETIE y ESSA',
      'Mantenimiento preventivo programado',
      'Dashboard de producción y ahorro en tiempo real',
    ],
    benefits: [
      'Reducción inmediata de costos operativos',
      'Deducción del 50% en impuesto de renta',
      'Depreciación acelerada del activo (2 años)',
      'Excedentes inyectados a la red como crédito',
    ],
    icon: 'building'
  },
  {
    id: 'industrial',
    title: 'Industrial',
    tagline: 'Para tu planta',
    coverImage: '/images/services/industrial/DJI_0068.webp',
    overlayColor: 'rgba(8,8,20,0.72)',
    accentColor: '#FFCD46',
    description:
      'Alta potencia para plantas con consumo intensivo. Ingeniería a medida, equipos TIER 1 y respaldo técnico de 26 años de experiencia.',
    longDescription:
      'Las plantas industriales con facturas superiores a $5M COP mensuales tienen el mayor potencial de retorno en energía solar. Diseñamos sistemas de alta potencia que operan en paralelo con la red, sin interrupciones en tu proceso productivo. Cada proyecto industrial incluye ingeniería especializada, análisis estructural de cubierta y cumplimiento de normativa RETIE para instalaciones de gran escala.',
    includes: [
      'Estudio de factibilidad técnica y estructural',
      'Diseño de sistemas solares industriales desde 50 kWp en adelante',
      'Paneles solares con garantía de cumplimiento RETIE',
      'Sistema de monitoreo SCADA integrable a tu ERP',
      'Obras civiles y estructurales de soporte',
      'Certificación RETIE industrial y registro UPME',
      'Contrato de operación y mantenimiento (O&M)',
    ],
    benefits: [
      'Retorno de inversión entre 3 y 6 años',
      'Reducción significativa en costos energéticos',
      'Beneficios tributarios Ley 1715 aplicables',
      'Sistema activo 25+ años sin mantenimiento mayor',
    ],
    icon: 'factory'
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento',
    tagline: 'Para cualquier sistema',
    coverImage: '/images/services/mantenimiento/DJI_0330.webp',
    overlayColor: 'rgba(20,12,4,0.72)',
    accentColor: '#FFCD46',
    description:
      'Un sistema calibrado produce hasta un 25% más. Diagnóstico, limpieza y ajuste para cualquier instalación — sin importar quién la hizo.',
    longDescription:
      'Un sistema solar sin mantenimiento pierde entre un 15% y un 25% de su capacidad en los primeros dos años. Polvo, hojas, conexiones oxidadas y microinversores descalibrados son las causas más comunes. En SolarISAG hacemos el diagnóstico completo, limpiamos los paneles con equipo especializado, revisamos todas las conexiones eléctricas y te entregamos un informe detallado del estado real de tu sistema — no importa quién lo instaló.',
    includes: [
      'Diagnóstico visual y eléctrico completo',
      'Limpieza profesional de paneles',
      'Revisión y ajuste de conexiones y cableado',
      'Verificación de parámetros del inversor',
      'Termografía para detectar puntos calientes',
      'Informe técnico con estado real y proyección de producción',
      'Recomendaciones de mejora o ampliación del sistema',
    ],
    benefits: [
      'Recupera hasta un 25% de producción perdida',
      'Extiende la vida útil del sistema',
      'Detecta fallas antes de que sean costosas',
      'Válido para cualquier marca o instalador previo',
    ],
    icon: 'wrench'
  }
]

export const processSteps = [
  {
    n: '01',
    title: 'Contacto',
    description: 'Nos escribes o llamas. Un asesor te responde el mismo día — sin formularios complicados.'
  },
  {
    n: '02',
    title: 'Visita técnica',
    description: 'Vamos a tu espacio sin costo. Medimos, analizamos tu consumo real y evaluamos la mejor configuración.'
  },
  {
    n: '03',
    title: 'Propuesta',
    description: 'Recibes un diseño a medida: paneles, inversores, costo total y retorno de inversión proyectado.'
  },
  {
    n: '04',
    title: 'Instalación',
    description: 'Instalación limpia y eficiente. Nuestros técnicos certificados llevan todo el material; tú solo abres la puerta.'
  },
  {
    n: '05',
    title: 'Certificación',
    description: 'Gestionamos la certificación RETIE y el registro ante ESSA. Sin trámites por tu parte.'
  },
  {
    n: '06',
    title: 'Monitoreo',
    description: 'Sistema activo. Desde la app ves producción, consumo y ahorro acumulado — en tiempo real.'
  }
]

export const howItWorks = [
  'Los paneles capturan la radiación solar y la convierten en corriente continua. Sin partes móviles, sin combustible, sin ruido.',
  'El inversor transforma esa corriente en alterna — igual a la electricidad que usas normalmente.',
  'Cuando produces más de lo que consumes, el excedente va a la red. ESSA te lo descuenta directamente de tu factura.',
  'Si la demanda supera la producción — en la noche o días nublados — la red cubre la diferencia sin que lo notes.',
  'El resultado: una factura que se acerca a cero y un sistema que trabaja por 25 años sin mantenimiento mayor.'
]
