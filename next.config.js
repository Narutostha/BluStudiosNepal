/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['lvfdbhdvsngxuptrybvn.supabase.co']
  },
  output: 'export',
  trailingSlash: true
}

module.exports = nextConfig