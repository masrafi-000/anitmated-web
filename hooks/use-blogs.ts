import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  description?: string;
  imageUrl?: string;
  Links: string[];
  authoId: string;
  createdAt: string;
  updatedAt: string;
}

export const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await api.get("/v0/blogs");
      return data.data;
    },
  });
};
