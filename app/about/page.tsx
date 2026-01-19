"use client"
import { AboutCTA } from "@/components/about/cta";
import { Mission } from "@/components/about/mission-vision";
import { Process } from "@/components/about/process";
import { Story } from "@/components/about/story";
import PageHeader from "@/components/parts/pageHeader";
import { useRouter } from "next/navigation";

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