"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Award,
    Briefcase,
    Clock,
    Globe,
    Heart,
    MapPin,
    Rocket,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { companyBenefits, departments, getDepartmentJobs } from "./data";

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All Positions");
  const filteredJobs = getDepartmentJobs(selectedDepartment);

  return (
    <>
      {/* Section 1: Hero/Header */}
      <PageHeader
        title="Join Our Team"
        desc="Build your career at Ruby Studio. We're looking for talented, passionate individuals who want to create exceptional digital experiences and make a real impact."
        align="center"
      />

      {/* Section 2: Why Ruby Studio */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Why Ruby Studio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              More Than Just a Job
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
             {` At Ruby Studio, you'll work on cutting-edge projects, collaborate with talented people, and grow your career in a supportive environment.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-muted/60 text-center p-8">
              <div className="h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Impactful Work</h3>
              <p className="text-muted-foreground">
             {`   Work on projects that matter for clients you'll be proud to showcase`}
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-8">
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities and clear paths for advancement
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-8">
              <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Amazing Team</h3>
              <p className="text-muted-foreground">
                Collaborate with talented, passionate people who love what they do
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-8">
              <div className="h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Work</h3>
              <p className="text-muted-foreground">
                Remote options, flexible hours, and work-life balance that works for you
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-8">
              <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-7 w-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recognition</h3>
              <p className="text-muted-foreground">
                Your contributions are valued and celebrated with rewards and recognition
              </p>
            </Card>

            <Card className="border-muted/60 text-center p-8">
              <div className="h-14 w-14 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
               {` Work with the latest technologies and push the boundaries of what's possible`}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Section 3: Benefits & Perks */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits & Perks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We invest in our team with comprehensive benefits and perks that support your well-being and success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {companyBenefits.map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 4: Open Positions by Department */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our current openings and find the perfect role for your skills and aspirations.
            </p>

            {/* Department Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(dept)}
                  className="rounded-full"
                  size="sm"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className=" flex flex-col gap-3 max-w-6xl mx-auto">
            {filteredJobs.map((job) => (
              <Link key={job.id} href={`/careers/${job.id}`}>
                <Card className="border-muted/60 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <Badge variant="secondary">{job.department}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <Button className="rounded-full shrink-0">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No positions available in this department at the moment.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Check back soon or explore other departments!
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Section 5: Application Process & CTA */}
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Hiring Process
              </h2>
              <p className="text-muted-foreground">
               {` We've designed a straightforward, respectful hiring process to find the best fit for both you and our team.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Apply</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your application and portfolio
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Review</h3>
                <p className="text-sm text-muted-foreground">
                  We review your application within 5 days
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Interview</h3>
                <p className="text-sm text-muted-foreground">
                  2-3 rounds with team members
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Offer</h3>
                <p className="text-sm text-muted-foreground">
                  Welcome to the team!
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-background rounded-2xl p-8 md:p-12 border">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Don&apos;t See the Right Role?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
               {` We're always interested in hearing from talented people. Send us your resume and let us know how you'd like to contribute to Ruby Studio.`}
              </p>
              <Link href="/contact">
                <Button size="lg" className="rounded-full">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
