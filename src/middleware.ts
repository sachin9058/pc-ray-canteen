import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Protect all pages except static assets
};