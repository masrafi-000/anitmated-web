"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

interface ProjectTestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export default function ProjectTestimonial({
  quote,
  author,
  role,
}: ProjectTestimonialProps) {
  // Generate initials for avatar
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative">
        <Card className="relative overflow-hidden border-border bg-card shadow-sm">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center">
            <Quote className="h-12 w-12 text-primary/20 mb-6" />

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-foreground text-pretty max-w-3xl">
              &quot;{quote}&quot;
            </blockquote>

            <div className="flex items-center gap-4 text-left">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-lg shrink-0">
                {initials}
              </div>

              <div>
                <div className="font-semibold text-foreground">{author}</div>
                <div className="text-sm text-muted-foreground">{role}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
