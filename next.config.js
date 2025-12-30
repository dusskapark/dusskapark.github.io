/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ldlfylt/link-preview-card'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
