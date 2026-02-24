'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faqKeys.map((num) => {
            const isOpen = openIndex === num;
            return (
              <div key={num}>
                <button
                  onClick={() => toggle(num)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-gray-900">
                    {t(`q${num}`)}
                  </span>

                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300">
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5 text-sm leading-relaxed text-gray-500">
                    {t(`a${num}`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
