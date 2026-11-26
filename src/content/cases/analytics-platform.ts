import type { Lang } from '../../i18n/routes';
import { links } from '../links';
import type { CaseContent } from './types';

/**
 * Caso: plataforma local de analítica (n8n → SQL Server → Python → Dash).
 * Fuentes: README, GUIA_OPERATIVA.md, etl/n8n/README.md y publicacion/agregados_alquileres.json
 * del repositorio Plataforma-Analitica-Local. La demo pública respondía (HTTP 200) el 26/11/2026;
 * GitHub Pages distingue mayúsculas en la ruta, así que la URL debe conservar las del repositorio.
 * No se reproducen cifras de la demo: son agregados reales de alquileres.
 */

const repo = `<a href="${links.repoPlatform}">GitHub</a>`;
const docs = `<a href="${links.docsPlatform}">Guía operativa</a>`;
const docsEn = `<a href="${links.docsPlatform}">Operations guide (in Spanish)</a>`;
const demo = `<a href="${links.sitePlatform}">juliouq.github.io/Plataforma-Analitica-Local</a>`;

const es: CaseContent = {
  meta: {
    title: 'Plataforma local de analítica · Julio Úbeda Quesada',
    description:
      'Caso de estudio: flujo de datos local con ingesta en n8n, almacenamiento en SQL Server y dashboard en Python y Dash; solo los agregados mensuales se publican.',
  },
  breadcrumb: 'Proyectos',
  kicker: 'Plataforma de datos · Repositorio público',
  title: 'Del Excel exportado al indicador mensual, sin sacar los datos del equipo',
  lead: {
    summaryLabel: 'Qué resuelve',
    summary:
      'n8n importa a diario los Excel de Airbnb y Booking a SQL Server, Python los consulta y un dashboard en Dash muestra los indicadores. A la web pública solo llegan totales mensuales por plataforma.',
    roleLabel: 'Mi papel',
    role: 'Diseño, implementación y documentación de la plataforma.',
    link: { label: 'Leer la documentación', href: links.docsPlatform },
  },
  facts: {
    heading: 'Ficha',
    items: [
      { label: 'Ingesta', html: 'n8n en Docker · ejecución diaria a las 09:00 o manual' },
      { label: 'Almacenamiento', html: 'SQL Server · una base por proyecto · cargas transaccionales' },
      { label: 'Consulta y visualización', html: 'Python · Dash (local) · Plotly (página pública)' },
      { label: 'Publicación', html: 'GitHub Actions → GitHub Pages, solo con agregados mensuales' },
      { label: 'Documentación', html: docs },
      { label: 'Demo pública', html: demo },
      { label: 'Código', html: repo },
    ],
  },
  disclosure: 'Ficha de la plataforma e índice',
  tocHeading: 'En esta página',
  sections: [
    {
      id: 'problema',
      heading: 'El problema',
      blocks: [
        {
          type: 'p',
          html: 'Las plataformas de alquiler permiten exportar reservas y pagos en Excel, pero cada una con sus columnas, sus definiciones y sus fechas. Juntar esos archivos a mano cada mes es lento y propenso a errores, y subirlos a un servicio externo expondría datos de huéspedes y reservas.',
        },
      ],
    },
    {
      id: 'flujo',
      heading: 'El flujo de datos',
      blocks: [
        { type: 'component', name: 'flowDiagram' },
        {
          type: 'steps',
          items: [
            {
              title: 'Ingesta con n8n',
              html: 'Un workflow busca los Excel en una carpeta local, reconoce la plataforma por los encabezados, calcula una huella SHA-256 para no cargar dos veces el mismo archivo y valida todo el contenido: divisa, fechas, importes, noches y cuadre de cada pago con sus reservas. Con un solo error, el archivo se rechaza entero con un motivo claro.',
            },
            {
              title: 'Carga en SQL Server',
              html: 'El lote llega a un procedimiento almacenado como parámetro JSON. SQL Server lo vuelve a validar y lo carga en una sola transacción con <code>MERGE</code> por clave de reserva o pago: entra todo o nada. Un bloqueo de aplicación evita dos cargas simultáneas y cada ejecución queda registrada sin datos personales.',
            },
            {
              title: 'Consulta con Python',
              html: 'Un módulo compartido consulta una vista de agregados mensuales y trata los importes como decimales, redondeados a céntimos solo al mostrarlos. Ese mismo módulo alimenta el dashboard local y la exportación pública.',
            },
            {
              title: 'Dashboard en Dash',
              html: 'En local, el dashboard filtra por plataforma y periodo, muestra indicadores etiquetados, un gráfico mensual del neto por plataforma y una tabla, y puede volver a consultar SQL Server.',
            },
            {
              title: 'Publicación de agregados',
              html: 'Un script exporta solo los totales mensuales por plataforma a un JSON; al subirlo, GitHub Actions reconstruye la página pública con ese único archivo.',
            },
          ],
        },
      ],
    },
    {
      id: 'demo',
      heading: 'Qué muestra la demo pública',
      blocks: [
        {
          type: 'p',
          html: 'La página publicada en GitHub Pages muestra los <strong>indicadores mensuales reales</strong> de la última exportación: reservas, noches, importe bruto, comisiones de la plataforma, gastos de pago, neto de reservas y cobrado, por plataforma y mes, con filtro por plataforma, gráfico interactivo y tabla. No incluye reservas individuales, huéspedes ni referencias de reserva, que solo existen en el equipo local. Al revisarla para esta web (25/11/2026) estaba disponible.',
        },
        {
          type: 'actions',
          items: [
            { label: 'Abrir la demo pública', href: links.sitePlatform, primary: true },
            { label: 'Leer la guía operativa', href: links.docsPlatform },
          ],
        },
        {
          type: 'p',
          html: 'El repositorio incluye además una demo con datos inventados (20 cobros ficticios de cuatro inmuebles en un CSV) para probar la carga de principio a fin sin datos reales.',
        },
      ],
    },
    {
      id: 'limitaciones',
      heading: 'Limitaciones',
      blocks: [
        {
          type: 'list',
          items: [
            'La importación programada solo se ejecuta si Docker y SQL Server están en marcha a las 09:00; si el equipo está apagado, esa ejecución se pierde.',
            'No descarga nada de las plataformas: procesa los Excel que se dejan en la carpeta.',
            'Solo admite euros y los formatos de exportación documentados de Airbnb (Pagos) y Booking (Reservas).',
            'La página pública se actualiza a mano, cuando se exportan y suben los agregados.',
          ],
        },
      ],
    },
    {
      id: 'autoria',
      heading: 'Autoría y herramientas',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Herramientas de terceros',
      items: [
        'n8n (en Docker), SQL Server Developer, Python 3.13, Dash y Plotly.',
        'GitHub Actions y GitHub Pages para la página pública.',
      ],
    },
    individual: {
      heading: 'Mi trabajo',
      items: [
        'Diseño del flujo, workflows de n8n, esquema y procedimientos de SQL Server, consultas en Python y dashboards.',
        'Documentación operativa y demo con datos ficticios.',
      ],
    },
  },
};

