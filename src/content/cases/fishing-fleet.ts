import type { Lang } from '../../i18n/routes';
import { links } from '../links';
import type { CaseContent } from './types';

/**
 * Caso: análisis de la flota pesquera española (PR2 del máster de la UOC, en pareja).
 * Fuentes: README, cuadernos src/Limpieza-datos_v2.ipynb y src/Modelado.ipynb y memoria del repositorio
 * Data-Science-Pescas-Limpieza-y-Modelado. Las métricas salen de las salidas impresas del cuaderno;
 * cuando el README difiere del código (p. ej. «KNN»), se sigue el código (KMeans).
 */

const repo = `<a href="${links.repoFleet}">GitHub</a>`;
const dashRepo = `<a href="${links.repoFleetDashboard}">Analisis-tecnico-de-la-flota-pesquera</a>`;

const es: CaseContent = {
  meta: {
    title: 'La flota pesquera española, 1987–2025 · Julio Úbeda Quesada',
    description:
      'Caso de estudio: del registro de buques a una base para el análisis y el modelado de la flota pesquera española (proyecto académico en pareja).',
  },
  breadcrumb: 'Proyectos',
  kicker: 'Proyecto académico en pareja · Máster en Ciencia de Datos (UOC)',
  title: 'Del registro de buques a una base para analizar la flota pesquera',
  lead: {
    summaryLabel: 'Resultado principal',
    summary:
      'Los 27.364 buques del registro quedaron en una base limpia y analizable. Un clasificador LightGBM predice el tipo de arte con un recall medio por clase del 71 %: acierta en artes menores y arrastre y falla más en palangre, artes fijas y cañeros.',
    roleLabel: 'Autoría',
    role: 'Trabajo compartido con Lucas Zamora Vera: limpieza, análisis, modelado y memoria firmados por los dos.',
    link: { label: 'Ver el repositorio en GitHub', href: links.repoFleet },
  },
  facts: {
    heading: 'Ficha',
    items: [
      { label: 'Tipo', html: 'Práctica 2 de «Tipología y ciclo de vida de los datos», Máster en Ciencia de Datos (UOC)' },
      { label: 'Autoría', html: 'Julio Úbeda Quesada y Lucas Zamora Vera' },
      { label: 'Datos', html: '27.364 buques del Registro General de la Flota Pesquera · altas entre 1987 y 2025' },
      { label: 'Herramientas', html: 'Python · pandas · scikit-learn · LightGBM · CatBoost · imbalanced-learn · Keras' },
      { label: 'Licencia del código', html: 'GPL-3.0' },
      { label: 'Código', html: repo },
    ],
  },
  disclosure: 'Ficha del proyecto e índice',
  tocHeading: 'En esta página',
  sections: [
    {
      id: 'origen',
      heading: 'De dónde salen los datos',
      blocks: [
        {
          type: 'p',
          html: 'El punto de partida es el conjunto de datos obtenido en la práctica anterior mediante <a href="/es/casos/web-scraping-flota/">web scraping del registro europeo y del registro español de buques</a>: una fila por buque, identificada por su CFR, con 16 campos tal como aparecen en la web del registro.',
        },
        {
          type: 'p',
          html: 'Ese formato sirve para consultar un buque, pero no para analizar la flota: las medidas llevan unidades dentro del texto («10,75 m», «202,26 kW (275,0 CV)»), el estado y su fecha comparten campo y el puerto base mezcla código postal, municipio, provincia y comunidad autónoma.',
        },
      ],
    },
    {
      id: 'limpieza',
      heading: 'Del registro a una base analizable',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Revisión inicial',
              html: 'Duplicados, caracteres especiales, valores vacíos, nombres de columna simplificados y tipos de dato corregidos: texto con unidades a números y fechas a formato de fecha.',
            },
            {
              title: 'Descomposición de campos',
              html: '<code>Estado</code> se separa en estado en el registro y fecha del estado; <code>Puerto base</code>, en código postal, puerto, provincia y comunidad autónoma. Las más de treinta modalidades del censo se agrupan en siete tipos de arte.',
            },
            {
              title: 'Valores anómalos',
              html: 'Esloras, arqueos y potencias a cero o incoherentes se imputan, y se revisan los valores extremos. Por ejemplo, el primer buque del registro figura con una eslora de 0,00 m y en la base limpia tiene un valor imputado.',
            },
            {
              title: 'Variables nuevas',
              html: 'Se calcula la edad de cada buque y se eliminan las columnas sin valor analítico. El resultado son 14 columnas por buque, listas para explorar y modelar.',
            },
          ],
        },
      ],
    },
    {
      id: 'exploracion',
      heading: 'Explorar la serie de la flota',
      blocks: [
        {
          type: 'p',
          html: 'Este gráfico reconstruye, a partir de la base limpia, cuántos buques había en el registro al final de cada año. Elige el tipo de arte, la comunidad autónoma del puerto base, la medida y el periodo; el texto bajo el gráfico resume el cambio.',
        },
        { type: 'component', name: 'fleetChart' },
        {
          type: 'p',
          html: 'El análisis exploratorio del proyecto muestra una flota dominada por buques pequeños, con distribuciones de eslora, arqueo y potencia sesgadas a la derecha, muchos buques con más de 30 años de servicio y una incorporación de buques nuevos, más grandes y potentes, en los últimos 10–15 años.',
        },
      ],
    },
    {
      id: 'modelos',
      heading: 'Modelos',
      blocks: [
        {
          type: 'p',
          html: '<strong>Clasificación del tipo de arte.</strong> El objetivo es predecir el tipo de arte de un buque a partir de sus características técnicas y administrativas. Como cerca del 90 % de la flota está en artes menores, se usó la <i>balanced accuracy</i>, que pesa por igual cada clase. Se compararon cuatro clasificadores basados en árboles (árbol de decisión, random forest, LightGBM y CatBoost), se optimizó LightGBM con búsqueda en rejilla y validación cruzada de 5 particiones y se reentrenó con sobremuestreo SMOTE.',
        },
        {
          type: 'table',
          caption: 'Modelo final (LightGBM con SMOTE) sobre 5.473 buques de prueba',
          head: ['Métrica', 'Valor', 'Qué significa'],
          rows: [
            ['Recall medio por clase', '0,71', 'Media simple del acierto de cada tipo de arte; cada clase pesa lo mismo.'],
            ['F1 medio por clase', '0,68', 'Equilibrio entre precisión y recall, también sin ponderar.'],
            ['F1 ponderado', '0,88', 'Ponderado por el tamaño de cada clase: lo eleva artes menores (3.637 buques, F1 0,95).'],
            ['Exactitud', '0,87', 'Proporción de buques bien clasificados; engañosa con clases desbalanceadas.'],
          ],
        },
        {
          type: 'p',
          html: 'Por clases, el modelo funciona bien en artes menores (F1 0,95), arrastre (0,80) y buques sin modalidad asignada (0,81), y peor en cerco (0,69), palangre (0,53), artes fijas (0,51) y cañeros (0,50, con solo 11 buques de prueba). Una red neuronal de capas densas obtuvo métricas parecidas (exactitud 0,86, F1 medio 0,65), por lo que se mantuvo LightGBM. El README del repositorio resume el resultado con un «F1 del 86 %»; la tabla usa las cifras que imprime el cuaderno.',
        },
        {
          type: 'p',
          html: '<strong>Agrupación de buques.</strong> Con K-means (el README dice «KNN», pero el cuaderno usa <code>KMeans</code>) se probaron entre 2 y 25 grupos comparando inercia y silhouette. Aunque la silhouette era mayor con 18–19 grupos, se eligieron 11 para no fragmentar la flota. Los grupos de buques medianos y grandes quedan bien diferenciados; los de buques pequeños se solapan.',
        },
        {
          type: 'p',
          html: '<strong>Contrastes de hipótesis.</strong> Excluyendo artes menores, una prueba chi-cuadrado indica asociación entre comunidad autónoma y tipo de arte (χ² = 4.453, p &lt; 10⁻¹⁶). Como las varianzas de la eslora difieren entre artes (Levene, p &lt; 10⁻¹⁶), la relación entre eslora y tipo de arte se contrastó con Kruskal-Wallis.',
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
            'La modalidad y el puerto base son los últimos registrados para cada buque; el registro no conserva aquí su historial.',
            'Las clases minoritarias tienen pocos buques y características técnicas parecidas, lo que limita su clasificación. Los autores proponen añadir posiciones GPS para distinguir mejor los artes.',
            'Las imputaciones de valores a cero o incoherentes condicionan los totales de potencia y arqueo.',
            'La silhouette del agrupamiento elegido no aparece impresa en el cuaderno; el README la sitúa en torno a 0,4.',
          ],
        },
      ],
    },
    {
      id: 'autoria',
      heading: 'Autoría',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Trabajo compartido',
      items: [
        'Limpieza, análisis exploratorio, modelos, contrastes y memoria: Julio Úbeda Quesada y Lucas Zamora Vera, firmantes de la práctica.',
        'Datos públicos del Ministerio de Agricultura, Pesca y Alimentación y del registro de flota de la Comisión Europea.',
      ],
    },
    individual: {
      heading: 'En esta web',
      items: [
        'La serie anual del gráfico interactivo la calculé para este portfolio a partir de la base limpia del proyecto, con el script <code>scripts/flota/generar_serie.py</code>.',
        'La lectura de métricas de este caso sigue las salidas del cuaderno del repositorio.',
      ],
    },
  },
  related: {
    id: 'relacionado',
    heading: 'Proyecto posterior: dashboard de la flota',
    html: `Más adelante, en la práctica final de la asignatura de visualización de datos del mismo máster, el registro se usó para un dashboard en Streamlit con límites administrativos (repositorio ${dashRepo}). Es un proyecto distinto, con otro alcance: visualización y comunicación, no limpieza ni modelado. Al revisarlo para esta web, la aplicación publicada pedía iniciar sesión, por eso aquí se enlaza el repositorio.`,
  },
};

