import type { Lang } from '../../i18n/routes';
import { links } from '../links';
import type { CaseContent } from './types';

/**
 * Caso: web scraping del registro de la flota pesquera (PR1 del máster de la UOC, en pareja).
 * Fuentes: README, scripts de «1. Scripts/src» y memoria de la PR1 del repositorio
 * datos-web-scraping-flota. La relación con el caso de la flota está respaldada
 * por el README de ml-flota-pesquera (su carpeta data/ contiene los datos de la PR1).
 */

const repo = `<a href="${links.repoScraping}">GitHub</a>`;
const zenodo = `<a href="${links.datasetZenodo}">Zenodo (doi.org/10.5281/zenodo.15132458)</a>`;

const es: CaseContent = {
  meta: {
    title: 'Web scraping del registro de la flota pesquera · Julio Úbeda Quesada',
    description:
      'Caso de estudio: extracción automatizada del registro europeo y del registro español de buques pesqueros con Selenium, Requests y BeautifulSoup.',
  },
  breadcrumb: 'Proyectos',
  kicker: 'Proyecto académico en pareja · Máster en Ciencia de Datos (UOC)',
  title: 'Construir un dataset de la flota a partir de dos registros públicos',
  lead: {
    summaryLabel: 'Resultado',
    summary:
      'Un dataset con los datos técnicos y administrativos de 27.364 buques españoles, obtenido de dos webs oficiales y publicado en Zenodo. Es la base del análisis posterior de la flota.',
    roleLabel: 'Autoría',
    role: 'Trabajo compartido con Lucas Zamora Vera: investigación, código, memoria y vídeo firmados por los dos.',
    link: { label: 'Ver el dataset en Zenodo', href: links.datasetZenodo },
  },
  facts: {
    heading: 'Ficha',
    items: [
      { label: 'Tipo', html: 'Práctica 1 de «Tipología y ciclo de vida de los datos», Máster en Ciencia de Datos (UOC)' },
      { label: 'Autoría', html: 'Julio Úbeda Quesada y Lucas Zamora Vera' },
      { label: 'Fuentes', html: 'Registro de flota de la Comisión Europea · Registro de buques pesqueros del Ministerio de Agricultura, Pesca y Alimentación' },
      { label: 'Resultado', html: '185.354 eventos del registro europeo · 27.364 buques españoles con 16 campos' },
      { label: 'Herramientas', html: 'Python · Selenium · Requests · BeautifulSoup · pandas' },
      { label: 'Dataset', html: zenodo },
      { label: 'Código', html: repo },
    ],
  },
  disclosure: 'Ficha del proyecto e índice',
  tocHeading: 'En esta página',
  sections: [
    {
      id: 'objetivo',
      heading: 'Qué datos hacían falta',
      blocks: [
        {
          type: 'p',
          html: 'Para estudiar cómo ha cambiado la flota española hacía falta, para cada buque, su eslora, arqueo, potencia, material del casco, puerto base, estado en el registro y modalidad de pesca. Esa información es pública, pero se consulta buque a buque en la web del registro español, que pide el identificador europeo del buque (CFR).',
        },
      ],
    },
    {
      id: 'extraccion',
      heading: 'Cómo se obtuvieron',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Registro europeo (Selenium)',
              html: 'Un navegador automatizado abre el buscador de la flota de la UE, selecciona «EU» y «All Vessels», lanza la búsqueda y recorre todas las páginas de resultados con el botón «siguiente». Cada fila de la tabla se guarda: 185.354 eventos de alta, baja o modificación, con país de bandera, CFR, eslora y potencia de referencia.',
            },
            {
              title: 'Lista de buques españoles',
              html: 'Del registro europeo se filtran los buques con bandera española y se obtiene la lista de CFR únicos.',
            },
            {
              title: 'Registro español (Requests y BeautifulSoup)',
              html: 'Para cada CFR se consulta el buscador del ministerio, se abre la ficha del buque y se leen sus pares etiqueta-valor. El resultado se guarda como una fila por buque.',
            },
          ],
        },
        {
          type: 'p',
          html: 'Según el script principal, una ejecución completa dura unas ocho horas: cuatro para el registro europeo y cuatro para las fichas españolas.',
        },
      ],
    },
    {
      id: 'estructura',
      heading: 'Cómo se estructuraron',
      blocks: [
        {
          type: 'table',
          caption: 'Archivos resultantes',
          head: ['Archivo', 'Una fila es', 'Campos principales'],
          rows: [
            ['datos_buques_EU.csv', 'Un evento del registro europeo', 'Bandera, tipo, CFR, código y fecha del evento, nombre, arqueo, eslora, potencia'],
            ['datos_buques_ESP.csv', 'Un buque español', 'CFR, nombre, matrícula, alta, estado, eslora, arqueo, potencia, casco, puerto base, modalidad'],
          ],
        },
        {
          type: 'p',
          html: 'El CFR une los dos archivos. Los campos del registro español se guardaron tal como aparecen en la web, con unidades dentro del texto; convertirlos en números y categorías fue el trabajo de la práctica siguiente.',
        },
      ],
    },
    {
      id: 'problemas',
      heading: 'Problemas durante la extracción',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>Contenido dinámico.</strong> Los elementos de la web europea no estaban disponibles al cargar la página; se usó <code>WebDriverWait</code> para esperar a que fueran visibles o pulsables antes de interactuar.',
            '<strong>Paginación.</strong> El recorrido de resultados depende de detectar cuándo el botón «siguiente» queda desactivado, y de desplazar la página hasta él antes de pulsarlo.',
            '<strong>Selector de resultados por página.</strong> Cambiar a 100 resultados por página funcionaba en el cuaderno pero no en el script, así que esa parte quedó comentada en el código.',
            '<strong>Buques sin ficha.</strong> Algunos CFR no devolvían ninguna ficha en el registro español; el script los registra aparte en lugar de detenerse.',
            '<strong>Carga sobre los servidores.</strong> Según la memoria, las peticiones se espaciaron y limitaron, y solo se accedió a información pública sin datos personales.',
          ],
        },
      ],
    },
    {
      id: 'continuidad',
      heading: 'Qué papel tiene en el análisis de la flota',
      blocks: [
        {
          type: 'p',
          html: 'Este proyecto <strong>obtiene</strong> los datos; el <a href="/es/casos/flota-pesquera/">análisis de la flota</a> los <strong>limpia, explora y modela</strong>. El README del repositorio del análisis indica que su carpeta de datos contiene el archivo generado aquí, <code>datos_buques_ESP.csv</code>, como entrada.',
        },
      ],
    },
    {
      id: 'autoria',
      heading: 'Autoría y licencia',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Trabajo compartido',
      items: [
        'Investigación previa, redacción, código y vídeo: Julio Úbeda Quesada y Lucas Zamora Vera, según la tabla de contribuciones de la memoria.',
        'Propietarios de los datos: Ministerio de Agricultura, Pesca y Alimentación y Comisión Europea, que deben citarse al reutilizarlos.',
      ],
    },
    individual: {
      heading: 'Licencia del dataset',
      items: [
        'El dataset se publicó bajo una licencia Creative Commons de atribución, no comercial y compartir igual, según el README y la memoria del repositorio.',
      ],
    },
  },
};

