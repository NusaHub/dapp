import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
        {
        protocol: 'https',
        hostname: 'nusahub.kevinchr.com',
      }
    ],
  },
  devIndicators: {
    position: 'bottom-right'
  }
};

export default nextConfig;