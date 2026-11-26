import type { Lang, RouteKey } from '../i18n/routes';
import { links } from './links';

/**
 * Textos de la portada y de la interfaz, separados por idioma.
 * Reglas editoriales del prototipo:
 * - No se afirma el cargo exacto, el alcance de coordinación ni el estado del máster de la UOC.
 * - Sin teléfono, sin correo y sin materiales internos.
 * - El catálogo de proyectos está en projects.ts y las preguntas libres las atiende el chat (chat.ts).
 * - El HTML incluido en algunos textos es contenido propio y de confianza.
 */

/** Destino de un enlace: una página interna (por clave de ruta y ancla) o una URL externa. */
export type Target =
  | { kind: 'internal'; route: RouteKey; hash?: string }
  | { kind: 'external'; href: string };


export interface SiteContent {
  meta: { title: string; description: string };
  ui: {
    skip: string;
    menu: string;
    langSwitch: string;
    langSwitchLabel: string;
    external: string;
    backHome: string;
    footer: string;
  };
  nav: { label: string; target: Target }[];
  ids: { projects: string; background: string; publications: string; ask: string; contact: string };
  hero: {
    name: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    illustrationNote: string;
  };
  background: {
    heading: string;
    intro: string;
    more: string;
    areas: { title: string; items: { period: string; text: string }[] }[];
    education: { heading: string; items: string[] };
  };
  publications: {
    heading: string;
    articlesHeading: string;
    articles: { citation: string; role: string; href: string; caseLink?: { label: string; route: RouteKey } }[];
    talksHeading: string;
    talks: string[];
  };
  contact: { heading: string; text: string; github: string; linkedin: string };
}

