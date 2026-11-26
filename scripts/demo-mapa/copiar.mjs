// Copia el HTML generado por el generador de mapas (ejemplos/generador-mapas/salida/) a public/demos/
// y le añade la etiqueta robots «noindex», como el resto del prototipo. No cambia nada más.
// Uso: npm run demo:map
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = 'ejemplos/generador-mapas/salida/mapa-ejemplo.html';
const dst = 'public/demos/mapa-ejemplo.html';
let html = readFileSync(src, 'utf8');
if (!/<meta[^>]+name="robots"/i.test(html)) {
  html = html.replace('<head>', '<head>\n<meta name="robots" content="noindex">');
}
mkdirSync('public/demos', { recursive: true });
writeFileSync(dst, html);
console.log(`Demo copiada: ${dst} (${(html.length / 1024).toFixed(0)} KB)`);
