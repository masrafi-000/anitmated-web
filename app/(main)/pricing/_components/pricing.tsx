import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePackages } from "@/hooks/use-packages";
import { Package } from "@/schema/ts/pricing";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Container, Section } from "../../../../components/ds";

const Pricing = () => {
  const { data: packages, isLoading } = usePackages();
  const SKELETON_COUNT = 3; // Show 3 skeletons while loading

  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="my-0! text-4xl tracking-wide font-semibold">
          Invest in Excellence
        </h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>{`Flexible engagement models tailored to elevate your brand's digital presence.`}</Balancer>
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 w-full">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <PricingSkeleton key={i} />
              ))
            : packages?.map((pkg: Package) => (
                <PricingCard plan={pkg} key={pkg.id} />
              ))}
        </div>
      </Container>
    </Section>
  );
};

const PricingSkeleton = () => {
  return (
    <div className="relative flex flex-col rounded-lg border p-6">
      <div className="text-center flex flex-col items-center">
        <Skeleton className="mb-4 h-6 w-20 rounded-full" />
        <Skeleton className="mb-2 h-10 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-3/4" />
      </div>

      <div className="my-4 w-full border-t"></div>

      <ul className="w-full space-y-3">
        {[1, 2, 3, 4].map((j) => (
          <li key={j} className="flex items-center">
            <Skeleton className="mr-2 h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-3/4" />
          </li>
        ))}
      </ul>

      <div className="mt-auto w-full pt-6">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
};

const PricingCard = ({ plan }: { plan: Package }) => {
  return (
    <div
      className={`relative flex flex-col rounded-lg border p-6 transition-all duration-200 ${
        plan.isPopular
          ? "z-10 scale-105 border-primary shadow-lg dark:border-gray-300"
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
        <h4 className="text-primary mb-2 mt-4 text-2xl font-bold">
          {plan.price}
        </h4>
        <p className="text-sm opacity-70">{plan.description}</p>
      </div>

      <div className="my-4 border-t"></div>

      <ul className="space-y-3 text-left">
        {plan.features.map((item, i) => (
          <li key={i} className="flex items-center text-sm opacity-70">
            <CircleCheck className="text-primary mr-2 h-4 w-4" />
            {item.feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link href={`/contact?package=${plan.slug}`}>
          <Button
            size={"sm"}
            className="w-full cursor-pointer"
            variant={plan.isPopular ? "default" : "outline"}
          >
            {plan.cta || "Get Started"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
