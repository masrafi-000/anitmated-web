"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Application, useApplications } from "@/hooks/use-applications";
import { ChevronDown, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RejectApplicationDialog } from "./reject-application-dialog";
import { StatusChangeSwitch } from "./status-change-switch";

export default function ApplicationsTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading } = useApplications({
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  /* const applications = data?.data?.all || []; */
  const byDepartment = data?.data?.byDepartment || {};
  const counts = data?.count || {};

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "REVIEWING":
        return "default";
      case "INTERVIEWING":
        return "default";
      case "OFFERED":
        return "default";
      case "REJECTED":
        return "destructive";
      case "WITHDRAWN":
        return "outline";
      default:
        return "secondary";
    }
  };

  const ApplicationRow = ({ application }: { application: Application }) => (
    <TableRow>
      <TableCell className="font-medium">{application.fullName}</TableCell>
      <TableCell>{application.email}</TableCell>
      <TableCell>{application.phone || "-"}</TableCell>
      <TableCell>{application.job?.title || "Unknown"}</TableCell>
      <TableCell>
        {application.yearsOfExperience !== undefined &&
        application.yearsOfExperience !== null
          ? `${application.yearsOfExperience} years`
          : "-"}
      </TableCell>
      <TableCell>
        <Badge variant={getStatusVariant(application.status)}>
          {application.status}
        </Badge>
      </TableCell>
      <TableCell>
        {new Date(application.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <StatusChangeSwitch
            applicationId={application.id}
            currentStatus={application.status}
          />
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/careers/${application.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
          {application.status !== "REJECTED" && (
            <RejectApplicationDialog
              applicationId={application.id}
              applicantName={application.fullName}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Job Applications
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage and review all job applications organized by department.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{counts.total || 0}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{counts.pending || 0}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Interviewing
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {counts.interviewing || 0}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{counts.rejected || 0}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">
            All {isLoading ? "" : `(${counts.total || 0})`}
          </TabsTrigger>
          <TabsTrigger value="PENDING">
            Pending {isLoading ? "" : `(${counts.pending || 0})`}
          </TabsTrigger>
          <TabsTrigger value="REVIEWING">
            Reviewing {isLoading ? "" : `(${counts.reviewing || 0})`}
          </TabsTrigger>
          <TabsTrigger value="INTERVIEWING">
            Interviewing {isLoading ? "" : `(${counts.interviewing || 0})`}
          </TabsTrigger>
          <TabsTrigger value="OFFERED">
            Offered {isLoading ? "" : `(${counts.offered || 0})`}
          </TabsTrigger>
          <TabsTrigger value="WITHDRAWN">
            Withdrawn {isLoading ? "" : `(${counts.withdrawn || 0})`}
          </TabsTrigger>
          <TabsTrigger value="REJECTED">
            Rejected {isLoading ? "" : `(${counts.rejected || 0})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="space-y-4 mt-6">
          {isLoading ? (
            // Skeleton for content area
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          ) : (
            // Department Sections
            <>
              {Object.keys(byDepartment).length > 0 ? (
                (Object.entries(byDepartment) as [string, Application[]][]).map(
                  ([department, apps]) => (
                    <Collapsible key={department} defaultOpen>
                      <Card>
                        <CollapsibleTrigger className="w-full">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <div className="flex items-center gap-3">
                              <CardTitle className="text-lg">
                                {department}
                              </CardTitle>
                              <Badge variant="secondary">{apps.length}</Badge>
                            </div>
                            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent>
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Experience</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Applied</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {apps.map((application: Application) => (
                                    <ApplicationRow
                                      key={application.id}
                                      application={application}
                                    />
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  )
                )
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-muted-foreground">
                      <p className="text-lg font-medium">
                        No applications found
                      </p>
                      <p className="text-sm">
                        {search
                          ? "Try adjusting your search criteria"
                          : "Applications will appear here once submitted"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
