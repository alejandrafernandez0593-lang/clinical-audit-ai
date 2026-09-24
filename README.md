# 🩺 ClinicalAudit-AI: Sistema Inteligente de Auditoría Médica y Detección de Plagio Clínico (NLP)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Google Apps Script](https://img.shields.io/badge/Platform-Google%20Workspace-blue)](https://developers.google.com/apps-script)
[![AI Engine: Gemini LLM](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-orange)](https://ai.google.dev/)
[![Compliance: Res. 1995/1999 & Ley 2015/2020](https://img.shields.io/badge/Compliance-Colombia%20Health%20Law-green)](https://www.minsalud.gov.co)

> Solución integral de **Ingeniería de Datos y Procesamiento de Lenguaje Natural (NLP)** embebida en Google Docs para auditar historias clínicas hospitalarias en tiempo real, erradicar el *copy-paste* documental y optimizar el razonamiento quirúrgico antes de su radicación en sistemas hospitalarios (*Enterprise*).

---

## 🏥 Contexto del Problema y Desafío Clínico

En entornos hospitalarios universitarios de alta complejidad (Cirugía General, UCI y Hospitalización), la alta rotación de notas médicas elaboradas por médicos en formación y cirujanos presenta riesgos críticos:
1. **Fraude documental por Copy-Paste:** Replicación de signos vitales, antecedentes y exámenes físicos de días anteriores sin una reevaluación médica real.
2. **Incongruencias Clínicas Graves:** Contradicciones entre el examen físico reportado (ej: abdomen evaluado en piso) y la ubicación real del paciente (ej: quirófano o traslado).
3. **Análisis Clínicos Redundantes:** Párrafos extensos que narran la historia de ingreso en lugar de sintetizar la evolución del día postoperatorio (POP).
4. **Riesgo Médico-Legal:** Incumplimiento de la **Resolución 1995 de 1999** (integralidad y veracidad de la HC) y la **Ley 2015 de 2020** (interoperabilidad de historias clínicas en Colombia).

---

## 🚀 Arquitectura de la Solución

El sistema opera directamente sobre el flujo de trabajo de los especialistas en Google Docs mediante un **Add-on nativo**, integrando tres capas de ingeniería:

---

## ✨ Características Principales

### 1. 🔍 Auditoría Clínica en Tiempo Real
* Evalúa la coherencia lógica de la nota seleccionada en la línea de tiempo.
* Detecta contradicciones nosológicas, medicamentos subdosificados y textos de plantilla sin depurar.
* **Auto-Scroll Inteligente:** Al seleccionar una fecha en el panel, el cursor del documento navega automáticamente hasta la página de dicha nota.

### 2. 📋 Detector Automático de Copy-Paste
* **Algoritmo de Jaccard:** Calcula el porcentaje exacto de duplicidad léxica entre la evolución de hoy y la del día anterior de forma instantánea.
* Emite un dictamen médico-legal fundado en la Resolución 1995 de 1999 si detecta plagio documental.

### 3. ✨ Refactorización y Síntesis Quirúrgica (1-Click)
* Reemplaza análisis redundantes por síntesis clínicas telegráficas en prosa continua (sin viñetas ni relleno).
* Mantiene la tipografía, tamaño y estilo original del documento sin alterar el formato corporativo.

### 4. 🔒 Sellado Criptográfico para Plataforma Enterprise
* Cumplimiento de la Ley 2015 de 2020 mediante la generación de un hash **SHA-256** único por evolución médica.
* Función de copiado al portapapeles en 1 solo clic para pegado inmediato en el sistema hospitalario central.

### 5. 🛡️ Control de Acceso por Roles (RBAC)
* Bloqueo de seguridad con PIN maestro para garantizar que únicamente el **Médico Docente / Especialista Revisor** tenga autorización para ejecutar la auditoría y aplicar correcciones.

---

## 🛠️ Stack Tecnológico

* **Lenguaje:** JavaScript (Google Apps Script).
* **Modelos de Lenguaje (LLMs):** Google Gemini 3.6 Flash / 3.5 Flash vía REST API.
* **Técnicas de NLP:** Regex Extraction, Jaccard Lexical Similarity, Few-Shot In-Context Learning.
* **Seguridad & Criptografía:** Digest SHA-256, Script Properties (Environment Secrets).
* **Frontend:** HTML5, CSS3 moderno con sistema de pestañas y notificaciones Toast no intrusivas.

---

## ⚙️ Instalación y Despliegue Rápido

1. Abre el Google Doc que contiene las historias clínicas hospitalarias.
2. Dirígete a **Extensiones > Apps Script**.
3. Clona los archivos del repositorio:
   * Pega el contenido de `src/Codigo.js` en el archivo `Código.gs`.
   * Crea un archivo HTML llamado `Sidebar.html` y pega el contenido de `src/Sidebar.html`.
4. Configura las variables de entorno en **Configuración del proyecto (⚙️) > Propiedades de la secuencia de comandos**:
   * `GEMINI_API_KEY`: Tu clave de API de Google AI Studio.
   * `PIN_DOCENTE`: Clave de 4 a 6 dígitos para el acceso del profesor.
5. Recarga el Google Doc y accede desde el nuevo menú superior: **🩺 Auditoría Médica > Abrir Panel de Auditoría**.

---

## 👩‍💻 Autoría y Contacto

**Desarrollado por:** Viviana Valle Fernandez  
*Ingeniera Mecatronica y Estudiante de Maestria en Inteligencia Artificial y Ciencia de Datos*  
* [LinkedIn](www.linkedin.com/in/viviana-valle-fernández-4692951ab) | [GitHub](https://github.com/alejandrafernandez0593-lang) | [Correo Electrónico](alejandrafernandez0593@gmail.com)
