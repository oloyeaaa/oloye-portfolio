import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Stable product links. PDFs and bios point at /get/<system>; each lands
      // on its /systems/<system> sales page (whose button carries the checkout
      // link). Targets can change without breaking anything in the wild.
      {
        source: "/get/marketing-team",
        destination: "/systems/marketing-team",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
