import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "@/hooks/use-packages";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Container, Section } from "../ds";

interface PricingProps {
  packages: Package[];
}

const Pricing = ({ packages = [] }: PricingProps) => {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="my-0! text-4xl tracking-wide font-semibold">
          Invest in Excellence
        </h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>{`Flexible engagement models tailored to elevate your brand's digital presence.`}</Balancer>
        </p>

        <div className=" mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((plan) => (
            <PricingCard plan={plan} key={plan.id} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

const PricingCard = ({ plan }: { plan: Package }) => {
  // Mapping description based on title/slug would be ideal if description isn't in DB.
  // The DB schema didn't have description in Package model! 
  // I should've added description to Package model. 
  // For now I'll hardcode descriptions based on slug or leave empty.
  
  const descriptions: Record<string, string> = {
    essential: "Perfect for startups needing a solid brand foundation and web presence.",
    growth: "Ideal for scaling businesses requiring a comprehensive digital experience.",
    enterprise: "For industry leaders needing bespoke products and dedicated partnership."
  };

  const description = descriptions[plan.slug] || "Unlock your potential.";
  const cta = plan.slug === 'enterprise' ? 'Contact Enterprise' : (plan.slug === 'growth' ? 'Go for Growth' : 'Start Essential');
  const href = `/checkout?package=${plan.slug}`;

  return (
    <div
      className={`relative flex flex-col rounded-lg border p-6 transition-all duration-200 ${
        plan.isPopular
          ? "z-10 scale-105 border-primary dark:border-gray-300 shadow-lg"
          : ""
      }`}
    >
      <div className="text-center">
        <Badge variant={plan.isPopular ? "default" : "outline"}>
          {plan.title}
          {plan.isPopular && (
            <span className="ml-2 text-xs font-normal">★ Popular</span>
          )}
        </Badge>
        <h4 className="mb-2 mt-4 text-2xl font-bold text-primary">
          {plan.price}
        </h4>
        <p className="text-sm opacity-70">{description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        {plan.features.map((featureObj, i) => (
          <li key={i} className="flex items-center text-sm opacity-70">
            <CircleCheck className="mr-2 h-4 w-4 text-primary" />
            {featureObj.feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={href}>
          <Button
            size={"sm"}
            className="w-full cursor-pointer"
            variant={plan.isPopular ? "default" : "outline"}
          >
            {cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
