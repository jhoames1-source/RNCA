import React, { useState } from 'react';
import { 
  Building2, CheckCircle2, ExternalLink, Users, FileText, 
  Briefcase, GraduationCap, ChevronRight, Download, Scale, BookOpen
} from 'lucide-react';
import { SubsectorDefinition, SubsectorId, Professional, LegalNorm } from '../types/rnca';
import { evaluateCandidateForRequirement } from '../utils/scoringEngine';
import { SUBSECTOR_NORMATIVE_REGISTRY } from '../data/senaceRecommendations';
import { RncaProcedureModal } from './RncaProcedureModal';

interface RequirementsEngineViewProps {
  subsectors: SubsectorDefinition[];
  selectedSubsectorId: SubsectorId;
  onSelectSubsector: (id: SubsectorId) => void;
  professionals: Professional[];
  legalNorms: LegalNorm[];
  onOpenProfile: (prof: Professional) => void;
  onAddToAgenda: (prof: Professional) => void;
  onOpenFormulario4?: (prof: Professional) => void;
}

export const RequirementsEngineView: React.FC<RequirementsEngineViewProps> = ({
  subsectors,
  selectedSubsectorId,
  onSelectSubsector,
  professionals,
  legalNorms,
  onOpenProfile,
  onAddToAgenda,
  onOpenFormulario4
}) => {
  const [selectedRequirementId, setSelectedRequirementId] = useState<string | null>(null);
  const [showProcedureModal, setShowProcedureModal] = useState(false);

  const currentSubsector = subsectors.find(s => s.id === selectedSubsectorId) || subsectors[0];
  
  // Set default requirement if null or not matching
  const activeReq = currentSubsector.requirements.find(r => r.id === selectedRequirementId) || currentSubsector.requirements[0];

  // Evaluate matching professionals for active requirement
  const matchingCandidates = professionals
    .map(p => {
      const evaluation = evaluateCandidateForRequirement(p, activeReq, currentSubsector.id);
      return {
        prof: p,
        evaluation
      };
    })
    .filter(item => item.evaluation.total >= 45 || item.evaluation.isLegallyQualified)
    .sort((a, b) => {
      if (a.evaluation.isLegallyQualified && !b.evaluation.isLegallyQualified) return -1;
      if (!a.evaluation.isLegallyQualified && b.evaluation.isLegallyQualified) return 1;
      return b.evaluation.total - a.evaluation.total;
    });

  return (
    <div className="space-y-6">
      
      {/* Subsector Selector Buttons (Section 18 of prompt) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Seleccionar Subsector para Consulta Normativa RNCA:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {subsectors.map(sub => {
            const isSelected = sub.id === currentSubsector.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  onSelectSubsector(sub.id);
                  setSelectedRequirementId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>[ {sub.name.toUpperCase()} ]</span>
                {sub.authoritySenace && (
                  <span className="text-[9px] bg-teal-800 text-teal-100 px-1 rounded">SENACE</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subsector Header Summary */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                CÓDIGO: {currentSubsector.code}
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                {currentSubsector.authoritySenace ? 'Transferido a SENACE' : 'Competencia Sectorial / MVCS'}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Requisitos Técnicos RNCA: {currentSubsector.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              {currentSubsector.description}
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 shrink-0 text-right md:text-left">
            <span className="text-xs text-slate-400 block font-medium">Conformación Mínima Exigida</span>
            <div className="text-2xl font-black text-emerald-400">
              {currentSubsector.minimumTeamCount} Especialistas
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Equipo multidisciplinario colegiado
            </span>
          </div>
        </div>

        {/* Study types & Norms tags */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs">
          <div>
            <strong className="text-slate-400">Instrumentos regulados:</strong>{' '}
            <span className="text-slate-200">{currentSubsector.studyTypes.join(' • ')}</span>
          </div>
          <div>
            <strong className="text-slate-400">Normas Clave:</strong>{' '}
            <span className="text-emerald-300">{currentSubsector.keyNorms.join(' • ')}</span>
          </div>
        </div>

        {/* Specialized Resolución de Jefatura & Formulario 4 Banner for Current Subsector */}
        {(() => {
          const normInfo = SUBSECTOR_NORMATIVE_REGISTRY[currentSubsector.id] || SUBSECTOR_NORMATIVE_REGISTRY.transportes;
          return (
            <div className="mt-4 pt-4 border-t border-slate-800 bg-emerald-950/40 p-4 rounded-lg border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 rounded font-black text-[10px] tracking-wide">
                    {normInfo.resolutionCode.toUpperCase()}
                  </span>
                  <span className="text-emerald-300 font-bold">
                    Conformación de Equipo Multidisciplinario ({normInfo.minimumTeamCount} Posiciones Mínimas) y Formulario 4
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Establece los perfiles técnicos de <strong>{normInfo.minimumTeamCount} disciplinas obligatorias</strong> para {currentSubsector.name}. 
                  Cada especialista debe acreditar <strong>cinco (05) años de experiencia mínima comprobable sin traslapes</strong> conforme al Formulario 4 SENACE (carrera vinculada en <em>{normInfo.linkedCareerTitle}</em> o carrera transversal en el SEIA).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowProcedureModal(true)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  title="Ver requisitos oficiales de inscripción según procedimiento gob.pe/10768"
                >
                  <BookOpen className="w-4 h-4 text-emerald-100" />
                  Guía GOB.PE/10768
                </button>
                {onOpenFormulario4 && (
                  <button
                    onClick={() => {
                      const candidateProf = professionals.find(p => 
                        (p.subsectorExperienceYears[currentSubsector.id] || 0) >= 5 ||
                        normInfo.linkedCareerKeywords.some(kw => p.profession.toLowerCase().includes(kw))
                      ) || professionals[0];
                      onOpenFormulario4(candidateProf);
                    }}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Auditar Formulario 4 & Recomendaciones ({currentSubsector.code})
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Two-Column Layout: Roles on the Left, Details & Matches on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Requirements List */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              Equipo Mínimo Multidisciplinario ({currentSubsector.requirements.length})
            </h2>
            <span className="text-xs text-slate-400 font-mono">D.S. 026-2021-MINAM</span>
          </div>

          <div className="space-y-2">
            {currentSubsector.requirements.map((req, idx) => {
              const isSelected = req.id === activeReq.id;
              // Count qualified candidates in current database
              const qualCount = professionals.filter(p => evaluateCandidateForRequirement(p, req, currentSubsector.id).isLegallyQualified).length;
              
              return (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequirementId(req.id)}
                  className={`w-full p-3 rounded-lg border text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">#{idx + 1}</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {req.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {req.requiredProfessions.join(', ')}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{req.careerCategory === 'VINCULADA_SECTOR' ? 'Exp. sectorial: 5 años' : 'Exp. SEIA transversal: 5 años'}</span>
                      <span>•</span>
                      <span>Formulario 4 SENACE</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      qualCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {qualCount} aptos
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Specification & Matched Candidates */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Requirement Detail Sheet */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold block mb-0.5">
                  FICHA TÉCNICA DE REQUISITO RNCA
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeReq.role}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {activeReq.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Categoría Formulario 4</span>
                <span className="font-bold text-slate-800 text-xs">
                  {activeReq.careerCategory === 'VINCULADA_SECTOR' ? 'Carrera Vinculada al Sector' : 'Carrera Transversal SEIA'}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Exp. Mínima Formulario 4</span>
                <span className="font-bold text-emerald-700 text-sm">
                  {activeReq.careerCategory === 'VINCULADA_SECTOR' ? `5 años en ${currentSubsector.name}` : '5 años en Estudios SEIA'}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Colegiatura y Habilitación</span>
                <span className="font-bold text-slate-800 text-sm">Obligatoria Vigente</span>
              </div>
            </div>

            {/* Formulario 4 Official Clause Callout Banner (Matching Image 1) */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3.5 text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                  Criterio de Experiencia según Formulario 4 del SENACE (Ítem IV.a)
                </span>
                {matchingCandidates.length > 0 && onOpenFormulario4 && (
                  <button
                    onClick={() => onOpenFormulario4(matchingCandidates[0].prof)}
                    className="text-[11px] bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Ver Modelo Formulario 4
                  </button>
                )}
              </div>
              <p className="text-amber-900 leading-relaxed italic bg-white/70 p-2 rounded border border-amber-200/60">
                "{activeReq.formulario4Requirement || (activeReq.careerCategory === 'VINCULADA_SECTOR' 
                  ? 'El especialista con carrera profesional vinculada a un determinado sector debe acreditar una experiencia profesional mínima de cinco (05) años relacionada al sector materia de la solicitud.'
                  : 'El especialista con carreras profesional transversal debe acreditar una experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o instrumentos de gestión ambiental complementarios al SEIA.')}"
              </p>
              <div className="text-[10px] text-amber-800 pt-1 border-t border-amber-200/60 flex flex-wrap gap-3">
                <span>• <strong>No traslape:</strong> Cada experiencia no debe traslaparse con otra</span>
                <span>• <strong>Orden cronológico:</strong> Desde la más reciente hasta la más antigua</span>
                <span>• <strong>Foliación:</strong> Indicar folios (DEL - AL)</span>
              </div>
            </div>

            {/* Profesiones Admitidas */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Profesiones y Carreras Admitidas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeReq.requiredProfessions.map((prof, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded font-medium border border-slate-200">
                    {prof}
                  </span>
                ))}
              </div>
            </div>

            {/* Evidencia Requerida */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Evidencia Documental Exigida para Acreditación:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {activeReq.evidenceRequired.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Base Normativa Oficial (Section 52 of prompt) */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-lg p-3 text-xs">
              <span className="font-bold text-teal-950 block mb-1">
                Cita Normativa Oficial Vinculante:
              </span>
              <div className="text-teal-900 font-mono text-[11px]">
                {activeReq.legalBasis.norm} • {activeReq.legalBasis.article}
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-teal-200/60 text-[11px]">
                <span className="font-bold text-emerald-800">Estado: {activeReq.legalBasis.validity}</span>
                <a 
                  href={activeReq.legalBasis.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-teal-700 font-semibold hover:underline flex items-center gap-1"
                >
                  Ver resolución oficial <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Matching Candidates Found */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-700" />
                  Candidatos Compatibles Identificados ({matchingCandidates.length})
                </h4>
                <p className="text-xs text-slate-500">
                  Profesionales en base que presentan coincidencias con los requisitos de este rol.
                </p>
              </div>
            </div>

            {matchingCandidates.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {matchingCandidates.map(({ prof, evaluation }) => (
                  <div key={prof.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm hover:text-emerald-700 cursor-pointer" onClick={() => onOpenProfile(prof)}>
                          {prof.fullName}
                        </span>
                        {prof.senaceSpecialist && (
                          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 rounded font-semibold">
                            SENACE
                          </span>
                        )}
                        {evaluation.isLegallyQualified ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">
                            Cumple Requisitos
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 rounded font-medium">
                            Requiere Verificación
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {prof.profession} • {prof.subsectorExperienceYears[currentSubsector.id] || 0} años exp. en {currentSubsector.name}
                      </div>
                      {!evaluation.isLegallyQualified && evaluation.legalFailureReasons.length > 0 && (
                        <div className="text-[11px] text-amber-800 mt-1">
                          Observación: {evaluation.legalFailureReasons[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-sm font-black text-emerald-700">{evaluation.total}%</div>
                        <div className="text-[10px] text-slate-400">Score</div>
                      </div>
                      {onOpenFormulario4 && (
                        <button
                          onClick={() => onOpenFormulario4(prof)}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-semibold"
                          title="Ver Formulario 4 (CV oficial SENACE)"
                        >
                          Form. 4
                        </button>
                      )}
                      <button
                        onClick={() => onOpenProfile(prof)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                      >
                        Ver Perfil
                      </button>
                      <button
                        onClick={() => onAddToAgenda(prof)}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold"
                      >
                        + Agenda
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                <strong>BRECHA DETECTADA:</strong> No se encontraron candidatos en la base actual que acrediten este perfil específico para {currentSubsector.name}. 
                Utilice el módulo de búsqueda avanzada o importe nuevos expedientes.
              </div>
            )}
          </div>

        </div>

      </div>

      <RncaProcedureModal
        isOpen={showProcedureModal}
        onClose={() => setShowProcedureModal(false)}
        initialSubsectorId={currentSubsector.id}
        onSelectSubsector={(id) => onSelectSubsector(id as SubsectorId)}
      />
    </div>
  );
};
