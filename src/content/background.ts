import type { Lang, RouteKey } from '../i18n/routes';
import { links } from './links';

/**
 * Trayectoria y formación. Fuente: CV (referencia privada) y casos publicados.
 * Reglas: no se afirma el cargo exacto ni el alcance de coordinación en Tragsatec;
 * el máster de la UOC se mantiene sin fechas ni estado hasta confirmar cómo debe figurar.
 */

export const milestoneKinds = ['field', 'research', 'data', 'education'] as const;
export type MilestoneKind = (typeof milestoneKinds)[number];

export const kindLabels: Record<Lang, Record<MilestoneKind, string>> = {
  es: { field: 'Trabajo de campo', research: 'Investigación', data: 'Sistemas de datos', education: 'Formación' },
  en: { field: 'Fieldwork', research: 'Research', data: 'Data systems', education: 'Education' },
};

/** Enlace a un proyecto o publicación que respalda la relación. */
export type Related = { label: string; route: RouteKey; hash?: string } | { label: string; href: string };

export interface Milestone {
  id: string;
  kind: MilestoneKind;
  /** AAAA-MM. Con precisión anual, el mes es 01 (inicio) o 12 (fin). */
  start: string;
  end: string | null;
  precision: 'month' | 'year';
  text: Record<
    Lang,
    { title: string; place: string; period: string; points: string[]; related?: Related[] }
  >;
}

export const timelineRange = { from: 2014, to: 2027 };

