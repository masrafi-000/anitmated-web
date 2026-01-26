import { api } from "@/lib/axios";
import { queryClient } from "@/lib/query-client";
import { Package } from "@/schema/ts/pricing";
import { TCPackages } from "@/schema/zod/pricing";
import { useMutation, useQuery } from "@tanstack/react-query";



export const usePackages = () => {
    return useQuery<Package[]>({
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
        },
    });
};


export const useUpdatePackage = () => {
    return useMutation({
        mutationFn: async ({ id, ...body }: TCPackages & { id: string }) => {
            const { data } = await api.patch("/v0/packages", { id, ...body });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
        },
    });
};


export const useDeletePackage = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete("/v0/packages", { data: { id } });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
        },
    });
};
