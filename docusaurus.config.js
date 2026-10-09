// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'X-Road Dominicana | Guía de Miembros PUI',
  tagline: 'Documentación Oficial y Guía de Implementación para Instituciones Miembros de la Plataforma Única de Interoperabilidad (PUI) del Estado Dominicano (OGTIC)',
  favicon: 'img/presidencia.svg',

  // Configuración de GitHub Pages
  url: 'https://dixgrake.github.io',
  baseUrl: '/xroad-members/',

  organizationName: 'dixgrake',
  projectName: 'xroad-members',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/ogticrd/xroad-members/tree/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/arquitectura.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'X-Road PUI Dominicana',
        logo: {
          alt: 'Escudo Nacional Presidencia de la República Dominicana',
          src: 'img/presidencia.svg',
          srcDark: 'img/presidencia.svg',
          width: 38,
          height: 38,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            to: '/intro/arquitectura',
            label: 'Arquitectura',
            position: 'left',
          },
          {
            to: '/instalacion/docker-sidecar',
            label: 'Instalación',
            position: 'left',
          },
          {
            to: '/servicios/consumir-servicios',
            label: 'Consumo de APIs',
            position: 'left',
          },
          {
            to: '/soporte/diagnostico-y-errores',
            label: 'Solución de Errores',
            position: 'left',
          },
          {
            href: 'https://github.com/ogticrd/xroad-members',
            label: 'Repositorio Oficial',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación PUI',
            items: [
              {
                label: 'Introducción a X-Road',
                to: '/intro/',
              },
              {
                label: 'Despliegue con Docker Sidecar',
                to: '/instalacion/docker-sidecar',
              },
              {
                label: 'Configuración y Certificados',
                to: '/configuracion/ancla-y-registro',
              },
              {
                label: 'Gestión de Subsistemas',
                to: '/subsistemas/gestion-y-convenciones',
              },
            ],
          },
          {
            title: 'Integración Técnica',
            items: [
              {
                label: 'Publicar Servicios (Productor)',
                to: '/servicios/publicar-servicios',
              },
              {
                label: 'Consumir Servicios (Consumidor)',
                to: '/servicios/consumir-servicios',
              },
              {
                label: 'Preguntas Frecuentes',
                to: '/soporte/preguntas-frecuentes',
              },
              {
                label: 'Diagnóstico y Solución de Problemas',
                to: '/soporte/diagnostico-y-errores',
              },
            ],
          },
          {
            title: 'Canales Oficiales y Fuentes',
            items: [
              {
                label: 'OGTIC República Dominicana',
                href: 'https://ogtic.gob.do',
              },
              {
                label: 'Soporte Interoperabilidad (Email)',
                href: 'mailto:interoperabilidad@ogtic.gob.do',
              },
              {
                label: 'NIIS (X-Road Global)',
                href: 'https://x-road.global',
              },
              {
                label: 'Despliegue CI/CD GitHub Pages',
                to: '/ci-cd/publicacion-github-pages',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Plataforma Única de Interoperabilidad (PUI) | OGTIC - República Dominicana. Documentación para Miembros y Usuarios Finales.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'yaml', 'json', 'xml', 'python'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

module.exports = config;
