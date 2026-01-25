import z from "zod";

export const ZCPricingInquiry = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  plan: z.string().min(1, {
    message: "Please select a plan or subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type TCPricingInquiry = z.infer<typeof ZCPricingInquiry>;

export const ZCEPricingInquiry = ZCPricingInquiry.extend({
  id: z.string(),
});

export type TCEPricingInquiry = z.infer<typeof ZCEPricingInquiry>;
