"use client";


import { notFound } from "next/navigation";
import { use } from "react";
import JobDetailsView from "../_components/job-details-view";

interface JobDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = use(params);
  
  

  if (!slug) {
    notFound();
  }

  return <JobDetailsView slug={slug} />;
}
