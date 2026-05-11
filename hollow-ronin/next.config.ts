import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    return config
  },
};

export default nextConfig;