const en: CaseContent = {
  meta: {
    title: 'Local analytics platform · Julio Úbeda Quesada',
    description:
      'Case study: a local data pipeline with ingestion in n8n, storage in SQL Server and a Python and Dash dashboard; only monthly aggregates are published.',
  },
  breadcrumb: 'Projects',
  kicker: 'Data platform · Public repository',
  title: 'From exported spreadsheet to monthly indicator, without the data leaving the computer',
  lead: {
    summaryLabel: 'What it solves',
    summary:
      'n8n imports Airbnb and Booking spreadsheets into SQL Server every day, Python queries them and a Dash dashboard shows the indicators. Only monthly totals per platform reach the public site.',
    roleLabel: 'My role',
    role: 'Design, implementation and documentation of the platform.',
    link: { label: 'Read the documentation', href: links.docsPlatform },
  },
  facts: {
    heading: 'Facts',
    items: [
      { label: 'Ingestion', html: 'n8n in Docker · daily run at 09:00 or manual' },
      { label: 'Storage', html: 'SQL Server · one database per project · transactional loads' },
      { label: 'Query and display', html: 'Python · Dash (local) · Plotly (public page)' },
      { label: 'Publishing', html: 'GitHub Actions → GitHub Pages, monthly aggregates only' },
      { label: 'Documentation', html: docsEn },
      { label: 'Public demo', html: demo },
      { label: 'Code', html: repo },
    ],
  },
  disclosure: 'Platform facts and contents',
  tocHeading: 'On this page',
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      blocks: [
        {
          type: 'p',
          html: 'Rental platforms let you export bookings and payouts as spreadsheets, each with its own columns, definitions and dates. Combining those files by hand every month is slow and error-prone, and uploading them to an external service would expose guest and booking data.',
        },
      ],
    },
    {
      id: 'pipeline',
      heading: 'The data flow',
      blocks: [
        { type: 'component', name: 'flowDiagram' },
        {
          type: 'steps',
          items: [
            {
              title: 'Ingestion with n8n',
              html: 'A workflow finds the spreadsheets in a local folder, recognises the platform from the headers, computes a SHA-256 fingerprint so the same file is never loaded twice, and validates the whole content: currency, dates, amounts, nights and each payout against its bookings. A single error rejects the whole file with a clear reason.',
            },
            {
              title: 'Loading into SQL Server',
              html: 'The batch reaches a stored procedure as a JSON parameter. SQL Server validates it again and loads it in a single transaction with <code>MERGE</code> on the booking or payout key: all or nothing. An application lock prevents two simultaneous loads, and every run is logged without personal data.',
            },
            {
              title: 'Querying with Python',
              html: 'A shared module queries a monthly aggregates view and handles amounts as decimals, rounded to cents only for display. The same module feeds the local dashboard and the public export.',
            },
            {
              title: 'Dash dashboard',
              html: 'Locally, the dashboard filters by platform and period, shows labelled indicators, a monthly chart of net income per platform and a table, and can re-query SQL Server.',
            },
            {
              title: 'Publishing aggregates',
              html: 'A script exports only monthly totals per platform to a JSON file; when it is pushed, GitHub Actions rebuilds the public page from that single file.',
            },
          ],
        },
      ],
    },
    {
      id: 'demo',
      heading: 'What the public demo shows',
      blocks: [
        {
          type: 'p',
          html: 'The page published on GitHub Pages shows the <strong>real monthly indicators</strong> from the latest export: bookings, nights, gross amount, platform commissions, payment fees, net bookings and payouts, per platform and month, with a platform filter, an interactive chart and a table. It includes no individual bookings, guests or booking references, which exist only on the local computer. When I checked it for this site (25/11/2026) it was available. The page is in Spanish.',
        },
        {
          type: 'actions',
          items: [
            { label: 'Open the public demo', href: links.sitePlatform, primary: true },
            { label: 'Read the operations guide', href: links.docsPlatform },
          ],
        },
        {
          type: 'p',
          html: 'The repository also includes a demo with made-up data (20 fictitious payments for four properties in a CSV) to test the load end to end without real data.',
        },
      ],
    },
    {
      id: 'limitations',
      heading: 'Limitations',
      blocks: [
        {
          type: 'list',
          items: [
            'The scheduled import only runs if Docker and SQL Server are running at 09:00; if the computer is off, that run is lost.',
            'It downloads nothing from the platforms: it processes the spreadsheets left in the folder.',
            'It only supports euros and the documented export formats of Airbnb (Payouts) and Booking (Reservations).',
            'The public page is updated by hand, when the aggregates are exported and pushed.',
          ],
        },
      ],
    },
    {
      id: 'credits',
      heading: 'Authorship and tools',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Third-party tools',
      items: ['n8n (in Docker), SQL Server Developer, Python 3.13, Dash and Plotly.', 'GitHub Actions and GitHub Pages for the public page.'],
    },
    individual: {
      heading: 'My work',
      items: [
        'Designing the flow, n8n workflows, SQL Server schema and procedures, Python queries and dashboards.',
        'Operations documentation and a demo with fictitious data.',
      ],
    },
  },
};

