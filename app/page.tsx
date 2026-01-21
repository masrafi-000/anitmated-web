import { IntroSection, MotiveSection, PurposeSection } from "@/components/landing/content-sections";
import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { GallerySection } from "@/components/landing/gallery-section";
import HeroRefactored from "@/components/landing/hero-section";
import { MarqueeDemo } from "@/components/landing/testimonial";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroRefactored />
      <IntroSection />
      <MotiveSection />
      <PurposeSection />
      <GallerySection />
      <MarqueeDemo />
      <FAQSection />
      <CTASection />
      
    </main>
  );
}
