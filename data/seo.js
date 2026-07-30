// ---------------------------------------------------------------
// Programmatic SEO layer.
//
// This is the single source of truth for titles, descriptions,
// canonical URLs, and structured data across the whole site.
// Nothing here is hardcoded per-article — everything is derived
// from curriculum.js + articles.js so that adding a new article
// automatically gets full SEO treatment with zero extra work.
//
// Used in two places:
//  - build/generate.js (Node, at build time, for every pre-rendered page)
//  - app.js (browser, to keep <head> in sync during client-side nav)
// ---------------------------------------------------------------

import { CURRICULUM, TOPIC_INDEX } from './curriculum.js';
import { ARTICLES } from './articles.js';

// -- Update these two before deploying --------------------------
export const SITE_NAME = 'The JavaScript Book';
export const SITE_URL = 'https://www.javascriptlearning.com'; // no trailing slash
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;
export const SITE_DESCRIPTION =
  'A visual, structured guide to JavaScript — from the fundamentals to how the engine, event loop, and memory model actually work underneath.';
// ------------------------------------------------------------------

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(str, max) {
  if (!str) return '';
  if (str.length <= max) return str;
  const cut = str.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

/** Every topic that currently has a full written article. */
export function isWritten(slug) {
  return Boolean(ARTICLES[slug]);
}

/**
 * SEO title. Prefers a hand-tuned title where an article defines one
 * (article.seoTitle), otherwise builds a search-intent-shaped title
 * from the topic + chapter automatically. This is the one function
 * a writer can override per-article without touching any SEO code —
 * just add `seoTitle: '...'` to the article object in articles.js.
 */
// articles.js has two content schemas in the wild (intro/takeaway/related
// and concept/keyTakeaway/relatedTopics — see components.js's own
// normalization step). SEO generation needs to read both the same way
// components.js does, or it silently falls back to generic copy for
// every article written in the newer schema.
function articleSummaryText(article) {
  return article?.intro || article?.concept || '';
}

export function generateSeoTitle(topic, article) {
  if (article?.seoTitle) return article.seoTitle;
  const base = article?.title || topic.title;
  // "X" -> "X in JavaScript" reads naturally for bare keywords/operators
  // like `let`, `this`, `bind` where the word alone isn't self-explanatory.
  const headline = /javascript/i.test(base) ? base : `${base} in JavaScript`;
  const suffix = ` | ${SITE_NAME}`;
  const budget = 60 - suffix.length;
  const finalHeadline = headline.length > budget ? truncate(headline, budget) : headline;
  return `${finalHeadline}${suffix}`;
}

/**
 * Meta description. Prefers article.metaDescription if a writer set one,
 * otherwise derives it from the article's own intro/concept copy —
 * never generic boilerplate when real content exists.
 */
export function generateMetaDescription(topic, article) {
  if (article?.metaDescription) return article.metaDescription;
  const summary = articleSummaryText(article);
  if (summary) return truncate(stripHtml(summary), 158);
  return truncate(
    `Learn ${topic.title} in JavaScript: what it is, how it works, and how it fits into ${topic.chapter?.title || 'the language'}. Part of ${SITE_NAME}.`,
    158
  );
}

export function generateCanonicalUrl(slug) {
  return `${SITE_URL}/javascript/${slug}`;
}

export function generateChapterCanonicalUrl(chapterSlug) {
  return `${SITE_URL}/javascript/${chapterSlug}`;
}

export function generateChapterMetadata(chapter) {
  const canonical = generateChapterCanonicalUrl(chapter.slug);
  const title = `${chapter.title} in JavaScript — ${chapter.topics.length}-Topic Guide | ${SITE_NAME}`;
  const description = truncate(
    `Chapter ${chapter.num}: ${chapter.title}. ${chapter.topics.length} topics covering ${chapter.topics.slice(0, 3).map((t) => t.title).join(', ')}, and more — with examples and diagrams.`,
    158
  );
  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    og: { title, description, url: canonical, type: 'website', image: DEFAULT_OG_IMAGE },
    breadcrumbSchema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'JavaScript', item: `${SITE_URL}/javascript` },
        { '@type': 'ListItem', position: 3, name: chapter.title, item: canonical },
      ],
    },
  };
}

export function generateBreadcrumb(topic) {
  return [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'JavaScript', url: `${SITE_URL}/javascript` },
    ...(topic.chapter
      ? [{ name: topic.chapter.title, url: `${SITE_URL}/javascript/${topic.chapter.slug}` }]
      : []),
    { name: topic.title, url: generateCanonicalUrl(topic.slug) },
  ];
}

