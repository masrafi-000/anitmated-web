"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Package data
const packages = {
  essential: {
    title: "Essential",
    price: "$2,999",
    features: [
      "Logo & Brand Guidelines",
      "UI/UX Design for Landing Page",
      "Next.js Implementation",
      "SEO Best Practices",
    ],
  },
  growth: {
    title: "Growth",
    price: "$5,999",
    features: [
      "Complete Visual Identity",
      "Multi-Page UI/UX Design",
      "Advanced Motion (GSAP)",
      "CMS Integration",
    ],
  },
  enterprise: {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Product Strategy & Research",
      "Design System Documentation",
      "Scalable Web App Development",
      "Dedicated Support Team",
    ],
  },
};

// Form validation schemas
const step1Schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
});

const step2Schema = z.object({
  projectType: z.string().min(1, "Please select a project type"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(20, "Please provide at least 20 characters"),
});

const step3Schema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(4, "Invalid zip code"),
  country: z.string().min(2, "Please select a country"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const packageType = (searchParams.get("package") ||
    "essential") as keyof typeof packages;
  const selectedPackage = packages[packageType];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<
    Partial<Step1Data & Step2Data & Step3Data>
  >({});

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData,
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData,
  });

  // Step 3 form
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData,
  });

  const onStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const onStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const onStep3Submit = (data: Step3Data) => {
    const finalData = { ...formData, ...data, package: packageType };
    console.log("=== CHECKOUT FORM DATA ===");
    console.log(JSON.stringify(finalData, null, 2));
    console.log("=========================");

    // Show success message
    alert("Order submitted successfully! Check console for form data.");
  };

  return (
    <>
      <PageHeader
        title="Complete Your Order"
        desc="Fill out the form below to get started with your project. We'll review your information and get back to you within 24 hours."
        align="center"
      />

      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Package Summary */}
              <div className="lg:col-span-1">
                <Card className="border-primary/50 sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Order Summary</h3>
                    </div>

                    <div className="mb-4">
                      <Badge className="mb-2">
                        {selectedPackage.title} Package
                      </Badge>
                      <div className="text-3xl font-bold text-primary mb-4">
                        {selectedPackage.price}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="text-sm font-medium">Includes:</p>
                      {selectedPackage.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          {selectedPackage.price}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">
                          {selectedPackage.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Multi-step Form */}
              <div className="lg:col-span-2">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                            currentStep >= step
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {currentStep > step ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            step
                          )}
                        </div>
                        <span className="text-xs mt-2 text-muted-foreground">
                          {step === 1
                            ? "Personal"
                            : step === 2
                              ? "Project"
                              : "Billing"}
                        </span>
                      </div>
                      {step < 3 && (
                        <div
                          className={`h-1 flex-1 mx-2 transition-colors ${
                            currentStep > step ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">
                        Personal Information
                      </h3>
                      <form
                        onSubmit={step1Form.handleSubmit(onStep1Submit)}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            {...step1Form.register("fullName")}
                            placeholder="John Doe"
                          />
                          {step1Form.formState.errors.fullName && (
                            <p className="text-sm text-red-500 mt-1">
                              {step1Form.formState.errors.fullName.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...step1Form.register("email")}
                            placeholder="john@example.com"
                          />
                          {step1Form.formState.errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                              {step1Form.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            {...step1Form.register("phone")}
                            placeholder="+1 (555) 123-4567"
                          />
                          {step1Form.formState.errors.phone && (
                            <p className="text-sm text-red-500 mt-1">
                              {step1Form.formState.errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="company">Company (Optional)</Label>
                          <Input
                            id="company"
                            {...step1Form.register("company")}
                            placeholder="Rubu Co."
                          />
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button type="submit" className="rounded-full">
                            Next Step
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">
                        Project Details
                      </h3>
                      <form
                        onSubmit={step2Form.handleSubmit(onStep2Submit)}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="projectType">Project Type *</Label>
                          <Select
                            onValueChange={(value) =>
                              step2Form.setValue("projectType", value)
                            }
                            defaultValue={formData.projectType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">
                                Website Design & Development
                              </SelectItem>
                              <SelectItem value="webapp">
                                Web Application
                              </SelectItem>
                              <SelectItem value="mobile">Mobile App</SelectItem>
                              <SelectItem value="branding">
                                Branding & Identity
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {step2Form.formState.errors.projectType && (
                            <p className="text-sm text-red-500 mt-1">
                              {step2Form.formState.errors.projectType.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="timeline">Desired Timeline *</Label>
                          <Select
                            onValueChange={(value) =>
                              step2Form.setValue("timeline", value)
                            }
                            defaultValue={formData.timeline}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">
                                ASAP (1-2 months)
                              </SelectItem>
                              <SelectItem value="flexible">
                                Flexible (2-4 months)
                              </SelectItem>
                              <SelectItem value="planned">
                                Planned (4+ months)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {step2Form.formState.errors.timeline && (
                            <p className="text-sm text-red-500 mt-1">
                              {step2Form.formState.errors.timeline.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="budget">Budget Range *</Label>
                          <Select
                            onValueChange={(value) =>
                              step2Form.setValue("budget", value)
                            }
                            defaultValue={formData.budget}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2-5k">
                                $2,000 - $5,000
                              </SelectItem>
                              <SelectItem value="5-10k">
                                $5,000 - $10,000
                              </SelectItem>
                              <SelectItem value="10k+">$10,000+</SelectItem>
                            </SelectContent>
                          </Select>
                          {step2Form.formState.errors.budget && (
                            <p className="text-sm text-red-500 mt-1">
                              {step2Form.formState.errors.budget.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="description">
                            Project Description *
                          </Label>
                          <Textarea
                            id="description"
                            {...step2Form.register("description")}
                            placeholder="Tell us about your project, goals, and any specific requirements..."
                            rows={5}
                          />
                          {step2Form.formState.errors.description && (
                            <p className="text-sm text-red-500 mt-1">
                              {step2Form.formState.errors.description.message}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setCurrentStep(1)}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                          <Button type="submit" className="rounded-full">
                            Next Step
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Billing Information */}
                {currentStep === 3 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">
                        Billing Information
                      </h3>
                      <form
                        onSubmit={step3Form.handleSubmit(onStep3Submit)}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            {...step3Form.register("address")}
                            placeholder="123 Main Street"
                          />
                          {step3Form.formState.errors.address && (
                            <p className="text-sm text-red-500 mt-1">
                              {step3Form.formState.errors.address.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              {...step3Form.register("city")}
                              placeholder="New York"
                            />
                            {step3Form.formState.errors.city && (
                              <p className="text-sm text-red-500 mt-1">
                                {step3Form.formState.errors.city.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              {...step3Form.register("state")}
                              placeholder="NY"
                            />
                            {step3Form.formState.errors.state && (
                              <p className="text-sm text-red-500 mt-1">
                                {step3Form.formState.errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="zipCode">Zip Code *</Label>
                            <Input
                              id="zipCode"
                              {...step3Form.register("zipCode")}
                              placeholder="10001"
                            />
                            {step3Form.formState.errors.zipCode && (
                              <p className="text-sm text-red-500 mt-1">
                                {step3Form.formState.errors.zipCode.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="country">Country *</Label>
                            <Input
                              id="country"
                              {...step3Form.register("country")}
                              placeholder="United States"
                            />
                            {step3Form.formState.errors.country && (
                              <p className="text-sm text-red-500 mt-1">
                                {step3Form.formState.errors.country.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setCurrentStep(2)}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                          <Button type="submit" className="rounded-full">
                            Complete Order
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
