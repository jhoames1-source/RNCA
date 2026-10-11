import React, { useState } from 'react';
import { MapPin, Users, Building2, CheckCircle2, Award } from 'lucide-react';
import { Professional } from '../types/rnca';

interface MapViewProps {
  professionals: Professional[];
  onOpenProfile: (prof: Professional) => void;
}

export const MapView: React.FC<MapViewProps> = ({ professionals, onOpenProfile }) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  // Group professionals by department
  const deptCounts: Record<string, number> = {};
  professionals.forEach(p => {
    deptCounts[p.department] = (deptCounts[p.department] || 0) + 1;
  });

  const departmentsList = Object.keys(deptCounts).sort();

  const filteredProfs = selectedDept === 'ALL'
    ? professionals
    : professionals.filter(p => p.department === selectedDept);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            Distribución Geográfica Profesional por Región (Perú)
          </h2>
          <p className="text-xs text-slate-500">
            Ubicación laboral y sede institucional pública de los especialistas registrados. No se divulgan domicilios particulares (Ley 29733).
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            onClick={() => setSelectedDept('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedDept === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Todo el Perú ({professionals.length})
          </button>
          {departmentsList.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedDept === dept ? 'bg-emerald-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{dept}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedDept === dept ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-200 text-slate-700'
              }`}>
                {deptCounts[dept]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Section: Regional Grid & List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Regions Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">
            Densidad de Especialistas por Departamento
          </h3>
          <div className="space-y-2 text-xs">
            {departmentsList.map(dept => {
              const count = deptCounts[dept];
              const pct = Math.round((count / professionals.length) * 100);
              return (
                <div 
                  key={dept} 
                  onClick={() => setSelectedDept(dept)}
                  className={`p-2.5 rounded-lg border transition cursor-pointer ${
                    selectedDept === dept ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold text-slate-800">
                    <span>{dept}</span>
                    <span className="text-emerald-700">{count} especialistas ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-emerald-600 h-1.5 rounded-full" 
                      style={{ width: `${Math.max(pct, 12)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professionals in Selected Region */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Especialistas en {selectedDept === 'ALL' ? 'todo el Perú' : selectedDept} ({filteredProfs.length})
            </h3>
            <span className="text-xs text-slate-400 font-mono">SEIA / RNCA</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredProfs.map(prof => (
              <div 
                key={prof.id} 
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-lg transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      onClick={() => onOpenProfile(prof)}
                      className="font-bold text-slate-900 text-sm hover:text-emerald-700 cursor-pointer"
                    >
                      {prof.fullName}
                    </span>
                    {prof.senaceSpecialist && (
                      <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded font-semibold">
                        SENACE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <strong>{prof.profession}</strong> — {prof.specialty}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>Sede: {prof.city}, {prof.department}</span>
                    <span>•</span>
                    <span>Univ: {prof.university}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-700">{prof.scores.total}%</div>
                    <div className="text-[10px] text-slate-400">Score</div>
                  </div>
                  <button
                    onClick={() => onOpenProfile(prof)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold"
                  >
                    Ver Ficha
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
