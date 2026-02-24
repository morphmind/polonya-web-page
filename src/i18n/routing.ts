import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed', // Polonya: varsayılan dil (pl) URL'de prefix olmadan gösterilir: /, /about
  localeDetection: false, // Kök path her zaman Polonyaca gösterilir (tarayıcı diline göre yönlendirme yok)
});
