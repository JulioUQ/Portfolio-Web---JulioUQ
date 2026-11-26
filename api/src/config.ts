/**
 * Configuración de la API por variables de entorno del servidor. Ninguna clave llega al navegador.
 * Ver api/.env.example y api/README.md.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export type ProviderName = 'anthropic' | 'test' | 'none';

export interface Config {
  port: number;
  host: string;
  provider: ProviderName;
  model: string;
  effort: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
  knowledgeDir: string;
  allowedOrigins: string[];
  maxQuestionChars: number;
  maxHistory: number;
  maxBodyBytes: number;
  ratePerMinute: number;
  ratePerDay: number;
  trustProxy: boolean;
  /** true cuando hay proveedor y credencial: el chat puede generar respuestas. */
  configured: boolean;
}

function int(name: string, fallback: number): number {
  const v = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const raw = (env.CHAT_PROVIDER ?? '').trim().toLowerCase();
  const provider: ProviderName = raw === 'anthropic' || raw === 'test' ? raw : 'none';
  const hasAnthropicCredential = Boolean(env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN);
  const effortRaw = (env.CHAT_EFFORT ?? 'low').trim();
  const effort = (['low', 'medium', 'high', 'xhigh', 'max'] as const).find((e) => e === effortRaw) ?? 'low';

  return {
    port: int('PORT', 8787),
    host: env.HOST ?? '127.0.0.1',
    provider,
    // Modelo por defecto si no se fija CHAT_MODEL; se recomienda fijarlo explícitamente.
    model: (env.CHAT_MODEL ?? 'claude-opus-5-5').trim(),
    effort,
    knowledgeDir: path.resolve(here, '..', env.KNOWLEDGE_DIR ?? '../dist/knowledge'),
    allowedOrigins: (env.ALLOWED_ORIGINS ?? 'http://localhost:4321,http://127.0.0.1:4321')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    maxQuestionChars: int('CHAT_MAX_QUESTION_CHARS', 500),
    maxHistory: int('CHAT_MAX_HISTORY', 8),
    maxBodyBytes: int('CHAT_MAX_BODY_BYTES', 16_384),
    ratePerMinute: int('CHAT_RATE_PER_MINUTE', 6),
    ratePerDay: int('CHAT_RATE_PER_DAY', 60),
    trustProxy: env.TRUST_PROXY === '1',
    configured: provider === 'test' || (provider === 'anthropic' && hasAnthropicCredential),
  };
}
