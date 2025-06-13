import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  Images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ]  
    }  
};

export default nextConfig;
