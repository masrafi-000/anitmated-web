"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
  {
    name: "Alex Johnson",
    role: "CEO, TechFlow",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "Ruby Studio completely transformed our digital presence. The attention to detail and creative direction were outstanding.",
    date: "2 weeks ago",
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director, Bloom",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "Working with them was a breeze. They understood our brand voice immediately and delivered a site that converts.",
    date: "1 month ago",
  },
  {
    name: "David Miller",
    role: "Founder, Zenith",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Exceptional quality and speed. The team went above and beyond to ensure every interaction felt premium.",
    date: "3 weeks ago",
  },
  {
    name: "Emily Davis",
    role: "Product Owner, SoftSys",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    rating: 5,
    text: "The best design agency we've partnered with. Their technical expertise matches their creative vision.",
    date: "2 months ago",
  },
];

export const GoogleReviews = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Client Testimonials
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Excellent</span>
              <div className="flex text-amber-500">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                on Google Reviews
              </span>
            </div>
          </div>
          <div>{/* Optional: Add "Write a review" button or similar */}</div>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {REVIEWS.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <Card className="h-full border-muted bg-muted/20">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">
                            {review.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {review.role}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Image
                            height={24}
                            width={24}
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google"
                          />
                        </div>
                      </div>

                      <div className="flex text-amber-500">
                        {Array(review.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                      </div>

                      <p className="text-base text-muted-foreground/90">
                        {` "${review.text}"`}
                      </p>

                      <p className="mt-auto pt-4 text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </CardContent>
                  </Card>
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
