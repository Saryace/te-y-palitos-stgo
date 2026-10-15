/**
 * Té y Palitos Santiago: receptor de registros.
 * Guarda cada visita como una fila en la hoja "registros" y las fotos en una carpeta de Drive.
 * Instrucciones de despliegue: apps-script/README.md
 */

const CARPETA_FOTOS = 'te-y-palitos-fotos';   // se crea si no existe
const HOJA = 'registros';
const COLUMNAS = [
  'recibido', 'id', 'participante', 'sitio', 'email', 'comuna', 'lat', 'lon', 'gps_precision',
  'visita', 'fecha', 'habitat', 'riego', 'cobertura', 'sombra',
  'ph', 'ph_marca', 'humedad', 'textura', 'cinta_cm', 'sensacion',
  'estado_verde', 'estado_rooibos', 'estado_madera', 'en_sobre', 'obs',
  'fotos_sitio', 'fotos_ph', 'fotos_material', 'enviado_desde',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const r = JSON.parse(e.postData.contents);
    if (!/^P\d{2}-[A-Z]$/.test(r.sitio || '')) throw new Error('Código de sitio inválido');

    const hoja = obtenerHoja_();
    // Evita duplicados si el celular reintenta un envío que sí llegó
    const ids = hoja.getRange(1, 2, hoja.getLastRow(), 1).getValues().flat();
    if (ids.indexOf(r.id) === -1) {
      const carpeta = obtenerCarpeta_(r.sitio);
      const f = r.fotos || {};
      r.fotos_sitio = guardarFotos_(carpeta, r.id + '_sitio', f.foto_sitio);
      r.fotos_ph = guardarFotos_(carpeta, r.id + '_ph', f.foto_ph);
      r.fotos_material = guardarFotos_(carpeta, r.id + '_material', f.foto_material);
      r.recibido = new Date();
      hoja.appendRow(COLUMNAS.map((c) => (r[c] === undefined ? '' : r[c])));
    }
    return json_({ ok: true, id: r.id });
  } catch (err) {
    return json_({ ok: false, error: String(err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, servicio: 'te-y-palitos', mensaje: 'Usa POST para enviar registros.' });
}

function obtenerHoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(HOJA);
  if (!h) {
    h = ss.insertSheet(HOJA);
    h.appendRow(COLUMNAS);
    h.setFrozenRows(1);
  }
  return h;
}

function obtenerCarpeta_(sitio) {
  const raiz = buscarOCrear_(DriveApp.getRootFolder(), CARPETA_FOTOS);
  return buscarOCrear_(raiz, sitio);
}

function buscarOCrear_(padre, nombre) {
  const it = padre.getFoldersByName(nombre);
  return it.hasNext() ? it.next() : padre.createFolder(nombre);
}

function guardarFotos_(carpeta, base, lista) {
  if (!lista || !lista.length) return '';
  return lista.slice(0, 4).map((dataUrl, i) => {
    const b64 = String(dataUrl).split(',')[1];
    const blob = Utilities.newBlob(Utilities.base64Decode(b64), 'image/jpeg', `${base}_${i + 1}.jpg`);
    return carpeta.createFile(blob).getUrl();
  }).join(' ');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
