import { SenaceRecommendationItem, SubsectorId } from '../types/rnca';

export interface SubsectorNormativeInfo {
  id: SubsectorId;
  name: string;
  resolutionCode: string;
  resolutionTitle: string;
  linkedCareerTitle: string;
  linkedCareerKeywords: string[];
  minimumTeamCount: number;
}

export const SUBSECTOR_NORMATIVE_REGISTRY: Record<SubsectorId, SubsectorNormativeInfo> = {
  mineria: {
    id: 'mineria',
    name: 'Minería',
    resolutionCode: 'R.J. N.° 090-2025-SENACE/J',
    resolutionTitle: 'Conformación de Equipo Multidisciplinario y Criterios de Evaluación para el Subsector Minería en el RNCA',
    linkedCareerTitle: 'Ingeniería de Minas / Metalurgia / Geología Minera',
    linkedCareerKeywords: ['minas', 'metalurg', 'geolog'],
    minimumTeamCount: 6
  },
  electricidad: {
    id: 'electricidad',
    name: 'Electricidad',
    resolutionCode: 'R.J. N.° 090-2025-SENACE/J',
    resolutionTitle: 'Disposiciones Técnicas para la Conformación de Equipo Multidisciplinario en el Subsector Electricidad',
    linkedCareerTitle: 'Ingeniería Eléctrica / Mecánica-Eléctrica / Energía',
    linkedCareerKeywords: ['electric', 'mecánic', 'energía'],
    minimumTeamCount: 6
  },
  hidrocarburos: {
    id: 'hidrocarburos',
    name: 'Hidrocarburos',
    resolutionCode: 'R.J. N.° 090-2025-SENACE/J',
    resolutionTitle: 'Disposiciones Técnicas para la Conformación de Equipo Multidisciplinario en el Subsector Hidrocarburos',
    linkedCareerTitle: 'Ingeniería de Petróleo / Petroquímica / Química / Gas Natural',
    linkedCareerKeywords: ['petróleo', 'petroquím', 'químic', 'gas'],
    minimumTeamCount: 6
  },
  transportes: {
    id: 'transportes',
    name: 'Transportes',
    resolutionCode: 'R.J. N.° 076-2016-SENACE/J',
    resolutionTitle: 'Conformación de Equipo Profesional Multidisciplinario para el Subsector Transportes',
    linkedCareerTitle: 'Ingeniería Civil / Vial / Transportes / Marítima / Aeronáutica',
    linkedCareerKeywords: ['civil', 'vial', 'transporte', 'marítim', 'aeronáut'],
    minimumTeamCount: 6
  },
  agricultura: {
    id: 'agricultura',
    name: 'Agricultura y Riego',
    resolutionCode: 'R.J. N.° 062-2017-SENACE/J',
    resolutionTitle: 'Criterios Técnicos para la Conformación de Equipos Multidisciplinarios en el Subsector Agricultura y Riego',
    linkedCareerTitle: 'Ingeniería Agrónoma / Agrícola / Agroforestal',
    linkedCareerKeywords: ['agrónom', 'agrícol', 'agroforest'],
    minimumTeamCount: 6
  },
  residuos_solidos: {
    id: 'residuos_solidos',
    name: 'Residuos Sólidos (Ambiente)',
    resolutionCode: 'R.P.E. N.° 00075-2022-SENACE-PE',
    resolutionTitle: 'Disposiciones para la Conformación de Equipo Multidisciplinario en Actividades de Residuos Sólidos',
    linkedCareerTitle: 'Ingeniería Sanitaria / Ambiental / Civil en Residuos',
    linkedCareerKeywords: ['sanitari', 'ambiental', 'civil'],
    minimumTeamCount: 6
  },
  industria: {
    id: 'industria',
    name: 'Industria Manufacturera',
    resolutionCode: 'R.P.E. N.° 00003-2026-SENACE/PE',
    resolutionTitle: 'Disposiciones para la Conformación del Equipo Multidisciplinario en el Subsector Industria Manufacturera',
    linkedCareerTitle: 'Ingeniería Industrial / Química / Textil / Metalúrgica',
    linkedCareerKeywords: ['industrial', 'químic', 'textil', 'metalúrg'],
    minimumTeamCount: 6
  },
  comercio: {
    id: 'comercio',
    name: 'Comercio Interno',
    resolutionCode: 'R.P.E. N.° 00003-2026-SENACE/PE',
    resolutionTitle: 'Disposiciones Técnicas para la Conformación de Equipos Multidisciplinarios en Comercio Interno y Centros Comerciales',
    linkedCareerTitle: 'Ingeniería Industrial / Comercial / Civil',
    linkedCareerKeywords: ['industrial', 'comercial', 'civil'],
    minimumTeamCount: 6
  },
  pesca: {
    id: 'pesca',
    name: 'Pesca y Acuicultura',
    resolutionCode: 'R.P.E. N.° 00029-2026-SENACE/PE',
    resolutionTitle: 'Disposiciones Técnicas para la Conformación del Equipo Multidisciplinario en el Subsector Pesca y Acuicultura',
    linkedCareerTitle: 'Ingeniería Pesquera / Acuícola / Biología Marina',
    linkedCareerKeywords: ['pesquer', 'acuícol', 'marino'],
    minimumTeamCount: 6
  },
  saneamiento: {
    id: 'saneamiento',
    name: 'Saneamiento',
    resolutionCode: 'R.P.E. N.° 00021-2025-SENACE/PE',
    resolutionTitle: 'Criterios Técnicos para la Conformación de Equipos Multidisciplinarios en Proyectos de Saneamiento y PTAR',
    linkedCareerTitle: 'Ingeniería Sanitaria / Civil Hidráulica',
    linkedCareerKeywords: ['sanitari', 'civil', 'hidrául'],
    minimumTeamCount: 6
  },
  vivienda: {
    id: 'vivienda',
    name: 'Vivienda y Construcción',
    resolutionCode: 'R.P.E. N.° 00048-2021-SENACE-PE',
    resolutionTitle: 'Disposiciones Técnicas para la Conformación de Equipos Multidisciplinarios en Vivienda y Habilitaciones Urbanas',
    linkedCareerTitle: 'Arquitectura / Ingeniería Civil Urbanística',
    linkedCareerKeywords: ['arquitect', 'civil', 'urban'],
    minimumTeamCount: 6
  }
};

