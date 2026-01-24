
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      include: {
        features: true,
      },    
      orderBy: {
        price: "asc", 
      }
    });

    return NextResponse.json({ data: packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}
