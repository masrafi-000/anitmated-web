"use client";

import { JobCard } from "@/app/(main)/careers/_components/JobCard";
import { JobCardSkeleton } from "@/app/(main)/careers/_components/JobCardSkeleton";
import { JobOpportunity } from "@/app/generated/client";
import { Container, Section } from "@/components/ds";
import { Button } from "@/components/ui/button";
import { useCareers } from "@/hooks/use-careers";
import { useState } from "react";
import { departments } from "../data";

export function OpenPositions() {
  const [selectedDepartment, setSelectedDepartment] = useState("All Positions");
  const { data: filteredJobs = [], isLoading } = useCareers(selectedDepartment);

  return (
    <Section id="all-jobs">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Open Positions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our current openings and find the perfect role for your
            skills and aspirations.
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
                className="rounded-full"
                size="sm"
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="flex flex-col gap-3 max-w-6xl mx-auto">
            {[1, 2, 3,4].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-w-6xl mx-auto">
            {filteredJobs.map((job: JobOpportunity) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No positions available in this department at the moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back soon or explore other departments!
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
