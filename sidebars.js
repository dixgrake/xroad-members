/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '1. Introducción y Arquitectura',
      collapsed: false,
      items: [
        'intro/index',
        'intro/arquitectura',
        'intro/glosario',
      ],
    },
    {
      type: 'category',
      label: '2. Requisitos y Preparación',
      collapsed: false,
      items: [
        'requisitos/infraestructura',
        'requisitos/red-y-puertos',
      ],
    },
    {
      type: 'category',
      label: '3. Instalación del Servidor',
      collapsed: false,
      items: [
        'instalacion/docker-sidecar',
        'instalacion/desinstalacion',
        'instalacion/metodo-legado-v6',
      ],
    },
    {
      type: 'category',
      label: '4. Configuración e Inscripción',
      collapsed: false,
      items: [
        'configuracion/ancla-y-registro',
        'configuracion/llaves-y-certificados',
      ],
    },
    {
      type: 'category',
      label: '5. Gestión de Subsistemas',
      collapsed: false,
      items: [
        'subsistemas/gestion-y-convenciones',
      ],
    },
    {
      type: 'category',
      label: '6. Servicios y Control de Acceso',
      collapsed: false,
      items: [
        'servicios/publicar-servicios',
        'servicios/consumir-servicios',
      ],
    },
    {
      type: 'category',
      label: '7. Soporte y Diagnóstico',
      collapsed: false,
      items: [
        'soporte/preguntas-frecuentes',
        'soporte/diagnostico-y-errores',
      ],
    },
    {
      type: 'category',
      label: '8. CI/CD y Publicación',
      collapsed: false,
      items: [
        'ci-cd/publicacion-github-pages',
      ],
    },
  ],
};

module.exports = sidebars;
