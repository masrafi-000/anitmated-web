"use client";

import { Container, Section } from "@/components/ds";
import ImageGallery from "@/components/image-gallery";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Quote,
  Tag,
  TrendingUp,
  User,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { portfolioWorks } from "../data";

interface PortfolioWorkPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PortfolioWorkPage({ params }: PortfolioWorkPageProps) {
  const { id } = use(params);

  const work = portfolioWorks.find((w) => w.id === id);

  if (!work) {
    notFound();
  }

  // Get related projects (same category, excluding current)
  const relatedProjects = portfolioWorks
    .filter((w) => w.category === work.category && w.id !== work.id)
    .slice(0, 3);

  return (
    <>
      {/* Section 1: Project Header */}
      <PageHeader title={work.title} desc={work.description} align="center" />

      {/* Section 2: Project Overview & Details */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Project Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm text-muted-foreground">
              {work.client && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-medium">{work.client}</span>
                </div>
              )}
              {work.year && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="font-medium">{work.year}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span className="font-medium">{work.category}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {work.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Back Button */}
            <div className="mb-12">
              <Link href="/portfolio">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>
            </div>

            {/* Challenge, Solution, Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border-muted/60">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">The Challenge</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {work.overview.challenge}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-muted/60">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">Our Solution</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {work.overview.solution}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-muted/60">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">The Results</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {work.overview.results}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 3: Technologies & Features */}
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Technologies */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {work.technologies.map((tech) => (
                    <Badge key={tech} className="text-sm px-4 py-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {work.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 4: Image Gallery */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-4">
            Project Gallery
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore the visual journey of this project through our curated
            gallery of screenshots and designs.
          </p>
          <div className="w-full max-w-7xl mx-auto flex justify-center">
            <ImageGallery images={work.images} />
          </div>
        </Container>
      </Section>

      {/* Section 5: Metrics & Impact */}
      {work.metrics && work.metrics.length > 0 && (
        <Section className="bg-muted/30">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">
                Measurable Impact
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                The numbers speak for themselves
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {work.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Section 6: Testimonial */}
      {work.testimonial && (
        <Section>
          <Container>
            <div className="max-w-3xl mx-auto">
              <Card className="border-muted/60 bg-muted/30">
                <CardContent className="p-8 md:p-12">
                  <Quote className="h-12 w-12 text-primary/20 mb-6" />
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                    &quot;{work.testimonial.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">
                        {work.testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {work.testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>
      )}

      {/* Section 7: Related Projects */}
      {relatedProjects.length > 0 && (
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Projects</h2>
              <p className="text-muted-foreground">
                Explore more work in {work.category}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/portfolio/${project.id}`}>
                  <Card className="group overflow-hidden border-muted/60 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        fill
                        src={project.thumbnail}
                        alt={project.title}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Section 8: CTA */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let&apos;s create something amazing. Get in touch to discuss your
              project and see how we can help bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full">
                  Start a Project
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="rounded-full">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
