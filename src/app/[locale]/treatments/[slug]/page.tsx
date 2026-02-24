import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Image from 'next/image';

const treatmentImages: Record<string, string> = {
  implants: '/images/treatments/implants.png',
  veneers: '/images/treatments/veneers.png',
  crowns: '/images/treatments/crowns.png',
  whitening: '/images/treatments/whitening.png',
  'smile-makeover': '/images/treatments/smile-makeover.png',
};

const slugToKey: Record<string, string> = {
  implants: 'implants',
  veneers: 'veneers',
  crowns: 'crowns',
  whitening: 'whitening',
  'smile-makeover': 'smileMakeover',
};

const allSlugs = Object.keys(slugToKey);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const key = slugToKey[slug];
  if (!key) return {};
  const t = await getTranslations({ locale, namespace: 'treatments' });
  return { title: t(`${key}.title`) };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const key = slugToKey[slug];
  if (!key) notFound();

  const t = await getTranslations('treatments');
  const tc = await getTranslations('common');
  const tNav = await getTranslations('nav');

  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const features = t.raw(`${key}.features`) as string[];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              {tNav('home')}
            </Link>
            <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <Link href="/treatments" className="hover:text-primary transition-colors">
              {tNav('treatments')}
            </Link>
            <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="font-medium text-gray-900">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 shadow-xl">
              {treatmentImages[slug] ? (
                <Image
                  src={treatmentImages[slug]}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg className="h-16 w-16 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <p className="mt-3 text-sm font-medium text-primary/40">{title}</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {description}
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('title')}
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                        <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-20 sm:py-28">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#7CB5E0]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#3AAB8E]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {tc('freeConsultation')}
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#4A8EC8] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {tc('getStarted')}
            </Link>
            <a
              href="https://wa.me/905428955470"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#25D366] bg-[#25D366]/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366]/25"
            >
              {tc('whatsappChat')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
