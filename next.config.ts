import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/satoshi.blogs.com/:path*",
        destination: "https://satoshi.blogs.com/:path*",
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/satoshi.blogs.com/:file*",
  //       destination: "https://satoshi.blogs.com/:file*",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
