import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

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
}

export const useApplications = () => {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await api.get("/v0/careers/apply");
      return data.data;
    },
  });
};
