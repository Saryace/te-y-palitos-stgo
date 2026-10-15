# 🍵🪵 Té y Palitos Santiago

**Piloto de ciencia ciudadana: descomposición de materia orgánica en suelos urbanos de Santiago de Chile**
21 de diciembre de 2026 → 21 de marzo de 2027 · un retiro por mes · estudiantes con curso de Ciencia del Suelo que viven en el Gran Santiago

Este piloto adapta el diseño de [Kotze & Setälä (2021, *Urban Ecosystems*)](https://doi.org/10.1007/s11252-021-01125-3), que comparó la descomposición de material **lábil** (té verde en bolsas piramidales) y **recalcitrante** (palitos de madera) en hábitats urbanos de Helsinki. En Santiago se agrega una variable clave para un clima mediterráneo: el **riego**.

| | |
|---|---|
| **Materiales** | Té verde + rooibos (Tea Bag Index) y 2 palitos de madera por estación |
| **Diseño** | 3 estaciones por sitio, enterradas a 8 cm el 21 de diciembre; se retira **una por mes** (21 ene, 21 feb y 21 mar → 31, 62 y 90 días) |
| **Datos de terreno** | Fotos, pH con tiras (1:2,5), textura al tacto (clave de Thien), humedad al tacto, hábitat, riego y GPS |
| **Laboratorio** | Secado a 60 °C, pesaje, % de pérdida de masa, *k* exponencial y TBI (k, S) |

📄 **Protocolo completo:** [`protocolo/PROTOCOLO.md`](protocolo/PROTOCOLO.md)

## Estructura

```
docs/            Sitio web (GitHub Pages): inicio, tutoriales en español, formulario de registro
  config.js      ← URL del backend, fechas y contacto
apps-script/     Backend gratuito: Google Apps Script → Google Sheets + Drive
protocolo/       Protocolo detallado del piloto
datos/           Plantilla de pesos iniciales (los datos personales NO se suben aquí)
analisis/        Script R: pérdida de masa, k, TBI y exportación de datos públicos
```

## Puesta en marcha

1. **Backend:** seguir [`apps-script/README.md`](apps-script/README.md) y pegar la URL `/exec` en `docs/config.js`.
2. **Web:** en GitHub, *Settings → Pages → Deploy from a branch → `main` / `docs`*. El sitio queda en `https://USUARIO.github.io/te-y-palitos-stgo/`.
3. Editar `REPO` y `CONTACTO` en `docs/config.js`.
4. Probar localmente:
   ```bash
   python3 -m http.server 8000 -d docs
   ```
   y abrir http://localhost:8000. Sin `ENDPOINT`, los registros quedan en el navegador y se pueden descargar como JSON.

## Formulario de registro

- Funciona en el celular: GPS con un botón, fotos con la cámara (se comprimen antes de enviar).
- Recuerda el código de participante y de sitio para las visitas siguientes.
- Muestra los campos según la visita: estado del material solo en los retiros, y textura obligatoria en la instalación y en R3.
- **Sin señal:** guarda el registro en el celular y permite reintentar el envío o descargar un respaldo.

## Privacidad

Las coordenadas exactas, los correos y las fotos quedan en la planilla y el Drive privados de la coordinación. El repositorio solo publica datos agregados o redondeados (≈100 m), que se generan con `analisis/analisis_piloto.R`. **No subas `datos/registros.csv` ni fotos al repositorio** (ya está en `.gitignore`).

## Referencias

- Kotze, D. J., & Setälä, H. (2021). Urbanisation differently affects decomposition rates of recalcitrant woody material and labile leaf litter. *Urban Ecosystems*. https://doi.org/10.1007/s11252-021-01125-3
- Keuskamp, J. A. et al. (2013). Tea Bag Index: a novel approach to collect uniform decomposition data across ecosystems. *Methods in Ecology and Evolution*, 4, 1070–1075.
- Thien, S. J. (1979). A flow diagram for teaching texture-by-feel analysis. *Journal of Agronomic Education*, 8, 54–55.
