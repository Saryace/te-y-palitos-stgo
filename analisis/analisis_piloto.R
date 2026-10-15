# Té Bajo Tierra Santiago — análisis del piloto
# Entradas:
#   datos/pesos_iniciales.csv  (coordinación, antes de instalar)
#   datos/pesos_finales.csv    (coordinación, tras secar a 60 °C 48 h; mismas columnas + mt_g)
#   datos/registros.csv        (exportado de la planilla de Google, hoja "registros")
# Salidas:
#   datos/publicos/registros_publicos.csv (sin correo, coordenadas a 3 decimales)
#   datos/publicos/descomposicion.csv     (pérdida de masa y k por sitio)

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
  summarise(f_manip = mean(mt_g / m0_g)) |>
  pull(f_manip)
if (length(corr) == 0 || is.na(corr)) corr <- 1

masa <- m0 |>
  filter(sitio != "CONTROL") |>
  inner_join(select(mt, codigo, mt_g), by = "codigo") |>
  mutate(
    m0_corr = m0_g * corr,
    perdida_pct = 100 * (m0_corr - mt_g) / m0_corr,
    t_dias = dias[retiro],
    ln_rest = log(mt_g / m0_corr)
  )

# k (día^-1) de un modelo exponencial simple ajustado por el origen: ln(Mt/M0) = -k t
k_sitio <- masa |>
  group_by(sitio) |>
  summarise(
    n = n(),
    perdida_90d = mean(perdida_pct[retiro == "R3"]),
    k = if (n() >= 2) -coef(lm(ln_rest ~ 0 + t_dias))[[1]] else NA_real_,
    .groups = "drop"
  )

# Covariables de sitio: hábitat (instalación), riego modal, pH medio y textura
cov <- reg |>
  group_by(sitio) |>
  summarise(
    habitat = first(habitat),
    comuna = first(comuna),
    riego = names(which.max(table(riego))),
    ph_medio = mean(ph, na.rm = TRUE),
    textura = first(na.omit(textura)),
    .groups = "drop"
  )

desc <- left_join(k_sitio, cov, by = "sitio")

# Modelo exploratorio (con pocos sitios, interpretarlo con cautela)
if (requireNamespace("lme4", quietly = TRUE) && n_distinct(masa$sitio) > 5) {
  datos_mod <- left_join(masa, cov, by = "sitio")
  print(summary(lme4::lmer(perdida_pct ~ habitat + riego + ph_medio + t_dias + (1 | sitio),
                           data = datos_mod)))
}

dir.create("datos/publicos", showWarnings = FALSE, recursive = TRUE)
reg |>
  select(-any_of(c("email", "enviado_desde", "fotos_sitio", "fotos_ph", "fotos_material"))) |>
  mutate(lat = round(lat, 3), lon = round(lon, 3)) |>
  write_csv("datos/publicos/registros_publicos.csv")
write_csv(desc, "datos/publicos/descomposicion.csv")
