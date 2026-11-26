/**
 * Lógica de la visualización de la flota, compartida por el servidor (primer render, sin JS)
 * y el navegador (actualización al cambiar la selección). Sin dependencias.
 */

export type Metric = 'n' | 'kw' | 'gt';

export interface FleetData {
  source: string;
  rows: number;
  years: number[];
  gears: string[];
  regions: string[];
  series: Record<string, Record<Metric, number[]>>;
}

export interface FleetSelection {
  gear: string; // '' = todos
  region: string; // '' = todas
  metric: Metric;
  from: number;
  to: number;
}

export interface FleetText {
  lang: 'es' | 'en';
  metricUnits: Record<Metric, string>;
  metricNames: Record<Metric, string>;
  gearLabels: Record<string, string>;
  allGears: string;
  allRegions: string;
  chartTitle: string; // «{metric} a 31 de diciembre»
  summaryTemplate: (p: SummaryParts) => string;
  emptySummary: string;
}

export interface SummaryParts {
  from: number;
  to: number;
  first: string;
  last: string;
  change: string;
  peakYear: number;
  peak: string;
  scope: string;
  direction: 'up' | 'down' | 'flat';
}

/** Valores de la métrica para la selección (sumando combinaciones de arte y comunidad). */
export function seriesFor(data: FleetData, sel: FleetSelection): { years: number[]; values: number[] } {
  const idx = data.years.map((y, i) => [y, i] as const).filter(([y]) => y >= sel.from && y <= sel.to);
  const values = idx.map(() => 0);
  for (const [key, s] of Object.entries(data.series)) {
    const [gear, region] = key.split('|');
    if (sel.gear && gear !== sel.gear) continue;
    if (sel.region && region !== sel.region) continue;
    idx.forEach(([, i], j) => {
      values[j] += s[sel.metric][i];
    });
  }
  return { years: idx.map(([y]) => y), values };
}

/** Escala la métrica a la unidad de lectura: buques, MW o miles de GT. */
export function scaled(metric: Metric, v: number): number {
  if (metric === 'kw') return v / 1000;
  if (metric === 'gt') return v / 1000;
  return v;
}

export function fmt(lang: 'es' | 'en', v: number, digits = 0): string {
  return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(v);
}

function digitsFor(metric: Metric): number {
  return metric === 'n' ? 0 : 1;
}

export function summaryFor(data: FleetData, sel: FleetSelection, t: FleetText): string {
  const { years, values } = seriesFor(data, sel);
  if (!values.length || values.every((v) => v === 0)) return t.emptySummary;
  const d = digitsFor(sel.metric);
  const first = scaled(sel.metric, values[0]);
  const last = scaled(sel.metric, values[values.length - 1]);
  let peakI = 0;
  values.forEach((v, i) => {
    if (v > values[peakI]) peakI = i;
  });
  const pct = first > 0 ? ((last - first) / first) * 100 : 0;
  const unit = t.metricUnits[sel.metric];
  const scope = scopeLabel(sel, t);
  return t.summaryTemplate({
    from: years[0],
    to: years[years.length - 1],
    first: `${fmt(t.lang, first, d)} ${unit}`,
    last: `${fmt(t.lang, last, d)} ${unit}`,
    change: `${pct > 0 ? '+' : pct < 0 ? '−' : ''}${fmt(t.lang, Math.abs(pct), 0)} %`,
    peakYear: years[peakI],
    peak: `${fmt(t.lang, scaled(sel.metric, values[peakI]), d)} ${unit}`,
    scope,
    direction: Math.abs(pct) < 1 ? 'flat' : pct > 0 ? 'up' : 'down',
  });
}

export function scopeLabel(sel: FleetSelection, t: FleetText): string {
  const g = sel.gear ? t.gearLabels[sel.gear] ?? sel.gear : t.allGears;
  const r = sel.region ? sel.region : t.allRegions;
  return `${g} · ${r}`;
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

function niceStep(max: number): number {
  const raw = max / 4;
  const pow = 10 ** Math.floor(Math.log10(raw || 1));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/** SVG de barras con ejes. Accesible: el gráfico es decorativo (aria-hidden); el texto y la tabla llevan la información. */
export function chartSvg(data: FleetData, sel: FleetSelection, t: FleetText, width = 720): string {
  const { years, values } = seriesFor(data, sel);
  const v = values.map((x) => scaled(sel.metric, x));
  // Se dibuja al ancho real del contenedor para que el texto conserve su tamaño en móvil.
  const W = Math.max(280, Math.round(width));
  const H = W < 480 ? 240 : 300;
  const m = { l: 52, r: 10, t: 16, b: 34 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = Math.max(1, ...v);
  const step = niceStep(max);
  const top = Math.ceil(max / step) * step;
  const bw = iw / Math.max(1, v.length);
  const y = (x: number) => m.t + ih - (x / top) * ih;
  const d = digitsFor(sel.metric) && top < 10 ? 1 : 0;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="fleet-svg" aria-hidden="true" focusable="false">`;
  for (let g = 0; g <= top + 1e-9; g += step) {
    s += `<line class="grid" x1="${m.l}" x2="${W - m.r}" y1="${y(g).toFixed(1)}" y2="${y(g).toFixed(1)}"/>`;
    s += `<text class="tick" x="${m.l - 8}" y="${(y(g) + 4).toFixed(1)}" text-anchor="end">${esc(fmt(t.lang, g, d))}</text>`;
  }
  v.forEach((x, i) => {
    const h = (x / top) * ih;
    const edge = i === 0 || i === v.length - 1;
    s += `<rect class="bar${edge ? ' edge' : ''}" x="${(m.l + i * bw + bw * 0.12).toFixed(1)}" y="${y(x).toFixed(1)}" width="${(bw * 0.76).toFixed(1)}" height="${Math.max(0, h).toFixed(1)}"/>`;
  });
  const maxLabels = Math.max(2, Math.floor(iw / 44));
  const every = Math.max(1, Math.ceil(years.length / maxLabels));
  years.forEach((yr, i) => {
    if (i % every === 0 || i === years.length - 1) {
      s += `<text class="tick" x="${(m.l + i * bw + bw / 2).toFixed(1)}" y="${H - 12}" text-anchor="middle">${yr}</text>`;
    }
  });
  s += `<line class="axis" x1="${m.l}" x2="${W - m.r}" y1="${m.t + ih}" y2="${m.t + ih}"/></svg>`;
  return s;
}

export function tableRows(data: FleetData, sel: FleetSelection, t: FleetText): string {
  const { years, values } = seriesFor(data, sel);
  const d = digitsFor(sel.metric);
  return years
    .map((yr, i) => `<tr><th scope="row">${yr}</th><td>${esc(fmt(t.lang, scaled(sel.metric, values[i]), d))}</td></tr>`)
    .join('');
}
