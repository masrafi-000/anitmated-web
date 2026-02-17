import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export async function POST(body: Request) {
  const { email, password } = await body.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    const response = NextResponse.json(
      { success: true, message: "Login successful", user },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
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

export async function GET() {
  const token = (await (await import("next/headers")).cookies()).get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        name: true,
        email: true,
        username: true,
        designation: true,
        avaterImage: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 },
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function PUT(req: Request) {
  try {
    const token = (await (await import("next/headers")).cookies()).get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as {
      id: string;
    };

    const body = await req.json();
    const { name, designation, avaterImage, username, password, newPassword } =
      body;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const updateData: {
      name?: string;
      designation?: string;
      avaterImage?: string;
      username?: string;
      password?: string;
    } = {};

    if (name) updateData.name = name;
    if (designation) updateData.designation = designation;
    if (avaterImage) updateData.avaterImage = avaterImage;

    if (username && username !== user.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "Username already taken" },
          { status: 400 },
        );
      }
      updateData.username = username;
    }

    if (newPassword) {
      if (!password) {
        return NextResponse.json(
          { success: false, error: "Current password is required" },
          { status: 400 },
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: "Invalid current password" },
          { status: 401 },
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        designation: true,
        avaterImage: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
