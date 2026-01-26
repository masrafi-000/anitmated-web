"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { usePackages } from "@/hooks/use-packages";
import { Package } from "@/schema/ts/pricing";
import { Edit2Icon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function PackagesPage() {

  const { data: packagesData, isLoading } = usePackages();

  return (
    <div className="px-4 md:px-6 lg:px-8 container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">
            Manage your pricing packages and features.
          </p>
        </div>
        <Link href="/dashboard/packages/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Package
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>
            A list of all current pricing packages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">Loading...</div>
          ) : packagesData?.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No packages found. Create one to get started.
            </div>
          ) : (
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
               
                 { packagesData.map((pkg: Package) => (
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
                        <Button variant="default" size="icon">
                            <Edit2Icon className="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
