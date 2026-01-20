"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, Home, Map, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";

const HELPFUL_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function NotFoundPage() {
  const router = useRouter();

  // Framer Motion Variants for orchestrated entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden" // 2. Fixed ESLint: Framer handles the mount state automatically
          animate="visible"
        >
          {/* Hero 404 Section */}
          <motion.div className="mb-8 relative inline-block" variants={itemVariants}>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <Sparkles className="h-32 w-32 text-primary/10 animate-[spin_10s_linear_infinite]" />
            </div>
            <h1 className="text-[12rem] md:text-[18rem] font-black tracking-tighter leading-none select-none bg-gradient-to-b from-primary via-primary/80 to-background bg-clip-text text-transparent drop-shadow-sm">
              404
            </h1>
          </motion.div>

          {/* Messaging Section */}
          <motion.div className="space-y-6 mb-12" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Map className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Lost in Space</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Houston, we have <br className="hidden md:block" /> a problem.
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for has drifted out of orbit. 
              Let&apos;s get you back to mission control.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            variants={itemVariants}
          >
            {/* Note: using asChild is best practice for Link within Button components */}
            <Button asChild size="lg" className="h-14 px-8 rounded-full text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-full text-base font-semibold transition-all hover:bg-secondary/50 active:scale-95"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </motion.div>

          {/* Helpful Links Footer */}
          <motion.div 
            className="pt-10 border-t border-border/60"
            variants={itemVariants}
          >
            <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
              Quick Navigation
            </p>
            
            <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
              {HELPFUL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 rounded-xl border border-border/40 bg-card/50 hover:bg-card hover:border-primary/50 hover:text-primary transition-all duration-200 text-sm font-medium shadow-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}