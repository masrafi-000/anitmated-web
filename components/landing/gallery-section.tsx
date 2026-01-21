"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const GALLERY_ITEMS = [
  {
    title: "Global Reach",
    description: "Expanding your brand across borders with localized strategies.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2650&auto=format&fit=crop",
    size: "md:col-span-2",
  },
  {
    title: "User Centric",
    description: "Designing with empathy for the end-user experience.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    size: "md:col-span-1",
  },
  {
    title: "Data Driven",
    description: "Making decisions backed by powerful analytics.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
    size: "md:col-span-1",
  },
  {
    title: "Sustainable Tech",
    description: "Building green, efficient, and future-proof digital assets.",
    image: "https://images.unsplash.com/photo-1454625233598-f29d597eea1e?q=80&w=2669&auto=format&fit=crop",
    size: "md:col-span-2",
  },
];

export const GallerySection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Our Goals
          </h2>
          <p className="text-muted-foreground">
            What drives us to deliver excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 auto-rows-[300px] md:grid-cols-3 md:auto-rows-[300px]">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-muted/20",
                item.size
              )}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                <p className="text-gray-200 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
