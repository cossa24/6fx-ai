import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Recommended: Enable strict type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Recommended: Enforce linting during build
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
