import { Container, Section } from "@/components/ds";
import { Clock, Shield, Sparkles, Zap } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "We work in efficient sprints to deliver high-quality results without the bloat.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Built with best practices for security and scalability from day one.",
  },
  {
    icon: Sparkles,
    title: "Premium Design",
    description: "Award-winning aesthetics that make your brand stand out from the noise.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our global team is always available to ensure your critical systems stay up.",
  },
];

export function Benefits() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <benefit.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
