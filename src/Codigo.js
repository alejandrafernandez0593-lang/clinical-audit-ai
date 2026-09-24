// ========================================================
// PROYECTO: AUDITOR CLÍNICO PROFESIONAL V5 (CIRUGÍA GENERAL)
// Filtro estricto por fechas, Copy-Paste automático y Cero 503
// ========================================================

function onOpen() {
  DocumentApp.getUi()
    .createMenu('🩺 Auditoría Médica')
    .addItem('Abrir Panel de Auditoría', 'abrirSidebar')
    .addToUi();
}

function abrirSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Auditor Clínico IA');
  DocumentApp.getUi().showSidebar(html);
}

// 1. Parser Estricto: Captura ÚNICAMENTE las notas reales por fecha
function obtenerListaNotas() {
  var doc = DocumentApp.getActiveDocument();
  var texto = doc.getBody().getText();

  // Expresión regular precisa: Solo títulos al inicio de línea con fechas reales
  var patron = /(?:^|\n)(?:\*{2,4})?(Nota de ingreso a la institución|Ingreso a cirugía general|Evolución cirugia general|Evolucion|Evolución|Egreso)(?:\s*-\s*(\d{2}\/\d{2}\/\d{4}))?/gi;

  var lista = [];
  var match;

  while ((match = patron.exec(texto)) !== null) {
    var tipo = match[1].trim();
    var pos = match.index;

    // Buscar la fecha dentro de los primeros 250 caracteres de esa nota si no está en el título
    var fragmento = texto.substring(pos, pos + 250);
    var fechaMatch = fragmento.match(/(\d{2}\/\d{2}\/\d{4})/);
    var fecha = fechaMatch ? fechaMatch[1] : "Sin fecha";

    lista.push({
      indice: lista.length,
      tipo: tipo,
      fecha: fecha,
      posicion: pos,
      etiqueta: fecha + " — " + tipo
    });
  }

  if (lista.length === 0) {
    throw new Error("No se encontraron notas clínicas estructuradas.");
  }

  // Extraemos el contenido de cada una
  for (var i = 0; i < lista.length; i++) {
    var ini = lista[i].posicion;
    var fin = (i + 1 < lista.length) ? lista[i + 1].posicion : texto.indexOf("Resumen de la atención:", ini);
    if (fin === -1) fin = texto.length;

    var bloque = texto.substring(ini, fin);

    // Campos esenciales
    var dx = bloque.match(/Diagnósticos:?([\s\S]*?)(?=Subjetivo:?|Signos vitales:?|Examen físico:?|Órdenes|$)/i);
    var signos = bloque.match(/Signos vitales:?([\s\S]*?)(?=Examen físico:?|$)/i);
    var obj = bloque.match(/(?:Examen físico|OBJETIVO):?([\s\S]*?)(?=Paraclínicos:?|Análisis:?|Análisis del caso:?|$)/i);
    var analisis = bloque.match(/(?:Análisis del caso|Análisis|ANÁLISIS):?([\s\S]*?)(?=Plan de manejo:?|Plan:?|Órdenes médicas:?|$)/i);
    var plan = bloque.match(/(?:Plan de manejo|Plan|Órdenes médicas):?([\s\S]*?)(?=Paraclínicos|Imágenes|Resumen|\*{2,4}|$)/i);

    lista[i].diagnosticos = dx ? dx[1].trim() : "No especificado";
    lista[i].signos = signos ? signos[1].trim() : "";
    lista[i].objetivo = obj ? obj[1].trim() : "";
    lista[i].analisis = analisis ? analisis[1].trim() : "";
    lista[i].plan = plan ? plan[1].trim() : "";
    lista[i].textoCompleto = bloque;
  }

  return lista;
}

// 2. Enfoca el documento en la nota seleccionada
function enfocarNotaEnDoc(indice) {
  var doc = DocumentApp.getActiveDocument();
  var lista = obtenerListaNotas();
  var nota = lista[indice];

  var match = doc.getBody().findText(nota.tipo);
  if (match) {
    doc.setCursor(doc.newPosition(match.getElement(), 0));
  }
}

