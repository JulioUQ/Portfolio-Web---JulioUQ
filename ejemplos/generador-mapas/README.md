# Ejemplo reproducible · Generador de mapas interactivos

Genera el mapa que ilustra el caso `/es/casos/generador-de-mapas/` con **datos ficticios** y el motor del
repositorio [app-generador-mapas](https://github.com/JulioUQ/app-generador-mapas).
No usa capas de referencia ni datos reales.

| Archivo | Qué es |
|---|---|
| `generar_datos.py` | Crea `datos/capturas_ficticias.csv` (150 filas, 3 sin coordenadas) y `datos/zonas_ficticias.geojson` (2 zonas). Semilla fija. |
| `mapa.config.json` | Configuración del mapa: colores por especie, etiquetas, fichas, filtros y capa de zonas. |
| `salida/mapa-ejemplo.html` | Resultado (se regenera; no se versiona). |

## Pasos

Requiere Python 3.10+ con `pandas`, `geopandas`, `folium` y `numpy`, y una copia local del repositorio del generador.

```powershell
python generar_datos.py
python "<ruta al repositorio>\mapas\motor.py" --config mapa.config.json --no-abrir
```

Ejecuta ambos comandos desde esta carpeta. El motor descarta las 3 filas sin coordenadas y dibuja 147 puntos.

La figura del caso (`src/assets/figures/generador-mapas-ejemplo.png`) es una captura a 1400 × 860 del HTML generado.
El mapa base (Esri World Ocean Base) y las librerías se cargan desde internet al abrir el HTML.
