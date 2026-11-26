/**
 * API del chat del portfolio.
 *   GET  /api/health → { status: 'ok' | 'unconfigured', provider, model?, modelCheck? }
 *   POST /api/chat   → { answer, sources: [{ title, url }], insufficient }
 *
 * Privacidad: no se guardan conversaciones ni se registran preguntas o respuestas; el registro
 * solo anota método, ruta, estado y duración. Los límites de frecuencia se llevan en memoria.
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import Anthropic from '@anthropic-ai/sdk';
import { loadConfig } from './config.ts';
import { loadIndexes, type Lang } from './retrieval.ts';
import { checkModel, generate, RefusalError, type ChatTurn, type ModelCheck } from './provider.ts';
import { RateLimiter } from './rate-limit.ts';

const cfg = loadConfig();
const indexes = loadIndexes(cfg.knowledgeDir);
const limiter = new RateLimiter(cfg.ratePerMinute, cfg.ratePerDay);
// Con el proveedor real, el chat solo se da por disponible si el modelo responde para esta cuenta.
let modelCheck: ModelCheck | null = null;
const ready = () => cfg.configured && (cfg.provider !== 'anthropic' || modelCheck?.ok === true);

const MESSAGES = {
  es: {
    refusal: 'No puedo responder a esa pregunta. Puedo ayudarte con la trayectoria, los proyectos, la formación o las publicaciones de Julio.',
    noContext:
      'No encuentro información sobre eso en esta web. Puedes revisar los proyectos y la trayectoria, o escribir a Julio por LinkedIn.',
  },
  en: {
    refusal: 'I can’t answer that question. I can help with Julio’s background, projects, education or publications.',
    noContext:
      'I can’t find information about that on this site. You can browse the projects and background, or contact Julio on LinkedIn.',
  },
} as const;

class HttpError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

function clientIp(req: IncomingMessage): string {
  if (cfg.trustProxy) {
    const fwd = String(req.headers['x-forwarded-for'] ?? '').split(',')[0]?.trim();
    if (fwd) return fwd;
  }
  return req.socket.remoteAddress ?? 'unknown';
}

function cors(req: IncomingMessage, res: ServerResponse): void {
  const origin = req.headers.origin;
  if (origin && cfg.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');
  }
}

function send(res: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}): void {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  if (!String(req.headers['content-type'] ?? '').includes('application/json')) throw new HttpError(415, 'unsupported_media_type');
  let size = 0;
  const parts: Buffer[] = [];
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > cfg.maxBodyBytes) throw new HttpError(413, 'body_too_large');
    parts.push(chunk as Buffer);
  }
  try {
    return JSON.parse(Buffer.concat(parts).toString('utf8'));
  } catch {
    throw new HttpError(400, 'invalid_json');
  }
}

/** Valida la petición y devuelve idioma y turnos (empieza por el usuario y termina con su pregunta). */
function parseChat(body: unknown): { lang: Lang; turns: ChatTurn[] } {
  if (!body || typeof body !== 'object') throw new HttpError(400, 'invalid_body');
  const { lang, messages } = body as { lang?: unknown; messages?: unknown };
  if (lang !== 'es' && lang !== 'en') throw new HttpError(400, 'invalid_lang');
  if (!Array.isArray(messages) || messages.length === 0) throw new HttpError(400, 'invalid_messages');
  const turns: ChatTurn[] = [];
  for (const m of messages.slice(-cfg.maxHistory)) {
    if (!m || typeof m !== 'object') throw new HttpError(400, 'invalid_messages');
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') throw new HttpError(400, 'invalid_messages');
    const text = content.trim();
    if (!text) continue;
    // Las preguntas tienen el límite visible; las respuestas previas se recortan para acotar el contexto.
    if (role === 'user' && text.length > cfg.maxQuestionChars) throw new HttpError(413, 'question_too_long');
    turns.push({ role, content: role === 'assistant' ? text.slice(0, 2000) : text });
  }
  while (turns.length && turns[0].role !== 'user') turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== 'user') throw new HttpError(400, 'last_message_must_be_user');
  return { lang, turns };
}

