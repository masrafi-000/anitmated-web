import prisma from "@/lib/prisma";



async function main() {
  console.log("Seeding careers...");
  
  try {
    const existing = await prisma.jobOpportunity.findUnique({
        where: { slug: "senior-frontend-developer" }
    });

    if (existing) {
        console.log("Career already exists, skipping creation.");
        return;
    }

    await prisma.jobOpportunity.create({
      data: {
        title: "Senior Frontend Developer",
        slug: "senior-frontend-developer",
        department: "Engineering",
        location: "Remote",
        workMode: "REMOTE",
        type: "FULL_TIME",
        experienceLevel: "Senior",
        description: "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building high-quality user interfaces.",
        responsibilities: ["Develop user-facing features", "Build reusable code and libraries for future use", "Ensure the technical feasibility of UI/UX designs"],
        requirements: ["Proficient understanding of web markup, including HTML5, CSS3", "Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS", "Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery"],
        benefits: ["Competitive salary", "Remote work options", "Health insurance"],
        salaryMin: 50000,
        salaryMax: 80000,
        salaryCurrency: "USD",
        isActive: true,
      },
    });

    console.log("Seeded 1 career.");
  } catch(e) {
    console.error(e);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
