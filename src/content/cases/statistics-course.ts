import type { Lang } from '../../i18n/routes';
import { links } from '../links';
import type { CaseContent } from './types';

/**
 * Caso: Curso de Estadística Básica (divulgación).
 * Fuentes: README, _quarto.yml, index.qmd y notebooks/04_inferencia/practica.ipynb del repositorio
 * Curso-de-Estadistica-Basica. Las cifras del ejemplo salen de las salidas del cuaderno.
 */

const repo = `<a href="${links.repoCourse}">GitHub</a>`;
const site = `<a href="${links.siteCourse}">juliouq.github.io/Curso-de-Estadistica-Basica</a>`;

const es: CaseContent = {
  meta: {
    title: 'Curso de Estadística Básica · Julio Úbeda Quesada',
    description:
      'Caso de estudio: un curso web de estadística en español con teoría, prácticas en Python, una librería propia y publicación continua.',
  },
  breadcrumb: 'Proyectos',
  kicker: 'Divulgación · Curso en línea',
  title: 'Aprender estadística paso a paso, de la intuición al análisis con Python',
  lead: {
    summaryLabel: 'Qué es',
    summary:
      'Un libro web en español para quien empieza sin base estadística: seis módulos con teoría y prácticas ejecutables, un proyecto integrador y tres apéndices de consulta.',
    roleLabel: 'Autoría',
    role: 'Autor del curso, de su librería stats_toolkit y de su flujo de publicación.',
    link: { label: 'Abrir el curso', href: links.siteCourse },
  },
  facts: {
    heading: 'Ficha',
    items: [
      { label: 'Público', html: 'Personas que empiezan sin base estadística' },
      { label: 'Formato', html: 'Libro web con Quarto · prácticas en Jupyter, en local o en Google Colab' },
      { label: 'Contenido', html: '6 módulos · proyecto integrador · laboratorio interactivo · 3 apéndices' },
      { label: 'Herramientas', html: 'Quarto · Python · NumPy · pandas · SciPy · statsmodels · pytest · GitHub Actions' },
      { label: 'Curso', html: site },
      { label: 'Código', html: repo },
    ],
  },
  disclosure: 'Ficha del curso e índice',
  tocHeading: 'En esta página',
  sections: [
    {
      id: 'publico',
      heading: 'A quién sirve',
      blocks: [
        {
          type: 'p',
          html: 'El curso está pensado para quien empieza sin base estadística y quiere aprender a describir datos, razonar con probabilidades, estimar, contrastar hipótesis, estudiar relaciones y comparar grupos. Cada explicación se acompaña de código que se puede ejecutar en el ordenador o en Google Colab sin preparar nada.',
        },
      ],
    },
    {
      id: 'organizacion',
      heading: 'Cómo está organizado',
      blocks: [
        {
          type: 'table',
          caption: 'Módulos del curso',
          head: ['Módulo', 'Temas', 'Caso de uso'],
          rows: [
            ['1 · Estadística descriptiva', 'Tipos de variables, centro, dispersión y forma', 'Salarios simulados; preprocesamiento de datos de sueño'],
            ['2 · Probabilidad', 'Probabilidad condicional, teorema de Bayes', 'Filtro de spam simplificado'],
            ['3 · Distribuciones', 'Binomial, Poisson, normal, exponencial, teorema central del límite', 'Tiempos de espera y conversión'],
            ['4 · Inferencia', 'Intervalos de confianza, contrastes z y t, proporciones, potencia, bootstrap', 'Cuatro preguntas sobre datos de sueño'],
            ['5 · Correlación y regresión', 'Pearson, Spearman, regresión lineal simple', 'Publicidad y ventas; sueño y estrés'],
            ['6 · ANOVA y no paramétricas', 'ANOVA, Tukey, chi-cuadrado, Mann-Whitney, Kruskal-Wallis', 'Tratamientos y segmentos de clientes'],
          ],
        },
        {
          type: 'list',
          items: [
            'Cada módulo tiene un capítulo de <strong>teoría</strong> con fórmulas, ejemplos y preguntas de autoevaluación, y una o dos <strong>prácticas</strong> con ejercicios y soluciones plegadas.',
            'La librería propia <code>stats_toolkit</code> implementa a mano los métodos con valor didáctico y compara sus resultados con SciPy y statsmodels; tiene pruebas con pytest.',
            'Cada cambio pasa por una revisión automática que ejecuta las pruebas y las prácticas y renderiza el libro antes de publicarlo en GitHub Pages.',
          ],
        },
      ],
    },
    {
      id: 'ejemplo',
      heading: 'Un ejemplo del curso',
      blocks: [
        {
          type: 'p',
          html: 'En la práctica del módulo 4 se plantea: <strong>¿difiere la calidad del sueño entre mujeres y hombres?</strong> La práctica explica por qué usar la prueba t de Welch, que no exige varianzas iguales, en lugar de decidir antes con una prueba F, y cómo leer el resultado.',
        },
        {
          type: 'list',
          items: [
            'Medias de calidad del sueño: 7,665 en mujeres y 6,973 en hombres.',
            'Intervalo de confianza del 95 % para la diferencia (mujeres − hombres): de 0,46 a 0,93.',
            'Como el intervalo es entero positivo, los datos indican una media mayor en mujeres. La práctica insiste en que una diferencia estadísticamente significativa no dice por sí sola si es importante en la práctica.',
          ],
        },
        {
          type: 'p',
          html: 'Los datos de sueño del curso son sintéticos, creados con fines ilustrativos: sirven para practicar los métodos, no para sacar conclusiones sobre la salud.',
        },
      ],
    },
    {
      id: 'autoria',
      heading: 'Autoría y recursos',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Herramientas de terceros',
      items: [
        'Quarto para el libro, Observable JS para los gráficos interactivos y MathJax para las fórmulas, que se cargan desde internet.',
        'NumPy, pandas, matplotlib, SciPy y statsmodels para los cálculos; GitHub Actions y GitHub Pages para la publicación.',
      ],
    },
    individual: {
      heading: 'Mi trabajo',
      items: [
        'Redacción de la teoría, las prácticas, los ejercicios y los apéndices.',
        'Diseño de la librería stats_toolkit, sus pruebas y el flujo de revisión y publicación.',
      ],
    },
  },
};

