import React, { useState } from 'react';
import { 
  Building2, Phone, Mail, MapPin, ExternalLink, Search, 
  X, Copy, Check, Clock, ShieldCheck, ChevronRight, PhoneCall, MessageCircle
} from 'lucide-react';
import { DGAA_CONTACTS_DATA, PROFESSIONAL_COLLEGES_DIRECTORY } from '../data/dgaaContactsData';
import { SubsectorId } from '../types/rnca';

interface DgaaDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subsectorFilter?: SubsectorId | 'all';
}

export const DgaaDirectoryModal: React.FC<DgaaDirectoryModalProps> = ({
  isOpen,
  onClose,
  subsectorFilter = 'all'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'MINEM' | 'SENACE' | 'MTC' | 'MIDAGRI' | 'PRODUCE' | 'VIVIENDA' | 'COLEGIOS'>('ALL');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredDgaa = DGAA_CONTACTS_DATA.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.centralPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.officialEmails.some(e => e.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.annexes.some(a => a.annex.includes(searchTerm) || a.area.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'ALL' ? true :
      selectedCategory === 'MINEM' ? item.id.startsWith('minem') :
      selectedCategory === 'SENACE' ? item.id.startsWith('senace') :
      selectedCategory === 'MTC' ? item.id.startsWith('mtc') :
      selectedCategory === 'MIDAGRI' ? item.id.startsWith('midagri') :
      selectedCategory === 'PRODUCE' ? item.id.startsWith('produce') :
      selectedCategory === 'VIVIENDA' ? item.id.startsWith('vivienda') : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded font-bold">
                Directorio Oficial del Estado Peruano
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Líneas Verificadas 2025 - 2026
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-400" />
              Direcciones Generales de Asuntos Ambientales (DGAA) y SENACE
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Central telefónica, anexos de registros, correos institucionales de mesa de partes y orientación oficial para verificación de consultoras y profesionales del SEIA.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition shrink-0"
            title="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por entidad, anexo, teléfono, correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {(['ALL', 'SENACE', 'MINEM', 'MTC', 'MIDAGRI', 'PRODUCE', 'VIVIENDA', 'COLEGIOS'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md font-bold whitespace-nowrap text-[11px] transition ${
                  selectedCategory === cat 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'Todos los Sectores' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          
          {/* Main Entities Grid */}
          <div className="space-y-4">
            {filteredDgaa.map(entity => (
              <div 
                key={entity.id}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs hover:border-emerald-500/50 transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-emerald-300 px-2.5 py-0.5 rounded">
                        {entity.abbreviation}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {entity.ministryOrAuthority}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {entity.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={entity.procedureUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Portal GOB.PE
                    </a>
                    {entity.onlineDeskUrl && (
                      <a
                        href={entity.onlineDeskUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        Mesa de Partes Virtual
                      </a>
                    )}
                  </div>
                </div>

                {/* Primary Contact Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  {/* Central Phone */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" /> Teléfono Central Oficial:
                    </span>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`tel:${entity.centralPhone.replace(/[^0-9+]/g, '')}`}
                        className="text-sm font-black text-slate-900 hover:text-emerald-700 underline font-mono"
                      >
                        {entity.centralPhone}
                      </a>
                      <button
                        onClick={() => handleCopy(entity.centralPhone, `central-${entity.id}`)}
                        className="p-1 text-slate-400 hover:text-emerald-700 transition"
                        title="Copiar teléfono"
                      >
                        {copiedText === `central-${entity.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {entity.tollFreeLine && (
                      <span className="text-[11px] text-emerald-800 font-bold block">
                        {entity.tollFreeLine}
                      </span>
                    )}
                  </div>

                  {/* WhatsApp / Celular Institucional */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" /> Móvil / WhatsApp de Orientación:
                    </span>
                    {entity.cellOrWhatsapp ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 font-mono">
                          {entity.cellOrWhatsapp}
                        </span>
                        <button
                          onClick={() => handleCopy(entity.cellOrWhatsapp || '', `cell-${entity.id}`)}
                          className="p-1 text-slate-400 hover:text-emerald-700 transition"
                          title="Copiar número"
                        >
                          {copiedText === `cell-${entity.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Atención vía central telefónica</span>
                    )}
                  </div>

                  {/* Horario y Sede */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Horario de Atención:
                    </span>
                    <span className="text-xs font-semibold text-slate-700 block">
                      {entity.officeHours}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate" title={entity.address}>
                      <MapPin className="w-3 h-3 shrink-0" /> {entity.address}
                    </span>
                  </div>
                </div>

                {/* Annexes Table */}
                <div className="space-y-2">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    Anexos Específicos para Consultoras y Acreditación de Equipos:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {entity.annexes.map((anx, i) => (
                      <div key={i} className="p-2.5 bg-slate-50/70 border border-slate-200 rounded-lg flex items-start gap-2.5">
                        <span className="font-mono font-black text-xs bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded border border-emerald-300 shrink-0">
                          Anx. {anx.annex}
                        </span>
                        <div className="min-w-0">
                          <strong className="text-slate-900 block truncate">{anx.area}</strong>
                          <p className="text-[11px] text-slate-500 leading-snug">{anx.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Emails */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    Correos Institucionales para Consultas y Trámites TUPA:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {entity.officialEmails.map((em, i) => (
                      <div 
                        key={i} 
                        className="px-3 py-1.5 bg-emerald-50/60 border border-emerald-200 rounded-lg flex items-center gap-2"
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-[11px] font-medium text-emerald-900">{em.purpose}:</span>
                        <a 
                          href={`mailto:${em.email}`}
                          className="font-mono font-bold text-emerald-950 hover:underline"
                        >
                          {em.email}
                        </a>
                        <button
                          onClick={() => handleCopy(em.email, `email-${entity.id}-${i}`)}
                          className="p-0.5 text-emerald-700 hover:text-emerald-950 transition"
                          title="Copiar correo"
                        >
                          {copiedText === `email-${entity.id}-${i}` ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Colegios Profesionales Section */}
          {(selectedCategory === 'ALL' || selectedCategory === 'COLEGIOS') && (
            <div className="mt-8 border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Colegios Profesionales — Verificación de Colegiatura y Habilitación
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                Líneas directas y portales de consulta oficial para validar que el especialista se encuentre hábil al mes de presentación del trámite ante el RNCA:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(PROFESSIONAL_COLLEGES_DIRECTORY).map(([key, col]) => (
                  <div key={key} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{col.abbreviation}</span>
                      <a
                        href={col.verificationPortalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 underline"
                      >
                        Consultar Padrón Online <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-600">{col.collegeName}</p>
                    <div className="space-y-1 text-[11px] text-slate-700 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{col.centralPhone} ({col.annexes})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-3 h-3 text-green-600" />
                        <span>WhatsApp: {col.whatsappOrCell}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{col.officialEmail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Fuente oficial: Portales Institucionales del Estado Peruano (Plataforma GOB.PE y SENACE)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
          >
            Cerrar Directorio
          </button>
        </div>

      </div>
    </div>
  );
};
