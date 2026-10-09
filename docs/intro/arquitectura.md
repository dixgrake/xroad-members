---
id: arquitectura
title: Arquitectura del Ecosistema X-Road
sidebar_label: 1.2 Arquitectura Técnica
---

import useBaseUrl from '@docusaurus/useBaseUrl';

La arquitectura de la Plataforma Única de Interoperabilidad (PUI) implementa un modelo **federado y distribuido**, donde la seguridad no depende de intermediarios centralizados que lean el contenido de los mensajes, sino de la criptografía de extremo a extremo gestionada por los **Servidores de Seguridad (Security Servers)** de cada miembro.

---

## Diagrama de Arquitectura Oficial

<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <img 
    src={useBaseUrl('/img/arquitectura.jpg')} 
    alt="Arquitectura General de X-Road en la República Dominicana" 
    className="doc-screenshot"
    style={{maxHeight: '480px'}}
  />
  <p><em>Figura 1: Topología general de comunicación entre entidades y componentes centrales.</em></p>
</div>

---

## Diagrama de Interacción entre Componentes

El siguiente diagrama detalla cómo interactúan los componentes centrales y los nodos de las instituciones:

```mermaid
graph TB
    subgraph OGTIC_Central [Infraestructura Central - OGTIC]
        CS[Servidor Central CS<br/>cs.xroad.digital.gob.do]
        CA[Autoridad Certificadora CA<br/>Emisión de Certificados AUTH y SIGN]
        TSA[Autoridad de Sellado de Tiempo TSA<br/>Protocolo RFC 3161 - 'sello']
        CP[Configuration Proxy<br/>Descarga de Global Conf HTTP 80]
    end

    subgraph Institucion_Consumidora [Institución A - Consumidor ej: OGTIC]
        IS_A[Sistema de Información A<br/>App Web / Backend]
        SS_A[Servidor de Seguridad SS1<br/>ss1.institucion-a.gob.do]
        IS_A -->|HTTP/REST interno :443| SS_A
    end

    subgraph Institucion_Productora [Institución B - Productor ej: JCE]
        SS_B[Servidor de Seguridad SS1<br/>ss1.institucion-b.gob.do]
        IS_B[API / Base de Datos Interna<br/>Servicio REST de Datos]
        SS_B -->|HTTP/REST interno| IS_B
    end

    %% Sincronización Global
    CS -.->|Configuración Global| CP
    CP -.->|Descarga Periódica HTTP 80| SS_A
    CP -.->|Descarga Periódica HTTP 80| SS_B

    %% Validación Criptográfica
    CA -.->|Validación OCSP TCP 5577| SS_A
    CA -.->|Validación OCSP TCP 5577| SS_B
    SS_A -.->|Sellado de Tiempo HTTP 80/443| TSA
    SS_B -.->|Sellado de Tiempo HTTP 80/443| TSA

    %% Comunicación Punto a Punto
    SS_A ===|Canal Seguro mTLS + Cifrado + Firma Digital TCP 5500| SS_B
```

---

## Componentes del Ecosistema

### 1. Servidor Central (Central Server - CS)
* **Función:** Es el núcleo de gobernanza y configuración administrado por OGTIC.
* **Responsabilidades:**
  * Almacena el registro único de todos los miembros autorizados del Estado Dominicano y sus códigos oficiales.
  * Mantiene la lista de Servidores de Seguridad válidos y sus nombres DNS públicos.
  * Publica la lista de Autoridades Certificadoras (CA) y Autoridades de Sellado de Tiempo (TSA) de confianza.
  * Genera el archivo firmado de **Configuración Global** (`globalconf`) que todos los Servidores de Seguridad descargan periódicamente.

