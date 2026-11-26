export const languages = ['es', 'en'] as const;
export type Lang = (typeof languages)[number];

/**
 * Cada página tiene una clave común y una ruta por idioma.
 * El selector de idioma usa esta tabla para abrir la página equivalente.
 */
export const routes = {
  home: { es: '/es/', en: '/en/' },
  background: { es: '/es/trayectoria/', en: '/en/background/' },
  halibut: { es: '/es/casos/fletan-negro/', en: '/en/case-studies/greenland-halibut/' },
  maps: { es: '/es/casos/generador-de-mapas/', en: '/en/case-studies/map-generator/' },
  mapsDemo: { es: '/es/casos/generador-de-mapas/demo/', en: '/en/case-studies/map-generator/demo/' },
  fleet: { es: '/es/casos/flota-pesquera/', en: '/en/case-studies/fishing-fleet/' },
  scraping: { es: '/es/casos/web-scraping-flota/', en: '/en/case-studies/fleet-web-scraping/' },
  course: { es: '/es/casos/curso-estadistica/', en: '/en/case-studies/statistics-course/' },
  platform: { es: '/es/casos/plataforma-analitica/', en: '/en/case-studies/analytics-platform/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Antepone la base del despliegue (por ahora «/»). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export function routeFor(key: RouteKey, lang: Lang): string {
  return withBase(routes[key][lang]);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
