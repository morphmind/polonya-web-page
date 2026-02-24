'use client';

import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

export function ClientOnlyComponents() {
  return (
    <>
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
