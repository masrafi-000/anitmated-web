import { api } from "@/lib/axios";
import { TCSupport } from "@/schema/zod/supportFormSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Support {
  id: string;
  name: string;
  email: string;
  phone: string
  details?: string;
  createdAt: string;
  updatedAt: string;
}

export const useSupport = () => {
  return useQuery({
    queryKey: ["support-form"],
    queryFn: async () => {
      const { data } = await api.get("/v0/support");
      return data.data;
    },
  });
};

export const useCreateSupport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: TCSupport) => {
      const { data } = await api.post("/v0/support", body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-form"] });
    },
  });
};
