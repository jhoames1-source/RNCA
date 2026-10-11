import * as XLSX from 'xlsx';
import { Professional, SubsectorDefinition, AgendaEntry, LegalNorm } from '../types/rnca';
import { SubsectorGapAnalysis, RequirementGap } from './gapEngine';

export function exportProfessionalsToExcel(professionals: Professional[], filename = 'rnca_profesionales.xlsx') {
  const data = professionals.map(p => ({
    'ID': p.id,
    'Nombre Completo': p.fullName,
    'Profesión': p.profession,
    'Especialidad': p.specialty,
    'Universidad': p.university,
    'Región': p.department,
    'Años Exp. Estimada': p.yearsExperienceEstimated,
    'Años Exp. Ambiental': p.environmentalExperienceYears,
    'Colegio Profesional': p.colegioProfesional,
    'Colegiatura N°': p.colegiaturaNumber || 'No registrada',
    'Colegiatura Verificada': p.colegiaturaVerified ? 'SÍ' : 'NO',
    'Habilitación Verificada': p.habilitacionVerified ? 'SÍ' : 'NO',
    'Nómina SENACE': p.senaceSpecialist ? 'SÍ' : 'NO',
    'Resolución SENACE': p.senaceSpecialistResolution || 'N/A',
    'Score Total (100)': p.scores.total,
    'Nivel Confianza': p.confidenceLevel,
    'Estado Verificación': p.verificationStatus,
    'Alerta Homónimo': p.isHomonymSuspect ? 'SÍ' : 'NO',
    'Alerta Inconsistencia': p.fraudSuspect ? 'SÍ' : 'NO',
    'Contacto Institucional': p.publicProfessionalEmail || 'No publicado',
    'Última Verificación': p.last_verified_at
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Profesionales RNCA');
  XLSX.writeFile(workbook, filename);
}

export function exportComplianceMatrixToExcel(
  gapAnalysis: SubsectorGapAnalysis,
  filename = 'rnca_matriz_cumplimiento.xlsx'
) {
  const data = gapAnalysis.gaps.map((g, idx) => ({
    'Ítem': idx + 1,
    'Rol Requerido': g.requirement.role,
    'Profesiones Admitidas': g.requirement.requiredProfessions.join(', '),
    'Años Mínimos Subsector': g.requirement.minYearsExperienceSpecific,
    'Base Normativa': `${g.requirement.legalBasis.norm} - ${g.requirement.legalBasis.article}`,
    'Estado Cobertura': g.status,
    'Profesional Asignado': g.assignedCandidate ? g.assignedCandidate.fullName : 'VACANTE',
    'Profesión Asignado': g.assignedCandidate ? g.assignedCandidate.profession : 'N/A',
    'Colegiatura': g.assignedCandidate ? (g.assignedCandidate.colegiaturaVerified ? 'VERIFICADA' : 'NO VERIFICADA') : 'N/A',
    'Score Compatibilidad': g.assignedCandidate ? `${g.assignedCandidate.scores.total}%` : '0%',
    'Observaciones Técnicas': g.notes
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Matriz ${gapAnalysis.subsector.name}`);
  XLSX.writeFile(workbook, filename);
}

export function exportAgendaToExcel(
  agenda: AgendaEntry[],
  professionals: Professional[],
  subsectors: SubsectorDefinition[],
  filename = 'rnca_agenda_especialistas.xlsx'
) {
  const data = agenda.map(a => {
    const prof = professionals.find(p => p.id === a.professionalId);
    const sub = subsectors.find(s => s.id === a.subsectorId);
    return {
      'ID Candidato': a.professionalId,
      'Nombre': prof?.fullName || 'Desconocido',
      'Profesión': prof?.profession || 'N/A',
      'Subsector Objetivo': sub?.name || a.subsectorId,
      'Rol Propuesto': a.assignedRole,
      'Estado en Pipeline': a.pipelineStatus,
      'Fecha Contacto': a.contactDate || 'Pendiente',
      'Última Interacción': a.lastInteractionDate,
      'Honorarios Propuestos': a.proposedFee || 'Por negociar',
      'CV Recibido': a.documentsChecklist.cvReceived ? 'SÍ' : 'NO',
      'Colegiatura Recibida': a.documentsChecklist.colegiaturaReceived ? 'SÍ' : 'NO',
      'Habilitación Recibida': a.documentsChecklist.habilitacionReceived ? 'SÍ' : 'NO',
      'Declaración Jurada': a.documentsChecklist.djReceived ? 'SÍ' : 'NO',
      'Contrato Borrador': a.documentsChecklist.contractDrafted ? 'SÍ' : 'NO',
      'Notas': a.notes
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Agenda Especialistas');
  XLSX.writeFile(workbook, filename);
}

export function exportProfessionalsToCsv(professionals: Professional[], filename = 'rnca_profesionales.csv') {
  const worksheet = XLSX.utils.json_to_sheet(professionals.map(p => ({
    id: p.id,
    fullName: p.fullName,
    profession: p.profession,
    specialty: p.specialty,
    department: p.department,
    yearsExp: p.yearsExperienceEstimated,
    envYearsExp: p.environmentalExperienceYears,
    score: p.scores.total,
    status: p.verificationStatus,
    senaceSpecialist: p.senaceSpecialist ? 'true' : 'false'
  })));
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export interface OfficialReportData {
  subsector: SubsectorDefinition;
  legalNorms: LegalNorm[];
  gapAnalysis: SubsectorGapAnalysis;
  recommendedTeam: {
    role: string;
    candidateName: string;
    profession: string;
    score: number;
    evidenceSummary: string;
  }[];
  alternativeCandidates: {
    candidateName: string;
    profession: string;
    score: number;
  }[];
  consultingFirmName?: string;
}

export function printOfficialRncaReport(data: OfficialReportData) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>INFORME TÉCNICO PREVIO RNCA - ${data.subsector.name.toUpperCase()}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; margin: 40px; font-size: 12px; line-height: 1.5; }
        .header { border-bottom: 3px solid #0f766e; padding-bottom: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
        .title { font-size: 20px; font-weight: bold; color: #0f172a; margin: 0; }
        .subtitle { font-size: 13px; color: #0f766e; font-weight: 600; margin-top: 4px; }
        .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .meta-item strong { color: #334155; }
        .section-title { font-size: 14px; font-weight: bold; color: #0f766e; border-left: 4px solid #0f766e; padding-left: 8px; margin: 20px 0 10px 0; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 11px; }
        th { background: #f1f5f9; color: #1e293b; text-align: left; padding: 8px; border: 1px solid #cbd5e1; font-weight: 600; }
        td { padding: 8px; border: 1px solid #cbd5e1; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
        .badge-green { background: #dcfce7; color: #166534; }
        .badge-amber { background: #fef3c7; color: #92400e; }
        .badge-red { background: #fee2e2; color: #991b1b; }
        .legal-notice { background: #fffbeb; border: 1px solid #fde68a; border-left: 5px solid #d97706; padding: 12px; margin: 24px 0; border-radius: 4px; font-size: 11px; color: #78350f; }
        .footer { border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 30px; font-size: 10px; color: #64748b; text-align: center; }
        @media print {
          body { margin: 20mm; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">EXPEDIENTE PREVIO DE CONFORMACIÓN TÉCNICA MULTIDISCIPLINARIA</div>
          <div class="subtitle">REGISTRO NACIONAL DE CONSULTORAS AMBIENTALES — RNCA (SENACE PERÚ)</div>
        </div>
        <div style="text-align: right; font-size: 10px; color: #64748b;">
          CÓDIGO: EXP-RNCA-${data.subsector.code}-${new Date().getFullYear()}<br>
          FECHA: ${new Date().toLocaleDateString('es-PE')}
        </div>
      </div>

      <div class="meta-box">
        <div class="meta-item"><strong>Consultora Evaluada:</strong> ${data.consultingFirmName || 'Consultora Ambiental Postulante'}</div>
        <div class="meta-item"><strong>Subsector Solicitado:</strong> ${data.subsector.name} (${data.subsector.sectorMinistry})</div>
        <div class="meta-item"><strong>Autoridad Competente:</strong> ${data.subsector.authoritySenace ? 'SENACE (Subsector Transferido)' : 'Sectorial / Gobierno Regional'}</div>
        <div class="meta-item"><strong>Nivel de Cobertura Actual:</strong> ${data.gapAnalysis.compliancePercentage}% (${data.gapAnalysis.coveredRolesCount}/${data.gapAnalysis.totalRequiredRoles} roles cubiertos)</div>
      </div>

      <div class="section-title">1. Base Normativa Aplicable</div>
      <p style="margin: 4px 0 10px 0;">El presente estudio y evaluación previa se rige conforme a la siguiente normativa oficial de la República del Perú:</p>
      <table>
        <thead>
          <tr>
            <th>Norma</th>
            <th>Autoridad</th>
            <th>Estado</th>
            <th>Materia Regulada</th>
          </tr>
        </thead>
        <tbody>
          ${data.legalNorms.map(n => `
            <tr>
              <td><strong>${n.code}</strong><br><span style="font-size: 10px; color: #64748b;">${n.title}</span></td>
              <td>${n.authority}</td>
              <td><span class="badge ${n.status === 'VIGENTE' ? 'badge-green' : 'badge-amber'}">${n.status}</span></td>
              <td>${n.summary}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="section-title">2. Conformación Mínima Exigida vs. Matriz de Cumplimiento</div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Rol Multidisciplinario</th>
            <th>Profesiones Requeridas</th>
            <th>Exp. Mínima</th>
            <th>Profesional Asignado</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${data.gapAnalysis.gaps.map((g, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><strong>${g.requirement.role}</strong></td>
              <td>${g.requirement.requiredProfessions.join(', ')}</td>
              <td>${g.requirement.minYearsExperienceSpecific} años en ${data.subsector.name}</td>
              <td>${g.assignedCandidate ? `${g.assignedCandidate.fullName} (${g.assignedCandidate.profession})` : '<em>VACANTE</em>'}</td>
              <td>
                <span class="badge ${g.status === 'CUBIERTO_TOTAL' ? 'badge-green' : g.status === 'CUBIERTO_PARCIAL' ? 'badge-amber' : 'badge-red'}">
                  ${g.status}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="section-title">3. Equipo Recomendado por Combinación Óptima</div>
      <table>
        <thead>
          <tr>
            <th>Rol</th>
            <th>Profesional Recomendado</th>
            <th>Profesión</th>
            <th>Score</th>
            <th>Evidencia y Justificación Técnica</th>
          </tr>
        </thead>
        <tbody>
          ${data.recommendedTeam.map(t => `
            <tr>
              <td><strong>${t.role}</strong></td>
              <td>${t.candidateName}</td>
              <td>${t.profession}</td>
              <td><strong>${t.score}%</strong></td>
              <td>${t.evidenceSummary}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="section-title">4. Análisis de Brechas y Pendientes Críticos</div>
      <p>
        ${data.gapAnalysis.vacantRolesCount > 0 
          ? `Se identificaron <strong>${data.gapAnalysis.vacantRolesCount} vacantes críticas</strong> que impiden la presentación formal de la solicitud de inscripción/modificación en el RNCA ante SENACE. Se debe completar la documentación sustentatoria o contratar los perfiles recomendados.` 
          : 'El equipo propuesto cubre preliminarmente el 100% de la conformación técnica multidisciplinaria exigida por la normativa vigente.'}
      </p>

      <div class="legal-notice">
        <strong>ADVERTENCIA LEGAL Y DISPOSITION OBLIGATORIA:</strong><br>
        El presente documento constituye un informe preliminar de compatibilidad técnica y búsqueda de evidencias públicas generado por el software RNCA Professional Finder. 
        <strong>NO CONSTITUYE APROBACIÓN, CONSTANCIA NI RESOLUCIÓN DE RECONOCIMIENTO OFICIAL POR EL SENACE NI AUTORIDAD SECTORIAL.</strong><br>
        Toda postulación o trámite ante el Registro Nacional de Consultoras Ambientales requiere la verificación documental estricta de copias legalizadas, contratos, constancias de trabajo, certificados de habilitación vigentes y declaración jurada conforme al T.U.O. de la Ley N.° 27444.
      </div>

      <div class="footer">
        RNCA PROFESSIONAL FINDER &copy; ${new Date().getFullYear()} — Plataforma de Soporte Técnico Especializado en Evaluación de Impacto Ambiental — Sistema SEIA Perú
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <button onclick="window.print()" style="padding: 10px 24px; background: #0f766e; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
          IMPRIMIR O GUARDAR COMO PDF
        </button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

export function exportFormulario4ToExcel(
  professional: Professional,
  subsectorName: string,
  careerCategory: 'VINCULADA_SECTOR' | 'TRANSVERSAL',
  experiences: {
    clientOrEntity: string;
    functions: string;
    startDate: string;
    endDate: string;
    years: number;
    months: number;
    days: number;
    folios: string;
  }[],
  filename = `Formulario_4_${professional.fullName.replace(/\s+/g, '_')}.xlsx`,
  resolutionCode = 'R.J. N.° 076-2016-SENACE/J y D.S. N.° 026-2021-MINAM'
) {
  const metaRows = [
    { 'N°': 'FORMULARIO 4', 'NOMBRE DE LA EMPRESA O ENTIDAD': 'CURRÍCULUM VITAE DEL/LA PROFESIONAL - SENACE' },
    { 'N°': 'Norma Legal:', 'NOMBRE DE LA EMPRESA O ENTIDAD': `${resolutionCode} y D.S. N.° 026-2021-MINAM` },
    { 'N°': 'Profesional:', 'NOMBRE DE LA EMPRESA O ENTIDAD': professional.fullName },
    { 'N°': 'Profesión / Carrera:', 'NOMBRE DE LA EMPRESA O ENTIDAD': professional.profession },
    { 'N°': 'Colegiatura y Habilitación:', 'NOMBRE DE LA EMPRESA O ENTIDAD': `${professional.colegioProfesional} ${professional.colegiaturaNumber || ''} - ${professional.habilitacionVerified ? 'HABILITADO' : 'OBSERVADO'}` },
    { 'N°': 'Subsector Materia de Solicitud:', 'NOMBRE DE LA EMPRESA O ENTIDAD': subsectorName },
    { 'N°': 'Categoría Formulario 4:', 'NOMBRE DE LA EMPRESA O ENTIDAD': careerCategory === 'VINCULADA_SECTOR' ? `Carrera Vinculada al Sector (${subsectorName} - Mínimo 5 años en el sector)` : 'Carrera Transversal (Mínimo 5 años en SEIA)' },
    { 'N°': '', 'NOMBRE DE LA EMPRESA O ENTIDAD': '' }
  ];

  const tableRows = experiences.map((exp, idx) => ({
    'N°': idx + 1,
    'NOMBRE DE LA EMPRESA O ENTIDAD': exp.clientOrEntity,
    'BREVE DESCRIPCIÓN DE LAS FUNCIONES Y/O ACTIVIDADES DESARROLLADAS (*)': exp.functions,
    'FECHA INICIO (dd/mm/aaaa)': exp.startDate,
    'FECHA FIN (dd/mm/aaaa)': exp.endDate,
    'AÑOS': exp.years,
    'MESES': exp.months,
    'DÍAS': exp.days,
    'FOLIOS (DEL - AL)': exp.folios
  }));

  const combined = [...metaRows, ...tableRows];
  const worksheet = XLSX.utils.json_to_sheet(combined);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Formulario 4 SENACE');
  XLSX.writeFile(workbook, filename);
}
