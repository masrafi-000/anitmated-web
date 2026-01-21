"use client";

import { motion } from "motion/react";

export const IntroSection = () => {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background py-20 text-center">
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <span className="mb-4 inline-block rounded-full bg-rose-500/10 px-4 py-1.5 text-sm font-medium text-rose-500 dark:bg-rose-500/20 dark:text-rose-400">
             Introduction
          </span>
          <h2 className="mb-6 font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            We are <span className="text-rose-500">Ruby Studio</span>.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            {`A collective of visionaries, designers, and engineers dedicated to pushing the boundaries of what's possible on the web. We don’t just build websites; we craft digital legacies.`}
          </p>
        </motion.div>
      </div>
       <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-rose-500/5 via-transparent to-transparent opacity-50" />
    </section>
  );
};

export const MotiveSection = () => {
  return (
    <section className="relative overflow-hidden bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Our Motive: <br />
              <span className="text-rose-500">Innovation First</span>
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                At Ruby Studio, our motive is simple yet ambitious: to redefine the digital landscape through relentless innovation. We believe that every pixel should serve a purpose, and every interaction should tell a story.
              </p>
              <p>
                We are driven by the desire to solve complex problems with elegant solutions, ensuring that our clients stand out in an increasingly crowded digital world.
              </p>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-100 w-full overflow-hidden rounded-2xl md:h-125"
          >
             <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop)` }}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-rose-500/20 to-transparent mix-blend-overlay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const PurposeSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
             {/* Visual Content (Left on desktop) */}
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1 relative h-100 w-full overflow-hidden rounded-2xl md:h-125"
            >
               <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)` }}
                />
                 <div className="absolute inset-0 bg-linear-to-bl from-blue-500/20 to-transparent mix-blend-overlay" />
            </motion.div>

          {/* Text Content */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h3 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Our Purpose: <br />
              <span className="text-blue-500">Empowering Growth</span>
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Our purpose extends beyond code and design. We exist to empower businesses to reach their full potential. By leveraging cutting-edge technology and data-driven strategies, we build platforms that drive growth and scalability.
              </p>
              <p>
                Whether you are a startup looking to make your mark or an established enterprise seeking digital transformation, Ruby Studio is your partner in progress.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
