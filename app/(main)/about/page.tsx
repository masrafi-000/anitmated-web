"use client";

import PageHeader from "@/components/parts/pageHeader";
import { useRouter } from "next/navigation";
import { AboutCTA } from "./_components/cta";
import { Mission } from "./_components/mission-vision";
import { Process } from "./_components/process";
import { Story } from "./_components/story";

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title="Crafting Digital Excellence"
        desc="We are a team of visionary designers and engineers dedicated to redefining the digital landscape, one pixel at a time."
        align="center"
        showPrimary={true}
        primaryText="Start a Project"
        onPrimaryClick={() => router.push("/contact")}
        showSecondary={true}
        secondaryText="View Our Work"
        onSecondaryClick={() => router.push("/portfolio")}
      />
      <Mission />
      <Story />
      <Process />
      <AboutCTA />
    </>
  );
}
