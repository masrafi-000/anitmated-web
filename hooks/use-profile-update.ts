import { api, ApiError } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProfilePayload {
  name: string;
  designation?: string;
  avaterImage?: string;
}

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfilePayload) => {
      const response = await api.put("/admin-auth", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.message || "Failed to update profile");
    },
  });
};