// 3. Similitud de Jaccard (Métrica de plagio)
function calcularSimilitud(textoA, textoB) {
  if (!textoA || !textoB) return 0;
  var limpiar = function(str) {
    return str.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/).filter(function(w) { return w.length > 3; });
  };
  var setA = new Set(limpiar(textoA));
  var setB = new Set(limpiar(textoB));
  if (setA.size === 0 || setB.size === 0) return 0;
  var inter = 0;
  setA.forEach(function(w) { if (setB.has(w)) inter++; });
  return Math.round((inter / new Set([...setA, ...setB]).size) * 100);
}

// 4. Auditoría directa, ultrarrápida y con redacción telegráfica de Cirugía
function auditarNotaPorIndice(indice, pinIngresado) {
  var pinOficial = PropertiesService.getScriptProperties().getProperty('PIN_DOCENTE') || "1234";
  if (pinIngresado !== pinOficial) throw new Error("⛔ PIN incorrecto.");

  var lista = obtenerListaNotas();
  var actual = lista[indice];
  var previa = (indice > 0) ? lista[indice - 1] : null;

  // Cálculo matemático instantáneo
  var duplicidadAnalisis = previa ? calcularSimilitud(previa.analisis, actual.analisis) : 0;
  var signosIguales = (previa && previa.signos && actual.signos && previa.signos.replace(/\s+/g, '') === actual.signos.replace(/\s+/g, ''));

  var apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) throw new Error("No se encontró la GEMINI_API_KEY.");

  // Prompt con estilo telegráfico real de Cirujano
  var prompt = "Eres Cirujano General en Colombia. Tu trabajo es reescribir el análisis de una historia clínica para que sea TELEGRÁFICO, DIRECTO Y SIN RELLENO.\n\n" +
    "DIAGNÓSTICO: " + actual.diagnosticos + "\n" +
    "EXAMEN FÍSICO: " + actual.objetivo.substring(0, 300) + "\n" +
    "ANÁLISIS ESTUDIANTE: " + actual.analisis + "\n" +
    "PLAN: " + actual.plan.substring(0, 300) + "\n" +
    (previa ? "ANÁLISIS PREVIO: " + previa.analisis.substring(0, 400) : "") + "\n\n" +
    (signosIguales ? "¡ALERTA CRÍTICA: Signos vitales idénticos a los de ayer!\n" : "") +
    "REGLA DE ORO PARA EL ANÁLISIS OPTIMIZADO:\n" +
    "Escribe en estilo médico telegráfico directo (MÁXIMO 2 ORACIONES, MENOS DE 40 PALABRAS). Prohibido usar palabras como 'tributario', 'mandatorio', 'se justifica plenamente' o 'paraclínica hematológica'.\n" +
    "Sigue estrictamente esta estructura:\n" +
    "- Oración 1: Paciente de [edad] años con [sospecha principal] vs [diagnóstico diferencial].\n" +
    "- Oración 2: Se solicitan [estudios/imágenes] y se deja en [observación/plan/analgesia] para definir conducta quirúrgica según reporte.\n\n" +
    "EJEMPLO DEL ESTILO EXACTO QUE DEBES IMITAR:\n" +
    "'Paciente de 43 años con dolor en hemiabdomen inferior con migración a FID, sin irritación peritoneal. Se solicitan paraclínicos y ecografía total para descartar apendicitis aguda vs patología ginecológica, manteniendo observación y analgesia EV para definir conducta según resultados.'\n\n" +
    "RESPONDE EXCLUSIVAMENTE EN JSON ESTRICTO (sin markdown):\n" +
    "{\n" +
    '  "es_coherente": false,\n' +
    '  "nivel_riesgo": "ALTO",\n' +
    '  "alerta_principal": "Texto corto y contundente",\n' +
    '  "incongruencias_detectadas": ["Punto 1"],\n' +
    '  "alerta_copy_paste": "Detalle de duplicidad",\n' +
    '  "analisis_optimizado": "Texto telegráfico corto de máximo 2 oraciones",\n' +
    '  "recomendacion_docente": "Mensaje formativo corto"\n' +
    "}";

  var payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  // AQUÍ ESTÁ LA VARIABLE OPCIONES QUE FALTABA
  var opciones = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var modelos = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.7-flash",
    "gemini-3.8-flash"
  ];

  var ultimoError = "";

  for (var i = 0; i < modelos.length; i++) {
    var modeloActual = modelos[i];
    var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modeloActual + ":generateContent?key=" + apiKey;

    var respuesta = UrlFetchApp.fetch(url, opciones);
    var codigo = respuesta.getResponseCode();

    if (codigo === 200) {
      var json = JSON.parse(respuesta.getContentText());
      var textoLimpio = json.candidates[0].content.parts[0].text.replace(/```json/gi, "").replace(/```/g, "").trim();
      var data = JSON.parse(textoLimpio);
      data.porcentaje_duplicidad = duplicidadAnalisis;
      return data;
    } else {
      ultimoError = "Modelo " + modeloActual + " (" + codigo + "): " + respuesta.getContentText();
      Utilities.sleep(800);
    }
  }

  throw new Error("Saturación temporal. Detalle: " + ultimoError);
}

