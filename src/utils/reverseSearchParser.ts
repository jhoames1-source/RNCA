import { SubsectorId } from '../types/rnca';
import { SUBSECTORS_DATA } from '../data/subsectorsData';

export interface ParsedSearchQuery {
  rawQuery: string;
  detectedSubsector: SubsectorId | null;
  detectedProfessions: string[];
  detectedEiaTypes: string[];
  minYearsDetected: number | null;
  detectedKeywords: string[];
  semanticExpansions: string[];
}

export function parseNaturalLanguageQuery(query: string): ParsedSearchQuery {
  const qLower = query.toLowerCase().trim();

  // Detect Subsector
  let detectedSubsector: SubsectorId | null = null;
  if (qLower.includes('minería') || qLower.includes('mineria') || qLower.includes('minas')) {
    detectedSubsector = 'mineria';
  } else if (qLower.includes('electricidad') || qLower.includes('electrico') || qLower.includes('eléctrico') || qLower.includes('transmisión')) {
    detectedSubsector = 'electricidad';
  } else if (qLower.includes('hidrocarburo') || qLower.includes('petróleo') || qLower.includes('petroleo') || qLower.includes('gas')) {
    detectedSubsector = 'hidrocarburos';
  } else if (qLower.includes('transporte') || qLower.includes('vial') || qLower.includes('carretera') || qLower.includes('puente')) {
    detectedSubsector = 'transportes';
  } else if (qLower.includes('agricultura') || qLower.includes('riego') || qLower.includes('agrícola') || qLower.includes('agricola')) {
    detectedSubsector = 'agricultura';
  } else if (qLower.includes('vivienda') || qLower.includes('urbano') || qLower.includes('urbanismo')) {
    detectedSubsector = 'vivienda';
  } else if (qLower.includes('saneamiento') || qLower.includes('ptar') || qLower.includes('agua potable') || qLower.includes('alcantarillado')) {
    detectedSubsector = 'saneamiento';
  } else if (qLower.includes('residuo') || qLower.includes('relleno sanitario') || qLower.includes('basura')) {
    detectedSubsector = 'residuos_solidos';
  } else if (qLower.includes('industria') || qLower.includes('manufactur') || qLower.includes('fábrica') || qLower.includes('fabrica')) {
    detectedSubsector = 'industria';
  } else if (qLower.includes('comercio') || qLower.includes('retail') || qLower.includes('mall')) {
    detectedSubsector = 'comercio';
  } else if (qLower.includes('pesca') || qLower.includes('acuicultura') || qLower.includes('marino') || qLower.includes('harina de pescado')) {
    detectedSubsector = 'pesca';
  }

  // Detect professions
  const detectedProfessions: string[] = [];
  const professionKeywords = [
    { key: 'ambiental', label: 'Ingeniero Ambiental' },
    { key: 'biólogo', label: 'Biólogo' },
    { key: 'biologo', label: 'Biólogo' },
    { key: 'social', label: 'Sociólogo / Antropólogo' },
    { key: 'sociólogo', label: 'Sociólogo' },
    { key: 'sociologo', label: 'Sociólogo' },
    { key: 'antropólogo', label: 'Antropólogo' },
    { key: 'gis', label: 'Ingeniero Geógrafo / SIG' },
    { key: 'sig', label: 'Ingeniero Geógrafo / SIG' },
    { key: 'geógrafo', label: 'Ingeniero Geógrafo' },
    { key: 'geografo', label: 'Ingeniero Geógrafo' },
    { key: 'geólogo', label: 'Ingeniero Geólogo' },
    { key: 'geologo', label: 'Ingeniero Geólogo' },
    { key: 'minas', label: 'Ingeniero de Minas' },
    { key: 'civil', label: 'Ingeniero Civil' },
    { key: 'sanitario', label: 'Ingeniero Sanitario' },
    { key: 'químico', label: 'Ingeniero Químico' },
    { key: 'quimico', label: 'Ingeniero Químico' },
    { key: 'eléctrico', label: 'Ingeniero Electricista' },
    { key: 'electrico', label: 'Ingeniero Electricista' },
    { key: 'pesquero', label: 'Ingeniero Pesquero' },
    { key: 'agrónomo', label: 'Ingeniero Agrónomo' },
    { key: 'agronomo', label: 'Ingeniero Agrónomo' },
    { key: 'econom', label: 'Economista' },
    { key: 'psicól', label: 'Psicólogo' },
    { key: 'psicol', label: 'Psicólogo' },
    { key: 'comunica', label: 'Comunicador Social' },
    { key: 'arquitec', label: 'Arquitecto' },
    { key: 'vial', label: 'Ingeniero Vial' }
  ];

  professionKeywords.forEach(pk => {
    if (qLower.includes(pk.key) && !detectedProfessions.includes(pk.label)) {
      detectedProfessions.push(pk.label);
    }
  });

  // Detect EIA types
  const detectedEiaTypes: string[] = [];
  if (qLower.includes('eia-d') || qLower.includes('detallado')) detectedEiaTypes.push('EIA-d');
  if (qLower.includes('eia-sd') || qLower.includes('semidetallado')) detectedEiaTypes.push('EIA-sd');
  if (qLower.includes('dia') || qLower.includes('declaracion de impacto')) detectedEiaTypes.push('DIA');
  if (qLower.includes('its') || qLower.includes('informe tecnico sustentatorio')) detectedEiaTypes.push('ITS');
  if (qLower.includes('meia') || qLower.includes('modificacion de eia')) detectedEiaTypes.push('MEIA');

  // Detect min years
  let minYearsDetected: number | null = null;
  const yearsMatch = qLower.match(/(\d+)\s*(años|anios|year)/);
  if (yearsMatch) {
    minYearsDetected = parseInt(yearsMatch[1], 10);
  }

  // Generate semantic expansions (per section 40 of prompt)
  const semanticExpansions: string[] = [];
  if (detectedSubsector) {
    const subDef = SUBSECTORS_DATA.find(s => s.id === detectedSubsector);
    if (subDef) {
      semanticExpansions.push(`Especialista ambiental ${subDef.name} Perú SEIA`);
      semanticExpansions.push(`Consultor ambiental ${subDef.name} SENACE`);
      semanticExpansions.push(`Línea base ambiental ${subDef.name}`);
      semanticExpansions.push(`Coordinador EIA ${subDef.name}`);
    }
  }

  return {
    rawQuery: query,
    detectedSubsector,
    detectedProfessions,
    detectedEiaTypes,
    minYearsDetected,
    detectedKeywords: qLower.split(' ').filter(w => w.length > 3),
    semanticExpansions
  };
}
