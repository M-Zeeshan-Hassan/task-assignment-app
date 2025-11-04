/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack to avoid build issues
  experimental: {
    turbo: undefined,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig