import { SubsectorDefinition } from '../types/rnca';

export const SUBSECTORS_DATA: SubsectorDefinition[] = [
  {
    id: 'mineria',
    code: 'SUB-MIN',
    name: 'Minería',
    sectorMinistry: 'MINEM (Transferido a SENACE para EIA-d y EIA-sd)',
    authoritySenace: true,
    description: 'Comprende actividades de exploración, explotación y beneficio de minerales metálicos y no metálicos, plantas concentradoras, depósitos de relaves y planes de cierre.',
    studyTypes: ['EIA-d (Categoría III)', 'EIA-sd (Categoría II)', 'MEIA', 'ITS', 'Plan de Cierre de Minas'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.J. N.° 090-2025-SENACE/J (Conformación Equipo Multidisciplinario Minería)',
      'R.P.E. N.° 00060-2021-SENACE/PE (Disposiciones Técnicas RNCA)',
      'D.S. N.° 040-2014-EM (Reglamento Ambiental Minero)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'min-coord',
        subsectorId: 'mineria',
        role: '1. Ingeniería de Minas / Metalúrgica / Geológica (Carrera Vinculada al Subsector Minería)',
        requiredProfessions: ['Ingeniero de Minas', 'Ingeniero Metalúrgico', 'Ingeniero Geólogo', 'Ingeniero Químico', 'Ingeniero Ambiental'],
        description: 'Responsable de la dirección metodológica e integración multidisciplinaria del EIA-d o MEIA minero.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Minería (Ing. de Minas, Metalúrgica o Geológica) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector minero materia de la solicitud (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'MEIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Constancias de dirección/jefatura en EIA mineros aprobados', 'Certificado de habilitación CIP vigente', 'Título universitario verificado'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Minería Num. 1.1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/'
        }
      },
      {
        id: 'min-fisico',
        subsectorId: 'mineria',
        role: '2. Ingeniería Civil / Geotécnica / Geológica (Medio Físico, Geotecnia y Presas de Relaves)',
        requiredProfessions: ['Ingeniero Geólogo', 'Ingeniero Civil', 'Ingeniero Geotécnico', 'Ingeniero de Minas'],
        description: 'Evaluación de geología, geomorfología, geodinámica externa, estabilidad física de tajos y relaveras.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Informes de geología/geotecnia en estudios ambientales mineros', 'Certificado CIP'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Minería Num. 1.2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/'
        }
      },
      {
        id: 'min-biologico',
        subsectorId: 'mineria',
        role: '3. Biología / Ecología / Ingeniería Forestal (Medio Biológico y Biodiversidad)',
        requiredProfessions: ['Biólogo', 'Ingeniero Forestal', 'Ingeniero en Ecología de Bosques'],
        description: 'Línea base biológica (flora, fauna silvestre, hidrobiología), especies amenazadas, áreas protegidas.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Autorizaciones SERFOR/PRODUCE de colecta o informes de línea base biológica suscritos', 'Habilitación CBP/CIP vigente'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Minería Num. 1.3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/'
        }
      },
      {
        id: 'min-social',
        subsectorId: 'mineria',
        role: '4. Sociología / Antropología / Trabajo Social / Comunicación / Arqueología (Medio Social y Relaciones Comunitarias)',
        requiredProfessions: ['Sociólogo', 'Antropólogo', 'Licenciado en Trabajo Social', 'Comunicador Social', 'Arqueólogo'],
        description: 'Línea base social, mapa de actores, talleres participativos, plan de relaciones comunitarias y consulta previa.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Actas de talleres participativos y capítulos sociales de EIA mineros suscritos'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Minería Num. 1.4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/'
        }
      },
      {
        id: 'min-hidrico',
        subsectorId: 'mineria',
        role: '5. Ingeniería Geológica / Hidrogeología / Agrícola / Sanitaria / Ambiental (Hidrogeología, Calidad de Agua y Balance Hídrico)',
        requiredProfessions: ['Ingeniero Geólogo', 'Ingeniero Agrícola', 'Ingeniero Sanitario', 'Ingeniero Ambiental'],
        description: 'Modelamiento hidrogeológico, balance de aguas, drenaje ácido de roca y monitoreo de aguas subterráneas.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios hidrogeológicos o acreditación técnica ante ANA'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Minería Num. 1.5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/'
        }
      },
      {
        id: 'min-gis',
        subsectorId: 'mineria',
        role: '6. Ingeniería Geográfica / Geografía / Topografía / Ambiental (SIG y Teledetección Minera)',
        requiredProfessions: ['Ingeniero Geógrafo', 'Ingeniero Ambiental', 'Ingeniero Topógrafo y Agrimensor', 'Geógrafo'],
        description: 'Cartografía temática oficial, geodatabase conforme a estándares SENACE, análisis espacial de impactos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Geodatabases aprobadas en SEIA o certificaciones oficiales SIG'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Minería Num. 1.6 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/portal-criterios-tecnicos/dtn/'
        }
      }
    ]
  },
  {
    id: 'electricidad',
    code: 'SUB-ELEC',
    name: 'Electricidad',
    sectorMinistry: 'MINEM (Transferido a SENACE)',
    authoritySenace: true,
    description: 'Centrales hidroeléctricas, térmicas, solares fotovoltaicas, eólicas, líneas de transmisión en alta tensión y subestaciones eléctricas.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'ITS', 'PAMA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.J. N.° 090-2025-SENACE/J (Conformación Equipo Multidisciplinario Electricidad)',
      'R.P.E. N.° 00060-2021-SENACE/PE (Disposiciones Técnicas RNCA)',
      'D.S. N.° 029-2019-EM (Reglamento Ambiental en Electricidad)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'elec-coord',
        subsectorId: 'electricidad',
        role: '1. Ingeniería Eléctrica / Mecánica-Eléctrica / Energía (Carrera Vinculada al Subsector Electricidad)',
        requiredProfessions: ['Ingeniero Electricista', 'Ingeniero Mecánico Electricista', 'Ingeniero de Energía'],
        description: 'Coordinación integral de estudios ambientales de generación y transmisión eléctrica.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Electricidad (Ing. Electricista o Mecánico-Electricista) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector eléctrico materia de la solicitud (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales eléctricos aprobados', 'Constancia CIP'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Electricidad Num. 2.1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'elec-biologico',
        subsectorId: 'electricidad',
        role: '2. Biología / Ecología / Ingeniería Forestal (Medio Biológico, Avifauna y Quirópteros)',
        requiredProfessions: ['Biólogo', 'Ingeniero Forestal'],
        description: 'Estudios de colisión de avifauna, rutas migratorias y flora en fajas de servidumbre.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Monitoreos de avifauna/quirópteros en proyectos eólicos/líneas', 'Habilitación CBP/CIP vigente'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Electricidad Num. 2.2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'elec-social',
        subsectorId: 'electricidad',
        role: '3. Sociología / Antropología / Trabajo Social / Comunicación (Componente Social, Servidumbres y Participación Ciudadana)',
        requiredProfessions: ['Sociólogo', 'Antropólogo', 'Trabajador Social', 'Comunicador Social'],
        description: 'Negociación de servidumbres de paso, fajas de seguridad y participación ciudadana.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de participación ciudadana aprobados en MINEM/SENACE'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Electricidad Num. 2.3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'elec-fisico',
        subsectorId: 'electricidad',
        role: '4. Ingeniería Ambiental / Civil / Sanitaria / Química (Medio Físico, Calidad Ambiental y Campos Electromagnéticos)',
        requiredProfessions: ['Ingeniero Ambiental', 'Ingeniero Civil', 'Ingeniero Químico'],
        description: 'Campos electromagnéticos (CEM), niveles de ruido acústico y estabilidad de taludes.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Informes de modelación de ruido y mediciones CEM'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Electricidad Num. 2.4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'elec-economia',
        subsectorId: 'electricidad',
        role: '5. Economía / Ingeniería Económica / Ambiental (Valoración Económica de Impactos y Análisis Costo-Beneficio en Energía)',
        requiredProfessions: ['Economía', 'Ingeniería Económica', 'Economista', 'Ingeniero Económico', 'Ingeniería Ambiental', 'Ingeniero Ambiental'],
        description: 'Valoración económica de impactos ambientales, análisis costo-beneficio de servidumbres de líneas de transmisión y compensaciones socioambientales en proyectos de generación.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Capítulos de valoración económica de impactos ambientales en estudios energéticos o certificaciones del SEIA'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Electricidad Num. 2.5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'elec-sig',
        subsectorId: 'electricidad',
        role: '6. Ingeniería Geográfica / Geografía / Civil (SIG, Topografía y Trazo de Líneas de Transmisión)',
        requiredProfessions: ['Ingeniero Geógrafo', 'Geógrafo', 'Ingeniero Ambiental'],
        description: 'Trazo de rutas de líneas de transmisión y servidumbres en formato GIS.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Archivos cartográficos Shapefile/Geodatabase aprobados'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Electricidad Num. 2.5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      }
    ]
  },
  {
    id: 'hidrocarburos',
    code: 'SUB-HIDRO',
    name: 'Hidrocarburos',
    sectorMinistry: 'MINEM (Transferido a SENACE)',
    authoritySenace: true,
    description: 'Exploración sísmica, perforación de pozos exploratorios y de desarrollo, ductos de transporte de gas y crudo, refinerías, plantas petroquímicas.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'ITS', 'PAMA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.J. N.° 090-2025-SENACE/J (Conformación Equipo Multidisciplinario Hidrocarburos)',
      'R.P.E. N.° 00060-2021-SENACE/PE (Disposiciones Técnicas RNCA)',
      'D.S. N.° 039-2014-EM (Reglamento Ambiental en Hidrocarburos)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'hidro-coord',
        subsectorId: 'hidrocarburos',
        role: '1. Ingeniería de Petróleo / Petroquímica / Química / Gas Natural (Carrera Vinculada al Subsector Hidrocarburos)',
        requiredProfessions: ['Ingeniero de Petróleo', 'Ingeniero Petroquímico', 'Ingeniero Químico', 'Ingeniero de Gas Natural'],
        description: 'Liderazgo integral del estudio ambiental petrolero o gasífero.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Hidrocarburos (Ing. de Petróleo, Petroquímica o Química) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector hidrocarburos materia de la solicitud (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales en lotes petroleros o ductos suscritos'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Hidrocarburos Num. 3.1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'hidro-riesgo',
        subsectorId: 'hidrocarburos',
        role: '2. Ingeniería Química / Petróleo / Industrial / Seguridad e Higiene (Análisis de Riesgos Mayores, HAZOP y Contingencias)',
        requiredProfessions: ['Ingeniero Químico', 'Ingeniero de Petróleo', 'Ingeniero Industrial', 'Ingeniero de Seguridad e Higiene'],
        description: 'Estudio de Riesgo de Derrames, dispersión de gases inflamables/tóxicos y Planes de Contingencia.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Modelamientos PHAST/ALOHA y capítulos de riesgo aprobados por OSINERGMIN/SENACE'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Hidrocarburos Num. 3.2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'hidro-biologico',
        subsectorId: 'hidrocarburos',
        role: '3. Biología / Ecología / Biología Marina / Forestal (Medio Biológico y Ecosistemas Sensibles)',
        requiredProfessions: ['Biólogo', 'Ingeniero Forestal'],
        description: 'Evaluación en selva amazónica, humedales o medio marino según ubicación del lote.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Líneas base biológicas de selva o marinas aprobadas', 'Habilitación CBP/CIP vigente'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Hidrocarburos Num. 3.3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'hidro-social',
        subsectorId: 'hidrocarburos',
        role: '4. Antropología / Sociología / Trabajo Social / Comunicación (Pueblos Indígenas, Comunidades Nativas y Diálogo Intercultural)',
        requiredProfessions: ['Antropólogo', 'Sociólogo', 'Trabajador Social', 'Comunicador Social'],
        description: 'Relacionamiento con federaciones indígenas y procesos de consulta previa.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Constancias de trabajo directo con pueblos originarios y planes sociales'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Hidrocarburos Num. 3.4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'hidro-fisico',
        subsectorId: 'hidrocarburos',
        role: '5. Ingeniería Geológica / Ambiental / Química / Hidrogeología (Geología, Suelos y Monitoreo de Efluentes/Pozos)',
        requiredProfessions: ['Ingeniero Geólogo', 'Ingeniero Ambiental', 'Ingeniero Químico'],
        description: 'Caracterización de cortes de perforación, aguas de producción y pasivos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de monitoreo y caracterización ambiental de hidrocarburos'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Hidrocarburos Num. 3.5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'hidro-sig',
        subsectorId: 'hidrocarburos',
        role: '6. Ingeniería Geográfica / Geografía / Civil (SIG y Georreferenciación de Ductos e Instalaciones)',
        requiredProfessions: ['Ingeniero Geógrafo', 'Geógrafo', 'Ingeniero Ambiental'],
        description: 'Modelamiento espacial y geodatabase oficial de ductos e instalaciones.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 090-2025-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Certificaciones SIG y geodatabases en SEIA'],
        legalBasis: {
          resolution: 'R.J. N.° 090-2025-SENACE/J',
          norm: 'R.J. N.° 090-2025-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo I - Hidrocarburos Num. 3.6 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      }
    ]
  },
  {
    id: 'transportes',
    code: 'SUB-TRANSP',
    name: 'Transportes',
    sectorMinistry: 'MTC (Transferido a SENACE para megaobras)',
    authoritySenace: true,
    description: 'Carreteras nacionales, autopistas, puentes, ferrocarriles, puertos marítimos y fluviales, aeropuertos.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'ITS'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.J. N.° 076-2016-SENACE/J (Conformación Equipo Multidisciplinario Transportes)',
      'D.S. N.° 004-2017-MTC (Reglamento de Protección Ambiental para el Sector Transportes)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'trans-carrera-1',
        subsectorId: 'transportes',
        role: '1. Ingeniería Civil / Transportes / Vial / Marítima / Aeronáutica / Mecánica / Pesquera',
        requiredProfessions: [
          'Ingeniería Civil',
          'Ingeniería de Transportes',
          'Ingeniería Vial',
          'Arquitectura',
          'Ingeniería Marítima Portuaria',
          'Ingeniería Aeronáutica',
          'Ingeniería Mecánica',
          'Ingeniería Pesquera',
          'Ingeniero Civil',
          'Ingeniero de Transportes',
          'Ingeniero Vial',
          'Arquitecto',
          'Ingeniero Mecánico'
        ],
        description: 'Especialista en infraestructura vial, transportes, estructuras, puentes, puertos o aeropuertos según tipología del proyecto.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a un determinado sector debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector materia de la solicitud (Formulario 4 SENACE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: [
          'Estudios ambientales viales, portuarios o de infraestructura suscritos',
          'Certificado de habilitación CIP vigente',
          'Acreditación de al menos cinco (05) años de experiencia en el subsector Transportes'
        ],
        legalBasis: {
          resolution: 'R.J. N.° 076-2016-SENACE/J',
          norm: 'R.J. N.° 076-2016-SENACE/J y Formulario 4 SENACE',
          article: 'Tabla de Conformación - Fila 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/institucion/senace/normas-legales'
        }
      },
      {
        id: 'trans-carrera-2',
        subsectorId: 'transportes',
        role: '2. Ingeniería Geográfica / Geológica / Geografía / Geología',
        requiredProfessions: [
          'Ingeniería Geográfica',
          'Ingeniería Geológica',
          'Geografía',
          'Geología',
          'Ingeniero Geógrafo',
          'Ingeniero Geólogo',
          'Geógrafo',
          'Geólogo'
        ],
        description: 'Especialista en medio físico, geología, geomorfología, geotecnia de taludes, canteras y cartografía temática/SIG.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: [
          'Capítulos de geología, geomorfología o geodatabases viales en SEIA',
          'Certificado de habilitación CIP',
          'Acreditación de al menos cinco (05) años de experiencia ambiental en el marco del SEIA'
        ],
        legalBasis: {
          resolution: 'R.J. N.° 076-2016-SENACE/J',
          norm: 'R.J. N.° 076-2016-SENACE/J y Formulario 4 SENACE',
          article: 'Tabla de Conformación - Fila 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/institucion/senace/normas-legales'
        }
      },
      {
        id: 'trans-carrera-3',
        subsectorId: 'transportes',
        role: '3. Ingeniería Ambiental / Sanitaria / Agrónoma / Agrícola / Forestal',
        requiredProfessions: [
          'Ingeniería Ambiental',
          'Ingeniería Sanitaria',
          'Ingeniería Agrónoma',
          'Ingeniería Agrícola',
          'Ingeniería Forestal',
          'Ingeniero Ambiental',
          'Ingeniero Sanitario',
          'Ingeniero Agrónomo',
          'Ingeniero Agrícola',
          'Ingeniero Forestal'
        ],
        description: 'Especialista en calidad ambiental (aire, ruido, agua), depósitos de material excedente (DME) y planes de manejo y mitigación.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: [
          'Informes de calidad ambiental, ruido vial y planes de manejo ambiental en transportes',
          'Habilitación CIP al día',
          'Acreditación de al menos cinco (05) años en estudios ambientales o instrumentos del SEIA'
        ],
        legalBasis: {
          resolution: 'R.J. N.° 076-2016-SENACE/J',
          norm: 'R.J. N.° 076-2016-SENACE/J y Formulario 4 SENACE',
          article: 'Tabla de Conformación - Fila 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/institucion/senace/normas-legales'
        }
      },
      {
        id: 'trans-carrera-4',
        subsectorId: 'transportes',
        role: '4. Biología',
        requiredProfessions: [
          'Biología',
          'Biólogo',
          'Bióloga'
        ],
        description: 'Especialista en medio biológico (flora y fauna silvestre), fragmentación de hábitats, pasos de fauna y conectividad biológica.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: [
          'Líneas base biológicas de proyectos viales o de transportes aprobadas',
          'Habilitación CBP vigente',
          'Acreditación de al menos cinco (05) años en línea base/monitoreos biológicos en el SEIA'
        ],
        legalBasis: {
          resolution: 'R.J. N.° 076-2016-SENACE/J',
          norm: 'R.J. N.° 076-2016-SENACE/J y Formulario 4 SENACE',
          article: 'Tabla de Conformación - Fila 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/institucion/senace/normas-legales'
        }
      },
      {
        id: 'trans-carrera-5',
        subsectorId: 'transportes',
        role: '5. Sociología / Antropología / Trabajo Social / Psicología / Comunicación / Arqueología',
        requiredProfessions: [
          'Sociología',
          'Antropología',
          'Trabajo Social',
          'Psicología',
          'Comunicación',
          'Arqueología',
          'Sociólogo',
          'Antropólogo',
          'Trabajador Social',
          'Trabajadora Social',
          'Psicólogo',
          'Comunicador',
          'Comunicador Social',
          'Arqueólogo',
          'Arqueóloga'
        ],
        description: 'Especialista en medio social, afectaciones prediales (PACRI), relaciones comunitarias, patrimonio cultural y talleres de participación ciudadana.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 076-2016-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: [
          'Capítulos sociales o PACRI viales aprobados por MTC/SENACE',
          'Habilitación profesional vigente',
          'Acreditación de al menos cinco (05) años en planes sociales o PPC en el SEIA'
        ],
        legalBasis: {
          resolution: 'R.J. N.° 076-2016-SENACE/J',
          norm: 'R.J. N.° 076-2016-SENACE/J y Formulario 4 SENACE',
          article: 'Tabla de Conformación - Fila 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/institucion/senace/normas-legales'
        }
      },
      {
        id: 'trans-carrera-6',
        subsectorId: 'transportes',
        role: '6. Economía / Ingeniería Económica',
        requiredProfessions: [
          'Economía',
          'Ingeniería Económica',
          'Economista',
          'Ingeniero Económico'
        ],
        description: 'Especialista en valoración económica del impacto ambiental, análisis costo-beneficio del proyecto y evaluación socioeconómica.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: [
          'Capítulo de valoración económica de impactos ambientales en EIA viales/transportes',
          'Colegiatura y habilitación profesional vigente',
          'Acreditación de al menos cinco (05) años en valoración o análisis económico ambiental en el SEIA'
        ],
        legalBasis: {
          resolution: 'R.J. N.° 076-2016-SENACE/J',
          norm: 'R.J. N.° 076-2016-SENACE/J y Formulario 4 SENACE',
          article: 'Tabla de Conformación - Fila 6 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/institucion/senace/normas-legales'
        }
      }
    ]
  },
  {
    id: 'agricultura',
    code: 'SUB-AGRI',
    name: 'Agricultura y Riego',
    sectorMinistry: 'MIDAGRI (Transferido a SENACE para proyectos de gran envergadura)',
    authoritySenace: true,
    description: 'Irrigaciones a gran escala, represamientos para riego, habilitación de tierras de cultivo, agroforestería e industria pecuaria intensiva.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'PAMA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.J. N.° 062-2017-SENACE/J (Conformación Equipo Multidisciplinario Agricultura y Riego)',
      'R.P.E. N.° 00060-2021-SENACE/PE (Disposiciones Técnicas RNCA)',
      'D.S. N.° 019-2012-AG (Reglamento de Gestión Ambiental Agraria)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'agri-coord',
        subsectorId: 'agricultura',
        role: '1. Ingeniería Agrónoma / Agrícola / Agroforestal',
        requiredProfessions: [
          'Ingeniería Agrónoma',
          'Ingeniería Agrícola',
          'Ingeniería Agroforestal',
          'Ingeniero Agrónomo',
          'Ingeniero Agrícola',
          'Ingeniero Agroforestal'
        ],
        description: 'Especialista responsable de la dirección técnica e integración del estudio ambiental en infraestructura de riego, presas o habilitaciones agrarias.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Agricultura y Riego (Ing. Agrónoma, Agrícola o Agroforestal) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada expresamente al sector agrario materia de la solicitud (Formulario 4 SENACE - R.J. N.° 062-2017-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales agrarios o de irrigación aprobados', 'Certificado CIP vigente'],
        legalBasis: {
          resolution: 'R.J. N.° 062-2017-SENACE/J',
          norm: 'R.J. N.° 062-2017-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo Técnico - Agricultura Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'agri-hidrico',
        subsectorId: 'agricultura',
        role: '2. Ingeniería Agrícola / Civil / Recursos Hídricos / Suelos',
        requiredProfessions: [
          'Ingeniería Agrícola',
          'Ingeniería Civil',
          'Ingeniería Geológica',
          'Ingeniero Agrícola',
          'Ingeniero Civil',
          'Ingeniero Geólogo'
        ],
        description: 'Evaluación del medio físico: balance hídrico, obras hidráulicas de derivación, salinidad de suelos y caudales ecológicos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 062-2017-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios hidrológicos, hidrogeológicos y agrológicos en SEIA', 'Certificado CIP'],
        legalBasis: {
          resolution: 'R.J. N.° 062-2017-SENACE/J',
          norm: 'R.J. N.° 062-2017-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo Técnico - Agricultura Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'agri-biologico',
        subsectorId: 'agricultura',
        role: '3. Biología / Ingeniería Forestal / Ecología',
        requiredProfessions: [
          'Biología',
          'Ingeniería Forestal',
          'Ecología',
          'Biólogo',
          'Ingeniero Forestal',
          'Ecólogo'
        ],
        description: 'Evaluación del medio biológico: inventarios de flora y fauna silvestre, capacidad de uso mayor de tierras (CUMT) y planes de compensación forestal.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 062-2017-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Líneas base biológicas y planes de manejo forestal en SEIA', 'Habilitación CBP/CIP vigente'],
        legalBasis: {
          resolution: 'R.J. N.° 062-2017-SENACE/J',
          norm: 'R.J. N.° 062-2017-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo Técnico - Agricultura Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'agri-social',
        subsectorId: 'agricultura',
        role: '4. Sociología / Antropología / Trabajo Social / Comunicación',
        requiredProfessions: [
          'Sociología',
          'Antropología',
          'Trabajo Social',
          'Comunicación Social',
          'Sociólogo',
          'Antropólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del medio social: relacionamiento con juntas de usuarios de agua, comités de regantes y comunidades campesinas.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 062-2017-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de participación ciudadana y actas de asambleas comunales aprobados en SEIA'],
        legalBasis: {
          resolution: 'R.J. N.° 062-2017-SENACE/J',
          norm: 'R.J. N.° 062-2017-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo Técnico - Agricultura Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'agri-ambiental',
        subsectorId: 'agricultura',
        role: '5. Ingeniería Ambiental / Sanitaria / Química (Calidad de Agua de Riego, Monitoreo de Agroquímicos y Efluentes Agrarios)',
        requiredProfessions: ['Ingeniería Ambiental', 'Ingeniería Sanitaria', 'Ingeniería Química', 'Ingeniero Ambiental', 'Ingeniero Sanitario', 'Ingeniero Químico'],
        description: 'Monitoreo de calidad de agua para riego (ECA Agua Categoría 3), lixiviación de agroquímicos, drenaje agrícola salino y vertimientos agroindustriales.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 062-2017-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Informes de calidad de agua y monitoreo de efluentes agrícolas aprobados en el SEIA'],
        legalBasis: {
          resolution: 'R.J. N.° 062-2017-SENACE/J',
          norm: 'R.J. N.° 062-2017-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo Técnico - Agricultura Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/'
        }
      },
      {
        id: 'agri-sig',
        subsectorId: 'agricultura',
        role: '6. Ingeniería Geográfica / Geografía / Agrícola / Ambiental (SIG, Catastro Rural y Teledetección)',
        requiredProfessions: [
          'Ingeniería Geográfica',
          'Geografía',
          'Ingeniería Agrícola',
          'Ingeniería Ambiental',
          'Ingeniero Geógrafo',
          'Geógrafo',
          'Ingeniero Agrícola'
        ],
        description: 'Modelamiento espacial SIG: catastro rural, fajas marginales, polígonos de riego y georreferenciación oficial.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.J. N.° 062-2017-SENACE/J).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Geodatabases estructuradas en formatos oficiales MIDAGRI/SENACE'],
        legalBasis: {
          resolution: 'R.J. N.° 062-2017-SENACE/J',
          norm: 'R.J. N.° 062-2017-SENACE/J y Formulario 4 SENACE',
          article: 'Anexo Técnico - Agricultura Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      }
    ]
  },
  {
    id: 'vivienda',
    code: 'SUB-VIV',
    name: 'Vivienda y Construcción',
    sectorMinistry: 'MVCS / SENACE (Inscripción RNCA y grandes habilitaciones)',
    authoritySenace: true,
    description: 'Habilitaciones urbanas de gran escala, macroproyectos inmobiliarios, complejos residenciales y comerciales masivos.',
    studyTypes: ['EIA-sd', 'DIA', 'FTA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.P.E. N.° 00048-2021-SENACE-PE (Conformación Equipo Multidisciplinario Vivienda y Urbanismo)',
      'R.M. N.° 061-2018-VIVIENDA (Criterios Técnicos para Estudios Ambientales)',
      'D.S. N.° 015-2012-VIVIENDA (Reglamento de Protección Ambiental)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'viv-coord',
        subsectorId: 'vivienda',
        role: '1. Arquitectura / Urbanismo / Ingeniería Civil',
        requiredProfessions: [
          'Arquitectura',
          'Ingeniería Civil',
          'Urbanismo',
          'Arquitecto',
          'Ingeniero Civil'
        ],
        description: 'Especialista responsable de la dirección técnica, diseño urbanístico sostenible y compatibilidad de uso del suelo.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Vivienda y Urbanismo (Arquitectura o Ingeniería Civil) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector vivienda y edificaciones urbanas (Formulario 4 SENACE - R.P.E. N.° 00048-2021-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales de habilitaciones urbanas o complejos residenciales aprobados', 'Habilitación CAP/CIP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00048-2021-SENACE-PE',
          norm: 'R.P.E. N.° 00048-2021-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Vivienda Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'viv-sanitario',
        subsectorId: 'vivienda',
        role: '2. Ingeniería Sanitaria / Civil / Hidráulica',
        requiredProfessions: [
          'Ingeniería Sanitaria',
          'Ingeniería Civil',
          'Ingeniero Sanitario',
          'Ingeniero Civil'
        ],
        description: 'Evaluación del medio físico e hidráulico: redes internas de agua potable, alcantarillado condominial, sistemas de drenaje pluvial urbano y mitigación de aniegos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00048-2021-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Factibilidades de servicios, memorias de drenaje pluvial en SEIA y CIP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00048-2021-SENACE-PE',
          norm: 'R.P.E. N.° 00048-2021-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Vivienda Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'viv-biologico',
        subsectorId: 'vivienda',
        role: '3. Biología / Ingeniería Forestal / Arquitectura Paisajista',
        requiredProfessions: [
          'Biología',
          'Ingeniería Forestal',
          'Arquitectura',
          'Biólogo',
          'Ingeniero Forestal'
        ],
        description: 'Evaluación del medio biológico urbano: arbolado urbano, áreas verdes públicas, aves sinantrópicas y corredores ecológicos urbanos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00048-2021-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Líneas base de flora y fauna urbana en estudios ambientales', 'Habilitación profesional vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00048-2021-SENACE-PE',
          norm: 'R.P.E. N.° 00048-2021-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Vivienda Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'viv-social',
        subsectorId: 'vivienda',
        role: '4. Sociología / Antropología / Trabajo Social / Comunicación',
        requiredProfessions: [
          'Sociología',
          'Antropología',
          'Trabajo Social',
          'Comunicación Social',
          'Sociólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del entorno social y vecinal: consulta a vecinos colindantes, gestión de conflictos urbanos y participación ciudadana.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00048-2021-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de participación ciudadana y actas vecinales aprobados en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00048-2021-SENACE-PE',
          norm: 'R.P.E. N.° 00048-2021-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Vivienda Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'viv-ambiental',
        subsectorId: 'vivienda',
        role: '5. Ingeniería Ambiental / Civil / Higiene y Seguridad',
        requiredProfessions: [
          'Ingeniería Ambiental',
          'Ingeniería Civil',
          'Ingeniero Ambiental',
          'Ingeniero Civil'
        ],
        description: 'Evaluación de calidad ambiental: manejo integral de Residuos de la Construcción y Demolición (RCD), niveles sonoros de maquinaria y control de polvos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00048-2021-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de manejo de RCD y modelaciones acústicas en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00048-2021-SENACE-PE',
          norm: 'R.P.E. N.° 00048-2021-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Vivienda Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'viv-sig',
        subsectorId: 'vivienda',
        role: '6. Ingeniería Geográfica / Geografía / Civil / Topografía (SIG Urbano, Catastro y Zonificación Territorial)',
        requiredProfessions: ['Ingeniería Geográfica', 'Geografía', 'Ingeniería Civil', 'Topografía', 'Ingeniero Geógrafo', 'Geógrafo', 'Ingeniero Civil'],
        description: 'Geodatabase urbana oficial, análisis espacial de compatibilidad de zonificación, áreas de cesión pública y cartografía catastral residencial.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00048-2021-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Geodatabases aprobadas en proyectos de habilitación urbana ante MVCS o SENACE'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00048-2021-SENACE-PE',
          norm: 'R.P.E. N.° 00048-2021-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Vivienda Num. 6 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      }
    ]
  },
  {
    id: 'saneamiento',
    code: 'SUB-SAN',
    name: 'Saneamiento',
    sectorMinistry: 'MVCS / SENACE (Inscripción RNCA y grandes PTAR)',
    authoritySenace: true,
    description: 'Plantas de Tratamiento de Aguas Residuales (PTAR), Plantas de Tratamiento de Agua Potable (PTAP), emisarios submarinos y redes de alcantarillado.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.P.E. N.° 00021-2025-SENACE/PE (Conformación Equipo Multidisciplinario Saneamiento y PTAR)',
      'R.M. N.° 061-2018-VIVIENDA (Términos de Referencia para PTAR)',
      'D.S. N.° 015-2012-VIVIENDA (Reglamento Ambiental Saneamiento)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'san-coord',
        subsectorId: 'saneamiento',
        role: '1. Ingeniería Sanitaria / Civil Hidráulica',
        requiredProfessions: [
          'Ingeniería Sanitaria',
          'Ingeniería Civil',
          'Ingeniero Sanitario',
          'Ingeniero Civil'
        ],
        description: 'Especialista responsable de la dirección técnica e integración del estudio ambiental en infraestructura de agua potable y saneamiento (PTAR/PTAP).',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Saneamiento (Ing. Sanitaria o Civil Hidráulica) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada expresamente al sector saneamiento (Formulario 4 SENACE - R.P.E. N.° 00021-2025-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales de PTAR, PTAP o redes primarias aprobados', 'Habilitación CIP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00021-2025-SENACE/PE',
          norm: 'R.P.E. N.° 00021-2025-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Saneamiento Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'san-procesos',
        subsectorId: 'saneamiento',
        role: '2. Ingeniería Sanitaria / Química / Ambiental',
        requiredProfessions: [
          'Ingeniería Sanitaria',
          'Ingeniería Química',
          'Ingeniería Ambiental',
          'Ingeniero Sanitario',
          'Ingeniero Químico',
          'Ingeniero Ambiental'
        ],
        description: 'Evaluación físico-química: calidad de efluentes, cumplimiento de Límites Máximos Permisibles (LMP), estabilización de biosólidos y reúso de agua tratada.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00021-2025-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Cálculos de carga contaminante, autorizaciones ANA y balances de materia en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00021-2025-SENACE/PE',
          norm: 'R.P.E. N.° 00021-2025-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Saneamiento Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'san-biologico',
        subsectorId: 'saneamiento',
        role: '3. Biología / Ecología Acuática / Ingeniería Pesquera',
        requiredProfessions: [
          'Biología',
          'Ingeniería Pesquera',
          'Ecología',
          'Biólogo',
          'Ingeniero Pesquero'
        ],
        description: 'Evaluación del medio biológico: cuerpos receptores acuáticos (ríos, lagunas o medio marino para emisarios), macroinvertebrados bentónicos y calidad hidrobiológica.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00021-2025-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Monitoreos hidrobiológicos en cuerpos receptores y habilitación profesional vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00021-2025-SENACE/PE',
          norm: 'R.P.E. N.° 00021-2025-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Saneamiento Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'san-social',
        subsectorId: 'saneamiento',
        role: '4. Sociología / Antropología / Trabajo Social / Comunicación',
        requiredProfessions: [
          'Sociología',
          'Antropología',
          'Trabajo Social',
          'Comunicación Social',
          'Sociólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del medio social: participación ciudadana temprana, aceptación social de la ubicación de PTAR (prevención del efecto NIMBY) y talleres comunitarios.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00021-2025-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de participación ciudadana y actas de acuerdos de terreno en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00021-2025-SENACE/PE',
          norm: 'R.P.E. N.° 00021-2025-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Saneamiento Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      },
      {
        id: 'san-geotecnia',
        subsectorId: 'saneamiento',
        role: '5. Ingeniería Geológica / Geotécnica / Civil (Geotecnia de Terrenos para PTAR, Infiltración y Estabilidad de Obras Civiles)',
        requiredProfessions: ['Ingeniería Geológica', 'Ingeniería Geotécnica', 'Ingeniería Civil', 'Ingeniero Geólogo', 'Ingeniero Geotécnico', 'Ingeniero Civil'],
        description: 'Estudios de mecánica de suelos, capacidad portante para estructuras de reactores biológicos, ensayos de percolación y estabilidad de taludes en lagunas de estabilización.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00021-2025-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Informes de geotecnia y geodinámica externa en estudios de saneamiento aprobados'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00021-2025-SENACE/PE',
          norm: 'R.P.E. N.° 00021-2025-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Saneamiento Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/'
        }
      },
      {
        id: 'san-sig',
        subsectorId: 'saneamiento',
        role: '6. Ingeniería Geográfica / Geografía / Sanitaria / Civil (SIG, Catastro de Redes y Topografía Sanitaria)',
        requiredProfessions: [
          'Ingeniería Geográfica',
          'Geografía',
          'Ingeniería Sanitaria',
          'Ingeniería Civil',
          'Ingeniero Geógrafo',
          'Geógrafo'
        ],
        description: 'Modelamiento espacial y SIG: mapeo de cuencas vertientes, georreferenciación de colectores, emisarios y zonas de descarga.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00021-2025-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Geodatabases estructuradas en formatos oficiales del SEIA/SENACE'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00021-2025-SENACE/PE',
          norm: 'R.P.E. N.° 00021-2025-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Saneamiento Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/vivienda'
        }
      }
    ]
  },
  {
    id: 'residuos_solidos',
    code: 'SUB-RES',
    name: 'Residuos Sólidos (Ambiente)',
    sectorMinistry: 'MINAM (Transferido a SENACE para infraestructuras de disposición final)',
    authoritySenace: true,
    description: 'Rellenos sanitarios interdistritales y provinciales, plantas de valorización, estaciones de transferencia e incineradores de residuos biocontaminados.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'PAMA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.P.E. N.° 00075-2022-SENACE-PE (Conformación Equipo Multidisciplinario Residuos Sólidos)',
      'D.L. N.° 1278 (Ley de Gestión Integral de Residuos Sólidos)',
      'D.S. N.° 014-2017-MINAM (Reglamento del D.L. 1278)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'res-coord',
        subsectorId: 'residuos_solidos',
        role: '1. Ingeniería Sanitaria / Ambiental / Civil',
        requiredProfessions: [
          'Ingeniería Sanitaria',
          'Ingeniería Ambiental',
          'Ingeniería Civil',
          'Ingeniero Sanitario',
          'Ingeniero Ambiental',
          'Ingeniero Civil'
        ],
        description: 'Especialista responsable de la dirección técnica e integración del estudio ambiental para rellenos sanitarios, de seguridad o plantas de valorización.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Residuos Sólidos (Ing. Sanitaria, Ambiental o Civil) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada a infraestructuras de residuos sólidos (Formulario 4 SENACE - R.P.E. N.° 00075-2022-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales de rellenos sanitarios o plantas de tratamiento aprobados', 'Habilitación CIP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00075-2022-SENACE-PE',
          norm: 'R.P.E. N.° 00075-2022-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Residuos Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'res-geotecnia',
        subsectorId: 'residuos_solidos',
        role: '2. Ingeniería Civil / Geológica / Geotécnica / Sanitaria',
        requiredProfessions: [
          'Ingeniería Civil',
          'Ingeniería Geológica',
          'Ingeniería Sanitaria',
          'Ingeniero Civil',
          'Ingeniero Geólogo',
          'Ingeniero Sanitario'
        ],
        description: 'Evaluación física y geotécnica: estabilidad de taludes del relleno, diseño de sistemas de impermeabilización con geomembrana, manejo de lixiviados y control de biogás.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00075-2022-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Memorias de cálculo de estabilidad física, pozas de lixiviados y habilitación CIP'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00075-2022-SENACE-PE',
          norm: 'R.P.E. N.° 00075-2022-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Residuos Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'res-biologico',
        subsectorId: 'residuos_solidos',
        role: '3. Biología / Ecología / Ingeniería Ambiental',
        requiredProfessions: [
          'Biología',
          'Ecología',
          'Ingeniería Ambiental',
          'Biólogo',
          'Ecólogo',
          'Ingeniero Ambiental'
        ],
        description: 'Evaluación del medio biológico: prevención y control de vectores (roedores, moscas, aves carroñeras), cerco vivo y ecosistemas adyacentes.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00075-2022-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de control de fauna nociva y línea base biológica en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00075-2022-SENACE-PE',
          norm: 'R.P.E. N.° 00075-2022-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Residuos Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'res-social',
        subsectorId: 'residuos_solidos',
        role: '4. Sociología / Antropología / Trabajo Social',
        requiredProfessions: [
          'Sociología',
          'Antropología',
          'Trabajo Social',
          'Sociólogo',
          'Antropólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del medio social: articulación con asociaciones formales de recicladores, sensibilización vecinal y acuerdos de convivencia.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00075-2022-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Programas de formalización de recicladores y planes sociales en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00075-2022-SENACE-PE',
          norm: 'R.P.E. N.° 00075-2022-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Residuos Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'res-quimico',
        subsectorId: 'residuos_solidos',
        role: '5. Ingeniería Química / Sanitaria / Ambiental (Química de Lixiviados, Biogás, Emisiones Atmosféricas y Monitoreo Ambiental)',
        requiredProfessions: ['Ingeniería Química', 'Ingeniería Sanitaria', 'Ingeniería Ambiental', 'Ingeniero Químico', 'Ingeniero Sanitario', 'Ingeniero Ambiental'],
        description: 'Caracterización físico-química de lixiviados, generación y quema de biogás (metano), dispersión de malos olores y monitoreo de aguas subterráneas.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00075-2022-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Capítulos de modelamiento de biogás y tratamiento químico de lixiviados aprobados'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00075-2022-SENACE-PE',
          norm: 'R.P.E. N.° 00075-2022-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Residuos Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/minam'
        }
      },
      {
        id: 'res-sig',
        subsectorId: 'residuos_solidos',
        role: '6. Ingeniería Geográfica / Geografía / Ambiental (SIG, Emplazamiento de Infraestructura y Zonificación)',
        requiredProfessions: [
          'Ingeniería Geográfica',
          'Geografía',
          'Ingeniería Ambiental',
          'Ingeniero Geógrafo',
          'Geógrafo',
          'Ingeniero Ambiental'
        ],
        description: 'Modelamiento espacial y selección de sitio: distancias reglamentarias a aeropuertos (peligro aviar), fallas geológicas, fuentes hídricas y centros poblados.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00075-2022-SENACE-PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios de selección de sitio y geodatabases oficiales en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00075-2022-SENACE-PE',
          norm: 'R.P.E. N.° 00075-2022-SENACE-PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Residuos Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      }
    ]
  },
  {
    id: 'industria',
    code: 'SUB-IND',
    name: 'Industria Manufacturera',
    sectorMinistry: 'PRODUCE (Transferido a SENACE para complejos industriales mayores)',
    authoritySenace: true,
    description: 'Siderurgia, fundición, química básica, cementeras, curtiembres, papeleras, bebidas y alimentos procesados.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'ITS', 'DAA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.P.E. N.° 00003-2026-SENACE/PE (Conformación Equipo Multidisciplinario Industria Manufacturera)',
      'R.P.E. N.° 00060-2021-SENACE/PE (Disposiciones Técnicas RNCA)',
      'D.S. N.° 017-2015-PRODUCE (Reglamento de Gestión Ambiental para la Industria)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'ind-coord',
        subsectorId: 'industria',
        role: '1. Ingeniería Industrial / Química / Metalúrgica / Textil / Alimentos',
        requiredProfessions: [
          'Ingeniería Industrial',
          'Ingeniería Química',
          'Ingeniería Metalúrgica',
          'Ingeniería Textil',
          'Ingeniero Industrial',
          'Ingeniero Químico',
          'Ingeniero Metalúrgico'
        ],
        description: 'Especialista responsable de la dirección técnica e integración del estudio ambiental para plantas de manufactura fabril o parques industriales.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Industria Manufacturera (Ing. Industrial, Química o afín fabril) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector industrial (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales industriales aprobados por PRODUCE/SENACE', 'Habilitación CIP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Industria Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'ind-emisiones',
        subsectorId: 'industria',
        role: '2. Ingeniería Química / Ambiental / Sanitaria',
        requiredProfessions: [
          'Ingeniería Química',
          'Ingeniería Ambiental',
          'Ingeniería Sanitaria',
          'Ingeniero Químico',
          'Ingeniero Ambiental'
        ],
        description: 'Evaluación del medio físico: dispersión de emisiones atmosféricas de chimeneas (AERMOD/CALPUFF), control de olores y tratamiento de efluentes industriales no domésticos (PTARI).',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Modelos de calidad del aire, balances de emisiones y planes PTARI en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Industria Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'ind-seguridad',
        subsectorId: 'industria',
        role: '3. Ingeniería Industrial / Higiene y Seguridad Industrial / Química',
        requiredProfessions: [
          'Ingeniería de Higiene y Seguridad Industrial',
          'Ingeniería Industrial',
          'Ingeniería Química',
          'Ingeniero de Higiene y Seguridad Industrial',
          'Ingeniero Industrial',
          'Ingeniero Químico'
        ],
        description: 'Evaluación de riesgos mayores: análisis de sustancias químicas peligrosas (HAZMAT/MSDS), sustancias fiscalizadas, planes de contingencia y prevención de incendios/explosiones.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios de riesgo mayor, planes de contingencia química en SEIA y CIP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Industria Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'ind-social',
        subsectorId: 'industria',
        role: '4. Sociología / Antropología / Trabajo Social / Relaciones Industriales',
        requiredProfessions: [
          'Sociología',
          'Trabajo Social',
          'Antropología',
          'Sociólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del entorno social: relacionamiento comunitario en polígonos fabriles, planes de relaciones laborales-vecinales y mitigación de molestias.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de relaciones comunitarias industriales y actas de socialización en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Industria Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'ind-civil',
        subsectorId: 'industria',
        role: '5. Ingeniería Civil / Sanitaria / Ambiental (Infraestructura de Planta, Tratamiento Físico de Residuos y Drenaje Industrial)',
        requiredProfessions: ['Ingeniería Civil', 'Ingeniería Sanitaria', 'Ingeniería Ambiental', 'Ingeniero Civil', 'Ingeniero Sanitario', 'Ingeniero Ambiental'],
        description: 'Diseño estructural y ambiental de naves industriales, losas de contención secundaria, drenaje pluvial no contaminado y almacenamiento de insumos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Informes de diseño civil y ambiental de plantas industriales manufactureras'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Industria Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/'
        }
      },
      {
        id: 'ind-sig',
        subsectorId: 'industria',
        role: '6. Ingeniería Geográfica / Geografía / Ambiental (SIG, Localización de Parque Industrial y Dispersión de Contaminantes)',
        requiredProfessions: [
          'Ingeniería Geográfica',
          'Geografía',
          'Ingeniería Ambiental',
          'Ingeniero Geógrafo',
          'Geógrafo',
          'Ingeniero Ambiental'
        ],
        description: 'Modelamiento espacial y zonificación: compatibilidad con zonas industriales I-1 a I-4, fajas de amortiguamiento y cartografía oficial.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planos de zonificación industrial y geodatabase en formatos SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Industria Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      }
    ]
  },
  {
    id: 'comercio',
    code: 'SUB-COM',
    name: 'Comercio Interno',
    sectorMinistry: 'PRODUCE / SENACE (Inscripción RNCA y grandes centros comerciales)',
    authoritySenace: true,
    description: 'Centros comerciales de gran envergadura (Malls), almacenes logísticos, terminales de carga, hipermercados y centros de distribución.',
    studyTypes: ['EIA-sd', 'DIA', 'FTA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.P.E. N.° 00003-2026-SENACE/PE (Conformación Equipo Multidisciplinario Comercio Interno)',
      'D.S. N.° 006-2020-PRODUCE (Reglamento de Gestión Ambiental para Comercio)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'com-coord',
        subsectorId: 'comercio',
        role: '1. Ingeniería Industrial / Civil / Comercial / Arquitectura',
        requiredProfessions: [
          'Ingeniería Industrial',
          'Ingeniería Civil',
          'Arquitectura',
          'Ingeniero Industrial',
          'Ingeniero Civil',
          'Arquitecto'
        ],
        description: 'Especialista responsable de la dirección técnica e integración del estudio ambiental para malls, hipermercados o complejos de distribución.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Comercio Interno (Ing. Industrial, Civil, Comercial o Arquitectura) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector comercial o logístico (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales de retail, centros comerciales o logística aprobados', 'Habilitación colegiada vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Comercio Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/produce'
        }
      },
      {
        id: 'com-vial',
        subsectorId: 'comercio',
        role: '2. Ingeniería Civil / Transportes / Ambiental',
        requiredProfessions: [
          'Ingeniería Civil',
          'Ingeniería de Transportes',
          'Ingeniería Ambiental',
          'Ingeniero Civil',
          'Ingeniero de Transportes',
          'Ingeniero Ambiental'
        ],
        description: 'Evaluación del impacto vial y sonoro: Estudio de Impacto Vial (EIV), saturación de intersecciones, capacidad de estacionamientos y aislamiento acústico.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios de impacto vial (EIV), modelamientos de tráfico y acústicos en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Comercio Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/produce'
        }
      },
      {
        id: 'com-residuos',
        subsectorId: 'comercio',
        role: '3. Ingeniería Ambiental / Sanitaria / Química',
        requiredProfessions: [
          'Ingeniería Ambiental',
          'Ingeniería Sanitaria',
          'Ingeniería Química',
          'Ingeniero Ambiental',
          'Ingeniero Sanitario'
        ],
        description: 'Evaluación ambiental: manejo de residuos sólidos no municipales (embalajes, cartones), trampas de grasa para patios de comida y efluentes comerciales.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de manejo de residuos y diseño de trampas de grasa en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Comercio Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/produce'
        }
      },
      {
        id: 'com-social',
        subsectorId: 'comercio',
        role: '4. Sociología / Antropología / Trabajo Social / Comunicación',
        requiredProfessions: [
          'Sociología',
          'Trabajo Social',
          'Comunicación Social',
          'Antropología',
          'Sociólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del entorno social: consulta a vecinos colindantes, prevención de quejas por congestión y talleres de socialización ciudadana.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-sd', 'DIA'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Informes de talleres vecinales y planes de relaciones comunitarias en SEIA'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Comercio Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/produce'
        }
      },
      {
        id: 'com-seguridad',
        subsectorId: 'comercio',
        role: '5. Arquitectura / Ingeniería Civil / Seguridad y Evacuación (Seguridad de Edificaciones Comerciales, Aforos y Acondicionamiento Bioclimático)',
        requiredProfessions: ['Arquitectura', 'Ingeniería Civil', 'Arquitecto', 'Ingeniero Civil', 'Arquitecta'],
        description: 'Cálculo de aforo, flujos de evacuación masiva, ventilación mecánica, eficiencia energética y seguridad de vida en centros comerciales y malls.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['DIA', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios de seguridad humana y diseño arquitectónico ambiental aprobados en proyectos comerciales'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Comercio Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/'
        }
      },
      {
        id: 'com-sig',
        subsectorId: 'comercio',
        role: '6. Ingeniería Geográfica / Geografía / Ambiental (SIG Comercial, Análisis de Entorno Urbano y Accesibilidad Territorial)',
        requiredProfessions: ['Ingeniería Geográfica', 'Geografía', 'Ingeniería Ambiental', 'Ingeniero Geógrafo', 'Geógrafo', 'Ingeniero Ambiental'],
        description: 'Georreferenciación de áreas de influencia directa/indirecta, isócronas de acceso peatonal/vehicular e integración catastral.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00003-2026-SENACE/PE).',
        mandatoryEiaTypes: ['DIA', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Geodatabases aprobadas en instrumentos ambientales de comercio interno'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00003-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00003-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Comercio Num. 6 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/'
        }
      }
    ]
  },
  {
    id: 'pesca',
    code: 'SUB-PESC',
    name: 'Pesca y Acuicultura',
    sectorMinistry: 'PRODUCE (Transferido a SENACE para mega-plantas pesqueras)',
    authoritySenace: true,
    description: 'Plantas de harina y aceite de pescado, plantas de congelado y enlatado, centros de acuicultura de mediana y gran escala (AMYGE), desembarcaderos pesqueros.',
    studyTypes: ['EIA-d', 'EIA-sd', 'DIA', 'PAMA'],
    minimumTeamCount: 6,
    keyNorms: [
      'R.P.E. N.° 00029-2026-SENACE/PE (Conformación Equipo Multidisciplinario Pesca y Acuicultura)',
      'R.P.E. N.° 00060-2021-SENACE/PE (Disposiciones Técnicas RNCA)',
      'D.S. N.° 012-2019-PRODUCE (Reglamento de Gestión Ambiental para Pesca y Acuicultura)',
      'D.S. N.° 026-2021-MINAM'
    ],
    requirements: [
      {
        id: 'pesc-coord',
        subsectorId: 'pesca',
        role: '1. Ingeniería Pesquera / Acuícola / Biología Marina',
        requiredProfessions: [
          'Ingeniería Pesquera',
          'Ingeniería Acuícola',
          'Biología Marina',
          'Ingeniero Pesquero',
          'Biólogo Marino'
        ],
        description: 'Especialista responsable de la dirección técnica e integración del estudio ambiental para plantas de procesamiento pesquero o concesiones acuícolas.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'VINCULADA_SECTOR',
        formulario4Requirement: 'El especialista con carrera profesional vinculada a Pesca y Acuicultura (Ing. Pesquera, Acuícola o Biología Marina) debe acreditar una experiencia profesional mínima de cinco (05) años relacionada expresamente al sector pesquero o acuícola (Formulario 4 SENACE - R.P.E. N.° 00029-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Estudios ambientales pesqueros o acuícolas aprobados por PRODUCE/SENACE', 'Habilitación colegiada vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00029-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00029-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Pesca Num. 1 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'pesc-marino',
        subsectorId: 'pesca',
        role: '2. Oceanografía / Biología Marina / Geografía / Geología Marina',
        requiredProfessions: [
          'Biología Marina',
          'Ingeniería Pesquera',
          'Oceanografía',
          'Biólogo Marino',
          'Ingeniero Pesquero',
          'Oceanógrafo'
        ],
        description: 'Evaluación oceanográfica y biológica: dinámica de corrientes marinas, batimetría, dispersión de penachos, comunidades bentónicas y fauna pelágica.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00029-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Modelos hidrodinámicos marinos (CORMIX), evaluaciones IMARPE/DICAPI y CIP/CBP vigente'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00029-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00029-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Pesca Num. 2 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'pesc-efluentes',
        subsectorId: 'pesca',
        role: '3. Ingeniería Pesquera / Química / Ambiental / Sanitaria',
        requiredProfessions: [
          'Ingeniería Quimica',
          'Ingeniería Pesquera',
          'Ingeniería Ambiental',
          'Ingeniero Químico',
          'Ingeniero Pesquero',
          'Ingeniero Ambiental'
        ],
        description: 'Evaluación físico-química: tratamiento y recuperación de agua de bombeo, sanguaza y vahos de secado, oxidadores térmicos y emisarios submarinos.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00029-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de manejo de agua de cola y diseño de plantas de tratamiento de efluentes pesqueros'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00029-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00029-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Pesca Num. 3 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'pesc-social',
        subsectorId: 'pesca',
        role: '4. Sociología / Antropología / Trabajo Social / Comunicación',
        requiredProfessions: [
          'Sociología',
          'Antropología',
          'Trabajo Social',
          'Comunicación Social',
          'Sociólogo',
          'Antropólogo',
          'Trabajador Social'
        ],
        description: 'Evaluación del medio social: diálogo con gremios de pesca artesanal, desembarcaderos pesqueros artesanales (DPA) y comunidades del litoral costero.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00029-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de participación ciudadana aprobados con gremios pesqueros y actas'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00029-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00029-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Pesca Num. 4 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      },
      {
        id: 'pesc-sanitario',
        subsectorId: 'pesca',
        role: '5. Ingeniería Sanitaria / Ambiental / Química (Calidad de Agua Marina, Residuos Peligrosos y Control de Olores en Plantas Pesqueras)',
        requiredProfessions: ['Ingeniería Sanitaria', 'Ingeniería Ambiental', 'Ingeniería Química', 'Ingeniero Sanitario', 'Ingeniero Ambiental', 'Ingeniero Químico'],
        description: 'Evaluación de dispersión de olores (scrubbers), caracterización de agua residual industrial pesquera y manejo de residuos de pota/harina.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00029-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Planes de manejo de olores y tratamiento de efluentes pesqueros aprobados por PRODUCE'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00029-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00029-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Pesca Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.gob.pe/'
        }
      },
      {
        id: 'pesc-sig',
        subsectorId: 'pesca',
        role: '6. Ingeniería Geográfica / Geografía / Pesquera (SIG Marino, Batimetría y Concesiones Acuícolas)',
        requiredProfessions: [
          'Ingeniería Geográfica',
          'Geografía',
          'Ingeniería Pesquera',
          'Ingeniero Geógrafo',
          'Geógrafo',
          'Ingeniero Pesquero'
        ],
        description: 'Modelamiento espacial y SIG: cartas náuticas oficiales de DHN, cartografía de concesiones de maricultura y georreferenciación de zonas de fondeo.',
        minYearsExperienceTotal: 5,
        minYearsExperienceSpecific: 5,
        careerCategory: 'TRANSVERSAL',
        formulario4Requirement: 'El especialista con carrera profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o IGA complementarios al SEIA (Formulario 4 SENACE - R.P.E. N.° 00029-2026-SENACE/PE).',
        mandatoryEiaTypes: ['EIA-d', 'EIA-sd'],
        mandatoryCollege: true,
        mandatoryHabilitation: true,
        minimumCount: 1,
        evidenceRequired: ['Cartografía batimétrica georreferenciada en WGS84 y geodatabase oficial'],
        legalBasis: {
          resolution: 'R.P.E. N.° 00029-2026-SENACE/PE',
          norm: 'R.P.E. N.° 00029-2026-SENACE/PE y Formulario 4 SENACE',
          article: 'Anexo Técnico - Pesca Num. 5 / Ítem IV.a',
          validity: 'VIGENTE',
          sourceUrl: 'https://www.senace.gob.pe/'
        }
      }
    ]
  }
];
