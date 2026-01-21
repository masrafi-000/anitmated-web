"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  title: "Essential" | "Growth" | "Enterprise";
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  isPopular?: boolean;
}

const PRICING_DATA: PricingCardProps[] = [
  {
    title: "Essential",
    price: "$2,999",
    description: "Perfect for startups needing a solid brand foundation.",
    features: ["Logo & Brand Guidelines", "Landing Page UI/UX", "Next.js Implementation", "Basic SEO Setup"],
    cta: "Start Essential",
    href: "/contact",
  },
  {
    title: "Growth",
    price: "$5,999",
    description: "Ideal for scaling businesses requiring a comprehensive digital experience.",
    features: [
      "Complete Visual Identity",
      "Multi-Page UI/UX Design",
      "Advanced Motion (GSAP/Framer)",
      "CMS Integration",
      "Performance Optimization"
    ],
    cta: "Go for Growth",
    href: "/contact",
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For industry leaders needing bespoke products and dedicated partnership.",
    features: [
      "Product Strategy & Research",
      "Design System Documentation",
      "Scalable Web App Development",
      "Dedicated Support Team",
      "24/7 SLA"
    ],
    cta: "Contact Enterprise",
    href: "/contact",
  },
];

export const PricingSection = () => {
    return (
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
             <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Invest in Excellence
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
             {` Flexible engagement models tailored to elevate your brand's digital presence.`}
            </p>
          </div>
  
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRICING_DATA.map((plan, index) => (
              <PricingCard plan={plan} key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  };

const PricingCard = ({ plan }: { plan: PricingCardProps }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-background p-8 transition-all duration-300 hover:shadow-xl",
        plan.isPopular
          ? "z-10 scale-105 border-rose-500 shadow-lg ring-1 ring-rose-500/50"
          : "border-border hover:border-foreground/20"
      )}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <Badge className="bg-rose-500 hover:bg-rose-600">Most Popular</Badge>
        </div>
      )}

      <div className="mb-8 text-center">
        <h3 className="text-xl font-medium text-muted-foreground">{plan.title}</h3>
        <div className="mt-4 mb-2 text-4xl font-bold text-foreground">
          {plan.price}
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <ul className="mb-8 space-y-4">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start text-sm text-foreground/80">
            <CircleCheck className="mr-3 h-5 w-5 shrink-0 text-rose-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          asChild
          className={cn(
            "w-full rounded-full text-base font-semibold",
            plan.isPopular ? "bg-rose-500 hover:bg-rose-600 text-white" : "bg-foreground text-background hover:bg-foreground/90"
          )}
          size="lg"
        >
          <Link href={plan.href}>{plan.cta}</Link>
        </Button>
      </div>
    </div>
  );
};
