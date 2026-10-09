---
id: glosario
title: Términos y Abreviaciones Oficiales
sidebar_label: 1.3 Glosario Oficial
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
  <img src={useBaseUrl('/img/presidencia.svg')} alt="Escudo Nacional" width="70" />
</div>

A continuación se presentan los conceptos y abreviaciones fundamentales utilizados formalmente en la red de interoperabilidad **X-Road** y por la **OGTIC**.

---

### CA (Autoridad Certificadora / Certification Authority)
Entidad de confianza encargada de emitir y revocar certificados digitales X.509 para:
* **Certificados de Autenticación (`AUTH`):** Protegen la conexión mTLS directa entre Servidores de Seguridad.
* **Certificados de Firma (`SIGN`):** Permiten a las entidades miembros firmar digitalmente cada transacción o mensaje.

Los Servidores de Seguridad solo aceptan certificados emitidos por las CAs explícitamente registradas en el Servidor Central.

---

### TSA (Autoridad de Sellado de Tiempo / Timestamping Authority)
Servicio oficial de emisión de marcas de tiempo criptográficas según el estándar RFC 3161.
* Su propósito es **certificar la existencia fehaciente de un conjunto de datos en un instante de tiempo específico**.
* Los Servidores de Seguridad agrupan mensajes y solicitan el sellado de tiempo a la TSA de forma periódica mediante un proceso por lotes (*batch*), lo que garantiza eficiencia sin saturar la red.

---

### CS (Servidor Central de Configuraciones / Central Server)
Componente central administrado por OGTIC (`cs.xroad.digital.gob.do`).
* Contiene el catálogo oficial de instituciones miembros y servidores de seguridad autorizados.
* Mantiene y publica la política de seguridad global, incluyendo las CAs confiables, TSAs autorizadas y parámetros de red.
* Publica la configuración global accesible por HTTP en la URL `/internalconf`.

---

### SS (Servidor de Seguridad / Security Server)
Nodo o compuerta técnica que cada institución instala y opera para conectarse a la red.
* Actúa como intermediario seguro entre las aplicaciones internas de la entidad y la red externa de X-Road.
* Encapsula la gestión de llaves criptográficas, el sellado de tiempo, la auditoría forense (`messagelog`) y la ejecución de políticas de acceso (ACL).

---

### CSR (Solicitud de Firma de Certificado / Certificate Signing Request)
Mensaje codificado en formato PKCS#10 generado por el Servidor de Seguridad desde su almacén de llaves (*Soft Token*). Contiene la clave pública de la entidad y los identificadores institucionales. Se envía a OGTIC para que la CA correspondiente emita el certificado digital oficial.

---

### OCSP (Protocolo de Estado de Certificados en Línea)
Protocolo de red utilizado para consultar en tiempo real si un certificado digital se encuentra revocado o vigente, sin necesidad de descargar listas completas de revocación (CRLs). Los Servidores de Seguridad intercambian respuestas OCSP entre sí para acelerar la verificación.

---

### Soft Token
Almacén criptográfico basado en software que se ejecuta dentro del contenedor del Servidor de Seguridad. Está protegido por un **código PIN** maestro que el administrador debe ingresar cada vez que se reinicia el servicio para desbloquear las llaves privadas de autenticación y firma.

---

### Ancla de Configuración (Configuration Anchor)
Archivo en formato XML firmado digitalmente por los operadores del Servidor Central. Es el documento de confianza inicial que se sube al configurar por primera vez un Servidor de Seguridad; contiene la clave pública de verificación del CS y la URL donde el servidor descargará el resto de la configuración de la red.

---

### Subsistema (Subsystem)
Subdivisión lógica del sistema de información de una institución miembro.
* Permite aislar y categorizar proyectos de interoperabilidad dentro de una misma institución (por ejemplo, `VALIDADOR`, `NOMINA`, `CONSULTA_CIUDADANO`).
* Los derechos de acceso y los servicios se asignan a nivel de subsistema, lo que garantiza el principio de mínimo privilegio.

---

### Clase de Miembro (Member Class)
Categoría a la que pertenece una institución dentro del registro del Estado:
* **`GOB`**: Entidades del gobierno y sector público dominicano.
* **`COM`**: Empresas privadas y sector comercial regulado.

Continúe a la sección [2.1 Requisitos de Infraestructura](/requisitos/infraestructura).
