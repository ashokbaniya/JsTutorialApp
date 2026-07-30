import { parseRoute, onRouteChange } from './router.js';
import { renderHeader, renderSidebar, bindSidebarEvents, renderLessonLayout, renderPageToc, renderChapterPage } from './components.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { initSearch } from './search.js';
import { ARTICLES } from './data/articles.js';
import { TOPIC_INDEX, CURRICULUM } from './data/curriculum.js';
import { generateArticleMetadata, generateHomeMetadata, generateAboutMetadata, generateChapterMetadata } from './data/seo.js';

const root = document.getElementById('app');

function render() {
  const route = parseRoute();
  let activeSlug = route.name === 'lesson' ? route.slug : null;
  let contentHtml = '';
  let showToc = false;
  let pageTocHtml = '';
  let metadata = generateHomeMetadata();

  if (route.name === 'home') {
    contentHtml = renderHome();
    metadata = generateHomeMetadata();
  } else if (route.name === 'about') {
    contentHtml = renderAbout();
    metadata = generateAboutMetadata();
  } else if (route.name === 'chapter') {
    const chapter = CURRICULUM.find((c) => c.slug === route.slug);
    if (!chapter) {
      contentHtml = renderNotFound();
      metadata = { title: `Page not found — The JavaScript Book`, description: '', canonical: '', robots: 'noindex, follow', og: null };
    } else {
      contentHtml = renderChapterPage(chapter);
      metadata = generateChapterMetadata(chapter);
    }
  } else if (route.name === 'lesson') {
    const topic = TOPIC_INDEX[route.slug];
    if (!topic) {
      contentHtml = renderNotFound();
      metadata = { title: `Page not found — The JavaScript Book`, description: '', canonical: '', robots: 'noindex, follow', og: null };
    } else {
      contentHtml = renderLessonLayout(route.slug);
      const article = ARTICLES[route.slug];
      if (article) {
        showToc = true;
        pageTocHtml = renderPageToc(article.sections);
      }
      metadata = generateArticleMetadata(route.slug);
    }
  } else {
    contentHtml = renderNotFound();
    metadata = { title: `Page not found — The JavaScript Book`, description: '', canonical: '', robots: 'noindex, follow', og: null };
  }

  updateHead(metadata);

  root.innerHTML = `
    ${renderHeader()}
    <div class="book-layout ${showToc ? '' : 'no-toc'}">
      ${renderSidebar(activeSlug)}
      <main class="content-col">${contentHtml}</main>
      ${showToc ? pageTocHtml : ''}
    </div>
  `;

  bindSidebarEvents();
  initSearch();
  window.scrollTo({ top: 0 });
}

// ---------------------------------------------------------------
// Keeps <head> in sync on every client-side navigation. The build
// script (build/generate.js) sets the *initial* correct values for
// each pre-rendered page — this covers every navigation after that,
// so a title/description/canonical from a previous article is never
// left behind when moving to the next one.
// ---------------------------------------------------------------
function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function updateHead(metadata) {
  document.title = metadata.title;
  upsertMeta('name', 'description', metadata.description);
  upsertMeta('name', 'robots', metadata.robots || 'index, follow');
  upsertLink('canonical', metadata.canonical || null);

  if (metadata.og) {
    upsertMeta('property', 'og:title', metadata.og.title);
    upsertMeta('property', 'og:description', metadata.og.description);
    upsertMeta('property', 'og:url', metadata.og.url);
    upsertMeta('property', 'og:type', metadata.og.type);
    upsertMeta('property', 'og:image', metadata.og.image);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.og.title);
    upsertMeta('name', 'twitter:description', metadata.og.description);
    upsertMeta('name', 'twitter:image', metadata.og.image);
  }

  upsertJsonLd('breadcrumb-schema', metadata.breadcrumbSchema || null);
  upsertJsonLd('article-schema', metadata.articleSchema || null);
}

function renderNotFound() {
  return `
    <div class="article-wrap">
      <p class="eyebrow">404</p>
      <h1 class="article-title">Page not found</h1>
      <p class="article-intro">That chapter doesn't exist yet.</p>
      <p><a href="/">&larr; Back to the table of contents</a></p>
    </div>
  `;
}

onRouteChange(render);
