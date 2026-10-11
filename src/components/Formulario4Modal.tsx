import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Printer, FileText, CheckCircle2, AlertTriangle, ShieldCheck, 
  Download, Plus, Trash2, Calendar, HelpCircle, CheckSquare, Square,
  Layers, ChevronDown, ChevronUp, AlertOctagon, Scale, Globe, Building2
} from 'lucide-react';
import { Professional, SubsectorDefinition, ExperienceItem, SubsectorId } from '../types/rnca';
import { evaluateProfessionalFormulario4, calculateDateDifference, parseExperienceDate, calculateNetNonOverlappingDays } from '../utils/formulario4Engine';
import { exportFormulario4ToExcel } from '../utils/exportEngine';
import { SUBSECTOR_NORMATIVE_REGISTRY, getSenaceRecommendationsForSubsector } from '../data/senaceRecommendations';
import { SUBSECTORS_DATA } from '../data/subsectorsData';

interface Formulario4ModalProps {
  professional: Professional | null;
  subsector: SubsectorDefinition;
  onClose: () => void;
  availableSubsectors?: SubsectorDefinition[];
  onSubsectorChange?: (subsector: SubsectorDefinition) => void;
}

interface EditableExperienceRow {
  id: string;
  clientOrEntity: string;
  functionsDescription: string;
  startDate: string; // dd/mm/aaaa
  endDate: string; // dd/mm/aaaa
  folios: string;
  isSpecificSector: boolean;
}

