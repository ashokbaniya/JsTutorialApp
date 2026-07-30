import { CURRICULUM } from './data/curriculum.js';

// Flatten once for fast in-memory search — entirely client side, no network.
const INDEX = [];
CURRICULUM.forEach((chapter) => {
  chapter.topics.forEach((topic) => {
    INDEX.push({ ...topic, chapterTitle: chapter.title, chapterNum: chapter.num });
  });
});

export function searchTopics(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts = [];
  const contains = [];
  INDEX.forEach((item) => {
    const title = item.title.toLowerCase();
    if (title.startsWith(q)) starts.push(item);
    else if (title.includes(q)) contains.push(item);
  });
  return [...starts, ...contains].slice(0, limit);
}

export function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  function renderResults(list, query) {
    if (!query) {
      results.innerHTML = '';
      results.classList.add('hidden');
      return;
    }
    if (list.length === 0) {
      results.innerHTML = `<div class="search-empty">No concepts match &ldquo;${query}&rdquo;.</div>`;
      results.classList.remove('hidden');
      return;
    }
    results.innerHTML = `
      <div class="search-results-group-label">Concepts</div>
      ${list.map((item) => `
        <a class="search-result" href="/javascript/${item.slug}" data-slug="${item.slug}">
          ${item.title}
          <span class="part-label">${item.chapterNum}. ${item.chapterTitle}</span>
        </a>
      `).join('')}
    `;
    results.classList.remove('hidden');
  }

  input.addEventListener('input', () => {
    const query = input.value;
    renderResults(searchTopics(query), query.trim());
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) renderResults(searchTopics(input.value), input.value.trim());
  });

  results.addEventListener('click', () => {
    input.value = '';
    results.classList.add('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.add('hidden');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      results.classList.add('hidden');
      input.blur();
    }
  });
}