const es: SiteContent = {
  meta: {
    title: 'Julio Úbeda Quesada · Ingeniería y ciencia de datos',
    description:
      'Portfolio de Julio Úbeda Quesada: ingeniería y ciencia de datos con experiencia en pesca y medio marino.',
  },
  ui: {
    skip: 'Saltar al contenido',
    menu: 'Menú',
    langSwitch: 'EN',
    langSwitchLabel: 'Read this page in English',
    external: '(abre un sitio externo)',
    backHome: 'Volver a la portada',
    footer: 'Prototipo local · Contenido en revisión',
  },
  ids: {
    projects: 'proyectos',
    background: 'trayectoria',
    publications: 'publicaciones',
    ask: 'preguntame',
    contact: 'contacto',
  },
  nav: [
    { label: 'Proyectos', target: { kind: 'internal', route: 'home', hash: 'proyectos' } },
    { label: 'Trayectoria', target: { kind: 'internal', route: 'background' } },
    { label: 'Publicaciones', target: { kind: 'internal', route: 'home', hash: 'publicaciones' } },
    { label: 'Pregúntame', target: { kind: 'internal', route: 'home', hash: 'preguntame' } },
    { label: 'Contacto', target: { kind: 'internal', route: 'home', hash: 'contacto' } },
  ],
  hero: {
    name: 'Julio Úbeda Quesada',
    title: 'Ingeniería y ciencia de datos con experiencia en pesca y medio marino',
    subtitle:
      'Me formé en ciencias del mar y he trabajado en investigación pesquera y en muestreo a bordo. Hoy trabajo en Tragsatec con datos del Sistema de Información Pesquera Español (SIPE), donde combino ingeniería de datos, análisis y mapas.',
    primary: 'Ver proyectos',
    secondary: 'Conocer mi trayectoria',
    illustrationNote: 'Ilustración esquemática de una carta náutica',
  },
  background: {
    heading: 'Trayectoria',
    more: 'Ver la trayectoria completa y la cronología',
    intro:
      'Tres experiencias que se complementan: la investigación me dio las preguntas, el trabajo de campo me enseñó de dónde salen los datos y la ingeniería me permite convertirlos en información útil.',
    areas: [
      {
        title: 'Investigación marina',
        items: [
          {
            period: '2018–2020',
            text: 'Universidad de Alicante: seguimiento de praderas de <i>Posidonia oceanica</i> y procesado de muestras de zooplancton.',
          },
          {
            period: '2020–2021',
            text: 'Greenland Institute of Natural Resources: datos de campañas y muestreos biológicos para estudiar los límites de las áreas de gestión pesquera.',
          },
        ],
      },
      {
        title: 'Trabajo de campo',
        items: [
          {
            period: '2021',
            text: 'Observador pesquero en la campaña de atún rojo del Mediterráneo: control, medición de artes y muestreo de especies.',
          },
        ],
      },
      {
        title: 'Ingeniería y ciencia de datos',
        items: [
          {
            period: 'ene.–may. 2022',
            text: 'Universidad de Tesalónica, proyecto EcoScope: control de calidad de bases de datos de campañas oceanográficas y comerciales del ICES.',
          },
          {
            period: '2022–hoy',
            text: 'Tragsatec, con datos del Sistema de Información Pesquera Español (SIPE): procesos ETL, análisis, informes técnicos y mapas con Python, R, SQL y QGIS.',
          },
        ],
      },
    ],
    education: {
      heading: 'Formación',
      items: [
        'Grado en Ciencias del Mar · Universidad de Alicante',
        'Máster en Gestión Pesquera Sostenible · Universidad de Alicante',
        'Máster Universitario en Ciencia de Datos · Universitat Oberta de Catalunya',
      ],
    },
  },
  publications: {
    heading: 'Publicaciones',
    articlesHeading: 'Artículos revisados por pares',
    articles: [
      {
        citation:
          'Úbeda, J., Nogueira, A., Tolimieri, N., Vihtakari, M., Elvarsson, B., Treble, M. y Boje, J. (2023). Using multivariate autoregressive state-space models to examine stock structure of Greenland halibut in the North Atlantic. <i>Fisheries Management and Ecology</i>, 30(5), 521–535.',
        role: 'Primer autor',
        href: links.article2023,
        caseLink: { label: 'Leer el caso', route: 'halibut' },
      },
      {
        citation:
          'Estévez-Barcia, D., Roy, D., Vihtakari, M., Gíslason, D., Lindegren, M., Christensen, A., Úbeda, J. y Johansen, T. (2025). Sex influences the genetic structure of Greenland halibut in the North Atlantic. <i>Ecology and Evolution</i>, 15(2), e70822.',
        role: 'Coautor',
        href: links.article2025,
      },
    ],
    talksHeading: 'Comunicaciones en congresos',
    talks: [
      'Comunicación oral · ICES Annual Science Conference, 2023',
      'Póster · III Congreso de Jóvenes Investigadores del Mar, 2021',
      'Póster · XX Simposio Ibérico de Estudios de Biología Marina (SIEBM), 2019',
    ],
  },
  contact: {
    heading: 'Contacto',
    text: 'Puedes escribirme por LinkedIn o revisar mi código en GitHub.',
    github: 'GitHub · JulioUQ',
    linkedin: 'LinkedIn · juliouq',
  },
};

