import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the route should be protected
  const { pathname } = request.nextUrl;

  // Allow access to login page and auth API routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth/login")
  ) {
    return NextResponse.next();
  }

  // Allow access to Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for dev-access cookie
  const devAccess = request.cookies.get("dev-access");

  if (!devAccess || devAccess.value !== "granted") {
    // Redirect to login page
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