export function generateBreadcrumbSchema(topic) {
  const items = generateBreadcrumb(topic);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Minimal two-level breadcrumb ("Home -> Page") for flat, non-curriculum
// pages like /privacy and /contact, which don't belong to a chapter and
// so can't use generateBreadcrumbSchema(topic) above.
function simpleBreadcrumbSchema(pageName, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: pageName, item: canonical },
    ],
  };
}

/**
 * TechArticle structured data for a written article. Only emitted for
 * pages that have real content — never for stub pages, since that would
 * be structured data describing content that doesn't exist yet.
 */
export function generateArticleSchema(topic, article) {
  if (!article) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: generateMetaDescription(topic, article),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: { '@type': 'WebPage', '@id': generateCanonicalUrl(topic.slug) },
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
  };
}

/**
 * Full metadata bundle for a single topic page. This is the one function
 * both the build script and the client router call — it's the entire
 * contract between "data about a topic" and "everything <head> needs".
 */
export function generateArticleMetadata(slug) {
  const topic = TOPIC_INDEX[slug];
  if (!topic) return null;
  const article = ARTICLES[slug];
  const written = Boolean(article);

  const title = generateSeoTitle(topic, article);
  const description = generateMetaDescription(topic, article);
  const canonical = generateCanonicalUrl(slug);

  return {
    slug,
    topic,
    article,
    written,
    title,
    description,
    canonical,
    // Stub pages are real, navigable pages (good UX / internal linking)
    // but should not compete for rankings against thin/duplicate content
    // until they're written. Flip to indexable automatically the moment
    // articles.js gains a real entry for this slug — no manual step.
    robots: written ? 'index, follow' : 'noindex, follow',
    og: {
      title,
      description,
      url: canonical,
      type: 'article',
      image: article?.ogImage || DEFAULT_OG_IMAGE,
    },
    breadcrumbSchema: generateBreadcrumbSchema(topic),
    articleSchema: written ? generateArticleSchema(topic, article) : null,
  };
}

export function generateHomeMetadata() {
  return {
    title: `${SITE_NAME} — Learn JavaScript from Fundamentals to Internals`,
    description: SITE_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    robots: 'index, follow',
    og: { title: SITE_NAME, description: SITE_DESCRIPTION, url: `${SITE_URL}/`, type: 'website', image: DEFAULT_OG_IMAGE },
  };
}

export function generateAboutMetadata() {
  return {
    title: `About — ${SITE_NAME}`,
    description: `About ${SITE_NAME}: what it covers, how it's written, and who it's for.`,
    canonical: `${SITE_URL}/about`,
    robots: 'index, follow',
    og: { title: `About — ${SITE_NAME}`, description: SITE_DESCRIPTION, url: `${SITE_URL}/about`, type: 'website', image: DEFAULT_OG_IMAGE },
  };
}

/**
 * Privacy Policy metadata. Written to be AdSense-review-friendly:
 * indexable, has a real canonical URL, and isn't marked noindex the
 * way unwritten lesson stubs are.
 */
export function generatePrivacyMetadata() {
  const canonical = `${SITE_URL}/privacy`;
  const title = `Privacy Policy — ${SITE_NAME}`;
  const description = `Privacy Policy for ${SITE_NAME}: what information we collect, how cookies, Google Analytics, and advertising work on this site, and how to contact us.`;
  return {
    title,
    description,
    canonical,
    robots: 'index, follow',
    og: { title, description, url: canonical, type: 'website', image: DEFAULT_OG_IMAGE },
    breadcrumbSchema: simpleBreadcrumbSchema('Privacy Policy', canonical),
  };
}

/** Every URL that should exist, with its metadata — used by the build script and the sitemap generator. */
export function getAllRoutes() {
  const routes = [
    { path: '/', metadata: generateHomeMetadata() },
    { path: '/about', metadata: generateAboutMetadata() },
    { path: '/privacy', metadata: generatePrivacyMetadata() },
  ];
  CURRICULUM.forEach((chapter) => {
    routes.push({ path: `/javascript/${chapter.slug}`, chapter, metadata: generateChapterMetadata(chapter) });
    chapter.topics.forEach((topic) => {
      routes.push({ path: `/javascript/${topic.slug}`, slug: topic.slug, metadata: generateArticleMetadata(topic.slug) });
    });
  });
  return routes;
}