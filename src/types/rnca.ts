export type SubsectorId =
  | 'mineria'
  | 'electricidad'
  | 'hidrocarburos'
  | 'transportes'
  | 'agricultura'
  | 'vivienda'
  | 'saneamiento'
  | 'residuos_solidos'
  | 'industria'
  | 'comercio'
  | 'pesca';

export type VerificationStatus =
  | 'suficientemente_acreditado'
  | 'parcialmente_acreditado'
  | 'potencialmente_compatible'
  | 'requiere_verificacion'
  | 'identificado'
  | 'informacion_insuficiente'
  | 'no_verificable_fuentes_publicas'
  | 'no_cumple';

export type ConfidenceLevel = 'ALTO' | 'MEDIO' | 'BAJO' | 'NO_VERIFICADO';

export type EvidenceLevel = 'NIVEL_A' | 'NIVEL_B' | 'NIVEL_C' | 'NIVEL_D';

export type NormStatus = 'VIGENTE' | 'MODIFICADO' | 'DEROGADO' | 'PENDIENTE_VERIFICACION';

export type CandidatePipelineStatus =
  | 'IDENTIFICADO'
  | 'POR_CONTACTAR'
  | 'CONTACTADO'
  | 'INTERESADO'
  | 'DOCUMENTACION_SOLICITADA'
  | 'DOCUMENTACION_RECIBIDA'
  | 'EN_VERIFICACION'
  | 'APTO_PRELIMINARMENTE'
  | 'NO_APTO'
  | 'DESCARTADO'
  | 'INCORPORADO_AL_EQUIPO';

export type UserRole = 'ADMIN' | 'CONSULTORA' | 'INVESTIGADOR' | 'AUDITOR' | 'SOLO_LECTURA';

export interface EvidenceItem {
  id: string;
  level: EvidenceLevel;
  type: string;
  entity: string;
  title: string;
  url: string;
  dateChecked: string;
  publicationDate?: string;
  description: string;
  documentHash: string;
  credibility: 'ALTA' | 'MEDIA' | 'BAJA';
}

export interface AcademicDegreeItem {
  degree: string; // Bachiller, Título Profesional, Maestría, Doctorado
  career: string;
  university: string;
  year?: number;
  suneduVerified: boolean;
  sourceUrl?: string;
}

export interface ExperienceItem {
  role: string;
  project: string;
  clientOrEntity: string;
  subsector: SubsectorId;
  eiaType: 'EIA-d' | 'EIA-sd' | 'DIA' | 'ITS' | 'MEIA' | 'PAMA' | 'LINEA_BASE' | 'MONITOREO';
  yearsCount: number;
  period: string;
  evidenceSource: string;
  evidenceUrl: string;
  verified: boolean;
  // Campos oficiales del Formulario 4 del SENACE
  startDate?: string; // dd/mm/aaaa
  endDate?: string; // dd/mm/aaaa
  durationTotal?: { years: number; months: number; days: number };
  folios?: string; // Folios (DEL - AL)
  functionsDescription?: string; // Breve descripción de las funciones y/o actividades desarrolladas (*)
  categoryType?: 'VINCULADA_SECTOR' | 'TRANSVERSAL';
}

export interface Professional {
  id: string;
  fullName: string;
  profession: string; // e.g., 'Ingeniero Ambiental', 'Biólogo', 'Sociólogo'
  specialty: string;
  academicDegrees: AcademicDegreeItem[];
  university: string;
  department: string; // e.g. Lima, Arequipa, Cusco, Cajamarca
  city: string;
  yearsExperienceEstimated: number;
  environmentalExperienceYears: number;
  subsectorExperienceYears: Record<SubsectorId, number>;
  subsectorsCompatible: SubsectorId[];
  eiaTypesHandled: string[];
  professionalSummary: string;
  
  // Official SENACE & College status
  senaceSpecialist: boolean;
  senaceSpecialistId?: string;
  senaceSpecialistResolution?: string;
  senaceDatasetUrl?: string;
  
  colegioProfesional: string; // e.g. 'Colegio de Ingenieros del Perú (CIP)'
  colegiaturaNumber?: string;
  colegiaturaVerified: boolean;
  habilitacionVerified: boolean;
  
  // Public professional contact strictly pursuant to Ley 29733 (Corporate/institutional only)
  publicProfessionalEmail?: string;
  publicProfessionalPhone?: string;
  publicContactSource?: string;
  linkedinUrl?: string;
  orcidUrl?: string;
  profileUrl?: string;
  
  // Scoring & Evaluation
  verificationStatus: VerificationStatus;
  confidenceLevel: ConfidenceLevel;
  scores: {
    total: number;
    academic: number; // 0-25
    professionalExp: number; // 0-30
    environmentalExp: number; // 0-20
    sectorSpecificExp: number; // 0-15
    officialEvidence: number; // 0-10
  };
  
