"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { queryClient } from "@/lib/query-client";
import { TCContact, ZCContact } from "@/schema/zod/contactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const services = [
  { id: "branding", label: "Branding", desc: "Logo, Guidelines, Identity" },
  { id: "design", label: "Web Design", desc: "UI/UX, Landing Pages" },
  { id: "development", label: "Development", desc: "Next.js, React, CMS" },
  { id: "marketing", label: "Marketing", desc: "SEO, Content, Strategy" },
];

const budgets = [
  { id: "<5k", label: "< $5k" },
  { id: "5k-10k", label: "$5k - $10k" },
  { id: "10k-20k", label: "$10k - $20k" },
  { id: "20k+", label: "$20k+" },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<TCContact>({
    resolver: zodResolver(ZCContact),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      description: "",
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const { trigger, handleSubmit } = form;

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["name", "email", "company"]);
    } else if (step === 2) {
      isValid = await trigger(["service", "budget"]);
    }

    if (isValid) {
      setStep((p) => p + 1);
    }
  };

  const handleBack = () => {
    setStep((p) => p - 1);
  };

  const mutation = useCreateInquiry();

  const onSubmit = (body: TCContact) => {
    mutation.mutate(body, {
      onSuccess: (res) => {
        setIsSubmitted(true);
        queryClient.invalidateQueries({ queryKey: ["inquiries"] });
        toast.success(
          res?.message ||
            "Your request has been submitted successfully. Our team will reach out shortly.",
        );
      },
      onError: (error) => {
        toast.error(
          error.message ||
            "We could not submit your request at this time. Please try again later.",
        );
      },
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex h-full min-h-100 flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">Message Sent!</h3>
        <p className="text-muted-foreground text-lg max-w-md">
          {`Thanks for reaching out. We've received your inquiry and will get back to you within 24 hours.`}
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {step} of 3
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((step / 3) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 relative min-h-100"
        >
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">{`Let's start with your details`}</h2>
                <p className="text-muted-foreground">
                  So we can get back to you.
                </p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ruby Co." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Needs */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  What are you looking for?
                </h2>
                <p className="text-muted-foreground">
                  Help us understand your needs.
                </p>
              </div>

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Required</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {services.map((service) => (
                          <FormItem key={service.id}>
                            <FormControl>
                              <RadioGroupItem
                                value={service.id}
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all">
                              <span className="text-base font-semibold">
                                {service.label}
                              </span>
                              <span className="text-xs text-muted-foreground mt-1 group-hover:text-accent-foreground">
                                {service.desc}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Budget</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                      >
                        {budgets.map((b) => (
                          <FormItem key={b.id}>
                            <FormControl>
                              <RadioGroupItem
                                value={b.id}
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all">
                              <span className="text-sm font-medium">
                                {b.label}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Tell us about your project
                </h2>
                <p className="text-muted-foreground">
                  The more details, the better.
                </p>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your goals, timeline, and any specific requirements..."
                        className="min-h-37.5 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div /> /* Spacer */
            )}

            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next Step <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Request <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