export const milestones: Milestone[] = [
  {
    id: 'bsc',
    kind: 'education',
    start: '2014-01',
    end: '2018-12',
    precision: 'year',
    text: {
      es: {
        title: 'Grado en Ciencias del Mar',
        place: 'Universidad de Alicante',
        period: '2014–2018',
        points: ['Titulación de base en ciencias marinas.'],
      },
      en: {
        title: 'BSc in Marine Sciences',
        place: 'University of Alicante',
        period: '2014–2018',
        points: ['Foundation degree in marine sciences.'],
      },
    },
  },
  {
    id: 'ua-research',
    kind: 'research',
    start: '2018-01',
    end: '2020-12',
    precision: 'year',
    text: {
      es: {
        title: 'Investigación en ecosistemas litorales',
        place: 'Universidad de Alicante',
        period: '2018–2020',
        points: [
          'Seguimiento y evaluación de praderas de Posidonia oceanica, con su infauna, macroinvertebrados y epífitos.',
          'Procesado de muestras de zooplancton para su identificación taxonómica.',
        ],
      },
      en: {
        title: 'Research on coastal ecosystems',
        place: 'University of Alicante',
        period: '2018–2020',
        points: [
          'Monitoring and assessment of Posidonia oceanica meadows, with their infauna, macroinvertebrates and epiphytes.',
          'Processing zooplankton samples for taxonomic identification.',
        ],
      },
    },
  },
  {
    id: 'msc-fisheries',
    kind: 'education',
    start: '2019-01',
    end: '2021-12',
    precision: 'year',
    text: {
      es: {
        title: 'Máster en Gestión Pesquera Sostenible',
        place: 'Universidad de Alicante',
        period: '2019–2021',
        points: ['Máster universitario cursado en paralelo a la investigación en Alicante y en el Greenland Institute of Natural Resources.'],
      },
      en: {
        title: 'MSc in Sustainable Fisheries Management',
        place: 'University of Alicante',
        period: '2019–2021',
        points: ['University master’s degree taken alongside the research in Alicante and at the Greenland Institute of Natural Resources.'],
      },
    },
  },
  {
    id: 'ginr',
    kind: 'research',
    start: '2020-09',
    end: '2021-04',
    precision: 'month',
    text: {
      es: {
        title: 'Investigación pesquera en el Atlántico Norte',
        place: 'Greenland Institute of Natural Resources',
        period: 'sep. 2020 – abr. 2021',
        points: [
          'Exploración y procesado de datos de campañas, información biológica y muestreos de tallas comerciales.',
          'Uso de índices biológicos para contrastar los límites de las áreas de gestión pesquera.',
        ],
        related: [
          { label: 'Caso del fletán negro', route: 'halibut' },
          { label: 'Artículo de 2023 (DOI)', href: links.article2023 },
        ],
      },
      en: {
        title: 'Fisheries research in the North Atlantic',
        place: 'Greenland Institute of Natural Resources',
        period: 'Sep 2020 – Apr 2021',
        points: [
          'Exploring and processing survey data, biological information and commercial size sampling.',
          'Using biological indices to test the boundaries of fisheries management areas.',
        ],
        related: [
          { label: 'Greenland halibut case study', route: 'halibut' },
          { label: '2023 article (DOI)', href: links.article2023 },
        ],
      },
    },
  },
  {
    id: 'observer',
    kind: 'field',
    start: '2021-01',
    end: '2021-12',
    precision: 'month',
    text: {
      es: {
        title: 'Observador pesquero',
        place: 'Campaña de atún rojo del Mediterráneo',
        period: 'ene. – dic. 2021',
        points: [
          'Control e inspección a bordo durante la campaña.',
          'Medición técnica de artes de pesca e identificación y muestreo de especies comerciales y no comerciales.',
        ],
      },
      en: {
        title: 'Fisheries observer',
        place: 'Mediterranean bluefin tuna campaign',
        period: 'Jan – Dec 2021',
        points: [
          'On-board inspection and monitoring during the campaign.',
          'Technical measurement of fishing gear and identification and sampling of commercial and non-commercial species.',
        ],
      },
    },
  },
  {
    id: 'ecoscope',
    kind: 'data',
    start: '2022-01',
    end: '2022-05',
    precision: 'month',
    text: {
      es: {
        title: 'Control de calidad de datos en el proyecto EcoScope',
        place: 'Universidad de Tesalónica (Grecia)',
        period: 'ene. – may. 2022',
        points: [
          'Comprobaciones de calidad sobre bases de datos de campañas oceanográficas y comerciales del ICES.',
        ],
      },
      en: {
        title: 'Data quality control in the EcoScope project',
        place: 'University of Thessaloniki (Greece)',
        period: 'Jan – May 2022',
        points: [
          'Quality checks on databases of ICES oceanographic and commercial surveys.',
        ],
      },
    },
  },
  {
    id: 'tragsatec',
    kind: 'data',
    start: '2022-01',
    end: null,
    precision: 'year',
    text: {
      es: {
        title: 'Datos del Sistema de Información Pesquera Español (SIPE)',
        place: 'Tragsatec · Madrid',
        period: '2022 – actualidad',
        points: [
          'Extracción, transformación, análisis y visualización de datos de SIPE con Python, R, SQL y QGIS.',
          'Procesos ETL e informes técnicos para administraciones públicas, entidades de certificación de pesca sostenible e instituciones de investigación.',
          'Participación en un proyecto de I+D para detectar posible pesca ilegal con modelos de aprendizaje profundo sobre trayectorias GPS y agrupación por composición de capturas.',
          'Participación en iniciativas internacionales con países mediterráneos para normalizar formatos e intercambio de datos con la Unión Europea.',
        ],
      },
      en: {
        title: 'Data from the Spanish Fisheries Information System (SIPE)',
        place: 'Tragsatec · Madrid',
        period: '2022 – present',
        points: [
          'Extracting, transforming, analysing and visualising SIPE data with Python, R, SQL and QGIS.',
          'ETL processes and technical reports for public administrations, sustainable fisheries certification bodies and research institutions.',
          'Participation in an R&D project to detect possible illegal fishing with deep learning models on GPS tracks and clustering by catch composition.',
          'Participation in international initiatives with Mediterranean countries to standardise data formats and exchange with the European Union.',
        ],
      },
    },
  },
  {
    id: 'atrium',
    kind: 'education',
    start: '2023-01',
    end: '2024-12',
    precision: 'year',
    text: {
      es: {
        title: 'Máster en Análisis Big Data y Experto en Python',
        place: 'Grupo Atrium',
        period: '2023–2024',
        points: ['Programa especializado, no universitario, cursado mientras trabajaba con datos pesqueros.'],
      },
      en: {
        title: 'Master’s in Big Data Analysis and Python Expert',
        place: 'Grupo Atrium',
        period: '2023–2024',
        points: ['Specialised, non-university programme taken while working with fisheries data.'],
      },
    },
  },
];

/* ------------------------------------------------------------------------------------------ */
/* Página de trayectoria                                                                       */
/* ------------------------------------------------------------------------------------------ */

export interface Stage {
  id: string;
  kicker: string;
  title: string;
  period: string;
  paragraphs: string[];
  connections?: Related[];
}

export interface EducationItem {
  title: string;
  org: string;
  period?: string;
  note?: string;
  related?: Related[];
}

/** Idioma con su nivel del Marco Común Europeo (MCER); «native» llena la escala. */
export interface LanguageItem {
  name: string;
  level: 'native' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  levelLabel: string;
  cert?: string;
}