### 2. Servidores de Seguridad (Security Servers - SS)
* **Función:** Es el gateway criptográfico que cada institución miembro despliega y administra en su propia infraestructura.
* **Responsabilidades:**
  * **Autenticación mTLS:** Establece canales cifrados TLS mutuos con otros Servidores de Seguridad utilizando el certificado de autenticación (`AUTH`).
  * **Firma Digital de Mensajes:** Firma criptográficamente cada petición saliente y valida la firma de cada petición entrante utilizando el certificado de firma (`SIGN`).
  * **Sellado de Tiempo (Timestamping):** Envía resúmenes periódicos de los mensajes a la TSA para estampar la marca de tiempo legal.
  * **Bitácora de Auditoría (MessageLog):** Registra cada transacción de forma segura y no repudiable en su base de datos PostgreSQL local.
  * **Control de Acceso (ACL):** Permite o deniega el acceso a los servicios basándose en el identificador del subsistema consumidor.

### 3. Autoridad Certificadora (CA)
* **Función:** Emite y revoca los certificados digitales para los miembros:
  * **Certificados de Autenticación (AUTH):** Asociados al nombre de dominio DNS del Servidor de Seguridad.
  * **Certificados de Firma (SIGN):** Asociados a la persona jurídica (miembro institucional).
* **Protocolo OCSP:** Expone el protocolo de estado de certificados en línea para verificar en tiempo real si un certificado sigue siendo válido.

### 4. Autoridad de Sellado de Tiempo (TSA)
* **Función:** Emite estampas de tiempo digitales certificadas según el estándar RFC 3161.
* **Eficiencia por lotes:** Los Servidores de Seguridad aplican un algoritmo de sellado por lotes (*batch timestamping*), agrupando múltiples transacciones en un solo sello, lo que mantiene el rendimiento alto sin sobrecargar el servicio de la TSA.

---

## Flujo Secuencial de una Consulta entre Instituciones

El siguiente diagrama de secuencia describe el recorrido de un mensaje desde que un sistema consumidor solicita información hasta que el productor responde:

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Sistema Consumidor (IS-A)
    participant SSA as SS Consumidor (SS-A)
    participant CS as Servidor Central / CA / TSA
    participant SSB as SS Productor (SS-B)
    participant ISB as API Proveedor (IS-B)

    Note over Dev,SSA: 1. Petición Interna en Red Local
    Dev->>SSA: GET /r1/DO/GOB/PROVEEDOR/SERVICIO/ENDPOINT<br/>Header: X-Road-Client: DO/GOB/CONSUMIDOR/SUBSISTEMA
    
    Note over SSA,CS: 2. Validación de Políticas y Criptografía
    SSA->>CS: Verifica vigencia de certificados (OCSP)
    SSA->>SSA: Firma el mensaje con Llave SIGN local
    
    Note over SSA,SSB: 3. Interoperabilidad Punto a Punto (Internet)
    SSA->>SSB: Conexión mTLS cifrada (Puerto TCP 5500)<br/>Envío de mensaje firmado + Certificados
    
    Note over SSB,CS: 4. Validación en el Servidor Productor
    SSB->>CS: Verifica certificado del Consumidor (OCSP)
    SSB->>SSB: Valida firma digital y verifica permisos ACL
    
    Note over SSB,ISB: 5. Reenvío al Servicio Local
    SSB->>ISB: GET /api/v1/recurso (Petición interna)
    ISB-->>SSB: 200 OK + Payload JSON de datos
    
    Note over SSB,SSA: 6. Firma y Retorno de Respuesta
    SSB->>SSB: Firma respuesta con Llave SIGN local
    SSB-->>SSA: 200 OK + Payload cifrado por mTLS (Puerto 5500)
    
    Note over SSA,Dev: 7. Registro de Auditoría y Entrega
    SSA->>CS: Solicita sellado de tiempo de la transacción a TSA
    SSA-->>Dev: 200 OK + JSON (con cabecera X-Road-Id)
```

Continúe a la sección [1.3 Términos y Abreviaciones](/intro/glosario) para conocer el vocabulario técnico oficial.
