import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("[Middleware] Hit:", pathname);

  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("[Middleware] No token found. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("[Middleware] Token found. Verifying...");

  const user = await getUserFromToken(token);

  if (!user) {
    console.log("[Middleware] Token invalid or expired. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("[Middleware] Auth success:", {
    id: user.id,
    email: user.email,
    route: pathname,
  });

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
