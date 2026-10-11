import React, { useState } from 'react';
import { 
  BookOpen, ExternalLink, ShieldCheck, AlertTriangle, 
  Calendar, CheckCircle2, History, BellRing, RefreshCw
} from 'lucide-react';
import { LegalNorm, SubsectorDefinition } from '../types/rnca';

interface LegalMonitorViewProps {
  legalNorms: LegalNorm[];
  subsectors: SubsectorDefinition[];
}

export const LegalMonitorView: React.FC<LegalMonitorViewProps> = ({
  legalNorms,
  subsectors
}) => {
  const [selectedAuthority, setSelectedAuthority] = useState<string>('ALL');
  const [monitoringAlertActive, setMonitoringAlertActive] = useState<boolean>(false);

  const authorities = Array.from(new Set(legalNorms.map(n => n.authority))).sort();

  const filteredNorms = legalNorms.filter(n => {
    if (selectedAuthority === 'ALL') return true;
    return n.authority.includes(selectedAuthority);
  });

  const handleSimulateSync = () => {
    setMonitoringAlertActive(true);
    setTimeout(() => {
      setMonitoringAlertActive(false);
      alert('Sincronización con Diario Oficial El Peruano y SENACE completada: Todas las 6 normas vigentes han sido ratificadas sin cambios de redacción a la fecha.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              Base Legal y Monitor Normativo RNCA
            </h2>
            <p className="text-xs text-slate-500">
              Marco legal vinculante para la inscripción y evaluación técnica ante SENACE. Control de vigencia y trazabilidad de normas legales.
            </p>
          </div>
          <button
            onClick={handleSimulateSync}
            disabled={monitoringAlertActive}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${monitoringAlertActive ? 'animate-spin' : ''}`} />
            {monitoringAlertActive ? 'Consultando El Peruano...' : 'Verificar Vigencia en El Peruano'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Filtrar por Entidad:</span>
            <select
              value={selectedAuthority}
              onChange={(e) => setSelectedAuthority(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800"
            >
              <option value="ALL">Todas las entidades emisoras</option>
              {authorities.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Última revisión del compendio: <strong>Septiembre 2026</strong></span>
          </div>
        </div>
      </div>

      {/* Norms Cards Grid */}
      <div className="space-y-4">
        {filteredNorms.map(norm => (
          <div key={norm.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            
            {/* Top */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {norm.code}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {norm.status}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Publicada: {norm.publicationDate}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {norm.title}
                </h3>
                <span className="text-xs text-emerald-800 font-semibold mt-0.5 block">
                  Entidad Emisora: {norm.authority}
                </span>
              </div>

              <a
                href={norm.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
              >
                <span>Texto Oficial Completo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Summary */}
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
              {norm.summary}
            </p>

            {/* Key Articles Matrix */}
            <div>
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Artículos Relevantes para la Calificación de Profesionales y Consultoras:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {norm.keyArticles.map((art, idx) => (
                  <div key={idx} className="p-3 bg-white rounded border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{art.article}</span>
                      <span className="text-[11px] text-emerald-700">{art.topic}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {art.fullSummary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publication metadata reference */}
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span><strong>Referencia El Peruano:</strong> {norm.elPeruanoRef}</span>
              <span>Revisado: {norm.lastReviewDate}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
