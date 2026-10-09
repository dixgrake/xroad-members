# Documentación Oficial de Miembros X-Road — República Dominicana (PUI)

Sitio de documentación técnica para usuarios finales, desarrolladores y administradores de sistemas de las instituciones miembros de la **Plataforma Única de Interoperabilidad (PUI)** del Estado Dominicano, construida sobre **X-Road** y gobernada por la **OGTIC**.

Este portal está desarrollado con **Docusaurus v3**, soporta diagramas **Mermaid**, incluye capturas de pantalla de la consola oficial y cuenta con integración continua **CI/CD para GitHub Pages** mediante **GitHub Actions**.

---

## 📂 Fuentes Integradas

Esta documentación unifica y moderniza la información técnica de los proyectos oficiales:
* [`ogticrd/xroad-members`](https://github.com/ogticrd/xroad-members): Procedimientos de membresía, despliegue Sidecar 7.8.2, subsistemas, publicación y consumo de servicios.
* [`ogticrd/xroad-instalacion`](https://github.com/ogticrd/xroad-instalacion): Requisitos de red, matriz de puertos, glosario oficial, capturas paso a paso y solución de errores comunes.
* **Estándares Oficiales de NIIS y OGTIC:** Gobernanza de certificados mTLS, sellado de tiempo RFC 3161 y arquitectura federada.

---

## 🚀 Despliegue en GitHub Pages (CI/CD)

El repositorio incluye el flujo de trabajo automatizado en `.github/workflows/deploy.yml`.

### Pasos para publicar en tu perfil de GitHub:

1. **Subir el código a tu repositorio de GitHub:**
   ```bash
   git init
   git add .
   git commit -m "docs: portal de documentacion xroad con docusaurus"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
   git push -u origin main
   ```

2. **Ajustar `docusaurus.config.js`:**
   Abre el archivo `docusaurus.config.js` y coloca tu nombre de usuario y el nombre del repositorio:
   ```javascript
   url: 'https://<tu-usuario>.github.io',
   baseUrl: '/<tu-repositorio>/',
   organizationName: '<tu-usuario>',
   projectName: '<tu-repositorio>',
   ```

3. **Activar GitHub Pages en el repositorio:**
   * Entra a tu repositorio en GitHub.
   * Ve a **Settings** -> **Pages**.
   * En **Build and deployment -> Source**, selecciona **GitHub Actions**.
   * ¡Listo! Cada `git push` a la rama `main` compilará y desplegará automáticamente la documentación en `https://<tu-usuario>.github.io/<tu-repositorio>/`.

---

## 💻 Ejecución y Desarrollo Local

Requisitos: Node.js 18 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en local (con recarga en vivo)
npm start

# 3. Compilar el sitio estático para producción
npm run build

# 4. Probar la compilación estática localmente
npm run serve
```

---

## 📑 Estructura de la Documentación

* **1. Introducción y Arquitectura:**
  * Introducción a la Plataforma Única de Interoperabilidad (PUI).
  * Arquitectura técnica, componentes centrales y diagrama de secuencia.
  * Glosario oficial de términos y abreviaciones (CA, TSA, CS, SS, CSR, OCSP).
* **2. Requisitos y Preparación:**
  * Requisitos de hardware, virtualización y sistema operativo Ubuntu 22.04 LTS.
  * Matriz completa de puertos (internos vs. externos) y reglas UFW.
* **3. Despliegue del Servidor:**
  * Despliegue con Docker Compose Sidecar 7.8.2 (`docker-compose.yml` y `.env`).
  * Procedimiento de desinstalación limpia y borrado de volúmenes.
  * Referencia histórica de la versión legada v6.22 (obsoleta).
* **4. Configuración e Inscripción:**
  * Carga del ancla XML oficial (`configuration_anchor_DO.xml`) e inicialización de miembro.
  * Soft Token, generación de llaves AUTH y SIGN, solicitud de certificados ante OGTIC, sellado de tiempo TSA y aprobación en el Servidor Central.
* **5. Gestión de Subsistemas:**
  * Reglas estrictas de nomenclatura (mayúsculas, descriptivos, nombres prohibidos).
  * Procedimiento de alta y aprobación en el Servidor Central.
* **6. Servicios y Control de Acceso:**
  * Publicación de APIs REST y habilitación de endpoints.
  * Listas de control de acceso (ACL) para otorgar permisos a otras instituciones.
  * Consumo de servicios remotos: formato `/r1/...`, cabecera `X-Road-Client`, ejemplos en cURL, Node.js y Python.
* **7. Soporte y Diagnóstico:**
  * Preguntas frecuentes sobre intercambio de PDFs, archivos pesados y firmas digitales.
  * Matriz de errores comunes, interpretación de cabeceras `X-Road-Error` y solución paso a paso.
* **8. CI/CD y Publicación:**
  * Guía técnica para desplegar en GitHub Pages mediante GitHub Actions.

---

## 🏛️ Créditos y Autoría

* **OGTIC (Oficina Gubernamental de Tecnologías de la Información y Comunicación):** Administrador del Servidor Central de la República Dominicana.
* **NIIS (Nordic Institute for Interoperability Solutions):** Desarrollador de la tecnología base X-Road.
