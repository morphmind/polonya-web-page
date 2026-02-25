'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const WHATSAPP_URL = 'https://wa.me/905428955470';

const treatmentOptions = [
  'implants',
  'veneers',
  'crowns',
  'whitening',
  'smileMakeover',
] as const;

export default function ContactForm() {
  const t = useTranslations('contact');
  const tTreatments = useTranslations('treatments');

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    dates: '',
    message: '',
    privacyConsent: false,
    dataConsent: false,
  });

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  }

  function validate() {
    const newErrors: Record<string, boolean> = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.message.trim()) newErrors.message = true;
    if (!form.privacyConsent) newErrors.privacyConsent = true;
    if (!form.dataConsent) newErrors.dataConsent = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setSubmitError(null);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      setSubmitError('Form yapılandırması eksik');
      setSending(false);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `[Smile&Holiday] Yeni mesaj: ${form.name.trim()}`,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          treatment: form.treatment || '-',
          dates: form.dates.trim() || '-',
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? 'Gönderim başarısız');
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
            <svg className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {t('form.success')}
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            {t('form.successSub')}
          </p>
          <div className="mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('form.whatsappRedirect')}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('form.name')} *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`mt-1.5 block w-full rounded-xl border ${errors.name ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none`}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('form.email')} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`mt-1.5 block w-full rounded-xl border ${errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('form.phone')} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder={t('form.phonePlaceholder')}
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={`mt-1.5 block w-full rounded-xl border ${errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none`}
                  />
                </div>
              </div>

              {/* Treatment & Dates */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
                    {t('form.treatment')}
                  </label>
                  <select
                    id="treatment"
                    value={form.treatment}
                    onChange={(e) => updateField('treatment', e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="">{t('form.selectTreatment')}</option>
                    {treatmentOptions.map((key) => (
                      <option key={key} value={key}>
                        {tTreatments(`${key}.title`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dates" className="block text-sm font-medium text-gray-700">
                    {t('form.dates')}
                  </label>
                  <input
                    id="dates"
                    type="text"
                    value={form.dates}
                    onChange={(e) => updateField('dates', e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('form.message')} *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={t('form.messagePlaceholder')}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`mt-1.5 block w-full rounded-xl border ${errors.message ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} bg-white px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none`}
                />
              </div>

              {/* Consents */}
              <div className="space-y-3">
                <label className={`flex items-start gap-3 cursor-pointer ${errors.privacyConsent ? 'text-red-600' : ''}`}>
                  <input
                    type="checkbox"
                    checked={form.privacyConsent}
                    onChange={(e) => updateField('privacyConsent', e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">
                    {t('form.privacyConsent')} *
                  </span>
                </label>
                <label className={`flex items-start gap-3 cursor-pointer ${errors.dataConsent ? 'text-red-600' : ''}`}>
                  <input
                    type="checkbox"
                    checked={form.dataConsent}
                    onChange={(e) => updateField('dataConsent', e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">
                    {t('form.dataConsent')} *
                  </span>
                </label>
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {t('form.error')}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {sending ? t('form.sending') : t('form.submit')}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-8">
              {/* Info Cards */}
              <div className="space-y-4">
                <InfoCard
                  icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  }
                  text={t('info.address')}
                  href="https://www.google.com/maps/dir//Smile+and+Holiday+Dental+Clinic,+Tuzla,+Mustafa+Kemal+Blv.+No:34,+48300+Fethiye%2FMu%C4%9Fla/@36.6275033,29.1243324,17z/"
                />
                <InfoCard
                  icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  }
                  text={t('info.phone')}
                  href={`tel:${t('info.phone').replace(/\s/g, '')}`}
                />
                <InfoCard
                  icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  }
                  text={t('info.email')}
                  href={`mailto:${t('info.email')}`}
                />
                <InfoCard
                  icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text={t('info.hours')}
                />
              </div>

              {/* Google Maps */}
              <div className="overflow-hidden rounded-2xl shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.5!2d29.1243324!3d36.6275033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c043bae11de0db%3A0xc909a856b41279a0!2sSmile%20and%20Holiday%20Dental%20Clinic!5e0!3m2!1sen!2str!4v1708300000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Smile&Holiday Dental Clinic - Google Maps"
                  className="aspect-[4/3] w-full"
                />
                <a
                  href="https://www.google.com/maps/dir//Smile+and+Holiday+Dental+Clinic,+Tuzla,+Mustafa+Kemal+Blv.+No:34,+48300+Fethiye%2FMu%C4%9Fla/@36.6275033,29.1243324,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="pt-2.5 text-sm font-medium text-gray-700">{text}</span>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}
