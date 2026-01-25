import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
    return useMutation({
        mutationFn: async (body: { email: string; password: string }) => {
            const { data } = await api.post("/admin-auth", body);
            return data;
        },
    })
}