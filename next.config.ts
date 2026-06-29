import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure pages with Convex realtime are not statically prerendered without env
  // In production you must set NEXT_PUBLIC_CONVEX_URL at build time
  experimental: {
    // Allow the build to succeed with Convex stubs; full generation happens at `convex dev`
  },
};

export default nextConfig;
