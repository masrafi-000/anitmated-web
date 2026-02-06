"use client";

import { DeletePackageModal } from "@/app/dashboard/_components/delete-package-modal";
import { PackageForm } from "@/app/dashboard/_components/package-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreatePackage,
  useDeletePackage,
  usePackages,
  useUpdatePackage,
} from "@/hooks/use-packages";
import { Package } from "@/schema/ts/pricing";
import { TCPackages } from "@/schema/zod/pricing";
import { Edit2Icon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PackagesPage() {
  const { data: packagesData, isLoading } = usePackages();
  const mutation = useCreatePackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [deletingPackageId, setDeletingPackageId] = useState<string | null>(
    null,
  );

  const handleCreate = (data: TCPackages) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Package created successfully");
        setIsCreateOpen(false);
      },
      onError: (error) => {
        toast.error("Failed to create package: " + error.message);
      },
    });
  };

  const handleUpdate = (data: TCPackages) => {
    if (!editingPackage) return;
    updatePackage.mutate(
      { id: editingPackage.id, ...data },
      {
        onSuccess: () => {
          toast.success("Package updated successfully");
          setEditingPackage(null);
        },
        onError: (error) => {
          toast.error("Failed to update package: " + error.message);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deletingPackageId) return;
    deletePackage.mutate(deletingPackageId, {
      onSuccess: () => {
        toast.success("Package deleted successfully");
        setDeletingPackageId(null);
      },
      onError: (error) => {
        toast.error("Failed to delete package: " + error.message);
      },
    });
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">
            Manage your pricing packages and features.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Package
            </Button>
          </DialogTrigger>
          <DialogContent className="md:min-w-3xl  max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Package</DialogTitle>
              <DialogDescription>
                Add a new pricing package to your offering.
              </DialogDescription>
            </DialogHeader>
            <PackageForm
              onSubmit={handleCreate}
              isLoading={mutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>
            A list of all current pricing packages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : packagesData?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No packages found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                packagesData?.map((pkg: Package) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">
                      {pkg.title}{" "}
                      {pkg.isPopular && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell>{pkg.slug}</TableCell>
                    <TableCell>{pkg.features.length} features</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => setEditingPackage(pkg)}
                      >
                        <Edit2Icon className="size-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeletingPackageId(pkg.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!editingPackage}
        onOpenChange={(open) => !open && setEditingPackage(null)}
      >
        <DialogContent className="md:min-w-3xl max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
            <DialogDescription>
              Update the details of your pricing package.
            </DialogDescription>
          </DialogHeader>
          {editingPackage && (
            <PackageForm
              initialData={{
                ...editingPackage,
                features: editingPackage.features.map((f) => f.feature),
                title: editingPackage.title as
                  | "Essential"
                  | "Growth"
                  | "Enterprise", // Cast to match enum
                cta: editingPackage.cta || "",
                description: editingPackage.description || "",
              }}
              onSubmit={handleUpdate}
              isLoading={updatePackage.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeletePackageModal
        key={deletingPackageId}
        isOpen={!!deletingPackageId}
        onClose={() => setDeletingPackageId(null)}
        onConfirm={handleDelete}
        isLoading={deletePackage.isPending}
      />
    </div>
  );
}