  evidences: EvidenceItem[];
  experiences: ExperienceItem[];
  publications?: string[];
  
  // Anti-fraud & homonym checks
  isHomonymSuspect: boolean;
  homonymNotes?: string;
  fraudSuspect: boolean;
  fraudNotes?: string;
  
  created_at: string;
  updated_at: string;
  last_verified_at: string;
}

export interface SubsectorRequirement {
  id: string;
  subsectorId: SubsectorId;
  role: string; // e.g., 'Coordinador del Estudio', 'Especialista Físico/Geotécnico'
  requiredProfessions: string[];
  description: string;
  minYearsExperienceTotal: number;
  minYearsExperienceSpecific: number;
  careerCategory?: 'VINCULADA_SECTOR' | 'TRANSVERSAL'; // Formulario 4 del SENACE
  formulario4Requirement?: string; // Texto literal del requisito de experiencia
  mandatoryEiaTypes: string[];
  mandatoryCollege: boolean;
  mandatoryHabilitation: boolean;
  minimumCount: number;
  evidenceRequired: string[];
  legalBasis: {
    norm: string;
    article: string;
    resolution?: string;
    validity: NormStatus;
    sourceUrl: string;
  };
}

export interface SubsectorDefinition {
  id: SubsectorId;
  code: string;
  name: string;
  sectorMinistry: string;
  authoritySenace: boolean;
  description: string;
  studyTypes: string[];
  minimumTeamCount: number;
  keyNorms: string[];
  requirements: SubsectorRequirement[];
}

export interface LegalNorm {
  id: string;
  code: string;
  title: string;
  authority: string;
  status: NormStatus;
  publicationDate: string;
  lastReviewDate: string;
  summary: string;
  officialUrl: string;
  elPeruanoRef: string;
  applicableSubsectors: SubsectorId[];
  keyArticles: {
    article: string;
    topic: string;
    fullSummary: string;
  }[];
}

export interface AgendaEntry {
  id: string;
  professionalId: string;
  subsectorId: SubsectorId;
  assignedRole: string;
  pipelineStatus: CandidatePipelineStatus;
  contactDate?: string;
  lastInteractionDate: string;
  proposedFee?: string;
  notes: string;
  documentsChecklist: {
    cvReceived: boolean;
    colegiaturaReceived: boolean;
    habilitacionReceived: boolean;
    djReceived: boolean;
    contractDrafted: boolean;
  };
  interviewsCount: number;
}

export interface ConsultingFirmProfile {
  legalName: string;
  ruc: string;
  legalRepresentative: string;
  address: string;
  targetSubsectors: SubsectorId[];
  registrationType: 'INSCRIPCION_NUEVA' | 'MODIFICACION_AMPLIACION' | 'RENOVACION';
  assignedTeam: {
    [requirementId: string]: string; // requirementId -> professionalId
  };
  notes: string;
  updatedAt: string;
}

export interface AuditCheckItem {
  id: string;
  question: string;
  category: 'LEGAL' | 'EVIDENCIA' | 'PRIVACIDAD' | 'ANTI_FRAUDE' | 'HOMONIMOS';
  passed: boolean;
  details: string;
  recommendation?: string;
}

export interface AuditReportResult {
  timestamp: string;
  auditorUser: string;
  totalChecks: number;
  passedChecks: number;
  warningChecks: number;
  failedChecks: number;
  checks: AuditCheckItem[];
  conclusion: string;
}

export interface SenaceRecommendationItem {
  id: string;
  category: 'EQUIPO_MULTIDISCIPLINARIO' | 'FORMULARIO_4' | 'HABILITACION' | 'SUSTENTO_DOCUMENTAL';
  title: string;
  recommendationText: string;
  normativeSource: string; // e.g. 'R.J. N.° 076-2016-SENACE/J' | 'Formulario 4 SENACE' | 'D.S. N.° 026-2021-MINAM'
  status: 'CUMPLIDO' | 'PENDIENTE' | 'OBSERVADO';
  actionNeeded: string;
  subsectorTarget?: SubsectorId;
}

export interface Formulario4Evaluation {
  professionalId: string;
  targetSubsector: SubsectorId;
  careerCategory: 'VINCULADA_SECTOR' | 'TRANSVERSAL';
  minimumYearsRequired: number; // 5 años obligatorios
  accreditedSectorYears: number;
  accreditedSeiaYears: number;
  totalCalculatedDays: number;
  totalCalculatedMonths: number;
  totalCalculatedYears: number;
  overlapDetected: boolean;
  overlapDaysDeducted: number;
  meetsRequirement: boolean;
  status: 'CUMPLE_5_ANOS' | 'OBSERVADO_MENOS_5_ANOS' | 'OBSERVADO_HABILITACION' | 'OBSERVADO_DOCUMENTAL';
  evaluationSummary: string;
  observations: string[];
  recommendations: string[];
}