const en: CaseContent = {
  meta: {
    title: 'The Spanish fishing fleet, 1987–2025 · Julio Úbeda Quesada',
    description:
      'Case study: from the vessel register to a base for analysing and modelling the Spanish fishing fleet (academic project done in a pair).',
  },
  breadcrumb: 'Projects',
  kicker: 'Academic project, done in a pair · MSc in Data Science (UOC)',
  title: 'From the vessel register to a base for analysing the fishing fleet',
  lead: {
    summaryLabel: 'Main result',
    summary:
      'The register’s 27,364 vessels became a clean, analysable base. A LightGBM classifier predicts the fishing gear with a mean per-class recall of 71%: it does well on small-scale gear and trawling and worse on longline, fixed gear and pole-and-line.',
    roleLabel: 'Authorship',
    role: 'Shared work with Lucas Zamora Vera: cleaning, analysis, modelling and report signed by both.',
    link: { label: 'See the repository on GitHub', href: links.repoFleet },
  },
  facts: {
    heading: 'Facts',
    items: [
      { label: 'Type', html: 'Assignment 2 of “Data typology and life cycle”, MSc in Data Science (UOC)' },
      { label: 'Authors', html: 'Julio Úbeda Quesada and Lucas Zamora Vera' },
      { label: 'Data', html: '27,364 vessels from the Spanish fishing fleet register · registered 1987–2025' },
      { label: 'Tools', html: 'Python · pandas · scikit-learn · LightGBM · CatBoost · imbalanced-learn · Keras' },
      { label: 'Code licence', html: 'GPL-3.0' },
      { label: 'Code', html: repo },
    ],
  },
  disclosure: 'Project facts and contents',
  tocHeading: 'On this page',
  sections: [
    {
      id: 'source',
      heading: 'Where the data come from',
      blocks: [
        {
          type: 'p',
          html: 'The starting point is the dataset built in the previous assignment by <a href="/en/case-studies/fleet-web-scraping/">web scraping the EU and Spanish vessel registers</a>: one row per vessel, identified by its CFR, with 16 fields as they appear on the register website.',
        },
        {
          type: 'p',
          html: 'That format works for looking up one vessel, not for analysing the fleet: measurements carry units inside the text (“10,75 m”, “202,26 kW (275,0 CV)”), the status and its date share a field, and the home port mixes postcode, town, province and region.',
        },
      ],
    },
    {
      id: 'cleaning',
      heading: 'From register to analysable base',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Initial review',
              html: 'Duplicates, special characters, empty values, simplified column names and corrected data types: text with units into numbers and dates into date format.',
            },
            {
              title: 'Splitting fields',
              html: '<code>Estado</code> is split into register status and status date; <code>Puerto base</code> into postcode, port, province and region. The thirty-plus census categories are grouped into seven gear types.',
            },
            {
              title: 'Anomalous values',
              html: 'Zero or inconsistent lengths, tonnages and engine powers are imputed, and extreme values are reviewed. For example, the first vessel in the register is listed with a length of 0.00 m and has an imputed value in the clean base.',
            },
            {
              title: 'New variables',
              html: 'Each vessel’s age is computed and columns without analytical value are dropped. The result is 14 columns per vessel, ready to explore and model.',
            },
          ],
        },
      ],
    },
    {
      id: 'exploration',
      heading: 'Explore the fleet series',
      blocks: [
        {
          type: 'p',
          html: 'This chart rebuilds, from the clean base, how many vessels were on the register at the end of each year. Choose the gear type, the home-port region, the measure and the period; the text under the chart summarises the change.',
        },
        { type: 'component', name: 'fleetChart' },
        {
          type: 'p',
          html: 'The project’s exploratory analysis shows a fleet dominated by small vessels, with right-skewed distributions of length, tonnage and power, many vessels over 30 years old, and new, larger and more powerful vessels joining in the last 10–15 years.',
        },
      ],
    },
    {
      id: 'models',
      heading: 'Models',
      blocks: [
        {
          type: 'p',
          html: '<strong>Gear classification.</strong> The goal is to predict a vessel’s gear type from its technical and administrative features. Since about 90% of the fleet uses small-scale gear, the team used <i>balanced accuracy</i>, which weights each class equally. Four tree-based classifiers were compared (decision tree, random forest, LightGBM and CatBoost); LightGBM was tuned with grid search and 5-fold cross-validation and retrained with SMOTE oversampling.',
        },
        {
          type: 'table',
          caption: 'Final model (LightGBM with SMOTE) on 5,473 test vessels',
          head: ['Metric', 'Value', 'What it means'],
          rows: [
            ['Mean per-class recall', '0.71', 'Simple average of each gear type’s hit rate; every class weighs the same.'],
            ['Mean per-class F1', '0.68', 'Balance between precision and recall, also unweighted.'],
            ['Weighted F1', '0.88', 'Weighted by class size: lifted by small-scale gear (3,637 vessels, F1 0.95).'],
            ['Accuracy', '0.87', 'Share of vessels classified correctly; misleading with imbalanced classes.'],
          ],
        },
        {
          type: 'p',
          html: 'By class, the model works well for small-scale gear (F1 0.95), trawling (0.80) and vessels with no census category (0.81), and worse for purse seine (0.69), longline (0.53), fixed gear (0.51) and pole-and-line (0.50, with only 11 test vessels). A dense neural network reached similar metrics (accuracy 0.86, mean F1 0.65), so LightGBM was kept. The repository README summarises the result as an “F1 of 86%”; the table uses the figures printed by the notebook.',
        },
        {
          type: 'p',
          html: '<strong>Vessel clustering.</strong> With K-means (the README says “KNN”, but the notebook uses <code>KMeans</code>) the team tried 2 to 25 clusters, comparing inertia and silhouette. Although silhouette was higher with 18–19 clusters, 11 were chosen to avoid fragmenting the fleet. Medium and large vessel clusters are well separated; small vessel clusters overlap.',
        },
        {
          type: 'p',
          html: '<strong>Hypothesis tests.</strong> Excluding small-scale gear, a chi-square test shows an association between region and gear type (χ² = 4,453, p &lt; 10⁻¹⁶). Because length variances differ between gear types (Levene, p &lt; 10⁻¹⁶), the relation between length and gear was tested with Kruskal-Wallis.',
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
            'The census category and home port are the latest recorded for each vessel; their history is not kept here.',
            'Minority classes have few vessels with similar technical features, which limits their classification. The authors suggest adding GPS positions to tell gear types apart.',
            'Imputing zero or inconsistent values affects the power and tonnage totals.',
            'The silhouette of the chosen clustering is not printed in the notebook; the README puts it at about 0.4.',
          ],
        },
      ],
    },
    {
      id: 'authorship',
      heading: 'Authorship',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Shared work',
      items: [
        'Cleaning, exploratory analysis, models, tests and report: Julio Úbeda Quesada and Lucas Zamora Vera, who signed the assignment.',
        'Public data from the Spanish Ministry of Agriculture, Fisheries and Food and the European Commission fleet register.',
      ],
    },
    individual: {
      heading: 'On this site',
      items: [
        'I computed the yearly series in the interactive chart for this portfolio from the project’s clean base, with the script <code>scripts/flota/generar_serie.py</code>.',
        'The reading of the metrics in this case follows the outputs of the repository notebook.',
      ],
    },
  },
  related: {
    id: 'related',
    heading: 'Later project: fleet dashboard',
    html: `Later, in the final assignment of the data visualisation course of the same master’s, the register was used for a Streamlit dashboard with administrative boundaries (repository ${dashRepo}). It is a different project with a different scope: visualisation and communication, not cleaning or modelling. When I checked it for this site, the published app asked for a sign-in, so the repository is linked here instead.`,
  },
};

export const fishingFleet: Record<Lang, CaseContent> = { es, en };
