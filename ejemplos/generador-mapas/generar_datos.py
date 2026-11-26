"""
Datos FICTICIOS para el ejemplo del generador de mapas interactivos.

Genera, con una semilla fija (siempre el mismo resultado):
  * datos/capturas_ficticias.csv  -> 150 lances inventados (3 sin coordenadas, a propósito)
  * datos/zonas_ficticias.geojson -> dos zonas inventadas (una veda temporal y una reserva)

Nada de esto procede de datos reales: barcos, capturas y zonas son inventados.
"""
from pathlib import Path

import geopandas as gpd
import numpy as np
import pandas as pd
from shapely.geometry import Polygon

SEED = 20251125
N = 150
OUT = Path(__file__).parent / "datos"

rng = np.random.default_rng(SEED)

# Dos caladeros inventados en mar abierto: sur de Mallorca y frente a Cartagena.
grounds = {
    "Palma": {"lat": 39.17, "lon": 2.45, "sd": (0.08, 0.13), "max_lat": 39.34, "max_lon": 2.72,
              "barcos": ["Nuevo Marina", "Punta Roja", "Es Freu"]},
    "Cartagena": {"lat": 37.40, "lon": -0.92, "sd": (0.08, 0.17), "max_lat": 37.50, "max_lon": -0.62,
                  "barcos": ["Virgen del Faro", "Cabo Tiñoso", "Azul de Escombreras"]},
}
especies = ["Salmonete", "Gamba roja", "Merluza", "Calamar", "Pulpo"]
p_especie = [0.24, 0.23, 0.21, 0.17, 0.15]
artes = {"Salmonete": "Arrastre", "Gamba roja": "Arrastre", "Merluza": "Palangre",
         "Calamar": "Poteras", "Pulpo": "Nasas"}
kg_medio = {"Salmonete": 45, "Gamba roja": 18, "Merluza": 60, "Calamar": 25, "Pulpo": 30}

rows = []
fechas = pd.date_range("2025-01-07", "2025-06-27", freq="D")
for i in range(N):
    puerto = "Palma" if rng.random() < 0.55 else "Cartagena"
    g = grounds[puerto]
    lat = min(rng.normal(g["lat"], g["sd"][0]), g["max_lat"])
    lon = min(rng.normal(g["lon"], g["sd"][1]), g["max_lon"])
    esp = rng.choice(especies, p=p_especie)
    rows.append({
        "Fecha": fechas[rng.integers(len(fechas))].strftime("%Y-%m-%d"),
        "Barco": rng.choice(g["barcos"]),
        "Puerto": puerto,
        "Especie": esp,
        "Arte": artes[esp],
        "Captura_kg": round(float(rng.gamma(4, kg_medio[esp] / 4)), 1),
        "Latitud": round(float(lat), 4),
        "Longitud": round(float(lon), 4),
    })

df = pd.DataFrame(rows).sort_values("Fecha").reset_index(drop=True)
# Tres filas sin coordenadas: la aplicación las descarta y lo indica en el resumen.
df.loc[[10, 70, 130], ["Latitud", "Longitud"]] = np.nan

zonas = gpd.GeoDataFrame(
    {
        "nombre": ["Veda temporal (ficticia)", "Reserva marina (ficticia)"],
        "tipo": ["Veda temporal", "Reserva marina"],
        "sup_km2": [0.0, 0.0],
    },
    geometry=[
        Polygon([(2.30, 39.06), (2.60, 39.06), (2.60, 39.22), (2.30, 39.22)]),
        Polygon([(-1.10, 37.40), (-0.85, 37.40), (-0.80, 37.50), (-1.05, 37.52)]),
    ],
    crs="EPSG:4326",
)
# Superficie aproximada en una proyección métrica (UTM 31N).
zonas["sup_km2"] = (zonas.to_crs("EPSG:25831").area / 1e6).round(1)

OUT.mkdir(exist_ok=True)
df.to_csv(OUT / "capturas_ficticias.csv", index=False, encoding="utf-8")
zonas.to_file(OUT / "zonas_ficticias.geojson", driver="GeoJSON")
print(f"{len(df)} filas -> {OUT / 'capturas_ficticias.csv'}")
print(df["Especie"].value_counts().to_string())
print(f"{len(zonas)} zonas -> {OUT / 'zonas_ficticias.geojson'}")
