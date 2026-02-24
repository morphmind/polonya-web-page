import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('kvkk.title') };
}

export default async function KvkkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal');

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('kvkk.title')}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{t('kvkk.lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="prose prose-gray prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2>1. Veri Sorumlusu (Data Controller)</h2>
          <p>
            In accordance with the Turkish Personal Data Protection Law No. 6698 (&ldquo;KVKK&rdquo;), Smile&Holiday, located at Tuzla Mah. Mustafa Kemal Bulvarı No:34, Fethiye, Muğla, Turkey, acts as the data controller for your personal data. This disclosure text has been prepared to inform you of your rights and our obligations under the KVKK.
          </p>

          <h2>2. Collected Personal Data Categories</h2>
          <p>The following categories of personal data may be collected and processed:</p>
          <ul>
            <li><strong>Identity Information:</strong> Name, surname, date of birth, T.C. Kimlik No. or passport number, nationality.</li>
            <li><strong>Contact Information:</strong> Address, email, telephone number, WhatsApp communication records.</li>
            <li><strong>Health Data:</strong> Dental X-rays, photographs, treatment history, medical history, current medications, allergies. This is classified as sensitive personal data (özel nitelikli kişisel veri) under Article 6 of the KVKK.</li>
            <li><strong>Financial Information:</strong> Bank account details, payment records, invoices.</li>
            <li><strong>Visual and Audio Data:</strong> Security camera recordings at clinic premises, clinical photographs.</li>
            <li><strong>Digital Data:</strong> Website usage data, IP addresses, cookie data.</li>
          </ul>

          <h2>3. Purposes of Data Processing</h2>
          <p>Your personal data is processed for the following purposes pursuant to Articles 5 and 6 of the KVKK:</p>
          <ul>
            <li>Planning, execution, and management of dental treatment and healthcare services.</li>
            <li>Arranging patient transfers and accommodation.</li>
            <li>Financial operations including invoicing and payment processing.</li>
            <li>Communication regarding appointments, treatment plans, and aftercare.</li>
            <li>Compliance with legal and regulatory obligations (Ministry of Health regulations, tax legislation).</li>
            <li>Responding to applications and requests from data subjects.</li>
            <li>Quality assurance, patient satisfaction surveys, and service improvement.</li>
            <li>Marketing and promotional activities (only with your explicit consent).</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>Your data is processed based on the following legal grounds under Article 5(2) and Article 6(3) of the KVKK:</p>
          <ul>
            <li>Explicit consent of the data subject (açık rıza).</li>
            <li>Necessary for the performance of a contract.</li>
            <li>Legal obligation of the data controller.</li>
            <li>Necessary for the establishment, exercise, or defense of a legal claim.</li>
            <li>Necessary for the legitimate interests of the data controller, provided this does not harm the fundamental rights of the data subject.</li>
            <li>For sensitive (health) data: explicit consent, or as required by law for public health protection and the execution of preventive medicine and medical treatment by authorized persons and institutions.</li>
          </ul>

          <h2>5. Transfer of Personal Data</h2>
          <p>Your personal data may be transferred to:</p>
          <ul>
            <li>Authorized public institutions and organizations as required by law (Ministry of Health, Turkish Revenue Administration).</li>
            <li>Service providers operating under data processing agreements (transfer companies, accommodation providers, IT service providers, payment processors).</li>
            <li>Dental laboratories for the fabrication of dental prosthetics.</li>
          </ul>
          <p>
            Transfers abroad are conducted in compliance with Article 9 of the KVKK, ensuring adequate protection through contractual safeguards or the data subject&apos;s explicit consent.
          </p>

          <h2>6. Data Collection Methods</h2>
          <p>Personal data is collected through:</p>
          <ul>
            <li>Website forms and online communication channels (email, WhatsApp).</li>
            <li>In-person interactions at the clinic.</li>
            <li>Dental examination and treatment procedures.</li>
            <li>Automated means such as cookies and analytics tools when you visit our website.</li>
          </ul>

          <h2>7. Data Retention Period</h2>
          <p>
            Personal data is retained for the duration necessary to fulfill the purposes for which it was collected, and for the minimum periods required by applicable legislation. Medical records are retained for at least 20 years pursuant to Turkish health legislation. Upon expiry of the retention period, data is deleted, destroyed, or anonymized in accordance with our data retention and destruction policy.
          </p>

          <h2>8. Rights of the Data Subject (Article 11 of the KVKK)</h2>
          <p>Under Article 11 of the KVKK, you have the right to:</p>
          <ul>
            <li>Learn whether your personal data is being processed.</li>
            <li>Request information about processing if your data has been processed.</li>
            <li>Learn the purpose of processing and whether it is being used in line with its purpose.</li>
            <li>Know the third parties to whom your data has been transferred domestically or abroad.</li>
            <li>Request rectification of incomplete or inaccurate data.</li>
            <li>Request deletion or destruction of your data under the conditions set out in Article 7 of the KVKK.</li>
            <li>Request notification of rectification, deletion, or destruction to third parties to whom your data has been transferred.</li>
            <li>Object to any result that is to your detriment arising from the analysis of your data exclusively through automated systems.</li>
            <li>Claim compensation for damages arising from the unlawful processing of your data.</li>
          </ul>

          <h2>9. How to Exercise Your Rights</h2>
          <p>
            To exercise your rights under the KVKK, you may submit a written application to our clinic or send an email to <strong>info@smileandholiday.com</strong> with the subject line &ldquo;KVKK Data Subject Request.&rdquo; Applications will be processed free of charge within 30 days. If your request requires additional effort, a fee may be charged in accordance with the tariff set by the Personal Data Protection Board.
          </p>

          <h2>10. Contact</h2>
          <p>
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
