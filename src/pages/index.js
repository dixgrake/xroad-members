import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero hero--primary" style={{
      background: 'linear-gradient(135deg, #002b5d 0%, #004493 60%, #0b1f3a 100%)',
      color: '#ffffff',
      padding: '4rem 1rem',
      textAlign: 'center',
    }}>
      <div className="container">
        <img 
          src={useBaseUrl('/img/presidencia.svg')} 
          alt="Escudo Presidencia República Dominicana" 
          width="110" 
          style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.3))' }}
        />
        <h1 className="hero__title" style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          X-Road República Dominicana
        </h1>
        <p className="hero__subtitle" style={{ fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto 2rem auto', opacity: 0.95 }}>
          Guía Técnica y Documentación para Miembros de la Plataforma Única de Interoperabilidad (PUI) del Estado Dominicano — OGTIC
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            className="button button--secondary button--lg"
            to="/intro/"
            style={{ fontWeight: 700, padding: '0.75rem 2rem' }}>
            🚀 Iniciar Guía Rápida
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/instalacion/docker-sidecar"
            style={{ color: '#ffffff', borderColor: '#ffffff', fontWeight: 700, padding: '0.75rem 2rem' }}>
            🐳 Despliegue Docker
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Arquitectura Federada & mTLS',
    emoji: '🛡️',
    description: (
      <>
        Canales cifrados directos entre servidores con validación de certificados X.509,
        inspección OCSP en tiempo real y sellado de tiempo de no repudio (RFC 3161).
      </>
    ),
    link: '/intro/arquitectura',
  },
  {
    title: 'Despliegue Moderno Sidecar 7.8.2',
    emoji: '📦',
    description: (
      <>
        Despliegue en minutos mediante Docker Compose, aislamiento de procesos,
        base de datos PostgreSQL interna y gestión segura de variables de entorno.
      </>
    ),
    link: '/instalacion/docker-sidecar',
  },
  {
    title: 'Catálogo de Subsistemas',
    emoji: '🧩',
    description: (
      <>
        Aislamiento de proyectos y servicios bajo estrictos estándares de nomenclatura oficial
        auditados y aprobados por el Servidor Central de OGTIC.
      </>
    ),
    link: '/subsistemas/gestion-y-convenciones',
  },
  {
    title: 'Consumo y Publicación de APIs',
    emoji: '🔌',
    description: (
      <>
        Puntos de acceso REST uniformes con formato <code>/r1/...</code>, cabeceras obligatorias{' '}
        <code>X-Road-Client</code> y listas de control de acceso (ACL) de mínimo privilegio.
      </>
    ),
    link: '/servicios/consumir-servicios',
  },
  {
    title: 'Diagnóstico & Solución de Fallos',
    emoji: '🩺',
    description: (
      <>
        Matriz de diagnóstico rápido, interpretación de cabeceras <code>X-Road-Error</code> y
        comandos de red para solucionar bloqueos de token y firewalls.
      </>
    ),
    link: '/soporte/diagnostico-y-errores',
  },
  {
    title: 'Publicación CI/CD en GitHub Pages',
    emoji: '⚙️',
    description: (
      <>
        Automatización continua con GitHub Actions lista para desplegar en tu propio perfil
        u organización de GitHub con un solo clic.
      </>
    ),
    link: '/ci-cd/publicacion-github-pages',
  },
];

function Feature({ emoji, title, description, link }) {
  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '2rem' }}>
      <div className="pui-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h3>
        <p style={{ flexGrow: 1, fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)' }}>
          {description}
        </p>
        <Link to={link} style={{ fontWeight: 600, marginTop: '1rem', display: 'inline-flex', alignItems: 'center' }}>
          Ver documentación →
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Inicio"
      description="Documentación de Usuarios Finales y Miembros para la Plataforma Única de Interoperabilidad del Estado Dominicano">
      <HomepageHeader />
      <main style={{ padding: '3rem 0', background: 'var(--ifm-background-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="pui-badge pui-badge--gov">República Dominicana</span>
            <span className="pui-badge pui-badge--security">Instancia Oficial: DO</span>
            <span className="pui-badge pui-badge--version">Versión X-Road 7.8.2</span>
            <h2 style={{ fontSize: '2rem', marginTop: '1rem', fontWeight: 800 }}>
              Ecosistema Integral de Interoperabilidad
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--ifm-color-emphasis-700)' }}>
              Acceda a las guías técnicas ordenadas paso a paso para desplegar, certificar y operar su Servidor de Seguridad.
            </p>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
