---
id: desinstalacion
title: Desinstalación y Limpieza de Volúmenes
sidebar_label: 3.2 Desinstalación
---

En caso de requerir restablecer el Servidor de Seguridad a su estado inicial, realizar una reinstalación limpia o retirar el nodo de servicio, siga este procedimiento oficial.

---

## Procedimiento de Eliminación Completa

1. Diríjase a la carpeta donde reside el archivo `docker-compose.yml`:
   ```bash
   cd ~/xroad-members
   ```

2. Detenga los contenedores y **destruya los volúmenes persistentes asociados**:
   ```bash
   sudo docker compose down -v
   ```
   *(O `sudo docker-compose down -v` si usa Docker Compose v1).*

:::danger Consecuencias del Parámetro `-v`
El flag `-v` (`--volumes`) instruye a Docker para eliminar permanentemente los tres volúmenes con datos:
* `xroad_config`: Archivos de configuración y anclas importadas.
* `xroad_files`: Almacén de Soft Token y llaves privadas.
* `xroad_db`: Base de datos PostgreSQL con el catálogo local y la bitácora histórica de transacciones (`messagelog`).

Si no desea perder las llaves ni la base de datos de auditoría, omita el parámetro `-v` y ejecute únicamente `sudo docker compose down`.
:::

---

## Verificación de Limpieza de Recursos

Para garantizar que no queden volúmenes huérfanos ocupando espacio en disco:

```bash
# Listar volúmenes remanentes de xroad
sudo docker volume ls | grep xroad

# Si existiese algún volumen remanente, eliminarlo manualmente:
sudo docker volume rm xroad-members_xroad_config xroad-members_xroad_files xroad-members_xroad_db 2>/dev/null || true
```

Con este paso, el componente técnico del Servidor de Seguridad queda completamente desinstalado del servidor anfitrión.
