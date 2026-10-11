import { Professional, SubsectorRequirement, SubsectorId } from '../types/rnca';

export interface ScoreBreakdown {
  total: number;
  academic: number;
  professionalExp: number;
  environmentalExp: number;
  sectorSpecificExp: number;
  officialEvidence: number;
  compatibilityLabel: string;
  isLegallyQualified: boolean;
  legalFailureReasons: string[];
}

function normalizeStem(word: string): string {
  let s = word
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  // Strip common gender/number/degree suffixes in Spanish
  s = s.replace(/(ista|istas|idad|idades|ion|iones|os|as|es|o|a|ia|io)$/, '');
  return s;
}

export function isProfessionCompatible(candidateProf: string, allowedList: string[]): boolean {
  if (!candidateProf || !allowedList || allowedList.length === 0) return false;

  const candNorm = candidateProf.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  return allowedList.some(allowed => {
    const allowedNorm = allowed.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    if (candNorm.includes(allowedNorm) || allowedNorm.includes(candNorm)) return true;

    const candStems = candNorm
      .split(/[\s\/-]+/)
      .map(normalizeStem)
      .filter(w => w.length >= 3 && !['para', 'del', 'los', 'las', 'con', 'por'].includes(w));

    const allowedStems = allowedNorm
      .split(/[\s\/-]+/)
      .map(normalizeStem)
      .filter(w => w.length >= 3 && !['para', 'del', 'los', 'las', 'con', 'por'].includes(w));

    if (candStems.length === 0 || allowedStems.length === 0) return false;

    // Check if key substantive stems intersect (e.g., "biolog" or "sociolog" or "econom" or "arquitect")
    const keyDisciplines = [
      'biolog', 'ecolog', 'sociolog', 'antropolog', 'arqueolog', 'comunic', 'psicolog',
      'geograf', 'geolog', 'quimic', 'fisic', 'agronom', 'agricol', 'forestal',
      'sanitari', 'pesquer', 'acuicol', 'oceanograf', 'metalurg', 'petrol', 'petroquim',
      'electric', 'mecanic', 'ambient', 'civil', 'arquitect', 'econom', 'urban', 'industri'
    ];

    const matchedKeyCand = candStems.filter(s => keyDisciplines.some(kd => s.includes(kd) || kd.includes(s)));
    const matchedKeyAllowed = allowedStems.filter(s => keyDisciplines.some(kd => s.includes(kd) || kd.includes(s)));

    if (matchedKeyCand.length > 0 && matchedKeyAllowed.length > 0) {
      return matchedKeyCand.some(cs => matchedKeyAllowed.some(as => cs.includes(as) || as.includes(cs)));
    }

    // Generic word overlap
    return allowedStems.every(as => candStems.some(cs => cs.includes(as) || as.includes(cs))) ||
           candStems.every(cs => allowedStems.some(as => as.includes(cs) || cs.includes(as)));
  });
}