// 5. Reemplaza el análisis borrando múltiples párrafos y respetando tipografía
function reemplazarAnalisisPorIndice(indice, nuevoAnalisis) {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var lista = obtenerListaNotas();
  var nota = lista[indice];

  var matchTitulo = body.findText(nota.tipo);
  if (!matchTitulo) throw new Error("No se pudo ubicar la nota en el documento.");

  var elemTitulo = matchTitulo.getElement().getParent();
  var idxTitulo = body.getChildIndex(elemTitulo);

  var idxIni = -1;
  var idxFin = -1;

  for (var i = idxTitulo; i < body.getNumChildren(); i++) {
    var txt = body.getChild(i).getText();
    if (idxIni === -1 && /(?:Análisis del caso|Análisis|ANÁLISIS):/i.test(txt)) {
      idxIni = i;
    } else if (idxIni !== -1 && /(?:Plan de manejo|Plan|Órdenes médicas):/i.test(txt)) {
      idxFin = i;
      break;
    }
  }

  if (idxIni === -1 || idxFin === -1) throw new Error("No se delimitó el análisis.");

  var parrafoBase = body.getChild(idxIni + 1).asParagraph();
  var font = parrafoBase.getFontFamily() || "Arial";
  var size = parrafoBase.getFontSize() || 11;

  // Borrar todos los párrafos viejos
  for (var j = idxFin - 1; j > idxIni; j--) {
    body.removeChild(body.getChild(j));
  }

  // Insertar el nuevo análisis limpio
  var p = body.insertParagraph(idxIni + 1, nuevoAnalisis);
  p.setFontFamily(font);
  p.setFontSize(size);
  p.setBold(false);

  return "OK";
}

// 6. Sello Digital Enterprise SHA-256
function generarSelloEnterprisePorIndice(indice) {
  var lista = obtenerListaNotas();
  var nota = lista[indice];

  var fechaHora = Utilities.formatDate(new Date(), "America/Bogota", "yyyy-MM-dd HH:mm:ss");
  var usuario = Session.getActiveUser().getEmail() || "Médico Docente Especialista";

  var contenido = nota.diagnosticos + "|" + nota.analisis + "|" + fechaHora;
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, contenido);
  var hash = bytes.map(function(b) { return ('0' + (b & 0xFF).toString(16)).slice(-2); }).join('').substring(0, 16).toUpperCase();

  var textoEnterprise = "=== HISTORIA CLÍNICA OFICIAL (ENTERPRISE) ===\n" +
    "FECHA/HORA: " + fechaHora + "\n" +
    "DOCENTE FIRMANTE: " + usuario + "\n" +
    "CÓDIGO INTEGRIDAD (SHA-256): " + hash + "\n" +
    "--------------------------------------------\n" +
    "FECHA: " + nota.fecha + "\n" +
    "DIAGNÓSTICOS:\n" + nota.diagnosticos + "\n\n" +
    "ANÁLISIS CLÍNICO:\n" + nota.analisis + "\n\n" +
    "PLAN DE MANEJO:\n" + nota.plan + "\n" +
    "============================================";

  return {
    fechaHora: fechaHora,
    hash: hash,
    textoEnterprise: textoEnterprise
  };
}
