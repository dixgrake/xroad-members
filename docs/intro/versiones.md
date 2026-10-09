---
id: versiones
title: Historial de Versiones y Releases de la PUI
sidebar_label: 1.4 Versiones y Releases
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <img src={useBaseUrl('/img/presidencia.svg')} alt="Escudo de la República Dominicana" width="80" />
  <h2>Oficina Gubernamental de Tecnologías de la Información y Comunicación (OGTIC)</h2>
  <p><strong>Control de Versiones y Ciclo de Vida de la Documentación Oficial de Miembros</strong></p>
</div>

---

## Versión Actual en Producción

:::tip RELEASE OFICIAL VIGENTE: v1.0.0
Esta documentación corresponde formalmente al **Release 1.0.0** de la Plataforma Única de Interoperabilidad del Estado Dominicano, homologada para el **Servidor de Seguridad de X-Road v7.8.2 (Docker Sidecar)** sobre **Ubuntu 22.04 LTS**.
:::

<div className="pui-release-summary-card">
  <div className="pui-release-header">
    <span className="pui-badge pui-badge--gov">Release Oficial</span>
    <span className="pui-badge pui-badge--version">v1.0.0</span>
    <span className="pui-badge pui-badge--security">Estado: Producción Vigente</span>
  </div>
  <table style={{marginTop: '1rem'}}>
    <tbody>
      <tr>
        <td><strong>Versión de Documentación</strong></td>
        <td><code>v1.0.0</code></td>
      </tr>
      <tr>
        <td><strong>Versión de Software Base</strong></td>
        <td><code>niis/xroad-security-server-sidecar:7.8.2</code></td>
      </tr>
      <tr>
        <td><strong>Sistema Operativo Homologado</strong></td>
        <td>Ubuntu 22.04 LTS (Jammy Jellyfish) x86_64</td>
      </tr>
      <tr>
        <td><strong>Instancia Nacional Oficial</strong></td>
        <td><code>DO</code> (República Dominicana)</td>
      </tr>
      <tr>
        <td><strong>Ancla de Confianza Vigente</strong></td>
        <td><code>configuration_anchor_DO_internal_UTC_2023-06-13_22_02_45.xml</code></td>
      </tr>
      <tr>
        <td><strong>Servidor Central (CS)</strong></td>
        <td><code>http://cs.xroad.digital.gob.do/internalconf</code></td>
      </tr>
      <tr>
        <td><strong>Autoridad de Sellado de Tiempo (TSA)</strong></td>
        <td>Servicio oficial <code>sello</code> (RFC 3161)</td>
      </tr>
      <tr>
        <td><strong>Fecha de Publicación</strong></td>
        <td>Octubre 2026</td>
      </tr>
      <tr>
        <td><strong>Órgano Rector</strong></td>
        <td>OGTIC — Dirección de Transformación Digital</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Registro Histórico de Cambios (Changelog)

### [Release v1.0.0] - Octubre 2026 (Actual)
* **Unificación Oficial:** Integración completa de las directrices técnicas de `ogticrd/xroad-members` y `ogticrd/xroad-instalacion`.
* **Actualización Tecnológica:** Adopción obligatoria del despliegue en contenedores Docker Sidecar v7.8.2 con PostgreSQL 12 interno y variables de entorno `.env`.
* **Diagramación Técnica:** Incorporación de diagramas Mermaid para arquitectura federada, secuencias criptográficas mTLS y topología de red perimetral.
* **Gobernanza Criptográfica:** Procedimiento formal para generación de llaves `AUTH` y `SIGN`, empaquetado de CSRs y aprobación telemática de servidores.
* **Estandarización de Nomenclatura:** Publicación de la lista estricta de convenciones en mayúsculas y catálogo de nombres prohibidos para subsistemas.
* **Integración CI/CD:** Flujo de trabajo automatizado para publicación en GitHub Pages con soporte de versionado visual.

---

### [Release v0.9.0 - Legado] - Histórico (Obsoleto)
* **Descripción:** Implementación inicial en paquetes Debian (`.deb`) de la versión X-Road 6.22 sobre Ubuntu 18.04 LTS.
* **Estado:** **OBSOLETO / DEPRECATED**. No debe utilizarse para nuevos despliegues. Preservado únicamente para fines de auditoría histórica en [Método Legado v6.22](/instalacion/metodo-legado-v6).

---

## Matriz de Soporte y Compatibilidad

| Componente | Versión Soportada | Estado de Soporte | Notas |
| :--- | :--- | :--- | :--- |
| **X-Road Security Server** | `7.8.2` | 🟢 Soporte Pleno | Imagen recomendada por OGTIC y NIIS. |
| **X-Road Security Server** | `< 7.0` | 🔴 Fin de Vida | Requiere actualización obligatoria. |
| **Ubuntu Server** | `22.04 LTS` | 🟢 Homologado | Plataforma base recomendada. |
| **Docker Engine** | `20.10+ / 24+` | 🟢 Soportado | Compatible con plugin Docker Compose v2. |
| **Protocolo de Consultas** | `REST (/r1/...)` | 🟢 Estándar PUI | Recomendado para microservicios y APIs. |
| **Protocolo SOAP** | `SOAP 1.1 / 1.2` | 🟡 Soportado | Compatible para servicios heredados. |

---

## Notificación de Nuevas Versiones y Actualizaciones

Cualquier actualización en los componentes de la red (nuevas anclas de configuración XML, renovaciones de CAs o actualizaciones de la imagen Docker de X-Road) será notificada por OGTIC a través de:
* **Boletín Técnico:** Enviado a los contactos técnicos registrados por cada institución miembro.
* **Canal Oficial:** `interoperabilidad@ogtic.gob.do`.
* **Repositorio de Referencia:** Actualizaciones en la rama `main` del repositorio oficial.
