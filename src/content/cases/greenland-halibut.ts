import type { Lang } from '../../i18n/routes';
import { links } from '../links';
import type { CaseContent } from './types';
import figure2 from '../../assets/figures/ubeda-2023-fig2-hipotesis.jpg';

/**
 * Caso: estructura de stock del fletán negro (Úbeda et al., 2023).
 * Fuente de los datos del estudio: el artículo publicado (DOI 10.1111/fme.12639).
 * Cuando el README del repositorio difiere del artículo, se sigue el artículo.
 */

const doi = `<a href="${links.article2023}">doi.org/10.1111/fme.12639</a>`;
const noaa = `<a href="${links.article2023Noaa}">NOAA Institutional Repository</a>`;
const repo = `<a href="${links.repoMarss}">GitHub</a>`;

const es: CaseContent = {
  meta: {
    title: '¿Coinciden los límites de gestión con la estructura del fletán negro? · Julio Úbeda Quesada',
    description:
      'Caso de estudio: modelos MARSS sobre campañas científicas en cuatro regiones del Atlántico Norte para contrastar la delimitación de los stocks de fletán negro (Úbeda et al., 2023).',
  },
  breadcrumb: 'Proyectos',
  kicker: 'Artículo revisado por pares · 2023',
  title: '¿Coinciden los límites de gestión con la estructura del fletán negro?',
  lead: {
    summaryLabel: 'Hallazgo principal',
    summary:
      'Los modelos mejor respaldados no agrupan Groenlandia suroriental con Islandia, como se gestiona hoy, y apoyan una posible conexión entre Islandia y el talud noruego.',
    roleLabel: 'Mi papel',
    role: 'Primer autor y autor de correspondencia de un análisis en equipo (siete autores).',
    link: { label: 'Leer el artículo (DOI)', href: links.article2023 },
  },
  facts: {
    heading: 'Ficha',
    items: [
      {
        label: 'Publicación',
        html: '<i>Fisheries Management and Ecology</i>, 30(5), 521–535 (2023)',
      },
      { label: 'Autoría', html: 'Úbeda, Nogueira, Tolimieri, Vihtakari, Elvarsson, Treble y Boje' },
      { label: 'Ámbito', html: '4 regiones · 3 stocks incluidos · 1996–2019' },
      { label: 'Herramientas', html: 'R · paquete MARSS · ggOceanMaps' },
      { label: 'Artículo', html: doi },
      { label: 'Copia pública', html: noaa },
      { label: 'Código y datos', html: repo },
    ],
  },
  disclosure: 'Ficha del estudio e índice',
  tocHeading: 'En esta página',
  sections: [
    {
      id: 'ambito',
      heading: 'Ámbito del estudio',
      blocks: [
        {
          type: 'p',
          html: 'El fletán negro (<i>Reinhardtius hippoglossoides</i>) es un pez plano de aguas frías y profundas que puede migrar largas distancias. En el Atlántico Norte se reconocen <strong>cuatro stocks de altura</strong> que se gestionan por separado: Ártico Nororiental (NEAS), Nórdico Occidental (WNS), Noroeste Atlántico (NWAS) y el stock del este de Canadá.',
        },
        {
          type: 'p',
          html: 'El estudio incluye <strong>tres de esos stocks</strong>, aquellos con campañas a las que el equipo tenía acceso, y analiza <strong>cuatro regiones</strong>, cada una con su propia campaña científica de arrastre de fondo. El stock Nórdico Occidental aporta dos regiones: Groenlandia suroriental e Islandia.',
        },
        {
          type: 'table',
          caption: 'Regiones y campañas analizadas (tabla 1 del artículo)',
          head: ['Región', 'Stock', 'Área', 'Serie'],
          rows: [
            ['Groenlandia occidental y Ártico oriental canadiense', 'NWAS', 'NAFO 1CD y 0A-Sur', '1997–2017 y 2019'],
            ['Groenlandia suroriental', 'WNS', 'ICES 14b', '1998–2016'],
            ['Islandia', 'WNS', 'ICES 5, 6 y 12', '1996–2019'],
            ['Talud noruego', 'NEAS', 'Suroeste de Svalbard', '1996–2019'],
          ],
        },
        {
          type: 'p',
          html: 'Las campañas las realizaron el Institute of Marine Research (Noruega), el Marine and Freshwater Research Institute (Islandia), el Greenland Institute of Natural Resources y Fisheries and Oceans Canada. Los índices de abundancia y de biomasa se analizaron por separado: la biomasa representa mejor la fracción pescable y la abundancia capta mejor los pulsos de reclutamiento. Como posibles factores se probaron el índice de la Oscilación del Atlántico Norte (NAO) y las capturas comerciales de cada stock, ambos también con retardo.',
        },
      ],
    },
    {
      id: 'metodo',
      heading: 'Método',
      blocks: [
        {
          type: 'p',
          html: 'Imagina cuatro sensores que miden con ruido y con calibraciones distintas. La pregunta es cuántas señales reales hay detrás: una común, dos, tres o cuatro independientes. Un <strong>modelo de espacio de estados autorregresivo multivariante</strong> (MARSS) separa dos capas:',
        },
        {
          type: 'list',
          items: [
            '<strong>Proceso:</strong> la trayectoria real, no observada, de cada población. Crece o decrece con una tasa propia y tiene variación aleatoria. Las covariables, como el clima o las capturas, pueden modificar esa tasa.',
            '<strong>Observación:</strong> lo que mide cada campaña. Incluye un factor de escala propio de cada barco o arte de pesca y un error de medida.',
          ],
        },
        { type: 'diagram' },
        {
          type: 'p',
          html: 'Cada hipótesis biológica se traduce en una matriz Z distinta. El equipo comparó <strong>siete hipótesis</strong>, desde una sola población para todo el Atlántico Norte hasta cuatro poblaciones independientes, basadas en estudios previos de genética, marcado y deriva de huevos y larvas.',
        },
        { type: 'figure', key: 'hypotheses' },
        {
          type: 'p',
          html: 'Para cada hipótesis se probaron tasas de crecimiento iguales o distintas entre poblaciones, tres estructuras para la varianza del proceso y las covariables de una en una. Las series se transformaron a escala logarítmica. Los errores de observación se trataron como independientes, salvo en las dos campañas hechas por el mismo barco, que comparten varianza. Los modelos se compararon con el AICb, una versión del criterio de información de Akaike calculada por <i>bootstrap</i> y adecuada para series cortas. Entre modelos con un apoyo similar (ΔAICb &lt; 2) se eligió el que tenía menos parámetros.',
        },
      ],
    },
    {
      id: 'resultado',
      heading: 'Resultado',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>El Noroeste Atlántico se comporta como una población independiente</strong> en los modelos mejor respaldados, tanto de abundancia como de biomasa.',
            '<strong>Islandia y el talud noruego se agrupan en una misma población</strong> en el mejor modelo de ambos índices (hipótesis 3), lo que apoya una posible conexión entre las dos regiones. Groenlandia suroriental queda como población separada.',
            '<strong>Ningún modelo bien respaldado agrupa Groenlandia suroriental con Islandia</strong>, que es como se gestiona hoy el stock Nórdico Occidental. En biomasa, la hipótesis de cuatro poblaciones separadas quedó muy cerca del mejor modelo (ΔAICb = 0,61), aunque con tres parámetros más.',
            '<strong>Las capturas comerciales aparecen en los mejores modelos; la NAO, no.</strong> Ningún modelo de biomasa entre los diez mejores incluye la NAO, aunque sí algunos de abundancia. El efecto del clima sigue sin entenderse bien.',
            '<strong>Tendencias.</strong> En los modelos sin covariables, la abundancia en Groenlandia occidental y el Ártico oriental canadiense desciende en torno a un 9,7 % anual (IC 95 %: 7,5–11,8 %). En las demás regiones, el intervalo de confianza de la tasa de crecimiento incluye el cero.',
          ],
        },
        {
          type: 'p',
          html: 'Los autores concluyen que los límites actuales de los stocks en el Atlántico Nororiental no parecen reflejar la biología de la especie y que el área Nórdica Occidental podría ser una zona de mezcla entre dos grandes poblaciones. Recomiendan un enfoque de precaución y más estudios antes de cambiar la delimitación.',
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
            'Solo se analizan tres de los cuatro stocks de altura; el stock del este de Canadá queda fuera.',
            'Las campañas muestrean por debajo de unos 400 m, donde apenas hay juveniles, así que la migración de juveniles queda poco representada.',
            'Las campañas del Noroeste Atlántico no cubren todo el área del stock.',
            'Los años sin campaña impidieron estimar bien la varianza del proceso.',
            'Se supuso independencia entre los errores de observación de las campañas.',
            'Las covariables se probaron de una en una, porque las combinaciones obtenían poco respaldo.',
            'El resultado se basa en tendencias de abundancia y biomasa. Los autores piden contrastarlo con el resto de la información biológica disponible.',
          ],
        },
      ],
    },
    {
      id: 'papel',
      heading: 'Trabajo colectivo y contribución individual',
      blocks: [{ type: 'roles' }],
    },
  ],
  diagram: {
    title: 'Cómo se asignan las series observadas a poblaciones subyacentes',
    intro: 'Ejemplo con la hipótesis 3, la mejor respaldada en el artículo.',
    seriesHeading: 'Series observadas (campañas)',
    populationsHeading: 'Poblaciones subyacentes (estados)',
    series: [
      { name: 'Groenlandia occ. y Ártico canadiense', code: 'NWAS', stock: 'NWAS' },
      { name: 'Groenlandia suroriental', code: 'EG', stock: 'WNS' },
      { name: 'Islandia', code: 'ICE', stock: 'WNS' },
      { name: 'Talud noruego', code: 'NEAS', stock: 'NEAS' },
    ],
    populations: ['Población 1', 'Población 2', 'Población 3'],
    matrixCaption: 'La matriz Z de la hipótesis 3: cada fila es una serie y cada columna, una población.',
    matrixCorner: 'Serie',
    note: 'Cada serie observada = población asignada + escala propia de la campaña + error de observación.',
    source: 'Diagrama propio basado en las ecuaciones y la tabla 2 de Úbeda et al. (2023).',
  },
  figures: {
    hypotheses: {
      src: figure2,
      alt: 'Siete mapas del Atlántico Norte, uno por hipótesis, de H1 a H7. Cada mapa colorea las regiones de campaña según la población a la que se asignan. En H3, Groenlandia suroriental, Islandia con el talud noruego y el Noroeste Atlántico aparecen como tres poblaciones.',
      caption:
        'Las siete hipótesis de estructura poblacional comparadas en el estudio. Las regiones del mismo color forman una misma población estimada.',
      credit: `Figura 2 de Úbeda et al. (2023), <i>Fisheries Management and Ecology</i>, ${doi}. Reproducida sin modificar su contenido bajo licencia <a href="${links.ccBy}">CC BY 4.0</a>.`,
    },
  },
  roles: {
    collective: {
      heading: 'Trabajo del equipo',
      items: [
        'El planteamiento, el análisis y las conclusiones son del equipo de siete autores: J. Úbeda, A. Nogueira, N. Tolimieri, M. Vihtakari, B. Elvarsson, M. Treble y J. Boje.',
        'Los datos proceden de campañas del Institute of Marine Research, el Marine and Freshwater Research Institute, el Greenland Institute of Natural Resources y Fisheries and Oceans Canada, con sus equipos técnicos y tripulaciones.',
      ],
    },
    individual: {
      heading: 'Mi contribución',
      items: [
        'Primer autor y autor de correspondencia del artículo.',
        'Afiliación a la Universidad de Alicante y al Greenland Institute of Natural Resources.',
        `Mantengo el repositorio público del estudio, con las series, los scripts en R y las figuras (${repo}).`,
      ],
    },
  },
  related: {
    id: 'relacionado',
    heading: 'Trabajo relacionado',
    html: `Estévez-Barcia, D. <i>et al.</i> (2025). Sex influences the genetic structure of Greenland halibut in the North Atlantic. <i>Ecology and Evolution</i>, 15(2), e70822 (coautor). <a href="${links.article2025}">doi.org/10.1002/ece3.70822</a>`,
  },
};

