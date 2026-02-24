'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="mx-auto max-w-lg px-4 text-center">
        <p className="text-8xl font-extrabold text-primary/20">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          {t('description')}
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('backHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}
