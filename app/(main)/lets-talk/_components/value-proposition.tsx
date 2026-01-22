"use client";

import { CheckCircle2 } from "lucide-react";

const points = [
  "Industry-leading design standards",
  "Rapid development cycles",
  "Transparent communication",
  "Post-launch support & maintenance",
  "Scalable architecture",
  "SEO-optimized deliverables",
];

export function ValueProposition() {
  return (
    <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                 <h3 className="text-2xl font-bold mb-4">Why Partner With Us?</h3>
                 <p className="text-muted-foreground mb-6">
                   {` We don't just build websites; we build digital assets that drive growth. Our team is dedicated to delivering excellence in every pixel and line of code.`}
                 </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {points.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm font-medium">{point}</span>
                    </div>
                ))}
            </div>
       </div>
    </div>
  );
}
