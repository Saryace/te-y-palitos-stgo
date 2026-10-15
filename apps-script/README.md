# Backend: Google Sheets + Drive (gratis, sin servidor)

Los registros de la web se guardan en una planilla de Google de la coordinación. Las fotos quedan en una carpeta de Drive. Las y los participantes **no necesitan cuenta**.

1. Crear una planilla nueva en Google Sheets (p. ej. *Té Bajo Tierra — registros 2026-27*).
2. *Extensiones → Apps Script*. Borrar el contenido y pegar [`Code.gs`](Code.gs). Guardar.
3. *Implementar → Nueva implementación → tipo **Aplicación web***:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. Autorizar los permisos (Sheets y Drive) y copiar la URL que termina en `/exec`.
5. Pegar la URL en [`docs/config.js`](../docs/config.js) → `ENDPOINT: "https://script.google.com/macros/s/…/exec"`, hacer commit y push.
6. Probar: abrir la URL `/exec` en el navegador. Debe responder `{"ok":true,...}`. Luego enviar un registro de prueba con el sitio `P00-Z` y borrar esa fila.

> Si cambias `Code.gs`, usa *Implementar → Administrar implementaciones → Editar → Nueva versión*. Así la URL no cambia.

**Privacidad:** la planilla y la carpeta de fotos son privadas de la cuenta de coordinación. Para publicar datos, usar `analisis/analisis_piloto.R`, que exporta una versión con coordenadas redondeadas y sin correos.
