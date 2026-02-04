"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplication } from "@/hooks/use-applications";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { RejectApplicationDialog } from "../../_components/reject-application-dialog";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: application, isLoading } = useApplication(id);

  if (isLoading) {
    return (
      <div className="px-3 md:px-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="px-3 md:px-6">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium">Application not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/careers">Back to Applications</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  return (
    <div className="px-3 md:px-6 space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard/careers")}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <span>/</span>
            <span>Application Details</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {application.fullName}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(application.status)}>
              {application.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Applied {new Date(application.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {application.status !== "REJECTED" && (
            <RejectApplicationDialog
              applicationId={application.id}
              applicantName={application.fullName}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{application.email}</p>
                  </div>
                </div>
                {application.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{application.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Position Applied */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Position Applied
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Job Title</p>
                <p className="text-lg font-semibold">
                  {application.job?.title || "Unknown Position"}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{application.job?.department || "N/A"}</span>
                </div>
                {application.job?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{application.job.location}</span>
                  </div>
                )}
                {application.job?.type && (
                  <Badge variant="outline">{application.job.type}</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Professional Background */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {application.educationLevel && (
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium">{application.educationLevel}</p>
                  </div>
                )}
                {application.yearsOfExperience !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">
                      {application.yearsOfExperience} years
                    </p>
                  </div>
                )}
                {application.currentDesignation && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Role
                    </p>
                    <p className="font-medium">
                      {application.currentDesignation}
                    </p>
                  </div>
                )}
                {application.currentCompany && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Company
                    </p>
                    <p className="font-medium">{application.currentCompany}</p>
                  </div>
                )}
              </div>

              {(application.currentSalary || application.expectedSalary) && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {application.currentSalary && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Current Salary
                        </p>
                        <p className="font-medium">
                          ${application.currentSalary.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {application.expectedSalary && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Expected Salary
                        </p>
                        <p className="font-medium">
                          ${application.expectedSalary.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.techSkills && application.techSkills.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Technical Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {application.techSkills.map(
                      (skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              )}
              {application.softSkills && application.softSkills.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Soft Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {application.softSkills.map(
                      (skill: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">
                  {application.coverLetter}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resume */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Social Profiles */}
          <Card>
            <CardHeader>
              <CardTitle>Social Profiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "LinkedIn", value: application.linkedInProfile },
                { label: "Portfolio", value: application.portfolioUrl },
                { label: "GitHub", value: application.githubProfile },
                { label: "StackOverflow", value: application.stackOverflow },
                { label: "CodeForces", value: application.codeForces },
                { label: "CodeChef", value: application.codeChef },
                { label: "HackerRank", value: application.hackerrank },
                { label: "LeetCode", value: application.leetCode },
              ]
                .filter((profile) => profile.value)
                .map((profile) => (
                  <Link
                    key={profile.label}
                    href={profile.value!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {profile.label}: {profile.value}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              {![
                application.linkedInProfile,
                application.portfolioUrl,
                application.githubProfile,
                application.stackOverflow,
                application.codeForces,
                application.codeChef,
                application.hackerrank,
                application.leetCode,
              ].some(Boolean) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No social profiles provided
                </p>
              )}
            </CardContent>
          </Card>

          {/* Rejection Info */}
          {application.status === "REJECTED" && application.rejectedAt && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Rejection Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected On</p>
                  <p className="font-medium">
                    {new Date(application.rejectedAt).toLocaleDateString()}
                  </p>
                </div>
                {application.rejectedBy && (
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected By</p>
                    <p className="font-medium">{application.rejectedBy}</p>
                  </div>
                )}
                {application.rejectionReason && (
                  <div>
                    <p className="text-sm text-muted-foreground">Reason</p>
                    <p className="text-sm">{application.rejectionReason}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm font-medium">Application Submitted</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(application.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {application.rejectedAt && (
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
                  <div>
                    <p className="text-sm font-medium">Application Rejected</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(application.rejectedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
