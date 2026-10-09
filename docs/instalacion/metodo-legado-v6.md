---
id: metodo-legado-v6
title: Instalación Clásica en Bare Metal (Versión 6.22 - Obsoleta)
sidebar_label: 3.3 Método Legado (v6.22 Obsoleto)
---

:::caution AVISO DE OBSOLESCENCIA TÉCNICA
**Esta sección documenta la instalación nativa de la versión 6.22 sobre Ubuntu 18.04 LTS, la cual se encuentra oficialmente OBSOLETA.**
Esta documentación se preserva con fines estrictamente informativos, de auditoría y para instituciones que mantengan servidores antiguos en proceso de migración hacia la versión **7.8.2** mediante contenedores Docker Sidecar.
:::

---

## Diferencias entre la Versión 6.22 y la Versión 7.x

| Aspecto | Versión Antigua (6.22) | Versión Actual (7.8.2 Sidecar) |
| :--- | :--- | :--- |
| **Plataforma Soportada** | Ubuntu 18.04 LTS (Fin de soporte estándar) | Ubuntu 22.04 LTS y contenedores OCI |
| **Mecanismo de Despliegue** | Múltiples paquetes `.deb` instalados con `dpkg` | Contenedor unificado oficial (`niis/xroad-security-server-sidecar`) |
| **Gestión de Dependencias** | Conflictos de dependencias entre paquetes Nginx/Postgres | Contenedor autocontenido con dependencias aisladas |
| **Actualización** | Procedimiento manual complejo paquete por paquete | Cambio de tag de imagen en `docker-compose.yml` |

---

## Pasos Históricos de Instalación v6.22

Para fines de consulta, los pasos que se utilizaban en los primeros despliegues de la red eran los siguientes:

### 1. Eliminación de Servidores Web Preexistentes
La versión clásica requería desinstalar Apache o Nginx estándar para evitar colisiones con el paquete propietario `xroad-nginx`:
```bash
sudo apt remove --purge apache2 nginx
```

### 2. Descarga de Paquetes desde el Repositorio de OGTIC
```bash
wget -q --show-progress -r -nH http://cs.ogtic.gob.do/paquetes/
```

### 3. Instalación de Dependencias del Sistema
```bash
sudo apt install -y openjdk-8-jre-headless ca-certificates-java ntp unzip expect net-tools \
    postgresql postgresql-contrib postgresql-client crudini rlwrap curl debconf \
    rsyslog libmhash2 authbind nginx-light
```

### 4. Instalación Manual de Paquetes `.deb` de X-Road
Se debían instalar en estricto orden secuencial:
1. **Paquetes Base y Signer:**
   ```bash
   sudo dpkg -i xroad-base_6.22.0*.deb \
                xroad-jetty9_6.22.0*.deb \
                xroad-signer_6.22.0*.deb \
                xroad-nginx_6.22.0*.deb \
                xroad-confclient_6.22.0*.deb
   ```
2. **Reinicio de Base de Datos para Migraciones:**
   ```bash
   sudo service postgresql restart
   ```
3. **Proxy y Monitores:**
   ```bash
   sudo dpkg -i xroad-proxy_6.22.0*.deb \
                xroad-monitor_6.22.0*.deb \
                xroad-opmonitor_6.22.0*.deb \
                xroad-addon-opmonitoring_6.22.0*.deb
   ```
4. **Metaservicios y Addons:**
   ```bash
   sudo dpkg -i xroad-addon-metaservices_6.22.0*.deb \
                xroad-addon-messagelog_6.22.0*.deb \
                xroad-addon-proxymonitor_6.22.0*.deb \
                xroad-addon-wsdlvalidator_6.22.0*.deb
   ```
5. **Security Server y Autologin:**
   ```bash
   sudo dpkg -i xroad-securityserver_6.22.0*.deb xroad-autologin_6.22.0*.deb
   ```

:::tip Recomendación de Migración
Si su institución opera actualmente una instancia v6.22, se exhorta a coordinar con `interoperabilidad@ogtic.gob.do` la migración hacia la versión 7.8.2 descrita en el capítulo [3.1 Despliegue con Docker Sidecar](/instalacion/docker-sidecar).
:::
