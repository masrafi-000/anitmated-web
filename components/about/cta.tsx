import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to make something <br />
            <span className="text-primary italic font-serif">extraordinary?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {`Whether you have a fully formed idea or just a spark of inspiration, we're ready to help you bring it to life.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <Link href="/contact">
                <Button size="lg" className="h-12 px-8 text-base">
                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             </Link>
             <Link href="/portfolio">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                View Our Work
                </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
