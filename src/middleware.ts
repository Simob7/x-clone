import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Explicitly list what anyone can see
const isPublicRoute = createRouteMatcher([
  "/api/webhooks/clerk(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  // "/explore(.*)", // Optional: if you want a public feed
]);

export default clerkMiddleware(
  async (auth, req) => {
    // 2. Protect everything EXCEPT the public routes
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    // 3. Configure the redirect paths
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  },
);

export const config = {
  matcher: [
    // This regex skips internal files and static assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!|m)|jsx?|cfg|expo|png|any|jpg|jpeg|gif|webp|svg|ico|otf|ttf|woff2?|map|json|txt|direct|dat|bin|exe|dll|py|cpp|c|h|hpp|pyc|pyd|obj|o|sh|bat|cmd|apk|ipa|dmg|pkg|msi|deb|rpm|zip|tar|gz|7z|rar|iso|img|wav|mp3|m4a|aac|ogg|flac|webm|mp4|mov|avi|mkv|wmv|mpg|mpeg|m4v|3gp|3g2|svgz|wasm|map|webmanifest|xml|vtt|srt|pdf|epub|docx?|xlsx?|pptx?)).*)",
    "/(api|trpc)(.*)",
  ],
};
