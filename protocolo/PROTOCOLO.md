# Protocolo piloto — Té y Palitos Santiago

**Ciencia ciudadana sobre descomposición de materia orgánica en suelos urbanos de Santiago**
Piloto de verano: **21 de diciembre de 2026 → 21 de marzo de 2027** (solsticio a equinoccio, 90 días)

---

## 1. Fundamento

Este piloto adapta el diseño de:

> Kotze, D. J. & Setälä, H. (2021). *Urbanisation differently affects decomposition rates of recalcitrant woody material and labile leaf litter.* Urban Ecosystems. https://doi.org/10.1007/s11252-021-01125-3

En Helsinki (Finlandia), los autores enterraron dos materiales estandarizados en hábitats urbanos con distinto nivel de manejo y perturbación:

| Material | Tipo | Resultado en Helsinki |
|---|---|---|
| Palitos de madera (4 años) | **Recalcitrante** | Se descomponen **más lento** en la ciudad (≈60–75 % de pérdida de masa) que en bosques semi-naturales (84 %) |
| Té verde en bolsas piramidales (3 años) | **Lábil** | Se descompone **más rápido** en hábitats abiertos (céspedes de parques, sitios ruderales ≈70 %) que en hábitats con bosque (≈60 %) |

Los autores lo atribuyen a una comunidad pobre de hongos saprófitos en la ciudad (madera) y a condiciones que favorecen a las bacterias en los espacios abiertos (té).

**¿Por qué Santiago?** Santiago tiene clima mediterráneo semiárido: el verano es seco y caluroso, y en muchos suelos urbanos el agua disponible depende del **riego**. Esto hace posible probar algo que en Helsinki no se podía observar: el efecto del riego urbano sobre la descomposición.

### Preguntas del piloto

1. ¿La velocidad de descomposición del material lábil (té) y del recalcitrante (madera) cambia entre hábitats urbanos de Santiago en verano?
2. ¿El riego explica más diferencias que el tipo de hábitat?
3. ¿El pH y la textura del suelo, medidos por estudiantes en terreno, se relacionan con la pérdida de masa?
4. **(Objetivo del piloto)** ¿Es posible hacer el protocolo con estudiantes como voluntarios? Se evalúa la tasa de recuperación de los materiales, la calidad de los datos y la adherencia al calendario.

### Hipótesis

- **H1:** El té se descompone más rápido en sitios **regados** (céspedes, jardines) que en sitios sin riego (sitios eriazos, platabandas secas), porque en el verano de Santiago la humedad limita la descomposición.
- **H2:** La madera pierde poca masa en 90 días en todos los hábitats. El piloto sirve sobre todo como línea base para una posible serie de varios años, como en el estudio original.
- **H3:** En los sitios sin riego, la diferencia entre té y madera será menor porque toda la actividad microbiana está limitada.

---

## 2. Participantes

- **Perfil:** estudiantes que **ya aprobaron un curso de Ciencia del Suelo / Edafología** y **viven en la Región Metropolitana (Gran Santiago)**.
- **Tamaño del piloto:** 15–25 estudiantes, cada uno a cargo de **1 sitio** (o 2 sitios con hábitats contrastantes, si es posible).
- **Compromiso:** 4 visitas al sitio (instalación + 3 retiros), aproximadamente 45 minutos por visita, y entrega del material retirado a la coordinación.
- **Inscripción:** formulario de la web. La coordinación asigna un **código de participante** (`P01`, `P02`…) y un **código de sitio** (`P01-A`, `P01-B`).

### Selección del sitio

- Debe estar a ≤ 15 minutos de la casa del estudiante, con acceso garantizado durante los 90 días.
- Se requiere **permiso** del dueño o administrador (jardín propio o familiar, condominio, colegio o junta de vecinos). Evitar lugares públicos muy concurridos (riesgo de vandalismo) y no intervenir áreas protegidas sin autorización.
- Debe tener suelo real, no una maceta, ni relleno de escombros a < 10 cm, ni sustrato comercial reciente.
- La coordinación intentará **equilibrar los hábitats** entre participantes:

| Código | Hábitat | Equivalente en Kotze & Setälä |
|---|---|---|
| `CES` | Césped regado (plaza, parque, jardín) | Park lawn |
| `ARB` | Bajo dosel de árboles (parque arbolado) | Remnant forest |
| `RUD` | Sitio eriazo / ruderal sin riego | Ruderal |
| `PLA` | Platabanda o bandejón | Ruderal / manejado |
| `JAR` | Jardín doméstico o huerto | — (nuevo) |
| `NAT` | Vegetación nativa remanente (cerro isla, piedemonte) | Semi-natural (referencia) |

---

## 3. Materiales

### Kit por sitio (lo prepara la coordinación)

