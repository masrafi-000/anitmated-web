import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find the latest valid OTP token for the email
    const token = await prisma.passwordResetToken.findFirst({
      where: {
        email,
        otp,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
