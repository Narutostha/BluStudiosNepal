/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    unoptimized: true,
    domains: ['lvfdbhdvsngxuptrybvn.supabase.co']
  },
  // Remove the output: 'export' line
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: false
  }
}

module.exports = nextConfig