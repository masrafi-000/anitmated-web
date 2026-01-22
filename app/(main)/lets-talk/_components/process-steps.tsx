"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileJson, MessageSquare, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Initial Chat",
    description: "Start the conversation right here using our interactive chat to tell us about your project.",
  },
  {
    icon: FileJson,
    title: "2. Proposal & Strategy",
    description: "We'll analyze your requirements and send over a detailed proposal and tailored strategy.",
  },
  {
    icon: Rocket,
    title: "3. Kickoff",
    description: "Once approved, we assemble the team and launch your project immediately.",
  },
];

export function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <Card key={step.title} className="bg-muted/50 border-none shadow-sm relative overflow-hidden group">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
               <step.icon size={24} />
            </div>
            <CardTitle className="text-lg">{step.title}</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">{step.description}</p>
          </CardContent>
          
           {/* Decorative Number */}
           <div className="absolute -right-4 -bottom-4 text-9xl font-bold opacity-[0.03] pointer-events-none select-none">
              {step.title.split('.')[0]}
           </div>
        </Card>
      ))}
    </div>
  );
}
