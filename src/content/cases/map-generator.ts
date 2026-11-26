import type { Lang } from '../../i18n/routes';
import { links } from '../links';
import type { CaseContent } from './types';
import exampleMap from '../../assets/figures/generador-mapas-ejemplo.png';

/**
 * Caso: generador de mapas interactivos.
 * Fuentes: README y código del repositorio público (app.py, mapas/motor.py, mapas/core.py).
 * Se describe como herramienta, sin vincularla a ningún organismo ni sistema concreto.
 * La figura es un ejemplo reproducible con datos ficticios: ver ejemplos/generador-mapas/.
 */

const repo = `<a href="${links.repoMapGenerator}">GitHub</a>`;

/** Extracto de la configuración del ejemplo (ejemplos/generador-mapas/mapa.config.json). */
const configExcerpt = [
  '"positions": [{',
  '  "path": "datos/capturas_ficticias.csv",',
  '  "lat": "Latitud", "lon": "Longitud", "date": "Fecha",',
  '  "style": { "mode": "category", "column": "Especie" },',
  '  "tooltip": ["Barco", "Especie", "Captura_kg"],',
  '  "slicers": ["Barco", "Puerto"], "date_slicer": true',
  '}],',
  '"layers": [{',
  '  "path": "datos/zonas_ficticias.geojson",',
  '  "style": { "mode": "category", "column": "tipo" },',
  '  "dashed": true, "fill_opacity": 0.25',
  '}]',
];

