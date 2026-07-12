import prisma from "@/lib/prisma";
import { sendOtpEmail } from "@/infrastructure/email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User with this email not found" },
        { status: 404 }
      );
    }

    // 2. Clean up any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    // 3. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Save to database with 15-minute expiration
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.passwordResetToken.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    // 5. Send email containing the OTP
    await sendOtpEmail(email, otp);

    return NextResponse.json(
      { success: true, message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
