"use client";

import { Container, Section } from "@/components/ds";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Most website projects take 4-8 weeks from start to finish. Larger web applications can take 3-6 months depending on complexity. We'll provide a detailed timeline after our initial discovery call.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! We offer monthly maintenance packages to keep your site secure, fast, and up-to-date. We can also provide retainer hours for ongoing design and development work.",
  },
  {
    question: "What is your pricing structure?",
    answer: "We work on a fixed-project fee basis or hourly retainer depending on the scope. Minimum engagement starts at $5k. We believe in transparent pricing with no hidden costs.",
  },
  {
    question: "Can you help with branding too?",
    answer: "Absolutely. We are a full-service creative studio. We can handle everything from logo design and brand strategy to UI/UX and full-stack development.",
  },
  {
    question: "How do we communicate during the project?",
    answer: "We use Slack for daily comms and Notion for project management. We also have weekly scheduled calls to review progress and gather feedback.",
  },
];

export function FAQ() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-muted-foreground">
              {`Everything you need to know about working with us. Can't find the answer you're looking for? Chat with our team.`}
            </p>
          </div>
          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
