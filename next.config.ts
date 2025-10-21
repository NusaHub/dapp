import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "172.20.10.12",
      },
      {
        protocol: "https",
        hostname: "nusahub.kevinchr.com",
      },
      {
        protocol: "https",
        hostname: "staticdelivery.nexusmods.com"
      }
    ],
  },
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
