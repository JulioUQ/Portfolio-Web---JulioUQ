import type { Lang, RouteKey } from '../../i18n/routes';
import type { CaseContent } from './types';
import { greenlandHalibut } from './greenland-halibut';
import { mapGenerator } from './map-generator';
import { fishingFleet } from './fishing-fleet';
import { fleetScraping } from './fleet-scraping';
import { statisticsCourse } from './statistics-course';
import { analyticsPlatform } from './analytics-platform';

/** Registro de casos por clave de ruta: lo usan las páginas, la base de conocimiento del chat y el catálogo. */
export const cases = {
  halibut: greenlandHalibut,
  maps: mapGenerator,
  fleet: fishingFleet,
  scraping: fleetScraping,
  course: statisticsCourse,
  platform: analyticsPlatform,
} satisfies Partial<Record<RouteKey, Record<Lang, CaseContent>>>;

export type CaseKey = keyof typeof cases;
