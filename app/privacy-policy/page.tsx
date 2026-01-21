import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ruby Studio",
  description: "Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        desc="Your privacy is important to us. Transparent, secure, and compliant."
        align="center"
      />
      
      <Section className="pb-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8 text-neutral-600 dark:text-neutral-400">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                1. Introduction
              </h2>
              <p>
                At Ruby Studio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclosure, and safeguard your data when you visit our website or use our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                2. Information We Collect
              </h2>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out contact or project inquiry forms.</li>
                <li>Subscribe to our newsletter.</li>
                <li>Communicate with us via email or social media.</li>
              </ul>
              <p>The types of information we may collect include your name, email address, phone number, company name, and details about your project requirements.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website and services.</li>
                <li>Communicate with you regarding project updates, inquiries, and proposals.</li>
                <li>{`Improve our website's user experience and functionality.`}</li>
                <li>Send relevant marketing communications (only if you have opted in).</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                4. Data Security
              </h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>

             <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                5. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any websites you visit.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:hello@rubystudio.com" className="text-primary hover:underline">hello@rubystudio.com</a>.
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
