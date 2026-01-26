import prisma from "@/lib/prisma";
import { ZCPackages } from "@/schema/zod/pricing";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validatePackages = ZCPackages.parse(body)

        const existingPackage = await prisma.package.findUnique({
            where: {
                slug: validatePackages.slug,
            },
        })

        if(existingPackage){
            return NextResponse.json(
                {
                    success: false,
                    message: "Package Already Exists",
                },
                { status: 400 },
            )
        }

        const { features, ...packageData } = validatePackages;

        const newPackage = await prisma.package.create({
            data: {
                ...packageData,
                features: {
                    create: features.map((feature) => ({
                        feature,
                    })),
                },
            },
        })

        return NextResponse.json(
            {
                success: true,
                message: "Package Created Successfully",
                data: newPackage,
            },
            { status: 201 },
        )

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Internal Server Error",
            },
            { status: 500 },
        )
    }
}


export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      include: {
        features: true,
      },
      orderBy: {
        price: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "All Packages Fetched Successfully",
        count: packages.length,
        data: packages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}



export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        const { id } = body;

        // Use transaction to delete features first to avoid foreign key constraints
        const deletedPackage = await prisma.$transaction([
            prisma.feature.deleteMany({
                where: {
                    packageId: id,
                },
            }),
            prisma.package.delete({
                where: {
                    id,
                },
            }),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Package Deleted Successfully",
                data: deletedPackage,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Internal Server Error",
            },
            { status: 500 },
        )
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, ...data } = body;

        // Use Partial of the schema for PATCH
        const validatePackages = ZCPackages.partial().parse(data);
        const { features, ...packageData } = validatePackages;

        const updatedPackage = await prisma.package.update({
            where: {
                id,
            },
            data: {
                ...packageData,
                features: features ? {
                    deleteMany: {}, 
                    create: features.map((feature) => ({
                        feature,
                    })), 
                } : undefined,
            },
        })

        return NextResponse.json(
            {
                success: true,
                message: "Package Updated Successfully",
                data: updatedPackage,
            },
            { status: 200 },
        )
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Internal Server Error",
            },
            { status: 500 },
        )
    }
}