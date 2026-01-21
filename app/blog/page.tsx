"use client";

import { Container, Section } from "@/components/ds";
import PageHeader from "@/components/parts/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { blogPosts } from "./data";

export default function BlogPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title="Insights & Perspectives"
        desc="Exploring the intersection of design, technology, and culture. "
        align="center"
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full  mx-auto">
            {blogPosts.map((post) => (
              <ExpandableCard
                key={post.id}
                title={post.title}
                src={post.src}
                description={post.description}
                classNameExpanded="bg-background dark:bg-background [&_h4]:text-foreground dark:[&_h4]:text-foreground [&_h4]:font-medium flex flex-col"
                content={
                  <div className="flex items-center gap-2 mt-2">
                    <Image
                      height={24}
                      width={24}
                      loading="lazy"
                      src={post.author.avatar}
                      alt={post.author.name}
                      className=" rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {post.author.name} • {post.date}
                    </span>
                  </div>
                }
              >
                <div className="flex flex-col h-full gap-6">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} /> {post.author.name}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* HTML Content Preview (Safe because we strip tags) */}
                  <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    {post.content.replace(/<[^>]*>?/gm, "").substring(0, 300)}
                    ...
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-auto pt-6 flex justify-end mb-4"
                    onClick={() => router.push(`/blog/${post.id}`)}
                  >
                    <Button  className="w-full sm:w-auto cursor-pointer">
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </ExpandableCard>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
