import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const treatmentSlugs = [
  { key: 'implants', slug: 'implants' },
  { key: 'veneers', slug: 'veneers' },
  { key: 'crowns', slug: 'crowns' },
  { key: 'whitening', slug: 'whitening' },
  { key: 'smileMakeover', slug: 'smile-makeover' },
] as const;

const treatmentImages: Record<string, string> = {
  implants: '/images/treatments/implants.png',
  veneers: '/images/treatments/veneers.png',
  crowns: '/images/treatments/crowns.png',
  whitening: '/images/treatments/whitening.png',
  smileMakeover: '/images/treatments/smile-makeover.png',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'treatments' });
  return { title: t('title') };
}

export default async function TreatmentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('treatments');
  const tc = await getTranslations('common');

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Treatment Cards Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentSlugs.map(({ key, slug }) => (
              <Link
                key={key}
                href={`/treatments/${slug}` as '/treatments'}
                className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={treatmentImages[key]}
                    alt={t(`${key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {t(`${key}.title`)}
                </h2>

                {/* Description */}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
                  {t(`${key}.description`)}
                </p>

                {/* Features */}
                <ul className="mt-5 space-y-2">
                  {(t.raw(`${key}.features`) as string[]).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More */}
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {tc('learnMore')}
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {tc('freeConsultation')}
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
            >
              {tc('getStarted')}
            </Link>
            <a
              href="https://wa.me/905428955470"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              {tc('whatsappChat')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
