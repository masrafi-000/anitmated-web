import { api } from "@/lib/axios";
import { Package } from "@/schema/ts/pricing";
import { TCPackages } from "@/schema/zod/pricing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



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
    const queryClient = useQueryClient();
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
    const queryClient = useQueryClient();
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
    const queryClient = useQueryClient();
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
