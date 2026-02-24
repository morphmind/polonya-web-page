import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: t('medicalDisclaimer.title') };
}

export default async function MedicalDisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legal');

  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('medicalDisclaimer.title')}
          </h1>
          <p className="mt-3 text-sm text-gray-500">{t('medicalDisclaimer.lastUpdated')}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="prose prose-gray prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2>1. General Information Only</h2>
          <p>
            The content provided on the Smile&Holiday website, including text, images, and other materials, is intended for general informational purposes only. It is not intended to be a substitute for professional dental or medical advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified healthcare provider with any questions you may have regarding a dental or medical condition.
          </p>

          <h2>2. No Doctor-Patient Relationship</h2>
          <p>
            Use of this website, submission of a contact form, or communication via WhatsApp or email does not establish a doctor-patient relationship. A clinical relationship is only established after an in-person or formal remote consultation has taken place and a treatment plan has been mutually agreed upon and signed.
          </p>

          <h2>3. Treatment Results</h2>
          <p>
            Before-and-after images, patient testimonials, and treatment descriptions displayed on this website are provided for illustrative purposes. Individual results may vary significantly based on factors including but not limited to:
          </p>
          <ul>
            <li>The patient&apos;s existing dental and medical condition.</li>
            <li>Bone density, gum health, and oral hygiene practices.</li>
            <li>Adherence to pre-treatment and post-treatment care instructions.</li>
            <li>Individual biological response to treatment.</li>
            <li>Lifestyle factors such as smoking, diet, and oral care habits.</li>
          </ul>
          <p>
            We do not guarantee specific outcomes, and past results are not a guarantee of future results for any individual patient.
          </p>

          <h2>4. Risks and Complications</h2>
          <p>
            All dental procedures carry inherent risks and potential complications, which may include but are not limited to:
          </p>
          <ul>
            <li>Pain, swelling, or discomfort during and after treatment.</li>
            <li>Infection at the treatment site.</li>
            <li>Temporary or permanent nerve damage causing numbness or altered sensation.</li>
            <li>Implant failure or rejection.</li>
            <li>Allergic reactions to materials or medications.</li>
            <li>Need for additional or corrective procedures.</li>
          </ul>
          <p>
            Our dental team will discuss specific risks relevant to your treatment during the consultation process. Informed consent will be obtained before any procedure is performed.
          </p>

          <h2>5. Pricing Information</h2>
          <p>
            Prices displayed on this website are approximate and provided for general guidance. Final pricing is determined after a thorough dental examination and treatment plan preparation. Factors that may affect the final cost include treatment complexity, materials selected, number of teeth or units involved, and any additional procedures that may be required.
          </p>

          <h2>6. Professional Qualifications</h2>
          <p>
            All dental treatments at Smile&Holiday are performed by licensed dental professionals registered with the Turkish Ministry of Health. Our dentists maintain their qualifications through continuing professional development. However, dental regulations and licensing standards may differ between Turkey and your home country.
          </p>

          <h2>7. Third-Party Content</h2>
          <p>
            This website may contain links to third-party websites or resources. These links are provided for convenience and informational purposes only. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites. Accessing third-party links is at your own risk.
          </p>

          <h2>8. Emergency Medical Situations</h2>
          <p>
            This website is not designed for emergency medical situations. If you are experiencing a dental or medical emergency, please contact your local emergency services or visit the nearest hospital immediately.
          </p>

          <h2>9. Updates</h2>
          <p>
            We may update this Medical Disclaimer periodically. The &ldquo;Last updated&rdquo; date at the top of this page indicates when this disclaimer was last revised.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about this Medical Disclaimer, please contact:<br />
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
