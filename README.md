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

**Desarrollado por:** [Tu Nombre Completo]  
*Ingeniera en Inteligencia Artificial y Ciencia de Datos*  
* [LinkedIn](https://linkedin.com/in/tu-usuario) | [GitHub](https://github.com/tu-usuario) | [Correo Electrónico](mailto:tu-correo@email.com)
