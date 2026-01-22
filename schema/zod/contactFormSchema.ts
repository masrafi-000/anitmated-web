import z from "zod";

export const ZCContact = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  company: z.string().optional(),
  service: z.enum(["branding", "design", "development", "marketing"] as const, {
    message: "Please select a service",
  }),
  budget: z.enum(["<5k", "5k-10k", "10k-20k", "20k+"] as const, {
    message: "Please select a budget range",
  }),
  description: z.string().min(10, "Please provide some project details"),
});

export type TCContact = z.infer<typeof ZCContact>;