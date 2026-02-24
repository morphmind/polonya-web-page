import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ClientOnlyComponents } from '@/components/ClientOnlyComponents';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin', 'latin-ext'], variable: '--font-playfair', weight: ['400', '500', '600', '700', '800', '900'], display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as { siteName: string; siteDescription: string };

  return {
    title: {
      default: meta.siteName,
      template: `%s | ${meta.siteName}`,
    },
    description: meta.siteDescription,
    alternates: {
      canonical: locale === 'pl' ? '/' : `/${locale}`,
      languages: {
        pl: '/',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      siteName: meta.siteName,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'pl' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="alternate" hrefLang="pl" href="/" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ClientOnlyComponents />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
