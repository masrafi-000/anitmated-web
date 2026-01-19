import { Container, Section } from "@/components/ds";

export function AboutHero() {
  return (
    <Section className="pt-20 pb-16 md:pt-32 md:pb-24">
      <Container>
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards">
            Crafting Digital <br className="hidden sm:block" />{" "}
            <span className="text-muted-foreground font-serif italic">Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl opacity-0 animate-in fade-in slide-in-from-bottom-8 delay-200 duration-700 fill-mode-forwards">
            We are a team of visionary designers and engineers dedicated to redefining the digital landscape, one pixel at a time.
          </p>
        </div>
      </Container>
    </Section>
  );
}
