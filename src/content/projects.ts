import type { ImageMetadata } from 'astro';
import type { Lang, RouteKey } from '../i18n/routes';
import { links } from './links';
import imgMaps from '../assets/proyectos/generador-mapas.jpg';
import imgPlatform from '../assets/proyectos/plataforma-analitica.jpg';
import imgHalibut from '../assets/proyectos/fletan-negro-marss.jpg';
import imgSurvival from '../assets/proyectos/supervivencia-cancer.jpg';
import imgFleetDashboard from '../assets/proyectos/dashboard-flota.jpg';
import imgAws from '../assets/proyectos/pipeline-aws.jpg';
import imgCourse from '../assets/proyectos/curso-estadistica.jpg';

/**
 * Catálogo de proyectos: una sola fuente para los filtros, las tarjetas, las ventanas
 * flotantes y el chat. Los textos de cada idioma van separados de los componentes.
 * Recoge todos los repositorios propios de GitHub (no los forks ni el perfil). Los que
 * tienen caso de estudio llevan `route`; el resto enlaza a su repositorio.
 * Las imágenes son las mismas miniaturas del README del perfil de GitHub; los proyectos
 * sin imagen usan una ilustración esquemática (CardArt).
 */

export const areaIds = ['data-eng', 'ml', 'research', 'gis', 'viz', 'cloud', 'outreach'] as const;
export type AreaId = (typeof areaIds)[number];

export const areaLabels: Record<Lang, Record<AreaId, string>> = {
  es: {
    'data-eng': 'Ingeniería de datos',
    ml: 'Machine Learning',
    research: 'Investigación',
    gis: 'GIS',
    viz: 'Visualización',
    cloud: 'Cloud',
    outreach: 'Cursos y divulgación',
  },
  en: {
    'data-eng': 'Data engineering',
    ml: 'Machine learning',
    research: 'Research',
    gis: 'GIS',
    viz: 'Visualisation',
    cloud: 'Cloud',
    outreach: 'Courses and outreach',
  },
};

export type ProjectArt =
  | 'halibut'
  | 'map'
  | 'fleet'
  | 'scraping'
  | 'course'
  | 'platform'
  | 'clusters'
  | 'neural'
  | 'dashboard'
  | 'spark'
  | 'stream'
  | 'story'
  | 'candles';
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
  /** Texto alternativo de `image`, si el proyecto la tiene. */
  imageAlt?: string;
}

