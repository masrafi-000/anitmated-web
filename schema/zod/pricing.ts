import { z } from "zod";

export const ZCPackages = z.object({
  title: z.string().min(1, "Title is required"),

  price: z.string().min(1, "Price is required"),

  description: z.string().min(1).optional(),

  features: z
    .array(z.string().min(1))
    .min(1, "At least one feature is required"),

  cta: z.string().min(1, "CTA text is required"),


  isPopular: z.boolean().optional(),
  slug: z.string().min(1, "Slug is required"),
})


export type TCPackages = z.infer<typeof ZCPackages>;