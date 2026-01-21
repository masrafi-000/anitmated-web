import { Marquee } from "@/components/ui/marquee"
import Image from "next/image"

const items = [
  {
    name: "Emma Wilson",
    title: "Product Designer, TechCorp",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-2.webp",
    body: "Ruby Studio transformed our digital presence. Their attention to detail is unmatched and the results speak for themselves.",
  },
  {
    name: "Lucas Chen",
    title: "Frontend Developer, WebFlow",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-1.webp",
    body: "A true partnership. They understood our vision and delivered a product that exceeded our wildest expectations.",
  },
  {
    name: "Sophia Martinez",
    title: "UI/UX Lead, DesignHub",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-5.webp",
    body: "The team at Ruby Studio is incredible. Professional, creative, and technically brilliant. Highly recommended.",
  },
  {
    name: "Oliver Thompson",
    title: "Creative Director, StudioX",
    image:
      "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-4.webp",
    body: "Our conversion rates skyrocketed after the redesign. Ruby Studio brings both beauty and performance to the table.",
  },
]

function TestimonialCard({ item }: { item: (typeof items)[number] }) {
  return (
    <div className="relative flex h-full w-[20rem] flex-col items-start justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
      <div className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
        {item.body}
      </div>
      <div className="mt-auto flex items-center gap-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={item.image}
            alt={item.name}
            loading="lazy"
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium text-neutral-950 dark:text-neutral-50">
            {item.name}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {item.title}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MarqueeDemo() {
  return (
    <div className="relative  overflow-hidden">
      <div className="from-background absolute inset-y-0 left-0 z-10 w-30 bg-linear-to-r to-transparent" />
      <div className="from-background absolute inset-y-0 right-0 z-10 w-30 bg-linear-to-l to-transparent" />
      <Marquee className="py-2" direction="left">
        {[...items, ...items].map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </Marquee>
      <Marquee className="py-2" direction="right">
        {[...items, ...items].map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </Marquee>
    </div>
  )
}
