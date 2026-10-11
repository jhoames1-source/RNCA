import React, { useState } from 'react';
import { 
  X, CheckCircle2, AlertTriangle, ExternalLink, ShieldAlert, 
  Award, Briefcase, GraduationCap, MapPin, FileText,
  Calendar, HelpCircle, Mail, Phone, UserCheck, BookmarkPlus
} from 'lucide-react';
import { Professional, SubsectorDefinition } from '../types/rnca';

interface ProfileModalProps {
  professional: Professional | null;
  subsectors: SubsectorDefinition[];
  onClose: () => void;
  onAddToAgenda?: (prof: Professional) => void;
  onOpenContactModal?: (prof: Professional) => void;
  onOpenFormulario4?: (prof: Professional) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  professional,
  subsectors,
  onClose,
  onAddToAgenda,
  onOpenContactModal,
  onOpenFormulario4
}) => {
  const [showExplicability, setShowExplicability] = useState(false);

  if (!professional) return null;

  const getStatusBadge = () => {
    switch (professional.verificationStatus) {
      case 'suficientemente_acreditado':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-300">🟢 Suficientemente Acreditado</span>;
      case 'parcialmente_acreditado':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-amber-300">🟡 Parcialmente Acreditado</span>;
      case 'potencialmente_compatible':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-blue-300">🔵 Potencialmente Compatible</span>;
      case 'requiere_verificacion':
        return <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-orange-300">🟠 Requiere Verificación Documental</span>;
      default:
        return <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-rose-300">🔴 No Acreditado / En Observación</span>;
    }
  };

  const getEvidenceLevelBadge = (level: string) => {
    switch (level) {
      case 'NIVEL_A':
        return <span className="bg-teal-50 text-teal-700 border border-teal-200 text-xs px-2 py-0.5 rounded font-bold">NIVEL A: Fuente Oficial del Estado</span>;
      case 'NIVEL_B':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2 py-0.5 rounded font-medium">NIVEL B: Colegio Profesional / Univ.</span>;
      case 'NIVEL_C':
        return <span className="bg-slate-100 text-slate-700 border border-slate-300 text-xs px-2 py-0.5 rounded font-medium">NIVEL C: Consultora / Empresa</span>;
      default:
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5 rounded font-medium">NIVEL D: Fuente Complementaria</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                ID: {professional.id}
              </span>
              {getStatusBadge()}
              {professional.senaceSpecialist && (
                <span className="bg-blue-900/80 text-blue-200 border border-blue-700 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-blue-300" />
                  Nómina Especialistas SENACE
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {professional.fullName}
            </h2>
            <p className="text-emerald-400 font-medium text-sm sm:text-base mt-0.5">
              {professional.profession} — <span className="text-slate-300">{professional.specialty}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Alerts for Homonym or Fraud */}
        {professional.isHomonymSuspect && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 sm:px-6 flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>ALERTA DE HOMONIMIA:</strong> {professional.homonymNotes}
            </div>
          </div>
        )}

        {professional.fraudSuspect && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 sm:px-6 flex items-start gap-3 text-rose-900 text-xs sm:text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>INCONSISTENCIA DOCUMENTAL DETECTADA:</strong> {professional.fraudNotes}
            </div>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <span className="text-xs text-slate-500 font-medium block">Puntaje Score RNCA</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-emerald-700">{professional.scores.total}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium mt-1 block">
                Nivel Confianza: {professional.confidenceLevel}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <span className="text-xs text-slate-500 font-medium block">Exp. Ambiental Estimada</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-slate-800">{professional.environmentalExperienceYears}</span>
                <span className="text-xs text-slate-500">años</span>
              </div>
              <span className="text-xs text-slate-500 block mt-1">
                Total profesional: {professional.yearsExperienceEstimated} años
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <span className="text-xs text-slate-500 font-medium block">Colegiatura y Habilitación</span>
              <div className="mt-1 space-y-0.5">
                <div className="text-xs font-semibold text-slate-700">
                  {professional.colegioProfesional}
                </div>
                <div className="text-xs text-slate-600">
                  {professional.colegiaturaNumber || 'Sin registro público'}
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  {professional.habilitacionVerified ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Habilitado al día
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium flex items-center gap-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Requiere comprobación
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <span className="text-xs text-slate-500 font-medium block">Ubicación Profesional</span>
              <div className="flex items-center gap-1.5 mt-1 text-slate-800 font-semibold text-sm">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                {professional.city}, {professional.department}
              </div>
              <span className="text-xs text-slate-500 mt-1 block">
                Universidad: {professional.university}
              </span>
            </div>
          </div>

          {/* Score breakdown toggle / breakdown view */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                Desglose del Algoritmo de Scoring (0 - 100 Puntos)
              </span>
              <button 
                onClick={() => setShowExplicability(!showExplicability)}
                className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showExplicability ? 'Ocultar explicabilidad' : '¿Por qué aparece este candidato?'}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="bg-white p-2 rounded border border-emerald-100">
                <span className="text-slate-500 block">Formación Académica</span>
                <span className="font-bold text-slate-800">{professional.scores.academic} / 25 pts</span>
              </div>
              <div className="bg-white p-2 rounded border border-emerald-100">
                <span className="text-slate-500 block">Exp. Profesional</span>
                <span className="font-bold text-slate-800">{professional.scores.professionalExp} / 30 pts</span>
              </div>
              <div className="bg-white p-2 rounded border border-emerald-100">
                <span className="text-slate-500 block">Exp. Ambiental</span>
                <span className="font-bold text-slate-800">{professional.scores.environmentalExp} / 20 pts</span>
              </div>
              <div className="bg-white p-2 rounded border border-emerald-100">
                <span className="text-slate-500 block">Exp. Específica Subsector</span>
                <span className="font-bold text-slate-800">{professional.scores.sectorSpecificExp} / 15 pts</span>
              </div>
              <div className="bg-white p-2 rounded border border-emerald-100">
                <span className="text-slate-500 block">Evidencia Oficial</span>
                <span className="font-bold text-slate-800">{professional.scores.officialEvidence} / 10 pts</span>
              </div>
            </div>

            {showExplicability && (
              <div className="mt-3 p-3 bg-white rounded border border-emerald-200 text-xs text-slate-700 space-y-1.5 animate-in fade-in">
                <div className="font-bold text-slate-900">Principio de Explicabilidad Técnica RNCA:</div>
                <p>
                  • <strong>Requisito que busca cubrir:</strong> Candidato indexado para subsectores ({professional.subsectorsCompatible.join(', ')}).
                </p>
                <p>
                  • <strong>Sustento del Score:</strong> Cuenta con {professional.environmentalExperienceYears} años de experiencia ambiental comprobable en instrumentos ({professional.eiaTypesHandled.join(', ')}).
                </p>
                <p>
                  • <strong>Limitaciones:</strong> {professional.verificationStatus === 'suficientemente_acreditado' 
                    ? 'Cumple con evidencias públicas contrastadas de Nivel A. Aún requiere validación documental formal ante mesa de partes de SENACE.'
                    : 'Requiere aportar constancias fehacientes de trabajo o resolución que acredite titularidad en el estudio.'}
                </p>
              </div>
            )}
          </div>

          {/* Formación Académica */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              Formación Académica y Grados
            </h3>
            <div className="space-y-2">
              {professional.academicDegrees.map((deg, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">{deg.degree} en {deg.career}</span>
                    <span className="text-xs text-slate-600">{deg.university} {deg.year ? `(${deg.year})` : ''}</span>
                  </div>
                  <div>
                    {deg.suneduVerified ? (
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> SUNEDU Verificado
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5" /> En Cotejo SUNEDU
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experiencia y Proyectos Acreditados */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              Experiencia en Instrumentos Ambientales (SEIA)
            </h3>
            {professional.experiences.length > 0 ? (
              <div className="space-y-2">
                {professional.experiences.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-slate-900">{exp.role}</span>
                        <div className="text-xs text-slate-600 mt-0.5">
                          <strong>Proyecto:</strong> {exp.project} | <strong>Titular/Cliente:</strong> {exp.clientOrEntity}
                        </div>
                      </div>
                      <span className="text-xs font-mono bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold shrink-0">
                        {exp.eiaType}
                      </span>
                    </div>
                    <div className="mt-2 text-xs flex flex-wrap items-center gap-3 text-slate-500 border-t border-slate-200/60 pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period} ({exp.yearsCount} años)
                      </span>
                      <span><strong>Fuente:</strong> {exp.evidenceSource}</span>
                      {exp.evidenceUrl && (
                        <a 
                          href={exp.evidenceUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-emerald-700 hover:underline flex items-center gap-0.5"
                        >
                          Ver expediente <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded border border-slate-200">
                No se registraron proyectos con suscripción formal en fuente pública abierta. Requiere presentación de CV documentado.
              </p>
            )}
          </div>

          {/* Sistema de Evidencias (Section 12 of prompt) */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Evidencias Documentales y Trazabilidad de Fuentes
            </h3>
            <div className="space-y-2">
              {professional.evidences.map((ev) => (
                <div key={ev.id} className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    {getEvidenceLevelBadge(ev.level)}
                    <span className="text-xs font-mono text-slate-400">Hash: {ev.documentHash}</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-sm mt-1">
                    {ev.title}
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong>Entidad Emisora:</strong> {ev.entity} | <strong>Tipo:</strong> {ev.type}
                  </div>
                  <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded mt-1 border border-slate-100">
                    {ev.description}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                    <span>Fecha consulta: {ev.dateChecked}</span>
                    <a 
                      href={ev.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-emerald-700 font-medium hover:underline flex items-center gap-1"
                    >
                      Fuente verificable <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto Profesional Público (Ley 29733 Compliant) */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <h3 className="font-semibold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-slate-700" />
              Canales Profesionales de Contacto (Ley N.° 29733 de Protección de Datos)
            </h3>
            <p className="text-xs text-slate-500 mb-2">
              Únicamente se difunden direcciones institucionales y números de sede corporativa que hayan sido publicados voluntariamente para fines profesionales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">
                  {professional.publicProfessionalEmail || 'No publicado en fuente abierta'}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">
                  {professional.publicProfessionalPhone || 'No publicado en fuente abierta'}
                </span>
              </div>
            </div>
            {professional.publicContactSource && (
              <span className="text-[11px] text-slate-400 mt-1 block">
                Fuente del contacto: {professional.publicContactSource}
              </span>
            )}
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Última verificación en fuentes oficiales: <strong>{professional.last_verified_at}</strong>
          </div>
          <div className="flex items-center gap-2">
            {onOpenFormulario4 && (
              <button
                onClick={() => onOpenFormulario4(professional)}
                className="px-3.5 py-2 bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                Formulario 4 SENACE
              </button>
            )}
            {onOpenContactModal && (
              <button
                onClick={() => onOpenContactModal(professional)}
                className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-medium text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-slate-600" />
                Solicitar Contacto Formal
              </button>
            )}
            {onAddToAgenda && (
              <button
                onClick={() => onAddToAgenda(professional)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <BookmarkPlus className="w-4 h-4" />
                Incorporar a Agenda RNCA
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
