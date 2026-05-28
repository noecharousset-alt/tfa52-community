import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tfa52-community",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
