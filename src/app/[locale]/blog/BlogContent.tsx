'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { blogPosts, type BlogPost } from '@/data/blog-posts';
import Image from 'next/image';

const categories = [
  { key: 'all', en: 'All Posts', pl: 'Wszystkie wpisy' },
  { key: 'dental-tourism', en: 'Dental Tourism', pl: 'Turystyka stomatologiczna' },
  { key: 'treatments', en: 'Treatments', pl: 'Zabiegi' },
  { key: 'guides', en: 'Guides', pl: 'Poradniki' },
  { key: 'oral-health', en: 'Oral Health', pl: 'Zdrowie jamy ustnej' },
] as const;

function PostCard({ post, locale }: { post: BlogPost; locale: string }) {
  const t = useTranslations('blog');
  const loc = locale as 'en' | 'pl';
  const categoryLabel = categories.find((c) => c.key === post.category);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
        <Image
          src={post.image}
          alt={post.title[loc]}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${post.imagePosition === 'top' ? 'object-top' : 'object-center'}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {categoryLabel?.[loc] ?? post.category}
          </span>
        </div>
      </div>

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

        <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
          <Link href={`/blog/${post.slug}`}>{post.title[loc]}</Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
          {post.excerpt[loc]}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
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
  );
}

export default function BlogContent() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const loc = locale as 'en' | 'pl';
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.key
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat[loc]}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-lg text-gray-400">
          {t('noPosts')}
        </p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </>
  );
}
