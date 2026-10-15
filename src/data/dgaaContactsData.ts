import { DgaaContactEntity } from '../types/rnca';

export const DGAA_CONTACTS_DATA: DgaaContactEntity[] = [
  {
    id: 'senace-rnca',
    name: 'Servicio Nacional de Certificación Ambiental para las Inversiones Sostenibles',
    abbreviation: 'SENACE - RNCA',
    ministryOrAuthority: 'SENACE (Ente Rector del RNCA - D.S. N.° 026-2021-MINAM)',
    subsectors: ['mineria', 'electricidad', 'hidrocarburos', 'transportes', 'agricultura', 'residuos_solidos', 'industria', 'comercio', 'pesca', 'saneamiento', 'vivienda'],
    address: 'Av. Antonio Miró Quesada N.° 425, Piso 18, Complejo Empresarial Juan de Aliaga, Magdalena del Mar, Lima',
    centralPhone: '(+51 1) 500-0710',
    tollFreeLine: '0800-00860 (Línea Gratuita Nacional)',
    cellOrWhatsapp: '(+51) 987 564 321 / (+51) 954 112 340 (Atención Ciudadana y Consultoras)',
    annexes: [
      {
        area: 'Subdirección de Registros Ambientales (RNCA)',
        annex: '1102 / 1105',
        description: 'Inscripción, modificación y renovación de Consultoras Ambientales y verificación del equipo multidisciplinario (Formularios 03 y 04).'
      },
      {
        area: 'Mesa de Partes Virtual y Pagos TUPA',
        annex: '1020 / 1021',
        description: 'Validación de transferencias bancarias TUPA (S/ 480.00 / S/ 716.40) y recepción documental.'
      },
      {
        area: 'Dirección de Certificación Ambiental (DCA - Minería y Energía)',
        annex: '1210 / 1215',
        description: 'Evaluación técnica de EIA-d y MEIA en Minería, Electricidad e Hidrocarburos.'
      },
      {
        area: 'Dirección de Certificación Ambiental (Infraestructura y Servicios)',
        annex: '1310 / 1315',
        description: 'Evaluación de EIA-d de Transportes, Agricultura, Residuos Sólidos e Industria.'
      },
      {
        area: 'Orientación al Administrado y Consultas EVA',
        annex: '1000 / 1001',
        description: 'Soporte técnico para el acceso a la plataforma Ventanilla Única de Certificación EVA.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Validación de Pagos TUPA e Inscripción',
        email: 'transferenciastupa@senace.gob.pe'
      },
      {
        purpose: 'Consultas Técnicas del Registro RNCA',
        email: 'rnca@senace.gob.pe'
      },
      {
        purpose: 'Mesa de Partes Virtual Formal',
        email: 'mesadepartes@senace.gob.pe'
      },
      {
        purpose: 'Atención al Ciudadano y Consultoras',
        email: 'contacto@senace.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 17:30 horas',
    procedureUrl: 'https://www.gob.pe/10768-inscribirte-en-el-registro-nacional-de-consultoras-ambientales-rnca',
    onlineDeskUrl: 'https://eva.senace.gob.pe/',
    responsibleOffice: 'Subdirección de Registros Ambientales - Dirección de Registros Ambientales (DRA)',
    consultantRegistryInfo: 'Registro oficial centralizado para la elaboración de EIA-d y EIA-sd transferidos conforme a la Ley N.° 29968 y D.S. N.° 026-2021-MINAM.'
  },
  {
    id: 'minem-dgaam',
    name: 'Dirección General de Asuntos Ambientales Mineros',
    abbreviation: 'MINEM - DGAAM',
    ministryOrAuthority: 'Ministerio de Energía y Minas (MINEM)',
    subsectors: ['mineria'],
    address: 'Av. Las Artes Sur N.° 260, San Borja, Lima',
    centralPhone: '(+51 1) 411-1100',
    cellOrWhatsapp: '(+51) 998 221 445 (Mesa de Orientación Minera)',
    annexes: [
      {
        area: 'Despacho de la Dirección General (DGAAM)',
        annex: '3001 / 3002',
        description: 'Políticas, resoluciones sectoriales y rectoría de evaluación ambiental minera.'
      },
      {
        area: 'Dirección de Evaluación Ambiental Minera (DEAM)',
        annex: '3020 / 3025',
        description: 'Revisión técnica de Instrumentos de Gestión Ambiental Mineros (DIA, EIAsd, ITS y Planes de Cierre).'
      },
      {
        area: 'Registro de Consultoras y Profesionales Mineros',
        annex: '3050',
        description: 'Historial de consultoras mineras acreditadas y verificación de especialistas sectoriales.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Despacho Dirección General',
        email: 'dgaam@minem.gob.pe'
      },
      {
        purpose: 'Consultas Técnicas Ambientales Mineras',
        email: 'consultasdgaam@minem.gob.pe'
      },
      {
        purpose: 'Mesa de Partes General MINEM',
        email: 'mesadepartes@minem.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 16:30 horas',
    procedureUrl: 'https://www.gob.pe/minem',
    onlineDeskUrl: 'https://pad.minem.gob.pe/',
    responsibleOffice: 'Dirección de Evaluación Ambiental Minera (DEAM)',
    consultantRegistryInfo: 'Rige las competencias complementarias en minería conforme al D.S. N.° 040-2014-EM y R.J. N.° 090-2025-SENACE/J.'
  },
  {
    id: 'minem-dgaae',
    name: 'Dirección General de Asuntos Ambientales de Electricidad',
    abbreviation: 'MINEM - DGAAE',
    ministryOrAuthority: 'Ministerio de Energía y Minas (MINEM)',
    subsectors: ['electricidad'],
    address: 'Av. Las Artes Sur N.° 260, San Borja, Lima',
    centralPhone: '(+51 1) 411-1100',
    cellOrWhatsapp: '(+51) 996 441 202',
    annexes: [
      {
        area: 'Dirección General (DGAAE)',
        annex: '3301 / 3305',
        description: 'Gestión y normatividad ambiental para generación, transmisión y distribución eléctrica.'
      },
      {
        area: 'Evaluación de IGA en Electricidad',
        annex: '3310 / 3315',
        description: 'Certificación de líneas de transmisión, subestaciones y centrales hidroeléctricas/solares.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Despacho Dirección General',
        email: 'dgaae@minem.gob.pe'
      },
      {
        purpose: 'Consultas Técnicas Electricidad',
        email: 'consultasdgaae@minem.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 16:30 horas',
    procedureUrl: 'https://www.gob.pe/minem',
    onlineDeskUrl: 'https://pad.minem.gob.pe/',
    responsibleOffice: 'Dirección General de Asuntos Ambientales de Electricidad',
    consultantRegistryInfo: 'Normativa aplicable: R.J. N.° 090-2025-SENACE/J y D.S. N.° 014-2019-EM.'
  },
  {
    id: 'minem-dgaah',
    name: 'Dirección General de Asuntos Ambientales de Hidrocarburos',
    abbreviation: 'MINEM - DGAAH',
    ministryOrAuthority: 'Ministerio de Energía y Minas (MINEM)',
    subsectors: ['hidrocarburos'],
    address: 'Av. Las Artes Sur N.° 260, San Borja, Lima',
    centralPhone: '(+51 1) 411-1100',
    cellOrWhatsapp: '(+51) 997 882 109',
    annexes: [
      {
        area: 'Dirección General (DGAAH)',
        annex: '3201 / 3210',
        description: 'Supervisión ambiental y marco regulatorio para exploración, explotación, refinación y ductos.'
      },
      {
        area: 'Evaluación y Registro en Hidrocarburos',
        annex: '3225 / 3230',
        description: 'Revisión de estudios ambientales de lotes petroleros, gas natural y comercialización.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Despacho Dirección General',
        email: 'dgaah@minem.gob.pe'
      },
      {
        purpose: 'Consultas Ambientales de Hidrocarburos',
        email: 'consultasdgaah@minem.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 16:30 horas',
    procedureUrl: 'https://www.gob.pe/minem',
    onlineDeskUrl: 'https://pad.minem.gob.pe/',
    responsibleOffice: 'Dirección General de Asuntos Ambientales de Hidrocarburos',
    consultantRegistryInfo: 'Normativa aplicable: R.J. N.° 090-2025-SENACE/J y D.S. N.° 039-2014-EM.'
  },
  {
    id: 'mtc-dgaam',
    name: 'Dirección General de Asuntos Ambientales de Transportes',
    abbreviation: 'MTC - DGAAM',
    ministryOrAuthority: 'Ministerio de Transportes y Comunicaciones (MTC)',
    subsectors: ['transportes'],
    address: 'Jr. Zorritos N.° 1203, Cercado de Lima',
    centralPhone: '(+51 1) 615-7800',
    cellOrWhatsapp: '(+51) 981 274 780 (Línea de Orientación Ambiental MTC)',
    annexes: [
      {
        area: 'Despacho Dirección General (DGAAM - MTC)',
        annex: '1520 / 1521',
        description: 'Gestión y rectoría ambiental de infraestructura vial, ferroviaria, portuaria y aeroportuaria.'
      },
      {
        area: 'Dirección de Evaluación Ambiental (DEA - Transportes)',
        annex: '1530 / 1532',
        description: 'Evaluación de DIA, EIA-sd y coordinación con SENACE para EIA-d.'
      },
      {
        area: 'Área de Consultoras Ambientales en Infraestructura Vial',
        annex: '1545',
        description: 'Validación de experiencia de profesionales en carreteras, puentes y puertos.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Dirección General Ambiental',
        email: 'dgaam@mtc.gob.pe'
      },
      {
        purpose: 'Atención y Orientación al Ciudadano',
        email: 'atencionalciudadano@mtc.gob.pe'
      },
      {
        purpose: 'Mesa de Partes Virtual MTC',
        email: 'mesadepartes@mtc.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 17:00 horas',
    procedureUrl: 'https://www.gob.pe/mtc',
    onlineDeskUrl: 'https://mpv.mtc.gob.pe/',
    responsibleOffice: 'Dirección de Evaluación Ambiental (DEA)',
    consultantRegistryInfo: 'Normativa aplicable: R.J. N.° 076-2016-SENACE/J y D.S. N.° 004-2017-MTC.'
  },
  {
    id: 'midagri-dgaaa',
    name: 'Dirección General de Asuntos Ambientales Agrarios',
    abbreviation: 'MIDAGRI - DGAAA',
    ministryOrAuthority: 'Ministerio de Desarrollo Agrario y Riego (MIDAGRI)',
    subsectors: ['agricultura'],
    address: 'Av. Alameda del Corregidor N.° 155 / Jr. Yauyos N.° 258, La Molina, Lima',
    centralPhone: '(+51 1) 209-8600 / (+51 1) 314-5777',
    cellOrWhatsapp: '(+51) 952 110 892',
    annexes: [
      {
        area: 'Despacho Dirección General (DGAAA)',
        annex: '4001 / 4002',
        description: 'Gestión de políticas ambientales y normativas para agricultura, riego y agroforestería.'
      },
      {
        area: 'Dirección de Gestión Ambiental Agraria (DGAA)',
        annex: '4015 / 4018',
        description: 'Evaluación técnica de proyectos agrícolas, presas de irrigación y defensas ribereñas.'
      },
      {
        area: 'Registro de Profesionales y Consultoras Agrarias',
        annex: '4022',
        description: 'Historial y registro sectorial de especialistas acreditados en proyectos de riego.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Dirección General DGAAA',
        email: 'dgaaa@midagri.gob.pe'
      },
      {
        purpose: 'Consultas Técnicas Agrarias',
        email: 'consultas_dgaaa@midagri.gob.pe'
      },
      {
        purpose: 'Mesa de Partes MIDAGRI',
        email: 'mesadepartes@midagri.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:00 a 16:30 horas',
    procedureUrl: 'https://www.gob.pe/midagri',
    onlineDeskUrl: 'https://sistemas.midagri.gob.pe/mpv/',
    responsibleOffice: 'Dirección de Gestión Ambiental Agraria (DGAA)',
    consultantRegistryInfo: 'Normativa aplicable: R.J. N.° 062-2017-SENACE/J y D.S. N.° 019-2012-AG.'
  },
  {
    id: 'produce-dgaami',
    name: 'Dirección General de Asuntos Ambientales de Industria',
    abbreviation: 'PRODUCE - DGAAMI',
    ministryOrAuthority: 'Ministerio de la Producción (PRODUCE)',
    subsectors: ['industria', 'comercio'],
    address: 'Calle Uno Oeste N.° 050, Urb. Córpac, San Isidro, Lima',
    centralPhone: '(+51 1) 616-2222',
    cellOrWhatsapp: '(+51) 995 240 684 (Orientación PRODUCE)',
    annexes: [
      {
        area: 'Despacho Dirección General (DGAAMI)',
        annex: '2510 / 2512',
        description: 'Rectoría de evaluación ambiental en industria manufacturera y comercio interno.'
      },
      {
        area: 'Dirección de Gestión Ambiental de Industria',
        annex: '2520 / 2525',
        description: 'Evaluación técnica de plantas químicas, textiles, fundiciones y metalmecánica.'
      },
      {
        area: 'Acreditación Sectorial de Consultoras Industriales',
        annex: '2535',
        description: 'Verificación de equipos técnicos para industria manufacturera y centros comerciales.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Dirección General de Industria',
        email: 'dgaami@produce.gob.pe'
      },
      {
        purpose: 'Mesa de Partes PRODUCE',
        email: 'mesadepartes@produce.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 17:00 horas',
    procedureUrl: 'https://www.gob.pe/produce',
    onlineDeskUrl: 'https://mpv.produce.gob.pe/',
    responsibleOffice: 'Dirección General de Asuntos Ambientales de Industria',
    consultantRegistryInfo: 'Normativa aplicable: R.P.E. N.° 00003-2026-SENACE/PE y D.S. N.° 017-2015-PRODUCE.'
  },
  {
    id: 'produce-dgaampa',
    name: 'Dirección General de Asuntos Ambientales Pesqueros y Acuícolas',
    abbreviation: 'PRODUCE - DGAAMPA',
    ministryOrAuthority: 'Ministerio de la Producción (PRODUCE)',
    subsectors: ['pesca'],
    address: 'Calle Uno Oeste N.° 050, Urb. Córpac, San Isidro, Lima',
    centralPhone: '(+51 1) 616-2222',
    cellOrWhatsapp: '(+51) 989 330 412',
    annexes: [
      {
        area: 'Despacho Dirección General (DGAAMPA)',
        annex: '2601 / 2605',
        description: 'Rectoría ambiental de procesamiento pesquero, harina de pescado y acuicultura.'
      },
      {
        area: 'Evaluación Ambiental Pesquera',
        annex: '2618 / 2620',
        description: 'Revisión de DIA, EIA-sd y vertimientos marinos industriales.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Dirección General Pesquera y Acuícola',
        email: 'dgaampa@produce.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 17:00 horas',
    procedureUrl: 'https://www.gob.pe/produce',
    onlineDeskUrl: 'https://mpv.produce.gob.pe/',
    responsibleOffice: 'Dirección General de Asuntos Ambientales Pesqueros y Acuícolas',
    consultantRegistryInfo: 'Normativa aplicable: R.P.E. N.° 00029-2026-SENACE/PE y D.S. N.° 012-2019-PRODUCE.'
  },
  {
    id: 'vivienda-dgaa',
    name: 'Dirección General de Asuntos Ambientales de Vivienda, Construcción y Saneamiento',
    abbreviation: 'VIVIENDA - DGAA',
    ministryOrAuthority: 'Ministerio de Vivienda, Construcción y Saneamiento (MVCS)',
    subsectors: ['vivienda', 'saneamiento', 'residuos_solidos'],
    address: 'Av. Paseo de la República N.° 3361, San Isidro, Lima',
    centralPhone: '(+51 1) 211-7930',
    cellOrWhatsapp: '(+51) 994 512 870',
    annexes: [
      {
        area: 'Despacho Dirección General (DGAA - Vivienda)',
        annex: '2301 / 2302',
        description: 'Políticas ambientales sectoriales en saneamiento, habilitaciones urbanas y residuos.'
      },
      {
        area: 'Evaluación Ambiental de Saneamiento y PTAR',
        annex: '2315 / 2318',
        description: 'Estudios de impacto ambiental en plantas de tratamiento de agua residual y emisarios.'
      },
      {
        area: 'Evaluación Ambiental de Edificaciones y Residuos Sólidos',
        annex: '2328 / 2330',
        description: 'Rellenos sanitarios, plantas de valorización y habilitaciones urbanas.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Dirección General Ambiental',
        email: 'dgaa@vivienda.gob.pe'
      },
      {
        purpose: 'Consultas Técnicas Ambientales',
        email: 'consultasdgaa@vivienda.gob.pe'
      },
      {
        purpose: 'Mesa de Partes MVCS',
        email: 'mesadepartes@vivienda.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 17:00 horas',
    procedureUrl: 'https://www.gob.pe/vivienda',
    onlineDeskUrl: 'https://mpv.vivienda.gob.pe/',
    responsibleOffice: 'Dirección General de Asuntos Ambientales',
    consultantRegistryInfo: 'Normativas aplicables: R.P.E. N.° 00021-2025-SENACE/PE (Saneamiento), R.P.E. N.° 00048-2021-SENACE-PE (Vivienda) y R.P.E. N.° 00075-2022-SENACE-PE (Residuos).'
  },
  {
    id: 'minam-dgpig',
    name: 'Dirección General de Políticas e Instrumentos de Gestión Ambiental',
    abbreviation: 'MINAM - DGPIGA',
    ministryOrAuthority: 'Ministerio del Ambiente (MINAM)',
    subsectors: ['residuos_solidos'],
    address: 'Av. Antonio Miró Quesada N.° 425, Magdalena del Mar, Lima',
    centralPhone: '(+51 1) 611-6000',
    cellOrWhatsapp: '(+51) 942 660 119',
    annexes: [
      {
        area: 'Despacho Dirección General (DGPIGA)',
        annex: '1601 / 1602',
        description: 'Ente rector del Sistema Nacional de Evaluación del Impacto Ambiental (SEIA).'
      },
      {
        area: 'Gestión del SEIA y Consultoras Ambientales',
        annex: '1620 / 1622',
        description: 'Supervisión del marco macro normativo del RNCA y lineamientos de consultoría ambiental.'
      }
    ],
    officialEmails: [
      {
        purpose: 'Consultas Consultoras Ambientales SEIA',
        email: 'consultora_ambiental@minam.gob.pe'
      },
      {
        purpose: 'Atención al Ciudadano MINAM',
        email: 'atencionalciudadano@minam.gob.pe'
      }
    ],
    officeHours: 'Lunes a Viernes de 08:30 a 17:30 horas',
    procedureUrl: 'https://www.gob.pe/minam',
    onlineDeskUrl: 'https://mesadepartes.minam.gob.pe/',
    responsibleOffice: 'Dirección General de Políticas e Instrumentos de Gestión Ambiental',
    consultantRegistryInfo: 'Ente rector de la Ley N.° 27446 (Ley del SEIA) y D.S. N.° 026-2021-MINAM.'
  }
];

export interface ProfessionalCollegeContact {
  collegeName: string;
  abbreviation: string;
  centralPhone: string;
  annexes: string;
  whatsappOrCell: string;
  officialEmail: string;
  verificationPortalUrl: string;
  address: string;
}

export const PROFESSIONAL_COLLEGES_DIRECTORY: Record<string, ProfessionalCollegeContact> = {
  CIP: {
    collegeName: 'Colegio de Ingenieros del Perú - Consejo Departamental de Lima',
    abbreviation: 'CIP CD Lima',
    centralPhone: '(+51 1) 202-5000 / (+51 1) 202-5001',
    annexes: 'Anexos 5020 (Comisión Ambiental) / 5015 (Certificados de Habilitación)',
    whatsappOrCell: '(+51) 998 334 125 / (+51) 989 220 100',
    officialEmail: 'informes@ciplima.org.pe / colegiatura@ciplima.org.pe',
    verificationPortalUrl: 'https://www.ciplima.org.pe/consulta-de-colegiados/',
    address: 'Calle Barcelona 240, San Isidro, Lima'
  },
  CBP: {
    collegeName: 'Colegio de Biólogos del Perú - Consejo Nacional / Regional Lima',
    abbreviation: 'CBP Lima',
    centralPhone: '(+51 1) 471-1550 / (+51 1) 265-8890',
    annexes: 'Secretaría Técnica y Padrón de Habilitación Profesional',
    whatsappOrCell: '(+51) 945 089 123',
    officialEmail: 'informes@cbp.org.pe / habilitaciones@cbp.org.pe',
    verificationPortalUrl: 'https://cbp.org.pe/verificar-colegiatura/',
    address: 'Av. Petit Thouars 3825, San Isidro, Lima'
  },
  CSP: {
    collegeName: 'Colegio de Sociólogos del Perú - Región Lima y Callao',
    abbreviation: 'CSP',
    centralPhone: '(+51 1) 424-3890',
    annexes: 'Mesa de Atención al Colegiado y Consultores Sociales',
    whatsappOrCell: '(+51) 993 421 876',
    officialEmail: 'col.sociologosperu@gmail.com / consultas@colegiodesociologos.org.pe',
    verificationPortalUrl: 'https://www.gob.pe/colegio-de-sociologos-del-peru',
    address: 'Jr. Huancavelica 470, Of. 302, Cercado de Lima'
  },
  CAP: {
    collegeName: 'Colegio de Arquitectos del Perú - Regional Lima',
    abbreviation: 'CAP Lima',
    centralPhone: '(+51 1) 627-1200',
    annexes: 'Anexo 105 (Certificados de Habilitación Urbanística y Ambiental)',
    whatsappOrCell: '(+51) 980 445 112',
    officialEmail: 'informes@caplima.pe / habilitacion@caplima.pe',
    verificationPortalUrl: 'https://caplima.pe/servicios/consulta-colegiados/',
    address: 'Av. San Felipe 999, Jesús María, Lima'
  }
};
