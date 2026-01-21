"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { ChatInterface } from "./_components/chat-interface";
import { DirectContact } from "./_components/direct-contact";
import { ProcessSteps } from "./_components/process-steps";
import { ValueProposition } from "./_components/value-proposition";

export default function LetsTalkPage() {
  return (
    <>
      <PageHeader
        title="Let's Talk"
        desc="Have a project in mind? Chat with us directly and let's get things moving."
        align="center"
      />

      <Section className="pb-12!">
        <Container>
          <div className="mx-auto max-w-4xl">
            <ChatInterface />
          </div>
        </Container>
      </Section>
      
      {/* Value Proposition */}
      <Section className="py-12 md:py-24 bg-muted/30">
        <Container>
            <ValueProposition />
        </Container>
      </Section>

      {/* Process Steps */}
      <Section className="py-12 md:py-24">
         <Container>
            <div className="text-center mb-12 max-w-2xl mx-auto">
               <h2 className="text-3xl font-bold mb-4">How We Work</h2>
               <p className="text-muted-foreground">From our first conversation to the final launch, we ensure a smooth and transparent process.</p>
            </div>
            <ProcessSteps />
         </Container>
      </Section>

      {/* Direct Contact */}
      <Section className="pb-24 pt-0">
          <Container>
             <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
                 <h2 className="text-2xl font-semibold mb-8">Other Ways to Reach Us</h2>
                 <DirectContact />
             </div>
          </Container>
      </Section>
    </>
  );
}
