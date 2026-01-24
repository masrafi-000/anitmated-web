
import prisma from "@/lib/prisma";




const packages = [
  {
    title: "Essential",
    slug: "essential",
    price: "$999 - $2,999",
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
    price: "$3,999 - $5,999",
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
    features: [
      "Product Strategy & Research",
      "Design System Documentation",
      "Scalable Web App Development",
      "Dedicated Support Team",
    ],
  },
];

async function main() {
  console.log("Seeding packages...");
  for (const pkg of packages) {
    const created = await prisma.package.upsert({
        where: { slug: pkg.slug },
        update: {},
        create: {
            title: pkg.title,
            slug: pkg.slug,
            price: pkg.price,
            isPopular: pkg.isPopular || false,
            features: {
                create: pkg.features.map(f => ({ feature: f }))
            }
        }
    })
    console.log(`Created/Found package: ${created.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
