"use client";

import { Container, Prose, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { blogPosts } from "../data";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);
  
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="relative h-100 w-full bg-muted">
         <Image
            src={post.src}
            alt={post.title}
            loading="lazy"
            fill
            className="object-cover"
            priority
         />
         <div className="absolute inset-0 bg-black/60" />
         <div className="absolute inset-0 flex items-center justify-center">
            <Container>
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="flex items-center justify-center gap-4 text-white/80 text-sm mb-4">
                        <span className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full text-white border border-white/20">
                            {post.tags[0]}
                        </span>
                        <span className="flex items-center gap-2"><Calendar size={14}/> {post.date}</span>
                        <span className="flex items-center gap-2"><User size={14}/> {post.author.name}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-balance">{post.title}</h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">{post.description}</p>
                </div>
            </Container>
         </div>
      </div>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-block mb-8">
                <Button variant="ghost" size="sm" className="-ml-4 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
                </Button>
            </Link>
            
            <Prose>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Prose>

            <div className="mt-12 pt-8 border-t flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Written by</p>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-muted relative">
                            <Image loading="lazy" src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">{post.author.role}</p>
                        </div>
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button variant="outline" size="sm">Share</Button>
                 </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
