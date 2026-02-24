import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { routing } from '@/i18n/routing';
import { blogPosts } from '@/data/blog-posts';

const categoryLabels: Record<string, { en: string; pl: string }> = {
  'dental-tourism': { en: 'Dental Tourism', pl: 'Turystyka stomatologiczna' },
  treatments: { en: 'Treatments', pl: 'Zabiegi' },
  guides: { en: 'Guides', pl: 'Poradniki' },
  'oral-health': { en: 'Oral Health', pl: 'Zdrowie jamy ustnej' },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as 'en' | 'pl';
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title[loc],
    description: post.excerpt[loc],
    alternates: {
      languages: {
        pl: `/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title[loc],
      description: post.excerpt[loc],
      type: 'article',
      publishedTime: post.date,
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as 'en' | 'pl';

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');
  const tc = await getTranslations('common');

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const catLabel =
    categoryLabels[post.category]?.[loc] ?? post.category;

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'pl' ? 'pl-PL' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const shareUrl = `https://fethiyedentalclinic.com${locale === 'pl' ? '' : `/${locale}`}/blog/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[loc],
    description: post.excerpt[loc],
    image: `https://fethiyedentalclinic.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Smile&Holiday',
      url: 'https://fethiyedentalclinic.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Smile&Holiday',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fethiyedentalclinic.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl,
    },
    inLanguage: locale === 'pl' ? 'pl-PL' : 'en-US',
    wordCount: post.content[loc].split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              {tNav('home')}
            </Link>
            <ChevronIcon />
            <Link
              href="/blog"
              className="transition-colors hover:text-primary"
            >
              {tNav('blog')}
            </Link>
            <ChevronIcon />
            <span className="line-clamp-1 font-medium text-gray-900">
              {post.title[loc]}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            {catLabel}
          </span>
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title[loc]}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70">
            <span>
              {t('publishedOn')} {formattedDate}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>
              {post.readTime} {t('minRead')}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 shadow-xl">
          <Image
            src={post.image}
            alt={post.title[loc]}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-gray-600 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content[loc] }}
          />
        </div>
      </article>

      {/* Author Section */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 rounded-2xl bg-gray-50 p-6 sm:p-8">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
              <svg
                className="h-8 w-8 text-primary/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Smile&Holiday
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {locale === 'pl'
                  ? 'Nasz zespół doświadczonych stomatologów i specjalistów turystyki medycznej dzieli się wiedzą, aby pomóc Ci podjąć najlepszą decyzję dotyczącą Twojego uśmiechu.'
                  : 'Our team of experienced dentists and dental tourism specialists share expert insights to help you make the best decisions for your smile.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Share */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold text-gray-700">
            {locale === 'pl' ? 'Udostępnij artykuł' : 'Share this article'}
          </p>
          <div className="flex gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2] transition-colors hover:bg-[#1877F2] hover:text-white"
              aria-label="Share on Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title[loc])}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/10 text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
              aria-label="Share on X"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title[loc] + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
              aria-label="Share on WhatsApp"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2]/10 text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white"
              aria-label="Share on LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Back to Blog */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            {locale === 'pl' ? 'Powrót do bloga' : 'Back to Blog'}
          </Link>
        </div>
      </div>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            {locale === 'pl' ? 'Powiązane artykuły' : 'Related Articles'}
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <article
                key={related.slug}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
                  <div className="flex h-full items-center justify-center">
                    <svg
                      className="h-10 w-10 text-primary/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {categoryLabels[related.category]?.[loc] ??
                        related.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                    <time>
                      {new Date(related.date).toLocaleDateString(
                        locale === 'pl' ? 'pl-PL' : 'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>
                      {related.readTime} {t('minRead')}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
                    <Link href={`/blog/${related.slug}`}>
                      {related.title[loc]}
                    </Link>
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
                    {related.excerpt[loc]}
                  </p>

                  <Link
                    href={`/blog/${related.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    {t('readMore')}
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E] py-16 sm:py-24">
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

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
