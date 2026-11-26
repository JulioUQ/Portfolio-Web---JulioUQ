import type { Lang, RouteKey } from '../i18n/routes';
import { links } from './links';

/**
 * Catálogo de proyectos: una sola fuente para los filtros, las tarjetas, las ventanas
 * flotantes y el chat. Los textos de cada idioma van separados de los componentes.
 */

export const areaIds = ['data-eng', 'gis', 'research', 'ml', 'outreach'] as const;
export type AreaId = (typeof areaIds)[number];

export const areaLabels: Record<Lang, Record<AreaId, string>> = {
  es: {
    'data-eng': 'Ingeniería de datos',
    gis: 'GIS',
    research: 'Investigación',
    ml: 'Machine Learning',
    outreach: 'Divulgación',
  },
  en: {
    'data-eng': 'Data engineering',
    gis: 'GIS',
    research: 'Research',
    ml: 'Machine learning',
    outreach: 'Outreach',
  },
};

export type ProjectArt = 'halibut' | 'map' | 'fleet' | 'scraping' | 'course' | 'platform';
/** Imagen de la ventana flotante: una figura con atribución o una ilustración esquemática. */
export type ProjectVisual = { kind: 'figure'; key: 'halibutHypotheses' | 'mapExample' } | { kind: 'art' };

export interface ProjectLinkSet {
  code?: string;
  demo?: string | { route: RouteKey };
  article?: string;
  dataset?: string;
}

export interface ProjectText {
  context: string;
  title: string;
  summary: string;
  problem: string;
  role: string;
  visualCaption: string;
}

export interface Project {
  id: string;
  route: RouteKey;
  areas: AreaId[];
  art: ProjectArt;
  visual: ProjectVisual;
  tools: string[];
  links: ProjectLinkSet;
  text: Record<Lang, ProjectText>;
}

