import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const { pathname } = request.nextUrl;

    // Get the token from localStorage (via cookies)
    const token =
        request.cookies.get("token")?.value ||
        request.headers.get("Authorization")?.replace("Bearer ", "");

    // Define public paths that don't require authentication
    const publicPaths = ["/auth/login", "/auth/signup"];

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // If the user is not logged in and trying to access a protected route, redirect to login
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // If the user is logged in and trying to access a public route (like login/signup), redirect to home
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
