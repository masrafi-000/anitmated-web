"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container, Section } from "../ds";

const photos = [
  { src: "https://images.unsplash.com/photo-1721137287642-43b251bd6f00" },
  { src: "https://images.unsplash.com/photo-1507730690594-f21182eee8b1" },
  { src: "https://images.unsplash.com/photo-1721041879224-ff011603ada5" },
  { src: "https://images.unsplash.com/photo-1720983627245-ca4a6913016f" },
  { src: "https://images.unsplash.com/photo-1720887236665-43caad593cdf" },
];

const FeatureNine = () => {
  return (
    <Section>
      <Container>
        <h2 className="mt-0! mb-4 text-3xl md:text-5xl font-medium tracking-wide">
          Visual Tales of Innovation
        </h2>

        <p className="text-base font-normal text-gray-700 dark:text-gray-400">
          Explore a curated collection of our most impact-driven projects, where
          every pixel tells a story of brand evolution and digital mastery.
        </p>

        <Carousel className="mt-6 w-full">
          <CarouselContent className="-ml-1">
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="relative overflow-hidden">
                  <CardContent className="not-prose aspect-square p-0">
                    <Image
                      loading="lazy"
                      src={photo.src}
                      alt="Gallery image"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </Section>
  );
};

export default FeatureNine;
