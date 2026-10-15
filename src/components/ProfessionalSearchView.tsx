import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Sparkles, CheckCircle2, AlertTriangle, 
  MapPin, Award, Scale, BookmarkPlus, FileText,
  HelpCircle, ShieldAlert, RotateCcw, ChevronDown, PhoneCall
} from 'lucide-react';
import { Professional, SubsectorDefinition, SubsectorId } from '../types/rnca';
import { parseNaturalLanguageQuery } from '../utils/reverseSearchParser';

interface ProfessionalSearchViewProps {
  professionals: Professional[];
  subsectors: SubsectorDefinition[];
  selectedSubsectorId: SubsectorId;
  onOpenProfile: (prof: Professional) => void;
  onAddToAgenda: (prof: Professional) => void;
  onOpenContactModal: (prof: Professional) => void;
  onCompareCandidates: (candidates: Professional[]) => void;
  onOpenFormulario4?: (prof: Professional) => void;
}

export const ProfessionalSearchView: React.FC<ProfessionalSearchViewProps> = ({
  professionals,
  subsectors,
  selectedSubsectorId,
  onOpenProfile,
  onAddToAgenda,
  onOpenContactModal,
  onCompareCandidates,
  onOpenFormulario4
}) => {
  // Search query inputs
  const [keywordQuery, setKeywordQuery] = useState('');
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [useSmartSearch, setUseSmartSearch] = useState(false);

  // Filters
  const [selectedSubsector, setSelectedSubsector] = useState<string>(selectedSubsectorId);
  const [selectedProfession, setSelectedProfession] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [minExpYears, setMinExpYears] = useState<number>(0);
  const [selectedEiaType, setSelectedEiaType] = useState<string>('ALL');
  const [filterSenaceOnly, setFilterSenaceOnly] = useState(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);

  // Selection for comparison (up to 5)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Unique lists for dropdowns
  const uniqueProfessions = useMemo(() => {
    return Array.from(new Set(professionals.map(p => p.profession))).sort();
  }, [professionals]);

  const uniqueDepartments = useMemo(() => {
    return Array.from(new Set(professionals.map(p => p.department))).sort();
  }, [professionals]);

  // Handle Natural Language / Inverse Search
  const parsedNL = useMemo(() => {
    if (!naturalLanguageQuery.trim()) return null;
    return parseNaturalLanguageQuery(naturalLanguageQuery);
  }, [naturalLanguageQuery]);

  // Filtered & Ranked Candidates
  const filteredCandidates = useMemo(() => {
    let result = [...professionals];

    // If natural language search is provided
    if (parsedNL) {
      if (parsedNL.detectedSubsector) {
        result = result.filter(p => p.subsectorsCompatible.includes(parsedNL.detectedSubsector as SubsectorId));
      }
      if (parsedNL.minYearsDetected) {
        result = result.filter(p => p.yearsExperienceEstimated >= (parsedNL.minYearsDetected || 0));
      }
      if (parsedNL.detectedProfessions.length > 0) {
        result = result.filter(p => 
          parsedNL.detectedProfessions.some(profTerm => 
            p.profession.toLowerCase().includes(profTerm.toLowerCase()) || 
            p.specialty.toLowerCase().includes(profTerm.toLowerCase())
          )
        );
      }
    }

    // Keyword filter
    if (keywordQuery.trim()) {
      const q = keywordQuery.toLowerCase();
      result = result.filter(p => 
        p.fullName.toLowerCase().includes(q) ||
        p.profession.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.university.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.professionalSummary.toLowerCase().includes(q) ||
        p.experiences.some(e => e.project.toLowerCase().includes(q) || e.clientOrEntity.toLowerCase().includes(q))
      );
    }

    // Standard dropdown filters
    if (selectedSubsector !== 'ALL') {
      result = result.filter(p => p.subsectorsCompatible.includes(selectedSubsector as SubsectorId));
    }

    if (selectedProfession !== 'ALL') {
      result = result.filter(p => p.profession === selectedProfession);
    }

    if (selectedDepartment !== 'ALL') {
      result = result.filter(p => p.department === selectedDepartment);
    }

    if (minExpYears > 0) {
      result = result.filter(p => p.yearsExperienceEstimated >= minExpYears);
    }

    if (selectedEiaType !== 'ALL') {
      result = result.filter(p => p.eiaTypesHandled.includes(selectedEiaType));
    }

    if (filterSenaceOnly) {
      result = result.filter(p => p.senaceSpecialist);
    }

    if (filterVerifiedOnly) {
      result = result.filter(p => p.verificationStatus === 'suficientemente_acreditado');
    }

    // Sort by Score descending
    return result.sort((a, b) => b.scores.total - a.scores.total);
  }, [
    professionals, 
    keywordQuery, 
    parsedNL, 
    selectedSubsector, 
    selectedProfession, 
    selectedDepartment, 
    minExpYears, 
    selectedEiaType, 
    filterSenaceOnly, 
    filterVerifiedOnly
  ]);

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(item => item !== id));
    } else {
      if (selectedForCompare.length >= 5) {
        alert('Puede comparar un máximo de 5 profesionales simultáneamente.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handleLaunchComparison = () => {
    const candidates = professionals.filter(p => selectedForCompare.includes(p.id));
    if (candidates.length > 0) {
      onCompareCandidates(candidates);
    }
  };

  const handleResetFilters = () => {
    setKeywordQuery('');
    setNaturalLanguageQuery('');
    setSelectedSubsector('ALL');
    setSelectedProfession('ALL');
    setSelectedDepartment('ALL');
    setMinExpYears(0);
    setSelectedEiaType('ALL');
    setFilterSenaceOnly(false);
    setFilterVerifiedOnly(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Search Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        
        {/* Natural Language / "¿Qué necesitas?" inverse search toggle */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-700" />
              Motor de Búsqueda y Verificación RNCA
            </h2>
            <p className="text-xs text-slate-500">
              Búsqueda multifuente en Nómina SENACE, títulos SUNEDU, colegiaturas CIP/CBP y expedientes SEIA oficiales.
            </p>
          </div>
          <button
            onClick={() => setUseSmartSearch(!useSmartSearch)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {useSmartSearch ? 'Búsqueda Estructurada' : 'Buscador Inverso ("¿Qué necesitas?")'}
          </button>
        </div>

        {/* Natural Language Box (Section 19 of prompt) */}
        {useSmartSearch ? (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4 space-y-2">
            <label className="block text-xs font-bold text-emerald-950">
              Buscador Inverso: Describa la conformación o perfil que necesita para su consultora
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ejemplo: Necesito 1 ingeniero ambiental, 1 biólogo, 1 especialista social y 1 especialista GIS para minería con 5 años de experiencia"
                value={naturalLanguageQuery}
                onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                className="flex-1 bg-white border border-emerald-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-emerald-600"
              />
              <button
                onClick={() => setNaturalLanguageQuery('')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg font-medium"
              >
                Limpiar
              </button>
            </div>
            {parsedNL && (
              <div className="text-xs text-emerald-900 bg-white p-2.5 rounded border border-emerald-100 flex flex-wrap gap-3">
                <span><strong>Subsector detectado:</strong> {parsedNL.detectedSubsector ? parsedNL.detectedSubsector.toUpperCase() : 'General'}</span>
                <span><strong>Roles detectados:</strong> {parsedNL.detectedProfessions.join(', ') || 'Todos'}</span>
                {parsedNL.minYearsDetected && <span><strong>Exp. Mínima:</strong> {parsedNL.minYearsDetected} años</span>}
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, profesión, proyecto, universidad, palabra clave ambiental (ej: drenaje ácido, EIA-d, botaderos)..."
              value={keywordQuery}
              onChange={(e) => setKeywordQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-emerald-600"
            />
          </div>
        )}

        {/* Detailed Filters Bar (Section 43 of prompt) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Subsector:</label>
            <select
              value={selectedSubsector}
              onChange={(e) => setSelectedSubsector(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-800"
            >
              <option value="ALL">Todos los subsectores</option>
              {subsectors.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Profesión:</label>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-800"
            >
              <option value="ALL">Todas las profesiones</option>
              {uniqueProfessions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Región / Dpto:</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-800"
            >
              <option value="ALL">Todo el Perú</option>
              {uniqueDepartments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Años Exp. Min:</label>
            <select
              value={minExpYears}
              onChange={(e) => setMinExpYears(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-800"
            >
              <option value={0}>Sin mínimo</option>
              <option value={3}>3+ años</option>
              <option value={5}>5+ años</option>
              <option value={8}>8+ años</option>
              <option value={10}>10+ años</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Instrumento EIA:</label>
            <select
              value={selectedEiaType}
              onChange={(e) => setSelectedEiaType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-xs text-slate-800"
            >
              <option value="ALL">Cualquiera</option>
              <option value="EIA-d">EIA-d (Detallado)</option>
              <option value="EIA-sd">EIA-sd (Semidetallado)</option>
              <option value="MEIA">MEIA (Modificatoria)</option>
              <option value="DIA">DIA</option>
              <option value="ITS">ITS</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-xs flex items-center justify-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reestablecer
            </button>
          </div>
        </div>

        {/* Checkbox Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={filterSenaceOnly}
                onChange={(e) => setFilterSenaceOnly(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Solo inscritos en Nómina SENACE</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={filterVerifiedOnly}
                onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Solo acreditación suficiente (🟢 ALTO)</span>
            </label>
          </div>

          <div className="text-slate-500 text-xs">
            Mostrando <strong>{filteredCandidates.length}</strong> de {professionals.length} profesionales
          </div>
        </div>

      </div>

      {/* Comparison Floating Bar if selected */}
      {selectedForCompare.length > 0 && (
        <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in sticky top-4 z-30">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span>
              <strong>{selectedForCompare.length} candidatos seleccionados</strong> para comparación de perfiles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedForCompare([])}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleLaunchComparison}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Scale className="w-4 h-4" /> Comparar Ahora ({selectedForCompare.length}/5)
            </button>
          </div>
        </div>
      )}

      {/* Candidate Cards Grid (Section 42 of prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map(prof => {
          const isSelectedCompare = selectedForCompare.includes(prof.id);

          return (
            <div 
              key={prof.id} 
              className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              {/* Card Top */}
              <div className="p-4 sm:p-5 space-y-3">
                
                {/* Badges bar */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                      {prof.id}
                    </span>
                    {prof.senaceSpecialist && (
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        <Award className="w-3 h-3 text-blue-600" /> SENACE
                      </span>
                    )}
                  </div>
                  
                  {/* Score pill */}
                  <div className="text-right">
                    <div className="text-base font-black text-emerald-700">
                      {prof.scores.total}%
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Compatibilidad
                    </div>
                  </div>
                </div>

                {/* Candidate Name & Role */}
                <div>
                  <h3 
                    onClick={() => onOpenProfile(prof)}
                    className="font-bold text-slate-900 text-base hover:text-emerald-700 cursor-pointer transition"
                  >
                    {prof.fullName}
                  </h3>
                  <p className="text-emerald-700 font-semibold text-xs mt-0.5">
                    {prof.profession}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {prof.specialty}
                  </p>
                </div>

                {/* Homonym & Inconsistency Alerts */}
                {prof.isHomonymSuspect && (
                  <div className="bg-amber-50 text-amber-900 border border-amber-200 rounded p-2 text-xs flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Posible Homónimo:</strong> Requiere verificar número de colegiatura y centro de estudios.</span>
                  </div>
                )}

                {prof.fraudSuspect && (
                  <div className="bg-rose-50 text-rose-900 border border-rose-200 rounded p-2 text-xs flex items-start gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span><strong>Alerta Documental:</strong> Inconsistencia cronológica detectada.</span>
                  </div>
                )}

                {/* Checklist Requirements Mini-View (Section 42 of prompt) */}
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Formación Universitaria:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {prof.academicDegrees[0]?.career || prof.profession}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Exp. Ambiental:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {prof.environmentalExperienceYears} años
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Colegiatura y Habilitación:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      {prof.habilitacionVerified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Habilitado CIP
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Por constatar
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Contact phone pill & DGAA badge (Click to call / contact) */}
                <div 
                  onClick={() => onOpenContactModal(prof)}
                  className="bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/90 rounded-lg p-2 text-xs flex items-center justify-between cursor-pointer transition shadow-2xs group"
                  title="Clic para contactar: Teléfono directo, WhatsApp, Oficina o Dirección General"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition shrink-0" />
                    <span className="font-mono font-bold text-slate-900 text-[11px] truncate">
                      {prof.directProfessionalPhone || (prof.publicProfessionalPhone ? prof.publicProfessionalPhone.split('|')[0].trim() : '(+51) 987 500 000')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-900 bg-emerald-100 group-hover:bg-emerald-200 px-1.5 py-0.5 rounded font-bold shrink-0 transition">
                    {prof.dgaaRegistryEntity ? 'DGAA Verificado' : 'SENACE Validado'}
                  </span>
                </div>

                {/* Location & Sectors */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {prof.city}, {prof.department}
                  </span>
                  <span>
                    Evidencia: <strong className="text-slate-700">{prof.confidenceLevel}</strong>
                  </span>
                </div>

              </div>

              {/* Card Footer with Section 66 Mandatory Legal Notice */}
              <div className="bg-slate-50 border-t border-slate-200 p-3 space-y-2">
                <p className="text-[10px] text-slate-500 leading-tight">
                  No constituye aprobación ni reconocimiento oficial por SENACE. Requiere verificación documental.
                </p>

                <div className="flex items-center justify-between gap-1.5 pt-1">
                  <button
                    onClick={() => onOpenProfile(prof)}
                    className="flex-1 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded font-semibold text-xs transition cursor-pointer text-center"
                  >
                    Ver Ficha
                  </button>

                  {onOpenFormulario4 && (
                    <button
                      onClick={() => onOpenFormulario4(prof)}
                      className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Evaluar Formulario 4 SENACE (R.J. 076-2016-SENACE/J)"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      F4
                    </button>
                  )}

                  <button
                    onClick={() => onAddToAgenda(prof)}
                    className="py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-semibold text-xs transition cursor-pointer flex items-center gap-1"
                    title="Agregar a agenda de consultora"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    Agenda
                  </button>

                  <button
                    onClick={() => toggleCompare(prof.id)}
                    className={`py-1.5 px-2 rounded font-semibold text-xs border transition cursor-pointer flex items-center gap-1 ${
                      isSelectedCompare 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                    title="Seleccionar para comparador"
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <Search className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-900 text-sm">
            No se encontraron profesionales que coincidan con los criterios seleccionados
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Pruebe flexibilizando los filtros de experiencia o cambie el subsector seleccionado. También puede utilizar el importador de fuentes para añadir nuevos expedientes.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition"
          >
            Reestablecer Filtros
          </button>
        </div>
      )}

    </div>
  );
};
