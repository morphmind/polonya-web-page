import { getTranslations, setRequestLocale } from 'next-intl/server';
import BeforeAfterGallery from './BeforeAfterGallery';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beforeAfter' });
  return { title: t('title') };
}

export default async function BeforeAfterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('beforeAfter');

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

      <BeforeAfterGallery />
    </>
  );
}
