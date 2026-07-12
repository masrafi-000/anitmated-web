import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp, password } = await req.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { success: false, error: "Email, OTP, and password are required" },
        { status: 400 }
      );
    }

    // 1. Verify OTP is still valid
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

    // 2. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update the user password in database
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    // 4. Clean up all tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
