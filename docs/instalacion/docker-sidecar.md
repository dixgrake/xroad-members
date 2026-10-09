---
id: docker-sidecar
title: Despliegue con Docker Compose (Sidecar 7.8.2)
sidebar_label: 3.1 Instalación con Docker
---

import useBaseUrl from '@docusaurus/useBaseUrl';

El método oficial y recomendado por la **OGTIC** para desplegar el Servidor de Seguridad de X-Road en la República Dominicana se basa en la imagen de contenedor oficial **`niis/xroad-security-server-sidecar:7.8.2`**. Este enfoque garantiza portabilidad, aislamiento del sistema operativo base y actualizaciones controladas.

---

## 1. Instalación del Motor de Contenedores

En su servidor virtual con **Ubuntu 22.04 LTS**, proceda a instalar Docker y Docker Compose:

### Opción A: Mediante Snap (Recomendado en la guía oficial)
```bash
sudo snap install docker
```

### Opción B: Mediante Repositorios Oficiales de Docker (APT)
```bash
# Instalar utilidades previas
sudo apt update && sudo apt install -y ca-certificates curl gnupg lsb-release

# Agregar clave GPG oficial de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Agregar repositorio
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker Engine y Plugin Compose
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

---

## 2. Preparación del Directorio de Despliegue

Cree un directorio de trabajo en el servidor o descargue los archivos del repositorio oficial:

```bash
# Crear directorio de trabajo
mkdir -p ~/xroad-members && cd ~/xroad-members
```

---

## 3. Archivo `docker-compose.yml`

Cree el archivo `docker-compose.yml` con la siguiente definición oficial:

```yaml title="docker-compose.yml"
version: "3.9"

services:
  ss:
    image: niis/xroad-security-server-sidecar:7.8.2
    container_name: xroad-security-server
    networks:
      xroad_net:
    ports:
      # Puerto de acceso seguro para sistemas de información internos (mTLS/Proxy)
      - "443:8443"
      # Interfaz gráfica de administración web y REST Management API
      - "4000:4000"
      # Protocolo de interoperabilidad y transporte seguro entre servidores X-Road
      - "5500:5500"
      # Protocolo de intercambio de respuestas OCSP
      - "5577:5577"
      # Monitoreo y métricas operativas
      - "5588:5588"
    volumes:
      # Configuraciones de X-Road (/etc/xroad)
      - xroad_config:/etc/xroad
      # Almacenes de llaves, tokens y archivos de ejecución (/var/lib/xroad)
      - xroad_files:/var/lib/xroad
      # Base de datos interna PostgreSQL 12 para bitácora y catálogos
      - xroad_db:/var/lib/postgresql/12/main
    environment:
      - XROAD_TOKEN_PIN
      - XROAD_ADMIN_USER
      - XROAD_ADMIN_PASSWORD
      - XROAD_LOG_LEVEL
    restart: unless-stopped

volumes:
  xroad_config:
    driver: local
  xroad_files:
    driver: local
  xroad_db:
    driver: local

networks:
  xroad_net:
    driver: bridge
```

---

## 4. Archivo de Variables de Entorno (`.env`)

Cree el archivo `.env` en el mismo directorio donde se ubica el `docker-compose.yml`:

```bash
cp .env.example .env 2>/dev/null || touch .env
nano .env
```

Defina los siguientes parámetros obligatorios:

```ini title=".env"
# PIN maestro para desbloquear el almacén criptográfico Soft Token (mínimo 6 caracteres)
# IMPORTANTE: Guarde este PIN de forma segura; deberá ingresarlo en el asistente web.
XROAD_TOKEN_PIN=MiClaveSuperSegura123!

# Usuario administrador de la consola web
# ¡ADVERTENCIA: NO utilizar el nombre "xroad" por ser una cuenta reservada del sistema!
XROAD_ADMIN_USER=adminpui

# Contraseña robusta para el usuario administrador web
XROAD_ADMIN_PASSWORD=ContrasenaInstitucionalFuerte2026#

# Nivel de detalle de la bitácora (DEBUG, INFO, WARN, ERROR)
XROAD_LOG_LEVEL=INFO
```

:::danger Reglas Indispensables para las Credenciales
1. **No use `xroad` como `XROAD_ADMIN_USER`:** La imagen interna contiene un usuario de sistema denominado `xroad`. Si define este nombre, la inicialización del contenedor fallará al intentar crear un usuario duplicado.
2. **Conserve el `XROAD_TOKEN_PIN`:** Este PIN cifra las llaves criptográficas generadas en el almacén de tokens. Si se pierde, no se podrán recuperar los certificados ni firmar mensajes.
:::

---

## 5. Lanzamiento y Verificación del Servicio

Inicie el contenedor en segundo plano:

```bash
sudo docker compose up -d
```
*(Si utiliza el ejecutable clásico de snap o docker-compose v1, ejecute `sudo docker-compose up -d`).*

### Inspección de Bitácora y Estado:
```bash
# Verificar que el contenedor esté en ejecución (STATUS: Up)
sudo docker ps

# Ver la bitácora de arranque en tiempo real
sudo docker compose logs -f ss
```

Una vez que la bitácora muestre que los servicios de Jetty, PostgreSQL y Signer han iniciado correctamente, puede acceder a la consola web desde un navegador dentro de su red local:

```text
https://ss1.tu-institucion.gob.do:4000
```
*(O provisionalmente vía `https://<IP_LOCAL_DEL_SERVIDOR>:4000`).*

:::note Aceptación de Certificado Autofirmado Inicial
Durante el primer arranque, el servidor presenta un certificado TLS autofirmado generado internamente para la consola de administración. Su navegador mostrará una advertencia de seguridad habitual ("Sitio no seguro"). Puede proceder con seguridad haciendo clic en **Avanzado -> Continuar**.
:::

Continúe a la sección [4.1 Ancla y Registro de Miembro](/configuracion/ancla-y-registro) para iniciar la configuración del nodo.
