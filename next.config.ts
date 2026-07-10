import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Stable product links. PDFs and bios point at /get/<system>; the target
      // can change (Gumroad slug, Lemon Squeezy, direct page) without breaking
      // anything already in the wild. One entry per system.
      {
        source: "/get/marketing-team",
        destination: "https://oloyeai.gumroad.com/l/marketing-team",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
