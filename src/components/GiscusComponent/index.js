import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * Variables de configuración preparadas para ser reemplazadas:
 * Puedes modificarlas directamente aquí, mediante props en el componente,
 * o a través de `customFields.giscus` en `docusaurus.config.js`.
 */
const GISCUS_DEFAULTS = {
  repo: 'dixgrake/xroad-members',
  repoId: 'R_kgDOVB8WfQ',         // GitHub Node ID real del repositorio
  category: 'General',             // Categoría oficial de discusiones
  categoryId: 'DIC_kwDOVB8Wfc4DHcZq', // GitHub Node ID real de la categoría General
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  lang: 'es',
  loading: 'lazy',
};

/**
 * Componente reutilizable para el sistema de comentarios Giscus
 * sincronizado con el tema claro/oscuro de Docusaurus.
 */
export default function GiscusComponent(props) {
  // Sincronización dinámica de tema con el modo claro/oscuro de Docusaurus
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();
  const customFieldsGiscus = siteConfig?.customFields?.giscus || {};

  // Resolución de parámetros (prioridad: props > customFields > defaults)
  const repo = props.repo || customFieldsGiscus.repo || GISCUS_DEFAULTS.repo;
  const repoId = props.repoId || customFieldsGiscus.repoId || GISCUS_DEFAULTS.repoId;
  const category = props.category || customFieldsGiscus.category || GISCUS_DEFAULTS.category;
  const categoryId = props.categoryId || customFieldsGiscus.categoryId || GISCUS_DEFAULTS.categoryId;
  const mapping = props.mapping || customFieldsGiscus.mapping || GISCUS_DEFAULTS.mapping;
  const reactionsEnabled = props.reactionsEnabled || customFieldsGiscus.reactionsEnabled || GISCUS_DEFAULTS.reactionsEnabled;
  const emitMetadata = props.emitMetadata || customFieldsGiscus.emitMetadata || GISCUS_DEFAULTS.emitMetadata;
  const inputPosition = props.inputPosition || customFieldsGiscus.inputPosition || GISCUS_DEFAULTS.inputPosition;
  const lang = props.lang || customFieldsGiscus.lang || GISCUS_DEFAULTS.lang;
  const loading = props.loading || customFieldsGiscus.loading || GISCUS_DEFAULTS.loading;

  // El tema se mapea directamente a 'light' o 'dark'
  const theme = colorMode === 'dark' ? 'dark' : 'light';

  // Verificación de configuración activa vs placeholders
  const isPlaceholder =
    !repoId ||
    repoId === '[TU_REPO_ID]' ||
    !categoryId ||
    categoryId === '[TU_CATEGORY_ID]';

  return (
    <section className={styles.giscusContainer} aria-label="Sección de comentarios y discusiones">
      <div className={styles.giscusHeader}>
        <div className={styles.giscusTitle}>
          <span className={styles.giscusIcon} aria-hidden="true">💬</span>
          <span className={styles.giscusTitleText}>Discusiones y Comentarios</span>
        </div>
        <span className={styles.giscusSubtitle}>
          GitHub Discussions • X-Road PUI
        </span>
      </div>

      {isPlaceholder && (
        <div className={styles.configNotice}>
          <strong>Nota de configuración:</strong> Giscus está activo en la plantilla. Para vincular los comentarios con el repositorio, habilita <em>Discussions</em> en GitHub y configura <code>repoId</code> y <code>categoryId</code> obtenidos desde <a href="https://giscus.app" target="_blank" rel="noopener noreferrer">giscus.app</a> (en <code>src/components/GiscusComponent/index.js</code> o mediante variables de entorno en <code>docusaurus.config.js</code>).
        </div>
      )}

      <div className={styles.giscusWidget}>
        <Giscus
          id="comments"
          repo={repo}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          mapping={mapping}
          reactionsEnabled={reactionsEnabled}
          emitMetadata={emitMetadata}
          inputPosition={inputPosition}
          theme={theme}
          lang={lang}
          loading={loading}
        />
      </div>
    </section>
  );
}
