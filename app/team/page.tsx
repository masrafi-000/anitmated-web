"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, Twitter } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { getFounders, getLeadership, getTeam } from "./data";

export default function TeamPage() {
  const founders = getFounders();
  const leadership = getLeadership();
  const team = getTeam();

  return (
    <>
      <PageHeader
        title="Meet Our Team"
        desc="The talented individuals behind Ruby Studio's success. We're a diverse group of designers, developers, and strategists united by our passion for creating exceptional digital experiences."
        align="center"
      />

      {/* Founders Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Founders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The visionaries who started it all and continue to guide our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {founders.map((member) => (
              <Card key={member.id} className="border-muted/60 overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <NextImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <Link href={member.linkedin} target="_blank">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {member.twitter && (
                      <Link href={member.twitter} target="_blank">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {member.email && (
                      <Link href={`mailto:${member.email}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Leadership Section */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced leaders driving excellence across all departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <Card key={member.id} className="border-muted/60 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <NextImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <Link href={member.linkedin} target="_blank">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {member.email && (
                      <Link href={`mailto:${member.email}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Members Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The talented professionals who bring our projects to life every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="border-muted/60 overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <NextImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <Link href={member.linkedin} target="_blank">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Team
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              We&apos;re always looking for talented individuals to join our growing team. If you&apos;re passionate about creating exceptional digital experiences, we&apos;d love to hear from you.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
