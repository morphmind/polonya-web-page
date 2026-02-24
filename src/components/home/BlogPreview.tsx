'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { blogPosts } from '@/data/blog-posts';
import Image from 'next/image';

const categoryLabels: Record<string, { en: string; pl: string }> = {
  'dental-tourism': { en: 'Dental Tourism', pl: 'Turystyka stomatologiczna' },
  treatments: { en: 'Treatments', pl: 'Zabiegi' },
  guides: { en: 'Guides', pl: 'Poradniki' },
  'oral-health': { en: 'Oral Health', pl: 'Zdrowie jamy ustnej' },
};

export default function BlogPreview() {
  const t = useTranslations('blog');
  const tc = useTranslations('common');
  const locale = useLocale();
  const loc = locale as 'en' | 'pl';

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        {/* Blog Cards */}
        <div className="mt-14 grid gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
                <Image
                  src={post.image}
                  alt={post.title[loc]}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${post.imagePosition === 'top' ? 'object-top' : 'object-center'}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {categoryLabels[post.category]?.[loc] ?? post.category}
                  </span>
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                  <time>
                    {new Date(post.date).toLocaleDateString(
                      locale === 'pl' ? 'pl-PL' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </time>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>
                    {post.readTime} {t('minRead')}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900 group-hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title[loc]}
                  </Link>
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                  {post.excerpt[loc]}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  {tc('readMore')}
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3.5 text-base font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lg"
          >
            {t('allPosts')}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
