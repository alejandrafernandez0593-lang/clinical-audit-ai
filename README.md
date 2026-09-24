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
