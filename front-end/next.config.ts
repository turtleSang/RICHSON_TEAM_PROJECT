import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['lh3.googleusercontent.com', `${process.env.NEXT_PUBLIC_HOST}`],
  },
};

export default nextConfig;
