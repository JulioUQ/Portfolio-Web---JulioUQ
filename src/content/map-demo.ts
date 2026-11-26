import type { Lang } from '../i18n/routes';

/** Textos de la página de la demo del generador de mapas. */
export const mapDemo: Record<
  Lang,
  { title: string; description: string; heading: string; notice: string; back: string; raw: string; frameTitle: string; tryHeading: string; tries: string[] }
> = {
  es: {
    title: 'Mapa de ejemplo del generador de mapas · Julio Úbeda Quesada',
    description: 'Demo del generador de mapas interactivos con datos ficticios: puntos por especie, zonas, filtros y leyenda.',
    heading: 'Mapa de ejemplo',
    notice:
      'Datos ficticios generados para este portfolio. El mapa base (Esri) y las librerías (Leaflet) se cargan desde internet: sin conexión no se ve el fondo.',
    back: 'Volver al caso',
    raw: 'Abrir el HTML tal como lo exporta la herramienta',
    frameTitle: 'Mapa interactivo de ejemplo con capturas ficticias en el Mediterráneo occidental',
    tryHeading: 'Qué se puede probar',
    tries: [
      '147 puntos de captura ficticios frente a Mallorca y Cartagena, coloreados por especie (merluza, salmonete, calamar, gamba roja y pulpo).',
      'Dos zonas ficticias con borde discontinuo: una veda temporal y una reserva marina.',
      'Filtros por barco, puerto y rango de fechas en la barra superior; la leyenda permite encender o apagar cada especie.',
      'Al pasar el ratón por un punto se ve el barco, la especie y la captura; al hacer clic, la ficha completa.',
    ],
  },
  en: {
    title: 'Map generator example map · Julio Úbeda Quesada',
    description: 'Demo of the interactive map generator with fictitious data: points by species, zones, filters and legend.',
    heading: 'Example map',
    notice:
      'Fictitious data created for this portfolio. The base map (Esri) and libraries (Leaflet) load from the internet: without a connection the background is not shown.',
    back: 'Back to the case study',
    raw: 'Open the HTML exactly as the tool exports it',
    frameTitle: 'Interactive example map with fictitious catches in the western Mediterranean',
    tryHeading: 'What you can try',
    tries: [
      '147 fictitious catch points off Mallorca and Cartagena, coloured by species (hake, red mullet, squid, red shrimp and octopus).',
      'Two fictitious zones with dashed borders: a temporary closure and a marine reserve.',
      'Filters by vessel, port and date range in the top bar; the legend switches each species on or off.',
      'Hovering over a point shows the vessel, species and catch; clicking opens the full record. The map’s labels are in Spanish, the tool’s language.',
    ],
  },
};
