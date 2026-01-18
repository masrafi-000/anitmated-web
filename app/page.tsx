import { Container, Main, Section } from "@/components/ds";
import HeroSection from "@/components/landing/hero";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <HeroSection />
        </Container>
      </Section>
    </Main>
  );
}
