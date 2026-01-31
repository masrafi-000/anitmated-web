import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useCareers = (department?: string) => {
  return useQuery({
    queryKey: ["careers", department],
    queryFn: async () => {
      const { data } = await api.get("/v0/careers", {
        params: {
          department: department === "All Positions" ? undefined : department,
        },
      });
      return data.data; 
    },
  });
};

export const useJob = (slug: string | null) => {
  return useQuery({
    queryKey: ["job", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data } = await api.get(`/v0/careers/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
};