export interface BackgroundPage {
  meta: { title: string; description: string };
  kicker: string;
  title: string;
  intro: string;
  timeline: {
    heading: string;
    intro: string;
    filterLabel: string;
    all: string;
    resultsOne: string;
    resultsMany: string;
    present: string;
    detailHint: string;
    precisionNote: string;
    relatedLabel: string;
    listHeading: string;
  };
  stagesHeading: string;
  stages: Stage[];
  /** La formación completa se muestra en la portada; aquí solo se enlaza. */
  educationPointer: { text: string; link: string };
  education: {
    heading: string;
    intro: string;
    degrees: { heading: string; items: EducationItem[] };
    programs: { heading: string; items: EducationItem[] };
    certifications: { heading: string; intro: string; items: EducationItem[] };
    languages: { heading: string; items: LanguageItem[] };
  };
}

const es: BackgroundPage = {
  meta: {
    title: 'Trayectoria · Julio Úbeda Quesada',
    description:
      'Trayectoria de Julio Úbeda Quesada: investigación marina, observación pesquera, control de calidad de datos y trabajo con datos pesqueros.',
  },
  kicker: 'Trayectoria',
  title: 'Del muestreo en el mar a los sistemas de datos pesqueros',
  intro:
    'Cuatro etapas que se complementan: la investigación planteó las preguntas, la observación a bordo mostró cómo se recogen los datos, el control de calidad enseñó a revisarlos y el trabajo actual los convierte en información útil.',
  timeline: {
    heading: 'Cronología',
    intro:
      'Elige un hito para ver el lugar, el periodo, lo que hacía y su relación con proyectos o publicaciones. Las etapas que coinciden en el tiempo aparecen solapadas.',
    filterLabel: 'Filtrar por tipo',
    all: 'Todo',
    resultsOne: 'hito',
    resultsMany: 'hitos',
    present: 'actualidad',
    detailHint: 'Selecciona un hito de la cronología.',
    precisionNote:
      'Las barras con fecha solo por año empiezan en enero y terminan en diciembre; los periodos con mes conocido se muestran con su mes exacto.',
    relatedLabel: 'Relacionado',
    listHeading: 'Detalle del hito',
  },
  stagesHeading: 'Etapas',
  educationPointer: {
    text: 'La cronología incluye las titulaciones; el detalle de la formación, las certificaciones y los idiomas está en la portada.',
    link: 'Ver formación',
  },
  stages: [
    {
      id: 'investigacion',
      kicker: 'Investigación marina',
      title: 'Universidad de Alicante y Greenland Institute of Natural Resources',
      period: '2018 – abr. 2021',
      paragraphs: [
        'En la Universidad de Alicante participé en el seguimiento de praderas de <i>Posidonia oceanica</i> y en el procesado de muestras de zooplancton.',
        'En el Greenland Institute of Natural Resources trabajé con datos de campañas científicas, información biológica y muestreos de tallas comerciales, con un objetivo concreto: comprobar si los límites de las áreas de gestión pesquera se corresponden con la biología de la especie.',
      ],
      connections: [
        { label: 'Caso del fletán negro (primer autor)', route: 'halibut' },
        { label: 'Publicaciones', route: 'home', hash: 'publicaciones' },
      ],
    },
    {
      id: 'observacion',
      kicker: 'Observación pesquera',
      title: 'Campaña de atún rojo del Mediterráneo',
      period: 'ene. – dic. 2021',
      paragraphs: [
        'Como observador pesquero hice tareas de control e inspección durante la campaña, medí artes de pesca e identifiqué y muestreé especies comerciales y no comerciales.',
        'Esta etapa explica una parte de cómo trabajo con datos: saber en qué condiciones se toma un dato a bordo ayuda a interpretar sus huecos y sus errores.',
      ],
    },
    {
      id: 'ecoscope',
      kicker: 'Control de calidad',
      title: 'Proyecto EcoScope · Universidad de Tesalónica',
      period: 'ene. – may. 2022',
      paragraphs: [
        'Hice comprobaciones de calidad sobre bases de datos de campañas oceanográficas y comerciales del ICES dentro del proyecto EcoScope.',
      ],
    },
    {
      id: 'sipe',
      kicker: 'Sistemas de datos',
      title: 'Tragsatec, con datos del Sistema de Información Pesquera Español (SIPE)',
      period: '2022 – actualidad',
      paragraphs: [
        'Trabajo en la extracción, transformación, análisis y visualización de datos de SIPE con Python, R, SQL y QGIS. Desarrollo procesos ETL e informes técnicos para administraciones públicas, entidades de certificación de pesca sostenible e instituciones de investigación.',
        'He participado en un proyecto de I+D para detectar posible pesca ilegal con modelos de aprendizaje profundo aplicados a trayectorias GPS de buques y técnicas de agrupación según la composición de las capturas, y en iniciativas internacionales con países mediterráneos para normalizar formatos e intercambio de datos con la Unión Europea.',
      ],
    },
  ],
  education: {
    heading: 'Formación',
    intro:
      'Titulaciones universitarias, programas especializados, certificaciones relacionadas con los proyectos de esta web e idiomas.',
    degrees: {
      heading: 'Titulaciones universitarias',
      items: [
        {
          title: 'Máster Universitario en Ciencia de Datos',
          org: 'Universitat Oberta de Catalunya (UOC)',
          note: 'Proyectos académicos del máster en esta web:',
          related: [
            { label: 'Flota pesquera', route: 'fleet' },
            { label: 'Web scraping del registro', route: 'scraping' },
          ],
        },
        {
          title: 'Máster en Gestión Pesquera Sostenible',
          org: 'Universidad de Alicante',
          period: '2019–2021',
        },
        { title: 'Grado en Ciencias del Mar', org: 'Universidad de Alicante', period: '2014–2018' },
      ],
    },
    programs: {
      heading: 'Programas especializados',
      items: [
        {
          title: 'Máster en Análisis Big Data y Experto en Python',
          org: 'Grupo Atrium',
          period: '2023–2024',
        },
      ],
    },
    certifications: {
      heading: 'Certificaciones seleccionadas',
      intro: 'Cursos con relación directa con los proyectos publicados.',
      items: [
        {
          title: 'Uso de SIG en el establecimiento de Áreas Marinas Protegidas',
          org: 'FAO',
          related: [{ label: 'Generador de mapas', route: 'maps' }],
        },
        {
          title: 'Curso de PyQGIS',
          org: 'MappingGIS',
          related: [{ label: 'Generador de mapas', route: 'maps' }],
        },
        { title: 'Bases de datos espaciales con PostGIS y PostgreSQL', org: 'IMASGAL' },
        {
          title: 'Desarrollo de dashboards con Python',
          org: 'Grupo Tragsa',
          related: [{ label: 'Plataforma local de analítica', route: 'platform' }],
        },
        {
          title: 'Neural Networks and Deep Learning',
          org: 'Coursera',
          related: [{ label: 'Flota pesquera (red densa comparada)', route: 'fleet' }],
        },
        {
          title: 'Control de versiones con Git y GitHub',
          org: 'adrformacion',
          related: [{ label: 'Curso de estadística (integración continua)', route: 'course' }],
        },
        { title: 'AWS Academy Graduate · Cloud Foundations', org: 'AWS Academy' },
      ],
    },
    languages: {
      heading: 'Idiomas',
      items: [
        { name: 'Español', level: 'native', levelLabel: 'Nativo' },
        { name: 'Inglés', level: 'C1', levelLabel: 'C1', cert: 'Advanced Certificate · University of Cambridge' },
        { name: 'Francés', level: 'B1', levelLabel: 'B1', cert: 'Escuela Oficial de Idiomas' },
      ],
    },
  },
};

