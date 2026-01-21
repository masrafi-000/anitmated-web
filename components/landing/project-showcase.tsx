"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const PROJECT_PHOTOS = [
  { 
    src: "https://images.unsplash.com/photo-1721137287642-43b251bd6f00?q=80&w=2670&auto=format&fit=crop", 
    title: "Neon Horizon",
    category: "Brand Identity"
  },
  { 
    src: "https://images.unsplash.com/photo-1507730690594-f21182eee8b1?q=80&w=2670&auto=format&fit=crop",
    title: "Urban Pulse",
    category: "Web Development"
  },
  { 
    src: "https://images.unsplash.com/photo-1721041879224-ff011603ada5?q=80&w=2670&auto=format&fit=crop",
    title: "Abstract Flow",
    category: "Motion Design"
  },
  { 
    src: "https://images.unsplash.com/photo-1720983627245-ca4a6913016f?q=80&w=2670&auto=format&fit=crop",
    title: "Digital Zenith",
    category: "Marketing"
  },
  { 
    src: "https://images.unsplash.com/photo-1720887236665-43caad593cdf?q=80&w=2670&auto=format&fit=crop",
    title: "Echo Chamber",
    category: "Audio Visual"
  },
];

export const ProjectShowcase = () => {
  return (
    <section className="bg-background py-24 text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Visual Tales of Innovation
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
          Explore a curated collection of our most impact-driven projects, where
          every pixel tells a story of brand evolution and digital mastery.
        </p>

        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {PROJECT_PHOTOS.map((project, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border bg-muted">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="translate-y-4 transform text-xl font-bold text-white transition-transform duration-300 group-hover:translate-y-0">
                            {project.title}
                        </h3>
                        <p className="translate-y-4 transform text-sm text-gray-300 transition-transform delay-75 duration-300 group-hover:translate-y-0">
                            {project.category}
                        </p>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="mt-8 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
