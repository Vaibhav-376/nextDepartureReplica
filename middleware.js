// middleware.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const { pathname } = req.nextUrl;


  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?message=Please login first", req.url)
      );
    }

    try {
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return NextResponse.redirect(
          new URL("/auth/login?message=Configuration error", req.url)
        );
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token in middleware:", decoded);

      if (!decoded || !decoded.isAdmin) {
        console.log("User is not admin:", decoded);
        return NextResponse.redirect(
          new URL("/auth/login?message=Admin access required", req.url)
        );
      }

      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(
        new URL("/auth/login?message=Session expired", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};