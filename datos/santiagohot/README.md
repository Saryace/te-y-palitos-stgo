# datos/santiagohot: superficies de temperatura del aire, Gran Santiago

Rasters de temperatura del aire modelada de la campaña **SantiagoHOT** (CIGIDEN, programa Heat Watch de NOAA), medida por voluntarios el **20 de enero de 2024**. Son copias de los archivos originales. Fuente y datos abiertos: https://www.santiagohot.cl · [OSF](https://osf.io/wx3r2/overview?view_only=2d8935fd8d354c28982e81f9452f41df).

| Archivo | Período | Rango (°C) |
|---|---|---|
| `santiago-chile_am_temp_c.tif` | Mañana (7–8 h) | 13,7 – 22,7 |
| `santiago-chile_af_temp_c.tif` | Tarde | 28,8 – 34,1 |
| `santiago-chile_pm_temp_c.tif` | Atardecer (19–20 h) | 26,5 – 31,7 |

- Resolución de **10 m**, CRS **EPSG:32719** (WGS 84 / UTM 19S). Cada archivo tiene una banda (`temp_c`) en °C y la misma extensión: x 320370–368310, y 6271690–6321850.
- `ReadMe_FileNotation.txt` es la nota original de nombres de archivo de los autores.
- `cortes_cuartiles.csv` tiene los cuartiles de temperatura **de toda la ciudad**, calculados sobre todos los píxeles de cada raster y por separado para cada período.

## Uso en Té y Palitos

`analisis/analisis_piloto.R` extrae, en las coordenadas de cada sitio, la temperatura de mañana, tarde y atardecer. Luego asigna la **zona de calor** según el cuartil de la tarde para toda la ciudad:

| Zona | Cuartil (tarde) | °C |
|---|---|---|
| `Q1 fresca` | 1 | ≤ 31,2 |
| `Q2` | 2 | 31,2 – 31,6 |
| `Q3` | 3 | 31,6 – 32,0 |
| `Q4 caliente` | 4 | > 32,0 |

La coordinación usa los mismos cortes al inscribir sitios, para repartirlos entre zonas.

Si se usan estos datos, citar a SantiagoHOT / CIGIDEN.
