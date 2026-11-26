import type { ImageMetadata } from 'astro';
import type { RouteKey } from '../../i18n/routes';

/**
 * Tipos comunes de los casos. Cada caso es un archivo con su contenido en español e inglés;
 * CasePage.astro lo pinta sin texto propio.
 * El HTML de los textos es contenido propio y de confianza.
 */

export type Block =
  | { type: 'p'; html: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: { title: string; html: string }[] }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'code'; caption: string; lines: string[] }
  | { type: 'diagram' }
  | { type: 'figure'; key: string }
  | { type: 'roles' }
  /** Componente interactivo o diagrama propio que se pinta en ese punto del caso. */
  | { type: 'component'; name: 'fleetChart' | 'flowDiagram' }
  /** Botones de acción (demo, repositorio…). */
  | { type: 'actions'; items: CaseAction[] };

export type CaseAction =
  | { label: string; route: RouteKey; primary?: boolean; note?: string }
  | { label: string; href: string; primary?: boolean; note?: string };

export interface CaseFigure {
  src: ImageMetadata;
  alt: string;
  caption: string;
  credit: string;
}

export interface MarssDiagramContent {
  title: string;
  intro: string;
  seriesHeading: string;
  populationsHeading: string;
  series: { name: string; code: string; stock: string }[];
  populations: string[];
  matrixCaption: string;
  matrixCorner: string;
  note: string;
  source: string;
}

export interface CaseContent {
  meta: { title: string; description: string };
  breadcrumb: string;
  kicker: string;
  /** El titular plantea la pregunta o el problema del caso. */
  title: string;
  /** Inicio del caso: resumen corto, papel en una línea y enlace directo a la fuente principal. */
  lead: {
    summaryLabel: string;
    summary: string;
    roleLabel: string;
    role: string;
    link: { label: string; href: string };
  };
  facts: { heading: string; items: { label: string; html: string }[] };
  /** Texto del desplegable que agrupa ficha e índice en pantallas estrechas. */
  disclosure: string;
  tocHeading: string;
  sections: { id: string; heading: string; blocks: Block[] }[];
  figures: Record<string, CaseFigure>;
  roles: {
    collective: { heading: string; items: string[] };
    individual: { heading: string; items: string[] };
  };
  related?: { id: string; heading: string; html: string };
  diagram?: MarssDiagramContent;
}
