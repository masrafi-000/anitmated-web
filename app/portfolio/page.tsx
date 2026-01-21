"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, Briefcase, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, portfolioStats, portfolioWorks } from "./data";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredWorks =
    selectedCategory === "All"
      ? portfolioWorks
      : portfolioWorks.filter((work) => work.category === selectedCategory);

  const featuredWorks = portfolioWorks.slice(0, 3);

  return (
    <>
      {/* Section 1: Hero/Header */}
      <PageHeader
        title="Our Portfolio"
        desc="Explore our collection of exceptional digital experiences. Each project represents our commitment to innovation, creativity, and excellence in delivering transformative solutions."
        align="center"
      />

      {/* Section 2: Stats Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3: Featured Works */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Featured Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Best Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Showcasing our most impactful projects that have transformed
              businesses and delighted users.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work) => (
              <Link key={work.id} href={`/portfolio/${work.id}`}>
                <Card className="group overflow-hidden border-muted/60 transition-all hover:border-primary/50 hover:shadow-xl cursor-pointer h-full">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      loading="lazy"
                      src={work.thumbnail}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge className="bg-primary/90 text-primary-foreground mb-3">
                        {work.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {work.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {work.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 4: All Works with Filter */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse through our complete portfolio and filter by category to
              find exactly what you&apos;re looking for.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work) => (
              <Link key={work.id} href={`/portfolio/${work.id}`}>
                <Card className="group overflow-hidden border-muted/60 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={work.thumbnail}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        {work.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {work.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {work.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredWorks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Section 5: Why Choose Us */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Ruby Studio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring expertise, creativity, and dedication to every project we
              undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-muted/60 text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Award-Winning</h3>
              <p className="text-sm text-muted-foreground">
                Recognized excellence in design and development
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Team</h3>
              <p className="text-sm text-muted-foreground">
                Talented professionals dedicated to your success
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Proven Process</h3>
              <p className="text-sm text-muted-foreground">
                Streamlined workflow ensuring timely delivery
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Innovation First</h3>
              <p className="text-sm text-muted-foreground">
                Cutting-edge solutions that drive results
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Section 6: CTA */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Let&apos;s create something extraordinary together. Get in touch
              to discuss how we can bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full">
                  Start a Project
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="rounded-full">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