export const Formulario4Modal: React.FC<Formulario4ModalProps> = ({
  professional,
  subsector,
  onClose,
  availableSubsectors = SUBSECTORS_DATA,
  onSubsectorChange
}) => {
  if (!professional) return null;

  // Active subsector for evaluation (allows switching between all 11 subsectors inside the modal)
  const [selectedSubsectorId, setSelectedSubsectorId] = useState<SubsectorId>(subsector.id);

  // Sync when prop changes
  useEffect(() => {
    setSelectedSubsectorId(subsector.id);
  }, [subsector.id]);

  const currentSubsector = useMemo(() => {
    return availableSubsectors.find(s => s.id === selectedSubsectorId) || subsector;
  }, [availableSubsectors, selectedSubsectorId, subsector]);

  // Current Subsector Normative Information
  const subNorm = useMemo(() => {
    return SUBSECTOR_NORMATIVE_REGISTRY[selectedSubsectorId] || SUBSECTOR_NORMATIVE_REGISTRY.transportes;
  }, [selectedSubsectorId]);

  // Auto-detect whether this professional's career is linked to the selected subsector
  const isSectorLinkedCareer = useMemo(() => {
    const profLower = professional.profession.toLowerCase();
    return subNorm.linkedCareerKeywords.some(kw => profLower.includes(kw));
  }, [professional.profession, subNorm]);

  const [careerCategory, setCareerCategory] = useState<'VINCULADA_SECTOR' | 'TRANSVERSAL'>(
    isSectorLinkedCareer ? 'VINCULADA_SECTOR' : 'TRANSVERSAL'
  );

  // When selected subsector changes, update the default career category
  useEffect(() => {
    setCareerCategory(isSectorLinkedCareer ? 'VINCULADA_SECTOR' : 'TRANSVERSAL');
  }, [isSectorLinkedCareer, selectedSubsectorId]);

  const [activeTab, setActiveTab] = useState<'formulario' | 'recomendaciones' | 'agregar_exp'>('formulario');

  // Load official SENACE recommendations tailored to the selected subsector
  const currentRecommendations = useMemo(() => {
    return getSenaceRecommendationsForSubsector(selectedSubsectorId);
  }, [selectedSubsectorId]);

  // Interactive Checklist of SENACE Recommendations
  const [recommendationsState, setRecommendationsState] = useState<Record<string, boolean>>({});

  // Reset/sync recommendations state when subsector changes
  useEffect(() => {
    const accreditedSectorYears = professional.subsectorExperienceYears[selectedSubsectorId] || 0;
    const accreditedSeiaYears = professional.environmentalExperienceYears || 0;

    const initialRecsState: Record<string, boolean> = {};
    currentRecommendations.forEach(rec => {
      if (rec.category === 'EQUIPO_MULTIDISCIPLINARIO') {
        initialRecsState[rec.id] = true;
      } else if (rec.category === 'HABILITACION') {
        initialRecsState[rec.id] = professional.habilitacionVerified;
      } else if (rec.category === 'FORMULARIO_4') {
        if (rec.id.includes('-02')) {
          // Sector-linked 5 years check
          initialRecsState[rec.id] = accreditedSectorYears >= 5;
        } else if (rec.id.includes('-03')) {
          // Transversal 5 years check
          initialRecsState[rec.id] = accreditedSeiaYears >= 5;
        } else {
          initialRecsState[rec.id] = true;
        }
      } else {
        initialRecsState[rec.id] = true;
      }
    });
    setRecommendationsState(initialRecsState);
  }, [selectedSubsectorId, currentRecommendations, professional]);

  const toggleRecommendation = (id: string) => {
    setRecommendationsState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Local state for editable experiences
  const initialRows: EditableExperienceRow[] = useMemo(() => {
    if (professional.experiences.length > 0) {
      return professional.experiences.map((exp, idx) => {
        let start = '01/01/2018';
        let end = '31/12/2021';
        if (exp.startDate && exp.endDate) {
          start = exp.startDate;
          end = exp.endDate;
        } else if (exp.period) {
          const parts = exp.period.split('-');
          const startY = parts[0]?.trim() || '2018';
          const endY = parts[1]?.trim() || '2021';
          start = `01/01/${startY}`;
          end = `31/12/${endY}`;
        }
        return {
          id: `row-${idx}`,
          clientOrEntity: exp.clientOrEntity,
          functionsDescription: exp.functionsDescription || `Elaboración y suscripción técnica de componentes en proyectos del subsector ${exp.subsector}, conforme a los TDR y normativa del SEIA.`,
          startDate: start,
          endDate: end,
          folios: exp.folios || `F. ${String(idx * 8 + 1).padStart(3, '0')} - ${String(idx * 8 + 8).padStart(3, '0')}`,
          isSpecificSector: exp.subsector === selectedSubsectorId
        };
      });
    }

    // Default template row if empty
    return [
      {
        id: 'row-default-1',
        clientOrEntity: 'Consorcio Ambiental / Consultora Registrada en RNCA',
        functionsDescription: `Especialista en elaboración de instrumentos de gestión ambiental para el subsector ${currentSubsector.name} en el marco del SEIA (${subNorm.resolutionCode}).`,
        startDate: '01/01/2019',
        endDate: '31/12/2023',
        folios: 'F. 001 - 045',
        isSpecificSector: true
      }
    ];
  }, [professional, selectedSubsectorId, currentSubsector.name, subNorm.resolutionCode]);

  const [experienceRows, setExperienceRows] = useState<EditableExperienceRow[]>(initialRows);

  // Sync rows if professional changes
  useEffect(() => {
    setExperienceRows(initialRows);
  }, [initialRows]);

  // New experience form state
  const [newExpForm, setNewExpForm] = useState({
    clientOrEntity: '',
    functionsDescription: '',
    startDate: '01/01/2022',
    endDate: '31/12/2024',
    folios: 'F. 050 - 080',
    isSpecificSector: true
  });

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpForm.clientOrEntity || !newExpForm.functionsDescription) return;

    setExperienceRows(prev => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        ...newExpForm
      }
    ]);
    setNewExpForm({
      clientOrEntity: '',
      functionsDescription: '',
      startDate: '01/01/2022',
      endDate: '31/12/2024',
      folios: 'F. 050 - 080',
      isSpecificSector: true
    });
    setActiveTab('formulario');
  };

  const handleRemoveExperience = (id: string) => {
    setExperienceRows(prev => prev.filter(r => r.id !== id));
  };

  // Compute live calculations from rows
  const computedRowDetails = useMemo(() => {
    return experienceRows.map(row => {
      const sDate = parseExperienceDate(row.startDate, 2018, false);
      const eDate = parseExperienceDate(row.endDate, 2024, true);
      const diff = calculateDateDifference(sDate, eDate);
      return {
        ...row,
        startDateObj: sDate,
        endDateObj: eDate,
        years: diff.years,
        months: diff.months,
        days: diff.days,
        totalDays: diff.totalDays
      };
    });
  }, [experienceRows]);

  // Non-overlapping net duration
  const netDuration = useMemo(() => {
    const ranges = computedRowDetails.map(r => ({ start: r.startDateObj, end: r.endDateObj }));
    const { netDays, overlapDays } = calculateNetNonOverlappingDays(ranges);

    const netYears = Math.floor(netDays / 365);
    const remainingDaysAfterYears = netDays % 365;
    const netMonths = Math.floor(remainingDaysAfterYears / 30);
    const netDaysRemainder = remainingDaysAfterYears % 30;

    return {
      netYears,
      netMonths,
      netDaysRemainder,
      totalNetDays: netDays,
      overlapDays,
      hasOverlap: overlapDays > 0
    };
  }, [computedRowDetails]);

  // Official evaluation according to 5-year requirement for the selected subsector
  const evaluationResult = useMemo(() => {
    return evaluateProfessionalFormulario4(professional, selectedSubsectorId);
  }, [professional, selectedSubsectorId]);

  const meets5Years = careerCategory === 'VINCULADA_SECTOR'
    ? (professional.subsectorExperienceYears[selectedSubsectorId] || 0) >= 5 || netDuration.netYears >= 5
    : (professional.environmentalExperienceYears || 0) >= 5 || netDuration.netYears >= 5;

  const currentAccreditedYears = careerCategory === 'VINCULADA_SECTOR'
    ? Math.max(professional.subsectorExperienceYears[selectedSubsectorId] || 0, netDuration.netYears)
    : Math.max(professional.environmentalExperienceYears || 0, netDuration.netYears);

  const handleSubsectorSelect = (newSubId: SubsectorId) => {
    setSelectedSubsectorId(newSubId);
    const found = availableSubsectors.find(s => s.id === newSubId);
    if (found && onSubsectorChange) {
      onSubsectorChange(found);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    exportFormulario4ToExcel(
      professional,
      currentSubsector.name,
      careerCategory,
      computedRowDetails.map(r => ({
        clientOrEntity: r.clientOrEntity,
        functions: r.functionsDescription,
        startDate: r.startDate,
        endDate: r.endDate,
        years: r.years,
        months: r.months,
        days: r.days,
        folios: r.folios
      })),
      `Formulario_4_${currentSubsector.id}_${professional.fullName.replace(/\s+/g, '_')}.xlsx`,
      subNorm.resolutionCode
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header matching Official SENACE TUPA Formats */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700/80 rounded-lg text-white">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800 font-bold">
                  {subNorm.resolutionCode}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  D.S. N.° 026-2021-MINAM
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  SUBSECTOR: {currentSubsector.name.toUpperCase()}
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-white mt-1">
                FORMULARIO 4: CURRÍCULUM VITAE DEL/LA PROFESIONAL (SENACE)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Evaluador Oficial de Experiencia Profesional Mínima para Consultoras Ambientales (RNCA) — {subNorm.resolutionTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Subsector Selector Bar - Allows switching between all 11 subsectors */}
        <div className="bg-slate-850 text-slate-200 px-4 py-2 border-b border-slate-750 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">Evaluar para Subsector Normativo:</span>
            <select
              value={selectedSubsectorId}
              onChange={e => handleSubsectorSelect(e.target.value as SubsectorId)}
              className="bg-slate-900 border border-slate-700 text-emerald-300 font-bold px-2.5 py-1 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none cursor-pointer"
            >
              {availableSubsectors.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code}) — {SUBSECTOR_NORMATIVE_REGISTRY[s.id]?.resolutionCode.split(' ')[0]} {SUBSECTOR_NORMATIVE_REGISTRY[s.id]?.resolutionCode.split(' ')[1] || ''}
                </option>
              ))}
            </select>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>Resolución de Jefatura Aplicable:</span>
            <span className="font-mono text-emerald-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {subNorm.resolutionCode}
            </span>
          </div>
        </div>

        {/* Action and Navigation Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('formulario')}
              className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'formulario'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              1. Formulario 4 Oficial
            </button>
            <button
              onClick={() => setActiveTab('recomendaciones')}
              className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'recomendaciones'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              2. Recomendaciones SENACE ({currentSubsector.name})
            </button>
            <button
              onClick={() => setActiveTab('agregar_exp')}
              className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'agregar_exp'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              3. Agregar Contrato / Experiencia
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded border border-slate-300 flex items-center gap-1 transition cursor-pointer"
              title={`Descargar Formulario 4 de ${currentSubsector.name} en Excel`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              Excel ({currentSubsector.code})
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded flex items-center gap-1 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / PDF
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm">
          
          {/* TAB 1: FORMULARIO 4 OFICIAL */}
          {activeTab === 'formulario' && (
            <>
              {/* Professional Personal Header Data */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">I. Nombres y Apellidos:</span>
                  <strong className="text-slate-900 text-sm block font-bold">{professional.fullName}</strong>
                  <span className="text-slate-500 text-[11px] block mt-1">Colegio: {professional.colegioProfesional}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">II. Carrera / Especialidad:</span>
                  <strong className="text-emerald-800 text-sm block font-bold">{professional.profession}</strong>
                  <span className="text-slate-600 text-[11px] block mt-1">Reg. Colegiatura: {professional.colegiaturaNumber || 'Por regularizar'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">III. Condición de Habilitación:</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {professional.habilitacionVerified ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        HABILITADO VIGENTE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold text-[11px] flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        OBSERVADO (Inhabilitado o por verificar)
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 text-[10px] block mt-1">
                    Cómputo legal: Desde Colegiatura / Título Profesional
                  </span>
                </div>
              </div>

              {/* Official Instructions Banner matching Image 1 & Resolution of Jefatura */}
              <div className="bg-slate-900 text-white rounded-lg p-4 space-y-2.5 shadow-sm border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-400" />
                    IV. EXPERIENCIA PROFESIONAL — SUBSECTOR {currentSubsector.name.toUpperCase()}
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                    {subNorm.resolutionCode} — Formulario 4
                  </span>
                </div>
                
                <div className="font-semibold text-slate-200 text-xs bg-slate-800/80 p-2 rounded border border-slate-700">
                  IV.a EXPERIENCIA PROFESIONAL (Llenar este ítem sólo para el caso de especialistas del equipo profesional multidisciplinario de las consultoras ambientales - Personas Jurídicas)
                </div>

                <div className="text-xs text-slate-300 space-y-2 pl-3 border-l-2 border-emerald-500">
                  <p className="leading-relaxed">
                    • <strong className="text-white">Para carrera profesional vinculada al sector ({subNorm.linkedCareerTitle}):</strong> Debe acreditar una <u className="text-emerald-300 font-semibold decoration-emerald-500">experiencia profesional mínima de cinco (05) años relacionada al sector materia de la solicitud</u> (Sector {currentSubsector.name} — {subNorm.resolutionCode}).
                  </p>
                  <p className="leading-relaxed">
                    • <strong className="text-white">Para carrera profesional transversal (Medio Físico, Biológico, Social, Ambiental, Económico):</strong> Debe acreditar una <u className="text-emerald-300 font-semibold decoration-emerald-500">experiencia profesional mínima de cinco (05) años en la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o instrumentos de gestión ambiental complementarios al SEIA</u>.
                  </p>
                </div>
              </div>

              {/* Interactive Category Selector & Live Status Banner */}
              <div className="bg-white border-2 border-slate-200 rounded-lg p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      Seleccionar Categoría de Evaluación del Especialista en {currentSubsector.name}:
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <button
                        onClick={() => setCareerCategory('VINCULADA_SECTOR')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer border ${
                          careerCategory === 'VINCULADA_SECTOR'
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Carrera Vinculada a {currentSubsector.name} ({subNorm.linkedCareerTitle})
                      </button>
                      <button
                        onClick={() => setCareerCategory('TRANSVERSAL')}
                        className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer border ${
                          careerCategory === 'TRANSVERSAL'
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Carrera Transversal en el SEIA (Físico, Biológico, Social, Ambiental, SIG)
                      </button>
                    </div>
                  </div>

                  {/* 5-Year Requirement Status Badge */}
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Resultado de Cumplimiento:</span>
                    {meets5Years ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg font-bold text-xs mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        CUMPLE REQUISITO (≥ 5 AÑOS EXIGIDOS)
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 border border-rose-300 text-rose-900 rounded-lg font-bold text-xs mt-0.5">
                        <AlertOctagon className="w-4 h-4 text-rose-600" />
                        OBSERVADO: NO CUMPLE MÍNIMO DE 5 AÑOS
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Computations & Overlap Tracker */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">Años Mínimos Exigidos:</span>
                    <strong className="text-slate-900 text-sm font-bold block">5 años (60 meses)</strong>
                    <span className="text-[10px] text-slate-400">{subNorm.resolutionCode}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">
                      {careerCategory === 'VINCULADA_SECTOR' ? `Años en ${currentSubsector.name}:` : 'Años en SEIA / Ambiental:'}
                    </span>
                    <strong className={`text-sm font-bold block ${meets5Years ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {currentAccreditedYears} años computados
                    </strong>
                    <span className="text-[10px] text-slate-500">
                      {meets5Years ? 'Supera umbral legal' : `Faltan ${5 - currentAccreditedYears} año(s)`}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">Cómputo Neto sin Traslapes:</span>
                    <strong className="text-slate-900 text-xs font-bold block">
                      {netDuration.netYears}a {netDuration.netMonths}m {netDuration.netDaysRemainder}d
                    </strong>
                    <span className="text-[10px] text-slate-500">Total: {netDuration.totalNetDays} días netos</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 text-[11px] block">Deducción de Traslapes:</span>
                    {netDuration.hasOverlap ? (
                      <div>
                        <strong className="text-amber-800 text-xs font-bold block">
                          -{netDuration.overlapDays} días deducidos
                        </strong>
                        <span className="text-[10px] text-amber-600 font-semibold">
                          Regla de simultaneidad aplicada
                        </span>
                      </div>
                    ) : (
                      <div>
                        <strong className="text-emerald-700 text-xs font-bold block">
                          0 días de traslape
                        </strong>
                        <span className="text-[10px] text-emerald-600">Periodos cronológicos continuos</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual Progress Bar to 5 Years */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Progreso hacia la Meta Obligatoria de 5 Años (60 Meses):</span>
                    <span>{Math.min(100, Math.round((currentAccreditedYears / 5) * 100))}% ({currentAccreditedYears} / 5 años)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${meets5Years ? 'bg-emerald-600' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(100, (currentAccreditedYears / 5) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Table Representing Formulario 4 Official Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    CUADRO DE EXPERIENCIA PROFESIONAL DETALLADA (SENACE)
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    {experienceRows.length} registro(s) consignado(s)
                  </span>
                </div>

                <div className="border border-slate-300 rounded-lg overflow-x-auto shadow-xs">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-800 text-white font-bold">
                        <th className="p-2 border border-slate-700 w-10 text-center">N°</th>
                        <th className="p-2 border border-slate-700 min-w-[160px]">NOMBRE DE LA EMPRESA O ENTIDAD</th>
                        <th className="p-2 border border-slate-700 min-w-[240px]">
                          BREVE DESCRIPCIÓN DE LAS FUNCIONES Y/O ACTIVIDADES DESARROLLADAS (*)
                        </th>
                        <th className="p-2 border border-slate-700 w-24 text-center">FECHA INICIO (dd/mm/aaaa)</th>
                        <th className="p-2 border border-slate-700 w-24 text-center">FECHA FIN (dd/mm/aaaa)</th>
                        <th className="p-2 border border-slate-700 w-14 text-center">AÑOS</th>
                        <th className="p-2 border border-slate-700 w-14 text-center">MESES</th>
                        <th className="p-2 border border-slate-700 w-14 text-center">DÍAS</th>
                        <th className="p-2 border border-slate-700 w-24 text-center">FOLIOS (DEL - AL)</th>
                        <th className="p-2 border border-slate-700 w-10 text-center">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {computedRowDetails.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-slate-50 transition">
                          <td className="p-2 text-center font-bold text-slate-600 bg-slate-50/50">
                            {idx + 1}
                          </td>
                          <td className="p-2 font-semibold text-slate-900">
                            {row.clientOrEntity}
                            {row.isSpecificSector && (
                              <span className="block text-[9px] text-emerald-700 font-bold uppercase mt-0.5">
                                • {currentSubsector.name}
                              </span>
                            )}
                          </td>
                          <td className="p-2 text-slate-700 leading-relaxed">
                            {row.functionsDescription}
                          </td>
                          <td className="p-2 text-center font-mono text-slate-800 font-medium">
                            {row.startDate}
                          </td>
                          <td className="p-2 text-center font-mono text-slate-800 font-medium">
                            {row.endDate}
                          </td>
                          <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50/40">
                            {row.years}
                          </td>
                          <td className="p-2 text-center text-slate-800 font-medium">
                            {row.months}
                          </td>
                          <td className="p-2 text-center text-slate-800 font-medium">
                            {row.days}
                          </td>
                          <td className="p-2 text-center font-mono text-slate-700">
                            {row.folios}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => handleRemoveExperience(row.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                              title="Eliminar experiencia"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-900">
                        <td colSpan={5} className="p-2.5 text-right uppercase text-slate-700">
                          Total Acumulado Neto (Sin Traslapes Conforme al SEIA y {subNorm.resolutionCode}):
                        </td>
                        <td className="p-2 text-center text-emerald-800 text-sm font-extrabold">
                          {netDuration.netYears}
                        </td>
                        <td className="p-2 text-center text-slate-700">
                          {netDuration.netMonths}
                        </td>
                        <td className="p-2 text-center text-slate-700">
                          {netDuration.netDaysRemainder}
                        </td>
                        <td colSpan={2} className="p-2 text-center text-[11px] text-slate-500 font-normal">
                          {netDuration.hasOverlap ? `(-${netDuration.overlapDays}d deducidos)` : 'Sin deducciones'}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Official Footnotes & Legal Clauses from Image 1 */}
              <div className="text-[11px] text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                <p>
                  (*) <em>Describir brevemente la información que permita advertir las funciones y/o actividades relacionadas al sector o sectores materia de la solicitud ({currentSubsector.name}), o a la elaboración, evaluación, ejecución, supervisión y/o fiscalización de estudios ambientales o instrumentos de gestión ambiental complementarios al SEIA, según corresponda.</em>
                </p>
                <p>
                  • <em>De ser el caso, en cuyos documentos sustentatorios no se precisa el periodo, la función desempeñada o la relación con el sector o sectores materia de la solicitud, se deberá complementar y precisar dicha información en los campos según corresponda.</em>
                </p>
                <p>
                  • <strong>Regla de No Traslape:</strong> <em>Cada experiencia profesional consignada debe contener los campos completos y corresponder al respectivo documento sustentatorio, y <u>no debe traslaparse con otra experiencia</u>.</em>
                </p>
                <p>
                  • <strong>Orden Cronológico:</strong> <em>Detallar la experiencia en orden cronológico, desde la más reciente hasta la más antigua.</em>
                </p>
              </div>
            </>
          )}

          {/* TAB 2: RECOMENDACIONES DADAS POR SENACE (IMAGEN 2) */}
          {activeTab === 'recomendaciones' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-950 text-sm">
                      Recomendaciones Técnicas del Evaluador SENACE para {currentSubsector.name} ({subNorm.resolutionCode})
                    </h3>
                    <p className="text-xs text-amber-900 mt-1">
                      Conforme a la <strong>{subNorm.resolutionCode}</strong> y el <strong>D.S. N.° 026-2021-MINAM</strong>, toda solicitud de inscripción o modificación debe superar estas observaciones antes de ingresar a trámite documentario.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {currentRecommendations.map((rec) => {
                  const isChecked = recommendationsState[rec.id] || false;
                  return (
                    <div
                      key={rec.id}
                      className={`p-4 rounded-lg border transition ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleRecommendation(rec.id)}
                            className="mt-0.5 text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                            aria-label={`Alternar estado de ${rec.title}`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                {rec.category}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {rec.normativeSource}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                              {rec.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {rec.recommendationText}
                            </p>
                            <div className="text-[11px] font-semibold text-slate-800 bg-slate-50 p-2 rounded border border-slate-200 mt-2">
                              <strong>Acción de Subsanación Requerida:</strong> {rec.actionNeeded}
                            </div>
                          </div>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                          isChecked
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isChecked ? 'SUBSANADO / VERIFICADO' : 'OBSERVACIÓN PENDIENTE'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: AGREGAR EXPERIENCIA AL FORMULARIO 4 */}
          {activeTab === 'agregar_exp' && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  Agregar Nuevo Contrato / Servicio al Formulario 4 ({currentSubsector.name})
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ingrese las fechas exactas para el recálculo automático de Años, Meses y Días, y detección de posibles traslapes conforme a la {subNorm.resolutionCode}.
                </p>
              </div>

              <form onSubmit={handleAddExperience} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Nombre de la Empresa o Entidad Contratante:
                    </label>
                    <input
                      type="text"
                      required
                      value={newExpForm.clientOrEntity}
                      onChange={e => setNewExpForm({ ...newExpForm, clientOrEntity: e.target.value })}
                      placeholder={`Ej. Ministerio / Empresa del Sector ${currentSubsector.name}`}
                      className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Folios en el Expediente (DEL - AL):
                    </label>
                    <input
                      type="text"
                      required
                      value={newExpForm.folios}
                      onChange={e => setNewExpForm({ ...newExpForm, folios: e.target.value })}
                      placeholder="Ej. F. 050 - 078"
                      className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Fecha Inicio (dd/mm/aaaa):
                    </label>
                    <input
                      type="text"
                      required
                      value={newExpForm.startDate}
                      onChange={e => setNewExpForm({ ...newExpForm, startDate: e.target.value })}
                      placeholder="01/03/2021"
                      className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 font-mono focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Fecha Fin (dd/mm/aaaa):
                    </label>
                    <input
                      type="text"
                      required
                      value={newExpForm.endDate}
                      onChange={e => setNewExpForm({ ...newExpForm, endDate: e.target.value })}
                      placeholder="28/02/2024"
                      className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 font-mono focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Breve Descripción de las Funciones y/o Actividades Desarrolladas (*):
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newExpForm.functionsDescription}
                    onChange={e => setNewExpForm({ ...newExpForm, functionsDescription: e.target.value })}
                    placeholder={`Describa explícitamente el rol técnico desempeñado, componentes del estudio ambiental (físico, biológico, social, etc.) o relación directa con proyectos del subsector ${currentSubsector.name}.`}
                    className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isSpecificCheck"
                    checked={newExpForm.isSpecificSector}
                    onChange={e => setNewExpForm({ ...newExpForm, isSpecificSector: e.target.checked })}
                    className="rounded text-emerald-600"
                  />
                  <label htmlFor="isSpecificCheck" className="text-slate-700 font-medium">
                    Esta experiencia corresponde específicamente al subsector {currentSubsector.name}.
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('formulario')}
                    className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100 font-medium transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Incorporar al Formulario 4
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
          <div className="text-slate-500 text-[11px]">
            Expediente de {currentSubsector.name} regulado bajo la <strong>{subNorm.resolutionCode}</strong> y el <strong>D.S. N.° 026-2021-MINAM</strong>.
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded font-medium transition cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" /> Imprimir Formulario 4
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
