import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface PackageFeature {
  id: string;
  feature: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  price: string;
  isPopular: boolean;
  features: PackageFeature[];
}

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data } = await api.get("/v0/packages");
      return data.data as Package[];
    },
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: async (data: any) => {
        const response = await api.post("/v0/checkout", data);
        return response.data;
    }
  })
}
