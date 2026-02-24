import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smileandholiday.com';

const staticPaths = [
  '',
  '/about',
  '/contact',
  '/blog',
  '/treatments',
  '/before-after',
  '/dental-tourism',
  '/vip-transfer',
  '/cookie-policy',
  '/privacy-policy',
  '/terms-conditions',
  '/medical-disclaimer',
  '/kvkk',
] as const;

const treatmentSlugs = ['implants', 'veneers', 'crowns', 'whitening', 'smile-makeover'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Polonyaca (prefix yok - varsayılan dil)
  staticPaths.forEach((path) => {
    entries.push({
      url: `${BASE_URL}${path || '/'}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: {
          pl: `${BASE_URL}${path || '/'}`,
          en: `${BASE_URL}/en${path || ''}`,
        },
      },
    });
  });

  // Polonyaca blog yazıları
  blogPosts.forEach((post) => {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          pl: `${BASE_URL}/blog/${post.slug}`,
          en: `${BASE_URL}/en/blog/${post.slug}`,
        },
      },
    });
  });

  // Polonyaca tedavi sayfaları
  treatmentSlugs.forEach((slug) => {
    entries.push({
      url: `${BASE_URL}/treatments/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          pl: `${BASE_URL}/treatments/${slug}`,
          en: `${BASE_URL}/en/treatments/${slug}`,
        },
      },
    });
  });

  // İngilizce sayfalar (/en prefix) - arama motorlarının keşfetmesi için
  staticPaths.slice(1).forEach((path) => {
    entries.push({
      url: `${BASE_URL}/en${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          pl: `${BASE_URL}${path}`,
          en: `${BASE_URL}/en${path}`,
        },
      },
    });
  });
  entries.push({
    url: `${BASE_URL}/en`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: {
      languages: {
        pl: BASE_URL,
        en: `${BASE_URL}/en`,
      },
    },
  });

  blogPosts.forEach((post) => {
    entries.push({
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          pl: `${BASE_URL}/blog/${post.slug}`,
          en: `${BASE_URL}/en/blog/${post.slug}`,
        },
      },
    });
  });

  treatmentSlugs.forEach((slug) => {
    entries.push({
      url: `${BASE_URL}/en/treatments/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          pl: `${BASE_URL}/treatments/${slug}`,
          en: `${BASE_URL}/en/treatments/${slug}`,
        },
      },
    });
  });

  return entries;
}
