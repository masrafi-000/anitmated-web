
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    const results = [];

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
            create: pkg.features.map((f) => ({ feature: f })),
          },
        },
      });
      results.push(created);
    }

    return NextResponse.json({
      message: "Seeding completed successfully",
      createdPackages: results,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