/**
 * Returns the official SENACE recommendations tailored to a specific subsector
 */
export function getSenaceRecommendationsForSubsector(subsectorId: SubsectorId): SenaceRecommendationItem[] {
  const info = SUBSECTOR_NORMATIVE_REGISTRY[subsectorId] || SUBSECTOR_NORMATIVE_REGISTRY.transportes;

  return [
    {
      id: `rec-${subsectorId}-01`,
      category: 'EQUIPO_MULTIDISCIPLINARIO',
      title: `Conformación obligatoria del equipo mínimo (${info.resolutionCode})`,
      recommendationText: `El equipo multidisciplinario para el subsector ${info.name} debe acreditar como mínimo indispensable ${info.minimumTeamCount} especialistas cubriendo las disciplinas técnicas obligatorias establecidas en la ${info.resolutionCode}.`,
      normativeSource: `${info.resolutionCode} - Cuadro de Conformación Mínima`,
      status: 'PENDIENTE',
      actionNeeded: `Asignar al menos un profesional colegiado y habilitado en cada una de las posiciones requeridas para ${info.name}.`,
      subsectorTarget: subsectorId
    },
    {
      id: `rec-${subsectorId}-02`,
      category: 'FORMULARIO_4',
      title: `Acreditación mínima de cinco (05) años para Carrera Vinculada a ${info.name}`,
      recommendationText: `El especialista con carrera vinculada al sector (${info.linkedCareerTitle}) debe acreditar una experiencia profesional mínima de CINCO (05) AÑOS relacionada expresamente al sector ${info.name}. La experiencia en otros subsectores no computa para esta categoría sectorial.`,
      normativeSource: `Formulario 4 SENACE - Ítem IV.a (${info.resolutionCode})`,
      status: 'OBSERVADO',
      actionNeeded: `Verificar que el especialista sume al menos 60 meses acumulados netos de experiencia en proyectos del subsector ${info.name}.`,
      subsectorTarget: subsectorId
    },
    {
      id: `rec-${subsectorId}-03`,
      category: 'FORMULARIO_4',
      title: 'Acreditación mínima de cinco (05) años para Carreras Transversales en el SEIA',
      recommendationText: 'Los especialistas con carrera profesional transversal (física, biológica, ambiental, social, económica) deben acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o instrumentos del SEIA.',
      normativeSource: `Formulario 4 SENACE - Ítem IV.a (${info.resolutionCode} y D.S. N.° 026-2021-MINAM)`,
      status: 'OBSERVADO',
      actionNeeded: 'Auditar que cada especialista transversal acredite al menos 60 meses computados en el marco del SEIA (EIA-d, EIA-sd, DIA, MEIA, PAMA o fiscalización ambiental).',
      subsectorTarget: subsectorId
    },
    {
      id: `rec-${subsectorId}-04`,
      category: 'FORMULARIO_4',
      title: 'Regla de No Traslape y Deducción de Periodos Simultáneos',
      recommendationText: 'Cada experiencia profesional consignada en el Formulario 4 debe corresponder a un periodo no traslapado con otra experiencia. Si el especialista laboró paralelamente en dos consultorías durante el mismo rango de fechas, el tiempo computado se considera una sola vez.',
      normativeSource: 'Formulario 4 SENACE - Instrucciones Técnicas y Notas al Pie (*)',
      status: 'CUMPLIDO',
      actionNeeded: 'Aplicar el algoritmo de descarte de traslapes en las fechas de inicio y fin para calcular el tiempo neto computable.',
      subsectorTarget: subsectorId
    },
    {
      id: `rec-${subsectorId}-05`,
      category: 'HABILITACION',
      title: 'Cómputo a partir de la Colegiatura y Habilidad Profesional Vigente',
      recommendationText: 'La experiencia profesional válida ante el SENACE se computa a partir de la fecha de expedición de la colegiatura profesional (o titulación para profesiones no colegiadas). El especialista debe contar con certificado de habilitación profesional vigente al ingreso del trámite.',
      normativeSource: 'D.S. N.° 026-2021-MINAM (Art. 8 y 9) y Leyes de Creación de Colegios Profesionales',
      status: 'CUMPLIDO',
      actionNeeded: 'Adjuntar constancia digital de habilidad expedida por el colegio profesional (CIP, CBP, CEL, etc.) vigente.',
      subsectorTarget: subsectorId
    },
    {
      id: `rec-${subsectorId}-06`,
      category: 'SUSTENTO_DOCUMENTAL',
      title: 'Foliación obligatoria y descripción detallada de funciones (*)',
      recommendationText: `El Formulario 4 debe detallar las funciones y actividades técnicas vinculadas al sector ${info.name} o al SEIA, indicando fechas de inicio y fin (dd/mm/aaaa), cálculo de años, meses y días, y folios (del - al) donde obra el documento sustentatorio (contrato, orden de servicio o constancia).`,
      normativeSource: 'Formulario 4 SENACE - Tabla de Experiencia Profesional',
      status: 'PENDIENTE',
      actionNeeded: 'Completar el rango de folios para cada ítem de experiencia en el expediente administrativo.',
      subsectorTarget: subsectorId
    }
  ];
}

// Keep backward compatibility export
export const SENACE_TRANSPORTES_RECOMMENDATIONS = getSenaceRecommendationsForSubsector('transportes');
