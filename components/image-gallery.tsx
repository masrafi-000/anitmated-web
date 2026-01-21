import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  className?: string;
  itemClassName?: string;
}

export default function ImageGallery({ images, className, itemClassName }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-2 h-100 w-full px-4 mb-24", className)}>
      {images.map((src, idx) => (
        <div
          key={idx}
          className={cn(
            "relative group grow transition-all w-full md:w-32 rounded-xl overflow-hidden h-full duration-500 hover:w-100 hover:grow-2",
            itemClassName
          )}
        >
          <Image
            className="object-cover object-center"
            src={src}
            loading="lazy"
            alt={`Gallery image ${idx + 1}`}
            fill
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      ))}
    </div>
  );
}
