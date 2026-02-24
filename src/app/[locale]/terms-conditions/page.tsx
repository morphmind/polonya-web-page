import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('termsConditions.title') };
}

export default async function TermsConditionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal');

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('termsConditions.title')}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{t('termsConditions.lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="prose prose-gray prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2>1. Introduction</h2>
          <p>
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Smile&Holiday website and the dental treatment services we provide. By accessing our website or booking a treatment, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or services.
          </p>

          <h2>2. Services</h2>
          <p>
            Smile&Holiday provides dental treatment services including but not limited to dental implants, porcelain veneers, dental crowns, teeth whitening, and smile makeovers. All treatments are performed by licensed dental professionals at our clinic in Fethiye, Muğla, Turkey.
          </p>
          <p>
            Treatment plans are prepared following an initial consultation and review of dental records (X-rays, photographs, or in-person examination). All treatment plans and pricing are agreed upon in writing before treatment commences.
          </p>

          <h2>3. Booking and Treatment Process</h2>
          <ul>
            <li>Initial consultations can be arranged via our website contact form, email, or WhatsApp.</li>
            <li>A personalized treatment plan and cost estimate will be provided within 24 hours of receiving your dental records.</li>
            <li>Treatment begins only after you have reviewed, approved, and signed the treatment plan.</li>
            <li>We reserve the right to modify treatment plans if clinical conditions require changes. Any modifications will be discussed with you and require your consent before proceeding.</li>
          </ul>

          <h2>4. Complimentary Services</h2>
          <p>
            Subject to availability and specific treatment qualifications, we may provide complimentary VIP airport transfers (Dalaman Airport to Fethiye), apartment accommodation during treatment, and daily clinic transfers. These complimentary services:
          </p>
          <ul>
            <li>Are provided at our discretion and may be subject to minimum treatment value requirements.</li>
            <li>Cannot be exchanged for cash or alternative services.</li>
            <li>May be modified or withdrawn with reasonable notice.</li>
          </ul>

          <h2>5. Pricing and Payment</h2>
          <ul>
            <li>All prices quoted are in the currency specified in your treatment plan.</li>
            <li>A deposit may be required to confirm your booking and treatment dates.</li>
            <li>Final payment is due upon completion of treatment unless an alternative payment schedule has been agreed in writing.</li>
            <li>We accept bank transfer, credit/debit cards, and cash. Payment processing fees may apply for certain methods.</li>
          </ul>

          <h2>6. Cancellations and Refunds</h2>
          <ul>
            <li>You may cancel or reschedule your treatment by providing at least 7 days&apos; notice before your arrival date.</li>
            <li>Cancellations made less than 7 days before arrival may result in forfeiture of any deposit paid.</li>
            <li>Refunds for partially completed treatments will be assessed on a case-by-case basis.</li>
            <li>Complimentary services (transfers, accommodation) are non-refundable.</li>
          </ul>

          <h2>7. Patient Responsibilities</h2>
          <p>As a patient, you agree to:</p>
          <ul>
            <li>Provide accurate and complete medical and dental history.</li>
            <li>Disclose all medications, allergies, and health conditions.</li>
            <li>Follow pre-treatment and post-treatment care instructions provided by our dental team.</li>
            <li>Attend all scheduled appointments.</li>
            <li>Arrange adequate travel insurance covering medical treatment abroad.</li>
          </ul>

          <h2>8. Warranties and Guarantees</h2>
          <p>
            We stand behind the quality of our work. Specific warranty terms for each treatment type (e.g., implant warranties, veneer guarantees) will be provided in your treatment plan. Warranties are subject to compliance with aftercare instructions and attendance at recommended follow-up appointments.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            While we strive for the best possible outcomes, dental treatment results may vary due to individual patient conditions. We are not liable for outcomes that deviate from expectations where reasonable professional care has been exercised. Our total liability shall not exceed the amount paid for the specific treatment in question.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Republic of Turkey. Any disputes shall first be attempted to be resolved through mediation. If mediation fails, disputes shall be submitted to the competent courts in Fethiye, Muğla, Turkey.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. The updated version will be posted on our website with the revised &ldquo;Last updated&rdquo; date. Continued use of our services after changes constitutes acceptance of the revised Terms.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions regarding these Terms, please contact:<br />
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
