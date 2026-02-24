import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('cookiePolicy.title') };
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal');

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('cookiePolicy.title')}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{t('cookiePolicy.lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="prose prose-gray prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing site traffic, and enabling certain website features. Cookies may be &ldquo;session&rdquo; cookies (deleted when you close your browser) or &ldquo;persistent&rdquo; cookies (remaining on your device for a set period or until you delete them).
          </p>

          <h2>2. Types of Cookies We Use</h2>

          <h3>2.1. Strictly Necessary Cookies</h3>
          <p>
            These cookies are essential for the website to function properly. They enable core features such as page navigation, access to secure areas, and language preferences. The website cannot function correctly without these cookies, and they cannot be disabled.
          </p>
          <table>
            <thead>
              <tr><th>Cookie Name</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr><td>NEXT_LOCALE</td><td>Stores your language preference</td><td>1 year</td></tr>
              <tr><td>cookie_consent</td><td>Records your cookie consent preferences</td><td>1 year</td></tr>
            </tbody>
          </table>

          <h3>2.2. Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting information anonymously. We use this data to improve our website and services.
          </p>
          <table>
            <thead>
              <tr><th>Cookie Name</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr><td>_ga</td><td>Google Analytics — distinguishes unique users</td><td>2 years</td></tr>
              <tr><td>_ga_*</td><td>Google Analytics — maintains session state</td><td>2 years</td></tr>
            </tbody>
          </table>

          <h3>2.3. Marketing Cookies</h3>
          <p>
            Marketing cookies are used to track visitors across websites to display relevant advertisements. These cookies are only set with your explicit consent.
          </p>

          <h2>3. Managing Your Cookie Preferences</h2>
          <p>
            When you first visit our website, a cookie consent banner will appear allowing you to accept or reject non-essential cookies. You can change your preferences at any time by clicking the cookie settings link in the website footer.
          </p>
          <p>
            You can also control cookies through your browser settings. Most browsers allow you to view, manage, delete, and block cookies for specific websites. Please note that disabling certain cookies may impact website functionality.
          </p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and Other Site Data</li>
            <li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and Site Permissions → Manage and Delete Cookies</li>
          </ul>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies on our website are placed by third-party services that appear on our pages. We do not control the use of these cookies. The relevant third-party privacy policies govern how these cookies are used:
          </p>
          <ul>
            <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
          </ul>

          <h2>5. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. The &ldquo;Last updated&rdquo; date at the top of this page indicates when this policy was last revised. We encourage you to review this page periodically.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at:<br />
            <strong>Smile&Holiday</strong><br />
            Email: info@smileandholiday.com<br />
            Phone: +90 542 895 5470
          </p>
        </div>
      </section>
    </>
  );
}
