import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

export function Support() {
  return (
    <Section className="py-24">
      <Container>
        <div className="relative rounded-3xl bg-primary px-6 py-16 md:px-16 md:py-20 overflow-hidden text-primary-foreground text-center md:text-left">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
           <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-sm font-medium text-primary-foreground ring-1 ring-inset ring-primary-foreground/20">
                  <HelpCircle size={16} />
                  <span>Existing Customer?</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">
                  Need technical support?
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-xl">
                   {`If you're already a client and facing issues, check our documentation or open a ticket in the dedicated support portal for priority assistance.`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link href="/help-center">
                  <Button size="lg" variant="secondary" className="font-semibold">
                    Visit Help Center
                  </Button>
                </Link>
                <Link href="/help-center#ticket-form">
                  <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    Open Support Ticket <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
           </div>
        </div>
      </Container>
    </Section>
  );
}