| Ítem | Cantidad | Notas |
|---|---|---|
| Bolsas piramidales de **té verde** Lipton | 3 | Material lábil (igual que en el paper). Deben ser de malla sintética, no de papel |
| Bolsas piramidales de **rooibos** Lipton | 3 | Permite calcular el Tea Bag Index (k, S) a los 90 días (Keuskamp et al. 2013) |
| **Palitos de madera** (bajalenguas sin tratar, de una misma partida) | 6 | Material recalcitrante; 2 por retiro |
| Banderines o estacas plásticas numeradas | 3 | Una por estación de retiro: `R1`, `R2`, `R3` |
| Sobres de papel kraft rotulados | 3 | Para guardar el material retirado |
| Tiras de pH (rango 4–9 o 0–14, paso ≤ 0,5) | 8 | Igual marca para todos |
| Agua destilada (frasco 250 mL) | 1 | Para pH y textura |
| Frasco con tapa (vaso de muestra 50–100 mL) | 1 | Suspensión suelo:agua para pH |

**El estudiante aporta:** pala de jardín o trasplantador, regla, celular con cámara y GPS.

### Preparación previa (coordinación, antes del 15 de diciembre)

1. Rotular cada bolsa y cada palito con el código de sitio y retiro (p. ej. `P07-A-R2-V` = verde, `-R` = rooibos, `-M1`/`-M2` = madera). Usar marcador permanente en la etiqueta de la bolsa y una muesca o pirograbado en el palito.
2. Secar en estufa a 60 °C durante 48 h y pesar con balanza analítica (0,001 g). En las bolsas de té se pesa la bolsa completa con el cordel y la etiqueta, como en el TBI.
3. Registrar los **pesos iniciales** en `datos/pesos_iniciales.csv`.
4. Guardar **5 bolsas y 5 palitos extra** como controles de manipulación: se entierran y desentierran de inmediato para corregir la pérdida por manipulación.

---

## 4. Calendario

| Fecha | Actividad | Duración incubación |
|---|---|---|
| 1–12 dic 2026 | Convocatoria e inscripción | — |
| 14–18 dic 2026 | **Capacitación** (presencial o en línea, 1,5 h) y entrega de kits | — |
| **21 dic 2026** (±2 días) | **Instalación (T0)**: enterrar 3 estaciones; foto, pH, textura | 0 d |
| **21 ene 2027** (±2 días) | **Retiro 1 (R1)**; foto, pH, humedad | ≈31 d |
| **21 feb 2027** (±2 días) | **Retiro 2 (R2)**; foto, pH, humedad | ≈62 d |
| **21 mar 2027** (±2 días) | **Retiro 3 (R3)**; foto, pH, textura, humedad | ≈90 d (TBI estándar) |
| 22–31 mar 2027 | Entrega de sobres, secado y pesaje en laboratorio | — |
| abril 2027 | Análisis, retroalimentación a participantes, informe del piloto | — |

> Retirar **un set por mes** permite construir una curva de descomposición de 3 puntos por sitio. Con eso se puede estimar la constante *k* de un modelo exponencial simple, *Mt = M0·e^(−kt)*. El retiro de los 90 días coincide con el protocolo estándar del Tea Bag Index.

Se enviarán **recordatorios** por correo o WhatsApp 3 días antes de cada fecha.

---

## 5. Procedimientos en terreno

### 5.1 Instalación (21 de diciembre)

1. Elegir un punto representativo del sitio, lejos de caminos y de bordes de pavimento (> 1 m).
2. Marcar **3 estaciones** (`R1`, `R2`, `R3`) en línea, separadas por **30 cm**.
3. En cada estación, cavar un hoyo de **8 cm** de profundidad y de unos 15 cm de ancho, cortando el pasto con cuidado si lo hay.
4. Poner **1 té verde + 1 rooibos** a 8 cm, separados por ~5 cm, con la **etiqueta fuera del suelo** (como en el TBI). Poner **2 palitos** horizontales a la misma profundidad.
5. Tapar con el mismo suelo, apisonar suavemente y clavar el banderín de la estación.
6. **Foto del sitio**: una general a 2 m y una cenital de las estaciones con el banderín visible.
7. Hacer **pH** y **textura** con suelo del hoyo, a 0–10 cm (ver 5.3 y 5.4).
8. **Registrar en la web**: tipo de visita *Instalación*, GPS, hábitat, riego, pH, textura y fotos.

### 5.2 Retiros (21 ene, 21 feb y 21 mar)

