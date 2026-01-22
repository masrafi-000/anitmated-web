"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { HelpCategories } from "./_components/help-categories";
import { HelpPolicy } from "./_components/help-policy";
import { SupportTicketForm } from "./_components/support-ticket-form";

export default function HelpCenterPage() {
  return (
    <>
      <PageHeader
        title="Help Center"
        desc="Need assistance? Our support team is here to help you resolve any issues."
        align="center"
      />

       {/* Section 1: Categories */}
      <Section className="pb-0!">
         <Container>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Browse by Topic</h2>
                 <p className="text-muted-foreground">Select a category to find the help you need.</p>
            </div>
            <HelpCategories />
         </Container>
      </Section>
      
      {/* Section 2: Policies/FAQ */}
      <Section>
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-12">
                   <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">Support Policy & FAQ</h2>
                        <p className="text-muted-foreground">Common questions and our commitment to you.</p>
                   </div>
                   <HelpPolicy />
               </div>
            </div>
        </Container>
      </Section>

      {/* Section 3: Contact Form */}
      <Section id="ticket-form" className="bg-muted/30">
        <Container>
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
                    <p className="text-muted-foreground">Submit a ticket and our team will get back to you.</p>
                </div>
                <SupportTicketForm />
            </div>
        </Container>
      </Section>
    </>
  );
}
