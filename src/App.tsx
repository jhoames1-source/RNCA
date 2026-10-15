import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Search, Layers, BookmarkCheck, BookOpen, 
  UploadCloud, Scale, MapPin, ShieldCheck, UserCheck, 
  Menu, X, Download, FileText, CheckCircle2, AlertTriangle, Info, Printer,
  PhoneCall
} from 'lucide-react';

import { 
  Professional, SubsectorId, LegalNorm, AgendaEntry, 
  ConsultingFirmProfile, UserRole 
} from './types/rnca';
import { SUBSECTORS_DATA } from './data/subsectorsData';
import { OFFICIAL_LEGAL_NORMS } from './data/legalNorms';
import { INITIAL_PROFESSIONALS } from './data/professionalsData';

import { PrivacyBanner } from './components/PrivacyBanner';
import { ProfileModal } from './components/ProfileModal';
import { ComparatorModal } from './components/ComparatorModal';
import { ContactModal } from './components/ContactModal';
import { Formulario4Modal } from './components/Formulario4Modal';
import { RncaProcedureModal } from './components/RncaProcedureModal';
import { DgaaDirectoryModal } from './components/DgaaDirectoryModal';

import { DashboardView } from './components/DashboardView';
import { RequirementsEngineView } from './components/RequirementsEngineView';
import { ProfessionalSearchView } from './components/ProfessionalSearchView';
import { GapAnalysisView } from './components/GapAnalysisView';
import { ConsultingFirmView } from './components/ConsultingFirmView';
import { AgendaView } from './components/AgendaView';
import { LegalMonitorView } from './components/LegalMonitorView';
import { CustomSourcesView } from './components/CustomSourcesView';
import { AuditView } from './components/AuditView';
import { MapView } from './components/MapView';

import { exportProfessionalsToExcel, exportProfessionalsToCsv } from './utils/exportEngine';

