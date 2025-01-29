/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification
  images: {
    unoptimized: true,
    domains: ['lvfdbhdvsngxuptrybvn.supabase.co']
  },
  output: 'export',
  trailingSlash: true,
  // Disable SWC compilation and use Babel instead
  experimental: {
    forceSwcTransforms: false
  }
}

module.exports = nextConfig