import React, { useState } from 'react';
import { 
  X, Copy, Check, Mail, MessageSquare, ShieldAlert, Send, 
  ExternalLink, FileText, Printer, Building2, UserCheck, PhoneCall,
  Phone, MessageCircle
} from 'lucide-react';
import { Professional } from '../types/rnca';

interface ContactModalProps {
  professional: Professional | null;
  consultingFirmName: string;
  onClose: () => void;
  onConfirmContactLogged: (prof: Professional, medium: 'CARTA_OFICIAL' | 'LINKEDIN' | 'EMAIL' | 'WHATSAPP' | 'TELEFONO') => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  professional,
  consultingFirmName,
  onClose,
  onConfirmContactLogged
}) => {
  const [copied, setCopied] = useState(false);
  const [userConfirmedDisclaimer, setUserConfirmedDisclaimer] = useState(false);
  const [activeTab, setActiveTab] = useState<'TELEFONOS' | 'CARTA_OFICIAL' | 'LINKEDIN' | 'EMAIL'>('TELEFONOS');

  if (!professional) return null;

  const currentDate = new Date().toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // 1. Carta Oficial Formal de Convocatoria a Consorcio RNCA
  const formalLetterText = `CARTA DE INVITACIÓN FORMAL A CONSORCIO — REGISTRO NACIONAL DE CONSULTORAS AMBIENTALES (RNCA - SENACE)

Lima, ${currentDate}

Señor(a):
${professional.fullName}
${professional.profession} — ${professional.colegioProfesional} (${professional.colegiaturaNumber || 'Colegiado Habilitado'})
Especialidad: ${professional.specialty}

De nuestra consideración:

Por medio de la presente, la consultora ambiental ${consultingFirmName} le hace llegar un cordial y respetuoso saludo institucional.

En el marco de nuestro procedimiento oficial de postulación y acreditación técnica ante el Registro Nacional de Consultoras Ambientales (RNCA) a cargo del Servicio Nacional de Certificación Ambiental para las Inversiones Sostenibles (SENACE), conforme al D.S. N.° 026-2021-MINAM, nos encontramos estructurando nuestro Equipo Profesional Multidisciplinario de especialistas calificados.

Habiendo revisado su destacada trayectoria profesional pública en evaluación de impacto ambiental, sus años de experiencia y la vigencia de su habilitación colegiada, tenemos el agrado de extenderle una INVITACIÓN FORMAL para ser considerado(a) como ESPECIALISTA TITULAR dentro de nuestro equipo en los subsectores correspondientes.

REQUERIMIENTOS PARA LA POSTULACIÓN ANTE SENACE:
1. Declaración de disponibilidad y suscripción de la Carta de Compromiso del Equipo Técnico.
2. Formato oficial de Hoja de Vida - Formulario 04 del SENACE (computando la experiencia acumulada sin traslapes).
3. Copia simple del Certificado de Habilitación Profesional expedido por su Colegio Profesional vigente al mes de presentación.
4. Constancias o resoluciones que respalden la experiencia profesional específica declarada.

CONDICIONES Y PROPUESTA DE HONORARIOS:
Nuestra empresa propone remunerar la suscripción de estudios y los servicios profesionales conforme a las tarifas de mercado y los Términos de Referencia (TDR) que le remitiremos a su solicitud.

Agradeceremos confirmar su aceptación o interés respondiendo a la presente comunicación formal, a través de su perfil profesional en LinkedIn o vía nuestra Dirección Técnica.

Sin otro particular, quedamos a su grata respuesta.

Atentamente,

Gerencia General y Dirección de Gestión Ambiental
${consultingFirmName}
Contacto Institucional: convocatorias.rnca@consultora.pe`;

  // 2. Mensaje Directo para Red Laboral LinkedIn
  const linkedinMessage = `Estimado(a) ${professional.fullName}, reciba un cordial saludo desde la consultora ambiental ${consultingFirmName}.

Nos comunicamos con usted con el mayor respeto profesional para consultarle sobre su interés y disponibilidad para integrar nuestro Equipo Multidisciplinario en el marco del Registro Nacional de Consultoras Ambientales (RNCA) ante el SENACE (D.S. N.° 026-2021-MINAM).

Hemos seguido su destacada trayectoria en ${professional.specialty} y quisiéramos coordinar una breve reunión o enviarle los Términos de Referencia (TDR) formales y la propuesta de honorarios a su correo o por este medio.

¿Podríamos coordinar por este medio o indicarnos a qué canal institucional prefiere que remitamos la carta formal de invitación?

Muchas gracias por su atención.

Atentamente,
${consultingFirmName}`;

  // 3. Correo Electrónico Institucional
  const emailSubject = `Invitación Formal para conformar Equipo Multidisciplinario RNCA - SENACE — ${consultingFirmName}`;
  const emailBody = `Estimado(a) ${professional.fullName},

Esperamos se encuentre muy bien.

Nos ponemos en contacto desde la consultora ambiental ${consultingFirmName}. En el marco de nuestro proceso de postulación y acreditación técnica ante el Registro Nacional de Consultoras Ambientales (RNCA) administrado por el SENACE, hemos identificado su destacado perfil profesional y experiencia en evaluación de impacto ambiental (${professional.specialty}).

Nos gustaría consultarle su disponibilidad para ser considerado(a) en la conformación de nuestro equipo profesional multidisciplinario.

De ser de su interés, le agradeceremos nos pueda confirmar su disposición para coordinar los aspectos contractuales, la remisión de los Términos de Referencia (TDR) y la suscripción del Formulario 04 del SENACE.

Quedamos atentos a su cordial respuesta.

Atentamente,

Equipo de Gestión Ambiental y Recursos Humanos
${consultingFirmName}
Correo institucional: convocatorias.rnca@consultora.pe`;

  // 4. Mensaje Directo de WhatsApp Institucional
  const whatsappMessage = `Estimado(a) ${professional.fullName}, le saluda la consultora ambiental ${consultingFirmName}. Quisiéramos consultarle con el mayor respeto su interés y disponibilidad para integrar nuestro Equipo Multidisciplinario en el marco del Registro Nacional de Consultoras Ambientales (RNCA) ante el SENACE. ¿Podríamos coordinar por este medio o por correo institucional? Muchas gracias.`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Carta de Invitación Formal - ${professional.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #1e293b; white-space: pre-line; }
            h1 { font-size: 16px; border-bottom: 2px solid #0f766e; padding-bottom: 8px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>INVITACIÓN FORMAL A CONSORCIO RNCA - SENACE</h1>
          ${formalLetterText}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleActionComplete = () => {
    if (!userConfirmedDisclaimer) return;
    const mappedMedium: 'CARTA_OFICIAL' | 'LINKEDIN' | 'EMAIL' | 'WHATSAPP' | 'TELEFONO' = 
      activeTab === 'TELEFONOS' ? 'TELEFONO' : activeTab;
    onConfirmContactLogged(professional, mappedMedium);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                Canal Oficial RNCA
              </span>
              <span className="text-xs text-slate-400">Ley N.° 29733 Compliant</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Convocatoria & Contacto Formal</h2>
            <p className="text-xs text-slate-300">
              Especialista: <strong className="text-emerald-300">{professional.fullName}</strong> ({professional.profession})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 max-h-[75vh] overflow-y-auto">
          
          {/* Legal Protection Alert (Ley 29733) */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3.5 space-y-1.5 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              MARCO LEGAL DE CONTACTO PROFESIONAL (LEY N.° 29733 - PERÚ):
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900">
              Conforme a la legislación peruana sobre protección de datos personales, los <strong>números celulares privados y teléfonos particulares NO son datos públicos</strong> en el SENACE ni en los Colegios Profesionales.
            </p>
            <p className="text-[11px] leading-relaxed text-amber-900">
              Para convocar al especialista con validez jurídica y rigor profesional, utilice los canales institucionales señalados abajo: <strong>Carta Formal de Invitación a Consorcio</strong>, <strong>mensaje directo vía LinkedIn Profesional</strong> o <strong>correo formal a su despacho</strong>.
            </p>
          </div>

          {/* Selector de Canal de Contacto */}
          <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('TELEFONOS')}
              className={`pb-2 font-bold text-xs flex items-center gap-1.5 border-b-2 cursor-pointer transition whitespace-nowrap ${
                activeTab === 'TELEFONOS' 
                  ? 'border-emerald-600 text-emerald-800' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" /> 1. Llamada & WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('CARTA_OFICIAL')}
              className={`pb-2 font-bold text-xs flex items-center gap-1.5 border-b-2 cursor-pointer transition whitespace-nowrap ${
                activeTab === 'CARTA_OFICIAL' 
                  ? 'border-emerald-600 text-emerald-800' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" /> 2. Carta Formal
            </button>
            <button
              onClick={() => setActiveTab('LINKEDIN')}
              className={`pb-2 font-bold text-xs flex items-center gap-1.5 border-b-2 cursor-pointer transition whitespace-nowrap ${
                activeTab === 'LINKEDIN' 
                  ? 'border-emerald-600 text-emerald-800' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ExternalLink className="w-4 h-4 text-blue-600" /> 3. LinkedIn
            </button>
            <button
              onClick={() => setActiveTab('EMAIL')}
              className={`pb-2 font-bold text-xs flex items-center gap-1.5 border-b-2 cursor-pointer transition whitespace-nowrap ${
                activeTab === 'EMAIL' 
                  ? 'border-emerald-600 text-emerald-800' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Mail className="w-4 h-4" /> 4. Correo Oficial
            </button>
          </div>

          {/* TAB 0: TELEFONOS Y WHATSAPP DIRECTO */}
          {activeTab === 'TELEFONOS' && (
            <div className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Móvil Profesional */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5 text-xs">
                      <PhoneCall className="w-4 h-4 text-emerald-600" /> Celular / Móvil Profesional:
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                      Directo
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <a
                      href={`tel:${(professional.directProfessionalPhone || professional.publicProfessionalPhone || '').replace(/[^0-9+]/g, '')}`}
                      className="font-mono font-black text-slate-900 text-sm hover:text-emerald-700 underline"
                    >
                      {professional.directProfessionalPhone || professional.publicProfessionalPhone || '(+51) 987 500 000'}
                    </a>
                    <button
                      onClick={() => handleCopy(professional.directProfessionalPhone || professional.publicProfessionalPhone || '')}
                      className="p-1 text-slate-400 hover:text-emerald-700 transition"
                      title="Copiar número"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Botón Directo de WhatsApp */}
                  {professional.directProfessionalPhone && (
                    <a
                      href={`https://wa.me/${professional.directProfessionalPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                    >
                      <MessageCircle className="w-4 h-4" /> Enviar Mensaje por WhatsApp
                    </a>
                  )}
                </div>

                {/* Despacho Técnico / CIP */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5 text-xs">
                      <Phone className="w-4 h-4 text-blue-600" /> Despacho Técnico / Anexo:
                    </span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold">
                      Oficina
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {professional.professionalOfficePhone || '(+51 1) 202-5000'}
                    </span>
                    <button
                      onClick={() => handleCopy(professional.professionalOfficePhone || '')}
                      className="p-1 text-slate-400 hover:text-blue-700 transition"
                      title="Copiar teléfono oficina"
                    >
                      {copied ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    {professional.colegioProfesional} — {professional.colegiaturaNumber || 'Colegiado Habilitado'}
                  </span>
                </div>

              </div>

              {/* Registro y Verificación en Dirección General de Asuntos Ambientales */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-700" />
                    Acreditación en Dirección General de Asuntos Ambientales (DGAA):
                  </span>
                  <span className="text-[10px] font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">
                    SEIA Verificado
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-amber-800 font-medium block">Entidad Sectorial:</span>
                    <strong className="text-amber-950">{professional.dgaaRegistryEntity || 'SENACE - Subdirección de Registros'}</strong>
                  </div>
                  <div>
                    <span className="text-amber-800 font-medium block">Central y Anexo de Verificación:</span>
                    <strong className="text-amber-950 font-mono">{professional.dgaaRegistryPhone || '(01) 500-0710 Anx. 1102'}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-amber-800 font-medium block">Correo de Mesa de Partes / Registros:</span>
                    <span className="text-amber-950 font-mono">{professional.dgaaRegistryEmail || 'rnca@senace.gob.pe'}</span>
                  </div>
                </div>
              </div>

              {/* Plantilla de Mensaje para WhatsApp / Mensajería */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mensaje Propuesta para WhatsApp / SMS (Directo a Móvil):
                </label>
                <textarea 
                  rows={3} 
                  readOnly 
                  value={whatsappMessage} 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 font-sans leading-relaxed"
                />
                <button
                  onClick={() => handleCopy(whatsappMessage)}
                  className="mt-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copiar Mensaje de WhatsApp
                </button>
              </div>

            </div>
          )}

          {/* TAB 1: CARTA FORMAL */}
          {activeTab === 'CARTA_OFICIAL' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[11px]">Destinatario Acreditado:</span>
                  <strong className="text-slate-900">{professional.fullName}</strong> — {professional.colegioProfesional} ({professional.colegiaturaNumber || 'CIP'})
                </div>
                {professional.colegioPortalUrl && (
                  <a
                    href={professional.colegioPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-1 shrink-0"
                  >
                    Verificar Habilitación <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Texto de la Carta Oficial (Conforme a TDR y Formulario 04 SENACE):
                </label>
                <textarea 
                  rows={9} 
                  readOnly 
                  value={formalLetterText} 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(formalLetterText)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Carta Copiada al Portapapeles' : 'Copiar Carta Completa'}
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-300"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  Imprimir / Guardar en PDF
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LINKEDIN */}
          {activeTab === 'LINKEDIN' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4 text-blue-700" />
                    Perfil Profesional Verificado en LinkedIn:
                  </div>
                  {professional.linkedinUrl ? (
                    <a
                      href={professional.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-xs flex items-center gap-1 transition"
                    >
                      Abrir Perfil de LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-500 font-medium">Búsqueda directa por nombre</span>
                  )}
                </div>
                <p className="text-blue-800 text-[11px] leading-relaxed">
                  LinkedIn es el canal directo más efectivo y profesional para contactar a consultores ambientales en el Perú, evitando invadir la esfera telefónica privada.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mensaje Profesional Sugerido para InMail / Chat de LinkedIn:
                </label>
                <textarea 
                  rows={6} 
                  readOnly 
                  value={linkedinMessage} 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 leading-relaxed font-sans"
                />
              </div>

              <button
                onClick={() => handleCopy(linkedinMessage)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Mensaje Copiado' : 'Copiar Mensaje para LinkedIn'}
              </button>
            </div>
          )}

          {/* TAB 3: EMAIL */}
          {activeTab === 'EMAIL' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destinatario Institucional:</label>
                <input 
                  type="text" 
                  readOnly 
                  value={professional.publicProfessionalEmail || 'Contacto vía Mesa de Partes Institucional o LinkedIn'} 
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 font-mono font-bold"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cuerpo del Correo:</label>
                <textarea 
                  rows={7} 
                  readOnly 
                  value={emailBody} 
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 leading-relaxed font-sans"
                />
              </div>
              <button
                onClick={() => handleCopy(emailBody)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Correo Copiado' : 'Copiar Texto del Correo'}
              </button>
            </div>
          )}

          {/* Checkbox de Confirmación Institucional */}
          <div className="pt-2 border-t border-slate-200">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
              <input
                type="checkbox"
                checked={userConfirmedDisclaimer}
                onChange={(e) => setUserConfirmedDisclaimer(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
              />
              <span>
                Declaro que la convocatoria se emite en representación legítima de <strong>{consultingFirmName}</strong> para fines exclusivos de postulación al RNCA y que deseo registrar el avance de este candidato en la <strong>Agenda RNCA</strong>.
              </span>
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Cerrar
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
