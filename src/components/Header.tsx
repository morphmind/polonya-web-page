'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/treatments' as const, key: 'treatments' },
  { href: '/dental-tourism' as const, key: 'dentalTourism' },
  { href: '/before-after' as const, key: 'beforeAfter' },
  { href: '/vip-transfer' as const, key: 'vipTransfer' },
  { href: '/blog' as const, key: 'blog' },
  { href: '/about' as const, key: 'about' },
  { href: '/contact' as const, key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLocale = useCallback(
    (newLocale: 'pl' | 'en') => {
      router.replace(pathname, { locale: newLocale });
    },
    [router, pathname],
  );

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 shadow-lg shadow-gray-900/5 backdrop-blur-md border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90">
            <Image
              src="/images/logo.png"
              alt="Smile&Holiday"
              width={150}
              height={50}
              className="h-10 w-auto lg:h-11"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? 'text-primary'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                {isActive(href) && (
                  <span className="absolute inset-0 rounded-lg bg-primary/10" />
                )}
                <span className="relative z-10">{t(key)}</span>
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            {/* Language switcher */}
            <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50/80 p-0.5 text-sm font-medium">
              <button
                onClick={() => switchLocale('pl')}
                className={`rounded-lg px-3.5 py-1.5 transition-all duration-200 ${
                  locale === 'pl'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                PL
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`rounded-lg px-3.5 py-1.5 transition-all duration-200 ${
                  locale === 'en'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/contact"
              className="rounded-xl bg-gradient-to-r from-[#2C5F85] to-[#4A8EC8] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
            >
              {tc('freeConsultation')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex w-5 flex-col items-center gap-[5px]">
              <span
                className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-[300px] max-w-[85vw] transform border-l border-gray-100 bg-white shadow-2xl shadow-gray-900/10 transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto pt-20 pb-6">
          <nav className="flex flex-col gap-1 px-4">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4 border-t border-gray-100 px-4 pt-6">
            {/* Mobile language switcher */}
            <div className="flex items-center justify-center gap-1 overflow-hidden rounded-full border border-gray-200 text-sm font-medium">
              <button
                onClick={() => switchLocale('pl')}
                className={`flex-1 px-3 py-2 transition-colors ${
                  locale === 'pl'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                PL
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`flex-1 px-3 py-2 transition-colors ${
                  locale === 'en'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/contact"
              className="block rounded-xl bg-gradient-to-r from-[#2C5F85] to-[#4A8EC8] px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:opacity-95"
            >
              {tc('freeConsultation')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
