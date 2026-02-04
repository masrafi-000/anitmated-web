import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Application {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone?: string;
  educationLevel?: string;
  yearsOfExperience?: number;
  currentDesignation?: string;
  currentCompany?: string;
  currentSalary?: number;
  expectedSalary?: number;
  resumeUrl: string;
  coverLetter?: string;
  techSkills: string[];
  softSkills: string[];
  linkedInProfile?: string;
  portfolioUrl?: string;
  githubProfile?: string;
  stackOverflow?: string;
  codeForces?: string;
  codeChef?: string;
  hackerrank?: string;
  leetCode?: string;
  status: string;
  createdAt: string;
  slug: string;
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  job?: {
    id: string;
    slug: string;
    title: string;
    department: string;
    location?: string;
    type?: string;
    workMode?: string;
  };
}

interface ApplicationFilters {
  department?: string;
  status?: string;
  search?: string;
}

export const useApplications = (filters?: ApplicationFilters) => {
  return useQuery({
    queryKey: ["applications", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.department) params.append("department", filters.department);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.search) params.append("search", filters.search);

      const { data } = await api.get(`/v0/careers/apply?${params.toString()}`);
      return data;
    },
  });
};

export const useApplication = (id: string | undefined) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await api.get(`/v0/careers/apply/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useJobBySlug = (slug: string | undefined) => {
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

export const useRejectApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      reason,
      adminName,
    }: {
      id: string;
      reason?: string;
      adminName: string;
    }) => {
      const { data } = await api.post(`/v0/careers/apply/${id}/reject`, {
        reason,
        adminName,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      adminName,
    }: {
      id: string;
      status: string;
      adminName?: string;
    }) => {
      const { data } = await api.patch(`/v0/careers/apply/${id}`, {
        status,
        adminName,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
  });
};
