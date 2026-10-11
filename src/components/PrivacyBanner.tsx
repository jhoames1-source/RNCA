import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface PrivacyBannerProps {
  onOpenPolicy: () => void;
}

export const PrivacyBanner: React.FC<PrivacyBannerProps> = ({ onOpenPolicy }) => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Protección de Datos (Ley N.° 29733 Perú):</strong> Solo se indexa información profesional pública institucional. 
            No se recolectan números personales privados ni domicilios particulares.
          </span>
        </div>
        <button
          onClick={onOpenPolicy}
          className="text-emerald-400 hover:text-emerald-300 underline font-medium flex items-center gap-1 cursor-pointer shrink-0"
        >
          <Info className="w-3.5 h-3.5" />
          Políticas de Verificación y Privacidad
        </button>
      </div>
    </div>
  );
};