const es: CaseContent = {
  meta: {
    title: 'Generador de mapas interactivos · Julio Úbeda Quesada',
    description:
      'Caso de estudio: una aplicación local que convierte posiciones y capas geográficas en un único archivo HTML interactivo, sin programar.',
  },
  breadcrumb: 'Proyectos',
  kicker: 'Herramienta · Repositorio público',
  title: 'Compartir un mapa interactivo sin servidor y sin programar',
  lead: {
    summaryLabel: 'Qué resuelve',
    summary:
      'Convierte una tabla de posiciones y tus capas geográficas en un único archivo HTML con leyenda, filtros y fichas, que cualquiera abre en el navegador sin instalar nada.',
    roleLabel: 'Mi papel',
    role: 'Diseño y desarrollo de la herramienta; mantengo su repositorio público.',
    link: { label: 'Ver el repositorio en GitHub', href: links.repoMapGenerator },
  },
  facts: {
    heading: 'Ficha',
    items: [
      { label: 'Tipo', html: 'Aplicación local con interfaz web (Streamlit)' },
      { label: 'Tecnología', html: 'Python · Folium (Leaflet) · GeoPandas · pandas' },
      { label: 'Entradas', html: 'Excel, CSV o Parquet; capas SHP, GPKG, GeoJSON, KML, GML, FGB o ZIP' },
      { label: 'Salida', html: 'Un archivo HTML y, si se quiere, un script <code>.py</code> que lo regenera' },
      { label: 'Ejemplo', html: 'Datos ficticios generados para este portfolio' },
      { label: 'Código', html: repo },
    ],
  },
  disclosure: 'Ficha de la herramienta e índice',
  tocHeading: 'En esta página',
  sections: [
    {
      id: 'problema',
      heading: 'El problema',
      blocks: [
        {
          type: 'p',
          html: 'Imagina a alguien con un Excel de posiciones (lances, muestreos, avistamientos) y un shapefile con unas zonas, que necesita que otra persona los explore: filtrar por barco, ver qué cae dentro de una zona, consultar el detalle de un punto.',
        },
        {
          type: 'list',
          items: [
            'Una <strong>captura de pantalla</strong> se comparte fácil, pero no deja filtrar ni consultar nada.',
            'Un <strong>proyecto de SIG</strong> exige tener el programa instalado y las mismas rutas a los datos en el otro equipo.',
            'Un <strong>visor web</strong> exige publicar los datos en un servidor.',
          ],
        },
        {
          type: 'p',
          html: 'El generador cubre el hueco entre esas opciones: se cargan los datos en una aplicación local, se eligen colores, etiquetas y filtros sin escribir código y se obtiene <strong>un único archivo HTML</strong> que se puede enviar o dejar en una carpeta compartida.',
        },
      ],
    },
    {
      id: 'funcionamiento',
      heading: 'Cómo combina datos y capas',
      blocks: [
        {
          type: 'p',
          html: 'La aplicación se organiza en tres pestañas que siguen el orden natural del trabajo:',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Posiciones',
              html: 'Se suben uno o varios archivos de posiciones (Excel, CSV, Parquet o puntos en GPKG, SHP o GeoJSON). La aplicación propone las columnas de latitud, longitud y fecha. Para cada conjunto se elige cómo colorear los puntos (un color, por categorías o por rangos numéricos), qué campos muestran la etiqueta y la ficha, y qué filtros tendrá el mapa.',
            },
            {
              title: 'Capas',
              html: 'Se añaden capas propias de polígonos, líneas o puntos (SHP, GPKG, GeoJSON, KML, GML, FGB o ZIP). Al elegir un <code>.shp</code> se recogen solos sus archivos asociados. De forma opcional se activan capas de referencia (GSA, ZEE, áreas FAO y países) que la aplicación lee de una carpeta configurable; esas capas no forman parte del repositorio.',
            },
            {
              title: 'Título y mapa',
              html: 'Se añaden título, subtítulo y logo, y se genera el mapa. La aplicación resume cuántas filas se han dibujado y cuántas se han descartado, por ejemplo por coordenadas vacías. Después se descarga el HTML y, si se quiere, un script <code>.py</code> que regenera el mismo mapa.',
            },
          ],
        },
        {
          type: 'p',
          html: 'Por dentro, la interfaz (<code>app.py</code>) solo recoge las decisiones. El motor (<code>mapas/motor.py</code>) lee los datos con pandas y GeoPandas, los lleva a coordenadas geográficas WGS 84 y construye el mapa con Folium. El mismo motor funciona por consola a partir de un archivo de configuración, así que un mapa se puede regenerar con datos nuevos de la misma estructura.',
        },
      ],
    },
    {
      id: 'resultado',
      heading: 'Qué se obtiene al exportar',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>Un solo archivo HTML con los datos dentro.</strong> Los puntos viajan en el propio archivo y se dibujan sobre <i>canvas</i>, para que el mapa siga siendo fluido con muchas posiciones.',
            '<strong>Leyenda y control de capas.</strong> Cada categoría es una capa que se puede encender o apagar, con su número de elementos.',
            '<strong>Filtros dentro del mapa.</strong> Listas desplegables con búsqueda y selección múltiple, y un filtro por rango de fechas.',
            '<strong>Etiqueta y ficha.</strong> Al pasar el ratón por un punto aparece una etiqueta breve; al hacer clic, la ficha con los campos elegidos.',
            '<strong>Herramientas de lectura.</strong> Minimapa, escala, coordenadas del cursor, zoom a un área y vuelta a la vista inicial, con tres mapas base a elegir.',
          ],
        },
        {
          type: 'p',
          html: 'El archivo se abre con doble clic en cualquier navegador. «Autocontenido» se refiere a los datos y a la configuración del mapa: el mapa base y las librerías (Leaflet, Bootstrap, jQuery) se cargan desde servidores públicos, así que para ver el fondo hace falta conexión.',
        },
      ],
    },
    {
      id: 'ejemplo',
      heading: 'Ejemplo reproducible',
      blocks: [
        {
          type: 'p',
          html: 'Para este portfolio generé un ejemplo con el motor del repositorio y <strong>datos inventados</strong>: 150 registros de captura con fecha, barco, puerto, especie, arte, peso y posición, tres de ellos sin coordenadas a propósito, y dos zonas también ficticias en GeoJSON. Los datos salen de un script con semilla fija, así que el resultado se repite exactamente.',
        },
        { type: 'figure', key: 'example' },
        {
          type: 'actions',
          items: [
            {
              label: 'Explorar mapa de ejemplo',
              route: 'mapsDemo',
              primary: true,
              note: 'Se abre como página independiente. Usa datos ficticios; el mapa base y las librerías necesitan conexión.',
            },
          ],
        },
        {
          type: 'p',
          html: 'Toda la composición sale de un archivo de configuración como este. Cada bloque dice qué archivo leer, cómo colorearlo y qué filtros y etiquetas ofrecer:',
        },
        { type: 'code', caption: 'Extracto de la configuración del ejemplo (JSON)', lines: configExcerpt },
        {
          type: 'p',
          html: 'El motor descarta las tres filas sin coordenadas, lo indica en el registro y dibuja 147 puntos.',
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
            'El HTML incluye todos los puntos: con muchas posiciones, el archivo pesa más y tarda en abrirse. La aplicación avisa y permite submuestrear.',
            'El mapa base y las librerías necesitan conexión a internet.',
            'Las capas de referencia dependen de una carpeta externa; si no está accesible, se omiten con un aviso.',
            'Según el propio repositorio, quedan pendientes el empaquetado, las versiones fijadas de las dependencias y las pruebas automáticas.',
          ],
        },
      ],
    },
    {
      id: 'autoria',
      heading: 'Autoría y recursos de terceros',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {
    example: {
      src: exampleMap,
      alt: 'Mapa del Mediterráneo occidental entre la costa de Murcia y Mallorca. Hay dos grupos de puntos de colores, uno al sur de Mallorca y otro frente a Cartagena, cada uno junto a un rectángulo de borde discontinuo. Arriba, un recuadro con el título «Capturas de ejemplo» y tres filtros; abajo a la derecha, una leyenda con cinco especies y dos zonas.',
      caption:
        'El HTML generado con los datos ficticios, tal como se abre en el navegador. Los puntos se colorean por especie y los rectángulos discontinuos son la capa propia de zonas. Arriba están los filtros por barco, puerto y rango de fechas; abajo a la derecha, la leyenda con el número de puntos de cada especie; abajo a la izquierda, el minimapa y la escala.',
      credit:
        'Captura propia. Datos inventados para este portfolio, sin relación con capturas ni zonas reales. Mapa base: Esri World Ocean Base (fuentes: GEBCO, NOAA, Esri, DeLorme, NAVTEQ y otros), mostrado con Leaflet.',
    },
  },
  roles: {
    collective: {
      heading: 'Recursos de terceros',
      items: [
        'Librerías de código abierto: Streamlit para la interfaz; Folium y Leaflet, con sus complementos de minimapa y coordenadas, para el mapa; pandas y GeoPandas para los datos.',
        'Mapas base de Esri (World Ocean Base y World Imagery) y de OpenStreetMap. Cada uno muestra su atribución en el propio mapa.',
      ],
    },
    individual: {
      heading: 'Mi trabajo',
      items: [
        'Diseño y desarrollo de la aplicación: la interfaz en tres pestañas, el motor que construye el mapa, los filtros, la leyenda y la configuración reutilizable.',
        `Documentación y mantenimiento del repositorio público (${repo}).`,
        'El ejemplo de esta página: los datos ficticios, la configuración y la captura.',
      ],
    },
  },
};

