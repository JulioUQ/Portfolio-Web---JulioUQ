import type { Lang } from '../i18n/routes';
import type { FleetText, Metric } from '../lib/fleet';

/** Textos de la visualización de la flota (los datos están en src/data/flota-serie.json). */
export interface FleetChartContent {
  heading: string;
  controls: { gear: string; region: string; metric: string; from: string; to: string; reset: string };
  metricOptions: Record<Metric, string>;
  tableToggle: string;
  tableYear: string;
  howTo: { heading: string; items: string[] };
  text: FleetText;
}

const gearsEs: Record<string, string> = {
  Arrastre: 'Arrastre',
  'Artes fijas': 'Artes fijas',
  'Artes menores': 'Artes menores',
  Cañeros: 'Cañeros',
  Cerco: 'Cerco',
  Desconocido: 'Sin modalidad asignada',
  Palangre: 'Palangre',
};

const gearsEn: Record<string, string> = {
  Arrastre: 'Trawl',
  'Artes fijas': 'Fixed gear',
  'Artes menores': 'Small-scale gear',
  Cañeros: 'Pole and line',
  Cerco: 'Purse seine',
  Desconocido: 'No census category',
  Palangre: 'Longline',
};

export const fleetChart: Record<Lang, FleetChartContent> = {
  es: {
    heading: 'Buques en el registro al final de cada año',
    controls: {
      gear: 'Tipo de arte',
      region: 'Comunidad (puerto base)',
      metric: 'Medida',
      from: 'Desde',
      to: 'Hasta',
      reset: 'Restablecer',
    },
    metricOptions: { n: 'Número de buques', kw: 'Potencia total (MW)', gt: 'Arqueo total (miles de GT)' },
    tableToggle: 'Ver los datos en una tabla',
    tableYear: 'Año',
    howTo: {
      heading: 'Qué representa cada cifra y cómo reproducirla',
      items: [
        '<strong>Unidad.</strong> Cada barra es la situación a 31 de diciembre de ese año: número de buques dados de alta en el Registro General de la Flota Pesquera, su potencia total en megavatios (1 MW = 1.000 kW) o su arqueo bruto total en miles de GT.',
        '<strong>Regla.</strong> Un buque cuenta en un año si su alta es anterior al 31 de diciembre y no tenía una baja (definitiva o provisional) con fecha anterior.',
        '<strong>Categorías.</strong> El tipo de arte es la agrupación del proyecto sobre el censo por modalidad, y la comunidad autónoma es la del puerto base. Ambas son las últimas registradas en 2025: un buque que cambió de modalidad aparece siempre en la última.',
        '<strong>Periodo.</strong> Empieza en 1989, primer año completo tras la carga inicial del registro, y termina en 2024, último año completo antes de la extracción (abril de 2025).',
        '<strong>Fuente.</strong> <code>data/data_clean_v2.csv</code> del repositorio Data-Science-Pescas-Limpieza-y-Modelado (27.364 buques; datos públicos del Ministerio de Agricultura, Pesca y Alimentación). La serie se calcula con <code>scripts/flota/generar_serie.py</code> de este portfolio.',
      ],
    },
    text: {
      lang: 'es',
      metricUnits: { n: 'buques', kw: 'MW', gt: 'miles de GT' },
      metricNames: { n: 'Número de buques', kw: 'Potencia total', gt: 'Arqueo total' },
      gearLabels: gearsEs,
      allGears: 'Todos los artes',
      allRegions: 'Todas las comunidades',
      chartTitle: 'a 31 de diciembre',
      emptySummary: 'No hay buques en el registro para esta selección.',
      summaryTemplate: (p) =>
        `${p.scope}: entre ${p.from} y ${p.to} se pasó de ${p.first} a ${p.last} (${p.change}). ` +
        `El valor más alto del periodo fue ${p.peak}, en ${p.peakYear}.`,
    },
  },
  en: {
    heading: 'Vessels on the register at the end of each year',
    controls: {
      gear: 'Gear type',
      region: 'Region (home port)',
      metric: 'Measure',
      from: 'From',
      to: 'To',
      reset: 'Reset',
    },
    metricOptions: { n: 'Number of vessels', kw: 'Total engine power (MW)', gt: 'Total gross tonnage (thousand GT)' },
    tableToggle: 'Show the data as a table',
    tableYear: 'Year',
    howTo: {
      heading: 'What each figure means and how to reproduce it',
      items: [
        '<strong>Unit.</strong> Each bar is the situation on 31 December of that year: number of vessels registered in the Spanish fishing fleet register, their total engine power in megawatts (1 MW = 1,000 kW) or their total gross tonnage in thousands of GT.',
        '<strong>Rule.</strong> A vessel counts in a year if it was registered before 31 December and had no removal (permanent or temporary) dated earlier.',
        '<strong>Categories.</strong> Gear type is the project’s grouping of the census category, and the region is that of the home port. Both are the latest recorded in 2025: a vessel that changed category always appears in the latest one.',
        '<strong>Period.</strong> It starts in 1989, the first full year after the register’s initial load, and ends in 2024, the last full year before extraction (April 2025).',
        '<strong>Source.</strong> <code>data/data_clean_v2.csv</code> in the Data-Science-Pescas-Limpieza-y-Modelado repository (27,364 vessels; public data from the Spanish Ministry of Agriculture, Fisheries and Food). The series is computed with this portfolio’s <code>scripts/flota/generar_serie.py</code>.',
      ],
    },
    text: {
      lang: 'en',
      metricUnits: { n: 'vessels', kw: 'MW', gt: 'thousand GT' },
      metricNames: { n: 'Number of vessels', kw: 'Total engine power', gt: 'Total gross tonnage' },
      gearLabels: gearsEn,
      allGears: 'All gear types',
      allRegions: 'All regions',
      chartTitle: 'on 31 December',
      emptySummary: 'There are no vessels on the register for this selection.',
      summaryTemplate: (p) =>
        `${p.scope}: between ${p.from} and ${p.to} the figure went from ${p.first} to ${p.last} (${p.change}). ` +
        `The highest value in the period was ${p.peak}, in ${p.peakYear}.`,
    },
  },
};
