/** Límite de frecuencia por IP en memoria: peticiones por minuto y por día. No guarda nada en disco. */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  private readonly perMinute: number;
  private readonly perDay: number;

  constructor(perMinute: number, perDay: number) {
    this.perMinute = perMinute;
    this.perDay = perDay;
  }

  take(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfter: number } {
    const day = 24 * 60 * 60 * 1000;
    const list = (this.hits.get(key) ?? []).filter((t) => now - t < day);
    const lastMinute = list.filter((t) => now - t < 60_000);
    if (lastMinute.length >= this.perMinute) {
      return { ok: false, retryAfter: Math.ceil((60_000 - (now - lastMinute[0])) / 1000) };
    }
    if (list.length >= this.perDay) {
      return { ok: false, retryAfter: Math.ceil((day - (now - list[0])) / 1000) };
    }
    list.push(now);
    this.hits.set(key, list);
    // Limpieza ocasional para que el mapa no crezca sin límite.
    if (this.hits.size > 5000) {
      for (const [k, v] of this.hits) if (!v.some((t) => now - t < day)) this.hits.delete(k);
    }
    return { ok: true };
  }
}
