"use client";

import { Badge } from "@/components/ui/badge";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface ComparisonFeature {
  feature: string;
  essential: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
}

const comparisonData: ComparisonFeature[] = [
  {
    feature: "Logo & Brand Guidelines",
    essential: true,
    growth: true,
    enterprise: true,
  },
  {
    feature: "UI/UX Design",
    essential: "Landing Page",
    growth: "Multi-Page",
    enterprise: "Complete System",
  },
  {
    feature: "Next.js Implementation",
    essential: true,
    growth: true,
    enterprise: true,
  },
  {
    feature: "SEO Best Practices",
    essential: true,
    growth: true,
    enterprise: true,
  },
  {
    feature: "Complete Visual Identity",
    essential: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: "Advanced Motion (GSAP)",
    essential: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: "CMS Integration",
    essential: false,
    growth: true,
    enterprise: true,
  },
  {
    feature: "Product Strategy & Research",
    essential: false,
    growth: false,
    enterprise: true,
  },
  {
    feature: "Design System Documentation",
    essential: false,
    growth: false,
    enterprise: true,
  },
  {
    feature: "Scalable Web App Development",
    essential: false,
    growth: false,
    enterprise: true,
  },
  {
    feature: "Dedicated Support Team",
    essential: false,
    growth: false,
    enterprise: true,
  },
  {
    feature: "Revision Rounds",
    essential: "2 rounds",
    growth: "4 rounds",
    enterprise: "Unlimited",
  },
  {
    feature: "Project Timeline",
    essential: "4-6 weeks",
    growth: "8-12 weeks",
    enterprise: "Custom",
  },
  {
    feature: "Post-Launch Support",
    essential: "30 days",
    growth: "60 days",
    enterprise: "90 days",
  },
];

const renderCell = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-green-500 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
};

export function PackageComparison() {
  const columns = useMemo<ColumnDef<ComparisonFeature>[]>(
    () => [
      {
        accessorKey: "feature",
        header: "Features",
        cell: ({ row }) => (
          <div className="font-medium text-left">{row.getValue("feature")}</div>
        ),
      },
      {
        accessorKey: "essential",
        header: () => (
          <div className="text-center">
            <Badge variant="outline" className="mb-1 mt-1">
              Essential
            </Badge>
            <div className="text-2xl font-bold text-primary">$2,999</div>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {renderCell(row.getValue("essential"))}
          </div>
        ),
      },
      {
        accessorKey: "growth",
        header: () => (
          <div className="text-center">
            <Badge className="mb-1 mt-1">Growth ★</Badge>
            <div className="text-2xl font-bold text-primary">$5,999</div>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {renderCell(row.getValue("growth"))}
          </div>
        ),
      },
      {
        accessorKey: "enterprise",
        header: () => (
          <div className="text-center">
            <Badge variant="outline" className=" mt-1 mb-1">
              Enterprise
            </Badge>
            <div className="text-2xl font-bold text-primary">Custom</div>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {renderCell(row.getValue("enterprise"))}
          </div>
        ),
      },
    ],
    [],
  );

  /* eslint-disable react-hooks/incompatible-library */
  const table = useReactTable({
    data: comparisonData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="rounded-lg border min-w-[800px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/30">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.id === "feature" ? "w-[40%]" : "w-[20%]"}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