const en: SiteContent = {
  meta: {
    title: 'Julio Úbeda Quesada · Data engineering and data science',
    description:
      'Portfolio of Julio Úbeda Quesada: data engineering and data science for fisheries and the ocean.',
  },
  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    langSwitch: 'ES',
    langSwitchLabel: 'Leer esta página en español',
    external: '(opens an external site)',
    backHome: 'Back to home',
    footer: 'Local prototype · Content under review',
  },
  ids: {
    projects: 'projects',
    background: 'background',
    publications: 'publications',
    ask: 'ask',
    contact: 'contact',
  },
  nav: [
    { label: 'Projects', target: { kind: 'internal', route: 'home', hash: 'projects' } },
    { label: 'Background', target: { kind: 'internal', route: 'background' } },
    { label: 'Publications', target: { kind: 'internal', route: 'home', hash: 'publications' } },
    { label: 'Ask me', target: { kind: 'internal', route: 'home', hash: 'ask' } },
    { label: 'Contact', target: { kind: 'internal', route: 'home', hash: 'contact' } },
  ],
  hero: {
    name: 'Julio Úbeda Quesada',
    title: 'Data engineering and data science for fisheries and the ocean',
    subtitle:
      'I trained in marine science and have worked in fisheries research and sampling at sea. Today I work at Tragsatec with data from the Spanish Fisheries Information System (SIPE), combining data engineering, analysis and mapping.',
    primary: 'See projects',
    secondary: 'Explore my background',
    illustrationNote: 'Schematic nautical chart illustration',
  },
  background: {
    heading: 'Background',
    more: 'See the full background and timeline',
    intro:
      'Three experiences that complement each other: research gave me the questions, fieldwork showed me where the data come from, and engineering lets me turn them into useful information.',
    areas: [
      {
        title: 'Marine research',
        items: [
          {
            period: '2018–2020',
            text: 'University of Alicante: monitoring <i>Posidonia oceanica</i> meadows and processing zooplankton samples.',
          },
          {
            period: '2020–2021',
            text: 'Greenland Institute of Natural Resources: survey data and biological sampling to study the boundaries of fisheries management areas.',
          },
        ],
      },
      {
        title: 'Fieldwork',
        items: [
          {
            period: '2021',
            text: 'Fisheries observer in the Mediterranean bluefin tuna campaign: inspection, fishing gear measurements and species sampling.',
          },
        ],
      },
      {
        title: 'Data engineering and data science',
        items: [
          {
            period: 'Jan–May 2022',
            text: 'University of Thessaloniki, EcoScope project: quality control of databases from ICES oceanographic and commercial surveys.',
          },
          {
            period: '2022–now',
            text: 'Tragsatec, working with data from the Spanish Fisheries Information System (SIPE): ETL processes, analysis, technical reports and maps with Python, R, SQL and QGIS.',
          },
        ],
      },
    ],
    education: {
      heading: 'Education',
      items: [
        'BSc in Marine Sciences · University of Alicante',
        'MSc in Sustainable Fisheries Management · University of Alicante',
        'MSc in Data Science · Universitat Oberta de Catalunya',
      ],
    },
  },
  publications: {
    heading: 'Publications',
    articlesHeading: 'Peer-reviewed articles',
    articles: [
      {
        citation:
          'Úbeda, J., Nogueira, A., Tolimieri, N., Vihtakari, M., Elvarsson, B., Treble, M. & Boje, J. (2023). Using multivariate autoregressive state-space models to examine stock structure of Greenland halibut in the North Atlantic. <i>Fisheries Management and Ecology</i>, 30(5), 521–535.',
        role: 'First author',
        href: links.article2023,
        caseLink: { label: 'Read the case study', route: 'halibut' },
      },
      {
        citation:
          'Estévez-Barcia, D., Roy, D., Vihtakari, M., Gíslason, D., Lindegren, M., Christensen, A., Úbeda, J. & Johansen, T. (2025). Sex influences the genetic structure of Greenland halibut in the North Atlantic. <i>Ecology and Evolution</i>, 15(2), e70822.',
        role: 'Co-author',
        href: links.article2025,
      },
    ],
    talksHeading: 'Conference contributions',
    talks: [
      'Oral presentation · ICES Annual Science Conference, 2023',
      'Poster · III Congress of Young Marine Researchers (Spain), 2021',
      'Poster · XX Iberian Symposium on Marine Biology Studies (SIEBM), 2019',
    ],
  },
  contact: {
    heading: 'Contact',
    text: 'You can reach me on LinkedIn or browse my code on GitHub.',
    github: 'GitHub · JulioUQ',
    linkedin: 'LinkedIn · juliouq',
  },
};

export const site: Record<Lang, SiteContent> = { es, en };
