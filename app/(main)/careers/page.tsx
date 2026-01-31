"use client";

import { BenefitsSection } from "@/app/(main)/careers/_components/BenefitsSection";
import { HiringProcess } from "@/app/(main)/careers/_components/HiringProcess";
import { OpenPositions } from "@/app/(main)/careers/_components/OpenPositions";
import { WhyRubyStudio } from "@/app/(main)/careers/_components/WhyRubyStudio";
import PageHeader from "@/components/parts/pageHeader";

export default function CareersPage() {
  return (
    <>
      {/* Section 1: Hero/Header */}
      <PageHeader
        title="Join Our Team"
        desc="Build your career at Ruby Studio. We're looking for talented, passionate individuals who want to create exceptional digital experiences and make a real impact."
        align="center"
      />

      {/* Section 2: Why Ruby Studio */}
      <WhyRubyStudio />

      {/* Section 3: Benefits & Perks */}
      <BenefitsSection />

      {/* Section 4: Open Positions by Department */}
      <OpenPositions />

      {/* Section 5: Application Process & CTA */}
      <HiringProcess />
    </>
  );
}