const en: CaseContent = {
  meta: {
    title: 'Web scraping the fishing fleet register · Julio Úbeda Quesada',
    description:
      'Case study: automated extraction from the EU and Spanish fishing vessel registers with Selenium, Requests and BeautifulSoup.',
  },
  breadcrumb: 'Projects',
  kicker: 'Academic project, done in a pair · MSc in Data Science (UOC)',
  title: 'Building a fleet dataset from two public registers',
  lead: {
    summaryLabel: 'Result',
    summary:
      'A dataset with the technical and administrative data of 27,364 Spanish vessels, collected from two official websites and published on Zenodo. It is the basis of the later fleet analysis.',
    roleLabel: 'Authorship',
    role: 'Shared work with Lucas Zamora Vera: research, code, report and video signed by both.',
    link: { label: 'See the dataset on Zenodo', href: links.datasetZenodo },
  },
  facts: {
    heading: 'Facts',
    items: [
      { label: 'Type', html: 'Assignment 1 of “Data typology and life cycle”, MSc in Data Science (UOC)' },
      { label: 'Authors', html: 'Julio Úbeda Quesada and Lucas Zamora Vera' },
      { label: 'Sources', html: 'European Commission fleet register · Spanish Ministry of Agriculture, Fisheries and Food vessel register' },
      { label: 'Result', html: '185,354 EU register events · 27,364 Spanish vessels with 16 fields' },
      { label: 'Tools', html: 'Python · Selenium · Requests · BeautifulSoup · pandas' },
      { label: 'Dataset', html: zenodo },
      { label: 'Code', html: repo },
    ],
  },
  disclosure: 'Project facts and contents',
  tocHeading: 'On this page',
  sections: [
    {
      id: 'goal',
      heading: 'What data were needed',
      blocks: [
        {
          type: 'p',
          html: 'To study how the Spanish fleet has changed, we needed each vessel’s length, tonnage, engine power, hull material, home port, register status and fishing category. That information is public, but it is looked up one vessel at a time on the Spanish register website, which requires the vessel’s EU identifier (CFR).',
        },
      ],
    },
    {
      id: 'extraction',
      heading: 'How they were collected',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'EU register (Selenium)',
              html: 'An automated browser opens the EU fleet search, selects “EU” and “All Vessels”, runs the search and walks through every results page with the “next” button. Each table row is saved: 185,354 registration, removal or modification events, with flag country, CFR, reference length and power.',
            },
            {
              title: 'List of Spanish vessels',
              html: 'Vessels under the Spanish flag are filtered from the EU register to get the list of unique CFRs.',
            },
            {
              title: 'Spanish register (Requests and BeautifulSoup)',
              html: 'For each CFR the ministry search is queried, the vessel record is opened and its label-value pairs are read. The result is saved as one row per vessel.',
            },
          ],
        },
        {
          type: 'p',
          html: 'According to the main script, a full run takes about eight hours: four for the EU register and four for the Spanish records.',
        },
      ],
    },
    {
      id: 'structure',
      heading: 'How they were structured',
      blocks: [
        {
          type: 'table',
          caption: 'Resulting files',
          head: ['File', 'One row is', 'Main fields'],
          rows: [
            ['datos_buques_EU.csv', 'One EU register event', 'Flag, type, CFR, event code and date, name, tonnage, length, power'],
            ['datos_buques_ESP.csv', 'One Spanish vessel', 'CFR, name, registration, entry date, status, length, tonnage, power, hull, home port, census category'],
          ],
        },
        {
          type: 'p',
          html: 'The CFR links both files. The Spanish register fields were saved as they appear on the website, with units inside the text; turning them into numbers and categories was the work of the next assignment.',
        },
      ],
    },
    {
      id: 'problems',
      heading: 'Problems during extraction',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>Dynamic content.</strong> Elements of the EU website were not available when the page loaded; <code>WebDriverWait</code> was used to wait until they were visible or clickable before interacting.',
            '<strong>Pagination.</strong> Walking through the results depends on detecting when the “next” button becomes disabled, and on scrolling to it before clicking.',
            '<strong>Results-per-page selector.</strong> Switching to 100 results per page worked in the notebook but not in the script, so that part was left commented out in the code.',
            '<strong>Vessels without a record.</strong> Some CFRs returned no record in the Spanish register; the script logs them separately instead of stopping.',
            '<strong>Load on the servers.</strong> According to the report, requests were spaced out and limited, and only public information without personal data was accessed.',
          ],
        },
      ],
    },
    {
      id: 'continuity',
      heading: 'Its role in the fleet analysis',
      blocks: [
        {
          type: 'p',
          html: 'This project <strong>collects</strong> the data; the <a href="/en/case-studies/fishing-fleet/">fleet analysis</a> <strong>cleans, explores and models</strong> them. The analysis repository’s README states that its data folder contains the file produced here, <code>datos_buques_ESP.csv</code>, as input.',
        },
      ],
    },
    {
      id: 'authorship',
      heading: 'Authorship and licence',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Shared work',
      items: [
        'Background research, writing, code and video: Julio Úbeda Quesada and Lucas Zamora Vera, according to the report’s contributions table.',
        'Data owners: the Spanish Ministry of Agriculture, Fisheries and Food and the European Commission, who must be credited when reusing the data.',
      ],
    },
    individual: {
      heading: 'Dataset licence',
      items: [
        'The dataset was published under a Creative Commons attribution, non-commercial, share-alike licence, according to the repository README and report.',
      ],
    },
  },
};

export const fleetScraping: Record<Lang, CaseContent> = { es, en };
