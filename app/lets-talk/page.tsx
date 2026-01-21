"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { ChatInterface } from "./_components/chat-interface";

export default function LetsTalkPage() {
  return (
    <>
      <PageHeader
        title="Let's Talk"
        desc="Have a project in mind? Chat with us directly and let's get things moving."
        align="center"
      />

      <Section className="pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ChatInterface />
          </div>
        </Container>
      </Section>
    </>
  );
}