export interface Project {
  id: string;
  /** Caso de estudio en esta web. Sin él, la tarjeta enlaza al repositorio (`links.code`). */
  route?: RouteKey;
  areas: AreaId[];
  art: ProjectArt;
  /** Miniatura de la tarjeta (la misma del perfil de GitHub). Sin ella se usa `art`. */
  image?: ImageMetadata;
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
    image: imgHalibut,
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
        imageAlt: 'Mapa de las áreas de muestreo de las campañas científicas en el Atlántico Norte.',
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
        imageAlt: 'Map of the scientific survey areas in the North Atlantic.',
      },
    },
  },
  {
    id: 'maps',
    route: 'maps',
    areas: ['gis', 'data-eng'],
    art: 'map',
    image: imgMaps,
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
        imageAlt: 'Mapa interactivo generado con la aplicación: capturas ficticias por especie en el Mediterráneo, con filtros y leyenda.',
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
        imageAlt: 'Interactive map generated with the app: fictitious catches by species in the Mediterranean, with filters and legend.',
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
    image: imgCourse,
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
        visualCaption: 'Portada del curso publicado en GitHub Pages.',
        imageAlt: 'Portada del curso publicado, con el índice de módulos.',
      },
      en: {
        context: 'Outreach · Online course',
        title: 'Basic Statistics course',
        summary:
          'A Spanish-language web book with six modules of theory and Python practice, its own function library and a capstone project.',
        problem:
          'Learning statistics from scratch often means choosing between theory without practice or recipes without explanation. The course combines both with runnable examples.',
        role: 'Author of the course, of the stats_toolkit library and of its continuous publication on GitHub Pages.',
        visualCaption: 'Home page of the course published on GitHub Pages.',
        imageAlt: 'Home page of the published course, with the module index.',
      },
    },
  },
  {
    id: 'platform',
    route: 'platform',
    areas: ['data-eng'],
    art: 'platform',
    image: imgPlatform,
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
        visualCaption: 'Demo pública: agregados mensuales por plataforma, sin reservas individuales.',
        imageAlt: 'Dashboard público con indicadores mensuales de reservas por plataforma.',
      },
      en: {
        context: 'Data platform · Public repository',
        title: 'Local analytics platform',
        summary:
          'A full pipeline on one computer: n8n imports files into SQL Server, Python queries them and a Dash dashboard shows them; only monthly aggregates are published.',
        problem:
          'Turning loose Excel exports into reliable monthly indicators without uploading the individual records to any external service.',
        role: 'Design, implementation and documentation of the platform.',
        visualCaption: 'Public demo: monthly aggregates by platform, with no individual bookings.',
        imageAlt: 'Public dashboard with monthly booking indicators by platform.',
      },
    },
  },
  {
    id: 'survival',
    areas: ['research', 'ml'],
    art: 'neural',
    image: imgSurvival,
    visual: { kind: 'art' },
    tools: ['Python', 'lifelines', 'scikit-survival', 'pycox', 'PyTorch', 'SHAP'],
    links: { code: links.repoSurvival },
    text: {
      es: {
        context: 'Trabajo de Fin de Máster · Repositorio público',
        title: 'Supervivencia en cáncer de mama y pulmón',
        summary:
          'Kaplan-Meier, Cox-LASSO, Random Survival Forest y DeepSurv sobre cohortes públicas de cBioPortal, con validación externa entre cohortes independientes.',
        problem:
          'Comparar modelos estadísticos, de machine learning y de deep learning para predecir la supervivencia, identificar variables pronósticas y comprobar si un modelo entrenado en una cohorte funciona en otra.',
        role: 'Autor del trabajo, bajo la dirección de Antonio Ruiz Falco Rojas.',
        visualCaption:
          'Rendimiento en el conjunto de test de METABRIC (n = 397): Random Survival Forest obtiene un C-index de 0,706 frente a 0,676 de Cox-LASSO.',
        imageAlt: 'Gráficos de C-index e Integrated Brier Score de Kaplan-Meier, Cox-LASSO y Random Survival Forest.',
      },
      en: {
        context: 'Master’s thesis · Public repository',
        title: 'Survival analysis in breast and lung cancer',
        summary:
          'Kaplan-Meier, Cox-LASSO, Random Survival Forest and DeepSurv on public cBioPortal cohorts, with external validation across independent cohorts.',
        problem:
          'Comparing statistical, machine learning and deep learning models to predict survival, identifying prognostic variables and checking whether a model trained on one cohort works on another.',
        role: 'Author of the thesis, supervised by Antonio Ruiz Falco Rojas.',
        visualCaption:
          'Performance on the METABRIC test set (n = 397): Random Survival Forest reaches a C-index of 0.706 against 0.676 for Cox-LASSO.',
        imageAlt: 'Charts of C-index and Integrated Brier Score for Kaplan-Meier, Cox-LASSO and Random Survival Forest.',
      },
    },
  },
  {
    id: 'fleet-dashboard',
    areas: ['viz', 'ml'],
    art: 'dashboard',
    image: imgFleetDashboard,
    visual: { kind: 'art' },
    tools: ['Python', 'Streamlit', 'Plotly', 'pandas', 'scikit-learn'],
    links: { code: links.repoFleetDashboard },
    text: {
      es: {
        context: 'Aplicación · Máster en Ciencia de Datos (UOC)',
        title: 'Dashboard de la flota pesquera española',
        summary:
          'Aplicación en Streamlit para explorar la flota entre 1987 y 2025: filtros por comunidad, año, arte de pesca y estado, seis pestañas de análisis y tipologías con K-means.',
        problem:
          'Convertir el registro de la flota, ya limpio, en una herramienta de consulta que cualquier persona pueda filtrar sin programar.',
        role: 'Diseño y desarrollo del dashboard, a partir de los datos del análisis de la flota.',
        visualCaption: 'Pantalla inicial del dashboard ejecutado en local.',
        imageAlt: 'Dashboard de la flota pesquera española con filtros laterales y pestañas de análisis.',
      },
      en: {
        context: 'App · MSc in Data Science (UOC)',
        title: 'Spanish fishing fleet dashboard',
        summary:
          'A Streamlit app to explore the fleet from 1987 to 2025: filters by region, year, fishing gear and status, six analysis tabs and K-means vessel types.',
        problem:
          'Turning the cleaned fleet register into a query tool that anyone can filter without coding.',
        role: 'Design and development of the dashboard, built on the data from the fleet analysis.',
        visualCaption: 'Start screen of the dashboard running locally.',
        imageAlt: 'Spanish fishing fleet dashboard with side filters and analysis tabs.',
      },
    },
  },
  {
    id: 'aws',
    areas: ['cloud', 'data-eng'],
    art: 'stream',
    image: imgAws,
    visual: { kind: 'art' },
    tools: ['AWS EC2', 'Kinesis', 'Lambda', 'S3', 'Athena', 'Secrets Manager', 'Hugging Face', 'Streamlit'],
    links: { code: links.repoAws },
    text: {
      es: {
        context: 'Arquitectura cloud · Máster en Ciencia de Datos (UOC)',
        title: 'Pipeline de datos en streaming en AWS',
        summary:
          'Publicaciones de Mastodon en tiempo real: un productor en EC2 envía a Kinesis, Lambda guarda en S3 y analiza el sentimiento con Hugging Face, Athena consulta y Streamlit muestra.',
        problem:
          'Ingerir y procesar texto no estructurado de forma continua y escalable, sin guardar credenciales en el código.',
        role: 'Diseño y despliegue de la arquitectura en el laboratorio de AWS Academy, con su documentación paso a paso.',
        visualCaption: 'Flujo de trabajo de la arquitectura en AWS.',
        imageAlt: 'Diagrama del flujo de datos en AWS: EC2, Kinesis, Lambda, S3, Athena y dashboard.',
      },
      en: {
        context: 'Cloud architecture · MSc in Data Science (UOC)',
        title: 'Streaming data pipeline on AWS',
        summary:
          'Mastodon posts in real time: a producer on EC2 sends to Kinesis, Lambda stores in S3 and scores sentiment with Hugging Face, Athena queries and Streamlit displays.',
        problem:
          'Ingesting and processing unstructured text continuously and at scale, without keeping credentials in the code.',
        role: 'Design and deployment of the architecture in the AWS Academy lab, with step-by-step documentation.',
        visualCaption: 'Workflow of the AWS architecture.',
        imageAlt: 'Diagram of the AWS data flow: EC2, Kinesis, Lambda, S3, Athena and dashboard.',
      },
    },
  },
  {
    id: 'ml-course',
    areas: ['ml', 'outreach'],
    art: 'clusters',
    visual: { kind: 'art' },
    tools: ['Python', 'scikit-learn', 'imbalanced-learn', 'UMAP', 'HDBSCAN', 'sentence-transformers'],
    links: { code: links.repoMlCourse },
    text: {
      es: {
        context: 'Ruta de ciencia de datos · 2/3',
        title: 'Aprendizaje automático con Python',
        summary:
          'Proyectos con su teoría: accidentes de tráfico y clima, agrupamiento de miles de recetas, clasificadores supervisados y combinación de modelos.',
        problem:
          'Continuar el curso de estadística con problemas reales de machine learning, desde la preparación de datos hasta los ensembles.',
        role: 'Autor de los proyectos, desarrollados durante el Máster en Ciencia de Datos (UOC).',
        visualCaption: 'Ilustración esquemática: grupos encontrados por un algoritmo de clustering.',
      },
      en: {
        context: 'Data science path · 2/3',
        title: 'Machine learning with Python',
        summary:
          'Projects with their theory: traffic accidents and weather, clustering thousands of recipes, supervised classifiers and model ensembles.',
        problem:
          'Following on from the statistics course with real machine learning problems, from data preparation to ensembles.',
        role: 'Author of the projects, developed during the MSc in Data Science (UOC).',
        visualCaption: 'Schematic illustration: groups found by a clustering algorithm.',
      },
    },
  },
  {
    id: 'dl-course',
    areas: ['ml', 'outreach'],
    art: 'neural',
    visual: { kind: 'art' },
    tools: ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'Hugging Face', 'Optuna'],
    links: { code: links.repoDlCourse },
    text: {
      es: {
        context: 'Ruta de ciencia de datos · 3/3',
        title: 'Deep learning',
        summary:
          'Imágenes satelitales con CNN y transfer learning, series temporales con RNN, LSTM y GRU, generación de texto con transformers, y GAN y difusión.',
        problem:
          'Cerrar la ruta con arquitecturas de complejidad creciente aplicadas al mismo tipo de problema para comparar su rendimiento.',
        role: 'Autor de los proyectos, desarrollados durante el Máster en Ciencia de Datos (UOC).',
        visualCaption: 'Ilustración esquemática: una red neuronal con capas ocultas.',
      },
      en: {
        context: 'Data science path · 3/3',
        title: 'Deep learning',
        summary:
          'Satellite images with CNNs and transfer learning, time series with RNNs, LSTMs and GRUs, text generation with transformers, and GANs and diffusion.',
        problem:
          'Closing the path with architectures of growing complexity applied to the same kind of problem to compare their performance.',
        role: 'Author of the projects, developed during the MSc in Data Science (UOC).',
        visualCaption: 'Schematic illustration: a neural network with hidden layers.',
      },
    },
  },
  {
    id: 'hadoop',
    areas: ['data-eng'],
    art: 'spark',
    visual: { kind: 'art' },
    tools: ['PySpark', 'HDFS', 'Hive', 'Python'],
    links: { code: links.repoHadoop },
    text: {
      es: {
        context: 'Big data · Máster en Ciencia de Datos (UOC)',
        title: 'Procesamiento por lotes con Hadoop y Spark',
        summary:
          'HDFS, RDDs, DataFrames de Spark y Hive sobre un clúster, con la teoría de MapReduce y de las arquitecturas de big data.',
        problem:
          'Extraer conocimiento de fuentes heterogéneas y voluminosas con procesamiento distribuido, comparando RDDs y DataFrames.',
        role: 'Autor del proyecto y de los apuntes; incluye el certificado Big Data Fundamentals with PySpark (DataCamp).',
        visualCaption: 'Ilustración esquemática: un trabajo repartido entre los nodos de un clúster.',
      },
      en: {
        context: 'Big data · MSc in Data Science (UOC)',
        title: 'Batch processing with Hadoop and Spark',
        summary:
          'HDFS, RDDs, Spark DataFrames and Hive on a cluster, with the theory of MapReduce and big data architectures.',
        problem:
          'Extracting knowledge from large, heterogeneous sources with distributed processing, comparing RDDs and DataFrames.',
        role: 'Author of the project and notes; includes the Big Data Fundamentals with PySpark certificate (DataCamp).',
        visualCaption: 'Schematic illustration: a job split across the nodes of a cluster.',
      },
    },
  },
  {
    id: 'streaming',
    areas: ['data-eng'],
    art: 'stream',
    visual: { kind: 'art' },
    tools: ['Apache Kafka', 'Spark Streaming', 'Structured Streaming', 'Python'],
    links: { code: links.repoStreaming },
    text: {
      es: {
        context: 'Big data · Máster en Ciencia de Datos (UOC)',
        title: 'Procesamiento de datos en streaming',
        summary:
          'Temas, productores y consumidores en Kafka, y agregados por ventanas de tiempo con Spark Streaming y Structured Streaming.',
        problem:
          'Capturar y analizar datos que llegan de forma continua, con la teoría de las arquitecturas Lambda y Kappa.',
        role: 'Autor del proyecto y de los apuntes.',
        visualCaption: 'Ilustración esquemática: un flujo de mensajes agregado por ventanas de tiempo.',
      },
      en: {
        context: 'Big data · MSc in Data Science (UOC)',
        title: 'Streaming data processing',
        summary:
          'Kafka topics, producers and consumers, and time-window aggregates with Spark Streaming and Structured Streaming.',
        problem:
          'Capturing and analysing data that arrives continuously, with the theory of Lambda and Kappa architectures.',
        role: 'Author of the project and notes.',
        visualCaption: 'Schematic illustration: a message stream aggregated over time windows.',
      },
    },
  },
  {
    id: 'storytelling',
    areas: ['viz'],
    art: 'story',
    visual: { kind: 'art' },
    tools: ['Python', 'Streamlit', 'Plotly', 'R', 'R Markdown'],
    links: { code: links.repoStorytelling },
    text: {
      es: {
        context: 'Visualización · Máster en Ciencia de Datos (UOC)',
        title: 'Storytelling: cancelaciones de reservas hoteleras',
        summary:
          'Análisis exploratorio en R y Python y un dashboard narrativo en Streamlit que explica qué reservas se cancelan, cuándo y por qué canal.',
        problem:
          'Pasar de un análisis exploratorio a una historia que guíe al lector paso a paso hasta las conclusiones.',
        role: 'Autor del análisis, del dashboard y de la presentación.',
        visualCaption: 'Ilustración esquemática: una narrativa en pasos que desemboca en una conclusión.',
      },
      en: {
        context: 'Visualisation · MSc in Data Science (UOC)',
        title: 'Storytelling: hotel booking cancellations',
        summary:
          'Exploratory analysis in R and Python and a narrative Streamlit dashboard explaining which bookings are cancelled, when and through which channel.',
        problem:
          'Moving from an exploratory analysis to a story that guides the reader step by step to the conclusions.',
        role: 'Author of the analysis, the dashboard and the presentation.',
        visualCaption: 'Schematic illustration: a step-by-step narrative leading to a conclusion.',
      },
    },
  },
  {
    id: 'viz-techniques',
    areas: ['viz'],
    art: 'candles',
    visual: { kind: 'art' },
    tools: ['Python', 'Plotly', 'SciPy', 'pandas'],
    links: { code: links.repoVizTechniques, demo: links.siteVizTechniques },
    text: {
      es: {
        context: 'Visualización · Web publicada',
        title: 'Técnicas de visualización de datos financieros',
        summary:
          'Gráfico de sectores, velas japonesas y envolvente convexa con Plotly sobre las cotizaciones de Apple, Microsoft y Google.',
        problem:
          'Mostrar tres enfoques sobre los mismos datos bursátiles: proporciones, evolución temporal y dispersión.',
        role: 'Autor de las visualizaciones y de la página web.',
        visualCaption: 'Ilustración esquemática: velas japonesas de una serie de precios.',
      },
      en: {
        context: 'Visualisation · Published website',
        title: 'Financial data visualisation techniques',
        summary:
          'Pie chart, candlesticks and convex hull with Plotly on Apple, Microsoft and Google stock prices.',
        problem:
          'Showing three approaches to the same stock data: proportions, change over time and dispersion.',
        role: 'Author of the visualisations and the web page.',
        visualCaption: 'Schematic illustration: candlesticks of a price series.',
      },
    },
  },
  {
    id: 'dash-course',
    areas: ['viz', 'outreach'],
    art: 'dashboard',
    visual: { kind: 'art' },
    tools: ['Python', 'Dash', 'Plotly', 'pandas', 'SQL Server'],
    links: { code: links.repoDashCourse },
    text: {
      es: {
        context: 'Curso · Tres días',
        title: 'Dashboards con Dash',
        summary:
          'Arquitectura de una aplicación Dash, callbacks e interactividad, y un dashboard completo con pestañas e informes en HTML y Excel, con datos pesqueros de ejemplo.',
        problem:
          'Construir aplicaciones analíticas web en Python sin escribir JavaScript, de la estructura mínima a un dashboard modular.',
        role: 'Apuntes y ejercicios resueltos del curso.',
        visualCaption: 'Ilustración esquemática: un dashboard con indicadores, gráfico y tabla.',
      },
      en: {
        context: 'Course · Three days',
        title: 'Dashboards with Dash',
        summary:
          'Architecture of a Dash app, callbacks and interactivity, and a full dashboard with tabs and HTML and Excel reports, using sample fisheries data.',
        problem:
          'Building analytical web apps in Python without writing JavaScript, from the minimal structure to a modular dashboard.',
        role: 'Notes and solved exercises from the course.',
        visualCaption: 'Schematic illustration: a dashboard with indicators, a chart and a table.',
      },
    },
  },
];

/**
 * Orden de las tarjetas: primero los proyectos con imagen (la del perfil de GitHub) y después
 * los que usan una ilustración esquemática; dentro de cada grupo, por peso profesional.
 */
const order = [
  'maps',
  'platform',
  'halibut',
  'survival',
  'fleet-dashboard',
  'aws',
  'course',
  'fleet',
  'scraping',
  'ml-course',
  'dl-course',
  'hadoop',
  'streaming',
  'storytelling',
  'viz-techniques',
  'dash-course',
];
projects.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

/** Enlace de la tarjeta: el caso de estudio si existe; si no, el repositorio. */
export function projectHref(p: Project, routeFor: (key: RouteKey) => string): string {
  return p.route ? routeFor(p.route) : (p.links.code ?? '#');
}
