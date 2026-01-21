"use client";

import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";
import Image from "next/image";

// Google Review Data Structure
interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const reviews: GoogleReview[] = [
  {
    author_name: "Emma Wilson",
    profile_photo_url:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-2.webp",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Ruby Studio transformed our digital presence. Their attention to detail is unmatched and the results speak for themselves.",
  },
  {
    author_name: "Lucas Chen",
    profile_photo_url:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-1.webp",
    rating: 5,
    relative_time_description: "a week ago",
    text: "A true partnership. They understood our vision and delivered a product that exceeded our wildest expectations.",
  },
  {
    author_name: "Sophia Martinez",
    profile_photo_url:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-5.webp",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "The team at Ruby Studio is incredible. Professional, creative, and technically brilliant. Highly recommended.",
  },
  {
    author_name: "Oliver Thompson",
    profile_photo_url:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-4.webp",
    rating: 4,
    relative_time_description: "a month ago",
    text: "Our conversion rates skyrocketed after the redesign. Ruby Studio brings both beauty and performance to the table.",
  },
  {
    author_name: "James Anderson",
    profile_photo_url:
        "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-3.webp",
    rating: 5,
    relative_time_description: "2 days ago",
    text: "Exceptional quality and speed. The best agency we've worked with.",
  },
];

const GoogleLogo = () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);


function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="relative flex h-full w-[20rem] flex-col items-start justify-between rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
      
      {/* Header: Author Info & Google Logo */}
      <div className="flex w-full items-start justify-between mb-4">
         <div className="flex items-center gap-3">
             <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
                <Image
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    loading="lazy"
                    fill
                    className="h-full w-full object-cover"
                />
             </div>
             <div>
                 <p className="text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    {review.author_name}
                 </p>
                 <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {review.relative_time_description}
                 </p>
             </div>
         </div>
         <GoogleLogo />
      </div>

       {/* Rating */}
       <div className="flex items-center gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`} 
                />
            ))}
       </div>

      {/* Body */}
      <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        "{review.text}"
      </div>
    </div>
  );
}

export function MarqueeDemo() {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="from-background absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r to-transparent" />
      <div className="from-background absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l to-transparent" />
      <Marquee className="py-4" pauseOnHover>
        {[...reviews, ...reviews].map((review, index) => (
          <ReviewCard key={`marquee-1-${index}`} review={review} />
        ))}
      </Marquee>
      <Marquee className="py-4" direction="right" pauseOnHover>
        {[...reviews, ...reviews].map((review, index) => (
          <ReviewCard key={`marquee-2-${index}`} review={review} />
        ))}
      </Marquee>
    </div>
  );
}
