# 🩺 ClinicalAudit-AI: Auditor Clínico Inteligente & Detección de Copy-Paste

Sistema de Inteligencia Artificial y Procesamiento de Lenguaje Natural (NLP) integrado a Google Docs para auditar historias clínicas en tiempo real, eliminar el copy-paste documental y optimizar el análisis quirúrgico antes de ser subido a la plataforma Enterprise.

Cumplimiento normativo: **Resolución 1995 de 1999** y **Ley 2015 de 2020** (Colombia).

---

## 🏥 El Problema Clínico
En los hospitales universitarios, la alta carga asistencial genera prácticas de riesgo médico-legal:
* **Fraude por Copy-Paste:** Notas de evolución donde se copian signos vitales y exámenes físicos de días anteriores sin evaluar al paciente.
* **Incongruencias Lógicas:** Exámenes físicos detallados en pacientes que se encuentran en quirófano o ausentes.
* **Análisis Redundantes:** Párrafos extensos que narran la historia de ingreso en vez de sintetizar el día postoperatorio actual.
* **Riesgo Legal:** Sanciones éticas y demandas por violar la Resolución 1995 de 1999.

---

## 🚀 La Solución Tecnológica
Desarrollo embebido en el flujo de trabajo real de los médicos en Google Docs (Google Apps Script), que incluye:

1. **Línea de Tiempo Clínica (Timeline Parser):** Detecta automáticamente todas las evoluciones del paciente ordenadas por fecha.
2. **Detector de Copy-Paste en Tiempo Real:** Algoritmo matemático de Jaccard que calcula el porcentaje de duplicidad léxica contra la nota anterior.
3. **Auditoría Semántica con LLM:** Modelo Gemini 3.6 Flash que detecta contradicciones diagnósticas y errores de dosificación médica (ej: mg vs gr).
4. **Refactorización Quirúrgica:** Síntesis del análisis a un formato telegráfico de máximo 2 a 3 oraciones de alto valor clínico.
5. **Sellado Criptográfico SHA-256 (Ley 2015 de 2020):** Firma digital inalterable con fecha y hora para migración segura a la plataforma Enterprise.
6. **Control de Acceso por Roles (PIN Docente):** Bloqueo de seguridad para que solo el médico docente pueda ejecutar la auditoría y reemplazos.

---

## 🛠️ Tecnologías Utilizadas
* **Plataforma:** Google Workspace & Google Apps Script (JavaScript).
* **Inteligencia Artificial:** Google Gemini 3.6 Flash API.
* **Ciencia de Datos / NLP:** Métrica de Similitud de Jaccard, Token Optimization, Regex Parsing.
* **Criptografía:** SHA-256 Digest para no repudio documental.
* **Frontend:** HTML5, CSS3 moderno con sistema de pestañas y notificaciones Toast.

---

## 👩‍💻 Desarrollado por
* **Ingeniería en Inteligencia Artificial y Ciencia de Datos**
* Proyecto de innovación en HealthTech y Data Governance.
