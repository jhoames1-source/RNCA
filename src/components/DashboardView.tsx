import React from 'react';
import { 
  Building2, Users, CheckCircle2, AlertOctagon, 
  FileText, ShieldCheck, Scale, ArrowRight, BookOpen, Layers
} from 'lucide-react';
import { Professional, SubsectorDefinition, LegalNorm, AgendaEntry, SubsectorId } from '../types/rnca';

interface DashboardViewProps {
  subsectors: SubsectorDefinition[];
  professionals: Professional[];
  legalNorms: LegalNorm[];
  agenda: AgendaEntry[];
  selectedSubsector: SubsectorId;
  onSelectSubsector: (id: SubsectorId) => void;
  onNavigateTab: (tab: string) => void;
  onOpenProfile: (prof: Professional) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  subsectors,
  professionals,
  legalNorms,
  agenda,
  selectedSubsector,
  onSelectSubsector,
  onNavigateTab,
  onOpenProfile
}) => {
  const verifiedCount = professionals.filter(p => p.verificationStatus === 'suficientemente_acreditado').length;
  const potentialCount = professionals.filter(p => p.verificationStatus === 'potencialmente_compatible' || p.verificationStatus === 'parcialmente_acreditado').length;
  const senaceNominaCount = professionals.filter(p => p.senaceSpecialist).length;
  const inPipelineCount = agenda.length;
  const homonymsCount = professionals.filter(p => p.isHomonymSuspect).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700/50">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Sistema Especializado SENACE — SEIA Perú
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            RNCA Professional Finder
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Plataforma integral de búsqueda, auditoría de evidencias públicas y conformación técnica del equipo profesional multidisciplinario exigido para la inscripción y ampliación en el Registro Nacional de Consultoras Ambientales (RNCA).
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('requirements')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              Explorar Requisitos por Subsector
            </button>
            <button
              onClick={() => onNavigateTab('search')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-medium text-xs flex items-center gap-2 border border-slate-600 transition cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Búsqueda Inteligente de Candidatos
            </button>
            <button
              onClick={() => onNavigateTab('gap-analysis')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-medium text-xs flex items-center gap-2 border border-slate-600 transition cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              Detector de Brechas y Equipo Óptimo
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards (Section 69 of prompt) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Subsectores SEIA</span>
            <Building2 className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{subsectors.length}</div>
          <p className="text-xs text-slate-500 mt-1">
            Minería, Electricidad, Hidrocarburos, Transportes, etc.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Profesionales en Base</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{professionals.length}</div>
          <p className="text-xs text-slate-500 mt-1">
            {senaceNominaCount} registrados en Nómina SENACE
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Verificados Nivel A</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{verifiedCount}</div>
          <p className="text-xs text-slate-500 mt-1">
            {potentialCount} con cumplimiento parcial / potencial
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Agenda en Pipeline</span>
            <AlertOctagon className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{inPipelineCount}</div>
          <p className="text-xs text-slate-500 mt-1">
            {homonymsCount > 0 ? `${homonymsCount} homónimos aislados` : 'Auditoría continua'}
          </p>
        </div>

      </div>

      {/* Subsectores Navigation Grid (Section 18 of prompt) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              Módulos de Subsectores Productivos (SENACE / Sectoriales)
            </h2>
            <p className="text-xs text-slate-500">
              Seleccione un subsector para cargar automáticamente su marco normativo, conformación de equipo mínimo y candidatos compatibles.
            </p>
          </div>
          <button 
            onClick={() => onNavigateTab('requirements')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Ver matriz completa <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {subsectors.map(sub => {
            const isSelected = sub.id === selectedSubsector;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  onSelectSubsector(sub.id);
                  onNavigateTab('requirements');
                }}
                className={`p-3 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between h-24 ${
                  isSelected 
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{sub.code}</span>
                    {sub.authoritySenace && (
                      <span className="text-[9px] bg-teal-100 text-teal-800 font-semibold px-1 rounded">
                        SENACE
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">
                    {sub.name}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/50">
                  <span>Mínimo: {sub.minimumTeamCount} prof.</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Recent Candidates & Legal Monitor Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Highlighted Professionals */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                Profesionales con Mayor Acreditación Documental
              </h3>
              <p className="text-xs text-slate-500">
                Candidatos indexados con evidencia oficial Nivel A (Resoluciones SENACE / Títulos SUNEDU).
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('search')}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              Explorar todos ({professionals.length})
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {professionals.slice(0, 5).map(prof => (
              <div 
                key={prof.id} 
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-lg transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm hover:text-emerald-700 cursor-pointer" onClick={() => onOpenProfile(prof)}>
                      {prof.fullName}
                    </span>
                    {prof.senaceSpecialist && (
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                        SENACE
                      </span>
                    )}
                    {prof.isHomonymSuspect && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-bold">
                        Homónimo
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <span className="font-medium text-emerald-800">{prof.profession}</span> • {prof.university} • {prof.environmentalExperienceYears} años exp. ambiental
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-700">{prof.scores.total}%</div>
                    <div className="text-[10px] text-slate-400">Score RNCA</div>
                  </div>
                  <button
                    onClick={() => onOpenProfile(prof)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded text-xs font-semibold transition cursor-pointer border border-slate-200"
                  >
                    Ver Ficha
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Legal Monitor & Quick Audit */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Base Legal RNCA Vigente
              </h3>
              <button 
                onClick={() => onNavigateTab('legal')}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              {legalNorms.slice(0, 4).map(norm => (
                <div key={norm.id} className="p-2.5 bg-slate-50 rounded border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{norm.code}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">
                      {norm.status}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px] line-clamp-1 mt-0.5">
                    {norm.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-900 text-white rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <h3 className="font-bold text-sm">Control de Calidad Normativa</h3>
            </div>
            <p className="text-xs text-teal-100 leading-relaxed">
              Doble motor de auditoría activo: previene falsos positivos, homónimos cruzados y citas normativas desfasadas.
            </p>
            <button
              onClick={() => onNavigateTab('audit')}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-teal-950 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-4 h-4" /> Ejecutar Auditoría Completa
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