export const projects: Project[] = [
  {
    id: 'halibut',
    route: 'halibut',
    areas: ['research'],
    art: 'halibut',
    visual: { kind: 'figure', key: 'halibutHypotheses' },
    tools: ['R', 'MARSS', 'ggOceanMaps'],
    links: { code: links.repoMarss, article: links.article2023 },
    text: {
      es: {
        context: 'Artículo revisado por pares · 2023',
        title: '¿Coinciden los límites de gestión con la estructura del fletán negro?',
        summary:
          'Modelos de espacio de estados sobre campañas científicas en cuatro regiones del Atlántico Norte para contrastar la delimitación de los stocks.',
        problem:
          'El fletán negro se gestiona en stocks separados por límites administrativos. El estudio comprueba si las tendencias de las campañas científicas respaldan esos límites o apuntan a otra estructura de poblaciones.',
        role: 'Primer autor y autor de correspondencia de un análisis en equipo (siete autores); mantengo el repositorio del estudio.',
        visualCaption:
          'Figura 2 de Úbeda et al. (2023): las siete hipótesis de estructura comparadas. CC BY 4.0.',
      },
      en: {
        context: 'Peer-reviewed article · 2023',
        title: 'Do management boundaries match the population structure of Greenland halibut?',
        summary:
          'State-space models fitted to scientific surveys in four North Atlantic regions to test how the stocks are delineated.',
        problem:
          'Greenland halibut is managed in stocks separated by administrative boundaries. The study tests whether trends from scientific surveys support those boundaries or point to a different population structure.',
        role: 'First and corresponding author of a team analysis (seven authors); I maintain the study’s repository.',
        visualCaption:
          'Figure 2 from Úbeda et al. (2023): the seven structure hypotheses compared. CC BY 4.0.',
      },
    },
  },
  {
    id: 'maps',
    route: 'maps',
    areas: ['gis', 'data-eng'],
    art: 'map',
    visual: { kind: 'figure', key: 'mapExample' },
    tools: ['Python', 'Streamlit', 'Folium', 'GeoPandas'],
    links: { code: links.repoMapGenerator, demo: { route: 'mapsDemo' } },
    text: {
      es: {
        context: 'Herramienta · Repositorio público',
        title: 'Generador de mapas interactivos',
        summary:
          'Aplicación local que convierte posiciones y capas geográficas en un mapa HTML autocontenido, con leyendas, filtros y configuración reutilizable, sin programar.',
        problem:
          'Compartir un mapa que otra persona pueda filtrar y consultar sin instalar un SIG ni publicar los datos en un servidor.',
        role: 'Diseño y desarrollo de la herramienta; mantengo su repositorio público.',
        visualCaption: 'Mapa de ejemplo generado con datos ficticios: puntos por especie, zonas, filtros y leyenda.',
      },
      en: {
        context: 'Tool · Public repository',
        title: 'Interactive map generator',
        summary:
          'A local app that turns positions and geographic layers into a self-contained HTML map, with legends, filters and reusable settings, no coding required.',
        problem:
          'Sharing a map that someone else can filter and query without installing GIS software or publishing the data on a server.',
        role: 'I designed and built the tool and maintain its public repository.',
        visualCaption: 'Example map generated from fictitious data: points by species, zones, filters and legend.',
      },
    },
  },
  {
    id: 'fleet',
    route: 'fleet',
    areas: ['ml', 'data-eng'],
    art: 'fleet',
    visual: { kind: 'art' },
    tools: ['Python', 'pandas', 'scikit-learn', 'LightGBM', 'Keras'],
    links: { code: links.repoFleet },
    text: {
      es: {
        context: 'Proyecto académico en pareja · Máster en Ciencia de Datos (UOC)',
        title: 'La flota pesquera española, 1987–2025',
        summary:
          'Del registro de buques a una base limpia para el análisis: limpieza, exploración, clasificación del arte de pesca y agrupación de buques. Con Lucas Zamora Vera.',
        problem:
          'El registro oficial describe cada buque por separado y con formatos heterogéneos. El proyecto lo convierte en una base analizable para estudiar la evolución, la estructura y la distribución de la flota.',
        role: 'Coautor con Lucas Zamora Vera: limpieza, análisis, modelado y memoria firmados por los dos.',
        visualCaption: 'Ilustración esquemática. El caso incluye un gráfico interactivo con la serie anual de la flota.',
      },
      en: {
        context: 'Academic project, done in a pair · MSc in Data Science (UOC)',
        title: 'The Spanish fishing fleet, 1987–2025',
        summary:
          'From the vessel register to a clean analytical base: cleaning, exploration, fishing-gear classification and vessel clustering. With Lucas Zamora Vera.',
        problem:
          'The official register describes each vessel separately and in heterogeneous formats. The project turns it into an analysable base to study how the fleet has changed, its structure and its distribution.',
        role: 'Co-author with Lucas Zamora Vera: cleaning, analysis, modelling and report signed by both.',
        visualCaption: 'Schematic illustration. The case study includes an interactive chart of the yearly fleet series.',
      },
    },
  },
  {
    id: 'scraping',
    route: 'scraping',
    areas: ['data-eng'],
    art: 'scraping',
    visual: { kind: 'art' },
    tools: ['Python', 'Selenium', 'Requests', 'BeautifulSoup', 'pandas'],
    links: { code: links.repoScraping, dataset: links.datasetZenodo },
    text: {
      es: {
        context: 'Proyecto académico en pareja · Máster en Ciencia de Datos (UOC)',
        title: 'Web scraping del registro de la flota pesquera',
        summary:
          'Extracción automatizada del registro europeo y del registro español de buques pesqueros para construir un dataset técnico de la flota. Con Lucas Zamora Vera.',
        problem:
          'Los datos técnicos de cada buque solo se podían consultar ficha a ficha en webs públicas. Hacía falta un conjunto de datos completo y reutilizable.',
        role: 'Coautor con Lucas Zamora Vera: investigación previa, código, memoria y vídeo firmados por los dos.',
        visualCaption: 'Ilustración esquemática del flujo: registro europeo → lista de CFR → fichas del registro español → CSV.',
      },
      en: {
        context: 'Academic project, done in a pair · MSc in Data Science (UOC)',
        title: 'Web scraping the fishing fleet register',
        summary:
          'Automated extraction from the EU and Spanish fishing vessel registers to build a technical dataset of the fleet. With Lucas Zamora Vera.',
        problem:
          'Each vessel’s technical data could only be looked up one record at a time on public websites. A complete, reusable dataset was needed.',
        role: 'Co-author with Lucas Zamora Vera: background research, code, report and video signed by both.',
        visualCaption: 'Schematic illustration of the flow: EU register → list of CFRs → Spanish register records → CSV.',
      },
    },
  },
  {
    id: 'course',
    route: 'course',
    areas: ['outreach'],
    art: 'course',
    visual: { kind: 'art' },
    tools: ['Quarto', 'Python', 'SciPy', 'statsmodels', 'GitHub Actions'],
    links: { code: links.repoCourse, demo: links.siteCourse },
    text: {
      es: {
        context: 'Divulgación · Curso en línea',
        title: 'Curso de Estadística Básica',
        summary:
          'Libro web en español con seis módulos de teoría y prácticas en Python, una librería propia de funciones y un proyecto integrador.',
        problem:
          'Aprender estadística sin base previa suele obligar a elegir entre teoría sin práctica o recetas sin explicación. El curso une ambas con ejemplos que se pueden ejecutar.',
        role: 'Autor del curso, de la librería stats_toolkit y de su publicación continua en GitHub Pages.',
        visualCaption: 'Ilustración esquemática: un histograma con su curva normal, como el logotipo del curso.',
      },
      en: {
        context: 'Outreach · Online course',
        title: 'Basic Statistics course',
        summary:
          'A Spanish-language web book with six modules of theory and Python practice, its own function library and a capstone project.',
        problem:
          'Learning statistics from scratch often means choosing between theory without practice or recipes without explanation. The course combines both with runnable examples.',
        role: 'Author of the course, of the stats_toolkit library and of its continuous publication on GitHub Pages.',
        visualCaption: 'Schematic illustration: a histogram with its normal curve, like the course logo.',
      },
    },
  },
  {
    id: 'platform',
    route: 'platform',
    areas: ['data-eng'],
    art: 'platform',
    visual: { kind: 'art' },
    tools: ['n8n', 'SQL Server', 'Python', 'Dash', 'Docker', 'GitHub Actions'],
    links: { code: links.repoPlatform, demo: links.sitePlatform },
    text: {
      es: {
        context: 'Plataforma de datos · Repositorio público',
        title: 'Plataforma local de analítica',
        summary:
          'Flujo completo en un equipo: n8n importa ficheros a SQL Server, Python los consulta y un dashboard en Dash los muestra; solo los agregados mensuales se publican.',
        problem:
          'Convertir exportaciones sueltas de Excel en indicadores mensuales fiables sin subir los datos individuales a ningún servicio externo.',
        role: 'Diseño, implementación y documentación de la plataforma.',
        visualCaption: 'Ilustración esquemática del flujo: ficheros → n8n → SQL Server → Python → Dash.',
      },
      en: {
        context: 'Data platform · Public repository',
        title: 'Local analytics platform',
        summary:
          'A full pipeline on one computer: n8n imports files into SQL Server, Python queries them and a Dash dashboard shows them; only monthly aggregates are published.',
        problem:
          'Turning loose Excel exports into reliable monthly indicators without uploading the individual records to any external service.',
        role: 'Design, implementation and documentation of the platform.',
        visualCaption: 'Schematic illustration of the flow: files → n8n → SQL Server → Python → Dash.',
      },
    },
  },
];
