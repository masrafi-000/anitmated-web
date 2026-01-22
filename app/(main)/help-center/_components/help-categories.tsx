"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, FileText, Rocket, Settings, Shield, Users } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "New to our platform? Learn the basics here.",
    icon: Rocket,
  },
  {
    title: "Account & Billing",
    description: "Manage your subscription, payments, and account details.",
    icon: CreditCard,
  },
  {
    title: "Technical Support",
    description: "Troubleshoot common issues and error messages.",
    icon: Settings,
  },
  {
    title: "Security & Privacy",
    description: "Learn about how we protect your data and privacy.",
    icon: Shield,
  },
  {
    title: "Team Management",
    description: " Invite members and manage permissions.",
    icon: Users,
  },
  {
    title: "API & Developers",
    description: "Documentation for integrating with our API.",
    icon: FileText,
  },
];

export function HelpCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.title} className="hover:shadow-lg transition-all cursor-pointer border-muted">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <category.icon size={24} />
            </div>
            <CardTitle className="text-xl">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{category.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
