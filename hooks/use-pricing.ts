import { api } from "@/lib/axios";
import { queryClient } from "@/lib/query-client";
import { TCPricingInquiry } from "@/schema/zod/pricingSchema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePricingInquiry = () => {
return useQuery({
  queryKey: ["pricing-inquiry"],
  queryFn: async () => {
    const { data } = await api.get("/v0/pricing-inquiry");
    return data.data;
  },
})
}

export const useCreatePricingInquiry =  () => {  
  return useMutation({
    mutationFn: async (body: TCPricingInquiry) => {
      const { data } = await api.post("/v0/pricing-inquiry", body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-inquiry"] });
    },
  });
}; 
