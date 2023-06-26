/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { domains: [process.env.NEXT_PUBLIC_POCKETBASE_DOMAIN] },
};

module.exports = nextConfig;