const en: CaseContent = {
  meta: {
    title: 'Do management boundaries match the population structure of Greenland halibut? · Julio Úbeda Quesada',
    description:
      'Case study: MARSS models fitted to scientific surveys in four North Atlantic regions to test how Greenland halibut stocks are delineated (Úbeda et al., 2023).',
  },
  breadcrumb: 'Projects',
  kicker: 'Peer-reviewed article · 2023',
  title: 'Do management boundaries match the population structure of Greenland halibut?',
  lead: {
    summaryLabel: 'Main finding',
    summary:
      'The best-supported models do not group Southeast Greenland with Iceland, as managed today, and support a possible connection between Iceland and the Norwegian slope.',
    roleLabel: 'My role',
    role: 'First and corresponding author of a team analysis (seven authors).',
    link: { label: 'Read the article (DOI)', href: links.article2023 },
  },
  facts: {
    heading: 'At a glance',
    items: [
      { label: 'Publication', html: '<i>Fisheries Management and Ecology</i>, 30(5), 521–535 (2023)' },
      { label: 'Authors', html: 'Úbeda, Nogueira, Tolimieri, Vihtakari, Elvarsson, Treble & Boje' },
      { label: 'Scope', html: '4 regions · 3 stocks included · 1996–2019' },
      { label: 'Tools', html: 'R · MARSS package · ggOceanMaps' },
      { label: 'Article', html: doi },
      { label: 'Public copy', html: noaa },
      { label: 'Code and data', html: repo },
    ],
  },
  disclosure: 'Study facts and contents',
  tocHeading: 'On this page',
  sections: [
    {
      id: 'scope',
      heading: 'Scope of the study',
      blocks: [
        {
          type: 'p',
          html: 'Greenland halibut (<i>Reinhardtius hippoglossoides</i>) is a flatfish of cold, deep waters that can migrate over long distances. In the North Atlantic, <strong>four offshore stocks</strong> are recognised and managed separately: Northeast Arctic (NEAS), West Nordic (WNS), Northwest Atlantic (NWAS) and the eastern Canadian stock.',
        },
        {
          type: 'p',
          html: 'The study includes <strong>three of those stocks</strong>, the ones whose surveys the team could access, and analyses <strong>four regions</strong>, each with its own scientific bottom-trawl survey. The West Nordic stock contributes two regions: Southeast Greenland and Iceland.',
        },
        {
          type: 'table',
          caption: 'Regions and surveys analysed (Table 1 of the article)',
          head: ['Region', 'Stock', 'Area', 'Series'],
          rows: [
            ['West Greenland and Canadian eastern Arctic', 'NWAS', 'NAFO 1CD and 0A-South', '1997–2017 and 2019'],
            ['Southeast Greenland', 'WNS', 'ICES 14b', '1998–2016'],
            ['Iceland', 'WNS', 'ICES 5, 6 and 12', '1996–2019'],
            ['Norwegian slope', 'NEAS', 'Southwest of Svalbard', '1996–2019'],
          ],
        },
        {
          type: 'p',
          html: 'The surveys were run by the Institute of Marine Research (Norway), the Marine and Freshwater Research Institute (Iceland), the Greenland Institute of Natural Resources and Fisheries and Oceans Canada. Abundance and biomass indices were analysed separately: biomass better represents the fishable part of the population, while abundance better captures recruitment pulses. The North Atlantic Oscillation (NAO) index and each stock’s commercial catches, also lagged, were tested as possible drivers.',
        },
      ],
    },
    {
      id: 'method',
      heading: 'Method',
      blocks: [
        {
          type: 'p',
          html: 'Picture four sensors that measure with noise and with different calibrations. The question is how many real signals lie behind them: one shared signal, or two, three or four independent ones. A <strong>multivariate autoregressive state-space model</strong> (MARSS) separates two layers:',
        },
        {
          type: 'list',
          items: [
            '<strong>Process:</strong> the true, unobserved trajectory of each population. It grows or declines at its own rate, with random variation. Covariates such as climate or catches can modify that rate.',
            '<strong>Observation:</strong> what each survey measures. It includes a scaling factor for each vessel or gear and a measurement error.',
          ],
        },
        { type: 'diagram' },
        {
          type: 'p',
          html: 'Each biological hypothesis becomes a different Z matrix. The team compared <strong>seven hypotheses</strong>, from a single population for the whole North Atlantic to four independent ones, based on earlier genetic, tagging and egg-and-larval drift studies.',
        },
        { type: 'figure', key: 'hypotheses' },
        {
          type: 'p',
          html: 'For each hypothesis, the models tested equal or different growth rates across populations, three structures for the process variance, and the covariates one at a time. Series were log-transformed. Observation errors were treated as independent, except for the two surveys run by the same vessel, which share a variance. Models were compared with AICb, a bootstrap version of Akaike’s information criterion suited to short series. Among similarly supported models (ΔAICb &lt; 2), the one with fewer parameters was chosen.',
        },
      ],
    },
    {
      id: 'results',
      heading: 'Results',
      blocks: [
        {
          type: 'list',
          items: [
            '<strong>The Northwest Atlantic behaves as an independent population</strong> in the best-supported models, for both abundance and biomass.',
            '<strong>Iceland and the Norwegian slope group into one population</strong> in the best model for both indices (hypothesis 3), supporting a possible connection between the two regions. Southeast Greenland remains a separate population.',
            '<strong>No well-supported model groups Southeast Greenland with Iceland</strong>, which is how the West Nordic stock is managed today. For biomass, the four-population hypothesis came very close to the best model (ΔAICb = 0.61), but with three more parameters.',
            '<strong>Commercial catches appear in the best models; the NAO does not.</strong> None of the top ten biomass models includes the NAO, although some abundance models do. The effect of climate remains poorly understood.',
            '<strong>Trends.</strong> In models without covariates, abundance in West Greenland and the Canadian eastern Arctic declines by about 9.7% a year (95% CI: 7.5–11.8%). In the other regions, the confidence interval of the growth rate includes zero.',
          ],
        },
        {
          type: 'p',
          html: 'The authors conclude that the current stock boundaries in the Northeast Atlantic do not seem to reflect the biology of the species, and that the West Nordic area may be a mixing zone between two large populations. They recommend a precautionary approach and further studies before changing the delineation.',
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
            'Only three of the four offshore stocks are analysed; the eastern Canadian stock is not included.',
            'Surveys sample below roughly 400 m, where juveniles are rare, so juvenile migration is under-represented.',
            'The Northwest Atlantic surveys do not cover the whole stock area.',
            'Years without surveys prevented a reliable estimate of the process variance.',
            'Observation errors were assumed to be independent across surveys.',
            'Covariates were tested one at a time, because combinations received little support.',
            'The result rests on abundance and biomass trends. The authors call for checking it against the rest of the available biological information.',
          ],
        },
      ],
    },
    {
      id: 'role',
      heading: 'Team work and individual contribution',
      blocks: [{ type: 'roles' }],
    },
  ],
  diagram: {
    title: 'How observed series map onto underlying populations',
    intro: 'Example using hypothesis 3, the best supported in the article.',
    seriesHeading: 'Observed series (surveys)',
    populationsHeading: 'Underlying populations (states)',
    series: [
      { name: 'West Greenland & Canadian Arctic', code: 'NWAS', stock: 'NWAS' },
      { name: 'Southeast Greenland', code: 'EG', stock: 'WNS' },
      { name: 'Iceland', code: 'ICE', stock: 'WNS' },
      { name: 'Norwegian slope', code: 'NEAS', stock: 'NEAS' },
    ],
    populations: ['Population 1', 'Population 2', 'Population 3'],
    matrixCaption: 'The Z matrix for hypothesis 3: each row is a series and each column a population.',
    matrixCorner: 'Series',
    note: 'Each observed series = assigned population + survey-specific scaling + observation error.',
    source: 'Original diagram based on the equations and Table 2 of Úbeda et al. (2023).',
  },
  figures: {
    hypotheses: {
      src: figure2,
      alt: 'Seven maps of the North Atlantic, one per hypothesis, H1 to H7. Each map colours the survey regions by the population they are assigned to. In H3, Southeast Greenland, Iceland together with the Norwegian slope, and the Northwest Atlantic appear as three populations.',
      caption:
        'The seven population-structure hypotheses compared in the study. Regions with the same colour form one estimated population.',
      credit: `Figure 2 from Úbeda et al. (2023), <i>Fisheries Management and Ecology</i>, ${doi}. Reproduced without changes to its content under a <a href="${links.ccBy}">CC BY 4.0</a> licence.`,
    },
  },
  roles: {
    collective: {
      heading: 'Team work',
      items: [
        'The study design, analysis and conclusions belong to the team of seven authors: J. Úbeda, A. Nogueira, N. Tolimieri, M. Vihtakari, B. Elvarsson, M. Treble and J. Boje.',
        'The data come from surveys by the Institute of Marine Research, the Marine and Freshwater Research Institute, the Greenland Institute of Natural Resources and Fisheries and Oceans Canada, with their technical staff and crews.',
      ],
    },
    individual: {
      heading: 'My contribution',
      items: [
        'First and corresponding author of the article.',
        'Affiliated with the University of Alicante and the Greenland Institute of Natural Resources.',
        `I maintain the study’s public repository, with the series, R scripts and figures (${repo}).`,
      ],
    },
  },
  related: {
    id: 'related',
    heading: 'Related work',
    html: `Estévez-Barcia, D. <i>et al.</i> (2025). Sex influences the genetic structure of Greenland halibut in the North Atlantic. <i>Ecology and Evolution</i>, 15(2), e70822 (co-author). <a href="${links.article2025}">doi.org/10.1002/ece3.70822</a>`,
  },
};

export const greenlandHalibut: Record<Lang, CaseContent> = { es, en };
