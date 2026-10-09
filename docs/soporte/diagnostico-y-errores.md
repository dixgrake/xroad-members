---
id: diagnostico-y-errores
title: Diagnóstico de Fallos y Solución de Errores Comunes
sidebar_label: 7.2 Solución de Errores
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Esta guía reúne las incidencias más frecuentes reportadas durante la instalación, configuración e interoperabilidad en la red, junto con sus métodos exactos de resolución.

---

## Matriz de Diagnóstico Rápido

| Síntoma o Error | Componente Afectado | Causa Principal | Acción Correctiva |
| :--- | :--- | :--- | :--- |
| **Carga infinita tras subir ancla XML** | Inicialización Web | Puerto 80 saliente bloqueado hacia CS | Habilitar salida TCP 80 hacia `cs.xroad.digital.gob.do`. |
| **Alerta roja: "Soft Token is locked"** | Soft Token | Contenedor reiniciado sin PIN automático | Ingresar a `:4000`, pulsar "Log in" e introducir el PIN del token. |
| **`Client is not authorized` (HTTP 403)** | Consumo de API | Falta regla ACL en el productor | El productor debe agregar al subsistema consumidor en `Service clients`. |
| **`Unknown service` (HTTP 404)** | Consumo de API | Servicio no registrado o deshabilitado | Verificar código del servicio y que el switch esté activo en el productor. |
| **`Connection timed out: 5500`** | Red Interinstitucional | Firewall externo bloquea el puerto 5500 | Abrir TCP 5500 entrante y saliente en la IP pública del servidor. |
| **`Timestamping failed`** | Sellado de Tiempo | Reloj desfasado o TSA no configurada | Sincronizar reloj con `chrony` y verificar el servicio `sello`. |
| **El nombre de la institución no aparece al tipear las siglas** | Asistente de Registro | Siglas no dadas de alta en el Servidor Central | Contactar a `interoperabilidad@ogtic.gob.do` para registrar el miembro. |

---

## 1. Problemas de Inicialización y Red Central

### Error: La pantalla se queda congelada al subir `configuration_anchor_DO.xml`
* **Explicación:** El Servidor de Seguridad lee la clave pública del XML y se conecta de inmediato a `http://cs.xroad.digital.gob.do/internalconf` para descargar la lista global de certificados. Si el servidor no tiene resolución DNS o salida por el puerto 80, la petición web queda esperando indefinidamente.
* **Diagnóstico en Terminal:**
  ```bash
  # 1. Probar resolución de nombres
  host cs.xroad.digital.gob.do

  # 2. Probar conectividad HTTP al Servidor Central
  curl -Iv http://cs.xroad.digital.gob.do/internalconf
  ```
* **Solución:** Configure los servidores DNS institucionales en `/etc/resolv.conf` y permita el tráfico saliente por el puerto TCP 80.

---

## 2. Problemas con Tokens y Certificados

### Error: "Token PIN is incorrect" o Token Inaccesible
* **Causa:** El PIN ingresado no coincide con el utilizado cuando se generó el almacén en la base de datos interna.
* **Solución:** Verifique el valor de `XROAD_TOKEN_PIN` en su archivo `.env`. Si el PIN se olvidó y aún no ha tramitado certificados de producción, puede reiniciar el nodo limpiamente ejecutando `sudo docker compose down -v` y volver a inicializar con un PIN conocido.

### Error: "Certificate authentication failed" o Certificado Expirado
* **Diagnóstico:** Ingrese a **"Keys and certificates"**.
* **Solución:**
  * Verifique que el certificado `AUTH` esté en estado **Approved / Registered** con círculo verde.
  * Si figura como inactivo (*Disabled*), selecciónelo y haga clic en **Activate**.
  * Si la fecha de validez ha expirado, genere un nuevo CSR y solicite renovación a `interoperabilidad@ogtic.gob.do`.

---

## 3. Problemas de Consumo de APIs y Cabeceras

### Error HTTP 403: `X-Road-Error: Server.ClientProxy.AccessDenied`
* **Explicación:** Su Servidor de Seguridad pudo comunicarse con el Servidor de Seguridad de la otra institución, pero este último rechazó la petición porque el subsistema emisor no tiene permiso de acceso concedido en sus listas ACL.
* **Solución:**
  1. Revise el valor de la cabecera `X-Road-Client` en su petición (ej: `DO/GOB/MI_INSTITUCION/MI_SUBSISTEMA`).
  2. Contacte a la institución proveedora para que ingrese a su subsistema -> **Service clients** y agregue su subsistema a la lista de autorizados.

### Error: `X-Road-Error: Server.ServerProxy.ServiceFailed`
* **Explicación:** El Servidor de Seguridad del proveedor recibió la petición, pero **su API o microservicio interno de backend no respondió** o retornó un error 500.
* **Solución:** El equipo del proveedor debe revisar que la URL interna registrada en el servicio (`http://192.168.x.x:8080/...`) esté encendida y accesible desde el contenedor del Servidor de Seguridad.

---

## 4. Comandos de Diagnóstico en el Servidor Ubuntu

Para inspeccionar el funcionamiento interno del contenedor en cualquier momento:

```bash
# Ver estado del contenedor y puertos escuchando
sudo docker ps

# Ver las últimas 100 líneas de la bitácora del Servidor de Seguridad
sudo docker compose logs --tail=100 ss

# Seguir el registro en vivo mientras realiza una consulta
sudo docker compose logs -f ss

# Verificar puertos abiertos en el host Ubuntu
sudo ss -tulpn | grep -E '4000|5500|5577|443'

# Probar conectividad con un Servidor de Seguridad externo (ej: puerto 5500)
nc -zv ss1.otra-institucion.gob.do 5500
```

Continúe a la sección [8.1 Publicación en GitHub Pages CI/CD](/ci-cd/publicacion-github-pages) para configurar el despliegue automatizado.
