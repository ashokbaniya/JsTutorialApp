import { CURRICULUM, TOPIC_INDEX, findAdjacent } from './data/curriculum.js';
import { ARTICLES } from './data/articles.js';

// ---------------------------------------------------------------
// Header
// ---------------------------------------------------------------
export function renderHeader() {
  return `
    <header class="site-header">
      <button class="menu-toggle" id="menu-toggle" aria-label="Open table of contents">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <a class="brand" href="/">
        <span class="brand-mark">JS&#9670;</span>
        <span class="brand-name">The JavaScript Book</span>
      </a>
      <div class="header-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="search-input" type="text" placeholder="Search JavaScript concepts..." autocomplete="off" />
        <div class="search-results hidden" id="search-results"></div>
      </div>
      <div class="header-right">
        <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme" title="Theme">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        </button>
        <a href="/about" class="header-about-label">About</a>
      </div>
    </header>
    <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
  `;
}

// ---------------------------------------------------------------
// Sidebar (table of contents)
// ---------------------------------------------------------------
export function renderSidebar(activeSlug) {
  const chapters = CURRICULUM.map((chapter) => {
    const containsActive = chapter.topics.some((t) => t.slug === activeSlug);
    const topics = chapter.topics
      .map((t) => `<li><a href="/javascript/${t.slug}" class="${t.slug === activeSlug ? 'active' : ''}" data-slug="${t.slug}">${t.title}</a></li>`)
      .join('');
    return `
      <div class="toc-chapter ${containsActive ? 'open' : ''}" data-chapter="${chapter.slug}">
        <button class="toc-chapter-btn" type="button">
          <span><span class="toc-chapter-num">${chapter.num}.</span>${chapter.title}</span>
          <span class="toc-caret">&#9656;</span>
        </button>
        <ul class="toc-topics">${topics}</ul>
      </div>
    `;
  }).join('');

  return `
    <nav class="sidebar" id="sidebar" aria-label="Table of contents">
      <p class="sidebar-title">CONTENTS</p>
      ${chapters}
    </nav>
  `;
}

export function bindSidebarEvents() {
  document.querySelectorAll('.toc-chapter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.toc-chapter').classList.toggle('open');
    });
  });

  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    sidebar?.classList.remove('open');
  }
  menuToggle?.addEventListener('click', () => {
    document.body.classList.add('sidebar-open');
    sidebar?.classList.add('open');
  });
  backdrop?.addEventListener('click', closeSidebar);
  sidebar?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeSidebar));

  // The sidebar is fully rebuilt (innerHTML replaced) on every navigation,
  // which used to leave it scrolled back to the top of the chapter list —
  // losing your place every time you clicked a lesson. Instead, scroll the
  // currently active lesson into view so the sidebar stays where you are.
  sidebar?.querySelector('.toc-topics a.active')?.scrollIntoView({ block: 'nearest' });
}

// ---------------------------------------------------------------
// "On this page" right-hand nav
// ---------------------------------------------------------------
export function renderPageToc(sections = []) {
  const items = (sections || [])
    .map((s, i) => `<li><a href="#section-${i}">${s.heading}</a></li>`)
    .join('');

  if (!items) return ''; // Don't render TOC sidebar if there are no sections

  return `
    <aside class="page-toc" aria-label="On this page">
      <p class="page-toc-label">ON THIS PAGE</p>
      <ol>${items}</ol>
    </aside>
  `;
}

// ---------------------------------------------------------------
// Code block
// ---------------------------------------------------------------
export function renderCodeBlock({ label = 'example.js', code = '' }) {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `
    <div class="code-block">
      <div class="code-block-label">${label}</div>
      <pre><code>${escaped}</code></pre>
    </div>
  `;
}

// ---------------------------------------------------------------
// Diagram container
// ---------------------------------------------------------------
export function renderDiagram(svgMarkup, caption) {
  // Diagrams are generated as plain <svg> markup with no accessible name
  // (see diagrams.js). Rather than editing all 19 diagram functions,
  // inject role="img" + aria-label here from the caption every article
  // already provides — this covers every diagram, current and future,
  // with zero extra work required in diagrams.js or articles.js.
  const accessibleSvg = caption
    ? svgMarkup.replace(/<svg\b/, `<svg role="img" aria-label="${escapeAttrText(caption)}"`)
    : svgMarkup;
  return `
    <div class="diagram-container">
      ${accessibleSvg}
    </div>
    ${caption ? `<p class="diagram-caption">${caption}</p>` : ''}
  `;
}

