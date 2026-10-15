(() => {
  const CFG = window.TYP_CONFIG || { ENDPOINT: "", VISITAS: [] };
  const $ = (id) => document.getElementById(id);
  const form = $("form");

  // ---------- almacenamiento local (tolerante a errores) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  };

  // ---------- opciones ----------
  const COMUNAS = ["Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia",
    "La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado",
    "Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal",
    "Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Santiago","Vitacura","Puente Alto","San Bernardo",
    "Pirque","San José de Maipo","Padre Hurtado","Calera de Tango","Colina","Lampa","Otra (RM)"];
  const sel = $("comuna");
  COMUNAS.forEach((c) => sel.add(new Option(c, c)));

  const ESTADOS = ["", "Intacto", "Roto / rasgado", "Con raíces dentro", "Parcialmente encontrado", "No encontrado"];
  ["estado_verde", "estado_madera"].forEach((id) =>
    ESTADOS.forEach((e) => $(id).add(new Option(e || "Selecciona…", e))));

  // Tipo de visita: preselecciona la más cercana a hoy
  const hoy = new Date();
  const cercana = CFG.VISITAS.reduce((best, v) => {
    const d = Math.abs(new Date(v.fecha + "T12:00:00") - hoy);
    return !best || d < best.d ? { id: v.id, d } : best;
  }, null);
  const vc = $("visita-choices");
  CFG.VISITAS.forEach((v) => {
    const f = new Date(v.fecha + "T12:00:00").toLocaleDateString("es-CL", { day: "numeric", month: "short" });
    vc.insertAdjacentHTML("beforeend",
      `<label><input type="radio" name="visita" value="${v.id}" required ${cercana && cercana.id === v.id ? "checked" : ""}> ${v.nombre} · ${f}</label>`);
  });

  // Fecha/hora local por defecto
  const pad = (n) => String(n).padStart(2, "0");
  $("fecha").value = `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}T${pad(hoy.getHours())}:${pad(hoy.getMinutes())}`;

  // ---------- recordar datos fijos ----------
  const FIJOS = ["participante", "sitio", "email", "comuna", "habitat", "ph_marca"];
  const guardados = store.get("typ_fijos", {});
  FIJOS.forEach((k) => { if (guardados[k]) form.elements[k].value = guardados[k]; });

  // ---------- mostrar/ocultar secciones ----------
  const visita = () => (form.querySelector("input[name=visita]:checked") || {}).value;
  function actualizarSecciones() {
    const temp = $("temp_suelo").value;
    const metodo = form.querySelector("input[name=metodo_temp]:checked");
    if (temp && !metodo) e.push("Indica qué termómetro usaste para la temperatura del suelo.");
    if (!temp && metodo) e.push("Marcaste un termómetro, pero falta la temperatura del suelo.");
    const v = visita();
    const esRetiro = v && v !== "T0";
    const pideTextura = v === "T0" || v === "R3";
    document.querySelectorAll(".only-retiro").forEach((el) => (el.hidden = !esRetiro));
    $("textura").required = pideTextura;
    document.querySelector('label[for="textura"] .hint').textContent =
      pideTextura ? "Obligatoria en esta visita." : "Opcional en esta visita.";
  }
  vc.addEventListener("change", actualizarSecciones);
  actualizarSecciones();

  // ---------- ayudas para la descripción ----------
  $("ayudas").addEventListener("click", (ev) => {
    const b = ev.target.closest(".chip");
    if (!b) return;
    const ta = $("descripcion");
    ta.value = (ta.value.trim() ? ta.value.trim() + "\n" : "") + b.dataset.t;
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
  });

  // ---------- GPS ----------
  $("gps").addEventListener("click", () => {
    const msg = $("gps-msg");
    if (!navigator.geolocation) { msg.textContent = "Este navegador no permite GPS."; return; }
    msg.textContent = "Buscando señal…";
    navigator.geolocation.getCurrentPosition(
      (p) => {
        $("lat").value = p.coords.latitude.toFixed(6);
        $("lon").value = p.coords.longitude.toFixed(6);
        $("gps_precision").value = Math.round(p.coords.accuracy);
        msg.textContent = `Listo (±${Math.round(p.coords.accuracy)} m)`;
      },
      (e) => (msg.textContent = "No se pudo obtener la ubicación: " + e.message),
      { enableHighAccuracy: true, timeout: 20000 });
  });

  // ---------- fotos (comprimidas en el navegador) ----------
  const fotos = { foto_sitio: [], foto_ph: [], foto_material: [], foto_cielo: [] };

  function comprimir(file, max = 1280, q = 0.72) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        res(c.toDataURL("image/jpeg", q));
      };
      img.onerror = rej;
      img.src = URL.createObjectURL(file);
    });
  }

  Object.keys(fotos).forEach((id) => {
    $(id).addEventListener("change", async (ev) => {
      fotos[id] = [];
      const prev = $("prev_" + id);
      prev.innerHTML = "";
      for (const f of [...ev.target.files].slice(0, 4)) {
        try {
          const data = await comprimir(f);
          fotos[id].push(data);
          prev.insertAdjacentHTML("beforeend", `<img src="${data}" alt="vista previa">`);
        } catch { /* imagen ilegible: se ignora */ }
      }
    });
  });

  // ---------- cola de envíos pendientes ----------
  function mostrarPendientes() {
    const cola = store.get("typ_cola", []);
    const box = $("pendientes");
    if (!cola.length) { box.innerHTML = ""; return; }
    box.innerHTML = `<div class="msg err">Tienes <strong>${cola.length}</strong> registro(s) sin enviar en este celular.
      <div class="key-actions"><button class="btn" type="button" id="reintentar">Reintentar envío</button>
      <button class="btn secondary" type="button" id="descargar">Descargar respaldo (.json)</button></div></div>`;
    $("reintentar").onclick = vaciarCola;
    $("descargar").onclick = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(cola, null, 1)], { type: "application/json" }));
      a.download = `te-y-palitos-pendientes-${Date.now()}.json`;
      a.click();
    };
  }

  async function enviar(reg) {
    if (!CFG.ENDPOINT) throw new Error("Sin servidor configurado");
    // text/plain evita el preflight CORS con Google Apps Script
    const r = await fetch(CFG.ENDPOINT, { method: "POST", body: JSON.stringify(reg) });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "Error del servidor");
    return j;
  }

  async function vaciarCola() {
    const cola = store.get("typ_cola", []);
    const resto = [];
    for (const reg of cola) { try { await enviar(reg); } catch { resto.push(reg); } }
    store.set("typ_cola", resto);
    mostrarPendientes();
  }
  mostrarPendientes();

  // ---------- validación y envío ----------
  function errores() {
    const e = [];
    if (!form.checkValidity()) {
      const inv = form.querySelector(":invalid");
      const nombre = (inv && (document.querySelector(`label[for="${inv.id}"]`) || inv.closest("fieldset").querySelector("legend")) || {}).textContent;
      e.push("Revisa: " + (nombre || "campos obligatorios").split("\n")[0].trim());
      inv && inv.focus();
    }
    if (!fotos.foto_sitio.length) e.push("Falta la foto del sitio.");
    if (!fotos.foto_ph.length) e.push("Falta la foto de la tira de pH.");
    const temp = $("temp_suelo").value;
    const metodo = form.querySelector("input[name=metodo_temp]:checked");
    if (temp && !metodo) e.push("Indica qué termómetro usaste para la temperatura del suelo.");
    if (!temp && metodo) e.push("Marcaste un termómetro, pero falta la temperatura del suelo.");
    const v = visita();
    if (v && v !== "T0" && (!$("estado_verde").value || !$("estado_madera").value)) e.push("Indica el estado del material retirado.");
    return e;
  }

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const est = $("estado");
    const errs = errores();
    if (errs.length) { est.innerHTML = `<div class="msg err">${errs.join("<br>")}</div>`; return; }

    const fd = new FormData(form);
    const datos = Object.fromEntries(fd.entries());
    datos.fuente_sombra = fd.getAll("fuente_sombra").join(", ");
    datos.participante = datos.participante.toUpperCase();
    datos.sitio = datos.sitio.toUpperCase();
    const reg = {
      id: `${datos.sitio}-${datos.visita}-${Date.now()}`,
      enviado_desde: navigator.userAgent.slice(0, 120),
      ...datos,
      fotos,
    };

    const fijos = {};
    FIJOS.forEach((k) => (fijos[k] = datos[k]));
    store.set("typ_fijos", fijos);

    const btn = $("enviar");
    btn.disabled = true; btn.textContent = "Enviando…";
    try {
      await enviar(reg);
      est.innerHTML = `<div class="msg ok">✅ ¡Registro enviado! Gracias. Código: <strong>${reg.id}</strong></div>`;
      form.reset();
      FIJOS.forEach((k) => { if (fijos[k]) form.elements[k].value = fijos[k]; });
      Object.keys(fotos).forEach((k) => { fotos[k] = []; $("prev_" + k).innerHTML = ""; });
    } catch (err) {
      const cola = store.get("typ_cola", []);
      cola.push(reg);
      const ok = store.set("typ_cola", cola);
      est.innerHTML = `<div class="msg err">No se pudo enviar (${err.message}). ${ok
        ? "El registro quedó <strong>guardado en este celular</strong>. Reintenta cuando tengas señal."
        : "Tampoco se pudo guardar localmente: <strong>no cierres esta página</strong> y descarga un respaldo."}</div>`;
      mostrarPendientes();
    } finally {
      btn.disabled = false; btn.textContent = "Enviar registro";
      est.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
})();