async function handleChat(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (!ready()) throw new HttpError(503, 'unconfigured');
  const verdict = limiter.take(clientIp(req));
  if (!verdict.ok) {
    send(res, 429, { error: 'rate_limited', retryAfter: verdict.retryAfter }, { 'Retry-After': String(verdict.retryAfter) });
    return;
  }
  const { lang, turns } = parseChat(await readBody(req));
  const userTurns = turns.filter((t) => t.role === 'user');
  // La pregunta actual pesa más; la anterior ayuda a entender las repreguntas («¿y en qué año?»).
  const query = [userTurns.at(-1)!.content, userTurns.at(-1)!.content, userTurns.at(-2)?.content ?? ''].join(' ');
  const hits = indexes[lang].search(query, 6);

  if (!hits.length) {
    send(res, 200, { answer: MESSAGES[lang].noContext, sources: [], insufficient: true });
    return;
  }

  try {
    const out = await generate(cfg, lang, hits, turns);
    const seen = new Set<string>();
    const sources = out.cited
      .map((n) => hits[n - 1].chunk)
      .filter((c) => (seen.has(c.url) ? false : (seen.add(c.url), true)))
      .map((c) => ({ title: c.title, url: c.url }));
    send(res, 200, { answer: out.answer, sources, insufficient: out.insufficient });
  } catch (err) {
    if (err instanceof RefusalError) {
      send(res, 200, { answer: MESSAGES[lang].refusal, sources: [], insufficient: true });
      return;
    }
    if (err instanceof Anthropic.RateLimitError) throw new HttpError(503, 'provider_busy');
    if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) throw new HttpError(503, 'unconfigured');
    if (err instanceof Anthropic.APIError) throw new HttpError(502, 'provider_error');
    throw err;
  }
}

const server = createServer(async (req, res) => {
  const started = Date.now();
  const url = new URL(req.url ?? '/', 'http://localhost');
  cors(req, res);
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204).end();
    } else if (req.method === 'GET' && url.pathname === '/api/health') {
      send(res, 200, {
        status: ready() ? 'ok' : 'unconfigured',
        provider: cfg.provider,
        ...(cfg.configured ? { model: cfg.provider === 'test' ? 'test' : cfg.model } : {}),
        ...(modelCheck ? { modelCheck } : {}),
        chunks: { es: indexes.es.size, en: indexes.en.size },
      });
    } else if (req.method === 'POST' && url.pathname === '/api/chat') {
      await handleChat(req, res);
    } else {
      throw new HttpError(404, 'not_found');
    }
  } catch (err) {
    if (err instanceof HttpError) {
      if (!res.headersSent) send(res, err.status, { error: err.code });
    } else {
      // Sin contenido de la conversación en el registro.
      console.error(`[chat] error interno: ${(err as Error).name}`);
      if (!res.headersSent) send(res, 500, { error: 'internal_error' });
    }
  } finally {
    console.log(`[chat] ${req.method} ${url.pathname} ${res.statusCode} ${Date.now() - started}ms`);
  }
});

if (cfg.provider === 'anthropic' && cfg.configured) {
  modelCheck = await checkModel(cfg);
  console.log(
    modelCheck.ok
      ? `[chat] modelo disponible para esta cuenta: ${modelCheck.model} (${modelCheck.displayName})`
      : `[chat] el modelo ${cfg.model} no está disponible: ${modelCheck.reason}. El chat queda como no configurado.`,
  );
}

server.listen(cfg.port, cfg.host, () => {
  console.log(
    `[chat] API en http://${cfg.host}:${cfg.port} · proveedor: ${cfg.provider}${cfg.configured ? ` (${cfg.provider === 'test' ? 'modo de prueba' : cfg.model})` : ' (sin configurar)'} · fragmentos es/en: ${indexes.es.size}/${indexes.en.size}`,
  );
});
