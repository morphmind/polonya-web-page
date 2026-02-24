'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const includedKeys = [
  'transfer',
  'accommodation',
  'dailyTransfer',
  'consultation',
  'aftercare',
  'support',
] as const;

export default function DentalTourismPreview() {
  const t = useTranslations('dentalTourism');
  const tc = useTranslations('common');

  return (
    <section className="bg-accent py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {t('subtitle')}
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {t('intro')}
            </p>

            {/* Included items */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900">
                {t('included.title')}
              </h3>
              <ul className="mt-4 space-y-3">
                {includedKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm leading-relaxed text-gray-700">
                      {t(`included.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                href="/dental-tourism"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
              >
                {tc('learnMore')}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Google Maps */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-900/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.5!2d29.1243324!3d36.6275033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c043bae11de0db%3A0xc909a856b41279a0!2sSmile%20and%20Holiday%20Dental%20Clinic!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Smile&Holiday Dental Clinic - Fethiye"
                className="h-full w-full"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-gray-100 sm:-bottom-6 sm:-left-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                  <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">All-Inclusive</p>
                  <p className="text-xs text-gray-500">Transfer + Stay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
