import { api } from "@/lib/axios";
import { TCPackages } from "@/schema/zod/pricing";
import {  useMutation, useQuery } from "@tanstack/react-query"



export const usePackages = () => {
    return useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const { data } = await api.get("/v0/packages");
            return data.data;
        },
    })   
}


export const useCreatePackage = () => {
    return useMutation({
        mutationFn: async (body: TCPackages) => {
            const { data } = await api.post("/v0/packages", body);
            return data;
        },
    });
};


export const useUpdatePackage = () => {
    return useMutation({
        mutationFn: async (body: TCPackages) => {
            const { data } = await api.put("/v0/packages", body);
            return data;
        },
    });
};


export const useDeletePackage = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete("/v0/packages", { data: { id } });
            return data;
        },
    });
};
