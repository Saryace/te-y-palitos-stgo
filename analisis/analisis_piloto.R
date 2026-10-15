# Té y Palitos Santiago — análisis del piloto
# Entradas:
#   datos/pesos_iniciales.csv  (coordinación, antes de instalar)
#   datos/pesos_finales.csv    (coordinación, tras secar a 60 °C 48 h; mismas columnas + mt_g)
#   datos/registros.csv        (exportado de la planilla de Google, hoja "registros")
#   datos/dmc_diario.csv       (opcional: estacion, fecha, tmax, umbral_p90; datos diarios de la DMC)
#   datos/sitio_estacion.csv   (opcional: sitio, estacion; estación DMC más cercana a cada sitio)
#   datos/santiagohot_tarde.tif (opcional: mapa de temperatura de la tarde de SantiagoHOT, desde OSF)
# Salidas:
#   datos/publicos/registros_publicos.csv (sin correo, coordenadas a 3 decimales)
#   datos/publicos/descomposicion.csv     (pérdida de masa y k por sitio × material)

library(dplyr)
library(readr)
library(tidyr)

dias <- c(R1 = 31, R2 = 62, R3 = 90)

m0  <- read_csv("datos/pesos_iniciales.csv", show_col_types = FALSE)
mt  <- read_csv("datos/pesos_finales.csv", show_col_types = FALSE)
reg <- read_csv("datos/registros.csv", show_col_types = FALSE)

# Corrección por manipulación: fracción perdida por los controles (enterrar y desenterrar de inmediato)
corr <- m0 |>
  filter(sitio == "CONTROL") |>
  inner_join(select(mt, codigo, mt_g), by = "codigo") |>
  group_by(material) |>
  summarise(f_manip = mean(mt_g / m0_g), .groups = "drop")

# Fechas reales de cada visita (las visitas pueden moverse ±3 días por calor)
fechas <- reg |>
  mutate(fecha = as.Date(substr(as.character(fecha), 1, 10))) |>
  group_by(sitio, visita) |>
  summarise(fecha = min(fecha), .groups = "drop") |>
  pivot_wider(names_from = visita, values_from = fecha) |>
  pivot_longer(any_of(c("R1", "R2", "R3")), names_to = "retiro", values_to = "f_retiro") |>
  rename(f_inst = any_of("T0"))

masa <- m0 |>
  filter(sitio != "CONTROL") |>
  inner_join(select(mt, codigo, mt_g), by = "codigo") |>
  left_join(fechas, by = c("sitio", "retiro")) |>
  left_join(corr, by = "material") |>
  mutate(
    m0_corr = m0_g * coalesce(f_manip, 1),
    perdida_pct = 100 * (m0_corr - mt_g) / m0_corr,
    t_dias = coalesce(as.numeric(f_retiro - f_inst), unname(dias[retiro])),
    ln_rest = log(mt_g / m0_corr)
  )

# Días de ola de calor durante cada incubación (DMC: >= 3 días seguidos con tmax > p90)
if (file.exists("datos/dmc_diario.csv") && file.exists("datos/sitio_estacion.csv")) {
  olas <- read_csv("datos/dmc_diario.csv", show_col_types = FALSE) |>
    mutate(fecha = as.Date(fecha)) |>
    arrange(estacion, fecha) |>
    group_by(estacion) |>
    mutate(
      caliente = tmax > umbral_p90,
      racha = cumsum(!caliente | c(TRUE, diff(fecha) != 1))
    ) |>
    group_by(estacion, racha) |>
    mutate(dia_ola = caliente & sum(caliente) >= 3) |>
    ungroup() |>
    select(estacion, fecha, dia_ola)
  est <- read_csv("datos/sitio_estacion.csv", show_col_types = FALSE)
  dias_ola <- masa |>
    distinct(sitio, retiro, f_inst, f_retiro) |>
    left_join(est, by = "sitio") |>
    left_join(olas, by = "estacion", relationship = "many-to-many") |>
    filter(fecha >= f_inst, fecha < f_retiro) |>
    group_by(sitio, retiro) |>
    summarise(dias_ola = sum(dia_ola), .groups = "drop")
  masa <- masa |>
    left_join(dias_ola, by = c("sitio", "retiro")) |>
    mutate(dias_ola = coalesce(dias_ola, 0L))
} else {
  masa$dias_ola <- NA_integer_
}

