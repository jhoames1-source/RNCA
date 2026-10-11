import React from 'react';
import { X, CheckCircle2, AlertTriangle, Award, Scale } from 'lucide-react';
import { Professional, SubsectorId } from '../types/rnca';

interface ComparatorModalProps {
  candidates: Professional[];
  targetSubsector: SubsectorId;
  onClose: () => void;
  onRemoveCandidate: (id: string) => void;
}

export const ComparatorModal: React.FC<ComparatorModalProps> = ({
  candidates,
  targetSubsector,
  onClose,
  onRemoveCandidate
}) => {
  if (candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Matriz Comparativa de Profesionales RNCA
              </h2>
              <p className="text-xs text-slate-300">
                Comparación técnica de hasta 5 candidatos frente a los requerimientos del subsector: <strong>{targetSubsector.toUpperCase()}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1 text-xs sm:text-sm">
          <table className="w-full border-collapse border border-slate-200 text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="p-3 border border-slate-200 w-44 font-bold text-xs uppercase tracking-wider">
                  Criterio Técnico
                </th>
                {candidates.map((c) => (
                  <th key={c.id} className="p-3 border border-slate-200 min-w-[200px] align-top bg-slate-50">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{c.fullName}</div>
                        <div className="text-xs text-emerald-700 font-medium">{c.profession}</div>
                        <div className="text-[11px] text-slate-500">{c.university}</div>
                      </div>
                      <button
                        onClick={() => onRemoveCandidate(c.id)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                        title="Quitar de comparación"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {/* Score RNCA */}
              <tr className="bg-white">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Score de Compatibilidad
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-emerald-700">{c.scores.total}</span>
                      <span className="text-xs text-slate-400">/ 100 pts</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-1 bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Confianza: {c.confidenceLevel}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Formación y Grados */}
              <tr className="bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Formación y SUNEDU
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3 space-y-1">
                    {c.academicDegrees.map((d, i) => (
                      <div key={i} className="text-xs">
                        <span className="font-medium text-slate-800">{d.degree} en {d.career}</span>
                        <div className="text-[11px] text-slate-500">
                          {d.university} {d.suneduVerified ? '✓ SUNEDU' : '⚠ No verificado'}
                        </div>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Colegiatura y Habilitación */}
              <tr className="bg-white">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Colegiatura y Habilitación
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3">
                    <div className="text-xs font-semibold text-slate-800">{c.colegioProfesional}</div>
                    <div className="text-xs text-slate-600">{c.colegiaturaNumber || 'No registrada'}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      {c.habilitacionVerified ? (
                        <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Habilitado vigente
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-0.5 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> No acreditada
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Experiencia Ambiental */}
              <tr className="bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Experiencia Ambiental
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3">
                    <div className="text-sm font-bold text-slate-800">
                      {c.environmentalExperienceYears} años
                    </div>
                    <div className="text-xs text-slate-500">
                      Exp. total profesional: {c.yearsExperienceEstimated} años
                    </div>
                  </td>
                ))}
              </tr>

              {/* Experiencia Específica en Subsector */}
              <tr className="bg-white">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Experiencia en {targetSubsector.toUpperCase()}
                </td>
                {candidates.map((c) => {
                  const yearsInSector = c.subsectorExperienceYears[targetSubsector] || 0;
                  return (
                    <td key={c.id} className="p-3">
                      <div className="text-sm font-bold text-emerald-700">
                        {yearsInSector} años acreditados
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Instrumentos: {c.eiaTypesHandled.join(', ') || 'N/A'}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Nómina SENACE */}
              <tr className="bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Nómina Especialistas SENACE
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3">
                    {c.senaceSpecialist ? (
                      <div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 w-fit border border-blue-200">
                          <Award className="w-3.5 h-3.5" /> Registrado
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-1">
                          {c.senaceSpecialistResolution}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">No registrado</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Calidad de Evidencia */}
              <tr className="bg-white">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Evidencia Documental
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3">
                    <div className="space-y-1">
                      {c.evidences.map(e => (
                        <div key={e.id} className="text-xs border-l-2 border-emerald-500 pl-1.5">
                          <span className="font-semibold text-slate-800 block">{e.type}</span>
                          <span className="text-[11px] text-slate-500">{e.entity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Estado Legal y Brechas */}
              <tr className="bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/70">
                  Dictamen Preliminar
                </td>
                {candidates.map((c) => (
                  <td key={c.id} className="p-3">
                    {c.verificationStatus === 'suficientemente_acreditado' ? (
                      <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Apto Preliminar
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium text-xs flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Requiere verificación documental
                      </span>
                    )}
                    {c.fraudSuspect && (
                      <div className="text-[11px] text-rose-700 font-bold mt-1">
                        ⚠ Inconsistencia registrada
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>La decisión final de aceptación de perfiles corresponde exclusivamente a la autoridad evaluadora de SENACE.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition"
          >
            Cerrar Comparador
          </button>
        </div>

      </div>
    </div>
  );
};
