import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = [
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/landing", whenAuthenticated: "next" },
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_UNAUTHENTICATED = "/landing";
const REDIRECT_WHEN_AUTHENTICATED = "/home";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.find((route) => route.path === pathname);

  const token = request.cookies.get("auth_token")?.value;

  // If it's the root path, we check for a token
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(
        new URL(REDIRECT_WHEN_UNAUTHENTICATED, request.url),
      );
    }
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_AUTHENTICATED, request.url),
    );
  }

  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_UNAUTHENTICATED, request.url),
    );
  }

  if (
    token &&
    isPublicRoute &&
    isPublicRoute.whenAuthenticated === "redirect"
  ) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_AUTHENTICATED, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
