'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const WHATSAPP_URL = 'https://wa.me/905428955470';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F85] via-[#4A8EC8] to-[#1E4A6E]" />

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 z-[1] h-full w-full object-cover opacity-30"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Modern mesh gradient overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,181,224,0.25) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(58,171,142,0.2) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 0% 80%, rgba(74,142,200,0.15) 0%, transparent 50%)',
        }}
      />

      {/* Subtle grid pattern - modern geometric */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.15) 100%)',
        }}
      />

      {/* Soft light accents - enhanced */}
      <div className="absolute -top-32 -right-32 z-[2] h-[500px] w-[500px] rounded-full bg-[#7CB5E0]/20 blur-3xl" />
      <div className="absolute -bottom-48 -left-32 z-[2] h-[600px] w-[600px] rounded-full bg-[#3AAB8E]/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <h1 className="animate-[fadeSlideUp_0.8s_ease-out_both] font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl animate-[fadeSlideUp_0.8s_ease-out_0.15s_both] text-lg leading-relaxed text-white/80 sm:text-xl">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex animate-[fadeSlideUp_0.8s_ease-out_0.3s_both] flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#4A8EC8] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:text-lg"
            >
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t('cta1')}
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] bg-[#25D366]/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366]/25 sm:text-lg"
            >
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('cta2')}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid w-full max-w-4xl animate-[fadeSlideUp_0.8s_ease-out_0.5s_both] grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            <TrustBadge
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              }
              label={t('trustBadge1')}
            />
            <TrustBadge
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label={t('trustBadge2')}
            />
            <TrustBadge
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.504 1.028-1.123a4.484 4.484 0 00-.885-2.343c-.37-.492-.858-.858-1.395-1.034L16.5 12.75H3.375a1.125 1.125 0 01-1.125-1.125v-7.5A1.125 1.125 0 013.375 3h2.25M8.25 3v1.5M4.5 10.5h6.75" />
                </svg>
              }
              label={t('trustBadge3')}
            />
            <TrustBadge
              icon={
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              }
              label={t('trustBadge4')}
            />
          </div>
        </div>
      </div>

      {/* CSS Keyframe animation */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-5 backdrop-blur-sm transition-colors hover:bg-white/15">
      <span className="text-[#7CB5E0]">{icon}</span>
      <span className="text-center text-sm font-medium leading-snug text-white/90">
        {label}
      </span>
    </div>
  );
}