const en: BackgroundPage = {
  meta: {
    title: 'Background · Julio Úbeda Quesada',
    description:
      'Background of Julio Úbeda Quesada: marine research, fisheries observation, data quality control and work with fisheries data.',
  },
  kicker: 'Background',
  title: 'From sampling at sea to fisheries data systems',
  intro:
    'Four complementary stages: research raised the questions, observing at sea showed how the data are collected, quality control taught me to check them, and my current work turns them into useful information.',
  timeline: {
    heading: 'Timeline',
    intro:
      'Choose a milestone to see the place, the period, what I did and how it relates to projects or publications. Stages that overlap in time are shown overlapping.',
    filterLabel: 'Filter by type',
    all: 'All',
    resultsOne: 'milestone',
    resultsMany: 'milestones',
    present: 'present',
    detailHint: 'Select a milestone from the timeline.',
    precisionNote:
      'Bars dated by year only start in January and end in December; periods with a known month are shown with their exact month.',
    relatedLabel: 'Related',
    listHeading: 'Milestone details',
  },
  stagesHeading: 'Stages',
  educationPointer: {
    text: 'The timeline includes the degrees; full details of education, certifications and languages are on the home page.',
    link: 'See education',
  },
  stages: [
    {
      id: 'research',
      kicker: 'Marine research',
      title: 'University of Alicante and Greenland Institute of Natural Resources',
      period: '2018 – Apr 2021',
      paragraphs: [
        'At the University of Alicante I took part in monitoring <i>Posidonia oceanica</i> meadows and processing zooplankton samples.',
        'At the Greenland Institute of Natural Resources I worked with scientific survey data, biological information and commercial size sampling, with a specific goal: checking whether fisheries management boundaries match the biology of the species.',
      ],
      connections: [
        { label: 'Greenland halibut case study (first author)', route: 'halibut' },
        { label: 'Publications', route: 'home', hash: 'publications' },
      ],
    },
    {
      id: 'observation',
      kicker: 'Fisheries observation',
      title: 'Mediterranean bluefin tuna campaign',
      period: 'Jan – Dec 2021',
      paragraphs: [
        'As a fisheries observer I carried out inspection and monitoring during the campaign, measured fishing gear and identified and sampled commercial and non-commercial species.',
        'This stage explains part of how I work with data: knowing the conditions in which a record is taken on board helps interpret its gaps and errors.',
      ],
    },
    {
      id: 'ecoscope',
      kicker: 'Quality control',
      title: 'EcoScope project · University of Thessaloniki',
      period: 'Jan – May 2022',
      paragraphs: [
        'I carried out quality checks on databases from ICES oceanographic and commercial surveys within the EcoScope project.',
      ],
    },
    {
      id: 'sipe',
      kicker: 'Data systems',
      title: 'Tragsatec, working with data from the Spanish Fisheries Information System (SIPE)',
      period: '2022 – present',
      paragraphs: [
        'I work on extracting, transforming, analysing and visualising SIPE data with Python, R, SQL and QGIS. I develop ETL processes and technical reports for public administrations, sustainable fisheries certification bodies and research institutions.',
        'I have taken part in an R&D project to detect possible illegal fishing with deep learning models applied to vessel GPS tracks and clustering by catch composition, and in international initiatives with Mediterranean countries to standardise data formats and exchange with the European Union.',
      ],
    },
  ],
  education: {
    heading: 'Education',
    intro:
      'University degrees, specialised programmes, certifications related to the projects on this site, and languages.',
    degrees: {
      heading: 'University degrees',
      items: [
        {
          title: 'MSc in Data Science',
          org: 'Universitat Oberta de Catalunya (UOC)',
          note: 'Academic projects from the master’s on this site:',
          related: [
            { label: 'Fishing fleet', route: 'fleet' },
            { label: 'Fleet register web scraping', route: 'scraping' },
          ],
        },
        { title: 'MSc in Sustainable Fisheries Management', org: 'University of Alicante', period: '2019–2021' },
        { title: 'BSc in Marine Sciences', org: 'University of Alicante', period: '2014–2018' },
      ],
    },
    programs: {
      heading: 'Specialised programmes',
      items: [{ title: 'Master’s in Big Data Analysis and Python Expert', org: 'Grupo Atrium', period: '2023–2024' }],
    },
    certifications: {
      heading: 'Selected certifications',
      intro: 'Courses directly related to the published projects.',
      items: [
        {
          title: 'Use of GIS in establishing Marine Protected Areas',
          org: 'FAO',
          related: [{ label: 'Map generator', route: 'maps' }],
        },
        { title: 'PyQGIS course', org: 'MappingGIS', related: [{ label: 'Map generator', route: 'maps' }] },
        { title: 'Spatial databases with PostGIS and PostgreSQL', org: 'IMASGAL' },
        {
          title: 'Dashboard development with Python',
          org: 'Grupo Tragsa',
          related: [{ label: 'Local analytics platform', route: 'platform' }],
        },
        {
          title: 'Neural Networks and Deep Learning',
          org: 'Coursera',
          related: [{ label: 'Fishing fleet (dense network compared)', route: 'fleet' }],
        },
        {
          title: 'Version control with Git and GitHub',
          org: 'adrformacion',
          related: [{ label: 'Statistics course (continuous integration)', route: 'course' }],
        },
        { title: 'AWS Academy Graduate · Cloud Foundations', org: 'AWS Academy' },
      ],
    },
    languages: {
      heading: 'Languages',
      items: [
        { name: 'Spanish', level: 'native', levelLabel: 'Native' },
        { name: 'English', level: 'C1', levelLabel: 'C1', cert: 'Advanced Certificate · University of Cambridge' },
        { name: 'French', level: 'B1', levelLabel: 'B1', cert: 'Official School of Languages (Spain)' },
      ],
    },
  },
};

export const backgroundPage: Record<Lang, BackgroundPage> = { es, en };
