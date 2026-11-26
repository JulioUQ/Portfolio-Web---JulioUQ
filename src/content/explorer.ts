import type { Lang } from '../i18n/routes';

/** Textos de la interfaz del explorador de proyectos (filtros, tarjetas y ventanas flotantes). */
export interface ExplorerContent {
  heading: string;
  intro: string;
  filterLabel: string;
  all: string;
  count: (n: number, total: number) => string;
  openHint: string;
  dialog: {
    close: string;
    problem: string;
    role: string;
    tools: string;
    links: string;
    areas: string;
    caseLink: string;
    code: string;
    demo: string;
    article: string;
    dataset: string;
  };
}

export const explorer: Record<Lang, ExplorerContent> = {
  es: {
    heading: 'Proyectos',
    intro:
      'Seis trabajos con evidencia pública. Filtra por área y abre una tarjeta para ver el problema, mi papel y los enlaces.',
    filterLabel: 'Filtrar proyectos por área',
    all: 'Todos',
    count: (n, total) =>
      n === total ? `Se muestran los ${total} proyectos.` : `Se ${n === 1 ? 'muestra' : 'muestran'} ${n} de ${total} proyectos.`,
    openHint: 'Ver resumen',
    dialog: {
      close: 'Cerrar',
      problem: 'Problema',
      role: 'Mi papel',
      tools: 'Herramientas',
      links: 'Enlaces',
      areas: 'Áreas',
      caseLink: 'Leer el caso completo',
      code: 'Código',
      demo: 'Demo',
      article: 'Artículo',
      dataset: 'Dataset',
    },
  },
  en: {
    heading: 'Projects',
    intro:
      'Six pieces of work with public evidence. Filter by area and open a card to see the problem, my role and the links.',
    filterLabel: 'Filter projects by area',
    all: 'All',
    count: (n, total) => (n === total ? `Showing all ${total} projects.` : `Showing ${n} of ${total} projects.`),
    openHint: 'See summary',
    dialog: {
      close: 'Close',
      problem: 'Problem',
      role: 'My role',
      tools: 'Tools',
      links: 'Links',
      areas: 'Areas',
      caseLink: 'Read the full case study',
      code: 'Code',
      demo: 'Demo',
      article: 'Article',
      dataset: 'Dataset',
    },
  },
};
