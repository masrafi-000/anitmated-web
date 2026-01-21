import { IntroSection, MotiveSection, PurposeSection } from "@/components/landing/content-sections";
import { GallerySection } from "@/components/landing/gallery-section";
import HeroRefactored from "@/components/landing/hero-section";
import { MarqueeDemo } from "@/components/landing/testimonial";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroRefactored />
      <IntroSection />
      <MotiveSection />
      <MarqueeDemo />
      <PurposeSection />
      <GallerySection />
      {/* Footer handles its own layout usually, but good to include if not in layout.tsx */}
    </main>
  );
}
