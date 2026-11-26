import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadIndexes, normalize } from './retrieval.ts';
import { parseAnswer } from './provider.ts';
import { RateLimiter } from './rate-limit.ts';

const here = path.dirname(fileURLToPath(import.meta.url));
const indexes = loadIndexes(path.resolve(here, '../../dist/knowledge'));

test('normaliza acentos, plurales y palabras vacías', () => {
  assert.deepEqual(normalize('¿Qué proyectos de Ingeniería tienes?'), ['proyecto', 'ingenieria']);
});

test('recupera el caso del fletán negro en español', () => {
  const top = indexes.es.search('¿Qué papel tuviste en el estudio del fletán negro?', 3);
  assert.ok(top.length > 0);
  assert.match(top.map((h) => h.chunk.url).join(' '), /fletan-negro/);
});

test('recupera el generador de mapas en inglés', () => {
  const top = indexes.en.search('How does the map generator export a self-contained HTML file?', 3);
  assert.match(top.map((h) => h.chunk.url).join(' '), /map-generator/);
});

test('no recupera nada para una pregunta ajena al portfolio', () => {
  assert.equal(indexes.es.search('xilófono quásar zeppelin', 3).length, 0);
});

test('interpreta la línea de fuentes', () => {
  assert.deepEqual(parseAnswer('Respuesta [S2].\nFUENTES: S1, S2', 3), { answer: 'Respuesta.', cited: [1, 2], insufficient: false });
  assert.equal(parseAnswer('No consta.\nFUENTES: ninguna', 3).insufficient, true);
  assert.deepEqual(parseAnswer('Texto\nFUENTES: S9', 3).cited, []);
});

test('limita la frecuencia por minuto', () => {
  const rl = new RateLimiter(2, 10);
  assert.equal(rl.take('a', 0).ok, true);
  assert.equal(rl.take('a', 1).ok, true);
  assert.equal(rl.take('a', 2).ok, false);
  assert.equal(rl.take('a', 61_000).ok, true);
});
