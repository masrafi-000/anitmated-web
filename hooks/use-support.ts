import { api } from "@/lib/axios";
import { TCSupport } from "@/schema/zod/supportFormSchema";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useSupport = () => {
return useQuery({
  queryKey: ["support-form"],
  queryFn: async () => {
    const { data } = await api.get("/v0/support");
    return data;
  },
})
}

export const useCreateSupport = () => {
  return useMutation({
    mutationFn: async (body: TCSupport) => {
      const { data } = await api.post("/v0/support", body);
      return data;
    },
  });
};
