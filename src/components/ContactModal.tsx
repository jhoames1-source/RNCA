import React, { useState } from 'react';
import { X, Copy, Check, Mail, MessageSquare, ShieldAlert, Send } from 'lucide-react';
import { Professional } from '../types/rnca';

interface ContactModalProps {
  professional: Professional | null;
  consultingFirmName: string;
  onClose: () => void;
  onConfirmContactLogged: (prof: Professional, medium: 'EMAIL' | 'WHATSAPP') => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  professional,
  consultingFirmName,
  onClose,
  onConfirmContactLogged
}) => {
  const [copied, setCopied] = useState(false);
  const [userConfirmedDisclaimer, setUserConfirmedDisclaimer] = useState(false);
  const [activeTab, setActiveTab] = useState<'EMAIL' | 'WHATSAPP'>('EMAIL');

  if (!professional) return null;

  const emailSubject = `Invitación para conformar Equipo Multidisciplinario RNCA - SENACE — ${consultingFirmName}`;
  const emailBody = `Estimado(a) ${professional.fullName},

Esperamos se encuentre muy bien.

Nos ponemos en contacto desde la consultora ambiental ${consultingFirmName}. En el marco de nuestro proceso de inscripción y actualización técnica ante el Registro Nacional de Consultoras Ambientales (RNCA) administrado por el SENACE, hemos identificado su destacado perfil profesional y experiencia en evaluación de impacto ambiental.

Nos gustaría consultarle su disponibilidad para ser considerado(a) en la conformación de nuestro equipo profesional multidisciplinario para los subsectores pertinentes.

De ser de su interés, le agradeceremos nos pueda confirmar su disposición y facilitarnos una copia de su currículum vitae documentado actualizado, así como su constancia de habilitación profesional vigente.

Quedamos a su cordial respuesta.

Atentamente,

Equipo de Recursos Humanos y Gestión Ambiental
${consultingFirmName}
Contacto Institucional: tramites.rnca@consultora.pe`;

  const whatsappMessage = `Estimado(a) ${professional.fullName}, reciba un cordial saludo de parte de ${consultingFirmName}. 

Nos comunicamos para consultarle respetuosamente sobre su disponibilidad profesional para integrar nuestro equipo técnico multidisciplinario para el Registro Nacional de Consultoras Ambientales (RNCA - SENACE). 

¿Nos permitiría coordinar una breve llamada o enviarle los términos de referencia a su correo institucional? Muchas gracias.`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActionComplete = () => {
    if (!userConfirmedDisclaimer) return;
    onConfirmContactLogged(professional, activeTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold">Solicitud de Contacto Profesional</h2>
            <p className="text-xs text-slate-300">
              Generador de comunicaciones institucionales con el candidato: <strong>{professional.fullName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700">
          
          {/* Legal Protection Alert (Ley 29733) */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2.5 text-amber-900 text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>PROTOCOLO DE PRIVACIDAD OBLIGATORIO:</strong> El sistema no envía comunicaciones de forma automática masiva ni invasiva. 
              Usted debe revisar el contenido, autorizar el envío y utilizar exclusivamente los canales corporativos o institucionales públicos del destinatario.
            </div>
          </div>

          {/* Medium Selector */}
          <div className="flex border-b border-slate-200 gap-4">
            <button
              onClick={() => setActiveTab('EMAIL')}
              className={`pb-2.5 font-semibold text-xs flex items-center gap-1.5 border-b-2 cursor-pointer transition ${
                activeTab === 'EMAIL' 
                  ? 'border-emerald-600 text-emerald-800' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Mail className="w-4 h-4" /> Correo Institucional
            </button>
            <button
              onClick={() => setActiveTab('WHATSAPP')}
              className={`pb-2.5 font-semibold text-xs flex items-center gap-1.5 border-b-2 cursor-pointer transition ${
                activeTab === 'WHATSAPP' 
                  ? 'border-emerald-600 text-emerald-800' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Mensaje Directo Profesional
            </button>
          </div>

          {activeTab === 'EMAIL' ? (
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destinatario:</label>
                <input 
                  type="text" 
                  readOnly 
                  value={professional.publicProfessionalEmail || 'No publicado (solicitar mediante mesa de partes institucional)'} 
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Asunto:</label>
                <input 
                  type="text" 
                  readOnly 
                  value={emailSubject} 
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cuerpo del Mensaje:</label>
                <textarea 
                  rows={8} 
                  readOnly 
                  value={emailBody} 
                  className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-xs text-slate-800 leading-relaxed font-sans"
                />
              </div>
              <button
                onClick={() => handleCopy(emailBody)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded flex items-center gap-1 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado al portapapeles' : 'Copiar texto del correo'}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Corporativo Registrado:</label>
                <input 
                  type="text" 
                  readOnly 
                  value={professional.publicProfessionalPhone || 'No publicado (contacto directo en sede)'} 
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Texto del Mensaje:</label>
                <textarea 
                  rows={5} 
                  readOnly 
                  value={whatsappMessage} 
                  className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-xs text-slate-800 leading-relaxed font-sans"
                />
              </div>
              <button
                onClick={() => handleCopy(whatsappMessage)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded flex items-center gap-1 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado al portapapeles' : 'Copiar mensaje'}
              </button>
            </div>
          )}

          {/* Confirmation Checkbox */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
              <input
                type="checkbox"
                checked={userConfirmedDisclaimer}
                onChange={(e) => setUserConfirmedDisclaimer(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5"
              />
              <span>
                Confirmo que esta comunicación se realiza en nombre legal de la consultora <strong>{consultingFirmName}</strong> con fines legítimos de evaluación y que se registrará el contacto en la Agenda RNCA.
              </span>
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
          >
            Cancelar
          </button>
          <button
            disabled={!userConfirmedDisclaimer}
            onClick={handleActionComplete}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition shadow-sm ${
              userConfirmedDisclaimer 
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            Registrar Contacto en la Agenda RNCA
          </button>
        </div>

      </div>
    </div>
  );
};
