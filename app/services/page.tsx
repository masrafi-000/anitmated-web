"use client";

import { AboutCTA } from "@/components/about/cta";
import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brush,
  Code2,
  Cpu,
  Globe,
  Layers,
  LayoutTemplate,
  LifeBuoy,
  LineChart,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  Settings,
  Zap,
} from "lucide-react";

const coreServices = [
  {
    title: "Web Development",
    desc: "Robust, scalable, and high-performance websites built with Next.js and React.",
    icon: Code2,
    tags: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "UI/UX Design",
    desc: "User-centric interfaces that are beautiful, intuitive, and conversion-focused.",
    icon: LayoutTemplate,
    tags: ["Figma", "Prototyping", "User Research", "Wireframing"],
  },
  {
    title: "Brand Identity",
    desc: "Crafting unique visual identities that resonate with your target audience.",
    icon: Palette,
    tags: ["Logo Design", "Brand Guidelines", "Visual Strategy"],
  },
];

const creativeTools = [
  { name: "Adobe Photoshop", icon: Brush, desc: "Image Manipulation" },
  { name: "Adobe Illustrator", icon: PenTool, desc: "Vector Graphics" },
  { name: "Adobe Premiere Pro", icon:  Layers, desc: "Video Editing" },
  { name: "Figma", icon: LayoutTemplate, desc: "UI Design" },
  { name: "Canva", icon: Palette, desc: "Quick Graphics" },
  { name: "After Effects", icon: Zap, desc: "Motion Graphics" },
];

const marketingServices = [
  {
    title: "Digital Marketing",
    desc: "Data-driven strategies to increase visibility and drive traffic.",
    icon: Globe,
  },
  {
    title: "SEO Optimization",
    desc: "Ranking your site higher on search engines for organic growth.",
    icon: Search,
  },
  {
    title: "Content Strategy",
    desc: "Engaging content that tells your story and connects with users.",
    icon: LineChart,
  },
];

const processSteps = [
  {
    id: 1,
    title: "Discovery",
    desc: "We dive deep into your business goals and user needs.",
  },
  {
    id: 2,
    title: "Design",
    desc: "We craft visual concepts and prototypes for your review.",
  },
  {
    id: 3,
    title: "Development",
    desc: "We build your solution using clean, modern code.",
  },
  {
    id: 4,
    title: "Launch",
    desc: "We deploy, test, and ensure a smooth go-live experience.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Crafting Digital Success"
        desc="From pixel-perfect designs to powerful code, we offer a full spectrum of digital services to elevate your brand."
        align="center"
      />

      {/* Core Services */}
      <Section>
        <Container>
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Core Digital Expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              We build the foundation of your digital presence with engineering excellence and design precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreServices.map((service, idx) => (
              <Card key={idx} className="h-full border-muted/60 transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <service.icon size={24} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {service.desc}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Creative Tools Grid */}
      <Section className="bg-muted/30">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Creative Suite
              </h2>
              <p className="text-muted-foreground text-lg">
                We leverage industry-leading tools to create stunning visuals and immersive experiences.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {creativeTools.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center justify-center p-6 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
              >
                <tool.icon className="h-8 w-8 text-foreground mb-3 opacity-80" />
                <h4 className="font-medium text-sm">{tool.name}</h4>
                <span className="text-xs text-muted-foreground mt-1">{tool.desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Growth & Marketing */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Growth & Performance
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Building a great product is just the start. We help you reach your audience through strategic digital marketing, ensuring your brand gets the attention it deserves.
              </p>
              <div className="space-y-6">
                {marketingServices.map((service, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-foreground">
                      <service.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{service.title}</h4>
                      <p className="text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-100 w-full rounded-2xl bg-linear-to-br from-primary/20 via-primary/5 to-background border flex items-center justify-center overflow-hidden">
                <Rocket className="h-48 w-48 text-primary/20 absolute -right-10 -bottom-10 rotate-[-15deg]" />
                <div className="relative z-10 text-center p-8">
                     <h3 className="text-2xl font-bold mb-2">Ready to Scale?</h3>
                     <p className="text-muted-foreground mb-6">Let&apos;s build a strategy that works.</p>
                     <MonitorSmartphone className="h-24 w-24 mx-auto text-primary opacity-80" />
                </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Maintenance */}
      <Section className="border-t">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-8 md:p-12 rounded-3xl bg-secondary/50 border border-secondary">
             <div className="flex-1">
                 <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-6">
                    <Settings  size={24}/>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Maintenance & Support</h2>
                 <p className="text-muted-foreground text-lg mb-6">
                    We don&apos;t just launch and leave. Our dedicated support team ensures your digital assets remain secure, up-to-date, and performing at their peak.
                 </p>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 text-sm font-medium"><LifeBuoy size={16} className="text-primary"/> 24/7 Monitoring</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><LifeBuoy size={16} className="text-primary"/> Security Updates</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><LifeBuoy size={16} className="text-primary"/> Performance Tuning</li>
                    <li className="flex items-center gap-2 text-sm font-medium"><LifeBuoy size={16} className="text-primary"/> Content Updates</li>
                 </ul>
             </div>
             <div className="flex-1 flex justify-center md:justify-end">
                <Cpu className="h-40 w-40 text-muted-foreground/20" />
             </div>
          </div>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section>
        <Container>
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Process</h2>
             <p className="text-muted-foreground">How we bring your vision to reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {processSteps.map((step, idx) => (
                 <div key={idx} className="relative flex flex-col items-center text-center group">
                    <div className="h-14 w-14 rounded-2xl bg-muted border border-border group-hover:border-primary/50 group-hover:bg-primary/5 transition-all flex items-center justify-center text-xl font-bold mb-6 z-10">
                        {step.id}
                    </div>
                    {idx !== processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 bg-border z-0" />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                 </div>
             ))}
          </div>
        </Container>
      </Section>

      <AboutCTA />
    </>
  );
}