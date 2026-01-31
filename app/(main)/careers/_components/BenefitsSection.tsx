import { Container, Section } from "@/components/ds";
import { Briefcase } from "lucide-react";
import { companyBenefits } from "../data";

export function BenefitsSection() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefits & Perks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We invest in our team with comprehensive benefits and perks that
            support your well-being and success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {companyBenefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
