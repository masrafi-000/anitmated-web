"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    Briefcase,
    CheckCircle2,
    Clock,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { jobOpportunities } from "../data";

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = use(params);
  
  const job = jobOpportunities.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={job.title}
        desc={job.description}
        align="center"
      />

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Job Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
              <Badge variant="secondary" className="text-base px-4 py-2">
                {job.department}
              </Badge>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{job.experience} experience</span>
              </div>
            </div>

            {/* Back Button */}
            <div className="mb-12">
              <Link href="/careers">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Careers
                </Button>
              </Link>
            </div>

            {/* Responsibilities */}
            <Card className="border-muted/60 mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-muted/60 mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-muted/60 mb-12">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Apply CTA */}
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Apply?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We&apos;d love to hear from you! Send us your resume and portfolio, and tell us why you&apos;re excited about this role.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="rounded-full">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/careers">
                    <Button size="lg" variant="outline" className="rounded-full">
                      View Other Positions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
