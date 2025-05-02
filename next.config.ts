import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/rewrites/:path*",
        destination: "https://:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/redirects/:path*",
        destination: "https://:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
