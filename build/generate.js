// ---------------------------------------------------------------
// Static-site build script.
//
// Runs in Node (no browser, no bundler). It re-uses the exact same
// render functions the app already ships (renderHeader, renderSidebar,
// renderLessonLayout, renderPageToc, renderFooter) — those are pure
// functions that build an HTML string, so they work unchanged outside
// the browser.
//
// For every route it writes a real file, e.g.:
//   /javascript/closures  ->  dist/javascript/closures/index.html
// with the page's actual content AND correct <title>, meta description,
// canonical link, OG/Twitter tags, and JSON-LD already in the HTML —
// so it's a complete, indexable document with no JS execution required.
//
// app.js still loads on every page for client-side navigation between
// pages the user already has open (progressive enhancement, not the
// only way to get content).
//
// Usage:  node build/generate.js
// ---------------------------------------------------------------

import { mkdir, writeFile, cp, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { renderHeader, renderSidebar, renderLessonLayout, renderPageToc, renderChapterPage, renderFooter } from '../components.js';
import { ARTICLES } from '../data/articles.js';
import { getAllRoutes, SITE_URL, SITE_NAME } from '../data/seo.js';
import { renderPrivacy } from '../pages/privacy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

// pages/home.js and pages/about.js weren't provided when this build
// script was written, so it degrades gracefully: it prerenders those
// two routes with placeholder content if the real page modules aren't
// found, and prints a warning rather than silently shipping blank pages.
async function loadPageRenderer(relPath, fallbackHtml, warnLabel) {
  const abs = path.join(ROOT, relPath);
  if (await fileExists(abs)) {
    const mod = await import(pathToFileURL(abs).href);
    const fnName = Object.keys(mod)[0];
    return mod[fnName];
  }
  console.warn(`[build] ${relPath} not found — using placeholder content for ${warnLabel}. Replace with the real page module before deploying.`);
  return () => fallbackHtml;
}

function documentShell({ metadata, bodyContent, showToc, pageTocHtml }) {
  const og = metadata.og || {};
  const ogTags = metadata.og
    ? `
    <meta property="og:title" content="${escapeAttr(og.title)}">
    <meta property="og:description" content="${escapeAttr(og.description)}">
    <meta property="og:url" content="${escapeAttr(og.url)}">
    <meta property="og:type" content="${escapeAttr(og.type)}">
    <meta property="og:image" content="${escapeAttr(og.image)}">
    <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(og.title)}">
    <meta name="twitter:description" content="${escapeAttr(og.description)}">
    <meta name="twitter:image" content="${escapeAttr(og.image)}">`
    : '';

  const schemaTags = [metadata.breadcrumbSchema, metadata.articleSchema]
    .filter(Boolean)
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n    ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metadata.title)}</title>
  <meta name="description" content="${escapeAttr(metadata.description)}">
  <meta name="robots" content="${escapeAttr(metadata.robots || 'index, follow')}">
  ${metadata.canonical ? `<link rel="canonical" href="${escapeAttr(metadata.canonical)}">` : ''}
  ${ogTags}
  ${schemaTags}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/header.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/article.css">
  <link rel="stylesheet" href="/css/home.css">
  <link rel="stylesheet" href="/css/footer.css">
</head>
<body>
  <div id="app">
    ${renderHeader()}
    <div class="book-layout ${showToc ? '' : 'no-toc'}">
      ${renderSidebar(metadata.slug || null)}
      <main class="content-col">${bodyContent}</main>
      ${showToc ? pageTocHtml : ''}
    </div>
    ${renderFooter()}
  </div>
  <script type="module" src="/app.js"></script>
</body>
</html>
`;
}

function escapeHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(str = '') {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

async function writeRoute(routePath, html) {
  const outDir = routePath === '/' ? DIST : path.join(DIST, routePath);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
}

async function buildSitemap(routes) {
  const indexable = routes.filter((r) => r.metadata?.robots === 'index, follow' && r.metadata?.canonical);
  const urlEntries = indexable
    .map((r) => `  <url>\n    <loc>${r.metadata.canonical}</loc>\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  await writeFile(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
  return indexable.length;
}

async function buildRobots() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  await writeFile(path.join(DIST, 'robots.txt'), txt, 'utf8');
}

async function main() {
  await mkdir(DIST, { recursive: true });

  const renderHome = await loadPageRenderer(
    'pages/home.js',
    `<div class="article-wrap"><h1 class="article-title">${SITE_NAME}</h1><p class="article-intro">Homepage content pending — see build/generate.js warnings.</p></div>`,
    'the homepage'
  );
  const renderAbout = await loadPageRenderer(
    'pages/about.js',
    `<div class="article-wrap"><h1 class="article-title">About</h1><p class="article-intro">About-page content pending — see build/generate.js warnings.</p></div>`,
    'the about page'
  );

  const routes = getAllRoutes();
  let written = 0;

  for (const route of routes) {
    let bodyContent = '';
    let showToc = false;
    let pageTocHtml = '';

    if (route.path === '/') {
      bodyContent = renderHome();
    } else if (route.path === '/about') {
      bodyContent = renderAbout();
    } else if (route.path === '/privacy') {
      bodyContent = renderPrivacy();
    } else if (route.chapter) {
      bodyContent = renderChapterPage(route.chapter);
    } else if (route.slug) {
      bodyContent = renderLessonLayout(route.slug);
      const article = ARTICLES[route.slug];
      if (article) {
        showToc = true;
        pageTocHtml = renderPageToc(article.sections);
      }
    }

    const html = documentShell({
      metadata: { ...route.metadata, slug: route.slug },
      bodyContent,
      showToc,
      pageTocHtml,
    });

    await writeRoute(route.path, html);
    written += 1;
  }

  // Copy static assets straight through if present (styles, app scripts, data).
  for (const asset of [
  'app.js',
  'router.js',
  'components.js',
  'search.js',
  'data',
  'css',
  'pages',
  'google2b9491e256730bcc.html'
]) {
    const src = path.join(ROOT, asset);
    if (await fileExists(src)) {
      await cp(src, path.join(DIST, asset), { recursive: true });
    }
  }

  const indexableCount = await buildSitemap(routes);
  await buildRobots();

  console.log(`[build] Wrote ${written} pages to /dist`);
  console.log(`[build] sitemap.xml includes ${indexableCount} indexable URLs (stub pages are noindex and excluded)`);
  console.log(`[build] robots.txt written`);
}

main().catch((err) => {
  console.error('[build] Failed:', err);
  process.exit(1);
});