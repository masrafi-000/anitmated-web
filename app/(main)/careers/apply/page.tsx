"use client";

import { Container } from "@/components/ds";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useJob } from "@/hooks/use-careers";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const applicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),

  // Professional Info
  educationLevel: z.string().optional(),
  yearsOfExperience: z.coerce.number().min(0, "Must be positive").optional(),
  currentDesignation: z.string().optional(),
  currentCompany: z.string().optional(),

  // Salary
  currentSalary: z.coerce.number().optional(),
  expectedSalary: z.coerce.number().optional(),

  // Documents
  resumeUrl: z.string().url("Please provide a valid URL for your resume (e.g., Google Drive, LinkedIn)"),
  coverLetter: z.string().optional(),

  // Skills (Comma separated strings for input, array for output)
  techSkills: z.string().optional(),
  softSkills: z.string().optional(),

  // Social Link s
  linkedInProfile: z.string().optional(),
  portfolioUrl: z.string().optional(),
  githubProfile: z.string().optional(),
  stackOverflow: z.string().optional(),
  codeForces: z.string().optional(),
  codeChef: z.string().optional(),
  hackerrank: z.string().optional(),
  leetCode: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

type Step = {
  id: string;
  title: string;
  fields: (keyof ApplicationFormValues)[];
};

const steps: Step[] = [
  {
    id: "personal",
    title: "Personal Information",
    fields: ["fullName", "email", "phone"]
  },
  {
    id: "professional",
    title: "Professional Details",
    fields: ["currentDesignation", "currentCompany", "yearsOfExperience", "educationLevel"]
  },
  {
    id: "social",
    title: "Social Profiles",
    fields: ["linkedInProfile", "portfolioUrl", "githubProfile", "stackOverflow", "leetCode", "hackerrank", "codeForces", "codeChef"]
  },
  {
    id: "final",
    title: "Resume & Expectations",
    fields: ["currentSalary", "expectedSalary", "resumeUrl", "techSkills", "coverLetter"]
  }
];

function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const { data: job, isLoading: isJobLoading, isError } = useJob(slug);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema) as Resolver<ApplicationFormValues>,
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      educationLevel: "",
      yearsOfExperience: undefined,
      currentDesignation: "",
      currentCompany: "",
      currentSalary: undefined,
      expectedSalary: undefined,
      resumeUrl: "",
      coverLetter: "",
      techSkills: "",
      softSkills: "",
      linkedInProfile: "",
      portfolioUrl: "",
      githubProfile: "",
      stackOverflow: "",
      codeForces: "",
      codeChef: "",
      hackerrank: "",
      leetCode: "",
    },
    mode: "onChange",
  });

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isValid = await form.trigger(fields);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    if (!job) return;

    setIsSubmitting(true);
    try {
      // Transform comma separated skills to arrays
      const techSkills = data.techSkills
        ? data.techSkills.split(",").map(s => s.trim()).filter(Boolean)
        : [];
      const softSkills = data.softSkills
        ? data.softSkills.split(",").map(s => s.trim()).filter(Boolean)
        : [];

      await api.post("/v0/careers/apply", {
        jobId: job.id,
        ...data,
        techSkills,
        softSkills,
      });

      toast.success("Application submitted successfully!");
      router.push("/careers");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isJobLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The job you are applying for cannot be found.
        </p>
        <Button onClick={() => router.push("/careers")}>Back to Careers</Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Apply for {job.title}</h1>
        <p className="text-muted-foreground">{job.department} · {job.location} · {job.type}</p>
      </div>

      {/* Steps Indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{steps[currentStep].title}</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold border-b pb-2">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentDesignation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Education</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Bachelors in CS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 3: Social Profiles */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold border-b pb-2">Social Profiles & Coding Handles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="linkedInProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Portfolio URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="GitHub URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stackOverflow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>StackOverflow</FormLabel>
                      <FormControl>
                        <Input placeholder="Profile URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leetCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LeetCode</FormLabel>
                      <FormControl>
                        <Input placeholder="Profile URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hackerrank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HackerRank</FormLabel>
                      <FormControl>
                        <Input placeholder="Profile URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codeForces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CodeForces</FormLabel>
                      <FormControl>
                        <Input placeholder="Profile URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codeChef"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CodeChef</FormLabel>
                      <FormControl>
                        <Input placeholder="Profile URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 4: Resume & Expectations */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-semibold border-b pb-2">Resume & Expectations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Salary</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expectedSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Salary</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL *</FormLabel>
                    <FormControl>
                      <Input placeholder="Google Drive / Dropbox / LinkedIn Link" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">Please make sure the link is accessible.</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="techSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="React, Node.js, TypeScript (comma separated)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us why you are a great fit..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 flex justify-between gap-4 border-t mt-8">
            {currentStep > 0 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancel
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Container>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ApplyContent />
    </Suspense>
  );
}
