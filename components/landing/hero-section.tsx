"use client";

import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

// Placeholder images - using abstract/architecture themes for a "Ruby Studio" vibe
const SLIDES = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2583&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393798-2f77f3741752?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481487484168-9b930d5b7d9d?q=80&w=2670&auto=format&fit=crop",
];

const HeroRefactored = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 60 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
      {/* Carousel Layer */}
      <div className="absolute inset-0 z-0 h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((src, index) => (
            <div className="relative h-full min-w-full flex-[0_0_100%]" key={index}>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${src})` }}
              />
              {/* Overlay for better text contrast - Adaptive to light/dark if needed, but Hero usually looks best dark */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
              We Architect <br />
              <span className="bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
                Digital Dreams
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="mx-auto max-w-2xl text-lg text-neutral-200 md:text-2xl">
              Ruby Studio merges art with technology to create stunning, high-performance digital experiences that captivate and convert.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
             {/* Progress / Indicator Dots */}
            <div className="flex gap-2">
                {SLIDES.map((_, idx) => (
                    <div 
                        key={idx}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            idx === selectedIndex ? "w-8 bg-rose-500" : "w-2 bg-white/50"
                        )}
                    />
                ))}
            </div>
          </motion.div>
        </div>
      </div>

       {/* Decorative Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default HeroRefactored;
