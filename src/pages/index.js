import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

function InstitutionalTopBar() {
  return (
    <>
      <div className="ogtic-flag-stripe" />
      <div className="ogtic-top-gov-bar">
        <div className="container ogtic-top-gov-inner">
          <div className="ogtic-gov-tag">
            <span>🇩🇴 GOBIERNO DE LA REPÚBLICA DOMINICANA</span>
            <span>•</span>
            <span>OFICINA GUBERNAMENTAL DE TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIÓN (OGTIC)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#c5a059', fontWeight: 700 }}>PUI INSTANCIA NACIONAL: DO</span>
          </div>
        </div>
      </div>
    </>
  );
}

function HomepageHeader() {
  return (
    <header className="ogtic-hero">
      <div className="container">
        <img 
          src={useBaseUrl('/img/presidencia.svg')} 
          alt="Escudo Oficial de la Presidencia de la República Dominicana" 
          width="115" 
          className="ogtic-hero-logo"
        />
        <div style={{ marginBottom: '1rem' }}>
          <span className="pui-badge pui-badge--gold">Órgano Rector: OGTIC</span>
          <span className="pui-badge pui-badge--gov">Ecosistema X-Road</span>
          <span className="pui-badge pui-badge--security">Seguridad Criptográfica mTLS</span>
        </div>
        <h1 className="ogtic-hero-title">
          Plataforma Única de Interoperabilidad
        </h1>
        <p className="ogtic-hero-subtitle">
          Portal Oficial de Documentación Técnica y Guía de Implementación para Instituciones Miembros
          del Estado Dominicano — Red Nacional X-Road (Instancia DO)
        </p>

        {/* Panel Prominente de Versión y Release Oficial */}
        <div className="ogtic-release-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="pui-badge pui-badge--version">🏷️ Release Oficial: v1.0.0</span>
              <span className="pui-badge pui-badge--gov">X-Road Core: 7.8.2</span>
              <span className="pui-badge pui-badge--security">Estado: Producción Vigente</span>
            </div>
            <Link 
              to="/intro/versiones" 
              style={{ color: '#c5a059', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
              Ver Registro de Releases y Cambios →
            </Link>
          </div>

          <div className="ogtic-release-grid">
            <div className="ogtic-release-item">
              <strong>Versión de Documentación</strong>
              <span>v1.0.0 (Actual)</span>
            </div>
            <div className="ogtic-release-item">
              <strong>Imagen Homologada</strong>
              <span>sidecar:7.8.2</span>
            </div>
            <div className="ogtic-release-item">
              <strong>Sistema Operativo</strong>
              <span>Ubuntu 22.04 LTS</span>
            </div>
            <div className="ogtic-release-item">
              <strong>Servidor Central (CS)</strong>
              <span>cs.xroad.digital.gob.do</span>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <Link
            className="button button--secondary button--lg"
            to="/intro/"
            style={{ fontWeight: 800, padding: '0.85rem 2.2rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            📘 Comenzar Guía de Miembros
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/instalacion/docker-sidecar"
            style={{ color: '#ffffff', borderColor: '#ffffff', fontWeight: 700, padding: '0.85rem 2.2rem' }}>
            🐳 Despliegue Técnico (Docker)
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/servicios/consumir-servicios"
            style={{ color: '#c5a059', borderColor: '#c5a059', fontWeight: 700, padding: '0.85rem 2.2rem' }}>
            🔌 Consumo de APIs REST
          </Link>
        </div>
      </div>
    </header>
  );
}

const InstitutionalPillars = [
  {
    title: 'Marco Regulatorio & MIDE',
    emoji: '🏛️',
    description: (
      <>
        Alineado con el <strong>Marco de Interoperabilidad del Estado Dominicano (MIDE)</strong> y las normativas
        NORTIC, garantizando el intercambio soberano de datos entre entidades públicas sin intermediación centralizada.
      </>
    ),
    link: '/intro/',
    linkText: 'Conocer gobernanza PUI →',
  },
  {
    title: 'Seguridad Criptográfica & mTLS',
    emoji: '🛡️',
    description: (
      <>
        Canales cifrados directos de extremo a extremo, autenticación mutua obligatoria, inspección OCSP
        en tiempo real y certificados oficiales emitidos por la Autoridad Certificadora de la PUI.
      </>
    ),
    link: '/intro/arquitectura',
    linkText: 'Ver arquitectura técnica →',
  },
  {
    title: 'Sellado de Tiempo Oficial (TSA)',
    emoji: '⏱️',
    description: (
      <>
        Garantía de no repudio legal mediante sellado de tiempo criptográfico (RFC 3161 - servicio <code>sello</code>)
        y bitácora forense de auditoría inalterable integrada en cada nodo.
      </>
    ),
    link: '/configuracion/llaves-y-certificados',
    linkText: 'Configurar certificados y TSA →',
  },
  {
    title: 'Despliegue Homologado Sidecar 7.8.2',
    emoji: '📦',
    description: (
      <>
        Despliegue estándar en contenedores Docker mediante la imagen <code>niis/xroad-security-server-sidecar:7.8.2</code>,
        con base de datos PostgreSQL 12 integrada y gestión segura con variables <code>.env</code>.
      </>
    ),
    link: '/instalacion/docker-sidecar',
    linkText: 'Guía de instalación Docker →',
  },
  {
    title: 'Catálogo de Subsistemas & Servicios',
    emoji: '🧩',
    description: (
      <>
        Organización modular de servicios con estrictos estándares de nomenclatura en mayúsculas auditados por el
        Servidor Central y control granular de acceso mediante listas ACL.
      </>
    ),
    link: '/subsistemas/gestion-y-convenciones',
    linkText: 'Reglas de subsistemas →',
  },
  {
    title: 'Mesa de Ayuda de Interoperabilidad',
    emoji: '🩺',
    description: (
      <>
        Asistencia técnica directa para validación de anclas XML, emisión de certificados y resolución de errores
        a través de la Mesa de Ayuda Oficial de OGTIC (<code>interoperabilidad@ogtic.gob.do</code>).
      </>
    ),
    link: '/soporte/diagnostico-y-errores',
    linkText: 'Matriz de diagnóstico y soporte →',
  },
];

function PillarCard({ emoji, title, description, link, linkText }) {
  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '2rem' }}>
      <div className="ogtic-pillar-card" style={{ height: '100%' }}>
        <div style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>{emoji}</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ogtic-navy-primary)' }}>{title}</h3>
        <p style={{ flexGrow: 1, fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--ifm-color-emphasis-700)' }}>
          {description}
        </p>
        <Link to={link} style={{ fontWeight: 700, marginTop: '1rem', display: 'inline-flex', alignItems: 'center' }}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}

function TechnicalSpecsSummary() {
  return (
    <div className="ogtic-specs-box">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span className="pui-badge pui-badge--gov">Parámetros de Red</span>
        <span className="pui-badge pui-badge--gold">Instancia Nacional: DO</span>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--ogtic-navy-primary)' }}>
          Especificaciones Técnicas para Administradores de Nodos
        </h3>
      </div>
      <div className="row">
        <div className="col col--6">
          <table style={{ margin: 0 }}>
            <tbody>
              <tr>
                <td><strong>Identificador de Instancia</strong></td>
                <td><code>DO</code> (República Dominicana)</td>
              </tr>
              <tr>
                <td><strong>Servidor Central (CS)</strong></td>
                <td><code>cs.xroad.digital.gob.do</code></td>
              </tr>
              <tr>
                <td><strong>Descarga GlobalConf (HTTP 80)</strong></td>
                <td><code>http://cs.xroad.digital.gob.do/internalconf</code></td>
              </tr>
              <tr>
                <td><strong>Clases de Miembro Habilitadas</strong></td>
                <td><code>GOB</code> (Gubernamental), <code>COM</code> (Comercial)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col col--6">
          <table style={{ margin: 0 }}>
            <tbody>
              <tr>
                <td><strong>Puertos Externos Entrantes</strong></td>
                <td><code>TCP 5500</code> (mTLS) | <code>TCP 5577</code> (OCSP)</td>
              </tr>
              <tr>
                <td><strong>Puerto de Consola de Gestión (LAN)</strong></td>
                <td><code>TCP 4000</code> (Restringido estrictamente a red interna)</td>
              </tr>
              <tr>
                <td><strong>Formato de Invocación REST</strong></td>
                <td><code>/r1/DO/GOB/PROVEEDOR/SERVICIO/ENDPOINT</code></td>
              </tr>
              <tr>
                <td><strong>Cabecera Obligatoria de Cliente</strong></td>
                <td><code>X-Road-Client: DO/GOB/INSTITUCION/SUBSISTEMA</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AuthoritySupportBanner() {
  return (
    <div className="ogtic-authority-banner">
      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
        Oficina Gubernamental de Tecnologías de la Información y Comunicación (OGTIC)
      </h3>
      <p style={{ maxWidth: '750px', margin: '0 auto 1.5rem auto', color: '#cbd5e1', fontSize: '0.95rem' }}>
        Órgano rector de las tecnologías de la información y comunicación del Estado Dominicano.
        Responsable de la administración, políticas de seguridad y gobernanza técnica del Servidor Central de la PUI.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <a 
          href="mailto:interoperabilidad@ogtic.gob.do" 
          className="button button--secondary"
          style={{ fontWeight: 700 }}>
          ✉️ Contactar Soporte: interoperabilidad@ogtic.gob.do
        </a>
        <a 
          href="https://ogtic.gob.do" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="button button--outline"
          style={{ color: '#ffffff', borderColor: '#ffffff', fontWeight: 700 }}>
          🏛️ Portal Institucional OGTIC
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Inicio"
      description="Portal Oficial de Documentación de Miembros de la Plataforma Única de Interoperabilidad del Estado Dominicano — OGTIC X-Road">
      <InstitutionalTopBar />
      <HomepageHeader />
      <main style={{ padding: '3.5rem 0', background: 'var(--ifm-background-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="pui-badge pui-badge--gov">Ecosistema Dominicano</span>
            <span className="pui-badge pui-badge--gold">Gobernanza Digital</span>
            <span className="pui-badge pui-badge--version">Versión Documental: v1.0.0</span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.75rem', fontWeight: 900, color: 'var(--ogtic-navy-primary)' }}>
              Pilares de la Interoperabilidad Nacional
            </h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--ifm-color-emphasis-700)', fontSize: '1.05rem' }}>
              Directrices oficiales y arquitectura técnica homologada para conectar sistemas de información
              a la red de intercambio seguro del Estado Dominicano.
            </p>
          </div>

          <div className="row">
            {InstitutionalPillars.map((props, idx) => (
              <PillarCard key={idx} {...props} />
            ))}
          </div>

          <TechnicalSpecsSummary />
          <AuthoritySupportBanner />
        </div>
      </main>
    </Layout>
  );
}
