"""
Serie anual de la flota pesquera española para la visualización del portfolio.

Entrada: data/data_clean_v2.csv del repositorio
  https://github.com/JulioUQ/ml-flota-pesquera
  (registro de buques obtenido por web scraping en la PR1 y limpiado en la PR2).

Transformación:
  Para cada año Y entre 1989 y 2024, un buque cuenta como «en el registro a 31 de diciembre de Y» si
    * su fecha de alta en el Registro General de la Flota Pesquera (fc_alta_rgfp) es <= 31/12/Y, y
    * no tenía una baja (definitiva o provisional) con fecha (fc_estado) <= 31/12/Y.
  Se agregan por «Tipo de Arte» (agrupación de la PR2 sobre el censo por modalidad) y por comunidad
  autónoma del puerto base:
    n   = número de buques
    kw  = potencia total (kW)
    gt  = arqueo total (GT)
  Potencia y arqueo usan los valores ya imputados en la PR2 (los ceros e incoherencias se imputaron allí).

Limitaciones que se muestran en la web:
  * El censo por modalidad y el puerto base son los últimos registrados para cada buque (foto de 2025),
    no su historial: un buque que cambió de modalidad aparece siempre en la última.
  * 1989 es el primer año completo: el registro se cargó en 1989 con los buques que ya existían.

Uso:
  python scripts/flota/generar_serie.py <ruta a data_clean_v2.csv> src/data/flota-serie.json
"""
import json
import sys
from pathlib import Path

import pandas as pd

SRC, OUT = Path(sys.argv[1]), Path(sys.argv[2])
YEARS = list(range(1989, 2025))

df = pd.read_csv(SRC, encoding="utf-8")
df["alta"] = pd.to_datetime(df["fc_alta_rgfp"])
df["estado_fecha"] = pd.to_datetime(df["fc_estado"])
df["baja"] = df["estado_rgfp"].str.startswith("Baja")
gear_col, ca_col = "Tipo de Arte", "Comunidad Autónoma"

series: dict[str, dict[str, list]] = {}
for (gear, ca), g in df.groupby([gear_col, ca_col]):
    n, kw, gt = [], [], []
    for y in YEARS:
        cut = pd.Timestamp(f"{y}-12-31")
        active = (g["alta"] <= cut) & ~(g["baja"] & (g["estado_fecha"] <= cut))
        sub = g[active]
        n.append(int(len(sub)))
        kw.append(round(float(sub["potencia_kw"].sum())))
        gt.append(round(float(sub["arqueo_gt"].sum())))
    series[f"{gear}|{ca}"] = {"n": n, "kw": kw, "gt": gt}

out = {
    "source": "data/data_clean_v2.csv · JulioUQ/ml-flota-pesquera",
    "rows": int(len(df)),
    "years": YEARS,
    "gears": sorted(df[gear_col].dropna().unique().tolist()),
    "regions": sorted(df[ca_col].dropna().unique().tolist()),
    "series": series,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

tot = {k: [sum(s[k][i] for s in series.values()) for i in range(len(YEARS))] for k in ("n", "kw", "gt")}
print(f"{len(df)} buques · {len(series)} combinaciones · {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
for i in (0, 11, 21, 35):
    print(YEARS[i], tot["n"][i], "buques", tot["kw"][i], "kW", tot["gt"][i], "GT")