export function evaluateCandidateForRequirement(
  prof: Professional,
  req: SubsectorRequirement,
  targetSubsector: SubsectorId
): ScoreBreakdown {
  const failureReasons: string[] = [];

  // Check 1: Profession match (using intelligent stem & degree/gender normalization)
  const professionMatch = isProfessionCompatible(prof.profession, req.requiredProfessions);
  if (!professionMatch) {
    failureReasons.push(`Profesión '${prof.profession}' no coincide con las requeridas: ${req.requiredProfessions.join(', ')}`);
  }

  // Check 2: Colegiatura & Habilitación
  if (req.mandatoryCollege && !prof.colegiaturaVerified) {
    failureReasons.push('Colegiatura profesional no verificada en colegio respectivo');
  }
  if (req.mandatoryHabilitation && !prof.habilitacionVerified) {
    failureReasons.push('Constancia de Habilitación profesional no vigente');
  }

  // Check 3: Years of experience (Regla Oficial del Formulario 4 del SENACE)
  const isSectorLinked = req.careerCategory === 'VINCULADA_SECTOR';
  const sectorExp = prof.subsectorExperienceYears[targetSubsector] || 0;

  if (isSectorLinked) {
    // Especialista con carrera vinculada a un determinado sector: 5 años en el sector materia de la solicitud
    const minRequired = req.minYearsExperienceSpecific || 5;
    if (sectorExp < minRequired) {
      failureReasons.push(`Formulario 4 SENACE (Carrera vinculada al sector): Requiere experiencia mínima de ${minRequired} años relacionada al subsector ${targetSubsector} (acredita ${sectorExp} años)`);
    }
  } else {
    // Especialista con carrera profesional transversal: 5 años en estudios ambientales o IGA complementarios al SEIA
    const minEnvRequired = req.minYearsExperienceTotal || 5;
    if (prof.environmentalExperienceYears < minEnvRequired) {
      failureReasons.push(`Formulario 4 SENACE (Carrera transversal): Requiere experiencia mínima de ${minEnvRequired} años en estudios ambientales / SEIA (acredita ${prof.environmentalExperienceYears} años)`);
    }
  }

  if (prof.yearsExperienceEstimated < 5) {
    failureReasons.push(`Años de ejercicio profesional (${prof.yearsExperienceEstimated}) inferiores al umbral de 5 años establecido en el Formulario 4`);
  }

  // Check 4: EIA Types (experiencia en al menos uno de los instrumentos aplicables o categoría superior EIA-d/EIA-sd)
  if (req.mandatoryEiaTypes && req.mandatoryEiaTypes.length > 0) {
    const hasHandledMatchingEia = req.mandatoryEiaTypes.some(eia => 
      prof.eiaTypesHandled.includes(eia) ||
      (prof.eiaTypesHandled.includes('EIA-d') && ['EIA-sd', 'DIA', 'ITS', 'MEIA'].includes(eia)) ||
      (prof.eiaTypesHandled.includes('EIA-sd') && ['DIA', 'ITS'].includes(eia))
    );
    if (!hasHandledMatchingEia) {
      failureReasons.push(`Falta acreditar experiencia en alguno de los instrumentos requeridos: ${req.mandatoryEiaTypes.join(', ')}`);
    }
  }

  // Check 5: Anti-fraud flag
  if (prof.fraudSuspect) {
    failureReasons.push('Alerta de inconsistencia documental / temporal pendiente de revisión humana');
  }

  // Scoring weights:
  // Academic: 0 - 25
  let academic = 15;
  if (prof.academicDegrees.some(d => d.suneduVerified)) academic += 5;
  if (prof.academicDegrees.some(d => d.degree.toLowerCase().includes('maestría') || d.degree.toLowerCase().includes('doctorado'))) academic += 5;

  // Professional exp: 0 - 30
  const expRatio = Math.min(prof.yearsExperienceEstimated / 12, 1);
  const professionalExp = Math.round(expRatio * 30);

  // Environmental exp: 0 - 20
  const envRatio = Math.min(prof.environmentalExperienceYears / 10, 1);
  const environmentalExp = Math.round(envRatio * 20);

  // Sector specific exp: 0 - 15
  const sectorRatio = Math.min(sectorExp / 8, 1);
  const sectorSpecificExp = Math.round(sectorRatio * 15);

  // Official evidence: 0 - 10
  let officialEvidence = 0;
  if (prof.senaceSpecialist) officialEvidence += 4;
  if (prof.evidences.some(e => e.level === 'NIVEL_A')) officialEvidence += 4;
  if (prof.colegiaturaVerified && prof.habilitacionVerified) officialEvidence += 2;
  officialEvidence = Math.min(officialEvidence, 10);

  const total = Math.min(academic + professionalExp + environmentalExp + sectorSpecificExp + officialEvidence, 100);

  let compatibilityLabel = 'No recomendable';
  if (total >= 90) compatibilityLabel = 'Altamente compatible';
  else if (total >= 75) compatibilityLabel = 'Compatible';
  else if (total >= 60) compatibilityLabel = 'Candidato potencial';
  else if (total >= 40) compatibilityLabel = 'Información insuficiente';

  const isLegallyQualified = failureReasons.length === 0;

  return {
    total,
    academic,
    professionalExp,
    environmentalExp,
    sectorSpecificExp,
    officialEvidence,
    compatibilityLabel,
    isLegallyQualified,
    legalFailureReasons: failureReasons
  };
}
