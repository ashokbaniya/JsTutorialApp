// ---------------------------------------------------------------
// Contact page.
//
// renderContact() returns the HTML string (called from app.js and
// build/generate.js, same pattern as every other page module).
//
// bindContactForm() wires up validation + submit handling and must
// be called after the returned HTML has been inserted into the DOM —
// mirrors how bindSidebarEvents() is called after renderSidebar() in
// app.js. There is currently no backend endpoint, so a valid submit
// opens the visitor's email client via a mailto: link pre-filled with
// their message instead of silently failing.
// ---------------------------------------------------------------

const CONTACT_EMAIL = 'reasonandhistory@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function renderContact() {
  return `
    <div class="article-wrap">
      <p class="eyebrow">Get in touch</p>
      <h1 class="article-title">Contact Us</h1>
      <p class="article-intro">Have a question, spotted an error, or want to suggest a topic for the book? Send a message below, or email us directly.</p>

      <section class="article-section">
        <div class="contact-info-box">
          <p><strong>Business Email:</strong> <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
          <p><strong>Response time:</strong> Usually within 48 hours.</p>
        </div>
      </section>

      <section class="article-section">
        <h2>Send a Message</h2>
        <form class="contact-form" id="contact-form" novalidate>
          <div class="form-field">
            <label for="contact-name">Name</label>
            <input type="text" id="contact-name" name="name" autocomplete="name">
            <p class="form-error" id="error-name" role="alert"></p>
          </div>

          <div class="form-field">
            <label for="contact-email">Email</label>
            <input type="email" id="contact-email" name="email" autocomplete="email">
            <p class="form-error" id="error-email" role="alert"></p>
          </div>

          <div class="form-field">
            <label for="contact-subject">Subject</label>
            <input type="text" id="contact-subject" name="subject" autocomplete="off">
            <p class="form-error" id="error-subject" role="alert"></p>
          </div>

          <div class="form-field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="6"></textarea>
            <p class="form-error" id="error-message" role="alert"></p>
          </div>

          <button type="submit" class="contact-submit">Send Message</button>
          <p class="form-status" id="contact-status" role="status"></p>
        </form>
      </section>
    </div>
  `;
}

export function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');
    const status = document.getElementById('contact-status');

    const nameValid = setFieldError(name, 'error-name', name.value.trim() ? '' : 'Please enter your name.');
    const emailValid = setFieldError(
      email,
      'error-email',
      !email.value.trim()
        ? 'Please enter your email.'
        : !EMAIL_RE.test(email.value.trim())
        ? 'Please enter a valid email address.'
        : ''
    );
    const subjectValid = setFieldError(subject, 'error-subject', subject.value.trim() ? '' : 'Please enter a subject.');
    const messageValid = setFieldError(message, 'error-message', message.value.trim() ? '' : 'Please enter a message.');

    if (!(nameValid && emailValid && subjectValid && messageValid)) {
      status.textContent = '';
      return;
    }

    // No backend endpoint is connected yet — fall back to opening the
    // visitor's own email client with the message pre-filled, so the
    // form still results in a real message being sent.
    const mailBody = `${message.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject.value.trim())}&body=${encodeURIComponent(mailBody)}`;

    status.textContent = 'Opening your email client…';
    window.location.href = mailtoUrl;
  });
}

function setFieldError(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
  input.classList.toggle('field-invalid', Boolean(message));
  return !message;
}