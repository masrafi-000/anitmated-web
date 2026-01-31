import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HiringProcess() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Hiring Process
            </h2>
            <p className="text-muted-foreground">
              We&apos;ve designed a straightforward, respectful hiring process
              to find the best fit for both you and our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Apply</h3>
              <p className="text-sm text-muted-foreground">
                Submit your application and portfolio
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Review</h3>
              <p className="text-sm text-muted-foreground">
                We review your application within 5 days
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Interview</h3>
              <p className="text-sm text-muted-foreground">
                2-3 rounds with team members
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Offer</h3>
              <p className="text-sm text-muted-foreground">
                Welcome to the team!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-background rounded-2xl p-8 md:p-12 border">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Don&apos;t See the Right Role?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We&apos;re always interested in hearing from talented people. Sens
              us your resume and let us know how you&apos;d like to contribute
              to Ruby Studio.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
