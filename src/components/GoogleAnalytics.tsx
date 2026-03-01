'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function GoogleAnalytics() {
  const loadId = ADS_ID ?? GA_ID;
  if (!loadId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loadId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ''}
        `}
      </Script>
    </>
  );
}
