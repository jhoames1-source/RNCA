import React, { useState } from 'react';
import { 
  BookmarkCheck, Plus, Download, Mail, Phone, Calendar, 
  Trash2, CheckSquare, Square, FileText, ChevronRight, UserCheck
} from 'lucide-react';
import { AgendaEntry, Professional, SubsectorDefinition, CandidatePipelineStatus } from '../types/rnca';
import { exportAgendaToExcel } from '../utils/exportEngine';

interface AgendaViewProps {
  agenda: AgendaEntry[];
  professionals: Professional[];
  subsectors: SubsectorDefinition[];
  onUpdateAgendaEntry: (updated: AgendaEntry) => void;
  onRemoveAgendaEntry: (id: string) => void;
  onOpenProfile: (prof: Professional) => void;
  onOpenContactModal: (prof: Professional) => void;
}

const PIPELINE_STATUSES: { status: CandidatePipelineStatus; label: string; color: string }[] = [
  { status: 'IDENTIFICADO', label: 'Identificado', color: 'bg-slate-100 text-slate-800' },
  { status: 'POR_CONTACTAR', label: 'Por Contactar', color: 'bg-blue-50 text-blue-800' },
  { status: 'CONTACTADO', label: 'Contactado', color: 'bg-indigo-50 text-indigo-800' },
  { status: 'INTERESADO', label: 'Interesado', color: 'bg-purple-50 text-purple-800' },
  { status: 'DOCUMENTACION_SOLICITADA', label: 'Doc. Solicitada', color: 'bg-amber-50 text-amber-800' },
  { status: 'DOCUMENTACION_RECIBIDA', label: 'Doc. Recibida', color: 'bg-cyan-50 text-cyan-800' },
  { status: 'EN_VERIFICACION', label: 'En Verificación', color: 'bg-orange-50 text-orange-800' },
  { status: 'APTO_PRELIMINARMENTE', label: 'Apto Preliminar', color: 'bg-emerald-50 text-emerald-800' },
  { status: 'INCORPORADO_AL_EQUIPO', label: 'Incorporado al Equipo', color: 'bg-teal-700 text-white font-bold' },
  { status: 'NO_APTO', label: 'No Apto', color: 'bg-rose-50 text-rose-800' },
  { status: 'DESCARTADO', label: 'Descartado', color: 'bg-slate-200 text-slate-500' }
];

