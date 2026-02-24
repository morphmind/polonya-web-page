# Smile&Holiday - Multi-language Website

Modern, fast, and SEO-optimized dental clinic website targeting Polish patients for dental tourism in Fethiye, Turkey.

## Tech Stack

- **Framework**: Next.js 16 (App Router, SSG)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl (Polish & English)
- **Deployment**: Vercel-ready

## Features

- **Multi-language**: Polish (default) & English with URL-based routing (`/pl/...`, `/en/...`)
- **SEO Optimized**: hreflang tags, LocalBusiness schema, BlogPosting schema, FAQ schema, SSG
- **GDPR Compliant**: Cookie consent banner, privacy policy, data processing consent
- **Blog System**: Multi-language blog with 8 posts, category filtering
- **Contact Form**: With GDPR checkboxes, treatment selection, date picker
- **WhatsApp Integration**: Floating button on all pages
- **Responsive**: Mobile-first design
- **Performance**: Static generation, optimized images, lazy loading

## Pages

| Page | Route |
|------|-------|
| Home | `/[locale]` |
| Treatments | `/[locale]/treatments` |
| Treatment Detail | `/[locale]/treatments/[slug]` |
| Dental Tourism | `/[locale]/dental-tourism` |
| Before & After | `/[locale]/before-after` |
| VIP Transfer | `/[locale]/vip-transfer` |
| Blog | `/[locale]/blog` |
| Blog Post | `/[locale]/blog/[slug]` |
| About | `/[locale]/about` |
| Contact | `/[locale]/contact` |
| Privacy Policy | `/[locale]/privacy-policy` |
| Cookie Policy | `/[locale]/cookie-policy` |
| Terms & Conditions | `/[locale]/terms-conditions` |
| KVKK | `/[locale]/kvkk` |
| Medical Disclaimer | `/[locale]/medical-disclaimer` |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=905428955470
CONTACT_FORM_TO_EMAIL=info@example.com
EMAIL_PROVIDER_API_KEY=your-api-key
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/pl` (default locale).

### Build

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Tailwind v4 theme + global styles
│   └── [locale]/                # Locale-based routing
│       ├── layout.tsx           # Root layout with Header, Footer, etc.
│       ├── page.tsx             # Home page
│       ├── not-found.tsx        # 404 page
│       ├── treatments/          # Treatments pages
│       ├── dental-tourism/      # Dental tourism page
│       ├── before-after/        # Before & After gallery
│       ├── vip-transfer/        # VIP Transfer page
│       ├── blog/                # Blog system
│       ├── about/               # About page
│       ├── contact/             # Contact page with form
│       ├── privacy-policy/      # GDPR Privacy Policy
│       ├── cookie-policy/       # Cookie Policy
│       ├── terms-conditions/    # Terms & Conditions
│       ├── kvkk/                # KVKK Notice
│       └── medical-disclaimer/  # Medical Disclaimer
├── components/
│   ├── Header.tsx               # Navigation with language switcher
│   ├── Footer.tsx               # Site footer
│   ├── WhatsAppButton.tsx       # Floating WhatsApp CTA
│   ├── CookieBanner.tsx         # GDPR cookie consent
│   ├── GoogleAnalytics.tsx      # GA4 integration
│   └── home/                    # Home page sections
├── data/
│   └── blog-posts.ts            # Blog post data (EN + PL)
├── i18n/
│   ├── routing.ts               # Locale routing config
│   ├── request.ts               # Server request config
│   └── navigation.ts            # Navigation helpers
└── middleware.ts                 # i18n middleware
messages/
├── en.json                      # English translations
└── pl.json                      # Polish translations
```

## Translations

All text content is stored in `messages/en.json` and `messages/pl.json`. To modify any text on the site, edit the corresponding translation file.

## Adding a New Blog Post

Add a new entry to `src/data/blog-posts.ts`:

```typescript
{
  slug: 'your-post-slug',
  category: 'dental-tourism',
  image: '/images/blog/your-image.jpg',
  date: '2026-03-01',
  readTime: 5,
  title: {
    en: 'English Title',
    pl: 'Polish Title',
  },
  excerpt: {
    en: 'English excerpt...',
    pl: 'Polish excerpt...',
  },
  content: {
    en: '<p>Full English content...</p>',
    pl: '<p>Full Polish content...</p>',
  },
}
```

## License

All rights reserved.
