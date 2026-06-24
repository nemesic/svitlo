import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires non-default qualities to be whitelisted; 90 is used for
    // the priority hero so it renders crisp rather than the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
