"use client";

import { Benefits } from "@/components/contact/benefits";
import { FAQ } from "@/components/contact/faq";
import { Socials } from "@/components/contact/socials";
import { Support } from "@/components/contact/support";
import { Container, Section } from "@/components/ds";
import StepForm from "@/components/multistep-form";
import PageHeader from "@/components/parts/pageHeader";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Start Your Journey"
        desc="Ready to transform your digital presence? We're here to help. Fill out the form or drop by our studio."
        align="center"
      />

      <Section className="pt-0!">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left Column: Form */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  Tell us about your project
                </h3>
                <p className="text-muted-foreground">
                  We'd love to hear more about your goals. Please fill out the
                  form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <StepForm />

              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Email us
                    </p>
                    <a
                      href="mailto:hello@rubystudio.com"
                      className="text-sm font-semibold hover:underline"
                    >
                      hello@rubystudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Call us
                    </p>
                    <a
                      href="tel:+880123456789"
                      className="text-sm font-semibold hover:underline"
                    >
                      +880 1234 567 89
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Map */}
            <div className="lg:sticky lg:top-24 h-[600px] w-full rounded-2xl overflow-hidden border shadow-lg relative bg-muted">
              <Map
                center={[90.4125, 23.8103]}
                zoom={12}
              >
                <MapControls position="bottom-right" />
                <MapMarker longitude={90.4125} latitude={23.8103}>
                  <MarkerContent>
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                        <MapPin size={24} />
                      </div>
                    </div>
                  </MarkerContent>
                  <MarkerTooltip>
                    <div className="px-1 text-center">
                      <p className="font-bold text-sm">Ruby Studio HQ</p>
                      <p className="text-xs opacity-90">Dhaka, Bangladesh</p>
                    </div>
                  </MarkerTooltip>
                </MapMarker>
              </Map>

              {/* Overlay Card */}
              <div className="absolute top-6 left-6 z-10 rounded-lg border bg-background/95 p-4 shadow-xl backdrop-blur-sm max-w-[250px]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">Visit Our Studio</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Level 12, Ruby Tower,
                      <br />
                      Gulshan Avenue, Dhaka-1212,
                      <br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Benefits />
      <Socials />
      <FAQ />
      <Support />
    </>
  );
}