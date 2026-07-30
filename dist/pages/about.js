export function renderAbout() {
  return `
    <div class="article-wrap">
      <p class="eyebrow">About</p>
      <h1 class="article-title">The JavaScript Book</h1>
      <p class="article-intro">A reference built to be read, not just searched — explaining JavaScript the way a good textbook would, with diagrams standing in for a whiteboard.</p>
      <section class="article-section">
        <h2><span class="section-num">01</span> Why this exists</h2>
        <p>Most JavaScript documentation is written for people who already understand the language and just need a reminder. This book is written the other way around — for the moment before that, when a concept like the Call Stack or a closure hasn't clicked yet.</p>
        <p>Every page follows the same shape on purpose: a plain-language explanation, a short worked example, a diagram, a step-by-step walkthrough, and a simple mental model. Consistency is what makes a reference easy to trust.</p>
      </section>
      <section class="article-section">
        <h2><span class="section-num">02</span> How to use it</h2>
        <p>Start from the beginning if you're new to the language, or search for the exact concept you're stuck on. Every article links to the ideas it depends on, so you can always step backward to fill in a gap.</p>
        <p><a href="#/">&larr; Back to the table of contents</a></p>
      </section>
    </div>
  `;
}
