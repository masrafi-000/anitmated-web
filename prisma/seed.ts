import prisma from "@/lib/prisma";

async function main() {
  // reset (safe for dev)
  await prisma.feature.deleteMany();
  await prisma.package.deleteMany();

  const packages = [
    {
      title: "Essential",
      slug: "essential",
      price: "$2,999",
      description:
        "Perfect for startups needing a solid brand foundation and web presence.",
      cta: "Start Essential",
      features: [
        "Logo & Brand Guidelines",
        "UI/UX Design for Landing Page",
        "Next.js Implementation",
        "SEO Best Practices",
      ],
    },
    {
      title: "Growth",
      slug: "growth",
      price: "$5,999",
      description:
        "Ideal for scaling businesses requiring a comprehensive digital experience.",
      cta: "Go for Growth",
      isPopular: true,
      features: [
        "Complete Visual Identity",
        "Multi-Page UI/UX Design",
        "Advanced Motion (GSAP)",
        "CMS Integration",
      ],
    },
    {
      title: "Enterprise",
      slug: "enterprise",
      price: "Custom",
      description:
        "For industry leaders needing bespoke products and dedicated partnership.",
      cta: "Contact Enterprise",
      features: [
        "Product Strategy & Research",
        "Design System Documentation",
        "Scalable Web App Development",
        "Dedicated Support Team",
      ],
    },
  ];

  for (const pkg of packages) {
    await prisma.package.create({
      data: {
        title: pkg.title,
        slug: pkg.slug,
        price: pkg.price,
        description: pkg.description,
        cta: pkg.cta,
        isPopular: pkg.isPopular ?? false,
        features: {
          create: pkg.features.map((feature) => ({
            feature,
          })),
        },
      },
    });
  }

  console.log("Packages seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
