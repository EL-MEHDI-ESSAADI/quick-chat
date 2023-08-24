/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { domains: [process.env.NEXT_PUBLIC_POCKETBASE_DOMAIN] },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
