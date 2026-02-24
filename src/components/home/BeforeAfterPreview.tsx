'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const cases = [
  { id: 1, before: '/images/gallery/patient1-before.png', after: '/images/gallery/patient1-after.png' },
  { id: 2, before: '/images/gallery/patient2-before.png', after: '/images/gallery/patient2-after.png' },
  { id: 3, before: '/images/gallery/patient4-before.png', after: '/images/gallery/patient4-after.png' },
  { id: 4, before: '/images/gallery/patient6-before.png', after: '/images/gallery/patient6-after.png' },
];

export default function BeforeAfterPreview() {
  const t = useTranslations('beforeAfter');
  const tc = useTranslations('common');

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <Link
              key={c.id}
              href="/before-after"
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={c.before}
                    alt={`Patient ${c.id} - Before`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                  />
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={c.after}
                    alt={`Patient ${c.id} - After`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                  />
                  <span className="absolute bottom-2 right-2 rounded-md bg-primary/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    After
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          {tc('resultsDisclaimer')}
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/before-after"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3.5 text-base font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lg"
          >
            {tc('viewAll')}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