export const analyticsPlatform: Record<Lang, CaseContent> = { es, en };

/** Textos del diagrama del flujo (componente FlowDiagram). */
export interface FlowDiagramContent {
  title: string;
  local: string;
  public: string;
  nodes: { name: string; detail: string }[];
  publish: { name: string; detail: string }[];
  note: string;
}

export const flowDiagram: Record<Lang, FlowDiagramContent> = {
  es: {
    title: 'Flujo de datos de la plataforma',
    local: 'En el equipo local',
    public: 'Publicación',
    nodes: [
      { name: 'Excel', detail: 'Exportaciones de Airbnb y Booking en una carpeta' },
      { name: 'n8n', detail: 'Huella SHA-256, validación completa del archivo' },
      { name: 'SQL Server', detail: 'Carga transaccional con MERGE · vista de agregados' },
      { name: 'Python', detail: 'Consulta compartida con importes decimales' },
      { name: 'Dash', detail: 'Dashboard local con filtros' },
    ],
    publish: [
      { name: 'JSON de agregados', detail: 'Solo totales mensuales por plataforma' },
      { name: 'GitHub Pages', detail: 'Página reconstruida por GitHub Actions' },
    ],
    note: 'Diagrama propio basado en la guía operativa del repositorio. Los datos individuales no salen del equipo.',
  },
  en: {
    title: 'Platform data flow',
    local: 'On the local computer',
    public: 'Publishing',
    nodes: [
      { name: 'Excel', detail: 'Airbnb and Booking exports in a folder' },
      { name: 'n8n', detail: 'SHA-256 fingerprint, full-file validation' },
      { name: 'SQL Server', detail: 'Transactional load with MERGE · aggregates view' },
      { name: 'Python', detail: 'Shared query with decimal amounts' },
      { name: 'Dash', detail: 'Local dashboard with filters' },
    ],
    publish: [
      { name: 'Aggregates JSON', detail: 'Monthly totals per platform only' },
      { name: 'GitHub Pages', detail: 'Page rebuilt by GitHub Actions' },
    ],
    note: 'Own diagram based on the repository’s operations guide. Individual records never leave the computer.',
  },
};