export default function App() {
  // Main data states
  const [professionals, setProfessionals] = useState<Professional[]>(() => {
    localStorage.removeItem('rnca_professionals_v2');
    localStorage.removeItem('rnca_professionals_v3');
    localStorage.removeItem('rnca_professionals_v4_legal_contacts');
    const saved = localStorage.getItem('rnca_professionals_v5_dgaa_contacts');
    if (saved) {
      try {
        const parsed: Professional[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_PROFESSIONALS.map(p => [p.id, p]));
        const merged = parsed.map(p => {
          if (initialMap.has(p.id)) {
            const fresh = initialMap.get(p.id)!;
            return {
              ...p,
              fullName: fresh.fullName,
              publicProfessionalEmail: fresh.publicProfessionalEmail,
              publicProfessionalPhone: fresh.publicProfessionalPhone,
              directProfessionalPhone: fresh.directProfessionalPhone,
              professionalOfficePhone: fresh.professionalOfficePhone,
              dgaaRegistryEntity: fresh.dgaaRegistryEntity,
              dgaaRegistryPhone: fresh.dgaaRegistryPhone,
              dgaaRegistryEmail: fresh.dgaaRegistryEmail,
              publicContactSource: fresh.publicContactSource,
              canalContactoOficial: fresh.canalContactoOficial,
              colegioPortalUrl: fresh.colegioPortalUrl,
              linkedinUrl: fresh.linkedinUrl,
              ctiVitaeUrl: fresh.ctiVitaeUrl
            };
          }
          return p;
        });
        const parsedIds = new Set(parsed.map(p => p.id));
        const missing = INITIAL_PROFESSIONALS.filter(p => !parsedIds.has(p.id));
        return [...merged, ...missing];
      } catch (e) { /* ignore */ }
    }
    return INITIAL_PROFESSIONALS;
  });

  const [legalNorms] = useState<LegalNorm[]>(OFFICIAL_LEGAL_NORMS);
  const subsectors = SUBSECTORS_DATA;

  const [selectedSubsectorId, setSelectedSubsectorId] = useState<SubsectorId>('mineria');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Agenda pipeline state
  const [agenda, setAgenda] = useState<AgendaEntry[]>(() => {
    const saved = localStorage.getItem('rnca_agenda_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'agenda-001',
        professionalId: 'prof-pe-001',
        subsectorId: 'mineria',
        assignedRole: 'Coordinador General del Estudio Ambiental',
        pipelineStatus: 'INCORPORADO_AL_EQUIPO',
        contactDate: '2026-09-10',
        lastInteractionDate: '2026-10-02',
        proposedFee: 'Tarifa mensual según TDR',
        notes: 'CV documentado revisado y habilitación CIP 128490 ratificada al día.',
        documentsChecklist: {
          cvReceived: true,
          colegiaturaReceived: true,
          habilitacionReceived: true,
          djReceived: true,
          contractDrafted: true
        },
        interviewsCount: 2
      },
      {
        id: 'agenda-002',
        professionalId: 'prof-pe-002',
        subsectorId: 'mineria',
        assignedRole: 'Especialista en Medio Biológico y Biodiversidad',
        pipelineStatus: 'APTO_PRELIMINARMENTE',
        contactDate: '2026-09-15',
        lastInteractionDate: '2026-10-01',
        notes: 'Disponibilidad confirmada para temporada de línea base en Cusco.',
        documentsChecklist: {
          cvReceived: true,
          colegiaturaReceived: true,
          habilitacionReceived: true,
          djReceived: false,
          contractDrafted: false
        },
        interviewsCount: 1
      },
      {
        id: 'agenda-003',
        professionalId: 'prof-pe-003',
        subsectorId: 'mineria',
        assignedRole: 'Especialista Social y Relaciones Comunitarias',
        pipelineStatus: 'DOCUMENTACION_SOLICITADA',
        contactDate: '2026-09-22',
        lastInteractionDate: '2026-09-28',
        notes: 'Interesado en participar en la MEIA. Pendiente entrega de constancias de facilitación.',
        documentsChecklist: {
          cvReceived: true,
          colegiaturaReceived: true,
          habilitacionReceived: false,
          djReceived: false,
          contractDrafted: false
        },
        interviewsCount: 1
      }
    ];
  });

  // Consulting firm profile state
  const [firmProfile, setFirmProfile] = useState<ConsultingFirmProfile>(() => {
    const saved = localStorage.getItem('rnca_firm_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      legalName: 'CONSORCIO AMBIENTAL DEL PERÚ S.A.C.',
      ruc: '20608912345',
      legalRepresentative: 'Ing. Alejandro Morales Vega',
      address: 'Av. Javier Prado Este 4200, Santiago de Surco, Lima',
      targetSubsectors: ['mineria', 'transportes', 'residuos_solidos'],
      registrationType: 'INSCRIPCION_NUEVA',
      assignedTeam: {
        'min-coord': 'prof-pe-001',
        'min-biologico': 'prof-pe-002',
        'min-social': 'prof-pe-003'
      },
      notes: 'Postulación prioritaria al RNCA ante SENACE para EIA-d y MEIA.',
      updatedAt: '2026-10-06'
    };
  });

  // Modals state
  const [activeProfileModal, setActiveProfileModal] = useState<Professional | null>(null);
  const [comparatorCandidates, setComparatorCandidates] = useState<Professional[] | null>(null);
  const [contactModalProf, setContactModalProf] = useState<Professional | null>(null);
  const [formulario4ModalProf, setFormulario4ModalProf] = useState<Professional | null>(null);
  const [formulario4SubsectorId, setFormulario4SubsectorId] = useState<SubsectorId>('transportes');
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [showDgaaDirectoryModal, setShowDgaaDirectoryModal] = useState(false);

  const handleOpenFormulario4 = (prof: Professional, subId?: SubsectorId) => {
    setFormulario4ModalProf(prof);
    if (subId) setFormulario4SubsectorId(subId);
    else if (selectedSubsectorId) setFormulario4SubsectorId(selectedSubsectorId);
    else setFormulario4SubsectorId('transportes');
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rnca_professionals_v5_dgaa_contacts', JSON.stringify(professionals));
  }, [professionals]);

  useEffect(() => {
    localStorage.setItem('rnca_agenda_v1', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    localStorage.setItem('rnca_firm_v1', JSON.stringify(firmProfile));
  }, [firmProfile]);

  // Actions
  const handleAddToAgenda = (prof: Professional) => {
    const existing = agenda.find(a => a.professionalId === prof.id);
    if (existing) {
      alert(`El profesional ${prof.fullName} ya se encuentra registrado en la agenda con el estado: ${existing.pipelineStatus}`);
      setActiveTab('agenda');
      return;
    }

    const newEntry: AgendaEntry = {
      id: `agenda-${Date.now()}`,
      professionalId: prof.id,
      subsectorId: selectedSubsectorId,
      assignedRole: prof.specialty || 'Especialista Técnico',
      pipelineStatus: 'IDENTIFICADO',
      contactDate: new Date().toISOString().split('T')[0],
      lastInteractionDate: new Date().toISOString().split('T')[0],
      notes: `Identificado con score de compatibilidad ${prof.scores.total}%.`,
      documentsChecklist: {
        cvReceived: false,
        colegiaturaReceived: prof.colegiaturaVerified,
        habilitacionReceived: prof.habilitacionVerified,
        djReceived: false,
        contractDrafted: false
      },
      interviewsCount: 0
    };

    setAgenda([newEntry, ...agenda]);
    alert(`✓ ${prof.fullName} ha sido añadido a la Agenda de Especialistas RNCA.`);
  };

  const handleAssignToFirmTeam = (requirementId: string, professionalId: string) => {
    setFirmProfile(prev => ({
      ...prev,
      assignedTeam: {
        ...prev.assignedTeam,
        [requirementId]: professionalId
      },
      updatedAt: new Date().toISOString()
    }));

    // Auto-update or add to agenda
    if (!agenda.some(a => a.professionalId === professionalId)) {
      const prof = professionals.find(p => p.id === professionalId);
      if (prof) {
        setAgenda(prev => [
          {
            id: `agenda-${Date.now()}`,
            professionalId,
            subsectorId: selectedSubsectorId,
            assignedRole: 'Rol Asignado en Equipo',
            pipelineStatus: 'APTO_PRELIMINARMENTE',
            lastInteractionDate: new Date().toISOString().split('T')[0],
            notes: 'Asignado al equipo propuesto de la consultora.',
            documentsChecklist: {
              cvReceived: true,
              colegiaturaReceived: prof.colegiaturaVerified,
              habilitacionReceived: prof.habilitacionVerified,
              djReceived: false,
              contractDrafted: false
            },
            interviewsCount: 1
          },
          ...prev
        ]);
      }
    }

    alert('✓ Asignación de rol actualizada en el equipo de la consultora.');
  };

  const handleConfirmContactLogged = (prof: Professional, medium: 'CARTA_OFICIAL' | 'LINKEDIN' | 'EMAIL' | 'WHATSAPP' | 'TELEFONO') => {
    setAgenda(prev => {
      const existing = prev.find(a => a.professionalId === prof.id);
      if (existing) {
        return prev.map(a => a.id === existing.id ? {
          ...a,
          pipelineStatus: 'CONTACTADO',
          contactDate: new Date().toISOString().split('T')[0],
          lastInteractionDate: new Date().toISOString().split('T')[0],
          notes: `${a.notes} [Comunicación formal enviada vía ${medium} el ${new Date().toLocaleDateString('es-PE')}]`
        } : a);
      } else {
        return [
          {
            id: `agenda-${Date.now()}`,
            professionalId: prof.id,
            subsectorId: selectedSubsectorId,
            assignedRole: prof.specialty || 'Especialista',
            pipelineStatus: 'CONTACTADO',
            contactDate: new Date().toISOString().split('T')[0],
            lastInteractionDate: new Date().toISOString().split('T')[0],
            notes: `Contacto inicial realizado vía ${medium}.`,
            documentsChecklist: {
              cvReceived: false,
              colegiaturaReceived: prof.colegiaturaVerified,
              habilitacionReceived: prof.habilitacionVerified,
              djReceived: false,
              contractDrafted: false
            },
            interviewsCount: 1
          },
          ...prev
        ];
      }
    });

    alert(`✓ Contacto registrado en la Agenda RNCA para ${prof.fullName}.`);
  };

  const handleImportNewProfessionals = (newProfs: Professional[]) => {
    // Avoid duplicate IDs
    const existingIds = new Set(professionals.map(p => p.id));
    const toAdd = newProfs.filter(p => !existingIds.has(p.id));
    setProfessionals([...toAdd, ...professionals]);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200">
      
      {/* 1. Privacy Banner (Ley 29733) */}
      <PrivacyBanner onOpenPolicy={() => setShowPrivacyPolicyModal(true)} />

      {/* 2. Institutional Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Title */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-inner">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg tracking-tight text-white">
                    RNCA
                  </span>
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider bg-slate-800 px-1.5 py-0.5 rounded">
                    Professional Finder
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 tracking-wide font-medium">
                  Registro Nacional de Consultoras Ambientales — SENACE
                </div>
              </div>
            </div>

            {/* Role Switcher & Quick Export */}
            <div className="hidden lg:flex items-center gap-3 text-xs">
              
              {/* Role selector */}
              <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">Rol:</span>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="bg-transparent font-bold text-emerald-400 focus:outline-hidden cursor-pointer"
                >
                  <option value="ADMIN" className="bg-slate-900 text-white">ADMIN</option>
                  <option value="CONSULTORA" className="bg-slate-900 text-white">CONSULTORA</option>
                  <option value="INVESTIGADOR" className="bg-slate-900 text-white">INVESTIGADOR</option>
                  <option value="AUDITOR" className="bg-slate-900 text-white">AUDITOR</option>
                  <option value="SOLO_LECTURA" className="bg-slate-900 text-white">SOLO LECTURA</option>
                </select>
              </div>

              {/* Guía Oficial GOB.PE/10768 Button */}
              <button
                onClick={() => setShowProcedureModal(true)}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded flex items-center gap-1.5 transition text-xs shadow-xs cursor-pointer"
                title="Procedimiento Oficial GOB.PE/10768 - Requisitos y Mínimo 6 Especialistas por Subsector"
              >
                <FileText className="w-3.5 h-3.5 text-slate-950" />
                Guía GOB.PE/10768
              </button>

              {/* Directorio DGAA / SENACE Button */}
              <button
                onClick={() => setShowDgaaDirectoryModal(true)}
                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white font-black rounded flex items-center gap-1.5 transition text-xs shadow-xs cursor-pointer border border-emerald-500/50"
                title="Directorio Oficial de Teléfonos, Anexos y Correos de Direcciones Generales de Asuntos Ambientales y SENACE"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                Directorio DGAA
              </button>

              {/* Quick Export Button */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => exportProfessionalsToExcel(professionals)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded font-medium flex items-center gap-1 transition"
                  title="Exportar base completa a Excel"
                >
                  <Download className="w-3 h-3 text-emerald-400" /> Excel
                </button>
                <button
                  onClick={() => exportProfessionalsToCsv(professionals)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded font-medium flex items-center gap-1 transition"
                  title="Exportar base a CSV"
                >
                  CSV
                </button>
              </div>

            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-950 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 py-1 text-xs">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Dashboard
            </button>

            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'requirements' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Requisitos RNCA
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'search' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" /> Buscador de Profesionales
            </button>

            <button
              onClick={() => setActiveTab('gap-analysis')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'gap-analysis' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Análisis de Brechas & Equipo
            </button>

            <button
              onClick={() => setActiveTab('firm')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'firm' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Mi Consultora
            </button>

            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'agenda' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" /> Agenda RNCA ({agenda.length})
            </button>

            <button
              onClick={() => setActiveTab('legal')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'legal' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Base Legal
            </button>

            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'sources' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" /> Importar Fuentes
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'audit' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" /> Modo Auditor
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-lg font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> Mapa Perú
            </button>

            <button
              onClick={() => setShowDgaaDirectoryModal(true)}
              className="ml-auto px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 rounded-lg font-bold text-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition shadow-xs"
              title="Directorio Oficial de Teléfonos, Anexos y Correos de Direcciones Generales de Asuntos Ambientales y SENACE"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Directorio Telefónico DGAA / SENACE
            </button>

            <button
              onClick={() => {
                const transportProf = professionals.find(p => (p.subsectorExperienceYears.transportes || 0) >= 5 || p.profession.toLowerCase().includes('civil')) || professionals[0];
                handleOpenFormulario4(transportProf, 'transportes');
              }}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer border border-amber-400"
              title="Abrir Evaluador de Formulario 4 y Recomendaciones SENACE (R.J. N.° 076-2016-SENACE/J)"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              Formulario 4 (R.J. 076-2016-SENACE/J)
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-slate-400">Rol Activo:</span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-slate-800 text-emerald-400 font-bold p-1 rounded"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="CONSULTORA">CONSULTORA</option>
                <option value="INVESTIGADOR">INVESTIGADOR</option>
                <option value="AUDITOR">AUDITOR</option>
                <option value="SOLO_LECTURA">SOLO LECTURA</option>
              </select>
            </div>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('requirements'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Requisitos RNCA
            </button>
            <button
              onClick={() => { setActiveTab('search'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Buscador de Profesionales
            </button>
            <button
              onClick={() => { setActiveTab('gap-analysis'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Análisis de Brechas
            </button>
            <button
              onClick={() => { setActiveTab('firm'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Mi Consultora
            </button>
            <button
              onClick={() => { setActiveTab('agenda'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Agenda ({agenda.length})
            </button>
            <button
              onClick={() => { setActiveTab('legal'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Base Legal
            </button>
            <button
              onClick={() => { setActiveTab('audit'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-white hover:text-emerald-400"
            >
              Modo Auditor
            </button>
            <button
              onClick={() => { setShowDgaaDirectoryModal(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 border-t border-slate-800 pt-3"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Directorio Oficial DGAA / SENACE
            </button>
          </div>
        )}
      </header>

      {/* 3. Main Views Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {activeTab === 'dashboard' && (
          <DashboardView
            subsectors={subsectors}
            professionals={professionals}
            legalNorms={legalNorms}
            agenda={agenda}
            selectedSubsector={selectedSubsectorId}
            onSelectSubsector={(id) => setSelectedSubsectorId(id)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenProfile={(p) => setActiveProfileModal(p)}
          />
        )}

        {activeTab === 'requirements' && (
          <RequirementsEngineView
            subsectors={subsectors}
            selectedSubsectorId={selectedSubsectorId}
            onSelectSubsector={(id) => setSelectedSubsectorId(id)}
            professionals={professionals}
            legalNorms={legalNorms}
            onOpenProfile={(p) => setActiveProfileModal(p)}
            onAddToAgenda={(p) => handleAddToAgenda(p)}
            onOpenFormulario4={(p) => handleOpenFormulario4(p, selectedSubsectorId)}
          />
        )}

        {activeTab === 'search' && (
          <ProfessionalSearchView
            professionals={professionals}
            subsectors={subsectors}
            selectedSubsectorId={selectedSubsectorId}
            onOpenProfile={(p) => setActiveProfileModal(p)}
            onAddToAgenda={(p) => handleAddToAgenda(p)}
            onOpenContactModal={(p) => setContactModalProf(p)}
            onCompareCandidates={(candidates) => setComparatorCandidates(candidates)}
            onOpenFormulario4={(p) => handleOpenFormulario4(p, selectedSubsectorId)}
          />
        )}

        {activeTab === 'gap-analysis' && (
          <GapAnalysisView
            subsectors={subsectors}
            selectedSubsectorId={selectedSubsectorId}
            onSelectSubsector={(id) => setSelectedSubsectorId(id)}
            professionals={professionals}
            firmProfile={firmProfile}
            onAssignToFirmTeam={(reqId, profId) => handleAssignToFirmTeam(reqId, profId)}
            onOpenProfile={(p) => setActiveProfileModal(p)}
            onNavigateFirm={() => setActiveTab('firm')}
          />
        )}

        {activeTab === 'firm' && (
          <ConsultingFirmView
            firmProfile={firmProfile}
            subsectors={subsectors}
            professionals={professionals}
            legalNorms={legalNorms}
            onUpdateFirmProfile={(updated) => setFirmProfile(updated)}
            onOpenProfile={(p) => setActiveProfileModal(p)}
            onNavigateSearch={() => setActiveTab('search')}
            onOpenFormulario4={(p) => handleOpenFormulario4(p, selectedSubsectorId)}
          />
        )}

        {activeTab === 'agenda' && (
          <AgendaView
            agenda={agenda}
            professionals={professionals}
            subsectors={subsectors}
            onUpdateAgendaEntry={(updated) => {
              setAgenda(agenda.map(a => a.id === updated.id ? updated : a));
            }}
            onRemoveAgendaEntry={(id) => {
              setAgenda(agenda.filter(a => a.id !== id));
            }}
            onOpenProfile={(p) => setActiveProfileModal(p)}
            onOpenContactModal={(p) => setContactModalProf(p)}
          />
        )}

        {activeTab === 'legal' && (
          <LegalMonitorView
            legalNorms={legalNorms}
            subsectors={subsectors}
          />
        )}

        {activeTab === 'sources' && (
          <CustomSourcesView
            onImportProfessionals={handleImportNewProfessionals}
            subsectors={subsectors}
            currentCount={professionals.length}
          />
        )}

        {activeTab === 'audit' && (
          <AuditView
            professionals={professionals}
            legalNorms={legalNorms}
            currentUserRole={userRole}
          />
        )}

        {activeTab === 'map' && (
          <MapView
            professionals={professionals}
            onOpenProfile={(p) => setActiveProfileModal(p)}
          />
        )}

      </main>

      {/* 4. Global Modals */}
      
      {/* Profile Detail Modal */}
      <ProfileModal
        professional={activeProfileModal}
        subsectors={subsectors}
        onClose={() => setActiveProfileModal(null)}
        onAddToAgenda={(p) => handleAddToAgenda(p)}
        onOpenContactModal={(p) => setContactModalProf(p)}
        onOpenFormulario4={(p) => handleOpenFormulario4(p, selectedSubsectorId)}
      />

      {/* Formulario 4 Official Modal */}
      {formulario4ModalProf && (
        <Formulario4Modal
          professional={formulario4ModalProf}
          subsector={subsectors.find(s => s.id === formulario4SubsectorId) || subsectors.find(s => s.id === selectedSubsectorId) || subsectors[0]}
          availableSubsectors={subsectors}
          onSubsectorChange={(s) => setFormulario4SubsectorId(s.id)}
          onClose={() => setFormulario4ModalProf(null)}
        />
      )}

      {/* Comparator Modal */}
      {comparatorCandidates && (
        <ComparatorModal
          candidates={comparatorCandidates}
          targetSubsector={selectedSubsectorId}
          onClose={() => setComparatorCandidates(null)}
          onRemoveCandidate={(id) => {
            const remaining = comparatorCandidates.filter(c => c.id !== id);
            if (remaining.length === 0) setComparatorCandidates(null);
            else setComparatorCandidates(remaining);
          }}
        />
      )}

      {/* Contact Formal Modal */}
      <ContactModal
        professional={contactModalProf}
        consultingFirmName={firmProfile.legalName}
        onClose={() => setContactModalProf(null)}
        onConfirmContactLogged={(p, medium) => handleConfirmContactLogged(p, medium)}
      />

      {/* Privacy Policy Modal */}
      {showPrivacyPolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-base text-slate-900">
                  Marco de Protección de Datos Personales (Ley N.° 29733 - Perú)
                </h3>
              </div>
              <button onClick={() => setShowPrivacyPolicyModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                <strong>1. Principio de Legalidad y Finalidad:</strong> El sistema RNCA Professional Finder opera exclusivamente como una herramienta técnica de consulta, verificación previa y organización de equipos consultores multidisciplinarios ante el Registro Nacional de Consultoras Ambientales de SENACE.
              </p>
              <p>
                <strong>2. Fuentes de Acceso Público:</strong> Conforme al Art. 14 inc. 4 de la Ley 29733, no se requiere consentimiento previo para el tratamiento de datos que provienen de fuentes de acceso público irrestricto, tales como la Plataforma Nacional de Datos Abiertos, el Registro Nacional de Grados y Títulos de SUNEDU, el Registro de Colegiados del Colegio de Ingenieros del Perú (CIP) y resoluciones públicas de certificación ambiental.
              </p>
              <p>
                <strong>3. Prohibición de Datos Sensibles y Personales Privados:</strong> El software prohíbe de forma absoluta la indexación masiva de direcciones domiciliarias privadas, teléfonos particulares no institucionales, fotografías familiares o datos financieros.
              </p>
              <p>
                <strong>4. Cláusula de No Vinculatoriedad:</strong> Los resultados arrojados por el sistema constituyen una guía preliminar de compatibilidad y NO representan una acreditación o resolución formal emitida por el SENACE.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowPrivacyPolicyModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Entendido y Conforme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RNCA Official Procedure Modal (gob.pe/10768) */}
      <RncaProcedureModal
        isOpen={showProcedureModal}
        onClose={() => setShowProcedureModal(false)}
        initialSubsectorId={selectedSubsectorId}
        onSelectSubsector={(id) => {
          setSelectedSubsectorId(id as SubsectorId);
          setActiveTab('requirements');
        }}
      />

      {/* DGAA & SENACE Directory Modal */}
      <DgaaDirectoryModal
        isOpen={showDgaaDirectoryModal}
        onClose={() => setShowDgaaDirectoryModal(false)}
        subsectorFilter={selectedSubsectorId}
      />

      {/* 5. Institutional Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-200">
              RNCA PROFESSIONAL FINDER — Sistema de Soporte Técnico en Evaluación de Impacto Ambiental
            </div>
            <p className="text-[11px] text-slate-400">
              Desarrollado en conformidad con la Ley N.° 27446 (SEIA), Ley N.° 29968 (SENACE), D.S. N.° 026-2021-MINAM y Ley N.° 29733 de Protección de Datos Personales.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <button onClick={() => setShowPrivacyPolicyModal(true)} className="hover:text-emerald-400 underline">
              Política de Privacidad
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('audit')} className="hover:text-emerald-400 underline">
              Modo Auditor
            </button>
            <span>•</span>
            <span className="text-slate-500 font-mono">v1.0.0 SEIA-SENACE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
