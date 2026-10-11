import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Scale, 
  FileCheck, RefreshCw, Lock, Eye, Download
} from 'lucide-react';
import { Professional, LegalNorm, AuditReportResult, UserRole } from '../types/rnca';
import { runComprehensiveRncaAudit } from '../utils/auditEngine';

interface AuditViewProps {
  professionals: Professional[];
  legalNorms: LegalNorm[];
  currentUserRole: UserRole;
}

export const AuditView: React.FC<AuditViewProps> = ({
  professionals,
  legalNorms,
  currentUserRole
}) => {
  const [auditReport, setAuditReport] = useState<AuditReportResult>(() => 
    runComprehensiveRncaAudit(professionals, legalNorms)
  );
  const [isRunning, setIsRunning] = useState(false);

  const handleRunAudit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setAuditReport(runComprehensiveRncaAudit(professionals, legalNorms));
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" />
              Módulo Auditor: Auditoría Doble y Control Anti-Alucinaciones
            </h2>
            <p className="text-xs text-slate-500">
              Evaluación rigurosa de las 14 preguntas obligatorias de verificación, prevención de datos falsos y cumplimiento de la Ley 29733.
            </p>
          </div>

          <button
            onClick={handleRunAudit}
            disabled={isRunning}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Auditoría en Progreso...' : 'Auditar Resultado (Re-evaluación Completa)'}
          </button>
        </div>

        {/* Audit Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Total de Comprobaciones</span>
            <span className="text-xl font-black text-slate-900">{auditReport.totalChecks} Criterios</span>
          </div>

          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <span className="text-emerald-700 block font-semibold">Criterios Conformes</span>
            <span className="text-xl font-black text-emerald-800">{auditReport.passedChecks} Aprobados</span>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <span className="text-amber-700 block font-semibold">Advertencias / Avisos</span>
            <span className="text-xl font-black text-amber-800">{auditReport.warningChecks} Observaciones</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Rol del Operador</span>
            <span className="text-sm font-bold text-slate-800 uppercase">{currentUserRole}</span>
          </div>
        </div>

        {/* Conclusion Banner */}
        <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
          auditReport.failedChecks === 0 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
            : 'bg-rose-50 border-rose-300 text-rose-950'
        }`}>
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-sm block mb-0.5">Dictamen de Auditoría del Sistema:</strong>
            <p className="leading-relaxed">{auditReport.conclusion}</p>
            <span className="text-[10px] text-slate-500 block mt-1">
              Marca de tiempo auditada: {new Date(auditReport.timestamp).toLocaleString('es-PE')}
            </span>
          </div>
        </div>
      </div>

      {/* 14 Check Items Detail (Section 60 & 61 of prompt) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-700" />
          Resultado del Cuestionario Obligatorio de Verificación
        </h3>

        <div className="divide-y divide-slate-100">
          {auditReport.checks.map((chk, index) => (
            <div key={chk.id} className="py-3.5 space-y-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {chk.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {chk.question}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  chk.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {chk.passed ? 'CONFORME' : 'NO CONFORME'}
                </span>
              </div>

              <div className="text-xs text-slate-600 pl-6">
                {chk.details}
              </div>

              {chk.recommendation && (
                <div className="text-[11px] text-slate-500 pl-6 italic">
                  Recomendación técnica: {chk.recommendation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Privacy and Security Policy Note (Ley 29733) */}
      <div className="bg-slate-900 text-slate-200 rounded-xl p-5 shadow-2xs space-y-3 text-xs leading-relaxed border border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Lock className="w-4 h-4 text-emerald-400" />
          Protocolo de Privacidad y Protección de Datos Personales (Ley N.° 29733 - Perú)
        </div>
        <p>
          En estricto cumplimiento del principio de proporcionalidad y finalidad contemplado en la Ley 29733 y su Reglamento (D.S. 003-2013-JUS):
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>Se prohíbe taxativamente la indexación masiva de domicilios particulares, celulares privados, fotografías no consentidas o datos del ámbito familiar.</li>
          <li>El DNI únicamente es admisible mediante cotejo en registros públicos legítimos y nunca para difusión indiscriminada.</li>
          <li>La información de contacto se limita a canales institucionales o sedes corporativas publicadas por las consultoras o colegios profesionales.</li>
          <li>Cualquier profesional puede solicitar la rectificación o exclusión de sus datos mediante solicitud a la consultora evaluadora.</li>
        </ul>
      </div>

    </div>
  );
};
