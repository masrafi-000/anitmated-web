import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Agreement | Ruby Studio",
  description: "Terms of engagement and service agreement details.",
};

export default function ClientAgreementPage() {
  return (
    <>
      <PageHeader
        title="Client Agreement"
        desc="Understanding our partnership and mutual commitments."
        align="center"
      />
      
      <Section className="pb-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8 text-neutral-600 dark:text-neutral-400">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                1. Scope of Services
              </h2>
              <p>
                Ruby Studio agrees to perform the services described in the specific project proposal or statement of work provided to the Client. Any additional services requested by the Client that are not included in the original agreement will be billed separately using our standard hourly rates or a fixed quote.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                2. Payment Terms
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>A deposit of 50% is required before any work begins.</li>
                <li>The remaining 50% is due upon project completion and before final delivery/deployment.</li>
                <li>Invoices are due within 15 days of receipt. Late payments may incur a fee of 1.5% per month.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                3. Timeline and Delays
              </h2>
              <p>
               {` We strive to meet all project deadlines. However, effective progress relies on timely feedback and asset provision from your end. Ruby Studio shall not be liable for any delays caused by the Client\'s failure to provide necessary information or approvals in a timely manner.`}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                4. Intellectual Property
              </h2>
              <p>
                {`Upon full payment, the Client will own the copyright to the final code and visual designs created specifically for the project. Ruby Studio retains the right to reuse underlying frameworks, libraries, and tools developed prior to or during the project that are not specific to the Client\'s business logic.`}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                5. Revisions and Feedback
              </h2>
              <p>
                The project timeline typically includes two (2) rounds of revisions for each major deliverable. Additional revisions beyond this scope will be charged at our standard hourly rate.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                6. Termination
              </h2>
              <p>
                Either party may terminate this agreement with written notice if the other party breaches a material term. In the event of termination, the Client shall pay Ruby Studio for all work performed up to the date of termination.
              </p>
            </div>
            
             <p className="text-sm italic pt-8 border-t border-border">
                Effective Date: January 21, 2026
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
