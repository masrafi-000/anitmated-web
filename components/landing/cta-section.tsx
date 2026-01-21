"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="mx-auto mb-6 max-w-3xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
          Ready to Architect Your <br />
          <span className="text-rose-500">Digital Dream?</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-400">
          {`Join the visionaries who are redefining their industries. Let's build something extraordinary together.`}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-full bg-rose-500 px-8 text-base font-semibold text-white hover:bg-rose-600"
          >
            <Link href="/pricing">
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-neutral-700 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-neutral-800 hover:text-white"
          >
            <Link href="/portfolio">View Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
