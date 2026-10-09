import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import GiscusComponent from '@site/src/components/GiscusComponent';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export default function FooterWrapper(props) {
  let isBlogPostPage = true;
  try {
    const blogPost = useBlogPost();
    isBlogPostPage = blogPost?.isBlogPostPage ?? true;
  } catch (e) {
    // Si no se encuentra dentro del contexto del blog, renderizar seguro
  }

  return (
    <>
      <Footer {...props} />
      {isBlogPostPage && <GiscusComponent />}
    </>
  );
}
