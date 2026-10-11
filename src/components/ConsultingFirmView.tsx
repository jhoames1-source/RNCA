import React, { useState } from 'react';
import { 
  Building2, CheckSquare, Square, FileText, Printer, 
  Trash2, Plus, ArrowRight, UserCheck, ShieldCheck, AlertCircle, ExternalLink, CreditCard, BookOpen
} from 'lucide-react';
import { ConsultingFirmProfile, SubsectorDefinition, Professional, LegalNorm, SubsectorId } from '../types/rnca';
import { analyzeSubsectorGaps, calculateOptimalTeam } from '../utils/gapEngine';
import { printOfficialRncaReport } from '../utils/exportEngine';
import { RncaProcedureModal } from './RncaProcedureModal';

interface ConsultingFirmViewProps {
  firmProfile: ConsultingFirmProfile;
  subsectors: SubsectorDefinition[];
  professionals: Professional[];
  legalNorms: LegalNorm[];
  onUpdateFirmProfile: (updated: ConsultingFirmProfile) => void;
  onOpenProfile: (prof: Professional) => void;
  onNavigateSearch: () => void;
  onOpenFormulario4?: (prof: Professional) => void;
}

export const ConsultingFirmView: React.FC<ConsultingFirmViewProps> = ({
  firmProfile,
  subsectors,
  professionals,
  legalNorms,
  onUpdateFirmProfile,
  onOpenProfile,
  onNavigateSearch,
  onOpenFormulario4
}) => {
  const [selectedSubsectorForReport, setSelectedSubsectorForReport] = useState<SubsectorId>(firmProfile.targetSubsectors[0] || 'mineria');
  const [showProcedureModal, setShowProcedureModal] = useState(false);

  // Checklist state based on official gob.pe/10768 procedure
  const [checklist, setChecklist] = useState({
    legalRucActive: true,
    legalVigenciaPoder: true,
    objetoSocialAmbiental: true,
    formulario03Firmado: true,
    tupaPagoValidado: true,
    seisEspecialistasDistintos: true,
    formulario04Todos: true,
    titulosSunedu: true,
    colegiaturaAlDia: true,
    habilitacionVigente: true,
    anosExpAcreditados: true,
    evidenciasNivelA: true,
    declaracionJuradaNoInhabilitacion: false,
    contratosPreliminares: false,
    softwareLicenciadoGis: true
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const handleRemoveAssignment = (requirementId: string) => {
    const updatedTeam = { ...firmProfile.assignedTeam };
    delete updatedTeam[requirementId];
    onUpdateFirmProfile({
      ...firmProfile,
      assignedTeam: updatedTeam,
      updatedAt: new Date().toISOString()
    });
  };

  // Generate Official Report (Section 35 of prompt)
  const handleGenerateOfficialReport = () => {
    const targetSub = subsectors.find(s => s.id === selectedSubsectorForReport) || subsectors[0];
    const gapAnalysis = analyzeSubsectorGaps(targetSub, professionals, firmProfile.assignedTeam);
    const optimal = calculateOptimalTeam(targetSub, professionals);

    printOfficialRncaReport({
      subsector: targetSub,
      legalNorms,
      gapAnalysis,
      recommendedTeam: optimal.team.map(t => ({
        role: t.requirement.role,
        candidateName: t.selectedProfessional.fullName,
        profession: t.selectedProfessional.profession,
        score: t.compatibilityScore,
        evidenceSummary: t.synergyReason
      })),
      alternativeCandidates: professionals.filter(p => !optimal.team.some(t => t.selectedProfessional.id === p.id)).slice(0, 3).map(p => ({
        candidateName: p.fullName,
        profession: p.profession,
        score: p.scores.total
      })),
      consultingFirmName: firmProfile.legalName
    });
  };

  const currentSubDef = subsectors.find(s => s.id === selectedSubsectorForReport) || subsectors[0];
  const currentGaps = analyzeSubsectorGaps(currentSubDef, professionals, firmProfile.assignedTeam);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Firm Identity */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono text-emerald-700 font-bold block mb-1">
              EXPEDIENTE DE CONSULTORA AMBIENTAL POSTULANTE AL RNCA
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {firmProfile.legalName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              RUC: <strong className="text-slate-800">{firmProfile.ruc}</strong> | Rep. Legal: <strong className="text-slate-800">{firmProfile.legalRepresentative}</strong> | Sede: {firmProfile.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProcedureModal(true)}
              className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-black text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              Guía Oficial GOB.PE/10768
            </button>
            <button
              onClick={handleGenerateOfficialReport}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Generar Informe Oficial RNCA
            </button>
          </div>
        </div>

        {/* Target Subsectors Selection */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Subsectores de Postulación:</span>
            <div className="flex flex-wrap gap-1.5">
              {firmProfile.targetSubsectors.map(subId => {
                const sub = subsectors.find(s => s.id === subId);
                return (
                  <span key={subId} className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
                    {sub?.name || subId}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Subsector activo para auditoría:</span>
            <select
              value={selectedSubsectorForReport}
              onChange={(e) => setSelectedSubsectorForReport(e.target.value as SubsectorId)}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs font-bold text-slate-800"
            >
              {subsectors.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Assigned Team vs Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Team Composition & What is missing? (Section 46 of prompt) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                Equipo Técnico Asignado: {currentSubDef.name}
              </h3>
              <p className="text-xs text-slate-500">
                Cobertura actual: <strong>{currentGaps.coveredRolesCount} de {currentGaps.totalRequiredRoles}</strong> roles cubiertos ({currentGaps.compliancePercentage}%)
              </p>
            </div>
            <button
              onClick={onNavigateSearch}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              Buscar más candidatos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Missing roles indicator ("¿Qué me falta para completar el equipo?") */}
          {currentGaps.vacantRolesCount > 0 ? (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs text-rose-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>¿QUÉ ME FALTA PARA COMPLETAR EL EQUIPO EN {currentSubDef.name.toUpperCase()}?</strong>
                <p className="mt-0.5 text-rose-800">
                  Faltan <strong>{currentGaps.vacantRolesCount} especialistas obligatorios</strong> para cumplir con la conformación mínima del D.S. 026-2021-MINAM. 
                  Revise las vacantes señaladas abajo o aplique la combinación recomendada.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>¡EQUIPO COMPLETO PREVIAMENTE!</strong> Todos los roles mínimos de {currentSubDef.name} cuentan con un profesional asignado.
              </span>
            </div>
          )}

          {/* Roles List */}
          <div className="space-y-2.5 pt-1">
            {currentSubDef.requirements.map((req, idx) => {
              const assignedId = firmProfile.assignedTeam[req.id];
              const assignedProf = professionals.find(p => p.id === assignedId);

              return (
                <div key={req.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">#{idx + 1}</span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{req.role}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Req: {req.requiredProfessions.join(', ')} • Mín. {req.minYearsExperienceSpecific} años en {currentSubDef.name}
                    </p>

                    {assignedProf ? (
                      <div className="mt-1.5 flex items-center gap-2 text-xs">
                        <span className="font-semibold text-emerald-800 hover:underline cursor-pointer" onClick={() => onOpenProfile(assignedProf)}>
                          {assignedProf.fullName}
                        </span>
                        <span className="text-slate-500">({assignedProf.profession} - CIP {assignedProf.colegiaturaNumber || 'N/A'})</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 rounded">
                          {assignedProf.scores.total}%
                        </span>
                      </div>
                    ) : (
                      <div className="mt-1 text-xs text-rose-600 font-bold">
                        [ VACANTE — Sin profesional asignado ]
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {assignedProf ? (
                      <div className="flex items-center gap-1.5">
                        {onOpenFormulario4 && (
                          <button
                            onClick={() => onOpenFormulario4(assignedProf)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-[11px] flex items-center gap-1 transition cursor-pointer shadow-2xs"
                            title="Auditar Formulario 4 del SENACE (R.J. 076-2016-SENACE/J)"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-700" />
                            Formulario 4
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveAssignment(req.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                          title="Desvincular rol"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={onNavigateSearch}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Asignar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: RNCA Verification Checklist (Section 47 of prompt) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              Checklist de Requisitos Previos RNCA
            </h3>
            <p className="text-xs text-slate-500">
              Control técnico de verificación documental antes de ingresar el expediente en SENACE.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            
            <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider pt-1 text-emerald-800">
              1. Requisitos Legales y Administrativos
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.legalRucActive}
                onChange={() => toggleCheck('legalRucActive')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>RUC activo y habido en SUNAT con actividad de consultoría ambiental</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.legalVigenciaPoder}
                onChange={() => toggleCheck('legalVigenciaPoder')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Vigencia de poder del representante legal (antigüedad &lt; 30 días SUNARP)</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.objetoSocialAmbiental}
                onChange={() => toggleCheck('objetoSocialAmbiental')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Estatuto social contempla la elaboración de estudios ambientales</span>
            </label>

            <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider pt-2 text-emerald-800">
              2. Equipo Multidisciplinario y Evidencias
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.titulosSunedu}
                onChange={() => toggleCheck('titulosSunedu')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Títulos universitarios verificados en registro nacional de SUNEDU</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.habilitacionVigente}
                onChange={() => toggleCheck('habilitacionVigente')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Certificados de habilitación colegiada (CIP/CBP/CSP) vigentes al mes de trámite</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.anosExpAcreditados}
                onChange={() => toggleCheck('anosExpAcreditados')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Constancias de trabajo y contratos que acrediten años de experiencia específica</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.evidenciasNivelA}
                onChange={() => toggleCheck('evidenciasNivelA')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Resoluciones de aprobación de instrumentos SEIA donde conste la autoría técnica</span>
            </label>

            <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider pt-2 text-emerald-800">
              3. Declaraciones y Contratos
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.declaracionJuradaNoInhabilitacion}
                onChange={() => toggleCheck('declaracionJuradaNoInhabilitacion')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Declaraciones juradas suscritas de no inhabilitación para contratar con el Estado</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer p-2 bg-slate-50 rounded hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={checklist.contratosPreliminares}
                onChange={() => toggleCheck('contratosPreliminares')}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Cartas de compromiso o contratos de locación suscritos con cada especialista</span>
            </label>

          </div>
        </div>

      </div>

      <RncaProcedureModal
        isOpen={showProcedureModal}
        onClose={() => setShowProcedureModal(false)}
        initialSubsectorId={selectedSubsectorForReport}
        onSelectSubsector={(id) => setSelectedSubsectorForReport(id as SubsectorId)}
      />
    </div>
  );
};