const en: CaseContent = {
  meta: {
    title: 'Basic Statistics course · Julio Úbeda Quesada',
    description:
      'Case study: a Spanish-language statistics web course with theory, Python practice, its own library and continuous publication.',
  },
  breadcrumb: 'Projects',
  kicker: 'Outreach · Online course',
  title: 'Learning statistics step by step, from intuition to analysis with Python',
  lead: {
    summaryLabel: 'What it is',
    summary:
      'A Spanish-language web book for people with no statistics background: six modules with theory and runnable practice, a capstone project and three reference appendices.',
    roleLabel: 'Authorship',
    role: 'Author of the course, its stats_toolkit library and its publishing workflow.',
    link: { label: 'Open the course (in Spanish)', href: links.siteCourse },
  },
  facts: {
    heading: 'Facts',
    items: [
      { label: 'Audience', html: 'People starting with no statistics background' },
      { label: 'Language', html: 'Spanish' },
      { label: 'Format', html: 'Quarto web book · Jupyter practice, locally or in Google Colab' },
      { label: 'Content', html: '6 modules · capstone project · interactive lab · 3 appendices' },
      { label: 'Tools', html: 'Quarto · Python · NumPy · pandas · SciPy · statsmodels · pytest · GitHub Actions' },
      { label: 'Course', html: site },
      { label: 'Code', html: repo },
    ],
  },
  disclosure: 'Course facts and contents',
  tocHeading: 'On this page',
  sections: [
    {
      id: 'audience',
      heading: 'Who it is for',
      blocks: [
        {
          type: 'p',
          html: 'The course is meant for people starting with no statistics background who want to learn to describe data, reason with probabilities, estimate, test hypotheses, study relationships and compare groups. Every explanation comes with code that runs on a computer or in Google Colab with no setup.',
        },
      ],
    },
    {
      id: 'organisation',
      heading: 'How it is organised',
      blocks: [
        {
          type: 'table',
          caption: 'Course modules',
          head: ['Module', 'Topics', 'Use case'],
          rows: [
            ['1 · Descriptive statistics', 'Variable types, centre, spread and shape', 'Simulated salaries; preprocessing sleep data'],
            ['2 · Probability', 'Conditional probability, Bayes’ theorem', 'Simplified spam filter'],
            ['3 · Distributions', 'Binomial, Poisson, normal, exponential, central limit theorem', 'Waiting times and conversion'],
            ['4 · Inference', 'Confidence intervals, z and t tests, proportions, power, bootstrap', 'Four questions on sleep data'],
            ['5 · Correlation and regression', 'Pearson, Spearman, simple linear regression', 'Advertising and sales; sleep and stress'],
            ['6 · ANOVA and non-parametric tests', 'ANOVA, Tukey, chi-square, Mann-Whitney, Kruskal-Wallis', 'Treatments and customer segments'],
          ],
        },
        {
          type: 'list',
          items: [
            'Each module has a <strong>theory</strong> chapter with formulas, examples and self-check questions, and one or two <strong>practice</strong> notebooks with exercises and folded solutions.',
            'The course’s own <code>stats_toolkit</code> library implements the didactic methods by hand and compares its results with SciPy and statsmodels; it is tested with pytest.',
            'Every change goes through an automatic check that runs the tests and the practice notebooks and renders the book before publishing it on GitHub Pages.',
          ],
        },
      ],
    },
    {
      id: 'example',
      heading: 'An example from the course',
      blocks: [
        {
          type: 'p',
          html: 'The module 4 practice asks: <strong>does sleep quality differ between women and men?</strong> It explains why to use Welch’s t-test, which does not require equal variances, instead of deciding first with an F-test, and how to read the result.',
        },
        {
          type: 'list',
          items: [
            'Mean sleep quality: 7.665 for women and 6.973 for men.',
            '95% confidence interval for the difference (women − men): 0.46 to 0.93.',
            'Since the whole interval is positive, the data point to a higher mean for women. The practice stresses that a statistically significant difference does not, on its own, tell you whether it matters in practice.',
          ],
        },
        {
          type: 'p',
          html: 'The course’s sleep data are synthetic, created for illustration: they are for practising the methods, not for drawing conclusions about health.',
        },
      ],
    },
    {
      id: 'credits',
      heading: 'Authorship and resources',
      blocks: [{ type: 'roles' }],
    },
  ],
  figures: {},
  roles: {
    collective: {
      heading: 'Third-party tools',
      items: [
        'Quarto for the book, Observable JS for the interactive charts and MathJax for formulas, loaded from the internet.',
        'NumPy, pandas, matplotlib, SciPy and statsmodels for calculations; GitHub Actions and GitHub Pages for publishing.',
      ],
    },
    individual: {
      heading: 'My work',
      items: [
        'Writing the theory, practice notebooks, exercises and appendices.',
        'Designing the stats_toolkit library, its tests and the review and publishing workflow.',
      ],
    },
  },
};

export const statisticsCourse: Record<Lang, CaseContent> = { es, en };
