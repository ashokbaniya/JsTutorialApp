import { CURRICULUM } from '../data/curriculum.js';

export function renderHome() {
  const parts = CURRICULUM.map((chapter) => `
    <li class="home-part">
      <a class="home-part-link" href="#/javascript/${chapter.topics[0].slug}">
        <span class="home-part-num">${chapter.num}</span>
        <span class="home-part-title">${chapter.title}</span>
        <span class="home-part-count">${chapter.topics.length} topics</span>
      </a>
    </li>
  `).join('');

  return `
    <div class="home-wrap">
      <div class="home-hero">
        <p class="home-kicker">THE JAVASCRIPT BOOK</p>
        <h1 class="home-title">Understand JavaScript<br/>from the inside out.</h1>
        <p class="home-subtitle">A visual guide to JavaScript concepts, execution, memory, scope, and the runtime.</p>
        <p class="home-desc">Read a clear explanation, see a worked example, then watch it happen in a diagram — the same three steps, chapter after chapter.</p>
        <div class="home-actions">
          <a class="btn-primary" href="#/javascript/what-is-javascript">Start Reading</a>
          <a class="link-secondary" href="#contents-list">Browse Contents</a>
        </div>
      </div>

      <p class="home-contents-label" id="contents-list">CONTENTS</p>
      <ul class="home-parts">${parts}</ul>

      <p class="home-note">Every chapter follows the same shape: what it is, a simple example, how it works underneath, a step-by-step walkthrough, and a plain-language mental model — so the book always reads like one continuous text, not a pile of separate pages.</p>
    </div>
  `;
}
