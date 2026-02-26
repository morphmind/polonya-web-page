'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const galleryItems = [
  { id: 1, before: '/images/gallery/patient1-before.png', after: '/images/gallery/patient1-after.png' },
  { id: 2, before: '/images/gallery/patient2-before.png', after: '/images/gallery/patient2-after.png' },
  { id: 4, before: '/images/gallery/patient4-before.png', after: '/images/gallery/patient4-after.png' },
  { id: 5, before: '/images/gallery/patient5-before.png', after: '/images/gallery/patient5-after.png' },
  { id: 6, before: '/images/gallery/patient6-before.png', after: '/images/gallery/patient6-after.png' },
];

export default function BeforeAfterGallery() {
  const tc = useTranslations('common');
  const [lightbox, setLightbox] = useState<{ before: string; after: string } | null>(null);

  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => setLightbox({ before: item.before, after: item.after })}
              >
                <div className="grid grid-cols-2">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.before}
                      alt={`Patient ${item.id} - Before`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="rounded-full bg-gray-900/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        Before
                      </span>
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.after}
                      alt={`Patient ${item.id} - After`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        After
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-sm leading-relaxed text-amber-800">
              {tc('resultsDisclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="grid max-h-[85vh] w-full max-w-4xl grid-cols-2 gap-4 overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={lightbox.before}
                alt="Before"
                fill
                className="rounded-xl object-cover"
                sizes="50vw"
              />
              <div className="absolute bottom-3 left-3">
                <span className="rounded-full bg-gray-900/70 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                  Before
                </span>
              </div>
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src={lightbox.after}
                alt="After"
                fill
                className="rounded-xl object-cover"
                sizes="50vw"
              />
              <div className="absolute bottom-3 right-3">
                <span className="rounded-full bg-primary/80 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                  After
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
