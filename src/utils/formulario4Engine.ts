import { Professional, ExperienceItem, SubsectorId, SubsectorRequirement, Formulario4Evaluation } from '../types/rnca';
import { SUBSECTOR_NORMATIVE_REGISTRY } from '../data/senaceRecommendations';

export interface DateRange {
  start: Date;
  end: Date;
  item: ExperienceItem;
}

/**
 * Parses dd/mm/yyyy or yyyy string into a Date object
 */
export function parseExperienceDate(dateStr?: string, defaultYear = 2020, isEnd = false): Date {
  if (!dateStr) {
    return new Date(defaultYear, isEnd ? 11 : 0, isEnd ? 31 : 1);
  }

  // Check if dd/mm/yyyy format
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  // Check if just a year
  const numYear = parseInt(dateStr, 10);
  if (!isNaN(numYear)) {
    return new Date(numYear, isEnd ? 11 : 0, isEnd ? 31 : 1);
  }

  return new Date(defaultYear, isEnd ? 11 : 0, isEnd ? 31 : 1);
}

/**
 * Calculates exact years, months and days between two dates
 */
export function calculateDateDifference(startDate: Date, endDate: Date): { years: number; months: number; days: number; totalDays: number } {
  if (endDate < startDate) {
    return { years: 0, months: 0, days: 0, totalDays: 0 };
  }

  const totalTime = endDate.getTime() - startDate.getTime();
  const totalDays = Math.max(1, Math.round(totalTime / (1000 * 60 * 60 * 24)));

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month
    const prevMonthLastDay = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays
  };
}

/**
 * Merges overlapping date ranges and computes overlap deductions
 * pursuant to the Formulario 4 non-overlapping rule
 */
export function calculateNetNonOverlappingDays(ranges: { start: Date; end: Date }[]): { netDays: number; overlapDays: number } {
  if (ranges.length === 0) return { netDays: 0, overlapDays: 0 };

  // Calculate gross days
  let grossDays = 0;
  for (const r of ranges) {
    grossDays += Math.max(1, Math.round((r.end.getTime() - r.start.getTime()) / (1000 * 60 * 60 * 24)));
  }

  // Sort by start date
  const sorted = [...ranges].sort((a, b) => a.start.getTime() - b.start.getTime());

  // Merge intervals
  const merged: { start: Date; end: Date }[] = [];
  let current = { start: new Date(sorted[0].start), end: new Date(sorted[0].end) };

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    if (next.start <= current.end) {
      // Overlap detected: extend current end if next end is further
      if (next.end > current.end) {
        current.end = new Date(next.end);
      }
    } else {
      merged.push(current);
      current = { start: new Date(next.start), end: new Date(next.end) };
    }
  }
  merged.push(current);

  let netDays = 0;
  for (const m of merged) {
    netDays += Math.max(1, Math.round((m.end.getTime() - m.start.getTime()) / (1000 * 60 * 60 * 24)));
  }

  const overlapDays = Math.max(0, grossDays - netDays);
  return { netDays, overlapDays };
}

/**
 * Evaluates a Professional against Formulario 4 rules (R.J. N.° 076-2016-SENACE/J)
 */
