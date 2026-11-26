# Portfolio · Julio Úbeda Quesada (prototipo local)

Sitio estático en Astro, en español e inglés, con una API aparte para el chat. Sin despliegue: todo se ejecuta en local y las páginas llevan `noindex`.

## Uso

```powershell
npm install
npm --prefix api install
npm run build
npm run preview -- --port 4321
```

Vista local: http://localhost:4321/es/ (inglés: http://localhost:4321/en/). Para editar con recarga en caliente: `npm run dev`.

### Chat

La web llama a la API en `PUBLIC_CHAT_API_URL` (por defecto `http://localhost:8787`, ver `.env.example`). La API lee el contenido publicado que genera el build (`dist/knowledge/es.json` y `en.json`), así que hay que construir la web antes de arrancarla.

```powershell
Copy-Item api\.env.example api\.env   # y rellena CHAT_PROVIDER, CHAT_MODEL y ANTHROPIC_API_KEY
npm run api
```

- `CHAT_PROVIDER=anthropic` + `ANTHROPIC_API_KEY`: respuestas reales con el modelo de `CHAT_MODEL` (por defecto `claude-opus-5-5`, esfuerzo `CHAT_EFFORT=low`).
- `CHAT_PROVIDER=test`: sin modelo; devuelve los fragmentos recuperados. Sirve para probar la interfaz, los enlaces a fuentes y las repreguntas.
- Sin `CHAT_PROVIDER` (o sin clave): `/api/health` responde `unconfigured` y el chat lo indica.

#### Activar el modelo real y validar

1. Fija la clave solo en el entorno del servidor, nunca en el código ni en la web. En `api\.env` (Git lo ignora):
   `CHAT_PROVIDER=anthropic`, `CHAT_MODEL=claude-opus-5-5` y `ANTHROPIC_API_KEY=<tu clave>`. También vale definir esas variables en la sesión de PowerShell antes de arrancar (`$env:ANTHROPIC_API_KEY = ...`).
2. Arranca la API con `npm run api`. Al iniciar, consulta la API de modelos de Anthropic y escribe en consola si el modelo está disponible para esa cuenta. `http://127.0.0.1:8787/api/health` lo devuelve en `modelCheck`: `{ ok: true, model, displayName }` o un motivo (`auth_error`, `model_not_found`, `unreachable`). Si la comprobación falla, el chat queda como «no configurado».
3. Con la API en marcha, `npm --prefix api run validate` envía la conversación de validación (pregunta, repregunta y pregunta sin respuesta en la web, y una pregunta en inglés) y muestra respuestas y fuentes. Después, repite las preguntas desde el chat de la web.

Límites (configurables en `api/.env`): 500 caracteres por pregunta, 8 mensajes de historial, 16 KB por petición, 6 peticiones por minuto y 60 al día por IP. La API no guarda conversaciones ni registra preguntas o respuestas; solo anota método, ruta, estado y duración. CORS limitado a `ALLOWED_ORIGINS`.

### Comprobaciones

```powershell
npm run check          # astro check + tsc de la API
npm --prefix api test  # recuperación, formato de fuentes y límite de frecuencia
```

## Estructura

| Ruta | Contenido |
|---|---|
| `src/content/site.ts` | Portada: hero, resumen de trayectoria, publicaciones, contacto (ES/EN) |
| `src/content/projects.ts` | Catálogo de proyectos: áreas, textos de tarjeta y ventana, herramientas y enlaces |
| `src/content/cases/*.ts` | Un caso por archivo (ES/EN); `cases/index.ts` los registra por clave de ruta |
| `src/content/background.ts` | Hitos de la cronología, etapas y formación |
| `src/content/fleet-chart.ts`, `chat.ts`, `explorer.ts`, `map-demo.ts` | Textos de la interfaz de cada módulo |
| `src/data/flota-serie.json` | Serie anual de la flota (generada con `scripts/flota/generar_serie.py`) |
| `src/lib/fleet.ts` | Cálculo y dibujo del gráfico de la flota (servidor y navegador) |
| `src/lib/knowledge.ts` | Base de conocimiento del chat a partir de los mismos módulos de contenido |
| `src/components/` | ProjectExplorer, FleetChart, Timeline, ChatWidget, CasePage, FlowDiagram… sin texto propio |
| `src/pages/` | Páginas por idioma y `knowledge/[lang].json.ts` |
| `api/` | API del chat (Node 22.18+ / 24, SDK oficial `@anthropic-ai/sdk`) |
| `public/demos/mapa-ejemplo.html` | Demo del generador de mapas (copiada con `npm run demo:map`) |
| `ejemplos/generador-mapas/` | Ejemplo reproducible con datos ficticios |
| `capturas/` | Capturas de revisión |

Para añadir un proyecto: entrada en `projects.ts`, caso en `src/content/cases/` registrado en `cases/index.ts`, clave en `src/i18n/routes.ts` y una página por idioma en `src/pages/`.

## Datos y reproducibilidad

- **Serie de la flota:** `python scripts/flota/generar_serie.py <ruta>/data_clean_v2.csv src/data/flota-serie.json`, con el CSV del repositorio Data-Science-Pescas-Limpieza-y-Modelado. Un buque cuenta en un año si su alta es anterior al 31 de diciembre y no tenía baja anterior; modalidad y comunidad son las últimas registradas.
- **Demo del mapa:** se genera en `ejemplos/generador-mapas/` y se copia con `npm run demo:map`, que solo añade la etiqueta `noindex`.

## Fuentes y atribuciones

- Fletán negro: Úbeda, J. *et al.* (2023), *Fisheries Management and Ecology*, https://doi.org/10.1111/fme.12639. Figura 2 reproducida bajo CC BY 4.0.
- Flota y web scraping: trabajos académicos de Julio Úbeda Quesada y Lucas Zamora Vera (UOC). Datos públicos del Ministerio de Agricultura, Pesca y Alimentación y de la Comisión Europea; dataset en https://doi.org/10.5281/zenodo.15132458.
- Mapa de ejemplo: datos inventados; mapa base Esri World Ocean Base (GEBCO, NOAA, Esri, DeLorme, NAVTEQ y otros).
- Diagramas de la matriz Z y del flujo de la plataforma, e ilustraciones de las tarjetas: propios.

## Reglas editoriales

- No se afirma el cargo exacto ni el alcance de coordinación; el máster de la UOC figura sin fechas ni estado.
- Sin teléfono, sin correo y sin materiales internos. El CV original es referencia privada y no está en este proyecto.
- El trabajo colectivo se separa de la contribución individual. La demo pública de la plataforma muestra agregados reales: la web describe qué muestra sin reproducir cifras.
