import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Container, Section } from "../ds";

interface PricingCardProps {
  title: "Essential" | "Growth" | "Enterprise";
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  isPopular?: boolean;
}

// Dummy pricing data
const pricingData: PricingCardProps[] = [
  {
    title: "Essential",
    price: "$2,999",
    description: "Perfect for startups needing a solid brand foundation and web presence.",
    features: ["Logo & Brand Guidelines", "UI/UX Design for Landing Page", "Next.js Implementation", "SEO Best Practices"],
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
      "Advanced Motion (GSAP)",
      "CMS Integration",
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
    ],
    cta: "Contact Enterprise",
    href: "/contact",
  },
];

const Pricing = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="my-0! text-4xl tracking-wide font-semibold">Invest in Excellence</h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>Flexible engagement models tailored to elevate your brand's digital presence.</Balancer>
        </p>

        <div className=" mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingData.map((plan, index) => (
            <PricingCard plan={plan} key={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
const PricingCard = ({ plan }: { plan: PricingCardProps }) => {
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
        <p className="text-sm opacity-70">{plan.description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm opacity-70">
            <CircleCheck className="mr-2 h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={plan.href} target="_blank">
          <Button
            size={"sm"}
            className="w-full"
            variant={plan.isPopular ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
