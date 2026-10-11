import { LegalNorm } from '../types/rnca';

export const OFFICIAL_LEGAL_NORMS: LegalNorm[] = [
  {
    id: 'norm-ds-026-2021-minam',
    code: 'D.S. N.° 026-2021-MINAM',
    title: 'Reglamento del Registro Nacional de Consultoras Ambientales (RNCA)',
    authority: 'MINAM / SENACE',
    status: 'VIGENTE',
    publicationDate: '2021-09-04',
    lastReviewDate: '2026-09-15',
    summary: 'Establece los requisitos, causales de inscripción, modificación, suspensión y cancelación de consultoras ambientales en el RNCA a cargo de SENACE, así como las condiciones mínimas para la conformación del equipo profesional multidisciplinario.',
    officialUrl: 'https://www.gob.pe/institucion/minam/normas-legales/2114757-026-2021-minam',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales, 04/09/2021, pp. 24-38',
    applicableSubsectors: [
      'mineria', 'electricidad', 'hidrocarburos', 'transportes', 
      'agricultura', 'vivienda', 'saneamiento', 'residuos_solidos', 
      'industria', 'comercio', 'pesca'
    ],
    keyArticles: [
      {
        article: 'Art. 8',
        topic: 'Conformación del equipo profesional multidisciplinario',
        fullSummary: 'La consultora ambiental debe acreditar un equipo técnico mínimo colegiado y habilitado, con experiencia específica comprobable en el subsector al que postula y en evaluación de impacto ambiental.'
      },
      {
        article: 'Art. 9',
        topic: 'Acreditación de la experiencia profesional',
        fullSummary: 'La experiencia profesional se computa a partir de la obtención del grado de bachiller o título profesional según corresponda, y se acredita mediante constancias, certificados, contratos u órdenes de servicio verificables.'
      },
      {
        article: 'Art. 14',
        topic: 'Causales de denegatoria y sanción por información no verídica',
        fullSummary: 'Presentar documentación fraudulenta o atribuir autoría indebida acarrea denegatoria automática, inicio de procedimiento sancionador e inhabilitación conforme al TUO de la LPAG.'
      }
    ]
  },
  {
    id: 'norm-ley-27446',
    code: 'Ley N.° 27446',
    title: 'Ley del Sistema Nacional de Evaluación del Impacto Ambiental (SEIA)',
    authority: 'Congreso de la República / MINAM',
    status: 'VIGENTE',
    publicationDate: '2001-04-23',
    lastReviewDate: '2026-08-10',
    summary: 'Crea el Sistema Nacional de Evaluación del Impacto Ambiental como un sistema único y coordinado de identificación, prevención, supervisión, control y corrección anticipada de los impactos ambientales negativos.',
    officialUrl: 'https://www.gob.pe/institucion/minam/normas-legales/242255-27446',
    elPeruanoRef: 'Diario Oficial El Peruano, 23/04/2001, modificado por D.L. 1078',
    applicableSubsectors: [
      'mineria', 'electricidad', 'hidrocarburos', 'transportes', 
      'agricultura', 'vivienda', 'saneamiento', 'residuos_solidos', 
      'industria', 'comercio', 'pesca'
    ],
    keyArticles: [
      {
        article: 'Art. 10',
        topic: 'Elaboración de los Estudios Ambientales',
        fullSummary: 'Los estudios de impacto ambiental deben ser elaborados únicamente por consultoras ambientales debidamente inscritas y habilitadas en el Registro correspondiente.'
      },
      {
        article: 'Art. 11',
        topic: 'Responsabilidad solidaria del consultor ambiental',
        fullSummary: 'Los profesionales y consultoras que suscriben el estudio ambiental asumen responsabilidad legal civil y administrativa por el rigor de los contenidos y datos reportados.'
      }
    ]
  },
  {
    id: 'norm-ds-019-2009-minam',
    code: 'D.S. N.° 019-2009-MINAM',
    title: 'Reglamento de la Ley del SEIA',
    authority: 'MINAM',
    status: 'VIGENTE',
    publicationDate: '2009-09-25',
    lastReviewDate: '2026-08-12',
    summary: 'Reglamenta la categorización de proyectos (DIA Categoría I, EIA-sd Categoría II, EIA-d Categoría III), la formulación de términos de referencia y la fiscalización de consultoras registradas.',
    officialUrl: 'https://www.gob.pe/institucion/minam/normas-legales/242750-019-2009-minam',
    elPeruanoRef: 'Diario Oficial El Peruano, 25/09/2009',
    applicableSubsectors: [
      'mineria', 'electricidad', 'hidrocarburos', 'transportes', 
      'agricultura', 'vivienda', 'saneamiento', 'residuos_solidos', 
      'industria', 'comercio', 'pesca'
    ],
    keyArticles: [
      {
        article: 'Art. 73',
        topic: 'Registro de Entidades Autorizadas',
        fullSummary: 'Dispone la obligatoriedad de inscripción en el Registro de Entidades Autorizadas para la elaboración de Estudios Ambientales.'
      },
      {
        article: 'Art. 75',
        topic: 'Idoneidad técnica del equipo consultor',
        fullSummary: 'Exige que cada componente del estudio (línea base biológica, física, social, plan de manejo) sea elaborado y suscrito por el profesional de la especialidad correspondiente.'
      }
    ]
  },
  {
    id: 'norm-ley-29968',
    code: 'Ley N.° 29968',
    title: 'Ley de Creación del SENACE',
    authority: 'Congreso de la República',
    status: 'VIGENTE',
    publicationDate: '2012-12-20',
    lastReviewDate: '2026-09-01',
    summary: 'Crea el Servicio Nacional de Certificación Ambiental para las Inversiones Sostenibles (SENACE) como organismo público técnico especializado adscrito al MINAM, encargado de revisar y aprobar los EIA-d y administrar el RNCA.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales/242680-29968',
    elPeruanoRef: 'Diario Oficial El Peruano, 20/12/2012',
    applicableSubsectors: [
      'mineria', 'electricidad', 'hidrocarburos', 'transportes', 
      'agricultura', 'vivienda', 'saneamiento', 'residuos_solidos', 
      'industria', 'comercio', 'pesca'
    ],
    keyArticles: [
      {
        article: 'Art. 3',
        topic: 'Funciones del SENACE',
        fullSummary: 'Administrar el Registro Nacional de Consultoras Ambientales y el Registro Administrativo de Certificaciones Ambientales.'
      }
    ]
  },
  {
    id: 'norm-rpe-060-2021-senace',
    code: 'Res. Presidencia Ejecutiva N.° 00060-2021-SENACE/PE',
    title: 'Disposiciones Técnicas para la Evaluación y Conformación Mínima del Equipo Multidisciplinario en el RNCA',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2021-10-18',
    lastReviewDate: '2026-09-10',
    summary: 'Aprueba las tablas técnicas y matrices de compatibilidad profesional por cada subsector transferido al SENACE, definiendo carreras afines, años de experiencia y causales de equivalencia.',
    officialUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/',
    elPeruanoRef: 'Normas Legales El Peruano, 19/10/2021',
    applicableSubsectors: [
      'mineria', 'electricidad', 'hidrocarburos', 'transportes', 
      'agricultura', 'residuos_solidos', 'industria', 'pesca'
    ],
    keyArticles: [
      {
        article: 'Anexo I',
        topic: 'Especialidades obligatorias por subsector',
        fullSummary: 'Detalla las profesiones admitidas para el componente físico, biológico, social, de modelamiento/GIS y específico de cada subsector productivo.'
      },
      {
        article: 'Anexo II',
        topic: 'Validación de experiencia en EIA detallados',
        fullSummary: 'Los coordinadores de estudio para EIA-d deben registrar al menos 5 años de experiencia acumulada en la dirección o jefatura de instrumentos ambientales aprobados.'
      }
    ]
  },
  {
    id: 'norm-ley-29733',
    code: 'Ley N.° 29733',
    title: 'Ley de Protección de Datos Personales del Perú',
    authority: 'MINJUSDH / ANPD',
    status: 'VIGENTE',
    publicationDate: '2011-07-03',
    lastReviewDate: '2026-10-01',
    summary: 'Garantiza el derecho fundamental a la protección de datos personales. Excluye del consentimiento la información profesional pública y de fuentes de acceso público irrestricto, pero prohíbe la divulgación de domicilios particulares, celulares privados, fotos no autorizadas o datos familiares.',
    officialUrl: 'https://www.gob.pe/institucion/minjus/normas-legales/242250-29733',
    elPeruanoRef: 'Diario Oficial El Peruano, 03/07/2011 y su Reglamento D.S. 003-2013-JUS',
    applicableSubsectors: [
      'mineria', 'electricidad', 'hidrocarburos', 'transportes', 
      'agricultura', 'vivienda', 'saneamiento', 'residuos_solidos', 
      'industria', 'comercio', 'pesca'
    ],
    keyArticles: [
      {
        article: 'Art. 14 inc. 4',
        topic: 'Fuentes de acceso público irrestricto',
        fullSummary: 'No se requiere consentimiento cuando los datos figuren en registros públicos legítimos, nóminas oficiales o medios de comunicación institucional.'
      }
    ]
  },
  {
    id: 'norm-rj-076-2016-senace',
    code: 'Res. de Jefatura N.° 076-2016-SENACE/J',
    title: 'Disposiciones para la conformación del Equipo Profesional Multidisciplinario en el Subsector Transportes',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2016-06-15',
    lastReviewDate: '2026-09-20',
    summary: 'Establece la conformación mínima del equipo profesional multidisciplinario para proyectos en el subsector Transportes en el marco del SEIA, exigiendo como mínimo seis (6) profesionales de carreras específicas: Ingeniería Civil/Transportes/Vial/etc., Ingeniería Geográfica/Geológica/etc., Ingeniería Ambiental/Sanitaria/Agrónoma/etc., Biología, Sociología/Antropología/Psicología/Comunicación, y Economía/Ingeniería Económica.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Normas Legales El Peruano, 16/06/2016',
    applicableSubsectors: ['transportes'],
    keyArticles: [
      {
        article: 'Artículo Único',
        topic: 'Conformación de 6 profesionales obligatorios para Transportes',
        fullSummary: 'El equipo multidisciplinario en el subsector Transportes debe estar conformado, como mínimo, por seis (6) profesionales distribuidos en: 1) Ing. Civil/Transportes/Vial/Arquitectura/etc., 2) Ing. Geográfica/Geológica/Geografía/Geología, 3) Ing. Ambiental/Sanitaria/Agrónoma/Agrícola/Forestal, 4) Biología, 5) Sociología/Antropología/Psicología/Comunicación/Trabajo Social/Arqueología, y 6) Economía o Ingeniería Económica.'
      }
    ]
  },
  {
    id: 'norm-rj-090-2025-senace',
    code: 'Res. de Jefatura N.° 090-2025-SENACE/J',
    title: 'Disposiciones Técnicas para la Conformación del Equipo Multidisciplinario en Minería, Electricidad e Hidrocarburos',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2025-08-15',
    lastReviewDate: '2026-10-01',
    summary: 'Establece los perfiles técnicos de conformación del equipo profesional multidisciplinario y los criterios de evaluación del Formulario 4 para los subsectores Minería, Electricidad e Hidrocarburos ante el RNCA, exigiendo carrera vinculada al sector con mínimo cinco (05) años de experiencia sectorial comprobable o carrera transversal con cinco (05) años en el SEIA.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['mineria', 'electricidad', 'hidrocarburos'],
    keyArticles: [
      {
        article: 'Capítulo I - Minería, Electricidad e Hidrocarburos',
        topic: 'Conformación técnica mínima y acreditación Formulario 4',
        fullSummary: 'Exige especialistas colegiados y habilitados con mínimo 5 años de experiencia sectorial para carreras vinculadas (Minas/Metalurgia/Geología en Minería; Eléctrica/Mecánica-Eléctrica en Electricidad; Petróleo/Petroquímica/Química en Hidrocarburos) o 5 años en el SEIA para carreras transversales.'
      }
    ]
  },
  {
    id: 'norm-rj-062-2017-senace',
    code: 'Res. de Jefatura N.° 062-2017-SENACE/J',
    title: 'Criterios Técnicos para la Conformación de Equipos Multidisciplinarios en el Subsector Agricultura y Riego',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2017-05-18',
    lastReviewDate: '2026-09-20',
    summary: 'Establece los perfiles técnicos indispensables para proyectos de irrigación a gran escala y desarrollo agropecuario, exigiendo carrera vinculada en Ingeniería Agrónoma, Agrícola o Agroforestal con mínimo 5 años en el sector agrario.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['agricultura'],
    keyArticles: [
      {
        article: 'Ítem Agricultura',
        topic: 'Gestión hídrica, suelos agrícolas y organizaciones de regantes',
        fullSummary: 'Exige especialistas en balance hídrico, salinidad de suelos, caudales ecológicos, agroforestería y juntas de usuarios de agua.'
      }
    ]
  },
  {
    id: 'norm-rpe-048-2021-senace',
    code: 'Res. de Presidencia Ejecutiva N.° 00048-2021-SENACE-PE',
    title: 'Disposiciones Técnicas para la Conformación de Equipos Multidisciplinarios en Vivienda y Construcción',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2021-06-25',
    lastReviewDate: '2026-09-20',
    summary: 'Establece los perfiles técnicos para estudios ambientales de proyectos de vivienda masiva, complejos residenciales y habilitaciones urbanas, exigiendo carrera vinculada en Arquitectura o Ingeniería Civil con mínimo 5 años de experiencia sectorial.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['vivienda'],
    keyArticles: [
      {
        article: 'Anexo Técnico Vivienda y Construcción',
        topic: 'Drenaje pluvial urbano, acústica y residuos RCD',
        fullSummary: 'Exige especialistas en diseño urbano sostenible, cálculo de redes hidrosanitarias, drenaje pluvial, impacto sonoro y plan de gestión de RCD.'
      }
    ]
  },
  {
    id: 'norm-rpe-075-2022-senace',
    code: 'Res. de Presidencia Ejecutiva N.° 00075-2022-SENACE-PE',
    title: 'Disposiciones Técnicas para la Conformación del Equipo Multidisciplinario en el Sector Ambiente (Actividad de Residuos Sólidos)',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2022-08-30',
    lastReviewDate: '2026-09-20',
    summary: 'Regula los requisitos del equipo técnico para infraestructuras de disposición final de residuos sólidos (rellenos sanitarios, de seguridad, plantas de valorización), exigiendo carrera vinculada en Ingeniería Sanitaria, Ambiental o Civil con mínimo 5 años en residuos sólidos.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['residuos_solidos'],
    keyArticles: [
      {
        article: 'Ítem Residuos Sólidos',
        topic: 'Geotecnia de celdas, impermeabilización con geomembrana y lixiviados',
        fullSummary: 'Exige especialistas en estabilidad física de taludes, pozas de lixiviados, control de biogás, control de vectores y selección de sitio.'
      }
    ]
  },
  {
    id: 'norm-rpe-021-2025-senace',
    code: 'Res. de Presidencia Ejecutiva N.° 00021-2025-SENACE/PE',
    title: 'Criterios Técnicos para la Conformación de Equipos Multidisciplinarios en el Subsector Saneamiento',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2025-03-12',
    lastReviewDate: '2026-09-20',
    summary: 'Establece la conformación obligatoria del equipo profesional para estudios ambientales en saneamiento (PTAR, PTAP, emisarios submarinos y redes de alcantarillado), exigiendo carrera vinculada en Ingeniería Sanitaria o Civil Hidráulica con mínimo 5 años en el sector.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['saneamiento'],
    keyArticles: [
      {
        article: 'Anexo Técnico Saneamiento',
        topic: 'Calidad de efluentes, biosólidos y cuerpos receptores',
        fullSummary: 'Exige especialistas en procesos de depuración, Límites Máximos Permisibles, manejo de biosólidos, monitoreo biológico acuático y aceptación social.'
      }
    ]
  },
  {
    id: 'norm-rpe-003-2026-senace',
    code: 'Res. de Presidencia Ejecutiva N.° 00003-2026-SENACE/PE',
    title: 'Disposiciones para la Conformación del Equipo Multidisciplinario en Industria (Actividades de Industria Manufacturera y Comercio Interno)',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2026-01-15',
    lastReviewDate: '2026-09-20',
    summary: 'Establece los perfiles técnicos unificados para la evaluación de EIA en parques fabriles, complejos industriales, centros comerciales (Malls) y almacenes logísticos, exigiendo carrera vinculada en Ingeniería Industrial, Química, Civil o Comercial con mínimo 5 años de experiencia sectorial.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['industria', 'comercio'],
    keyArticles: [
      {
        article: 'Ítem Industria y Comercio',
        topic: 'Emisiones atmosféricas, efluentes PTARI, seguridad HAZMAT e impacto vial',
        fullSummary: 'Exige especialistas en modelamiento de chimeneas AERMOD, tratamiento fisicoquímico de efluentes no domésticos, sustancias químicas peligrosas, impacto vial EIV y mitigación acústica.'
      }
    ]
  },
  {
    id: 'norm-rpe-029-2026-senace',
    code: 'Res. de Presidencia Ejecutiva N.° 00029-2026-SENACE/PE',
    title: 'Disposiciones Técnicas para la Conformación del Equipo Multidisciplinario en Pesca y Acuicultura',
    authority: 'SENACE',
    status: 'VIGENTE',
    publicationDate: '2026-02-28',
    lastReviewDate: '2026-09-20',
    summary: 'Establece la conformación del equipo profesional para plantas de harina/aceite de pescado, congelado/enlatado, maricultura y acuicultura continental/marina, exigiendo carrera vinculada en Ingeniería Pesquera, Acuícola o Biología Marina con mínimo 5 años sectoriales.',
    officialUrl: 'https://www.gob.pe/institucion/senace/normas-legales',
    elPeruanoRef: 'Diario Oficial El Peruano - Normas Legales',
    applicableSubsectors: ['pesca'],
    keyArticles: [
      {
        article: 'Ítem Pesca y Acuicultura',
        topic: 'Oceanografía, efluentes de sanguaza y comunidades bentónicas',
        fullSummary: 'Exige especialistas en dispersión de plumas de emisarios submarinos, tratamiento de agua de bombeo/cola, diálogo con gremios de pesca artesanal y batimetría.'
      }
    ]
  }
];
