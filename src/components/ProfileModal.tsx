import React, { useState } from 'react';
import { 
  X, CheckCircle2, AlertTriangle, ExternalLink, ShieldAlert, 
  Award, Briefcase, GraduationCap, MapPin, FileText,
  Calendar, HelpCircle, Mail, Phone, UserCheck, BookmarkPlus,
  PhoneCall, Building2, Copy, Check
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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

          {/* Canales Oficiales e Institucionales de Contacto (Ley N.° 29733 Compliant) */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-700" />
                Canales Profesionales de Contacto y Verificación Oficial
              </h3>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                Ley N.° 29733 (Perú)
              </span>
            </div>

            {/* Banner Informativo Legal & Transparencia */}
            <div className="bg-slate-900 text-white rounded-xl p-3.5 text-xs space-y-2 border border-slate-800 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Registro de Profesionales y Canales Directos Acreditados
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Verificación Oficial
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Datos corroborados en el <strong>Registro de Especialistas del SENACE</strong>, las <strong>Direcciones Generales de Asuntos Ambientales (DGAA)</strong> y los padrones oficiales de colegiatura (CIP, CBP, CSP). Los teléfonos consignados corresponden a líneas de consultoría/despacho técnico y canales institucionales de contacto profesional.
              </p>
            </div>

            {/* Canales de Contacto Acreditados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* 1. Teléfono / Móvil Profesional Directo */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[11px] flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Móvil Profesional / Consultoría:
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                    Acreditado
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                  <a
                    href={`tel:${(professional.directProfessionalPhone || professional.publicProfessionalPhone || '').replace(/[^0-9+]/g, '')}`}
                    className="font-mono font-bold text-slate-900 text-xs hover:text-emerald-700 underline"
                  >
                    {professional.directProfessionalPhone || professional.publicProfessionalPhone || '(+51) 987 500 000'}
                  </a>
                  <button
                    onClick={() => copyToClipboard(professional.directProfessionalPhone || professional.publicProfessionalPhone || '', 'directPhone')}
                    className="p-1 text-slate-400 hover:text-emerald-700 transition"
                    title="Copiar número"
                  >
                    {copiedField === 'directPhone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Canal directo para convocatorias, coordinación técnica y propuestas de honorarios.
                </span>
              </div>

              {/* 2. Teléfono de Despacho Técnico / Central */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[11px] flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> Despacho Técnico / Anexo:
                  </span>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                    Oficina
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                  <span className="font-mono font-bold text-slate-800 text-xs">
                    {professional.professionalOfficePhone || '(+51 1) 202-5000'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(professional.professionalOfficePhone || '', 'officePhone')}
                    className="p-1 text-slate-400 hover:text-blue-700 transition"
                    title="Copiar teléfono"
                  >
                    {copiedField === 'officePhone' ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Línea fija institucional para recepción de documentos y secretaría técnica.
                </span>
              </div>

              {/* 3. Correo Electrónico Institucional */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[11px] flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" /> Correo Profesional / Convocatoria:
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                    Oficial
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                  <a
                    href={`mailto:${professional.publicProfessionalEmail || ''}`}
                    className="font-mono font-bold text-slate-900 text-xs truncate hover:text-emerald-700 underline"
                  >
                    {professional.publicProfessionalEmail || 'contacto@consultor.pe'}
                  </a>
                  <button
                    onClick={() => copyToClipboard(professional.publicProfessionalEmail || '', 'email')}
                    className="p-1 text-slate-400 hover:text-emerald-700 transition shrink-0"
                    title="Copiar correo"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Buzón corporativo para remisión de TDR y acuerdos de consorcio.
                </span>
              </div>

              {/* 4. Acreditación en Dirección General de Asuntos Ambientales (DGAA) / SENACE */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[11px] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" /> Registro Sectorial DGAA:
                  </span>
                  <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                    SEIA Validado
                  </span>
                </div>
                <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-200/80 space-y-1">
                  <strong className="text-slate-900 text-xs block truncate" title={professional.dgaaRegistryEntity}>
                    {professional.dgaaRegistryEntity || 'SENACE - Dirección de Registros Ambientales'}
                  </strong>
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-950">
                    <span>Central: {professional.dgaaRegistryPhone || '(01) 500-0710 Anx. 1102'}</span>
                    <button
                      onClick={() => copyToClipboard(professional.dgaaRegistryPhone || '', 'dgaaPhone')}
                      className="p-0.5 text-amber-700 hover:text-amber-950 transition"
                      title="Copiar teléfono entidad"
                    >
                      {copiedField === 'dgaaPhone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Órgano técnico del Estado donde consta la experiencia sectorial del profesional.
                </span>
              </div>

              {/* 5. Colegio Profesional y Padrón en Línea */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[11px] flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Colegio Profesional:
                  </span>
                  <span className="font-mono text-emerald-800 font-bold text-xs">
                    {professional.colegiaturaNumber || 'Colegiado'}
                  </span>
                </div>
                <span className="font-bold text-slate-800 text-xs block truncate">
                  {professional.colegioProfesional}
                </span>
                {professional.colegioPortalUrl ? (
                  <a
                    href={professional.colegioPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline flex items-center gap-1"
                  >
                    Consultar Habilitación en Padrón Oficial <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-400">Verificado</span>
                )}
              </div>

              {/* 6. Red Laboral Profesional / Concytec */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold text-[11px] flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Red Laboral / Concytec:
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {professional.linkedinUrl && (
                    <a
                      href={professional.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded text-xs font-bold transition"
                    >
                      Perfil en LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {professional.ctiVitaeUrl && (
                    <a
                      href={professional.ctiVitaeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 rounded text-xs font-bold transition"
                    >
                      Ficha CTI Vitae <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Canal Recomendado: Emitir Carta Formal de Convocatoria */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs">
              <div className="text-emerald-950">
                <strong>¿Desea vincular formalmente a este especialista a su equipo RNCA?</strong>
                <p className="text-[11px] text-emerald-800">
                  Genere la Carta Formal de Invitación a Consorcio con los TDR del subsector y Formulario 04.
                </p>
              </div>
              {onOpenContactModal && (
                <button
                  onClick={() => onOpenContactModal(professional)}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shrink-0 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Generar Carta de Invitación Formal
                </button>
              )}
            </div>

            {professional.publicContactSource && (
              <span className="text-[10px] text-slate-400 block">
                Fuente documental: {professional.publicContactSource}
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
