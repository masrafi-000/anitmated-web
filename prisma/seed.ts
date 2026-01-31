import { jobOpportunities } from "@/app/(main)/careers/data";
import prisma from "@/lib/prisma";

import { JobType, WorkMode } from "@/app/generated/client";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapJobType(type: string): JobType {
  switch (type) {
    case "Full-time":
      return JobType.FULL_TIME;
    case "Part-time":
      return JobType.PART_TIME;
    case "Contract":
      return JobType.CONTRACT;
    case "Remote":
      return JobType.FULL_TIME; // Remote is a work mode, default to Full-time
    default:
      return JobType.FULL_TIME;
  }
}

function inferWorkMode(location: string): WorkMode {
  if (location.toLowerCase().includes("remote")) return WorkMode.REMOTE;
  if (location.includes("/")) return WorkMode.HYBRID;
  return WorkMode.ONSITE;
}

function inferExperienceLevel(exp: string) {
  if (exp.startsWith("1") || exp.startsWith("2")) return "Junior";
  if (exp.startsWith("3") || exp.startsWith("4")) return "Mid";
  return "Senior";
}

async function main() {
  console.log("🌱 Seeding job opportunities…");

  for (const job of jobOpportunities) {
    const slug = slugify(job.title);

    const exists = await prisma.jobOpportunity.findUnique({
      where: { slug },
    });

    if (exists) {
      console.log(`⏭️  Skipped: ${job.title}`);
      continue;
    }

    await prisma.jobOpportunity.create({
      data: {
        title: job.title,
        slug,
        department: job.department,
        location: job.location,
        workMode: inferWorkMode(job.location),

        type: mapJobType(job.type),
        experienceLevel: inferExperienceLevel(job.experience),
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        benefits: job.benefits,
        createdAt: new Date(job.postedDate),
        isActive: true,
      },
    });

    console.log(`✅ Seeded: ${job.title}`);
  }

  console.log("🌳 Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
