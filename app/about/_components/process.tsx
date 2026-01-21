import { Container, Section } from "@/components/ds";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We dive deep into your business goals, user needs, and market landscape to build a solid foundation.",
  },
  {
    number: "02",
    title: "Strategy",
    desc: "We map out the user journey, wireframes, and technical architecture to ensure a seamless execution.",
  },
  {
    number: "03",
    title: "Crafting",
    desc: "This is where magic happens. We design pixel-perfect interfaces and write clean, robust code.",
  },
  {
    number: "04",
    title: "Launch",
    desc: "We deploy with confidence, monitor performance, and iterate based on real user data.",
  },
];

export function Process() {
  return (
    <Section className="py-24 bg-foreground text-background">
      <Container>
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-background mb-4">
            How we do it
          </h2>
          <p className="text-background/70 text-lg max-w-2xl">
            Our proven methodology ensures consistency, quality, and speed. No guesswork, just results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step) => (
            <div key={step.number} className="relative group">
              <div className="text-6xl font-serif text-background/10 font-bold mb-4 absolute -top-8 -left-4 -z-10 group-hover:text-primary transition-colors duration-500 select-none">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 pl-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-background/70 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
