# 🍵🪵 Té y Palitos Santiago

**Piloto de ciencia ciudadana: descomposición de materia orgánica en suelos urbanos de Santiago de Chile**
21 de diciembre de 2026 → 21 de marzo de 2027 · un retiro por mes · estudiantes con curso de Ciencia del Suelo que viven en el Gran Santiago

Este piloto adapta el diseño de [Kotze & Setälä (2021, *Urban Ecosystems*)](https://doi.org/10.1007/s11252-021-01125-3), que comparó la descomposición de material **lábil** (té verde en bolsas piramidales) y **recalcitrante** (palitos de madera) en hábitats urbanos de Helsinki. Este piloto usa los mismos dos materiales. En Santiago se agrega una variable clave para un clima mediterráneo: el **riego**.

| | |
|---|---|
| **Materiales** | 2 bolsas piramidales de té verde y 2 palitos de madera por estación |
| **Diseño** | 3 estaciones por sitio, enterradas a 8 cm el 21 de diciembre; se retira **una por mes** (21 ene, 21 feb y 21 mar → 31, 62 y 90 días) |
| **Datos de terreno** | Fotos, pH con tiras (1:2,5), temperatura del suelo opcional (termómetro metálico a 8 cm o infrarrojo en superficie), textura al tacto (clave de Thien), humedad al tacto, hábitat, riego y GPS |
| **Temperatura** | Zona de calor de cada sitio según los mapas de [SantiagoHOT](https://www.santiagohot.cl) (fresca, intermedia o caliente), más días de ola de calor (DMC) |
| **Laboratorio** | Secado a 60 °C, pesaje, % de pérdida de masa y *k* exponencial |

📄 **Protocolo completo:** [`protocolo/PROTOCOLO.md`](protocolo/PROTOCOLO.md)

## Estructura

```
docs/            Sitio web (GitHub Pages): inicio, tutoriales en español, formulario de registro
  config.js      ← URL del backend, fechas y contacto
apps-script/     Backend gratuito: Google Apps Script → Google Sheets + Drive
protocolo/       Protocolo detallado del piloto
datos/           Plantilla de pesos iniciales (los datos personales NO se suben aquí)
analisis/        Script R: pérdida de masa, k y exportación de datos públicos
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

## Agradecimientos

Este piloto es financiado por ANID, **Fondecyt Iniciación en Investigación 2026, código 11260726** (investigadora responsable: Sara Acevedo), y cuenta con el apoyo de **CEDEUS**, Centro de Desarrollo Urbano Sustentable (**CIN25009**).

Gracias a **Dylan Craven** por sus comentarios al diseño del piloto.

Agradecemos de antemano a todas y todos los participantes: sin su tiempo, sus jardines y sus visitas bajo el sol de verano, este proyecto no sería posible. 🍵🪵

Gracias a [Soil BON](https://geobon.org/bons/thematic-bon/soil-bon/) (Soil Biodiversity Observation Network) por la inspiración.

## Referencias

- Kotze, D. J., & Setälä, H. (2021). Urbanisation differently affects decomposition rates of recalcitrant woody material and labile leaf litter. *Urban Ecosystems*. https://doi.org/10.1007/s11252-021-01125-3
- Thien, S. J. (1979). A flow diagram for teaching texture-by-feel analysis. *Journal of Agronomic Education*, 8, 54–55.
