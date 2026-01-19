import { Container, Section } from "@/components/ds";
import { Heart, Lightbulb, Target } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To empower brands with digital experiences that not only look beautiful but drive real, measurable growth and engagement.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description: "To be the global standard for digital craftsmanship, where art meets technology to solve complex problems.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Integrity, innovation, and unwavering attention to detail define every line of code and every pixel we create.",
  },
];

export function Mission() {
  return (
    <Section className="py-16 md:py-24 bg-secondary/20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, idx) => (
            <div
              key={item.title}
              className="group p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
