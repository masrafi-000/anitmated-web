import z from "zod";

export const ZCSupport = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  details: z.string().optional(),
});

export type TCSupport = z.infer<typeof ZCSupport>;
