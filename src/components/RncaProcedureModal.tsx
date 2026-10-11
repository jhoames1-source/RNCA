import React, { useState } from 'react';
import { 
  X, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, 
  Building2, UserCheck, FileText, CreditCard, Clock, Layers, HelpCircle
} from 'lucide-react';
import { SUBSECTORS_DATA } from '../data/subsectorsData';
import { SUBSECTOR_NORMATIVE_REGISTRY } from '../data/senaceRecommendations';

interface RncaProcedureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubsectorId?: string;
  onSelectSubsector?: (subsectorId: string) => void;
}

export const RncaProcedureModal: React.FC<RncaProcedureModalProps> = ({
  isOpen,
  onClose,
  initialSubsectorId,
  onSelectSubsector
}) => {
  const [activeModalidad, setActiveModalidad] = useState<'JURIDICA' | 'NATURAL'>('JURIDICA');
  const [selectedSubsectorPreview, setSelectedSubsectorPreview] = useState<string>(initialSubsectorId || 'mineria');

  if (!isOpen) return null;

  const currentSub = SUBSECTORS_DATA.find(s => s.id === selectedSubsectorPreview) || SUBSECTORS_DATA[0];
  const currentNorm = SUBSECTOR_NORMATIVE_REGISTRY[currentSub.id] || SUBSECTOR_NORMATIVE_REGISTRY.mineria;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-linear-to-r from-emerald-900 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-emerald-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-400 text-slate-950 text-[10px] font-black rounded tracking-wide">
                  PROCEDIMIENTO OFICIAL GOB.PE/10768
                </span>
                <span className="text-emerald-300 text-xs font-mono font-semibold">
                  TUPA SENACE • APROBACIÓN AUTOMÁTICA
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                Inscripción en el Registro Nacional de Consultoras Ambientales (RNCA)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Gob.pe Reference Link Banner */}
        <div className="px-6 py-3 bg-emerald-950/30 border-b border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-800">
            <span className="font-bold">Portal del Estado Peruano (Gob.pe):</span>
            <span className="font-mono text-emerald-900 font-semibold truncate max-w-md">
              https://www.gob.pe/10768-inscribirte-en-el-registro-nacional-de-consultoras-ambientales-rnca
            </span>
          </div>
          <a
            href="https://www.gob.pe/10768-inscribirte-en-el-registro-nacional-de-consultoras-ambientales-rnca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md font-bold text-xs shrink-0 transition"
          >
            Ver Portal Oficial <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Modal Navigation: Modalidad Personas Jurídicas vs Personas Naturales */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex rounded-lg bg-slate-200 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveModalidad('JURIDICA')}
              className={`px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-2 ${
                activeModalidad === 'JURIDICA'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-700" />
              Personas Jurídicas (Empresas Consultoras)
            </button>
            <button
              onClick={() => setActiveModalidad('NATURAL')}
              className={`px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-2 ${
                activeModalidad === 'NATURAL'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              Personas Naturales (Consultores Individuales)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Plazo: <strong>2 días hábiles</strong> | Vigencia: <strong>Indeterminada</strong></span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeModalidad === 'JURIDICA' ? (
            <div className="space-y-6">
              
              {/* Highlight Box: Regla de los 6 Especialistas */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-xs text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  REQUISITO LEGAL DETERMINANTE: MÍNIMO SEIS (6) ESPECIALISTAS POR SUBSECTOR
                </div>
                <p className="leading-relaxed">
                  Conforme al procedimiento oficial <strong>gob.pe/10768</strong> del SENACE, para la inscripción de personas jurídicas en el RNCA 
                  <strong> NO son 5 profesionales</strong>: es exigencia legal contar con un 
                  <strong> equipo profesional multidisciplinario de al menos seis (6) especialistas de distintas carreras por cada subsector</strong> 
                  en el que se solicite la inscripción.
                </p>
                <div className="p-2.5 bg-white/80 rounded-lg border border-amber-200 text-[11px] leading-relaxed">
                  <strong>Regla de Reutilización de Carreras Transversales:</strong> 
                  <em> &ldquo;Es posible acreditar la conformación mínima de cada equipo con los mismos especialistas que posean carreras transversales si se solicita la inscripción en más de un subsector.&rdquo;</em>
                </div>
              </div>

              {/* Step-by-Step Requirements List for Persona Jurídica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 1: Objeto Social */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">1</span>
                    Objeto Social en Estatuto (SUNARP)
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    La empresa debe tener consignado expresamente en su objeto social la <strong>elaboración de estudios ambientales en el marco del SEIA</strong> o la <strong>prestación de servicios de consultoría ambiental o social</strong> en dicho marco.
                  </p>
                </div>

                {/* Card 2: Formulario 03 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">2</span>
                    Solicitud Oficial: Formulario 03
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Presentación del <strong>Formulario 03</strong> (Solicitud de Inscripción o Modificación de Inscripción en el RNCA para personas jurídicas) debidamente llenado y firmado por el Representante Legal con facultades vigentes.
                  </p>
                </div>

                {/* Card 3: Formulario 04 x 6 Especialistas */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">3</span>
                    Formulario 04 y Experiencia Mínima
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Presentación del <strong>Formulario 04 (CV Oficial)</strong> por cada uno de los 6 especialistas. Cada uno debe acreditar mínimo <strong>cinco (05) años de experiencia comprobable sin traslapes</strong> (en el subsector para carrera vinculada, o en el SEIA para carreras transversales).
                  </p>
                </div>

                {/* Card 4: Tasa TUPA y Validación */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-black">4</span>
                    Derecho de Tramitación y Correo TUPA
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Abono de <strong>S/ 240.90</strong> (Inscripción) o <strong>S/ 197.20</strong> (Modificación/ampliación de subsectores) en Banco de la Nación. 
                    Enviar comprobante a <strong className="text-emerald-800">transferenciastupa@senace.gob.pe</strong> indicando RUC, razón social, código TUPA, actividad y constancia.
                  </p>
                </div>

              </div>

              {/* Subsector Breakdown Explorer: 6 Positions per Subsector */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-700" />
                      Conformación de los 6 Especialistas por Subsector (Resoluciones Oficiales)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Seleccione cualquier subsector para verificar sus 6 posiciones técnicas obligatorias aprobadas por el SENACE.
                    </p>
                  </div>

                  <select
                    value={selectedSubsectorPreview}
                    onChange={(e) => setSelectedSubsectorPreview(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 cursor-pointer shadow-2xs"
                  >
                    {SUBSECTORS_DATA.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>

                {/* Selected Subsector Badge and Resolution */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded">
                        {currentNorm.resolutionCode}
                      </span>
                      <span className="font-bold text-emerald-300 text-sm">
                        {currentSub.name} — 6 Especialistas Obligatorios
                      </span>
                    </div>
                    {onSelectSubsector && (
                      <button
                        onClick={() => {
                          onSelectSubsector(currentSub.id);
                          onClose();
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition cursor-pointer"
                      >
                        Auditar este Subsector
                      </button>
                    )}
                  </div>

                  {/* The 6 Positions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
                    {currentSub.requirements.map((req, idx) => (
                      <div key={req.id} className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px] line-clamp-1">
                            {req.role}
                          </span>
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            req.careerCategory === 'VINCULADA_SECTOR'
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                              : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                          }`}>
                            {req.careerCategory === 'VINCULADA_SECTOR' ? 'VINCULADA' : 'TRANSVERSAL'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2">
                          {req.description}
                        </p>
                        <div className="text-[10px] text-emerald-400 font-mono font-medium">
                          Admite: {req.requiredProfessions.slice(0, 3).join(', ')}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Tab Content: Persona Natural */
            <div className="space-y-6 text-xs">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sky-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                  <UserCheck className="w-5 h-5 text-sky-700 shrink-0" />
                  Inscripción como Persona Natural (Consultor Individual)
                </div>
                <p className="leading-relaxed">
                  Las personas naturales pueden inscribirse directamente en el RNCA para prestar servicios individuales de consultoría ambiental en estudios del SEIA. No requieren conformar un equipo de 6 especialistas, sino acreditar su propio perfil profesional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Formulario 02
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Solicitud de inscripción en el RNCA para personas naturales, indicando profesión, datos de colegiatura y subsectores de especialidad.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Formulario 04 y Sustento
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Currículum vitae completado y firmado conforme al <strong>Formulario 04</strong>, adjuntando constancias, contratos y resoluciones que acrediten mínimo 5 años sin traslape.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    Derecho de Trámite
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Pago de <strong>S/ 169.90</strong> en el Banco de la Nación, remitido con comprobante de pago a <strong className="text-emerald-800">transferenciastupa@senace.gob.pe</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Mesa de Partes Digital SENACE • Procedimiento TUPA N.° 10768</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition cursor-pointer"
          >
            Entendido, cerrar guía
          </button>
        </div>
      </div>
    </div>
  );
};
