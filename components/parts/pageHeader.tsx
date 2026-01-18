"use client";

import { Container, Section } from "@/components/ds";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";

type Alignment = "center" | "left";

interface BaseHeaderProps {
  title: string;
  desc: string;
  align?: Alignment;
}

type PrimaryButtonProps =
  | { showPrimary: true; primaryText: string; onPrimaryClick?: () => void }
  | { showPrimary?: false; primaryText?: never; onPrimaryClick?: never };

type SecondaryButtonProps =
  | {
      showSecondary: true;
      secondaryText: string;
      onSecondaryClick?: () => void;
    }
  | { showSecondary?: false; secondaryText?: never; onSecondaryClick?: never };

type PageHeaderProps = BaseHeaderProps &
  PrimaryButtonProps &
  SecondaryButtonProps;

const PageHeader = ({
  title,
  desc,
  align = "center",
  showPrimary,
  primaryText,
  onPrimaryClick,
  showSecondary,
  secondaryText,
  onSecondaryClick,
}: PageHeaderProps) => {
  const isLeft = align === "left";

  // Reference for the h1 tag specifically
  const headerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Animate ONLY the h1
    gsap.fromTo(
      headerRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, []); // Empty dependency array means it runs once on mount

  return (
    <Section>
      <Container
        className={cn(
          "flex flex-col",
          isLeft
            ? "text-center md:text-left items-center md:items-start"
            : "text-center items-center",
        )}
      >
        {/* Animated H1 */}
        <h1
          ref={headerRef}
          className="mb-8 text-4xl font-bold  tracking-tighter md:text-6xl lg:text-7xl"
        >
          {title}
        </h1>

        {/* Description (No animation) */}
        <h3
          className={cn(
            "text-lg text-muted-foreground md:text-xl",
            isLeft ? "mx-auto md:mx-0 max-w-3xl" : "mx-auto max-w-3xl",
          )}
        >
          <Balancer ratio={0.5}>{desc}</Balancer>
        </h3>

        {/* Buttons (No animation) */}
        {(showPrimary || showSecondary) && (
          <div
            className={cn(
              "mt-10 flex flex-wrap items-center gap-3",
              isLeft ? "justify-center md:justify-start" : "justify-center",
            )}
          >
            {showPrimary && (
              <Button
                onClick={onPrimaryClick}
                className="rounded-full h-11 px-8"
              >
                {primaryText}
              </Button>
            )}

            {showSecondary && (
              <Button
                variant="outline"
                onClick={onSecondaryClick}
                className="rounded-full h-11 px-8"
              >
                {secondaryText}
              </Button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default PageHeader;
