'use client';

import { useTranslations } from 'next-intl';

const steps = [
  {
    num: '01',
    key: 'step1',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    num: '02',
    key: 'step2',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    num: '03',
    key: 'step3',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    num: '04',
    key: 'step4',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
] as const;

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
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

        {/* Steps */}
        <div className="relative mt-16 grid gap-8 sm:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block" />

          {steps.map((step, i) => (
            <div key={step.key} className="relative flex flex-col items-center text-center">
              {/* Number circle */}
              <div className="relative z-10 mb-6 flex h-28 w-28 flex-col items-center justify-center rounded-3xl bg-white shadow-lg shadow-primary/5 ring-1 ring-gray-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                <span className="text-xs font-bold tracking-widest text-primary/50">
                  STEP
                </span>
                <span className="text-2xl font-extrabold text-primary">
                  {step.num}
                </span>
                <span className="mt-1 text-primary/70">{step.icon}</span>
              </div>

              {/* Arrow between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute top-14 left-[calc(50%+64px)] hidden w-[calc(100%-128px)] items-center lg:flex">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-primary/30 to-primary/10" />
                  <svg className="h-3 w-3 -ml-px text-primary/30" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M4 1l5 5-5 5V1z" />
                  </svg>
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900">
                {t(`${step.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {t(`${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