function escapeAttrText(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------
// Key takeaway
// ---------------------------------------------------------------
export function renderKeyTakeaway(text) {
  return `
    <div class="key-takeaway">
      <p class="key-takeaway-title">Key Takeaway</p>
      <p>${text}</p>
    </div>
  `;
}

// ---------------------------------------------------------------
// Related concepts
// ---------------------------------------------------------------
export function renderRelatedConcepts(slugs = []) {
  const items = slugs
    .map((slug) => {
      const topic = TOPIC_INDEX[slug];
      if (!topic) return '';
      return `<li><a href="/javascript/${slug}">${topic.title}</a></li>`;
    })
    .join('');
  if (!items) return '';
  return `<ul class="related-concepts">${items}</ul>`;
}

// ---------------------------------------------------------------
// Previous / Next navigation
// ---------------------------------------------------------------
export function renderPrevNext(slug) {
  const { prev, next } = findAdjacent(slug);
  const prevHtml = prev
    ? `<a class="nav-link prev" href="/javascript/${prev.slug}"><span class="nav-dir">&larr; Previous</span><span class="nav-title">${prev.title}</span></a>`
    : '<span></span>';
  const nextHtml = next
    ? `<a class="nav-link next" href="/javascript/${next.slug}"><span class="nav-dir">Next &rarr;</span><span class="nav-title">${next.title}</span></a>`
    : '<span></span>';
  return `<nav class="prev-next-nav" aria-label="Chapter navigation">${prevHtml}${nextHtml}</nav>`;
}

// ---------------------------------------------------------------
// Full lesson layout — composes an article page (Supports both schemas)
// ---------------------------------------------------------------
export function renderLessonLayout(slug) {
  const topicMeta = TOPIC_INDEX[slug];
  const article = ARTICLES[slug];

  if (!article) {
    return renderStubLesson(slug, topicMeta);
  }

  // Normalize properties between old schema (intro, takeaway, related)
  // and new schema (concept, keyTakeaway, relatedTopics)
  const intro = article.intro || article.concept || '';
  const takeaway = article.takeaway || article.keyTakeaway || '';
  const related = article.related || article.relatedTopics || [];

  // If the article doesn't have a 'sections' array, build one dynamically
  let sections = article.sections;
  if (!sections) {
    sections = [];

    if (article.howItWorks) {
      sections.push({
        heading: 'How It Works',
        body: `<p>${article.howItWorks}</p>`,
        mentalModel: article.mentalModel || '',
        code: article.simpleExample ? { label: 'example.js', code: article.simpleExample.trim() } : null,
        steps: article.stepByStep || null
      });
    }

    if (article.practicalCode) {
      sections.push({
        heading: 'Practical Example',
        body: '<p>Here is how you might see this concept applied in real-world code:</p>',
        code: { label: 'practical.js', code: article.practicalCode.trim() }
      });
    }
  }

  // Safely render sections with fallback to an empty array
  const sectionsHtml = (sections || [])
    .map((section, i) => {
      // Ensure code block handles both raw strings and { label, code } objects
      const codeData = typeof section.code === 'string' ? { label: 'example.js', code: section.code } : section.code;
      const codeHtml = codeData ? renderCodeBlock(codeData) : '';
      const diagramHtml = section.diagram ? renderDiagram(section.diagram, section.diagramCaption) : '';
      const stepsHtml = section.steps
        ? `<ol class="step-list">${section.steps.map((s) => `<li class="step-item"><p>${s}</p></li>`).join('')}</ol>`
        : '';
      const mentalModelHtml = section.mentalModel
        ? `<p class="mental-model">${section.mentalModel}</p>`
        : '';

      return `
        <section class="article-section" id="section-${i}">
          <h2><span class="section-num">${String(i + 1).padStart(2, '0')}</span> ${section.heading}</h2>
          ${mentalModelHtml}
          ${section.body || ''}
          ${codeHtml}
          ${section.after || ''}
          ${diagramHtml}
          ${stepsHtml}
        </section>
      `;
    })
    .join('');

  return `
    <div class="article-wrap">
      <p class="eyebrow">Chapter ${topicMeta?.chapter?.num || ''} &middot; ${topicMeta?.chapter?.title || ''}</p>
      <h1 class="article-title">${article.title}</h1>
      <p class="article-intro">${intro}</p>
      ${sectionsHtml}
      <section class="article-section">
        ${renderKeyTakeaway(takeaway)}
      </section>
      <section class="article-section">
        <h2>Related Concepts</h2>
        ${renderRelatedConcepts(related)}
      </section>
      ${renderPrevNext(slug)}
    </div>
  `;
}

function renderStubLesson(slug, topicMeta) {
  const title = topicMeta ? topicMeta.title : slug;
  const chapterTitle = topicMeta?.chapter?.title || '';
  const siblings = topicMeta?.chapter?.topics.filter((t) => t.slug !== slug) || [];
  const writtenSibling = siblings.find((t) => ARTICLES[t.slug]);

  return `
    <div class="article-wrap">
      <p class="eyebrow">Chapter ${topicMeta?.chapter?.num || ''} &middot; ${chapterTitle}</p>
      <h1 class="article-title">${title}</h1>
      <p class="article-intro">This page is part of ${chapterTitle}. The full lesson hasn't been written yet.</p>
      <div class="stub-box">
        <p>We're still drafting a clear explanation, worked example, and diagram for <strong>${title}</strong> — following the same format as the rest of the book.</p>
        ${writtenSibling ? `<p>In the meantime, <a href="/javascript/${writtenSibling.slug}">${writtenSibling.title}</a> covers a related idea from this chapter.</p>` : ''}
        <p><a href="/">&larr; Back to the table of contents</a></p>
      </div>
      ${renderPrevNext(slug)}
    </div>
  `;
}

export function hasFullArticle(slug) {
  return Boolean(ARTICLES[slug]);
}

// ---------------------------------------------------------------
// Chapter landing page — internal-link hub listing every topic in
// a chapter, with prerequisite/next-chapter links either side.
// ---------------------------------------------------------------
export function renderChapterPage(chapter) {
  const idx = CURRICULUM.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? CURRICULUM[idx - 1] : null;
  const nextChapter = idx >= 0 && idx < CURRICULUM.length - 1 ? CURRICULUM[idx + 1] : null;
  const writtenCount = chapter.topics.filter((t) => ARTICLES[t.slug]).length;

  const topicItems = chapter.topics
    .map((t, i) => `<li><a href="/javascript/${t.slug}"><span class="section-num">${String(i + 1).padStart(2, '0')}</span> ${t.title}</a></li>`)
    .join('');

  const prevHtml = prevChapter
    ? `<a class="nav-link prev" href="/javascript/${prevChapter.slug}"><span class="nav-dir">&larr; Previous chapter</span><span class="nav-title">${prevChapter.title}</span></a>`
    : '<span></span>';
  const nextHtml = nextChapter
    ? `<a class="nav-link next" href="/javascript/${nextChapter.slug}"><span class="nav-dir">Next chapter &rarr;</span><span class="nav-title">${nextChapter.title}</span></a>`
    : '<span></span>';

  return `
    <div class="article-wrap">
      <p class="eyebrow">Chapter ${chapter.num}</p>
      <h1 class="article-title">${chapter.title}</h1>
      <p class="article-intro">This chapter covers ${chapter.topics.length} topics${writtenCount < chapter.topics.length ? `, ${writtenCount} of which have full lessons so far` : ''}. Work through them in order, or jump to the one you need.</p>
      <section class="article-section">
        <h2>Topics in this chapter</h2>
        <ol class="step-list chapter-topic-list">${topicItems}</ol>
      </section>
      <nav class="prev-next-nav" aria-label="Chapter navigation">${prevHtml}${nextHtml}</nav>
    </div>
  `;
}

// ---------------------------------------------------------------
// Footer — appears on every page (browser render + prerendered build).
// Kept as a plain, dependency-free component like renderHeader so it
// can be called identically from app.js and build/generate.js.
// ---------------------------------------------------------------
export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <nav class="footer-nav" aria-label="Footer">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
        <p class="footer-copyright">&copy; ${year} The JavaScript Book. All rights reserved.</p>
      </div>
    </footer>
  `;
}