/**
 * Recuperación de contenido publicado: BM25 sobre los fragmentos que genera la web
 * (dist/knowledge/es.json y en.json). Sin dependencias ni servicios externos.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

export type Lang = 'es' | 'en';

export interface Chunk {
  id: string;
  title: string;
  url: string;
  text: string;
}

export interface Hit {
  chunk: Chunk;
  score: number;
}

const STOP = new Set(
  (
    'a al algo algun alguna como con contra cual cuales cuando de del desde donde e el ella ellas ellos en entre era es esa ese eso esta este esto fue ha han hay la las le les lo los mas me mi mis muy ni no nos o os para pero por que se sea ser si sin sobre son su sus te tiene tu tus un una uno unos y ya yo ' +
    'tu tus has hiciste haces hace hacer tienes tiene tengo tenido cual cuál qué quien quién dime cuentame cuéntame puedes ' +
    'a an and are as at be been by can could did do does for from had has have how i if in into is it its me my of on or our so than that the their them then there these they this to was we were what when where which who why will with would you your about tell'
  ).split(/\s+/),
);

export function normalize(s: string): string[] {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ+#.\s-]/g, ' ')
    .split(/[\s.\-]+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

/** Recorte muy simple de plurales y terminaciones frecuentes en español e inglés. */
function stem(w: string): string {
  if (w.length > 5 && /(ciones|siones)$/.test(w)) return w.slice(0, -5);
  if (w.length > 4 && /(cion|sion)$/.test(w)) return w.slice(0, -4);
  if (w.length > 4 && /(es|s)$/.test(w)) return w.replace(/(es|s)$/, '');
  return w;
}

export class Index {
  private docs: { chunk: Chunk; tf: Map<string, number>; len: number }[] = [];
  private df = new Map<string, number>();
  private avgLen = 1;

  constructor(chunks: Chunk[]) {
    for (const chunk of chunks) {
      // El título pesa doble: suele nombrar el proyecto o la etapa.
      const tokens = [...normalize(chunk.title), ...normalize(chunk.title), ...normalize(chunk.text)];
      const tf = new Map<string, number>();
      tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
      tf.forEach((_, t) => this.df.set(t, (this.df.get(t) ?? 0) + 1));
      this.docs.push({ chunk, tf, len: tokens.length });
    }
    this.avgLen = this.docs.reduce((a, d) => a + d.len, 0) / Math.max(1, this.docs.length);
  }

  get size(): number {
    return this.docs.length;
  }

  search(query: string, k = 6): Hit[] {
    const terms = [...new Set(normalize(query))];
    if (!terms.length) return [];
    const N = this.docs.length;
    const k1 = 1.4;
    const b = 0.75;
    const hits: Hit[] = [];
    for (const d of this.docs) {
      let score = 0;
      for (const t of terms) {
        const f = d.tf.get(t);
        if (!f) continue;
        const n = this.df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / this.avgLen)));
      }
      if (score > 0) hits.push({ chunk: d.chunk, score });
    }
    return hits.sort((a, z) => z.score - a.score).slice(0, k);
  }
}

export function loadIndexes(dir: string): Record<Lang, Index> {
  const read = (lang: Lang): Chunk[] => {
    const raw = JSON.parse(readFileSync(path.join(dir, `${lang}.json`), 'utf8')) as { chunks: Chunk[] };
    return raw.chunks;
  };
  return { es: new Index(read('es')), en: new Index(read('en')) };
}
