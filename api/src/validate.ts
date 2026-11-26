/**
 * Validación del chat contra la API en marcha (npm run validate).
 * Envía la conversación de prueba (pregunta, repregunta y pregunta sin respuesta en la web) en español
 * y una pregunta en inglés, y muestra respuestas y fuentes. No guarda nada.
 * Uso: npm --prefix api run validate   (API_URL=http://127.0.0.1:8787 por defecto)
 */
const api = (process.env.API_URL ?? 'http://127.0.0.1:8787').replace(/\/$/, '');

type Turn = { role: 'user' | 'assistant'; content: string };
type Reply = { answer: string; sources: { title: string; url: string }[]; insufficient: boolean };

async function conversation(lang: 'es' | 'en', questions: string[]): Promise<void> {
  const history: Turn[] = [];
  for (const q of questions) {
    history.push({ role: 'user', content: q });
    const res = await fetch(`${api}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang, messages: history }),
    });
    if (!res.ok) {
      console.log(`\n[${lang}] ${q}\n  → HTTP ${res.status} ${await res.text()}`);
      history.pop();
      continue;
    }
    const r = (await res.json()) as Reply;
    history.push({ role: 'assistant', content: r.answer });
    console.log(`\n[${lang}] ${q}\n  Respuesta${r.insufficient ? ' (información insuficiente)' : ''}: ${r.answer.replace(/\n+/g, ' ')}`);
    for (const s of r.sources) console.log(`  Fuente: ${s.title} → ${s.url}`);
  }
}

const health = await (await fetch(`${api}/api/health`)).json();
console.log('Estado:', JSON.stringify(health));
await conversation('es', [
  '¿Qué investigó Julio sobre el fletán negro?',
  '¿Y qué encontró sobre Islandia?',
  '¿Cuál fue su salario en Tragsatec?',
]);
await conversation('en', ['What did Julio research about Greenland halibut?']);
