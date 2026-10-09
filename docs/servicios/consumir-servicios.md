---
id: consumir-servicios
title: Consumo de Servicios REST entre Instituciones
sidebar_label: 6.2 Consumir Servicios (Consumidor)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Para que las aplicaciones y sistemas de información de su institución consuman un servicio publicado por otra entidad del Estado Dominicano en la PUI, las peticiones deben dirigirse **a su propio Servidor de Seguridad local**.

El Servidor de Seguridad local se encarga de:
1. Identificar la institución destino a través del Servidor Central.
2. Establecer el canal cifrado mTLS con el Servidor de Seguridad remoto.
3. Firmar digitalmente la petición con su llave institucional `SIGN`.
4. Estampar el sello de tiempo con la TSA.
5. Devolver la respuesta directamente a su aplicación.

---

## Anatomía de la Petición X-Road

Para consumir un servicio remoto, necesita conocer cinco componentes clave del proveedor:

| Parámetro | Descripción | Ejemplo Real |
| :--- | :--- | :--- |
| **`CountryCode`** | Código de país de la instancia | `DO` |
| **`MemberClass`** | Clase del miembro proveedor | `GOB` (o `COM`) |
| **`MemberName`** | Siglas oficiales de la entidad proveedora | `OGTIC`, `JCE`, `MSP` |
| **`Service`** | Código del servicio publicado por el proveedor | `EMPLEADOS`, `CONSULTA_PADRON` |
| **`Endpoint`** | Ruta relativa o recurso solicitado | `consulta/40200000000` |

---

## Formato Estándar de la URL (`/r1/`)

La petición HTTP **debe enviarse a la dirección de su propio Servidor de Seguridad local** (en el puerto 443 o la IP de su red interna), utilizando el prefijo oficial `/r1/`:

```text
https://<IP_O_DOMINIO_SS_LOCAL>/r1/{CountryCode}/{MemberClass}/{MemberName}/{Service}/{Endpoint}
```

### Ejemplo Concreto:
Si su servidor de seguridad local está en `127.0.0.1` (o en su IP privada institucional `192.168.1.50`) y desea consultar el servicio `EMPLEADOS` provisto por `OGTIC`:

```text
https://127.0.0.1/r1/DO/GOB/OGTIC/EMPLEADOS/EjemploDeConsulta/40200000000
```

---

## Cabecera Obligatoria: `X-Road-Client`

Toda petición debe incluir imperativamente el encabezado HTTP **`X-Road-Client`**, el cual identifica cuál de los subsistemas de su institución está realizando la consulta:

```http
X-Road-Client: {CountryCode}/{MemberClass}/{SuInstitucion}/{SuSubsistema}
```

### Ejemplo:
Si su institución es `OGTIC` y el subsistema aprobado que realiza la consulta es `VALIDADOR`:
```http
X-Road-Client: DO/GOB/OGTIC/VALIDADOR
```

:::danger Autorización Previa Requerida
La institución que provee los datos debe haber otorgado permisos explícitos en sus listas de control de acceso (ACL) al cliente identificado en `X-Road-Client`. Si no lo ha hecho, la petición será rechazada con un código `403 Forbidden` y el error `Client is not authorized by the service provider`.
:::

---

## Verificación de Cabeceras de Respuesta

Cuando X-Road procesa una consulta, inyecta cabeceras HTTP especiales en la respuesta:

* **`X-Road-Id`**: Identificador UUID único de la transacción en la red. Si esta cabecera está presente en la respuesta, **confirma que el mensaje viajó exitosamente a través de la infraestructura criptográfica de X-Road**.
* **`X-Road-Error`**: Si ocurre algún fallo de red, de certificados o de autorización en el nodo remoto, esta cabecera contendrá el código y la descripción técnica del error.

---

## Ejemplos de Implementación de Código

### 1. Ejemplo con cURL
```bash
curl -k -X GET \
  "https://127.0.0.1/r1/DO/GOB/OGTIC/EMPLEADOS/EjemploDeConsulta/40200000000" \
  -H "X-Road-Client: DO/GOB/OGTIC/VALIDADOR" \
  -H "Accept: application/json"
```
*(El parámetro `-k` o `--insecure` desactiva la validación estricta del certificado SSL local durante pruebas internas).*

---

### 2. Ejemplo con Node.js (Fetch nativo o Axios)

```javascript title="consumo-xroad.js"
const https = require('https');

// En entornos de desarrollo o red interna con certificados autofirmados locales
const agent = new https.Agent({
  rejectUnauthorized: false
});

async function consultarServicioXRoad() {
  const url = 'https://127.0.0.1/r1/DO/GOB/OGTIC/EMPLEADOS/EjemploDeConsulta/40200000000';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Road-Client': 'DO/GOB/OGTIC/VALIDADOR',
        'Accept': 'application/json'
      },
      // Desactivar validación TLS solo para el gateway local en red interna
      agent
    });

    const xroadId = response.headers.get('x-road-id');
    const xroadError = response.headers.get('x-road-error');

    if (xroadError) {
      console.error('Error reportado por X-Road:', xroadError);
      return;
    }

    console.log(`Transacción exitosa. ID X-Road: ${xroadId}`);
    const data = await response.json();
    console.log('Datos recibidos:', data);
  } catch (error) {
    console.error('Error de conexión con el Servidor de Seguridad:', error);
  }
}

consultarServicioXRoad();
```

---

### 3. Ejemplo con Python (Requests)

```python title="consumo_xroad.py"
import requests

url = "https://127.0.0.1/r1/DO/GOB/OGTIC/EMPLEADOS/EjemploDeConsulta/40200000000"

headers = {
    "X-Road-Client": "DO/GOB/OGTIC/VALIDADOR",
    "Accept": "application/json"
}

try:
    # verify=False si su servidor local utiliza el certificado SSL autofirmado de pruebas
    response = requests.get(url, headers=headers, verify=False, timeout=10)
    
    # Inspección de cabeceras de trazabilidad
    xroad_id = response.headers.get("X-Road-Id")
    xroad_error = response.headers.get("X-Road-Error")
    
    if xroad_error:
        print(f"Error devuelto por la red X-Road: {xroad_error}")
    else:
        print(f"Éxito. UUID de Transacción: {xroad_id}")
        print("Respuesta:", response.json())
        
except requests.exceptions.RequestException as e:
    print(f"Error de conexión con el nodo local: {e}")
```

---

## Configuración en Postman

Al realizar pruebas desde **Postman**:
1. En la pestaña **Headers**, agregue la clave `X-Road-Client` con el valor `DO/GOB/<SU_INSTITUCION>/<SU_SUBSISTEMA>`.
2. Vaya a **Settings** (Configuración general de Postman) y **desactive la opción "SSL certificate verification"**.
3. Esto es necesario debido a que el Servidor de Seguridad expone un certificado autofirmado en el puerto local y Postman bloquearía la llamada de forma predeterminada. Deshabilitar esta opción dentro de la red corporativa no compromete la seguridad, ya que la comunicación mTLS externa entre servidores se valida de forma estricta e independiente.

Continúe a la sección [7.1 Preguntas Frecuentes](/soporte/preguntas-frecuentes).
