/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      maxDuration: 60,
    },
  },
};

export default nextConfig;
