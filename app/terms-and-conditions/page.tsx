import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ruby Studio",
  description: "Rules and regulations for the use of Ruby Studio's website.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        desc="Legal terms governing the use of our website and services."
        align="center"
      />
      
      <Section className="pb-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8 text-neutral-600 dark:text-neutral-400">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use Ruby Studio if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                2. Licenses and Intellectual Property
              </h2>
              <p>
                Unless otherwise stated, Ruby Studio and/or its licensors own the intellectual property rights for all material on Ruby Studio. All intellectual property rights are reserved. You may access this from Ruby Studio for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p className="font-medium mt-2">You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Republish material from Ruby Studio</li>
                <li>Sell, rent or sub-license material from Ruby Studio</li>
                <li>Reproduce, duplicate or copy material from Ruby Studio</li>
                <li>Redistribute content from Ruby Studio</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                3. Limitation of Liability
              </h2>
              <p>
                In no event shall Ruby Studio, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Ruby Studio, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                4. Governing Law
              </h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Ruby Studio operates, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                5. Changes to Terms
              </h2>
              <p>
                Ruby Studio is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review these Terms on a regular basis.
              </p>
            </div>
            
             <p className="text-sm italic pt-8 border-t border-border">
                Last Updated: January 21, 2026
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
