import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface AnalyticsData {
  overview: {
    totalInquiries: number;
    totalApplications: number;
    totalSupport: number;
    totalPricing: number;
    totalPackages: number;
  };
  recentInquiries: {
    id: string;
    name: string;
    email: string;
    service: string;
    createdAt: string;
  }[];
  activityHistory: {
    date: string;
    inquiries: number;
    applications: number;
    support: number;
  }[];
  serviceDistribution: {
    name: string;
    value: number;
  }[];
  budgetDistribution: {
    name: string;
    value: number;
  }[];
}

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data } = await api.get<AnalyticsData>("/analytics");
      return data;
    },
  });
};
