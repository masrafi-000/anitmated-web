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

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async (body: { email: string }) => {
            const { data } = await api.post("/admin-auth/forgot-password", body);
            return data;
        },
    });
};

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: async (body: { email: string; otp: string }) => {
            const { data } = await api.post("/admin-auth/verify-otp", body);
            return data;
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (body: { email: string; otp: string; password: string }) => {
            const { data } = await api.post("/admin-auth/reset-password", body);
            return data;
        },
    });
};