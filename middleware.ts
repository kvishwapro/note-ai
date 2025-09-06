import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        const { userId, redirectToSignIn } = await auth();
        if (!userId) {
            return redirectToSignIn();
        }
    }
});

export const config = {
    // Skip Next.js internals and all static files
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js|map|json|svg|png|jpg|jpeg|gif|ico|webp|txt|xml|woff2?)|favicon\\.ico).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
};
