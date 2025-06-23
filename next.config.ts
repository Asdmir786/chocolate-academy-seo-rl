import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  images: {
    // Disable Image Optimization when running in next-lite / static export
    unoptimized: true,
  },
  /* other config options can go here */
}

export default nextConfig