1. Ubicar la estación que corresponde (`R1` en enero, `R2` en febrero y `R3` en marzo).
2. Desenterrar con cuidado usando los dedos, sin tirar de las bolsas.
3. Retirar los restos de suelo y raíces **sin lavar** y sin abrir la bolsa.
4. Poner todo (2 bolsas y 2 palitos) en el **sobre rotulado** y dejarlo secar al aire en un lugar sombreado. **No usar bolsas plásticas**, porque generan hongos.
5. **Fotos**: sitio, hoyo abierto y material recuperado sobre un papel blanco.
6. Hacer el **pH** con suelo de la estación retirada y evaluar la **humedad al tacto**.
7. En R3, repetir la **textura**.
8. **Registrar en la web**: tipo de visita *Retiro 1/2/3* y el estado del material (intacto, roto, con raíces o no encontrado).
9. Guardar el sobre hasta la entrega de fines de marzo, o entregarlo antes en el punto de acopio.

### 5.3 pH con tiras (relación 1:2,5)

1. Tomar suelo de 0–10 cm, quitar piedras y raíces, y desmenuzarlo.
2. Poner **10 g de suelo** (aproximadamente 2 cucharaditas rasas) en el frasco y agregar **25 mL de agua destilada**.
3. Tapar, agitar 1 minuto y dejar reposar **30 minutos** (agitar de nuevo a los 15 minutos).
4. Sumergir la tira **en el sobrenadante**, sin tocar el sedimento, durante el tiempo que indica el fabricante.
5. Leer contra la escala de colores **a la sombra** y anotar el valor más cercano (paso 0,5).
6. **Fotografiar la tira junto a la escala**. La coordinación revisa la lectura con la foto.

### 5.4 Textura al tacto

Usar la **clave de Thien (1979)**, disponible como asistente interactivo en la web (*Tutoriales*):
humedecer unos 25 g de suelo hasta que tenga consistencia de plasticina → probar si forma bola → probar si forma cinta → medir el largo de la cinta → evaluar si se siente arenosa, suave o ninguna de las dos.
Registrar la **clase textural**, el **largo de la cinta (cm)** y la sensación.

### 5.5 Humedad al tacto

| Clase | Criterio |
|---|---|
| Seco | Polvoriento, no forma agregados al apretar |
| Ligeramente húmedo | Se mantiene unido un poco, sin dejar humedad en la mano |
| Húmedo | Forma bola, deja la mano algo húmeda |
| Saturado | Escurre agua al apretar |

---

## 6. Laboratorio (coordinación)

1. Secar los sobres en estufa a 60 °C durante 48 h.
2. En las bolsas de té, retirar con pincel las partículas de suelo y raíces externas. En los palitos, limpiarlos con pincel y retirar las raíces que hayan entrado.
3. Pesar a 0,001 g.
4. Calcular:
   - **Pérdida de masa (%)** = (M0 − Mt) / M0 × 100, corregida con los controles de manipulación.
   - ***k*** por material y sitio, ajustando *ln(Mt/M0) = −k·t* con los 3 retiros.
   - **TBI** con té verde y rooibos a 90 días: *S = 1 − ag/Hg* y *k* según Keuskamp et al. (2013).
5. Modelos: pérdida de masa ~ material × hábitat + riego + pH + textura, con el sitio como efecto aleatorio. Ver `analisis/analisis_piloto.R`.

---

## 7. Datos, privacidad y ética

- Las **coordenadas exactas** solo las ve la coordinación. Los datos públicos se redondean a 3 decimales (≈100 m).
- No se publican nombres ni correos. Las fotos se publican solo si no muestran personas ni fachadas identificables.
- Participar es voluntario, y cualquier participante puede retirarse en cualquier momento.
- Al terminar, cada participante recibe un **informe de su sitio**. Se reconoce su participación en publicaciones, en agradecimientos o como coautoría de un *data paper*, según el aporte.

---

## 8. Indicadores de éxito del piloto

| Indicador | Meta |
|---|---|
| Participantes que completan las 4 visitas | ≥ 80 % |
| Materiales recuperados intactos | ≥ 85 % |
| Registros web completos (con fotos) | ≥ 90 % |
| Visitas dentro de ±2 días de la fecha | ≥ 85 % |
| Lecturas de pH que coinciden con la verificación por foto (±0,5) | ≥ 80 % |

Si se cumplen, se propone escalar a **un año completo y multi-año para la madera**, como en el estudio original, y abrir la participación a colegios.

---

## Referencias

- Kotze, D. J., & Setälä, H. (2021). Urbanisation differently affects decomposition rates of recalcitrant woody material and labile leaf litter. *Urban Ecosystems*. https://doi.org/10.1007/s11252-021-01125-3
- Keuskamp, J. A., Dingemans, B. J. J., Lehtinen, T., Sarneel, J. M., & Hefting, M. M. (2013). Tea Bag Index: a novel approach to collect uniform decomposition data across ecosystems. *Methods in Ecology and Evolution*, 4, 1070–1075.
- Thien, S. J. (1979). A flow diagram for teaching texture-by-feel analysis. *Journal of Agronomic Education*, 8, 54–55.