const en: CaseContent = {
  meta: {
    title: 'Interactive map generator · Julio Úbeda Quesada',
    description:
      'Case study: a local app that turns positions and geographic layers into a single interactive HTML file, no coding required.',
  },
  breadcrumb: 'Projects',
  kicker: 'Tool · Public repository',
  title: 'Sharing an interactive map without a server or code',
  lead: {
    summaryLabel: 'What it solves',
    summary:
      'It turns a table of positions and your geographic layers into a single HTML file with a legend, filters and detail cards, which anyone can open in a browser without installing anything.',
    roleLabel: 'My role',
    role: 'I designed and built the tool and maintain its public repository.',
    link: { label: 'See the repository on GitHub', href: links.repoMapGenerator },
  },
  facts: {
    heading: 'Facts',
    items: [
      { label: 'Type', html: 'Local app with a web interface (Streamlit)' },
      { label: 'Technology', html: 'Python · Folium (Leaflet) · GeoPandas · pandas' },
      { label: 'Inputs', html: 'Excel, CSV or Parquet; SHP, GPKG, GeoJSON, KML, GML, FGB or ZIP layers' },
      { label: 'Output', html: 'One HTML file and, optionally, a <code>.py</code> script that rebuilds it' },
      { label: 'Example', html: 'Fictitious data created for this portfolio' },
      { label: 'Code', html: repo },
    ],
  },
  disclosure: 'Tool facts and contents',
  tocHeading: 'On this page',
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      blocks: [
        {
          type: 'p',
          html: 'Picture someone with a spreadsheet of positions (fishing hauls, samples, sightings) and a shapefile of zones, who needs someone else to explore them: filter by vessel, see what falls inside a zone, check the details of a point.',
        },
        {
          type: 'list',
          items: [
            'A <strong>screenshot</strong> is easy to share, but you cannot filter or query anything.',
            'A <strong>GIS project</strong> needs the software installed and the same data paths on the other computer.',
            'A <strong>web viewer</strong> means publishing the data on a server.',
          ],
        },
        {
          type: 'p',
          html: 'The generator fills the gap between those options: you load the data into a local app, choose colours, labels and filters without writing code, and get <strong>a single HTML file</strong> you can send or drop in a shared folder.',
        },
      ],
    },
    {
      id: 'how-it-works',
      heading: 'How it combines data and layers',
      blocks: [
        {
          type: 'p',
          html: 'The app is organised in three tabs that follow the natural order of the work:',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Positions',
              html: 'Upload one or more position files (Excel, CSV, Parquet, or points in GPKG, SHP or GeoJSON). The app suggests the latitude, longitude and date columns. For each set you choose how to colour the points (one colour, by category or by numeric ranges), which fields the label and the detail card show, and which filters the map will have.',
            },
            {
              title: 'Layers',
              html: 'Add your own polygon, line or point layers (SHP, GPKG, GeoJSON, KML, GML, FGB or ZIP). When you pick a <code>.shp</code>, its companion files are collected automatically. Optionally, you can switch on reference layers (GSA, EEZ, FAO areas and countries) that the app reads from a configurable folder; those layers are not part of the repository.',
            },
            {
              title: 'Title and map',
              html: 'Add a title, subtitle and logo, and generate the map. The app reports how many rows were drawn and how many were dropped, for example because of empty coordinates. Then you download the HTML and, if you want, a <code>.py</code> script that rebuilds the same map.',
            },
          ],
        },
        {
          type: 'p',
          html: 'Under the hood, the interface (<code>app.py</code>) only collects decisions. The engine (<code>mapas/motor.py</code>) reads the data with pandas and GeoPandas, converts it to WGS 84 geographic coordinates and builds the map with Folium. The same engine runs from the command line with a configuration file, so a map can be rebuilt with new data of the same structure.',
        },
      ],
    },
    {
      id: 'output',
      heading: 'What you get when you export',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>A single HTML file with the data inside.</strong> Points travel in the file itself and are drawn on a <i>canvas</i>, so the map stays smooth with many positions.',
            '<strong>Legend and layer control.</strong> Each category is a layer you can switch on or off, with its number of features.',
            '<strong>Filters inside the map.</strong> Searchable multi-select dropdowns and a date range filter.',
            '<strong>Label and detail card.</strong> Hovering over a point shows a short label; clicking it opens the card with the chosen fields.',
            '<strong>Reading tools.</strong> Minimap, scale, cursor coordinates, zoom to an area and back to the initial view, with three base maps to choose from.',
          ],
        },
        {
          type: 'p',
          html: 'The file opens with a double click in any browser. “Self-contained” refers to the data and the map settings: the base map and the libraries (Leaflet, Bootstrap, jQuery) load from public servers, so an internet connection is needed to see the background.',
        },
      ],
    },
    {
      id: 'example',
      heading: 'Reproducible example',
      blocks: [
        {
          type: 'p',
          html: 'For this portfolio I generated an example with the repository’s engine and <strong>made-up data</strong>: 150 catch records with date, vessel, port, species, gear, weight and position, three of them deliberately without coordinates, plus two fictitious zones in GeoJSON. The data come from a script with a fixed seed, so the result is exactly repeatable.',
        },
        { type: 'figure', key: 'example' },
        {
          type: 'actions',
          items: [
            {
              label: 'Explore the example map',
              route: 'mapsDemo',
              primary: true,
              note: 'Opens as a separate page. It uses fictitious data; the base map and libraries need a connection.',
            },
          ],
        },
        {
          type: 'p',
          html: 'The whole composition comes from a configuration file like this one. Each block says which file to read, how to colour it and which filters and labels to offer:',
        },
        { type: 'code', caption: 'Excerpt from the example configuration (JSON)', lines: configExcerpt },
        {
          type: 'p',
          html: 'The engine drops the three rows without coordinates, logs it and draws 147 points.',
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
            'The HTML contains every point: with many positions, the file gets heavier and slower to open. The app warns about it and can subsample.',
            'The base map and the libraries need an internet connection.',
            'Reference layers depend on an external folder; if it is not reachable, they are skipped with a warning.',
            'According to the repository itself, packaging, pinned dependency versions and automated tests are still pending.',
          ],
        },
      ],
    },
    {
      id: 'credits',
      heading: 'Authorship and third-party resources',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {
    example: {
      src: exampleMap,
      alt: 'Map of the western Mediterranean between the coast of Murcia and Mallorca. There are two groups of coloured points, one south of Mallorca and one off Cartagena, each next to a dashed rectangle. At the top, a box with the title “Capturas de ejemplo” and three filters; at the bottom right, a legend with five species and two zones.',
      caption:
        'The HTML generated from the fictitious data, as it opens in the browser. Points are coloured by species and the dashed rectangles are the custom zones layer. At the top are the filters by vessel, port and date range; at the bottom right, the legend with the number of points per species; at the bottom left, the minimap and the scale. The map labels are in Spanish because that is the language of the tool.',
      credit:
        'Own screenshot. Data made up for this portfolio, unrelated to any real catches or zones. Base map: Esri World Ocean Base (sources: GEBCO, NOAA, Esri, DeLorme, NAVTEQ and others), displayed with Leaflet.',
    },
  },
  roles: {
    collective: {
      heading: 'Third-party resources',
      items: [
        'Open-source libraries: Streamlit for the interface; Folium and Leaflet, with their minimap and coordinates plugins, for the map; pandas and GeoPandas for the data.',
        'Base maps from Esri (World Ocean Base and World Imagery) and OpenStreetMap. Each one shows its attribution on the map itself.',
      ],
    },
    individual: {
      heading: 'My work',
      items: [
        'Design and development of the app: the three-tab interface, the engine that builds the map, the filters, the legend and the reusable configuration.',
        `Documentation and maintenance of the public repository (${repo}).`,
        'The example on this page: the fictitious data, the configuration and the screenshot.',
      ],
    },
  },
};

export const mapGenerator: Record<Lang, CaseContent> = { es, en };
