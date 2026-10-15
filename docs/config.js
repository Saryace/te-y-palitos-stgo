// Configuración del sitio.
// Pega aquí la URL del Web App de Google Apps Script (ver apps-script/README.md).
// Si se deja vacía, los registros quedan guardados solo en el navegador y se pueden descargar como JSON.
window.TYP_CONFIG = {
  ENDPOINT: "",
  // Fechas del piloto (hora de Chile)
  VISITAS: [
    { id: "T0", nombre: "Instalación", fecha: "2026-12-21" },
    { id: "R1", nombre: "Retiro 1", fecha: "2027-01-21" },
    { id: "R2", nombre: "Retiro 2", fecha: "2027-02-21" },
    { id: "R3", nombre: "Retiro 3", fecha: "2027-03-21" },
  ],
  REPO: "https://github.com/USUARIO/te-bajo-tierra-stgo", // reemplazar tras crear el repo
  CONTACTO: "coordinacion@ejemplo.cl", // reemplazar
};
