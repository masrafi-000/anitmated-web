"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Placeholder images - using abstract/architecture themes for a "Ruby Studio" vibe
const SLIDES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2574&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2574&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop", 
];
const HeroRefactored = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
      {/* Background Slideshow Layer */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[selectedIndex]})` }}
          />
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        </motion.div>
      </AnimatePresence>

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
              <span className="bg-linear-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
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
                            "h-2 rounded-full transition-all duration-300 cursor-pointer", // Added cursor-pointer
                            idx === selectedIndex ? "w-8 bg-rose-500" : "w-2 bg-white/50"
                        )}
                        onClick={() => setSelectedIndex(idx)} // Added manual control
                    />
                ))}
            </div>
          </motion.div>
        </div>
      </div>

       {/* Decorative Bottom Fade */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default HeroRefactored;
