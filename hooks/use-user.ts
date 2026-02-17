import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/admin-auth");
      return data;
    },
    retry: (failureCount, error) => {
      const err = error as { status?: number };
      if (err?.status === 401 || err?.status === 403) return false;
      return failureCount < 3;
    },
  });
};
