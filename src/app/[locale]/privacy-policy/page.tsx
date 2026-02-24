import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('privacyPolicy.title') };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal');

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('privacyPolicy.title')}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{t('privacyPolicy.lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="prose prose-gray prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2>1. Data Controller</h2>
          <p>
            Smile&Holiday (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), located at Tuzla Mah. Mustafa Kemal Bulvarı No:34, Fethiye, Muğla, Turkey, is the data controller responsible for your personal data. We are committed to protecting your privacy in accordance with the EU General Data Protection Regulation (GDPR), the Turkish Personal Data Protection Law (KVKK, Law No. 6698), and all applicable data protection legislation.
          </p>

          <h2>2. Personal Data We Collect</h2>
          <p>We may collect and process the following categories of personal data:</p>
          <ul>
            <li><strong>Identity Data:</strong> Full name, date of birth, nationality, passport or identity document details.</li>
            <li><strong>Contact Data:</strong> Email address, phone number, postal address.</li>
            <li><strong>Health Data:</strong> Dental records, X-rays, treatment history, medical conditions relevant to dental treatment, photographs of teeth and oral structures.</li>
            <li><strong>Financial Data:</strong> Payment details, billing information, insurance details.</li>
            <li><strong>Technical Data:</strong> IP address, browser type and version, time zone, operating system, and other technology identifiers on the devices you use to access our website.</li>
            <li><strong>Communication Data:</strong> Records of correspondence via email, WhatsApp, contact forms, and phone calls.</li>
          </ul>

          <h2>3. Legal Basis for Processing</h2>
          <p>We process your personal data on the following legal bases:</p>
          <ul>
            <li><strong>Consent:</strong> Where you have given explicit consent for processing, particularly for health data and marketing communications.</li>
            <li><strong>Contractual Necessity:</strong> Where processing is necessary for the performance of a contract for dental services.</li>
            <li><strong>Legal Obligation:</strong> Where we are required to process data to comply with Turkish healthcare regulations, tax laws, or other legal obligations.</li>
            <li><strong>Legitimate Interest:</strong> Where processing is necessary for our legitimate business interests, such as improving our services and ensuring security.</li>
          </ul>

          <h2>4. How We Use Your Data</h2>
          <p>Your personal data is used for the following purposes:</p>
          <ul>
            <li>Providing and managing your dental treatment and care.</li>
            <li>Arranging VIP airport transfers and accommodation.</li>
            <li>Communicating with you about appointments, treatment plans, and aftercare.</li>
            <li>Processing payments and maintaining financial records.</li>
            <li>Responding to inquiries submitted through our contact form or WhatsApp.</li>
            <li>Sending marketing communications (only with your explicit consent).</li>
            <li>Improving our website, services, and patient experience.</li>
            <li>Complying with legal and regulatory obligations.</li>
          </ul>

          <h2>5. Data Sharing and Transfers</h2>
          <p>
            We do not sell your personal data. We may share your data with trusted third parties only as necessary:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Transfer and accommodation partners, payment processors, IT service providers.</li>
            <li><strong>Legal Requirements:</strong> Government authorities or law enforcement when required by law.</li>
            <li><strong>Professional Advisors:</strong> Lawyers, auditors, and insurers where necessary.</li>
          </ul>
          <p>
            Where personal data is transferred outside the European Economic Area (EEA), we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected. Medical records are retained for a minimum of 20 years in accordance with Turkish healthcare regulations. Contact and marketing data is retained until you withdraw your consent or request deletion.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under the GDPR and KVKK, you have the following rights:</p>
          <ul>
            <li>Right of access to your personal data.</li>
            <li>Right to rectification of inaccurate or incomplete data.</li>
            <li>Right to erasure (&ldquo;right to be forgotten&rdquo;) where there is no legal obligation to retain data.</li>
            <li>Right to restrict processing in certain circumstances.</li>
            <li>Right to data portability.</li>
            <li>Right to object to processing based on legitimate interests or for direct marketing.</li>
            <li>Right to withdraw consent at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <strong>info@smileandholiday.com</strong>. We will respond within 30 days.
          </p>

          <h2>8. Security Measures</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These include encrypted data storage, secure communication channels (SSL/TLS), access controls, and regular security assessments.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            For questions about this Privacy Policy or to exercise your data protection rights, please contact:<br />
            <strong>Smile&Holiday</strong><br />
            Email: info@smileandholiday.com<br />
            Phone: +90 542 895 5470<br />
            Address: Tuzla Mah. Mustafa Kemal Bulvarı No:34, Fethiye, Muğla, Turkey
          </p>
        </div>
      </section>
    </>
  );
}
