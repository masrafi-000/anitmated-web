import { api } from "@/lib/axios";
import { TCContact } from "@/schema/zod/contactFormSchema";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const useInquiries = () => {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const { data } = await api.get("/v0/inquiry");
      return data.data;
    },
  });
};

export const useCreateInquiry = () => {
  return useMutation({
    mutationFn: async (body: TCContact) => {
      const { data } = await api.post("/v0/inquiry", body);
      return data;
    },
  });
};

export const useUpdateInquiry = () => {
  return useMutation({
    mutationFn: async (body: TCContact) => {
      const { data } = await api.patch("/v0/inquiry", body);
      return data;
    },
  });
};

export const useDeleteInquiry = () => {
  return useMutation({
    mutationFn: async (body: TCContact) => {
      const { data } = await api.delete("/v0/inquiry", { data: body });
      return data;
    },
  });
};
