import React, { useState, useMemo } from 'react';
import { 
  Layers, CheckCircle2, AlertTriangle, AlertOctagon, 
  Sparkles, Download, UserPlus, Users, ArrowRight, Award
} from 'lucide-react';
import { SubsectorDefinition, SubsectorId, Professional, ConsultingFirmProfile } from '../types/rnca';
import { analyzeSubsectorGaps, calculateOptimalTeam } from '../utils/gapEngine';
import { exportComplianceMatrixToExcel } from '../utils/exportEngine';

interface GapAnalysisViewProps {
  subsectors: SubsectorDefinition[];
  selectedSubsectorId: SubsectorId;
  onSelectSubsector: (id: SubsectorId) => void;
  professionals: Professional[];
  firmProfile: ConsultingFirmProfile;
  onAssignToFirmTeam: (requirementId: string, professionalId: string) => void;
  onOpenProfile: (prof: Professional) => void;
  onNavigateFirm: () => void;
}

export const GapAnalysisView: React.FC<GapAnalysisViewProps> = ({
  subsectors,
  selectedSubsectorId,
  onSelectSubsector,
  professionals,
  firmProfile,
  onAssignToFirmTeam,
  onOpenProfile,
  onNavigateFirm
}) => {
  const currentSubsector = subsectors.find(s => s.id === selectedSubsectorId) || subsectors[0];

  // Analyze Gaps with current firm assignments
  const gapAnalysis = useMemo(() => {
    return analyzeSubsectorGaps(currentSubsector, professionals, firmProfile.assignedTeam);
  }, [currentSubsector, professionals, firmProfile.assignedTeam]);

  // Calculate Optimal Team combination (Section 21 of prompt)
  const optimalRecommendation = useMemo(() => {
    return calculateOptimalTeam(currentSubsector, professionals);
  }, [currentSubsector, professionals]);

  const handleExportMatrix = () => {
    exportComplianceMatrixToExcel(gapAnalysis, `matriz_cumplimiento_${currentSubsector.id}.xlsx`);
  };

  const handleApplyAllOptimalTeam = () => {
    optimalRecommendation.team.forEach(t => {
      onAssignToFirmTeam(t.requirement.id, t.selectedProfessional.id);
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Subsector Filter */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              Detector de Brechas Técnicas RNCA (Gap Analysis)
            </h2>
            <p className="text-xs text-slate-500">
              Verificación exhaustiva de roles faltantes y cálculo de la combinación óptima de profesionales para {currentSubsector.name}.
            </p>
          </div>
          <button
            onClick={handleExportMatrix}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" /> Exportar Matriz en Excel
          </button>
        </div>

        {/* Subsector pills */}
        <div className="flex flex-wrap gap-1.5">
          {subsectors.map(sub => (
            <button
              key={sub.id}
              onClick={() => onSelectSubsector(sub.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                sub.id === currentSubsector.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              [ {sub.name.toUpperCase()} ]
            </button>
          ))}
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Equipo Exigido</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {gapAnalysis.totalRequiredRoles} Especialistas
          </div>
          <span className="text-xs text-slate-400 block mt-0.5">D.S. 026-2021-MINAM</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Roles Asignados Aptos</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {gapAnalysis.coveredRolesCount} / {gapAnalysis.totalRequiredRoles}
          </div>
          <span className="text-xs text-emerald-600 font-medium block mt-0.5">
            {gapAnalysis.compliancePercentage}% de Cobertura
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Brechas Críticas (Vacantes)</span>
          <div className={`text-2xl font-black mt-1 ${gapAnalysis.vacantRolesCount > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
            {gapAnalysis.vacantRolesCount} Vacantes
          </div>
          <span className="text-xs text-slate-400 block mt-0.5">
            {gapAnalysis.vacantRolesCount > 0 ? 'Impiden inscripción formal' : 'Equipo completo'}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Estado del Expediente</span>
          <div className="mt-1">
            {gapAnalysis.isComplete ? (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold inline-block border border-emerald-300">
                🟢 CONFORME PREVIO
              </span>
            ) : (
              <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-bold inline-block border border-rose-300">
                🔴 INCOMPLETO ({gapAnalysis.vacantRolesCount} faltantes)
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 block mt-1">
            Consultora: {firmProfile.legalName}
          </span>
        </div>

      </div>

      {/* Optimal Team Recommendation Banner (Section 21 of prompt) */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-xl p-5 shadow-md border border-teal-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <h3 className="font-bold text-base sm:text-lg">
                Combinación Óptima Recomendada por el Motor de Sinergia
              </h3>
            </div>
            <p className="text-xs text-teal-100 mt-1 max-w-2xl">
              Algoritmo de optimización que selecciona la combinación mínima de profesionales disponibles con la mayor acreditación documental para cubrir los requisitos del subsector.
            </p>
          </div>

          <button
            onClick={handleApplyAllOptimalTeam}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" /> Aplicar Equipo Recomendado en Mi Consultora
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {optimalRecommendation.team.map((t, idx) => (
            <div key={idx} className="bg-slate-800/90 border border-teal-700/60 rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                    {t.requirement.role}
                  </span>
                  <div 
                    onClick={() => onOpenProfile(t.selectedProfessional)}
                    className="font-bold text-sm text-white hover:text-emerald-300 cursor-pointer transition mt-0.5"
                  >
                    {t.selectedProfessional.fullName}
                  </div>
                </div>
                <span className="text-xs font-black bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded">
                  {t.compatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {t.synergyReason}
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px] text-teal-200/80 border-t border-slate-700">
                <span>{t.selectedProfessional.profession}</span>
                <button
                  onClick={() => onAssignToFirmTeam(t.requirement.id, t.selectedProfessional.id)}
                  className="text-emerald-400 hover:text-emerald-200 font-semibold flex items-center gap-1"
                >
                  Asignar <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Gaps Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-700" />
          Matriz de Requisitos y Asignación de Roles
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-xs sm:text-sm text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="p-3 border border-slate-200 font-bold">#</th>
                <th className="p-3 border border-slate-200 font-bold min-w-[160px]">Rol Exigido</th>
                <th className="p-3 border border-slate-200 font-bold">Profesiones Válidas</th>
                <th className="p-3 border border-slate-200 font-bold min-w-[180px]">Profesional Asignado</th>
                <th className="p-3 border border-slate-200 font-bold">Estado</th>
                <th className="p-3 border border-slate-200 font-bold min-w-[200px]">Diagnóstico / Candidato Sugerido</th>
                <th className="p-3 border border-slate-200 font-bold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {gapAnalysis.gaps.map((g, idx) => {
                const assigned = g.assignedCandidate;

                return (
                  <tr key={g.requirement.id} className="hover:bg-slate-50/60">
                    <td className="p-3 border border-slate-200 font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="p-3 border border-slate-200 font-semibold text-slate-900">
                      {g.requirement.role}
                      <span className="block text-[11px] text-slate-500 font-normal mt-0.5">
                        Mín. {g.requirement.minYearsExperienceSpecific} años exp. sectorial
                      </span>
                    </td>
                    <td className="p-3 border border-slate-200 text-xs text-slate-600">
                      {g.requirement.requiredProfessions.join(', ')}
                    </td>
                    <td className="p-3 border border-slate-200">
                      {assigned ? (
                        <div>
                          <span 
                            onClick={() => onOpenProfile(assigned)}
                            className="font-bold text-slate-900 hover:text-emerald-700 cursor-pointer block"
                          >
                            {assigned.fullName}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {assigned.profession} ({assigned.scores.total}%)
                          </span>
                        </div>
                      ) : (
                        <span className="text-rose-600 font-bold text-xs italic">
                          SIN ASIGNACIÓN
                        </span>
                      )}
                    </td>
                    <td className="p-3 border border-slate-200">
                      {g.status === 'CUBIERTO_TOTAL' && (
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Cubierto
                        </span>
                      )}
                      {g.status === 'CUBIERTO_PARCIAL' && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3.5 h-3.5" /> Parcial
                        </span>
                      )}
                      {g.status === 'VACANTE' && (
                        <span className="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit">
                          <AlertOctagon className="w-3.5 h-3.5" /> Brecha
                        </span>
                      )}
                      {g.status === 'REQUIERE_VERIFICACION' && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3.5 h-3.5" /> En Revisión
                        </span>
                      )}
                    </td>
                    <td className="p-3 border border-slate-200 text-xs text-slate-600">
                      {g.notes}
                    </td>
                    <td className="p-3 border border-slate-200 text-right">
                      {g.bestCandidates.length > 0 && (
                        <button
                          onClick={() => onAssignToFirmTeam(g.requirement.id, g.bestCandidates[0].professional.id)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition whitespace-nowrap cursor-pointer"
                        >
                          Asignar Top
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
