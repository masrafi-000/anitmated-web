import { JobOpportunity } from "@/app/generated/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: JobOpportunity;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/careers/${job.slug || job.id}`}>
      <Card className="border-muted/60 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <Badge variant="secondary">{job.department}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {/* Display friendly text for enum if needed, or just job.type */}
                  <span className="capitalize">{job.type.replace("_", " ").toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.experienceLevel}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {job.description}
              </p>
            </div>
            <Button className="rounded-full shrink-0">View Details</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