export const AgendaView: React.FC<AgendaViewProps> = ({
  agenda,
  professionals,
  subsectors,
  onUpdateAgendaEntry,
  onRemoveAgendaEntry,
  onOpenProfile,
  onOpenContactModal
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleStatusChange = (entry: AgendaEntry, newStatus: CandidatePipelineStatus) => {
    onUpdateAgendaEntry({
      ...entry,
      pipelineStatus: newStatus,
      lastInteractionDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleToggleDocCheck = (entry: AgendaEntry, key: keyof AgendaEntry['documentsChecklist']) => {
    onUpdateAgendaEntry({
      ...entry,
      documentsChecklist: {
        ...entry.documentsChecklist,
        [key]: !entry.documentsChecklist[key]
      },
      lastInteractionDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleNotesChange = (entry: AgendaEntry, notes: string) => {
    onUpdateAgendaEntry({
      ...entry,
      notes,
      lastInteractionDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleExport = () => {
    exportAgendaToExcel(agenda, professionals, subsectors);
  };

  const filteredAgenda = agenda.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.pipelineStatus === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-emerald-700" />
              Agenda y Pipeline de Especialistas RNCA
            </h2>
            <p className="text-xs text-slate-500">
              Gestión del proceso de contacto, recopilación de expedientes documentados y estados de incorporación de los profesionales.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" /> Exportar Agenda en Excel
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1 rounded-full font-semibold transition ${
              filterStatus === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Todos ({agenda.length})
          </button>
          {PIPELINE_STATUSES.map(s => {
            const count = agenda.filter(a => a.pipelineStatus === s.status).length;
            if (count === 0 && filterStatus !== s.status) return null;
            return (
              <button
                key={s.status}
                onClick={() => setFilterStatus(s.status)}
                className={`px-3 py-1 rounded-full font-semibold transition ${
                  filterStatus === s.status ? 'bg-slate-900 text-white' : `${s.color} hover:opacity-80`
                }`}
              >
                {s.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Agenda Entries List */}
      <div className="space-y-3">
        {filteredAgenda.map(entry => {
          const prof = professionals.find(p => p.id === entry.professionalId);
          const sub = subsectors.find(s => s.id === entry.subsectorId);
          if (!prof) return null;

          return (
            <div key={entry.id} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
              
              {/* Row Top */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                      {prof.id}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-bold">
                      Subsector: {sub?.name || entry.subsectorId}
                    </span>
                    <span className="text-xs text-slate-500">
                      Rol: <strong>{entry.assignedRole}</strong>
                    </span>
                  </div>

                  <h3 
                    onClick={() => onOpenProfile(prof)}
                    className="font-bold text-slate-900 text-base hover:text-emerald-700 cursor-pointer transition flex items-center gap-2"
                  >
                    {prof.fullName}
                  </h3>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {prof.profession} • {prof.university} • {prof.colegioProfesional} {prof.colegiaturaNumber || ''}
                  </div>
                </div>

                {/* Pipeline Status Selector Dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <label className="text-[10px] font-bold text-slate-400 block uppercase">
                      Estado en Pipeline:
                    </label>
                    <select
                      value={entry.pipelineStatus}
                      onChange={(e) => handleStatusChange(entry, e.target.value as CandidatePipelineStatus)}
                      className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-bold text-slate-800"
                    >
                      {PIPELINE_STATUSES.map(s => (
                        <option key={s.status} value={s.status}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => onRemoveAgendaEntry(entry.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition mt-4"
                    title="Eliminar de agenda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Reception Checklist */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 text-xs">
                <span className="font-bold text-slate-700 block mb-2">
                  Checklist de Documentos Recibidos del Especialista:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={entry.documentsChecklist.cvReceived}
                      onChange={() => handleToggleDocCheck(entry, 'cvReceived')}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>CV Documentado</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={entry.documentsChecklist.colegiaturaReceived}
                      onChange={() => handleToggleDocCheck(entry, 'colegiaturaReceived')}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Copia Colegiatura</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={entry.documentsChecklist.habilitacionReceived}
                      onChange={() => handleToggleDocCheck(entry, 'habilitacionReceived')}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Habilitación CIP/CBP</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={entry.documentsChecklist.djReceived}
                      onChange={() => handleToggleDocCheck(entry, 'djReceived')}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Declaración Jurada</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={entry.documentsChecklist.contractDrafted}
                      onChange={() => handleToggleDocCheck(entry, 'contractDrafted')}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Carta / Contrato</span>
                  </label>
                </div>
              </div>

              {/* Notes and Communication Log */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1 border-t border-slate-100">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Registrar notas de contacto, observaciones o disponibilidad..."
                    value={entry.notes}
                    onChange={(e) => handleNotesChange(entry, e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400">
                    Última actualización: {entry.lastInteractionDate}
                  </span>
                  <button
                    onClick={() => onOpenContactModal(prof)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs flex items-center gap-1 transition"
                  >
                    <Mail className="w-3.5 h-3.5" /> Comunicar
                  </button>
                  <button
                    onClick={() => onOpenProfile(prof)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs"
                  >
                    Ver Ficha
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {filteredAgenda.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
            No hay especialistas en este estado de la agenda. 
            Agregue candidatos desde el buscador o el módulo de requisitos con el botón <strong>"+ Agenda"</strong>.
          </div>
        )}
      </div>

    </div>
  );
};
