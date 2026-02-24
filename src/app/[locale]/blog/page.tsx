import { getTranslations, setRequestLocale } from 'next-intl/server';
import BlogContent from './BlogContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      languages: { pl: '/blog', en: '/en/blog' },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-20 sm:py-28">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#7CB5E0]/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[600px] w-[600px] rounded-full bg-[#3AAB8E]/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogContent />
        </div>
      </section>
    </>
  );
}
