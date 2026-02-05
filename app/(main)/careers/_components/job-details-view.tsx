"use client";

import { Container, Section } from "@/components/ds";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useJob } from "@/hooks/use-careers";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Copy,
  MapPin,
  Share2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface JobDetailsViewProps {
  slug: string;
}

export default function JobDetailsView({ slug }: JobDetailsViewProps) {
  const router = useRouter();
  const { data: job, isLoading, isError } = useJob(slug);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
    setIsShareOpen(false);
  };

  if (isLoading) {
    return <JobDetailsSkeleton />;
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
      <Section className="pb-0 pt-24">
        <Container className="max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Button
                variant="outline"
                className="pl-0 hover:bg-transparent hover:text-primary rounded-full hover:bg-primary/10 transition-all duration-300 ease-in-out hover:scale-105"
                onClick={() => router.push("/careers?action=scroll-to-jobs")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Careers
              </Button>
            </div>

            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  {job.title}
                </h1>
                
                 <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                   <Badge variant="outline" className="rounded-md">
                     {job.experienceLevel}
                   </Badge>
                </div>
              </div>

               {/* Apply Button (Top) */}
               <div className="flex gap-3 shrink-0">
                  <Link href={`/careers/apply?slug=${job.slug}`}>
                    <Button size="lg" className="rounded-full px-8">
                      Apply Now
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsShareOpen(true)}
                  >
                     <Share2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>
            
            <Separator />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Overview / Description */}
            <div className="mb-12 text-lg leading-relaxed text-muted-foreground">
               <p>{job.description}</p>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Responsibilities</h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Requirements</h2>
                 <ul className="space-y-4">
                  {job.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                       <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed">
                        {requirement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Benefits</h2>
                 <ul className="space-y-4">
                  {job.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                       <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Separator className="my-12"/>

            {/* Bottom CTA */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">Interested in this role?</h3>
              <p className="text-muted-foreground mb-8">
                 If you think you have what it takes, we&apos;d love to hear from you.
              </p>
               <div className="flex flex-wrap gap-4">
                  <Link href={`/careers/apply?slug=${job.slug}`}>
                    <Button size="lg" className="rounded-full px-8">
                      Apply for this Job
                    </Button>
                  </Link>
                   <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => router.push("/careers?action=scroll-to-jobs")}
                  >
                    View all jobs
                  </Button>
               </div>
            </div>

          </div>
        </Container>
      </Section>

      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this position</DialogTitle>
            <DialogDescription>
              Copy the link below to share this job opportunity.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                defaultValue={typeof window !== "undefined" ? window.location.href : ""}
                readOnly
              />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function JobDetailsSkeleton() {
  return (
    <>
      <Section className="pb-0 pt-24">
        <Container>
          <Skeleton className="h-4 w-24 mb-6" /> {/* Back button placeholder */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="w-full">
               <Skeleton className="h-10 w-3/4 md:w-1/2 mb-4" /> {/* Title */}
               <div className="flex gap-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
               </div>
            </div>
             <div className="flex gap-3 shrink-0">
               <Skeleton className="h-12 w-32 rounded-full" />
               <Skeleton className="h-12 w-12 rounded-full" />
             </div>
          </div>
          <Separator />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>

             {/* Sections Skeleton */}
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-7 w-48" />
                <div className="space-y-3">
                   {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-3">
                         <Skeleton className="h-2 w-2 rounded-full mt-2" />
                         <Skeleton className="h-5 w-full" />
                      </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
