"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_CONTENT: FAQItem[] = [
  {
    question: "What is your design process?",
    answer:
      "We follow a user-centric approach, starting with deep research, followed by iterative design and prototyping, and finishing with pixel-perfect implementation and testing.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope, but a standard branding and web project typically takes 4-8 weeks from kickoff to launch. We will provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, we provide comprehensive maintenance packages to ensure your digital asset remains secure, updated, and performing at its best long after launch.",
  },
  {
    question: "Can you work with existing brand guidelines?",
    answer:
      "Absolutely. We can strictly adhere to your existing guidelines or help evolve them to meet new digital standards if you look to refresh your brand.",
  },
   {
    question: "Do you build custom solutions or use templates?",
    answer:
      "We specialize in custom design and development tailored to your specific goals. While we may use frameworks for efficiency, the end result is always unique to your brand.",
  },
];

export const FAQSection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            {/* Header / Left Column */}
            <div>
                 <span className="mb-4 inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
                    FAQ
                </span>
                <h3 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                    Frequently Asked Questions
                </h3>
                <p className="text-muted-foreground">
                    Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support team.
                </p>
            </div>

            {/* Accordion / Right Column */}
            <div className="mx-auto w-full max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                    {FAQ_CONTENT.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg font-medium">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
      </div>
    </section>
  );
};
