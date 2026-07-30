import { parseRoute, onRouteChange } from './router.js';
import { renderHeader, renderSidebar, bindSidebarEvents, renderLessonLayout, renderPageToc, renderChapterPage, renderFooter } from './components.js';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderPrivacy } from './pages/privacy.js';
import { initSearch } from './search.js';
import { ARTICLES } from './data/articles.js';
import { TOPIC_INDEX, CURRICULUM } from './data/curriculum.js';
import { generateArticleMetadata, generateHomeMetadata, generateAboutMetadata, generateChapterMetadata, generatePrivacyMetadata } from './data/seo.js';

const root = document.getElementById('app');

// =========================================
// Theme Initialization (Run immediately)
// =========================================
function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Set initial attribute immediately to prevent flashing
document.documentElement.dataset.theme = getInitialTheme();

function initTheme() {
    const rootElem = document.documentElement;
    const button = document.getElementById("theme-toggle");

    if (!button) return;

    // Prevent adding multiple listeners if re-rendered
    button.onclick = () => {
        const current = rootElem.dataset.theme || "light";
        const next = current === "dark" ? "light" : "dark";

        rootElem.dataset.theme = next;
        localStorage.setItem("theme", next);
    };
}

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
  } else if (route.name === 'privacy') {
    contentHtml = renderPrivacy();
    metadata = generatePrivacyMetadata();
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
    ${renderFooter()}
  `;

  bindSidebarEvents();
  initSearch();
  initTheme(); // Binds the button after header is injected into DOM
  window.scrollTo({ top: 0 });
}

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