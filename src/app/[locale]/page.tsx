import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import TreatmentsPreview from '@/components/home/TreatmentsPreview';
import DentalTourismPreview from '@/components/home/DentalTourismPreview';
import BeforeAfterPreview from '@/components/home/BeforeAfterPreview';
import GoogleReviewsRibbon from '@/components/home/GoogleReviewsRibbon';
import BlogPreview from '@/components/home/BlogPreview';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TreatmentsPreview />
      <DentalTourismPreview />
      <BeforeAfterPreview />
      <GoogleReviewsRibbon />
      <BlogPreview />
      <FAQ />
      <FinalCTA />
    </>
  );
}