# k (día^-1) de un modelo exponencial simple ajustado por el origen: ln(Mt/M0) = -k t
k_sitio <- masa |>
  group_by(sitio, material) |>
  summarise(
    n = n(),
    perdida_90d = mean(perdida_pct[retiro == "R3"]),
    dias_ola_90d = max(dias_ola),
    k = if (n() >= 2) -coef(lm(ln_rest ~ 0 + t_dias))[[1]] else NA_real_,
    .groups = "drop"
  )

for (col in c("temp_suelo", "metodo_temp")) if (!col %in% names(reg)) reg[[col]] <- NA
# Covariables de sitio: hábitat (instalación), riego modal, pH medio y textura
cov <- reg |>
  group_by(sitio) |>
  summarise(
    habitat = first(habitat),
    comuna = first(comuna),
    riego = names(which.max(table(riego))),
    ph_medio = mean(ph, na.rm = TRUE),
    # Temperatura opcional: metálico (8 cm) e infrarrojo (superficie) miden cosas distintas
    temp_8cm_media = mean(temp_suelo[metodo_temp %in% "metalico 8 cm"], na.rm = TRUE),
    temp_sup_media = mean(temp_suelo[metodo_temp %in% "infrarrojo superficie"], na.rm = TRUE),
    sombra = first(sombra),
    textura = first(na.omit(textura)),
    .groups = "drop"
  )

# Zona de calor SantiagoHOT: temperatura del mapa de la tarde en la ubicación de cada sitio
coords <- reg |>
  group_by(sitio) |>
  summarise(lat = median(lat, na.rm = TRUE), lon = median(lon, na.rm = TRUE), .groups = "drop")
if (file.exists("datos/santiagohot_tarde.tif") && requireNamespace("terra", quietly = TRUE)) {
  r <- terra::rast("datos/santiagohot_tarde.tif")
  pts <- terra::project(terra::vect(coords, geom = c("lon", "lat"), crs = "EPSG:4326"), terra::crs(r))
  coords$temp_stgohot <- terra::extract(r, pts)[[2]]
  cortes <- quantile(coords$temp_stgohot, c(0, 1/3, 2/3, 1), na.rm = TRUE)
  coords$zona_calor <- if (n_distinct(cortes) == 4) {
    as.character(cut(coords$temp_stgohot, cortes, labels = c("fresca", "intermedia", "caliente"), include.lowest = TRUE))
  } else NA_character_
} else {
  coords$temp_stgohot <- NA_real_
  coords$zona_calor <- NA_character_
}
cov <- left_join(cov, select(coords, sitio, temp_stgohot, zona_calor), by = "sitio")

desc <- left_join(k_sitio, cov, by = "sitio")

# Modelo exploratorio (con pocos sitios, interpretarlo con cautela)
if (requireNamespace("lme4", quietly = TRUE) && n_distinct(masa$sitio) > 5) {
  datos_mod <- left_join(masa, cov, by = "sitio")
  # Solo términos con variación (en un piloto chico algún factor puede tener un solo nivel)
  varia <- function(v) n_distinct(na.omit(datos_mod[[v]])) > 1
  terminos <- c("t_dias", Filter(varia, c("material", "habitat", "sombra", "riego", "ph_medio", "temp_stgohot")))
  if ("material" %in% terminos && "habitat" %in% terminos) terminos <- c(terminos, "material:habitat")
  # H5: ¿las olas de calor frenan la descomposición, sobre todo sin riego?
  if (varia("dias_ola")) {
    terminos <- c(terminos, "dias_ola")
    if ("riego" %in% terminos) terminos <- c(terminos, "riego:dias_ola")
  }
  formula <- reformulate(c(terminos, "(1 | sitio)"), response = "perdida_pct")
  print(summary(lme4::lmer(formula, data = datos_mod)))
}

dir.create("datos/publicos", showWarnings = FALSE, recursive = TRUE)
reg |>
  select(-any_of(c("email", "enviado_desde", "fotos_sitio", "fotos_ph", "fotos_material", "fotos_cielo", "descripcion"))) |>
  mutate(lat = round(lat, 3), lon = round(lon, 3)) |>
  write_csv("datos/publicos/registros_publicos.csv")
write_csv(desc, "datos/publicos/descomposicion.csv")
