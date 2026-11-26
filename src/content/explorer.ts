import type { Lang } from '../i18n/routes';

/** Textos de la interfaz del explorador de proyectos (filtros, tarjetas y ventanas flotantes). */
export interface ExplorerContent {
  heading: string;
  intro: (total: number) => string;
  filterLabel: string;
  all: string;
  count: (n: number, total: number) => string;
  /** Recuento cuando las tarjetas se ven por páginas. */
  range: (from: number, to: number, n: number, total: number) => string;
  pager: { label: string; prev: string; next: string; page: (i: number, of: number) => string };
  openHint: string;
  dialog: {
    close: string;
    problem: string;
    role: string;
    tools: string;
    links: string;
    areas: string;
    caseLink: string;
    codeLink: string;
    code: string;
    demo: string;
    article: string;
    dataset: string;
  };
}

export const explorer: Record<Lang, ExplorerContent> = {
  es: {
    heading: 'Proyectos',
    intro: (total) =>
      `${total} proyectos con evidencia pública. Elige un área y abre una tarjeta para ver el problema, mi papel y los enlaces.`,
    filterLabel: 'Área',
    all: 'Todas las áreas',
    count: (n, total) =>
      n === total ? `Se muestran los ${total} proyectos.` : `Se ${n === 1 ? 'muestra' : 'muestran'} ${n} de ${total} proyectos.`,
    range: (from, to, n, total) =>
      `${from === to ? `Se muestra el ${from}` : `Se muestran ${from}–${to}`} de ${n} proyectos${n === total ? '' : ` del área (${total} en total)`}.`,
    pager: {
      label: 'Páginas de proyectos',
      prev: 'Proyectos anteriores',
      next: 'Proyectos siguientes',
      page: (i, of) => `Página ${i} de ${of}`,
    },
    openHint: 'Ver resumen',
    dialog: {
      close: 'Cerrar',
      problem: 'Problema',
      role: 'Mi papel',
      tools: 'Herramientas',
      links: 'Enlaces',
      areas: 'Áreas',
      caseLink: 'Leer el caso completo',
      codeLink: 'Ver el repositorio',
      code: 'Código',
      demo: 'Demo',
      article: 'Artículo',
      dataset: 'Dataset',
    },
  },
  en: {
    heading: 'Projects',
    intro: (total) =>
      `${total} projects with public evidence. Choose an area and open a card to see the problem, my role and the links.`,
    filterLabel: 'Area',
    all: 'All areas',
    count: (n, total) => (n === total ? `Showing all ${total} projects.` : `Showing ${n} of ${total} projects.`),
    range: (from, to, n, total) =>
      `Showing ${from === to ? `${from}` : `${from}–${to}`} of ${n} projects${n === total ? '' : ` in this area (${total} in total)`}.`,
    pager: {
      label: 'Project pages',
      prev: 'Previous projects',
      next: 'Next projects',
      page: (i, of) => `Page ${i} of ${of}`,
    },
    openHint: 'See summary',
    dialog: {
      close: 'Close',
      problem: 'Problem',
      role: 'My role',
      tools: 'Tools',
      links: 'Links',
      areas: 'Areas',
      caseLink: 'Read the full case study',
      codeLink: 'View the repository',
      code: 'Code',
      demo: 'Demo',
      article: 'Article',
      dataset: 'Dataset',
    },
  },
};
