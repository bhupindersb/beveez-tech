/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true, // ✅ REQUIRED for src/app routes
  },

  images: {
    domains: ['cdn.sanity.io'],
  },
};

module.exports = nextConfig;
