---
id: infraestructura
title: Requisitos de Servidor e Infraestructura
sidebar_label: 2.1 Requisitos de Servidor
---

Antes de proceder con el despliegue del Servidor de Seguridad de X-Road, el equipo de infraestructura de la institución debe cerciorarse de que el entorno cumpla con las especificaciones técnicas y de gobernanza establecidas por OGTIC.

---

## Especificaciones de Hardware

| Componente | Requisito Mínimo | Recomendado para Producción | Justificación Técnica |
| :--- | :--- | :--- | :--- |
| **Procesador (CPU)** | 2 vCPU (x86_64) | 4 vCPU | Operaciones criptográficas continuas (cifrado RSA/ECDSA, firmas y hashes). |
| **Memoria RAM** | 3 - 4 GB RAM | 8 GB RAM | El servicio ejecuta la JVM (Jetty), PostgreSQL interno y el agente criptográfico Signer. |
| **Almacenamiento** | 20 GB SSD | 50+ GB SSD | Almacena los mensajes firmados en bitácora (`messagelog`) y la base de datos de auditoría. |
| **Virtualización** | KVM, VMware, Hyper-V, AWS, Azure, GCP o Servidor Físico | Mismo estándar | Soporte nativo para virtualización y contenedores Docker. |

:::warning Requisitos de RAM para Módulos de Monitoreo Extendido
Si la institución decide habilitar módulos avanzados de recolección de métricas operativas (*OpMonitoring* masivo o analítica en tiempo real), la memoria RAM recomendada asciende a un mínimo de **12 a 16 GB**.
:::

---

## Sistema Operativo y Configuración Base

* **Distribución Soportada:** **Ubuntu 22.04 LTS (Jammy Jellyfish)** de 64 bits.
* **Zona Horaria del Servidor:** Debe configurarse estrictamente en la hora oficial de la República Dominicana:
  ```bash
  sudo timedatectl set-timezone America/Santo_Domingo
  ```
* **Sincronización NTP de Tiempo:**
  Los certificados X.509 y el sellado de tiempo de la TSA exigen que el reloj del servidor esté rigurosamente sincronizado. Una desviación superior a pocos segundos provocará el rechazo automático de transacciones.
  ```bash
  sudo apt update && sudo apt install -y chrony
  sudo systemctl enable --now chrony
  chronyc tracking
  ```

---

## Identidad de Red y Dominio Institucional

1. **Subdominio Público Oficial:**
   La institución debe asignar y publicar en su DNS institucional un registro `A` exclusivo hacia el servidor:
   * Formato recomendado: `ss1.<institucion>.gob.do` (Ejemplo: `ss1.ogtic.gob.do`, `ss1.msp.gob.do`).
   * Para nodos adicionales de contingencia se utilizan `ss2.<institucion>.gob.do`, `ss3.<institucion>.gob.do`.

2. **Dirección IP Pública Dedicada:**
   * El Servidor de Seguridad **debe contar con una IP Pública dedicada y exclusiva**.
   * No debe compartirse esta IP con otros servicios web ni balanceadores HTTP que alteren los certificados TLS en los puertos de interoperabilidad.

3. **Nombre de Host (Hostname):**
   El hostname de la máquina debe reflejar su FQDN público:
   ```bash
   sudo hostnamectl set-hostname ss1.tu-institucion.gob.do
   ```

---

## Convención de Cuentas de Usuario

:::danger Advertencia Crítica sobre el Usuario del Sistema
Al crear cuentas de usuario administrativo para el servidor, **NO utilice bajo ninguna circunstancia el nombre de usuario `xroad`**.
El usuario `xroad` es una cuenta reservada por el sistema interno y los paquetes del servicio para tareas de daemon y privilegios restringidos. Utilizar este nombre provocará colisiones de UID y fallos irreparables en la ejecución del servicio.
:::

Cree un usuario institucional para la administración:
```bash
sudo adduser admin-pui
sudo usermod -aG sudo,docker admin-pui
```

Continúe a la sección [2.2 Matriz de Red y Puertos de Firewall](/requisitos/red-y-puertos).
