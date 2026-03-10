import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false,
  } as any, // Bypass strict type check to ensure the feature is disabled
};

export default nextConfig;
