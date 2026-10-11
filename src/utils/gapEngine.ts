import { Professional, SubsectorDefinition, SubsectorRequirement } from '../types/rnca';
import { evaluateCandidateForRequirement } from './scoringEngine';

export interface RequirementGap {
  requirement: SubsectorRequirement;
  assignedCandidate: Professional | null;
  status: 'CUBIERTO_TOTAL' | 'CUBIERTO_PARCIAL' | 'VACANTE' | 'REQUIERE_VERIFICACION';
  candidatesAvailableCount: number;
  bestCandidates: {
    professional: Professional;
    score: number;
    qualified: boolean;
    issues: string[];
  }[];
  notes: string;
}

export interface SubsectorGapAnalysis {
  subsector: SubsectorDefinition;
  totalRequiredRoles: number;
  coveredRolesCount: number;
  vacantRolesCount: number;
  compliancePercentage: number;
  isComplete: boolean;
  gaps: RequirementGap[];
}

export function analyzeSubsectorGaps(
  subsector: SubsectorDefinition,
  allProfessionals: Professional[],
  assignedTeamMap: Record<string, string> // requirementId -> professionalId
): SubsectorGapAnalysis {
  const gaps: RequirementGap[] = [];
  let coveredCount = 0;

  subsector.requirements.forEach(req => {
    const assignedId = assignedTeamMap[req.id];
    const assignedCandidate = allProfessionals.find(p => p.id === assignedId) || null;

    // Find candidates who match this requirement
    const potentialMatches = allProfessionals
      .map(p => {
        const evalResult = evaluateCandidateForRequirement(p, req, subsector.id);
        return {
          professional: p,
          score: evalResult.total,
          qualified: evalResult.isLegallyQualified,
          issues: evalResult.legalFailureReasons
        };
      })
      .filter(m => m.score >= 50 || m.qualified)
      .sort((a, b) => {
        if (a.qualified && !b.qualified) return -1;
        if (!a.qualified && b.qualified) return 1;
        return b.score - a.score;
      });

    let status: RequirementGap['status'] = 'VACANTE';
    let notes = `Se requiere 1 ${req.role} con perfil en: ${req.requiredProfessions.join(', ')}.`;

    if (assignedCandidate) {
      const evalAssigned = evaluateCandidateForRequirement(assignedCandidate, req, subsector.id);
      if (evalAssigned.isLegallyQualified && evalAssigned.total >= 75) {
        status = 'CUBIERTO_TOTAL';
        coveredCount++;
        notes = `Cubierto satisfactoriamente por ${assignedCandidate.fullName} (Score: ${evalAssigned.total}%).`;
      } else if (evalAssigned.isLegallyQualified) {
        status = 'CUBIERTO_PARCIAL';
        coveredCount += 0.5;
        notes = `Cubierto preliminarmente por ${assignedCandidate.fullName}, pero con observaciones menores: ${evalAssigned.legalFailureReasons.join('; ')}`;
      } else {
        status = 'REQUIERE_VERIFICACION';
        notes = `Candidato asignado ${assignedCandidate.fullName} no acredita requisitos: ${evalAssigned.legalFailureReasons.join('; ')}`;
      }
    } else {
      if (potentialMatches.length > 0) {
        const topMatch = potentialMatches[0];
        notes += ` Se encontraron ${potentialMatches.length} candidatos compatibles. Recomendado: ${topMatch.professional.fullName} (${topMatch.score}%).`;
      } else {
        notes += ` ALERTA CRÍTICA: No se encontraron candidatos con evidencia suficiente en la base actual.`;
      }
    }

    gaps.push({
      requirement: req,
      assignedCandidate,
      status,
      candidatesAvailableCount: potentialMatches.length,
      bestCandidates: potentialMatches.slice(0, 3),
      notes
    });
  });

  const totalRequired = subsector.requirements.length;
  const compliancePercentage = Math.round((coveredCount / totalRequired) * 100);

  return {
    subsector,
    totalRequiredRoles: totalRequired,
    coveredRolesCount: Math.floor(coveredCount),
    vacantRolesCount: totalRequired - Math.floor(coveredCount),
    compliancePercentage,
    isComplete: coveredCount >= totalRequired,
    gaps
  };
}

export interface OptimalTeamRecommendation {
  subsector: SubsectorDefinition;
  team: {
    requirement: SubsectorRequirement;
    selectedProfessional: Professional;
    compatibilityScore: number;
    synergyReason: string;
  }[];
  totalAverageScore: number;
  coverageRate: number;
}

export function calculateOptimalTeam(
  subsector: SubsectorDefinition,
  allProfessionals: Professional[]
): OptimalTeamRecommendation {
  const usedProfessionalIds = new Set<string>();
  const team: OptimalTeamRecommendation['team'] = [];

  subsector.requirements.forEach(req => {
    // Look for available professional with highest qualified score who is not yet in team
    const eligible = allProfessionals
      .filter(p => !usedProfessionalIds.has(p.id))
      .map(p => ({
        prof: p,
        eval: evaluateCandidateForRequirement(p, req, subsector.id)
      }))
      .filter(item => !item.prof.fraudSuspect)
      .sort((a, b) => {
        if (a.eval.isLegallyQualified && !b.eval.isLegallyQualified) return -1;
        if (!a.eval.isLegallyQualified && b.eval.isLegallyQualified) return 1;
        return b.eval.total - a.eval.total;
      });

    if (eligible.length > 0) {
      const best = eligible[0];
      usedProfessionalIds.add(best.prof.id);
      
      let synergy = `Acredita formación en ${best.prof.profession} (${best.prof.university}), ${best.prof.environmentalExperienceYears} años de experiencia ambiental y habilitación CIP/CBP verificada.`;
      if (best.prof.senaceSpecialist) {
        synergy += ' Registrado en Nómina Oficial de Especialistas SENACE.';
      }

      team.push({
        requirement: req,
        selectedProfessional: best.prof,
        compatibilityScore: best.eval.total,
        synergyReason: synergy
      });
    }
  });

  const totalAverageScore = team.length > 0 
    ? Math.round(team.reduce((acc, t) => acc + t.compatibilityScore, 0) / team.length)
    : 0;

  const coverageRate = Math.round((team.length / subsector.requirements.length) * 100);

  return {
    subsector,
    team,
    totalAverageScore,
    coverageRate
  };
}
