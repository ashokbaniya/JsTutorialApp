// ---------------------------------------------------------------
// Privacy Policy page.
//
// Follows the same content shape as other static pages on the site
// (article-wrap / article-title / article-intro / article-section),
// so it inherits the existing typography with zero new CSS beyond
// what article.css already provides.
//
// LAST_UPDATED is a manual constant rather than a live timestamp —
// it should only change when the policy text itself changes, not on
// every rebuild.
// ---------------------------------------------------------------

const LAST_UPDATED = 'July 30, 2026';
const CONTACT_EMAIL = 'reasonandhistory@gmail.com';

export function renderPrivacy() {
  return `
    <div class="article-wrap">
      <p class="eyebrow">Legal</p>
      <h1 class="article-title">Privacy Policy</h1>
      <p class="article-intro">Last updated: ${LAST_UPDATED}</p>

      <section class="article-section">
        <h2>Introduction</h2>
        <p>The JavaScript Book ("we," "us," or "our") operates this website to provide free, structured educational content about JavaScript. This Privacy Policy explains what information is collected when you visit the site, how it is used, and the choices available to you. By using this website, you agree to the practices described here.</p>
      </section>

      <section class="article-section">
        <h2>Information We Collect</h2>
        <p>We do not require visitors to create an account to read this site. We may collect limited information in the following ways:</p>
        <ul>
          <li><strong>Automatically collected data</strong> — such as your browser type, device type, approximate location (derived from IP address), pages visited, and time spent on the site, gathered through analytics tools.</li>
          <li><strong>Information you provide directly</strong> — such as your name, email address, subject, and message when you use the contact form on the <a href="/contact">Contact page</a>.</li>
        </ul>
        <p>We do not knowingly collect sensitive personal information such as financial details, government ID numbers, or health data.</p>
      </section>

      <section class="article-section">
        <h2>Cookies</h2>
        <p>Cookies are small text files stored on your device that help websites function and allow certain data to be remembered. This site may use cookies to:</p>
        <ul>
          <li>Remember your theme preference (light or dark mode)</li>
          <li>Understand aggregate site usage through analytics</li>
          <li>Support advertising, if and when ads are shown (see the AdSense section below)</li>
        </ul>
        <p>You can control or disable cookies through your browser settings at any time. Disabling cookies may affect some site features, such as remembering your theme preference.</p>
      </section>

      <section class="article-section">
        <h2>Google Analytics</h2>
        <p>We may use Google Analytics to understand how visitors use this site, so we can improve the content and structure of the book. Google Analytics collects information such as pages visited, time on page, and general geographic region, using cookies and similar technologies. This data is aggregated and does not directly identify you as an individual. You can learn more about how Google handles this data at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>, and you can opt out using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
      </section>

      <section class="article-section">
        <h2>Google AdSense</h2>
        <p>This site may display advertisements served by Google AdSense. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</p>
        <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. For more detail on how Google uses data when you use our site, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.</p>
      </section>

      <section class="article-section">
        <h2>Third-Party Services</h2>
        <p>We may use other third-party services (such as hosting, content delivery, or performance monitoring providers) that process limited technical data — such as IP address and request logs — as part of operating the site reliably. These providers are bound by their own privacy policies, and we encourage you to review them if you have questions about how they specifically handle data.</p>
      </section>

      <section class="article-section">
        <h2>External Links</h2>
        <p>This site may contain links to external websites (for example, MDN, specification documents, or other learning resources) that are not operated by us. We are not responsible for the content, accuracy, or privacy practices of any third-party site. We encourage you to review the privacy policy of any site you visit.</p>
      </section>

      <section class="article-section">
        <h2>Children's Privacy</h2>
        <p>This website is intended for a general audience interested in learning JavaScript and is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> so we can remove it.</p>
      </section>

      <section class="article-section">
        <h2>Data Security</h2>
        <p>We take reasonable technical and organizational measures to protect the information we handle from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
      </section>

      <section class="article-section">
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically.</p>
      </section>

      <section class="article-section">
        <h2>Contact Information</h2>
        <p>If you have questions about this Privacy Policy or how your information is handled, please contact us:</p>
        <p><strong>Email:</strong> <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        <p>You can also reach us through the <a href="/contact">Contact page</a>.</p>
      </section>
    </div>
  `;
}