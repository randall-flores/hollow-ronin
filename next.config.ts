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
  async redirects() {
    return [
      {
        source:      '/products/arashi-maru',
        destination: '/products/arashi-maru-black',
        permanent:   true,
      },
    ]
  },
};

export default nextConfig;