export function evaluateProfessionalFormulario4(
  prof: Professional,
  targetSubsector: SubsectorId,
  requirement?: SubsectorRequirement
): Formulario4Evaluation {
  const subNorm = SUBSECTOR_NORMATIVE_REGISTRY[targetSubsector] || SUBSECTOR_NORMATIVE_REGISTRY.transportes;
  const isSectorLinked = requirement?.careerCategory === 'VINCULADA_SECTOR' || 
    subNorm.linkedCareerKeywords.some(kw => prof.profession.toLowerCase().includes(kw));

  const careerCategory = isSectorLinked ? 'VINCULADA_SECTOR' : 'TRANSVERSAL';
  const minimumYearsRequired = 5;

  const accreditedSectorYears = prof.subsectorExperienceYears[targetSubsector] || 0;
  const accreditedSeiaYears = prof.environmentalExperienceYears || 0;

  // Convert experiences to date ranges
  const dateRanges: { start: Date; end: Date; item: ExperienceItem }[] = [];
  
  prof.experiences.forEach(exp => {
    let startDate: Date;
    let endDate: Date;

    if (exp.startDate && exp.endDate) {
      startDate = parseExperienceDate(exp.startDate, 2018, false);
      endDate = parseExperienceDate(exp.endDate, 2024, true);
    } else if (exp.period) {
      const parts = exp.period.split('-');
      const startY = parseInt(parts[0]?.trim() || '2018', 10);
      const endY = parseInt(parts[1]?.trim() || '2024', 10);
      startDate = new Date(startY, 0, 1);
      endDate = new Date(endY, 11, 31);
    } else {
      startDate = new Date(2018, 0, 1);
      endDate = new Date(2023, 11, 31);
    }

    dateRanges.push({ start: startDate, end: endDate, item: exp });
  });

  // Calculate overlap
  const { netDays, overlapDays } = calculateNetNonOverlappingDays(
    dateRanges.map(d => ({ start: d.start, end: d.end }))
  );

  const overlapDetected = overlapDays > 0;
  const overlapDaysDeducted = overlapDays;

  // Net calculations in Y / M / D
  const approxNetYears = Math.floor(netDays / 365);
  const remainingDaysAfterYears = netDays % 365;
  const approxNetMonths = Math.floor(remainingDaysAfterYears / 30);
  const approxDays = remainingDaysAfterYears % 30;

  // Evaluation criteria
  const observations: string[] = [];
  const recommendations: string[] = [];
  let meetsRequirement = true;
  let status: Formulario4Evaluation['status'] = 'CUMPLE_5_ANOS';

  // Check 1: College and habilitation
  if (!prof.colegiaturaVerified) {
    meetsRequirement = false;
    status = 'OBSERVADO_HABILITACION';
    observations.push('Colegiatura profesional no verificada en el colegio profesional correspondiente.');
    recommendations.push('Acreditar número de colegiatura y fecha de incorporación al colegio profesional.');
  }

  if (!prof.habilitacionVerified) {
    meetsRequirement = false;
    status = 'OBSERVADO_HABILITACION';
    observations.push('Constancia de Habilitación Profesional no vigente a la fecha.');
    recommendations.push('Gestionar certificado de habilitación profesional vigente ante su Colegio Profesional (CIP, CBP, CEL, etc.).');
  }

  // Check 2: 5 years threshold according to Formulario 4 & Subsector Resolution
  if (careerCategory === 'VINCULADA_SECTOR') {
    if (accreditedSectorYears < 5) {
      meetsRequirement = false;
      status = 'OBSERVADO_MENOS_5_ANOS';
      observations.push(
        `Carrera Vinculada al Sector (${prof.profession}): Acredita ${accreditedSectorYears} años en el subsector ${subNorm.name}, siendo exigido un mínimo de cinco (05) años conforme al Ítem IV.a del Formulario 4 (${subNorm.resolutionCode}).`
      );
      recommendations.push(
        `Acreditar ${5 - accreditedSectorYears} año(s) adicional(es) de experiencia con contratos u órdenes de servicio en proyectos del subsector ${subNorm.name}.`
      );
    }
  } else {
    // Transversal career
    if (accreditedSeiaYears < 5) {
      meetsRequirement = false;
      status = 'OBSERVADO_MENOS_5_ANOS';
      observations.push(
        `Carrera Transversal (${prof.profession}): Acredita ${accreditedSeiaYears} años en estudios ambientales / SEIA, siendo exigido un mínimo de cinco (05) años conforme al Ítem IV.a del Formulario 4 (${subNorm.resolutionCode} y D.S. N.° 026-2021-MINAM).`
      );
      recommendations.push(
        `Acreditar ${5 - accreditedSeiaYears} año(s) adicional(es) en elaboración, evaluación o fiscalización de estudios ambientales del SEIA.`
      );
    }
  }

  // Check general experience
  if (prof.yearsExperienceEstimated < 5) {
    meetsRequirement = false;
    status = 'OBSERVADO_MENOS_5_ANOS';
    observations.push(
      `Años totales de ejercicio profesional estimados (${prof.yearsExperienceEstimated}) inferiores al umbral mínimo de 5 años establecido en el Formulario 4.`
    );
  }

  if (overlapDetected) {
    observations.push(
      `Se detectó coincidencia de periodos en dos o más contratos (${overlapDaysDeducted} días simultáneos). Se dedujo el traslape en aplicación de la regla de dedicación simultánea del Formulario 4.`
    );
    recommendations.push(
      'Revisar las fechas de inicio y término en los contratos para certificar periodos cronológicos no duplicados.'
    );
  }

  const evaluationSummary = meetsRequirement
    ? `APTO — Cumple con el requisito de cinco (05) años de experiencia mínima exigida por la ${subNorm.resolutionCode} y Formulario 4 (${careerCategory === 'VINCULADA_SECTOR' ? `${accreditedSectorYears} años en ${subNorm.name}` : `${accreditedSeiaYears} años en SEIA`}).`
    : `OBSERVADO — No alcanza el estándar mínimo de cinco (05) años o presenta observaciones de colegiatura/habilitación según la ${subNorm.resolutionCode} y Formulario 4.`;

  return {
    professionalId: prof.id,
    targetSubsector,
    careerCategory,
    minimumYearsRequired,
    accreditedSectorYears,
    accreditedSeiaYears,
    totalCalculatedDays: netDays,
    totalCalculatedMonths: approxNetMonths,
    totalCalculatedYears: approxNetYears,
    overlapDetected,
    overlapDaysDeducted,
    meetsRequirement,
    status,
    evaluationSummary,
    observations,
    recommendations
  };
}
