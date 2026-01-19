

import { ArrowUpRight } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "../ds";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
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
];

const FAQ = () => {
  return (
    <Section>
      <Container>
        <h3 className="mt-0! pb-4  text-3xl md:text-5xl font-semibold tracking-wide">Frequently Asked Questions</h3>
        <h4 className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? Reach out to our
          customer support team.
        </h4>
        <div className=" mt-4 flex flex-col gap-4 md:mt-8 ">
          {content.map((item, index) => (
            <Accordion key={index} type="single" className="border-b border-b-secondary-foreground" collapsible>
              <AccordionItem value={item.question}>
                <AccordionTrigger className="text-left text-2xl font-semibold tracking-wide">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4 ">
                  {item.answer}
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                    >
                      Learn more <ArrowUpRight className="ml-1" size="16" />
                    </a>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
