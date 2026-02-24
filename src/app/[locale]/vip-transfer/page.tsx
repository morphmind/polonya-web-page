import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const sectionImages: Record<string, string> = {
  transferTitle: '/images/vip-transfer.png',
  accommodationTitle: '/images/vip-accommodation.png',
  dailyTransferTitle: '/images/vip-daily-transfer.png',
};

const sectionImagePosition: Record<string, string> = {
  dailyTransferTitle: 'object-bottom',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'vipTransfer' });
  return { title: t('title') };
}

export default async function VipTransferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('vipTransfer');
  const tc = await getTranslations('common');

  const features = t.raw('features') as string[];

  const sections = [
    {
      titleKey: 'transferTitle' as const,
      descKey: 'transferDesc' as const,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      gradient: 'from-cyan-50 to-primary/5',
    },
    {
      titleKey: 'accommodationTitle' as const,
      descKey: 'accommodationDesc' as const,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      gradient: 'from-emerald-50 to-secondary/5',
    },
    {
      titleKey: 'dailyTransferTitle' as const,
      descKey: 'dailyTransferDesc' as const,
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.504 1.028-1.123a4.484 4.484 0 00-.885-2.343c-.37-.492-.858-.858-1.395-1.034L16.5 12.75H3.375a1.125 1.125 0 01-1.125-1.125v-7.5A1.125 1.125 0 013.375 3h2.25M8.25 3v1.5M4.5 10.5h6.75" />
        </svg>
      ),
      gradient: 'from-sky-50 to-primary/5',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-20 sm:py-32">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#7CB5E0]/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-[#3AAB8E]/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.titleKey}
          className={idx % 2 === 1 ? 'bg-gray-50 py-20 sm:py-28' : 'py-20 sm:py-28'}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${section.gradient} shadow-xl ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                {sectionImages[section.titleKey] ? (
                  <Image
                    src={sectionImages[section.titleKey]}
                    alt={t(section.titleKey)}
                    fill
                    className={`object-cover ${sectionImagePosition[section.titleKey] ?? 'object-center'}`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 text-primary shadow-sm">
                      {section.icon}
                    </div>
                    <p className="mt-3 text-sm font-medium text-primary/50">{t(section.titleKey)}</p>
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h2 className="text-3xl font-bold text-gray-900">
                  {t(section.titleKey)}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  {t(section.descKey)}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                  <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartment Gallery */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('apartmentGalleryTitle')}
          </h2>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {[
              { src: '/images/apartment-gallery/1-view.png', alt: 'Marina view' },
              { src: '/images/apartment-gallery/2-vanity.png', alt: 'Vanity area' },
              { src: '/images/apartment-gallery/3-bathroom.png', alt: 'Bathroom' },
              { src: '/images/apartment-gallery/4-kitchen.png', alt: 'Kitchen' },
              { src: '/images/apartment-gallery/5-bedroom.png', alt: 'Bedroom' },
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
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
