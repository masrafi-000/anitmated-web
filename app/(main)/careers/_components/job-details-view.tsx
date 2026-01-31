"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useJob } from "@/hooks/use-careers";
import {
    ArrowLeft,
    Briefcase,
    CheckCircle2,
    Clock,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface JobDetailsViewProps {
  slug: string;
}

export default function JobDetailsView({ slug }: JobDetailsViewProps) {
  const router = useRouter();
  const { data: job, isLoading, isError } = useJob(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The position you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => router.push("/careers")}>Back to Careers</Button>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        title={job.title}
        desc={job.description} // Assuming API returns description or summary often used in header
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
                <span>{job.experienceLevel}</span> 
              </div>
            </div>

            {/* Back Button */}
            <div className="mb-12">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => router.push("/careers")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Careers
              </Button>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card className="border-muted/60 mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((responsibility: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          {responsibility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card className="border-muted/60 mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="border-muted/60 mb-12">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Benefits</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Apply CTA */}
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We&apos;d love to hear from you! Send us your resume and
                  portfolio, and tell us why you&apos;re excited about this role.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href={`/careers/apply?jobId=${job.id}`}>
                     {/* Or just /contact as in original? Original was /contact. I'll stick to /contact for now or check if there is an apply page. Original had /contact */}
                    <Button size="lg" className="rounded-full">
                      Apply Now
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => router.push("/careers")}
                  >
                    View Other Positions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
