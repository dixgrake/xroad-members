---
id: preguntas-frecuentes
title: Preguntas Frecuentes (FAQ)
sidebar_label: 7.1 Preguntas Frecuentes
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A continuación se responden las dudas más habituales planteadas por los equipos directivos y técnicos de las instituciones del Estado Dominicano al incorporarse a la **Plataforma Única de Interoperabilidad (PUI)**.

---

## Preguntas Generales y de Negocio

### ¿Qué tipo de información se puede intercambiar a través de X-Road?
**X-Road es un marco de intercambio de propósito general.** Prácticamente no existen límites en cuanto a la tipología de datos. Es posible intercambiar estructuras ligeras en formato JSON (APIs REST), esquemas XML (servicios SOAP), texto plano o archivos binarios.

---

### ¿Es posible transferir documentos y archivos (PDF, Office, imágenes)?
**Sí, absolutamente.** La plataforma permite el envío y recepción de documentos en formato PDF, hojas de cálculo de Excel, documentos de Word, presentaciones, imágenes diagnósticas u otros archivos binarios, ya sea codificados en Base64 o como cargas útiles adjuntas en las solicitudes.

---

### Si se envían documentos con firma digital previa, ¿se compromete o pierde la validez de dicha firma?
**No.** La infraestructura de X-Road transporta la información con absoluta fidelidad y preservación de bytes de extremo a extremo. Los documentos que ya cuenten con una firma digital cualificada conservan íntegramente sus propiedades criptográficas, metadatos y validez jurídica. Adicionalmente, X-Road añade una capa extra de firma institucional y sellado de tiempo al paquete de transporte.

---

### ¿Se pueden intercambiar archivos pesados (100 MB, 300 MB o 500 MB)?
**Sí.** El Servidor de Seguridad está configurado de manera predeterminada para registrar (*loguear*) cada mensaje completo en su base de datos local para auditoría. Cuando se manejan archivos de gran tamaño:
* Se puede ajustar el parámetro de tamaño máximo de mensaje en la configuración de `messagelog`.
* Es posible configurar el registro para almacenar únicamente las cabeceras (*hash/digest*) sin guardar el cuerpo pesado del archivo en disco.
* Para transferencias masivas continuas, se recomienda coordinar la política de almacenamiento de logs con los administradores de infraestructura.

---

### ¿Qué nivel de seguridad ofrece la plataforma?
La seguridad es el núcleo fundamental de X-Road:
* **Autenticación Fuerte:** Ningún nodo puede conectarse a la red sin un certificado de autenticación emitido por la CA oficial y aprobado por el Servidor Central.
* **Canal Cifrado Punto a Punto (mTLS):** Los datos viajan cifrados directamente entre las dos instituciones, sin intermediarios.
* **Firmas Digitales Institucionales:** Cada mensaje va firmado con la llave criptográfica de la entidad.
* **No Repudio:** La Autoridad de Sellado de Tiempo (TSA) añade una estampa temporal verificable que prueba legalmente que el mensaje existió y fue entregado en ese segundo exacto.

---

## Preguntas Técnicas y de Integración

### No recibo la respuesta esperada en mi aplicación. ¿Cómo sé si el fallo se originó en X-Road o en la API destino?
La forma más rápida de determinar el origen de una incidencia es **inspeccionar las cabeceras HTTP de la respuesta**:
1. **Si la respuesta incluye la cabecera `X-Road-Error`:** El fallo ocurrió en la red de interoperabilidad (por ejemplo: falta de permisos ACL, certificado remoto expirado, timeout de red entre servidores).
2. **Si la respuesta incluye la cabecera `X-Road-Id` pero con un código HTTP 400, 404 o 500 del backend:** Significa que **X-Road funcionó a la perfección y entregó la petición al sistema destino**, pero la API interna de la institución productora arrojó un error en su lógica de negocio.

---

### ¿Qué pasa si reinicio el servidor anfitrión o el contenedor Docker?
Al reiniciar el contenedor, el servicio volverá a levantar automáticamente gracias a la política `restart: unless-stopped`. Si la variable `XROAD_TOKEN_PIN` en su archivo `.env` coincide con el PIN asignado al Soft Token durante la inicialización, el sistema desbloqueará el almacén de llaves de forma automática. Si no es así, deberá ingresar manualmente a `https://ss1.institucion.gob.do:4000` y pulsar **Log in** en el Soft Token.

---

### ¿Por qué Postman arroja error de certificado SSL al llamar a `https://127.0.0.1/r1/...`?
El Servidor de Seguridad expone un certificado autofirmado en su interfaz local interna. Para desarrollo o pruebas en Postman, desactive la casilla **"SSL certificate verification"** en la configuración general de Postman. En código de producción (Node.js/Python), configure su cliente HTTP para confiar en la CA interna o pasar el certificado local.

Continúe a la sección [7.2 Diagnóstico y Solución de Errores](/soporte/diagnostico-y-errores).
